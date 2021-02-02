import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
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
  camera.position.set(0, 0, 5);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);

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
  ); //end load function

  function destroy() {
    window.document.removeEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
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
