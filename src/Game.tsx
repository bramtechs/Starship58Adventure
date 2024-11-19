import { useEffect, useRef } from "react"
import * as THREE from 'three';

import Asteroid1 from './assets/images/asteroid_1.webp';
import { randomBetween } from "./utils/helpers";
import { DEG2RAD, RAD2DEG } from "three/src/math/MathUtils.js";

interface Game {
    player: Player;
    scene: THREE.Scene;
}

function getRandomAsteroid() {
    return Asteroid1;
}

const keysPressed: { [key: string]: boolean } = {};
let game: Game | null = null;

abstract class Entity {
    x: number;
    z: number;
    radius: number;

    constructor(x: number, y: number, radius: number = 5) {
        this.x = x;
        this.z = y;
        this.radius = radius;
    }

    abstract update(delta: number): void;

}

class Asteroid extends Entity {
    constructor(x: number, y: number) {
        super(x, y, randomBetween(5, 10));
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        game!.scene.add(cube);
    }

    update(delta: number): void {
        throw new Error("Method not implemented.");
    }
}

class Player extends Entity {
    camera: THREE.PerspectiveCamera;

    velocity: THREE.Vector2 = new THREE.Vector2(0, 0);
    angleDeg: number = 0;

    constructor() {
        super(0, 0);

        this.camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
    }

    resizeCam(w: number, h: number) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    update(delta: any): void {
        if (keysPressed['ArrowLeft']) {
            this.angleDeg -= 10 * delta;
            console.log(this.angleDeg);
        }

        if (keysPressed['ArrowRight']) {
            this.angleDeg += 10 * delta;
            console.log(this.angleDeg);
        }

        if (keysPressed['ArrowUp']) {
            const baseThrust = 10;
            this.velocity.x += Math.cos(this.angleDeg * DEG2RAD) * baseThrust;
            this.velocity.y += Math.sin(this.angleDeg * DEG2RAD) * baseThrust;

            console.log(this.velocity);
        }

        // apply velocity
        this.x += this.velocity.x * delta;
        this.z += this.velocity.y * delta;

        this.camera.position.set(this.x, 0, this.z);
    }


}

export const Game: React.FC = () => {

    let canvas = useRef(null);

    useEffect(() => {

        // Create a scene
        const scene = new THREE.Scene();

        // Create a camera
        const camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    })

    return (<canvas ref={canvas} />)
}