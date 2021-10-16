export class Controls {
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