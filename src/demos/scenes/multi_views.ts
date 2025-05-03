import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const multiViewsScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    const parentDom = document.querySelector('#canvasZone') as HTMLDivElement

    parentDom.style = `
    grid-row: 3;
    grid-column: 1;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0;
    display: grid;
    grid-template-columns: 45% 10% 45%;
    grid-template-rows: 45% 10% 45%;
    `
  

    canvas.style.display  = 'none';

     // 创建一个创建
     var scene = new BABYLON.Scene(engine);

     // 创建一个相机
     var camera = new BABYLON.ArcRotateCamera("Camera0", 0, 0.8, 5, BABYLON.Vector3.Zero(), scene);
     // 设置相机的朝向
     camera.setTarget(BABYLON.Vector3.Zero());

     
    
 
     // 轨道相机的最小， 最大 半径
     camera.lowerRadiusLimit = 4;
     camera.upperRadiusLimit = 20;
 
     // 创建新的相机1
     var camera1 = new BABYLON.ArcRotateCamera("Camera1", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene);
     // 创建新的相机2
     var camera2 = new BABYLON.ArcRotateCamera("Camera2", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene);
     // 创建新的相机3
     var camera3 = new BABYLON.ArcRotateCamera("Camera3", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene); 
   
 
     // 设置半球光
     var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
 
     // 设置光的强度
     light.intensity = 0.7;
 
     // 创建一个box
     var box = BABYLON.MeshBuilder.CreateBox("Box", {size: 2}, scene);
 
     // 设置盒子的位置 
     box.position.y = 0.5;
 
     // 场景一个材质
     var mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", scene);
     
     // 设置金属度
     mat.metallic = 1;
     // 设置粗糙度
     mat.roughness = 0.5;
     // 赋值给盒子
     box.material = mat;
    
     // 创建默认的环境光照
     scene.createDefaultEnvironment();

     const renderCanvas0 = document.createElement('canvas');
     renderCanvas0.id = 'renderCanvas0';
     parentDom.appendChild(renderCanvas0);
     renderCanvas0.style = `align-self: center;justify-self: center;width:100%; height:100%; grid-row:1;grid-column:1;`;



     const renderCanvas1 = document.createElement('canvas');
     renderCanvas1.id = 'renderCanvas1';
     parentDom.appendChild(renderCanvas1);
     renderCanvas1.style = `align-self: center;justify-self: center;width:100%; height:100%;grid-row: 1;grid-column: 3;`;

     const renderCanvas2 = document.createElement('canvas');
     renderCanvas2.id = 'renderCanvas2';
     parentDom.appendChild(renderCanvas2);
     renderCanvas2.style = `align-self: center;justify-self: center;width:100%; height:100%;grid-row: 3;grid-column: 1;`;

     const renderCanvas3 = document.createElement('canvas');
     renderCanvas3.id = 'renderCanvas3';
     parentDom.appendChild(renderCanvas3);
     renderCanvas3.style = `align-self: center;justify-self: center;width:100%; height:100%;grid-row: 3;grid-column: 3;`;

     camera.attachControl( true);

     // 注册view
     engine.registerView(renderCanvas0);
     engine.registerView(renderCanvas1, camera1);
     engine.registerView(renderCanvas2, camera2);
     engine.registerView(renderCanvas3, camera3);

     console.log(engine.views)
 
     // Some animations
     var alpha = 0;
     scene.registerBeforeRender(() => {
         camera1.radius = 10 + Math.cos(alpha) * 5;
         camera2.alpha += 0.01;
         camera3.beta = Math.cos(alpha);
 
         alpha += 0.01;
     })

     // 设置输入DOM 
     engine.inputElement = renderCanvas0;
 
     return scene;
};

