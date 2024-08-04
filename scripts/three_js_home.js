import * as THREE from 'three';

let camera, scene, renderer;
let solid_cube_mesh, wire_cube_mesh, directed_light;

init();

// Initializing sim
function init() {
    // Creating the scenes camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 2;
    camera.position.x = -1;

    // Creating the scene
    scene = new THREE.Scene();

    // Creating a solid cube
    const geo_solid_cube = new THREE.BoxGeometry();
    const mat_solid_cube = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    solid_cube_mesh = new THREE.Mesh( geo_solid_cube, mat_solid_cube );
    scene.add( solid_cube_mesh );

    // Creating the wire frame cube
    const geo_wire_cube = new THREE.BoxGeometry(1.15, 1.15, 1.15);
    const mat_wire_cube = new THREE.MeshStandardMaterial( { color: 0xffffff , wireframe: true} );
    wire_cube_mesh = new THREE.Mesh( geo_wire_cube, mat_wire_cube );
    scene.add( wire_cube_mesh );

    // Setting up lights
    // Ambient light
    const ambient_light = new THREE.AmbientLight( 0x171717 );
    scene.add( ambient_light );

    // Directional light
    directed_light = new THREE.DirectionalLight( 0xffffff, 1 );
    directed_light.position.set( 5, 5, 5 );
    directed_light.castShadow = true;  // Enable shadow casting
    directed_light.shadow.mapSize.width = 1024;  // Shadow map resolution
    directed_light.shadow.mapSize.height = 1024;
    scene.add( directed_light );


    // Three js settings
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.getElementById("container").appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize );
}

// Resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Animation loop
function animate() {    

    wire_cube_mesh.rotation.x = solid_cube_mesh.rotation.x += 0.004;
    wire_cube_mesh.rotation.y = solid_cube_mesh.rotation.y += 0.006;

    renderer.render( scene, camera );
}
