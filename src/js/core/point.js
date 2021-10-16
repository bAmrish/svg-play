import {Circle} from "./circle.js";

export class Point {
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
        if (!val) {
            return this.options.fill;
        }
        this.options.fill = val;
        this.options.stroke = val;
        this.circle.options(this.options);
    }
}