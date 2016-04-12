function setPosition(mesh, x, y, z) {
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  return mesh;
}

function init() {
  // stats init
  function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output').appendChild(stats.domElement);
    return stats;
  }

  var stats = initStats();

  // scene
  var scene = new THREE.Scene();

  //camera
  var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera = setPosition(camera, -50, 20, 50);
  camera.lookAt(scene.position);

  scene.add(camera);

  // renderer
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // plane ground
  var planeGeometry = new THREE.PlaneGeometry(80, 60, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane = setPosition(plane, 0, 0, 0);
  plane.receiveShadow = true;

  scene.add(plane);

  // ambient light
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // light
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // control
  var controls = new function () {
    this.rotationSpeed = 0.2;
    this.numberOfObjects = scene.children.length;

    // add cube function
    this.addCube = function () {
      var cubeSize = Math.ceil(((Math.random() + 0.25) * 3));
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = "cube-" + scene.children.length;

      cube.position.x = -(planeGeometry.parameters.width / 2) + Math.round((Math.random() * planeGeometry.parameters.width));
      cube.position.y = 1 + Math.round((Math.random() * 5));
      cube.position.z = -(planeGeometry.parameters.height / 2) + Math.round((Math.random() * planeGeometry.parameters.height));
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    // remove cube function
    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    // output children function
    this.outputObjects = function () {
      console.log(scene.children);
    };
  };
  for(var i = 0; i < 30 ; i++){
    setTimeout(function(){
      controls.addCube();
    },Math.random() * 10000);
  }

  // gui controls
  var gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  function render() {
    stats.update();

    scene.traverse(function (obj) {
      if (obj instanceof THREE.Mesh && obj != plane) {
        // cube ratete
        obj.rotation.x += controls.rotationSpeed;
        obj.rotation.z += controls.rotationSpeed;
        obj.rotation.x += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  // init
  document.getElementById('WebGL-output').appendChild(renderer.domElement);
  render();

  // resize
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onResize, false);
}

window.onload = init;
