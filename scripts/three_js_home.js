import * as THREE from "three";

let camera, scene, renderer;
let directed_light, sphere_mesh, sphere_mesh2;

init();

// Initializing sim
function init() {
    // Creating the scenes camera
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.z = 2;
    camera.position.x = -1;

    // Creating the scene
    scene = new THREE.Scene();

    const geo_sphere = new THREE.SphereGeometry(
        5,
        10,
        10,
        0,
        2 * Math.PI,
        0.5 * Math.PI,
        Math.PI
    );
    const mat_sphere = new THREE.MeshStandardMaterial({ color: 0x2445d6 });
    mat_sphere.side = THREE.BackSide;
    sphere_mesh = new THREE.Mesh(geo_sphere, mat_sphere);
    //sphere_mesh.position.z = -8;
    sphere_mesh.rotation.z += 0.5;
    scene.add(sphere_mesh);

    const geo_sphere2 = new THREE.SphereGeometry(
        6,
        10,
        10,
        0,
        2 * Math.PI,
        0.5 * Math.PI,
        Math.PI
    );
    const mat_sphere2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    mat_sphere2.side = THREE.BackSide;
    sphere_mesh2 = new THREE.Mesh(geo_sphere2, mat_sphere2);
    //sphere_mesh.position.z = -8;
    sphere_mesh2.rotation.z += 0.8;
    sphere_mesh2.rotation.x += 10;

    scene.add(sphere_mesh2);

    // Setting up lights
    // Ambient light
    const ambient_light = new THREE.AmbientLight(0x171717);
    scene.add(ambient_light);

    // Directional light
    directed_light = new THREE.PointLight(0xffffff, 1);
    directed_light.position.set(5, 5, 2);
    directed_light.castShadow = true; // Enable shadow casting
    directed_light.shadow.mapSize.width = 1024; // Shadow map resolution
    directed_light.shadow.mapSize.height = 1024;
    scene.add(directed_light);

    // Three js settings
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.getElementById("container").appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);
}

// Resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    // Rotating spheres
    sphere_mesh.rotation.y += 0.0025;
    sphere_mesh2.rotation.y -= 0.0025;
    sphere_mesh2.rotation.x -= 0.0005;

    renderer.render(scene, camera);
}
