import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./index.css"

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const smallImg = "/src/three/squareSmall.jpg";
  let smallArr = [];
  for (let i = 0; i < 6; i++) {
    smallArr.push(smallImg);
  }
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({});
  material.map = new THREE.TextureLoader().load(smallImg);

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.DirectionalLight(0xffffff, 1 * Math.PI);
  light.target = cube;
  scene.add(light);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.5 * Math.PI);
  scene.add(ambLight);

  const img = "/src/three/squareCap.png";
  const backCube = new THREE.CubeTextureLoader().load([img, img, img, img, img, img]);
  scene.background = backCube;

  camera.position.z = 5;

  let wentUp = false;
  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    wentUp ? (cube.position.y -= 0.1) : (cube.position.y += 0.1);
    wentUp = !wentUp;

    controls.update();

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}

main();
