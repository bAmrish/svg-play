const SVG_NS = "http://www.w3.org/2000/svg";

export class Path {

    constructor(x, y, color = 'black') {
        this.x = x;
        this.y = y;
        this.stroke = color;
        this.create();
    }

    create() {
        this.node = document.createElementNS(SVG_NS, "path");
        this.node.setAttribute('d', `M ${this.x} ${this.y}`);
        this.node.setAttribute('stroke', this.stroke);
    }

    draw(svg) {
        svg.appendChild(this.node);
    }


    getNode() {
        return this.node;
    }

    to(x, y) {
        this.node.setAttribute('d', `M ${this.x} ${this.y} L ${x} ${y}`);
    }

    color(val) {
        if(!val) {
            return this.stroke;
        }
        this.node.setAttribute('stroke', val);
    }

}