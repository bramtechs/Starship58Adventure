import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';

import { randomBetween } from "./utils/helpers";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { UI } from "./UI";
import { set } from "react-hook-form";


interface Game {
    player: Player;
    scene: THREE.Scene;
    asteroids: Asteroid[];
    earth: Planet | null,
    trappist: Planet | null,
    notPlayer: Entity[];
}

interface Textures {
    asteroid_tex: THREE.Texture;
    earth_tex: THREE.Texture;
    planet_tex: THREE.Texture;
}

function getRandomAsteroid() {
    return Asteroid;
}

const keysPressed: { [key: string]: boolean } = {};
let game: Game | null = null;
let textures: Textures | null = null;

function createBillboard(texture: THREE.Texture, radius: number) {
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        color: 0xffffff, 
        alphaTest: 0.5, 
        transparent: true 
    });
    const geometry = new THREE.PlaneGeometry(radius * 2, radius * 2);
    return new THREE.Mesh(geometry, material);
}

function billboardLookAt(mesh: THREE.Mesh, camera: THREE.Camera) {
    const { x, y, z } = camera.position;
    mesh.lookAt(x, y, z);
}

function debugCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
}

function touchSphere(radius: number) {
    const geometry = new THREE.SphereGeometry(radius / 1.8, 32, 32);

    // Create a transparent material
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5
    });

    const m = new THREE.Mesh(geometry, material);
    m.renderOrder = 1;
    return m;
}


abstract class Entity {
    x: number;
    z: number;
    radius: number;
    dangerSphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;

    constructor(x: number, y: number, radius: number = 5) {
        this.x = x;
        this.z = y;
        this.radius = radius;
        this.dangerSphere = touchSphere(this.radius);
        this.dangerSphere.visible = false;
        game?.scene.add(this.dangerSphere);
    }


    distanceTo(x: number, z: number): number {
        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.z - z, 2));
    }

    collidesWith(entity: Entity): boolean {
        return this.distanceTo(entity.x, entity.z) < this.radius / 1.2;
    }

    hideDanger() {
        this.dangerSphere.visible = false;
    }

    showDanger() {
        this.dangerSphere.position.set(this.x, 0, this.z);
        this.dangerSphere.visible = true;
    }

    abstract update(delta: number): void;

}
class Asteroid extends Entity {
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;

    constructor(x: number, y: number) {
        super(x, y, randomBetween(1, 10));
        this.mesh = createBillboard(textures!.asteroid_tex, this.radius);
    }

    update(delta: number): void {
        this.mesh.position.set(this.x, 0, this.z);
        billboardLookAt(this.mesh, game!.player.camera);
    }
}

class Planet extends Entity {
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;

    constructor(x: number, y: number, texture: THREE.Texture) {
        super(x, y, 10);
        this.mesh = createBillboard(texture, this.radius);
        game!.scene.add(this.mesh);
        console.log("planet")
    }

    update(delta: number): void {
        billboardLookAt(this.mesh, game!.player.camera);
        this.mesh.position.set(this.x, 0, this.z);
    }
}

type CrashCb = (healthLost: number, oxygenLoss: number) => void;

class Player extends Entity {
    camera: THREE.PerspectiveCamera;

    velocity: THREE.Vector2 = new THREE.Vector2(0, 0);
    angleDeg: number = 0;

    timeSinceLastCrash: number = 0;

    camOffset: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    shakeId: any = null;
    onCrashed: CrashCb;

    constructor(onCrashed: CrashCb) {
        super(-25, 0);
        this.onCrashed = onCrashed;
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

    shake() {
        let shakes = 0;
        if (!this.shakeId) {
            this.shakeId = setInterval(() => {
                const shakeAmount = 0.01;
                this.camOffset.set(
                    randomBetween(-shakeAmount, shakeAmount),
                    randomBetween(-shakeAmount, shakeAmount),
                    randomBetween(-shakeAmount, shakeAmount)
                )
                if (shakes++ > 10) {
                    clearInterval(this.shakeId);
                    this.camera.position.set(this.x, 0, this.z);
                    this.camOffset.set(0, 0, 0);
                    this.shakeId = null;
                }
                console.log("shaking");
            }, 50);
        }
    }

    crash() {
        if (this.timeSinceLastCrash > 2) {
            console.warn("You crashed!");
            const damage = randomBetween(20, 30);
            const oxygenLoss = randomBetween(5, 15);
            this.onCrashed(damage, oxygenLoss);
            this.timeSinceLastCrash = 0;
            this.shake();
            this.velocity.set(0, 0);
        }
    }

    update(delta: number): void {
        this.timeSinceLastCrash += delta;

        const rotSpeed = 90;
        if (keysPressed['ArrowLeft']) {
            this.angleDeg -= rotSpeed * delta;
            //console.log(this.angleDeg);
        }

        if (keysPressed['ArrowRight']) {
            this.angleDeg += rotSpeed * delta;
            //console.log(this.angleDeg);
        }

        const baseThrust = 10;
        const thrust = (a: number) => {
            this.velocity.x += Math.cos(this.angleDeg * DEG2RAD) * a * delta;
            this.velocity.y += Math.sin(this.angleDeg * DEG2RAD) * a * delta;
        }

        let thrusting = false;
        if (keysPressed['ArrowUp']) {
            thrust(baseThrust);
            //console.log(this.velocity);
            thrusting = true;
        }

        if (keysPressed['ArrowDown']) {
            thrust(-baseThrust);
            //console.log(this.velocity);
            thrusting = true;
        }

        if (!thrusting) {
            // dampen velocity
            this.velocity.multiplyScalar(0.99);
        }

        // apply velocity
        this.x += this.velocity.x * delta;
        this.z += this.velocity.y * delta;

        this.camera.position.set(this.x + this.camOffset.x, this.camOffset.y, this.z + + this.camOffset.z);
        this.camera.lookAt(this.x + Math.cos(this.angleDeg * DEG2RAD), 0, this.z + Math.sin(this.angleDeg * DEG2RAD));

        game!.notPlayer.forEach(entity => {
            if (this.collidesWith(entity)) {
                this.crash();
            }
        });

        game!.notPlayer.forEach(entity => {
            if (this.collidesWith(entity)) {
                entity.showDanger();
            } else {
                entity.hideDanger();
            }
        });
    }



}

export const Game: React.FC = () => {
    let [distance, setDistance] = useState<number>(0);
    let [xCoordScreen, setXCoordScreen] = useState<number>(0);
    let [yCoordScreen, setYCoordScreen] = useState<number>(0);
    let canvas = useRef(null);

    const [health, setHealth] = useState<number>(100);
    const [oxygen, setOxygen] = useState<number>(100);

    const [speed, setSpeed] = useState<number>(0);

    const shipMaxSpeed = 1;

    useEffect(() => {

        if (game) return;

        // Create a scene
        const scene = new THREE.Scene();

        const texLoader = new THREE.TextureLoader();

        textures = {
            asteroid_tex: texLoader.load("/images/asteroid_1.png"),
            earth_tex: texLoader.load('/images/earth.png'),
            planet_tex: texLoader.load('/images/planet.png')
        }

        function onCrash(healthLost: number, oxygenLost: number) {
            setHealth(health => health - healthLost);
            setOxygen(oxygen => oxygen - oxygenLost);
        }

        game = {
            player: new Player(onCrash),
            scene: scene,
            asteroids: [],
            earth: null,
            trappist: null,
            notPlayer: []
        }

        game.earth = new Planet(0, 0, textures.earth_tex);
        game.trappist = new Planet(randomBetween(-500, 500), randomBetween(-500, 500), textures.planet_tex);


        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as any });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const maxRange = 250;

        // Generate asteroids around center point between earth and trappist
        const centerX = (game.earth.x + game.trappist.x) / 2;
        const centerZ = (game.earth.z + game.trappist.z) / 2;

        for (let i = 0; i < 80; i++) {
            const x = centerX + randomBetween(-maxRange, maxRange);
            const z = centerZ + randomBetween(-maxRange, maxRange);
            const asteroid = new Asteroid(x, z);
            game.asteroids.push(asteroid);
            scene.add(asteroid.mesh);
        }


        game.notPlayer = [game.earth, game.trappist, ...game.asteroids];

        function distanceBetweenPlanet() {
            if (game?.trappist?.mesh.position) {
                return game.player.camera.position.distanceTo(game.trappist.mesh.position);
            }
            return 0;
        }

        let speedUpdateTimer = 0;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            const delta = 1 / 60;
            game!.player.update(delta);
            game!.asteroids.forEach(asteroid => asteroid.update(delta));
            game!.earth!.update(delta);
            game!.trappist!.update(delta);

            //get distance between player and trappist
            const distance = distanceBetweenPlanet();
            setDistance(distance);

            //get x coordinate of trappist on screen
            const vector = new THREE.Vector3(game!.trappist!.mesh.position.x, 0, game!.trappist!.mesh.position.z);
            vector.project(game!.player.camera);

            const width = window.innerWidth;
            const xCoord = Math.round((vector.x + 1) / 2 * width);
            setXCoordScreen(xCoord);
            setYCoordScreen(Math.round((-vector.y + 1) / 2 * window.innerHeight));

            renderer.render(scene, game!.player.camera);

            speedUpdateTimer += delta;

            if (speedUpdateTimer > 0.2) {
                speedUpdateTimer = 0;
                setSpeed(game!.player.velocity.length());
            }
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
            <UI shipSpeed={speed} oxygenLevel={oxygen} shipMaxSpeed={shipMaxSpeed} distance={distance} HullHealth={health} Objectives={["Navigate to TRAPPIST-1.", "Do not destroy your ship!", "Do not run out of oxygen!"]} XCoordTrappist={xCoordScreen} YCoordTrappist={yCoordScreen} />
        </>
    )
}

