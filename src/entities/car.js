import { CAR_WIDTH, CAR_HEIGHT } from '../constants/car-dimensions.js';

const { clientWidth } = document.documentElement;

export default class Car {
    constructor({ x, y, diameter, speed, weight, image }) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.speed = speed;
        this.weight = weight;
        this.image = image;
    }

    updateParams({ x, y, diameter, speed, weight, image }) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.speed = speed;
        this.weight = weight;
        this.image = image;
    }

    update() {
        this.move();

        // Verifica se a bolinha atinge as bordas da tela e inverte a direção
        if (
            this.x <= this.diameter / 2
            || this.x >= (clientWidth - 200 - CAR_WIDTH) - this.diameter / 2
        ) {
            this.speed *= -1;
        }
    }

    display() {
        image(this.image, this.x, this.y, CAR_WIDTH, CAR_HEIGHT);
    }

    move() {
        this.x += this.speed;
    }

    toString() {
        const kineticEnergy = 0.5 * this.weight * (this.speed ** 2);
        const momentum = this.weight * this.speed;
        return `Velocidade: ${this.speed.toFixed(2)} m / s\n` +
            `Massa: ${this.weight} kg\n` +
            `Energia Cinética: ${kineticEnergy.toFixed(2)} J\n` +
            `Momento: ${momentum.toFixed(2)} kgm/s`
    }

    displayInfo() {
        fill(0);
        textAlign(CENTER, BOTTOM);
        textSize(15);
        // Exibe a velocidade e a massa do carrinho
        text(`Velocidade: ${this.speed.toFixed(2)} m/s`, this.x + 50, this.y - this.diameter - 40);
        text(`Massa: ${this.weight} kg`, this.x + 50, this.y - this.diameter - 55);

        // Calcular a energia cinética
        const kineticEnergy = 0.5 * this.weight * (this.speed ** 2);
        text(`Energia Cinética: ${kineticEnergy.toFixed(2)} J`, this.x + 50, this.y - this.diameter - 70);

        // Calcular e exibe o momento do carrinho
        const momentum = this.weight * this.speed;
        text(`Momento: ${momentum.toFixed(2)} kgm/s`, this.x + 60, this.y - this.diameter - 85);
    }
}
