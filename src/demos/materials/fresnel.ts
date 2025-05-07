import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const fresnelScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
   
    // demo1(scene, canvas);
    demo2(scene, canvas);
        
    return scene;
}

// 菲涅尔反射
const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));
	camera.attachControl(canvas);
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 4;

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


 	// var knot = BABYLON.Mesh.CreateTorusKnot("knot", 1, 0.4, 128, 64, 2, 3, scene);
     var knot = BABYLON.MeshBuilder.CreateTorusKnot("knot", {
       radius: 1,
        tube:0.4, 
       radialSegments:128, 
       tubularSegments:64,
        p:2,q:3}, scene);
	

    // 创建黄色球
    var yellowSphere = BABYLON.MeshBuilder.CreateSphere("yellowSphere", {segments:16,diameter:1.5}, scene);
    yellowSphere.setPivotMatrix(BABYLON.Matrix.Translation(3, 0, 0));
	var yellowMaterial = new BABYLON.StandardMaterial("yellowMaterial", scene);
    yellowMaterial.diffuseColor = BABYLON.Color3.Yellow();
    yellowSphere.material = yellowMaterial;

    // 创建绿色球
    var greenSphere = BABYLON.MeshBuilder.CreateSphere("yellowSphere", {segments:16,diameter:1.5}, scene);
    greenSphere.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 3));
	var greenMaterial = new BABYLON.StandardMaterial("greenMaterial", scene);
    greenMaterial.diffuseColor = BABYLON.Color3.Green();
    greenSphere.material = greenMaterial;

    // ch
    var ground = BABYLON.MeshBuilder.CreateBox("Mirror", {size:1.0}, scene);
    // 放大100 倍
    ground.scaling = new BABYLON.Vector3(100.0, 0.01, 100.0);
    const groundMat =  ground.material = new BABYLON.StandardMaterial("ground", scene);
    const groundTex= groundMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);
    groundTex.uScale = 10;
    groundTex.vScale = 10;
    ground.position = new BABYLON.Vector3(0, -2, 0);

    // 创建主材质
    var mainMaterial = new BABYLON.StandardMaterial("main", scene);
    knot.material = mainMaterial;

    // 创建反射探针
    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    // 设置渲染对象
    probe.renderList = [];
    probe.renderList.push(yellowSphere);
    probe.renderList.push(greenSphere);
    probe.renderList.push(ground);
    mainMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
    // 设置折射纹理
    mainMaterial.refractionTexture = probe.cubeTexture;
    // 设置菲涅尔参数
	mainMaterial.refractionFresnelParameters = new BABYLON.FresnelParameters();

    /**
     * isEnabled to activate or deactivate fresnel effect
     * leftColor to define color used on edges
     * rightColor to define color used on center
     * bias to define bias applied to computed fresnel term
     * power to compute exponent applied to fresnel term
     */

    // 调整菲涅尔曲线的起始点，控制反射出现的临界角度
    mainMaterial.refractionFresnelParameters.bias = 0.5;
    // 控制菲涅尔曲线的陡峭程度，影响边缘反射的强度。
	mainMaterial.refractionFresnelParameters.power = 16;
    // 边缘颜色
	mainMaterial.refractionFresnelParameters.leftColor = BABYLON.Color3.Black();
    // 中间部分颜色
	mainMaterial.refractionFresnelParameters.rightColor = BABYLON.Color3.White();
    // 折射系数
	mainMaterial.indexOfRefraction = 1.05;

    // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(scene.clearColor.r,scene.clearColor.g,scene.clearColor.b);
    scene.fogStart = 20.0;
    scene.fogEnd = 50.0;

    // Animations
    scene.registerBeforeRender(function () {
        yellowSphere.rotation.y += 0.01;
        greenSphere.rotation.y += 0.01;
    });

}
//  菲涅尔参数
const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    // 创建材质
    var material = new BABYLON.StandardMaterial("kosh", scene);
    
    // 创建5个球
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("Sphere1", {segments:32, diameter:3}, scene);
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("Sphere2",{segments:32, diameter:3}, scene);
    var sphere3 = BABYLON.MeshBuilder.CreateSphere("Sphere3",{segments:32, diameter:3}, scene);
    var sphere4 = BABYLON.MeshBuilder.CreateSphere("Sphere4",{segments:32, diameter:3}, scene);
    var sphere5 = BABYLON.MeshBuilder.CreateSphere("Sphere5",{segments:32, diameter:3}, scene);
    
    // 创建灯光
    var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-17.6, 18.8, -49.9), scene);

    // 设置相机
    camera.setPosition(new BABYLON.Vector3(-15, 3, 0));
    camera.attachControl(canvas, true);

    // 设置球的位置
    sphere2.position.z -= 5;
    sphere3.position.z += 5;
    sphere4.position.x += 5;
    sphere5.position.x -= 5;

    //  设置球的反射贴图
    material.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // 设置自发光
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // 设置不透明度
    material.alpha = 0.2;
    // 设置高光系数
    material.specularPower = 16;

    // 创建反射的菲涅尔参数
    material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    // 菲涅尔起始点偏移
    material.reflectionFresnelParameters.bias = 0.1;

    // 创建自发光的菲涅尔参数
    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    // 菲涅尔起始点偏移
    material.emissiveFresnelParameters.bias = 0.6;
    // 边缘反射的强度。
    material.emissiveFresnelParameters.power = 4;
    // 设置边缘颜色
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    // 设置中间颜色
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    // 创建透明度的菲尼尔参数
    material.opacityFresnelParameters = new BABYLON.FresnelParameters();
    // 边缘颜色
    material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    // 中间颜色
    material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

    // 应用材质到球1
    sphere1.material = material;





    // 设置球2 的材质
    material = new BABYLON.StandardMaterial("kosh2", scene);
    material.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    material.specularPower = 32;

    // Fresnel
    material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    material.reflectionFresnelParameters.bias = 0.1;

    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.bias = 0.5;
    material.emissiveFresnelParameters.power = 4;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    sphere2.material = material;





    // 设置球 3
    material = new BABYLON.StandardMaterial("kosh3", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.emissiveColor = BABYLON.Color3.White();
    material.specularPower = 64;
    material.alpha = 0.2;

    // Fresnel
    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.bias = 0.2;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    material.opacityFresnelParameters = new BABYLON.FresnelParameters();
    material.opacityFresnelParameters.power = 4;
    material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

    sphere3.material = material;






    // 设置球 4
    material = new BABYLON.StandardMaterial("kosh4", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.emissiveColor = BABYLON.Color3.White();
    material.specularPower = 64;

    // Fresnel
    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.power = 4;
    material.emissiveFresnelParameters.bias = 0.5;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    sphere4.material = material;





    // 设置球5
    material = new BABYLON.StandardMaterial("kosh5", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", scene);
    material.reflectionTexture.level = 0.5;
    material.specularPower = 64;
    material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    // Fresnel
    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.bias = 0.4;
    material.emissiveFresnelParameters.power = 2;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.Black();
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.White();

    sphere5.material = material;

    // 设置天空
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

}