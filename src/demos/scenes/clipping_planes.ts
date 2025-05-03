import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const clippingPlanesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 不启用离线支持
    engine.enableOfflineSupport = false;

    // 半球光
    var hemi = new BABYLON.HemisphericLight("hemi", BABYLON.Vector3.Up());


 


    // demo1(scene);

    // demo2(scene);

    demo3(scene);

    return scene;
};

const  demo1= (scene:BABYLON.Scene)=>{
/**
     * 预留的裁剪面
     * scene.clipPlane
     * scene.clipPlane2
     * scene.clipPlane3
     * scene.clipPlane4
     * scene.clipPlane5
     * scene.clipPlane6
     */

   // 添加轨道相机
   var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
   // 绑定事件
   camera.attachControl(false);

    // 添加点光源
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
    // 设置强度
    light.intensity = 0.5;


    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.ImportMeshAsync("https://playground.babylonjs.com//scenes/skull.babylon", scene).then((result)=> {
        // Set the target of the camera to the first imported mesh
        camera.target = result.meshes[0]!.position;
        
        // 关闭背面裁剪，双面显示
        scene.defaultMaterial.backFaceCulling = false;
        // 横向的裁剪面
        scene.clipPlane4 = new BABYLON.Plane(0, 1, 0, 0);
        // 纵向裁剪面
        scene.clipPlane3 = new BABYLON.Plane(1, 0, 0, -30);
    });

    // 灯光位置与相机位置同步
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    var slider = new GUI.Slider();
    slider.minimum = -35;
    slider.maximum = 30;
    slider.value = 0;
    slider.height = "20px";
    slider.width = "200px";
    slider.color = "green";
    // 设置横向裁剪事件
    slider.onValueChangedObservable.add(function(value) {
        // 移动位置
        scene.clipPlane4 = new BABYLON.Plane(0, 1, 0, value);
    });
    panel.addControl(slider);   

    slider = new GUI.Slider();
    slider.minimum = -30;
    slider.maximum = 20;
    slider.value = -30;
    slider.paddingTop = "10px";
    slider.height = "30px";
    slider.width = "200px";
    slider.color = "green";
    // 纵向裁剪事件
    slider.onValueChangedObservable.add(function(value) {
        // 移动位置
        scene.clipPlane3 = new BABYLON.Plane(1, 0, 0, value);
    });
    panel.addControl(slider);   
}


const demo2 = (scene:BABYLON.Scene)=>{

    // 自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // 相机朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 设置事件
    camera.attachControl(true);
    
    // 创建一个球
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

     // 设置球的位置
     sphere.position.y = 1;
 
     // 创建一个地面
     var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);
 
    // 渲染前事件
    sphere.onBeforeRenderObservable.add(function() {
        // 设置纵向裁剪面
        scene.clipPlane = new BABYLON.Plane(1, 0, 0, 0);
    });

    // 渲染后事件
    sphere.onAfterRenderObservable.add(function() {
        // 清除裁剪面
        scene.clipPlane = null;
    });
    
}

// 通过材质来裁剪
const demo3 = (scene:BABYLON.Scene)=>{
    
    // 创建自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // 相机朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 绑定相机事件
    camera.attachControl(true);


    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 设置位置
    sphere.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6,  subdivisions:2}, scene);

    // 创建一个标准材质
    const mat = new BABYLON.StandardMaterial("mat", scene);

    // 设置裁剪面
    mat.clipPlane = new BABYLON.Plane(1, 0, 0, 0);

    // 设置球的材质
    sphere.material = mat;
}