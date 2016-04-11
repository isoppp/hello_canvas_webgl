function setPosition(mesh,x,y,z){
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  return mesh;
}

function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // axes
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  // plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  // cube
  var cubeGeometry = new THREE.BoxGeometry(4,4,4);
  var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000,wireframe:true});
  var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube = setPosition(cube,-4,3,0);

  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4,20,20);
  var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff,wireframe:true});
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere = setPosition(sphere,20,4,2);
  scene.add(sphere);

  camera = setPosition(camera,-30,40,30);
  camera.lookAt(scene.position);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);
  renderer.render(scene,camera);
}

window.onload = init;