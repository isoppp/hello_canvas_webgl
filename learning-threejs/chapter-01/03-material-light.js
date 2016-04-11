function setPosition(mesh, x, y, z) {
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  return mesh;
}

function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // renderer
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // plane ground
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane = setPosition(plane, 15, 0, 0);
  plane.receiveShadow = true;

  scene.add(plane);

  // cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube = setPosition(cube, -4, 3, 0);
  cube.castShadow = true;

  scene.add(cube);

  // sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere = setPosition(sphere, 20, 4, 2);
  sphere.castShadow = true;

  scene.add(sphere);

  // set camera look at
  camera = setPosition(camera, -30, 40, 30);
  camera.lookAt(scene.position);

  // light
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // init
  document.getElementById('WebGL-output').appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

window.onload = init;