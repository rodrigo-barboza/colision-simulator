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
            if (colisionType === 'elastic') {
                sounds.crash.play();
            }
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
    colisionType = document.querySelector('.btn-toggle').innerText === 'Colisão elástica'
        ? 'elastic'
        : 'inelastic';

    sounds.startEngine.play();
    sounds.traffic.loop();

    setTimeout(() => {
        simulationRunning = true;
    }, 500);
});

document.querySelector('.btn-toggle').addEventListener('click', () => {
    colisionType = colisionType === 'elastic' ? 'inelastic' : 'elastic';

    document.querySelector('.btn-toggle').innerHTML = colisionType === 'elastic'
        ? 'Colisão elástica'
        : 'Colisão inelástica';
});

document.querySelector('.btn-reset').addEventListener('click', () => {
    simulationRunning = false;
    
    carsProperties[0] = {
        ...carsProperties[0],
        weight: parseFloat(document.querySelector('#car-a-weight').value * 10),
        speed: parseFloat(document.querySelector('#car-a-speed').value),
    }

    carsProperties[1] = {
        ...carsProperties[1],
        weight: parseFloat(document.querySelector('#car-b-weight').value * 10),
        speed: parseFloat(document.querySelector('#car-b-speed').value),
    }

    cars.forEach((car, index) => car.updateParams(carsProperties[index]));

    sounds.startEngine.play();
    sounds.traffic.loop();

    setTimeout(() => {
        simulationRunning = true;
    }, 500);
});

document.querySelector('#car-a-weight').addEventListener('change', (event) => {
    document.querySelector('#car-a-weight-value').innerHTML = `${event.target.value * 10} kg`;
});

document.querySelector('#car-a-speed').addEventListener('change', (event) => {
    document.querySelector('#car-a-speed-value').innerHTML = `${event.target.value} m/s`;
});

document.querySelector('#car-b-weight').addEventListener('change', (event) => {
    document.querySelector('#car-b-weight-value').innerHTML = `${event.target.value * 10} kg`;
});

document.querySelector('#car-b-speed').addEventListener('change', (event) => {
    document.querySelector('#car-b-speed-value').innerHTML = `${event.target.value} m/s`;
});
