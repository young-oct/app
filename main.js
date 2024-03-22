import "./style.css";
import * as THREE from "three";
import jeffImg from "/jeff.png";
// import appStl from "/models/ear.stl";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const jeffTexture = new THREE.TextureLoader().load(jeffImg);
const loader = new STLLoader();

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

loader.load(
  "/models/ear.stl",
  // onLoad callback
  function (geometry) {
    // Create material with red color
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Adjust scale
    mesh.scale.set(5, 5, 5);

    // Position the mesh in the top-left corner
    mesh.position.set(-25, 0, 0);

    // Add mesh to the scene
    scene.add(mesh);
  },
  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // onError callback
  function (error) {
    console.error("Error loading STL file:", error);
  }
);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load("jeff.png");

const jeff = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({
  // map: new THREE.TextureLoader().load("moon.jpg"),
  // normalMap: new THREE.TextureLoader().load("normal.jpg"),
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
