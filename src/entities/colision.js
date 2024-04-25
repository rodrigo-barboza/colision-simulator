import { CAR_WIDTH } from '../constants/car-dimensions.js';
import { ELASTIC } from '../constants/colision-types.js';

export default class Colision {
    constructor(cars) {
        [this.carA, this.carB] = cars;
    }

    hadCollision() {
        return dist(this.carA.x, this.carA.y, this.carB.x, this.carB.y) < CAR_WIDTH;
    }

    elastic() {
        let tempSpeed = this.carA.speed;

        this.carA.speed = this.carB.speed;
        this.carB.speed = tempSpeed;
    }

    inelastic() {
        // Calcula a velocidade média dos objetos
        let averageSpeed = (this.carA.speed + this.carB.speed) / 2;

        // Define a mesma velocidade para ambos os objetos
        this.carA.speed = averageSpeed;
        this.carB.speed = averageSpeed;
    }

    resolve(type) {
        if (type === ELASTIC) {
            return this.elastic();
        }

        return this.inelastic();
    }
}
