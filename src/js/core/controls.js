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
    element.className += className;
}

const removeClass = (element, className) => {
    element.className = element.className.replace(className, "");
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
        const play = document.getElementById('play');
        const speed = document.getElementById('speed');
        const size = document.getElementById('size');
        const color = document.getElementById('color');
        const colorLabel = getLabelFor(color);
        const clear = document.getElementById('clear');
        const randomColor = document.getElementById('random-color');

        color.value = rgbToHex(this.animate.color);
        speed.value = this.animate.speed;
        size.value = this.animate.r;
        randomColor.checked = this.animate.randomizeColor();
        if (randomColor.checked) {
            color.disabled = true;
            addClass(colorLabel, 'disabled');
        }

        play.addEventListener('click', () => {
            if (!this.playing) {
                this.animate.start();
                play.innerHTML = 'Stop'
                this.playing = true;
            } else {
                this.animate.stop();
                play.innerHTML = 'Start'
                this.playing = false;
            }
        });


        speed.addEventListener('change', (event) => {
            this.animate.setSpeed(event.target.value);
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
            if(randomized) {
                addClass(colorLabel, 'disabled');
            } else {
                removeClass(colorLabel, 'disabled');
            }
        })
    }
}