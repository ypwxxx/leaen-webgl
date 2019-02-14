var THREE = require('three');

/* ********直接编写******* */
// //渲染三组件: 场景,相机,渲染器
// let scene = new THREE.Scene();      //场景
// //透视相机
// let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// let renderer = new THREE.WebGLRenderer();       //渲染器
// renderer.setSize(window.innerWidth, window.innerHeight);        //设置渲染器你的大小为内容区的宽度
// document.body.appendChild(renderer.domElement);

// //添加物体到场景
// let geometry = new THREE.CubeGeometry(1,1,1);       //创建几何体
// let material = new THREE.MeshBasicMaterial({color: 0x00ff00});      //创建材质
// let cube = new THREE.Mesh(geometry, material);      //创建立方体
// scene.add(cube);

// //循环渲染
// function render(){
//     cube.rotation.x += 0.1;
//     cube.rotation.y += 0.1;
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
// }

// render();

/* ******简单重构******* */
let renderer = null;    //渲染器
let camera = null;      //相机
let scene = null;       //场景
let light = null;       //光源
let cube = null;        //立方体
let width = null;
let height = null;

let initScene = function(){
    scene = new THREE.Scene();
};

let initRenderer = function(){
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
};

let initCamera = function(){
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    camera.lookAt({
        x:0,
        y:0,
        z:0
    });
    scene.add(camera);
};

let initLight = function(){
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
};

let initObj = function(){
    let geometry = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    let color1 = new THREE.Color(0x444444);
    let color2 = new THREE.Color(0xFF0000);

    let p1 = new THREE.Vector3(-500, 0, 0);
    let p2 = new THREE.Vector3(500, 0, 0);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    // geometry.colors.push(color1, color2);

    for(let i = 0; i <= 20; i++){
        let line1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0x000000, opacity: 0.2
        }));
        line1.position.z = (i * 50) - 500;
        scene.add(line1);

        let line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0x000000, opacity: 0.2
        }));
        line2.position.x = (i * 50) - 500;
        line2.rotation.y = 90 * Math.PI / 180;
        scene.add(line2);
    }
    // let line = new THREE.Line(geometry, material, THREE.LineSegments);
    // scene.add(line);
};

let render = function(){
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

let threeStart = function(){
    initScene();
    initRenderer();
    initCamera();
    initLight();
    initObj();
    renderer.clear();
    renderer.render(scene, camera);
    // render();
};

threeStart();