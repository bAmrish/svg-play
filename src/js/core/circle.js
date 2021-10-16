export class Circle {
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