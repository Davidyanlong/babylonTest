import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const hasAlphaTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 3 * Math.PI / 8, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
    
    
    // 创建半球光
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // 灯光强度
    light.intensity = 0.7;

    // 创建点光源
    var pl = new BABYLON.PointLight("pl", BABYLON.Vector3.Zero(), scene);
    // 漫反射颜色 白色
    pl.diffuse = new BABYLON.Color3(1, 1, 1);
    // 高光颜色白色
    pl.specular = new BABYLON.Color3(1, 1, 1);
    // 强度0.8
    pl.intensity = 0.8;
    
    // 创建狗的标准材质
    var mat = new BABYLON.StandardMaterial("dog", scene);
    // 设置漫反射贴图
    mat.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/8/87/Alaskan_Malamute%2BBlank.png", scene);
    // 开启贴图透明通道 hasAlpha
    mat.diffuseTexture.hasAlpha = true;
    // 关闭背面裁剪， 双面展示
    mat.backFaceCulling = false;
    
    // 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    // 设置材质
    box.material = mat;			
        
        
    return scene;
}