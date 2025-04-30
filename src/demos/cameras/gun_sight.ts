import { BABYLON } from "../../base/commonIncludes";

// 通过 layerMask 的编码 可以让相机有选择看到内容
export const gunSightDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // 设置目标位置
    camera.setTarget(BABYLON.Vector3.Zero());
    // 绑定事件
    camera.attachControl(canvas, true);

    // 半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // 光线强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
    // 设置球的位置
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6,subdivisions:2}, scene);

    addGunSight(scene);

    return scene;
};

function addGunSight(scene:BABYLON.Scene){
    // 如果 activeCameras 为空
    if (scene.activeCameras?.length === 0){
        scene.activeCameras ||=  [];
        scene.activeCameras.push(scene.activeCamera!);
    }    
    // 创建第二个相机， 没有 attachControl DOM 所以只是看的见，但无法交互          
    var secondCamera = new BABYLON.FreeCamera("GunSightCamera", new BABYLON.Vector3(0, 0, -50), scene);  
    // 设置为正交相机              
    secondCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    // 相机的掩码
    secondCamera.layerMask = 0x20000000;
    // 添加第二个相机
    scene.activeCameras!.push(secondCamera);


    
    var meshes = [];
    var h = 250;
    var w = 250;
    
    var y = BABYLON.MeshBuilder.CreateBox("y", {size:h * .2}, scene);
    y.scaling = new BABYLON.Vector3(0.05, 1, 1);
    y.position = new BABYLON.Vector3(0, 0, 0);
    meshes.push(y);
    
    var x =  BABYLON.MeshBuilder.CreateBox("x", {size:h * .2}, scene);
    x.scaling = new BABYLON.Vector3(1, 0.05, 1);
    x.position = new BABYLON.Vector3(0, 0, 0);
    meshes.push(x);
        
    var lineTop =  BABYLON.MeshBuilder.CreateBox("lineTop", {size:w * .8}, scene);
    lineTop.scaling = new BABYLON.Vector3(1, 0.005, 1);
    lineTop.position = new BABYLON.Vector3(0, h * 0.5, 0);
    meshes.push(lineTop);
    
    var lineBottom =  BABYLON.MeshBuilder.CreateBox("lineBottom", {size:w * .8}, scene);
    lineBottom.scaling = new BABYLON.Vector3(1, 0.005, 1);
    lineBottom.position = new BABYLON.Vector3(0, h * -0.5, 0);
    meshes.push(lineBottom);
    
    var lineLeft =  BABYLON.MeshBuilder.CreateBox("lineLeft", {size:h}, scene);
    lineLeft.scaling = new BABYLON.Vector3(0.010, 1,  1);
    lineLeft.position = new BABYLON.Vector3(w * -.4, 0, 0);
    meshes.push(lineLeft);
    
    var lineRight =  BABYLON.MeshBuilder.CreateBox("lineRight", {size:h}, scene);
    lineRight.scaling = new BABYLON.Vector3(0.010, 1,  1);
    lineRight.position = new BABYLON.Vector3(w * .4, 0, 0);
    meshes.push(lineRight);
    
    // 合并Mesh
    var gunSight = BABYLON.Mesh.MergeMeshes(meshes) as BABYLON.Mesh;
    // 设置名称
    gunSight.name = "gunSight";
    //  设置掩码
    gunSight.layerMask = 0x20000000;
    // 锁定世界矩阵，保持不变
    gunSight.freezeWorldMatrix();
    
    // 创建材质
    var mat = new BABYLON.StandardMaterial("emissive mat",scene);

    // 启用单次检查
    mat.checkReadyOnlyOnce = true;
    // 设置自发光颜色
    mat.emissiveColor = new BABYLON.Color3(0,1,0);
    
    // 设置材质
    gunSight.material = mat;
}