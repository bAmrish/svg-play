const rgbToHex = (rgb) => {
    const pattern = /^rgb\((\d+), (\d+), (\d+)\)/;
    const matches = rgb.match(pattern);
    if (matches.length === 4) {
        let r = parseInt(matches[1], 10).toString(16);
        let g = parseInt(matches[2], 10).toString(16);
        let b = parseInt(matches[3], 10).toString(16);
        r = r.length === 1 ? '0' + r : r;
        g = g.length === 1 ? '0' + g : g;
        b = b.length === 1 ? '0' + b : b;
        return `#${r}${g}${b}`;
    }
}

const addClass = (element, className) => {
    if (element instanceof SVGElement) {
        const classes = element.getAttribute('class') || '';
        element.setAttribute('class', `${classes} ${className}`.trim());
    } else {
        element.className += className;
    }
}

const removeClass = (element, className) => {
    if (element instanceof SVGElement) {
        let classes = element.getAttribute('class');
        classes = classes.replace(className, "");
        element.setAttribute('class', classes);
    } else {
        element.className = element.className.replace(className, "");
    }

}


const getLabelFor = (input) => {
    const children = input.parentElement.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeName.toLowerCase() === 'label') {
            const forInput = child.getAttribute('for')
            if (forInput === input.getAttribute('id') ||
                forInput === input.getAttribute('name')) {
                return child;
            }
        }
    }
}

export class Controls {
    playing = false;

    constructor(animate) {
        this.animate = animate;
    }

    create() {
        const circle = this.animate.circle.getNode();
        const play = document.getElementById('play');
        const xSpeed = document.getElementById('x-speed');
        const ySpeed = document.getElementById('y-speed');
        const size = document.getElementById('size');
        const color = document.getElementById('color');
        const colorLabel = getLabelFor(color);
        const clear = document.getElementById('clear');
        const randomColor = document.getElementById('random-color');
        const stringMode = document.getElementById('string-mode');
        const capture = document.getElementById('capture');

        addClass(circle, 'movable');
        color.value = rgbToHex(this.animate.color);

        xSpeed.value = this.animate.xSpeed;
        ySpeed.value = this.animate.ySpeed;

        size.value = this.animate.r;
        randomColor.checked = this.animate.randomizeColor();
        if (randomColor.checked) {
            color.disabled = true;
            addClass(colorLabel, 'disabled');
        }

        stringMode.checked = this.animate.stringMode;

        play.addEventListener('click', () => {
            if (!this.playing) {
                this.animate.start();
                play.innerHTML = 'Pause'
                this.playing = true;
                removeClass(circle, 'movable');
            } else {
                this.animate.stop();
                play.innerHTML = 'Start'
                this.playing = false;
                addClass(circle, 'movable');
            }
        });


        xSpeed.addEventListener('change', (event) => {
            this.animate.setXSpeed(event.target.value);
        });

        ySpeed.addEventListener('change', (event) => {
            this.animate.setYSpeed(event.target.value);
        });

        size.addEventListener('change', (event) => {
            this.animate.setSize(event.target.value);
        });

        color.addEventListener('input', (event) => {
            this.animate.setColor(event.target.value);
        }, false);

        clear.addEventListener('click', () => {
            this.animate.clear();
        }, false);

        randomColor.addEventListener('click', (event) => {
            const randomized = event.target.checked
            this.animate.randomizeColor(randomized);
            color.disabled = !!randomized;
            if (randomized) {
                addClass(colorLabel, 'disabled');
            } else {
                removeClass(colorLabel, 'disabled');
            }
        });

        stringMode.addEventListener('click', (event) => {
            this.animate.setStringMode(event.target.checked);
        });

        this.setupMove()

        window.addEventListener('resize', () => {
            this.animate.canvasResize();
        });

        capture.addEventListener('click', () => {
            this.capture();
        });
    }

    setupMove() {
        const c = this.animate.circle;
        const circle = c.getNode();
        let moving = false;
        let oX, oY;
        circle.addEventListener('mousedown', (event) => {
            if (this.playing) return;

            oX = event.pageX;
            oY = event.pageY;
            moving = true;
        });

        this.animate.svg.addEventListener('mousemove', (event) => {
            if (moving) {
                const cX = event.pageX;
                const cY = event.pageY;
                const dx = cX - oX;
                const dy = cY - oY;
                const x = c.x() + dx;
                const y = c.y() + dy;
                this.animate.moveCircle(x, y);
                oX = cX;
                oY = cY;
            }
        })

        this.animate.svg.addEventListener('mouseup', () => {
            if (moving) {
                moving = false;
            }
        })

        this.animate.svg.addEventListener('mouseleave', (event) => {
            if (moving && event.target === this.animate.svg) {
                moving = false;
            }
        })
    }


    async capture() {
        const currentColor = this.animate.circle.color();
        this.animate.circle.color('white');
        const svgString = new XMLSerializer().serializeToString(this.animate.svg);
        this.animate.circle.color(currentColor);
        const dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
        const {x, y, width, height} = this.animate.svg.getBBox();
        const image = new Image();
        image.setAttribute('src', dataUrl);
        image.setAttribute('width', (x + width).toString());
        image.setAttribute('height', (y + height).toString());
        const body = image.outerHTML;
        const newWindow = window.open('');
        newWindow.document.body.innerHTML = body;
    }
}