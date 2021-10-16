class Point {
    x = 0;
    y = 0;
    radius = 1;
    circle = null;
    options = {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 1
    }

    constructor(x, y, color = 'black') {
        this.x = x;
        this.y = y;
        this.options.fill = color;
        this.options.stroke = color;
        this.circle = new Circle(this.x, this.y, this.radius, this.options);
    }

    draw(svg) {
        svg.appendChild(this.circle.getNode());
    }

    color(val) {
        if(!val) {
            return this.options.fill;
        }
        this.options.fill = val;
        this.options.stroke = val;
        this.circle.options(this.options);
    }
}

class Circle {
    svgns = "http://www.w3.org/2000/svg";

    cx = 0;
    cy = 0;
    r = 0;
    fill = 'black';
    node = null;
    options = {
        fill: this.fill,
        stroke: this.fill,
        strokeWidth: 1
    }

    constructor(x, y, radius, opts = {}) {
        this.cx = x;
        this.cy = y;
        this.r = radius;
        Object.assign(this.options, opts);
        this.#create();
    }

    #create() {
        this.node = document.createElementNS(this.svgns, "circle");
        this.node.setAttribute("cx", this.cx);
        this.node.setAttribute("cy", this.cy);
        this.node.setAttribute("r", this.r);
        this.#applyOptions();
        return this.node;
    }

    #applyOptions() {
        this.node.setAttribute("fill", this.options.fill);
        this.node.setAttribute("stroke", this.options.stroke);
        this.node.setAttribute("strokeWidth", this.options.strokeWidth);
    }

    getNode() {
        return this.node;
    }

    x(val) {
        if (!val) {
            return this.cx;
        }
        this.cx = val;
        this.node.setAttribute("cx", this.cx);
        return this;
    }

    y(val) {
        if (!val) {
            return this.cy;
        }
        this.cy = val;
        this.node.setAttribute("cy", this.cy);
        return this;
    }

    radius(val) {
        if (!val) {
            return this.r;
        }
        this.r = val;
        this.node.setAttribute("r", this.r);
        return this;
    }

    color(val) {
        if (!val) {
            return this.fill
        }
        this.fill = val;
        this.options = {
            fill: this.fill,
            stroke: this.fill,
            strokeWidth: 1
        }
        this.#applyOptions();
        return this;
    }

    opts(val) {
        if (!val) {
            return this.options;
        }
        Object.assign(this.options, val || {});
        this.#applyOptions();
    }

    toString() {
        return `x = ${this.cx}, y = ${this.cy}, r = ${this.r};`;
    }

}

class Animate {
    static CIRCLE_RADIUS = 30;
    static CIRCLE_X_START_OFFSET = 1;
    static CIRCLE_Y_START_OFFSET = 1;
    static SPEED = 2;
    static START_X = (Animate.CIRCLE_RADIUS * 2 + Animate.CIRCLE_X_START_OFFSET);
    static START_Y = (Animate.CIRCLE_RADIUS * 2 + Animate.CIRCLE_Y_START_OFFSET);

    randomColor = false;
    svg = null;
    r = Animate.CIRCLE_RADIUS;
    speed = Animate.SPEED;
    xDirection = 1;
    yDirection = 1;
    interval = 0;
    circle;
    color = 'black';
    points = [];

    constructor(svg) {
        this.svg = svg;
        this.circle = new Circle(Animate.START_X, Animate.START_Y, Animate.CIRCLE_RADIUS, this.color);
        this.svg.appendChild(this.circle.getNode());
        this.randomStart(this.circle);
    }

    randomStart(circle) {
        const minX = this.r + 1;
        const minY = this.r + 1;
        const maxX = this.svg.clientWidth - this.r - Animate.CIRCLE_X_START_OFFSET;
        const maxY = this.svg.clientHeight - this.r - Animate.CIRCLE_Y_START_OFFSET;
        const x = minX + (Math.random() * (maxX - minX));
        const y = minY + (Math.random() * (maxY - minY));

        circle.x(x)
        circle.y(y)
    }

    start() {
        this.interval = setInterval(() => {
            this.moveCircle()
        }, 1);
    }

    moveCircle() {
        const A = Animate;
        const c = this.circle;
        const xLowerLimit = this.r;
        const yLowerLimit = this.r;
        const xUpperLimit = this.svg.clientWidth - this.r - A.CIRCLE_X_START_OFFSET;
        const yUpperLimit = this.svg.clientHeight - this.r - A.CIRCLE_Y_START_OFFSET;

        if (c.x() <= xLowerLimit || c.x() >= xUpperLimit) {
            this.xDirection = this.xDirection * -1;

            if (this.randomColor) {
                this.color = Animate.randomColor();
            }

            c.opts({fill: this.color, stroke: this.color});
        }

        if (c.y() <= yLowerLimit || c.y() >= yUpperLimit) {
            this.yDirection = this.yDirection * -1;

            if (this.randomColor) {
                this.color = Animate.randomColor();
            }
            c.opts({fill: this.color, stroke: this.color});
        }

        c.x(c.x() + this.speed * this.xDirection)
        c.y(c.y() + this.speed * this.yDirection)
        const p = new Point(c.x(), c.y(), this.color);
        this.points.push(p);
        p.draw(this.svg);
    }

    stop() {
        clearInterval(this.interval);
    }

    setSpeed(val) {
        this.speed = val;
        return this;
    }

    setSize(val) {
        this.r = val;
        this.circle.radius(this.r);
        return this;
    }

    setColor(val) {
        this.color = val;
        this.circle.color(this.color);
    }

    clear() {
        console.log("clear");
        console.log(this.points.length);
        this.points.forEach((point => {
            this.svg.removeChild(point.circle.getNode());
            point = null;
        }));
        this.points = [];
    }

    static randomColor() {
        const r = Math.abs(Math.random() * 255);
        const g = Math.abs(Math.random() * 255);
        const b = Math.abs(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`
    }
}

class Controls {
    play;
    playing = false;

    constructor(animate) {
        this.animate = animate;
    }

    create() {
        this.play = document.getElementById("play");
        this.speed = document.getElementById("speed");
        this.size = document.getElementById("size");
        this.color = document.getElementById("color");
        this.clear = document.getElementById("clear");

        this.speed.value = this.animate.speed;
        this.size.value = this.animate.r;

        this.play.onclick = () => {
            if (!this.playing) {
                this.animate.start();
                this.play.innerHTML = "Stop"
                this.playing = true;
            } else {
                this.animate.stop();
                this.play.innerHTML = "Start"
                this.playing = false;
            }
        }

        this.speed.onchange = (event) => {
            this.animate.setSpeed(event.target.value);
        }

        this.size.onchange = (event) => {
            this.animate.setSize(event.target.value);
        }

        this.color.addEventListener("input", (event) => {
            this.animate.setColor(event.target.value);
        }, false);

        this.clear.addEventListener("click", () => {
            this.animate.clear();
        }, false);
    }
}

window.addEventListener('load', () => {
    const svg = document.getElementById("canvas");
    const animate = new Animate(svg);
    const controls = new Controls(animate);
    controls.create();
});


