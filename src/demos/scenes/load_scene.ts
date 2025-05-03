import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const loadScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    
    BABYLON.AppendSceneAsync("https://www.babylonjs.com/Assets/DamagedHelmet/glTF/DamagedHelmet.gltf", scene).then((meshes)=> {
        scene.createDefaultCameraOrLight(true, true, true);
        // demo1(scene);
        demo2(scene);
    });

    return scene;

};

const demo1 = (scene:BABYLON.Scene)=>{
    var helper = scene.createDefaultEnvironment() as BABYLON.EnvironmentHelper;

    // 改变主色调
    helper.setMainColor(BABYLON.Color3.Teal());
}


const demo2 = (scene:BABYLON.Scene)=>{
    // 开启自动旋转
    (scene.activeCamera as BABYLON.ArcRotateCamera).useAutoRotationBehavior = true;
    (scene.activeCamera as BABYLON.ArcRotateCamera).beta -= 0.2;

    // 销毁现有的灯光
    scene.lights[0].dispose();
    // 创建直射灯
    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
    // 灯的位置
    light.position = new BABYLON.Vector3(6, 9, 3);
    // 创建阴影
    var generator = new BABYLON.ShadowGenerator(512, light);
    // 启用ESM模糊
    generator.useBlurExponentialShadowMap = true;
    // 模糊核
    generator.blurKernel = 32;

    // 场景中的Mesh 添加阴影投射
    for (var i = 0; i < scene.meshes.length; i++) {
        generator.addShadowCaster(scene.meshes[i]);    
    }

    var helper = scene.createDefaultEnvironment({
        // 启用地面反射
        enableGroundMirror: true,
        // 防止地面  z-fighting 
        groundYBias: 0.01,
        groundShadowLevel: 0.6,
    }) as BABYLON.EnvironmentHelper;       

    helper.setMainColor(BABYLON.Color3.Teal());
}

