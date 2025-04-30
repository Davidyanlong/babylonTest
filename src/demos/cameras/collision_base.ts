import { BABYLON } from "../../base/commonIncludes";

// 基于相机的碰撞
export const collisionCameraDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    var scene = new BABYLON.Scene(engine);

    // 添加灯光
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    // 添加一个自由相机
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(8, -8, -16), scene);
    camera.setTarget(new BABYLON.Vector3(0, -8, 0));
    camera.attachControl(canvas, false);
    camera.minZ = 0.45;

    // 创建地面
    var ground = BABYLON.Mesh.CreatePlane("ground", 20.0, scene);
    const mat = ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    mat.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    // 创建一个箱子
    var box = BABYLON.Mesh.CreateBox("crate", 2, scene);
    const boxMat = box.material = new BABYLON.StandardMaterial("Mat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene);
    boxMat.diffuseTexture.hasAlpha = true;
    box.position = new BABYLON.Vector3(5, -9, -10);

    // 设置场景 在 Y轴上 的重力加速度
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    // 启用碰撞
    scene.collisionsEnabled = true;

    // 相机启用碰撞
    camera.checkCollisions = true;
    // 应用重力加速度
    camera.applyGravity = true;

    // 相机椭球的形状为球
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    // 地面开启碰撞检查
    ground.checkCollisions = true;
    // 箱子开启碰撞检查
    box.checkCollisions = true;

    return scene;

    
};

