import { CAR_WIDTH } from '../constants/car-dimensions.js';
import { ELASTIC } from '../constants/colision-types.js';

export default class Colision {
    constructor(cars) {
        [this.carA, this.carB] = cars;
    }

    hadCollision() {
        return dist(this.carA.x, this.carA.y, this.carB.x, this.carB.y) < CAR_WIDTH;
    }

    resolve(coefficient_restitution) {
        let tempSpeedA = this.carA.speed;

        this.carA.speed = (coefficient_restitution * this.carB.weight * (this.carB.speed - this.carA.speed) + (this.carA.weight * this.carA.speed) + (this.carB.weight * this.carB.speed)) / (this.carA.weight + this.carB.weight)

        this.carB.speed = (coefficient_restitution * this.carA.weight * (tempSpeedA - this.carB.speed) + (this.carA.weight * tempSpeedA) + (this.carB.weight * this.carB.speed)) / (this.carA.weight + this.carB.weight)
    }
}
