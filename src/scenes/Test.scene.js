import * as THREE from 'three';

// Loaders
const textureLoader = new THREE.TextureLoader();
const fontLoader = new THREE.FontLoader();
const audioLoader = new THREE.AudioLoader();
// Main scene objs
var camera;
var listener;
var scene;
//Scene objs
var text;

function TestScene(setScene) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  listener = new THREE.AudioListener();
  camera.add(listener);
  camera.position.set(0, 0, 5);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);
  initObjects();

  function destroy() {
    window.document.removeEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  function initObjects() {
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
        const message = 'TEST SCENE';
        const shapes = font.generateShapes(message, 1);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        text = new THREE.Mesh(geometry, matLite);
        text.position.set(-5, 0, -20);
        scene.add(text);
      }
    );
    const sound1 = new THREE.PositionalAudio(listener);
    audioLoader.load('static/songs/airtone_-_citySkies_2.mp3', function (buffer) {
      sound1.setBuffer(buffer);
      sound1.setRefDistance(20);
      sound1.play();
    });
    text.add(sound1);
  }

  function update() {}

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default TestScene;
