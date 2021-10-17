import {Circle} from "./circle.js";
import {Path} from "./path.js";

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
    xSpeed = 2* SPEED;
    ySpeed = SPEED;
    xDirection = 1;
    yDirection = 1;
    interval = 0;
    circle;
    currentPath;
    color = 'black';
    paths = [];
    stringMode = true;

    constructor(svg) {
        this.svg = svg;
        this.circle = new Circle(START_X, START_Y, CIRCLE_RADIUS, this.color);
        this.svg.appendChild(this.circle.getNode());
        this.randomStart(this.circle);
        this.currentPath = new Path(this.circle.x(), this.circle.y(), this.color);
        this.currentPath.draw(this.svg);
        this.paths.push(this.currentPath);
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
        let bounced = false;

        if (c.x() <= xLowerLimit || c.x() >= xUpperLimit) {
            this.xDirection = this.xDirection * -1;
            bounced = true;
        }

        if (c.y() <= yLowerLimit || c.y() >= yUpperLimit) {
            this.yDirection = this.yDirection * -1;
            bounced = true;
        }

        if (bounced) {
            if(!this.stringMode) {
                this.currentPath = new Path(c.x(), c.y(), this.color);
                this.currentPath.draw(this.svg);
                this.paths.push(this.currentPath);
            }
            if (this.randomColor) {
                this.setColor(getRandomColor());
            }
        }

        c.x(c.x() + this.xSpeed * this.xDirection)
        c.y(c.y() + this.ySpeed * this.yDirection)

        this.currentPath.to(c.x(), c.y());
    }

    stop() {
        clearInterval(this.interval);
    }

    setSpeed(val) {
        this.xSpeed = val;
        this.ySpeed = val;
        return this;
    }

    setXSpeed(val) {
        this.xSpeed = val;
    }

    setYSpeed(val) {
        this.ySpeed = val;
    }

    setSize(val) {
        this.r = val;
        this.circle.radius(this.r);
        return this;
    }

    setColor(val) {
        this.color = val;
        this.circle.color(this.color);
        this.currentPath.color(this.color);
    }

    setStringMode(val) {
        this.stringMode = !!val;
    }

    clear() {
        const currentPath = this.currentPath;
        this.paths.forEach((path => {
            if(this.stringMode && path === this.currentPath) {
                return;
            }
            this.svg.removeChild(path.getNode());
            path = null;
        }));
        if(this.stringMode) {
            this.paths = [currentPath];
        } else {
            this.paths = [];
        }
    }

    randomizeColor(val) {
        if (val === undefined) {
            return this.randomColor;
        }

        this.randomColor = val;
        return this;
    }

}