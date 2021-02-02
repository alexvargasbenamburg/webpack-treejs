import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//Scene objs
var cube;
var logo;
var text;

function WelcomeScene(setScene) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0,0,5);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);
  initLights();
  initObjects();

  function destroy() {
    window.document.removeEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
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
    logo.position.set(-1.5, -1.5, 0);

    fontLoader.load(
      '/static/fonts/helvetiker_regular.typeface.json',
      function (font) {
        const color = 0x006699;
        const matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });
        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });
        const message = 'BASIC EXAMPLE';
        const shapes = font.generateShapes(message, 1);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        text = new THREE.Mesh(geometry, matLite);
        text.position.set(-5, 6, -20);
        scene.add(text);
      }
    ); //end load function
  }

  function update() {
    cube.rotateZ(0.01);
    cube.rotateY(0.01);
    logo.rotateZ(0.01);
  }

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default WelcomeScene;
