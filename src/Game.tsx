import { useEffect, useRef } from "react"
import * as THREE from 'three';

import { randomBetween } from "./utils/helpers";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { UI } from "./UI";

interface Game {
    player: Player;
    scene: THREE.Scene;
    asteroids: Asteroid[];
    textures: {
        asteroid_tex: THREE.Texture;
        earth_tex: THREE.Texture;
        planet_tex: THREE.Texture;
    }
}

const keysPressed: { [key: string]: boolean } = {};
let game: Game | null = null;

function createBillboard(texture: THREE.Texture) {
    const material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff });
    const geometry = new THREE.PlaneGeometry(2, 2);
    return new THREE.Mesh(geometry, material);
}

function billboardLookAt(mesh: THREE.Mesh, camera: THREE.Camera) {
    const { x, y, z } = camera.position;
    mesh.lookAt(x, y, z);
}

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
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;

    constructor(x: number, y: number) {
        super(x, y, randomBetween(5, 10));
        this.mesh = createBillboard(game!.textures.asteroid_tex);
    }

    update(delta: number): void {
        this.mesh.position.set(this.x, 0, this.z);
        billboardLookAt(this.mesh, game!.player.camera);
    }
}

class Player extends Entity {
    camera: THREE.PerspectiveCamera;

    velocity: THREE.Vector2 = new THREE.Vector2(0, 0);
    angleDeg: number = 0;

    constructor() {
        super(-5, 0);

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

        const rotSpeed = 90;
        if (keysPressed['ArrowLeft']) {
            this.angleDeg -= rotSpeed * delta;
            console.log(this.angleDeg);
        }

        if (keysPressed['ArrowRight']) {
            this.angleDeg += rotSpeed * delta;
            console.log(this.angleDeg);
        }

        const baseThrust = 10;
        const thrust = (a: number) => {
            this.velocity.x += Math.cos(this.angleDeg * DEG2RAD) * a * delta;
            this.velocity.y += Math.sin(this.angleDeg * DEG2RAD) * a * delta;
        }

        if (keysPressed['ArrowUp']) {
            thrust(baseThrust);
            console.log(this.velocity);
        }

        if (keysPressed['ArrowDown']) {
            thrust(-baseThrust);
            console.log(this.velocity);
        }

        // apply velocity
        this.x += this.velocity.x * delta;
        this.z += this.velocity.y * delta;

        this.camera.position.set(this.x, 0, this.z);
        this.camera.lookAt(this.x + Math.cos(this.angleDeg * DEG2RAD), 0, this.z + Math.sin(this.angleDeg * DEG2RAD));
    }


}

export const Game: React.FC = () => {

    let canvas = useRef(null);

    useEffect(() => {

        if (game) return;

        // Create a scene
        const scene = new THREE.Scene();

        const texLoader = new THREE.TextureLoader();
        game = {
            player: new Player(),
            scene: scene,
            asteroids: [],
            textures: {
                asteroid_tex: texLoader.load("/images/asteroid_1.png"),
                earth_tex: texLoader.load('/images/earth.png'),
                planet_tex: texLoader.load('/images/planet.png')
            }
        }

        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as any });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add earth
        const earth = createBillboard(game.textures.earth_tex);
        scene.add(earth);

        // Generate asteroids
        for (let i = 0; i < 10; i++) {
            const asteroid = new Asteroid(randomBetween(-50, 50), randomBetween(-50, 50));
            game.asteroids.push(asteroid);
            scene.add(asteroid.mesh);
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            const delta = 1 / 60;
            game!.player.update(delta);
            game!.asteroids.forEach(asteroid => asteroid.update(delta));

            billboardLookAt(earth, game!.player.camera);

            renderer.render(scene, game!.player.camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            game?.player.resizeCam(window.innerWidth, window.innerHeight);
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            keysPressed[event.key] = false;
        });

    })

    return (
        <>
            <canvas ref={canvas} />
            <UI />
        </>
    )
}