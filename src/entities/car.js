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

    displayInfo() {
        fill(0);
        textAlign(CENTER, BOTTOM);

        // Exibe a velocidade e a massa do carrinho
        text(`Velocidade: ${this.speed.toFixed(2)} m/s`, this.x + 150, this.y - this.diameter - 20);
        text(`Massa: ${this.weight} kg`, this.x + 160, this.y - this.diameter - 35);

        // Calcular a energia cinética
        const kineticEnergy = 0.5 * this.weight * (this.speed ** 2);
        text(`Energia Cinética: ${kineticEnergy.toFixed(2)} J`, this.x + 150, this.y - this.diameter - 50);

        // Calcular e exibe o momento do carrinho
        const momentum = this.weight * this.speed;
        text(`Momento: ${momentum.toFixed(2)} kgm/s`, this.x + 160, this.y - this.diameter - 65);
    }
}
