import Car from './entities/car.js';
import Colision from './entities/colision.js';

let backgroundImage;
let sounds = {};
let carsProperties = [];
let cars = [];

let colision;
let simulationRunning = false;
let colisionType = 'elastic';

const { clientWidth, clientHeight } = document.documentElement;

window.preload = () => {
    backgroundImage = loadImage('./assets/images/background.png');

    sounds = {
        engine: window.loadSound('./assets/sounds/engine_sound.mp3'),
        crash: window.loadSound('./assets/sounds/qubodup-crash.ogg'),
        startEngine: window.loadSound('./assets/sounds/engine_start_up_01.wav'),
        traffic: window.loadSound('./assets/sounds/gatve-varniu.ogg'),
    };

    carsProperties = [
        {
            x: 100,
            y: 450,
            diameter: 50,
            speed: 5,
            weight: 100,
            image: loadImage('./assets/images/car-a.png'),
        },
        {
            x: 1000,
            y: 450,
            diameter: 50,
            speed: 0,
            weight: 140,
            image: loadImage('./assets/images/car-b.png'),
        },
    ];
}

window.setup = () => {
    canvas = createCanvas(clientWidth - 200, clientHeight - 200);

    cars = carsProperties.map((car) => new Car(car));
    colision = new Colision(cars);
}

window.draw = () => {
    background(backgroundImage);

    cars.forEach((car) => car.display());

    if (simulationRunning) {
        cars.forEach((car) => car.update());

        if (colision.hadCollision()) {
            sounds.crash.play();
            colision.resolve(colisionType);
        }
    }

    cars.forEach((car) => car.displayInfo());
}

window.windowResized = () => {
    resizeCanvas(clientWidth - 200, clientHeight - 200);
}

document.querySelector('.btn-pause').addEventListener('click', () => {
    simulationRunning = false;
});

document.querySelector('.btn-start').addEventListener('click', () => {
    sounds.startEngine.play();
    sounds.traffic.loop();

    setTimeout(() => {
        simulationRunning = true;
    }, 500);
});
