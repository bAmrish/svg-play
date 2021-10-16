import {Animate} from "./core/animate.js";
import {Controls} from "./core/controls.js";

window.addEventListener('load', () => {
    const svg = document.getElementById("canvas");
    const animate = new Animate(svg);
    const controls = new Controls(animate);
    controls.create();
});


