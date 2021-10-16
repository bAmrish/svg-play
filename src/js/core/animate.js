import {Circle} from "./circle.js";
import {Point} from "./point.js";

export class Animate {
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