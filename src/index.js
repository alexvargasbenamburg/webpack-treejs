import * as THREE from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  var camera, scene, renderer;

  const textureLoader = new THREE.TextureLoader();

  var cube;
  var logo;

  init();
  render();

  function init() {
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    initLights();
    initObjects();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
  }

  function initLights() {
    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight();
    scene.add(spotLight);
    spotLight.position.set(10, 10, 10);
  }

  function initObjects() {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0x00afaf,
      side: THREE.DoubleSide,
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const logoGeometry = new THREE.PlaneGeometry(0.25, 0.25);
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load('static/imgs/LogoRojo.svg'),
    });
    logo = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logo);
    logo.position.set(-1.5,-1.5,0);
  }

  function update() {
    cube.rotateZ(0.01);
    cube.rotateY(0.01);
    logo.rotateZ(0.01);
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
