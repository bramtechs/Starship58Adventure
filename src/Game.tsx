import { useEffect, useRef } from "react"
import * as THREE from 'three';

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
        const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });
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