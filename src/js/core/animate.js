import {Circle} from "./circle.js";
import {Point} from "./point.js";

// define default values
const CIRCLE_RADIUS = 30;
const CIRCLE_X_START_OFFSET = 1;
const CIRCLE_Y_START_OFFSET = 1;
const SPEED = 2;
const START_X = (CIRCLE_RADIUS * 2 + CIRCLE_X_START_OFFSET);
const START_Y = (CIRCLE_RADIUS * 2 + CIRCLE_Y_START_OFFSET);

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`
}

export class Animate {

    randomColor = true;
    svg = null;
    r = CIRCLE_RADIUS;
    speed = SPEED;
    xDirection = 1;
    yDirection = 1;
    interval = 0;
    circle;
    color = 'black';
    points = [];

    constructor(svg) {
        this.svg = svg;
        this.circle = new Circle(START_X, START_Y, CIRCLE_RADIUS, this.color);
        this.svg.appendChild(this.circle.getNode());
        this.randomStart(this.circle);
    }

    randomStart(circle) {
        const minX = this.r + 1;
        const minY = this.r + 1;
        const maxX = this.svg.clientWidth - this.r - CIRCLE_X_START_OFFSET;
        const maxY = this.svg.clientHeight - this.r - CIRCLE_Y_START_OFFSET;
        const x = minX + (Math.random() * (maxX - minX));
        const y = minY + (Math.random() * (maxY - minY));
        this.color = getRandomColor();
        circle.x(x)
        circle.y(y)
        circle.color(this.color);
    }

    start() {
        this.interval = setInterval(() => {
            this.moveCircle()
        }, 1);
    }

    moveCircle() {
        const c = this.circle;
        const xLowerLimit = this.r;
        const yLowerLimit = this.r;
        const xUpperLimit = this.svg.clientWidth - this.r - CIRCLE_X_START_OFFSET;
        const yUpperLimit = this.svg.clientHeight - this.r - CIRCLE_Y_START_OFFSET;

        if (c.x() <= xLowerLimit || c.x() >= xUpperLimit) {
            this.xDirection = this.xDirection * -1;

            if (this.randomColor) {
                this.setColor(getRandomColor());
            }
        }

        if (c.y() <= yLowerLimit || c.y() >= yUpperLimit) {
            this.yDirection = this.yDirection * -1;

            if (this.randomColor) {
                this.setColor(getRandomColor());
            }
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
        this.points.forEach((point => {
            this.svg.removeChild(point.getNode());
            point = null;
        }));
        this.points = [];
    }

    randomizeColor(val) {
        if (val === undefined) {
            return this.randomColor;
        }

        this.randomColor = val;
        return this;
    }

}