import * as THREE from 'three';
import { WEBGL } from './webgl';

import WelcomeScene from './scenes/welcome';

if (WEBGL.isWebGLAvailable()) {
  var renderer;
  var scene;
  var camera;
  var update;
  var destroy;

  init();
  render();

  function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    var firstScene = WelcomeScene(setScene);
    setScene(firstScene);
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
  }

  function setScene(sceneObj) {
    if (destroy != null) destroy();
    scene = sceneObj.scene;
    camera = sceneObj.camera;
    update = sceneObj.update;
    destroy = sceneObj.destroy;
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
