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
}

class Circle {
    svgns = "http://www.w3.org/2000/svg";

    cx = 0;
    cy = 0;
    r = 0;
    node = null;
    options = {
        fill: 'black',
        stroke: 'black',
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
    static PATH_COLOR = 'rgba(153,153,153,0.18)'
    static START_RANDOM_COLOR = this.randomColor();
    static START_OPTIONS = {
        fill: Animate.START_RANDOM_COLOR,
        stroke: Animate.START_RANDOM_COLOR
    };

    svg = null;
    xSpeed = Animate.SPEED;
    ySpeed = Animate.SPEED;
    interval = 0;
    circle;

    constructor(svg) {
        this.svg = svg;
        this.circle = new Circle(Animate.START_X, Animate.START_Y, Animate.CIRCLE_RADIUS, Animate.START_OPTIONS);
        this.svg.appendChild(this.circle.getNode());
        this.randomStart(this.circle);
    }

    randomStart(circle) {
        const minX = Animate.CIRCLE_RADIUS + 1;
        const minY = Animate.CIRCLE_RADIUS + 1;
        const maxX = this.svg.clientWidth - Animate.CIRCLE_RADIUS - Animate.CIRCLE_X_START_OFFSET;
        const maxY = this.svg.clientHeight - Animate.CIRCLE_RADIUS - Animate.CIRCLE_Y_START_OFFSET;
        const x = minX + (Math.random()  * (maxX - minX)) ;
        const y = minY + (Math.random()  * (maxY - minY)) ;

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
        const xLowerLimit = A.CIRCLE_RADIUS;
        const yLowerLimit = A.CIRCLE_RADIUS;
        const xUpperLimit = this.svg.clientWidth - A.CIRCLE_RADIUS - A.CIRCLE_X_START_OFFSET;
        const yUpperLimit = this.svg.clientHeight - A.CIRCLE_RADIUS - A.CIRCLE_Y_START_OFFSET;

        if (c.x() <= xLowerLimit || c.x() >= xUpperLimit) {
            this.xSpeed = this.xSpeed * -1;
            const color = Animate.randomColor();
            c.opts({fill: color, stroke: color});
        }

        if (c.y() <= yLowerLimit || c.y() >= yUpperLimit) {
            this.ySpeed = this.ySpeed * -1;
            const color = Animate.randomColor();
            c.opts({fill: color, stroke: color});
        }

        c.x(c.x() + this.xSpeed)
        c.y(c.y() + this.ySpeed)
        const p = new Point(c.x(), c.y(), Animate.PATH_COLOR);
        p.draw(this.svg);
    }

    stop() {
        clearInterval(this.interval);
    }

    static randomColor() {
        const r = Math.abs(Math.random() * 255);
        const g = Math.abs(Math.random() * 255);
        const b = Math.abs(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`
    }
}


let started = false;
let animate = null;

window.addEventListener('click', function () {
    if (animate && !started) {
        animate.start();
        started = true;
    } else if (animate && started) {
        animate.stop();
        started = false;
    }
});

window.addEventListener('load', () => {
    const svg = document.getElementById("svg");
    animate = new Animate(svg);
});


