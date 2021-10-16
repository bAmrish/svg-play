const rgbToHex = (rgb) => {
    const pattern = /^rgb\((\d+), (\d+), (\d+)\)/;
    const matches = rgb.match(pattern);
    if (matches.length === 4) {
        const r = parseInt(matches[1], 10).toString(16);
        const g = parseInt(matches[2], 10).toString(16);
        const b = parseInt(matches[3], 10).toString(16);
        return `#${r}${g}${b}`;
    }
}

export class Controls {
    playing = false;

    constructor(animate) {
        this.animate = animate;
    }

    create() {
        const play = document.getElementById('play');
        const speed = document.getElementById('speed');
        const size = document.getElementById('size');
        const color = document.getElementById('color');
        const clear = document.getElementById('clear');

        color.value = rgbToHex(this.animate.color);

        speed.value = this.animate.speed;
        size.value = this.animate.r;

        play.addEventListener('click', () => {
            if (!this.playing) {
                this.animate.start();
                play.innerHTML = 'Stop'
                this.playing = true;
            } else {
                this.animate.stop();
                play.innerHTML = 'Start'
                this.playing = false;
            }
        });


        speed.addEventListener('change', (event) => {
            this.animate.setSpeed(event.target.value);
        });

        size.addEventListener('change', (event) => {
            this.animate.setSize(event.target.value);
        });

        color.addEventListener('input', (event) => {
            this.animate.setColor(event.target.value);
        }, false);

        clear.addEventListener('click', () => {
            this.animate.clear();
        }, false);
    }
}