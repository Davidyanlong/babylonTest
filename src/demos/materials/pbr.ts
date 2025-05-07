import { BABYLON, GUI, Assets } from "../../base/commonIncludes";

// 场景基本的构建方法
export const pbrScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
  
    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);


    // demo5(scene, canvas);
    // demo6(scene, canvas);
    // demo7(scene, canvas);
    // demo8(scene, canvas);
    // demo9(scene, canvas);
    // demo10(scene, canvas);
    // demo11(scene, canvas);
    // demo12(scene, canvas);
    // demo13(scene, canvas);
    // demo14(scene, canvas);
    // demo15(scene, canvas);
    // demo16(scene, canvas);
    // demo17(scene, canvas);
    // demo18(scene, canvas);
    // demo19(scene, canvas);
    // demo20(scene, canvas);
    // demo21(scene, canvas);
    // demo22(scene, canvas);
    // demo23(scene, canvas);
    // demo24(scene, canvas);
    // demo25(scene, canvas);
    // demo26(scene, canvas);
    // demo27(scene, canvas);
    // demo28(scene, canvas);
    // demo29(scene, canvas);
    // demo30(scene, canvas);
    // demo31(scene, canvas);
    // demo32(engine, scene, canvas);
    //  demo33(scene, canvas);
    demo34(scene, canvas);
        
    return scene;
}

// 非金属 并且粗糙
const demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建金属流的PBR材质
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    sphere.material = pbr;

    // 设置基础色
    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 金属度
    pbr.metallic = 0;
    // 粗糙度
    pbr.roughness = 1.0;
}

// 设置为金属，不粗糙
const demo2 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

   
    // 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建金属流的PBR材质
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    sphere.material = pbr;

    // 设置基础色
    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 金属度
    pbr.metallic = 1;
    // 粗糙度
    pbr.roughness = 0.0;

    // 设置环境光
    pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com//textures/environment.dds", scene);
}

// 反射表面有粗糙度
const demo3 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

   
    // 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建金属流的PBR材质
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    sphere.material = pbr;

    // 设置基础色
    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 金属度
    pbr.metallic = 1;
    // 粗糙度
    pbr.roughness = 0.4;

    // 设置环境光
    pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com//textures/environment.dds", scene);
}

// 反射的金属性，粗糙度都为 1
const demo4 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
     // 创建相机
     var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

     camera.lowerRadiusLimit = 2;
     camera.upperRadiusLimit = 10;
 
     camera.attachControl(canvas, true);
 
    
     // 创建球
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
 
     // 创建金属流的PBR材质
     var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
     sphere.material = pbr;
 
     // 设置基础色
     pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
     // 金属度
     pbr.metallic = 1;
     // 粗糙度
     pbr.roughness = 1;
 
     // 设置环境光
     pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com//textures/environment.dds", scene);

     // 设置粗糙度金属度贴图
     pbr.metallicRoughnessTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/mr.jpg", scene);
}

// 高光流
const demo5 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
     // 创建相机
     var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

     camera.lowerRadiusLimit = 2;
     camera.upperRadiusLimit = 10;
 
     camera.attachControl(canvas, true);
 
    
     // 创建球
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
 
     // 创建高光流的PBR材质
     var pbr = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
     sphere.material = pbr;
    
     // 漫反射颜色
     pbr.diffuseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
     // 高光的颜色
     pbr.specularColor = new BABYLON.Color3(1.0, 0.766, 0.336);

     // 光泽度
     pbr.glossiness = 0.4;;
 
     // 设置环境光
     pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com//textures/environment.dds", scene);

}

// 高光流
const demo6 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

   
    // 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建高光流的PBR材质
    var pbr = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
    sphere.material = pbr;
   
    // 漫反射颜色
    pbr.diffuseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 高光的颜色
    pbr.specularColor = new BABYLON.Color3(1.0, 0.766, 0.336);

    // 光泽度
    pbr.glossiness = 1.0;;

    // 设置环境光
    pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    // 设置高光光泽度贴图， 灰度图
    pbr.specularGlossinessTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/sg.png", scene);
}

// 金属流模式下的PBR材质
const demo7 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);


    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;


    /**
     * PBRMetallicRoughnessMaterial	  PBRMaterial
     * baseColor	                    albedoColor
     * baseTexture	                    albedoTexture
     * metallicRoughnessTexture	        metallicTexture
     * environmentTexture	            reflectionTexture
     * normalTexture	                bumpTexture
     * occlusionTexture	                ambientTexture
     * occlusionTextureStrength	        ambientTextureStrength
     */

    //  设置基础色
    pbr.albedoColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 设置金属度， 粗糙度
    pbr.metallic = 1.0; // set to 1 to only use it from the metallicRoughnessTexture
    pbr.roughness = 1.0; // set to 1 to only use it from the metallicRoughnessTexture
    // 设置反射贴图
    pbr.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    // 设置金属度，粗糙度贴图
    pbr.metallicTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/mr.jpg", scene);
    // 关闭粗糙度 apha 通道
    pbr.useRoughnessFromMetallicTextureAlpha = false;
    // 使用粗糙度 绿色通道
    pbr.useRoughnessFromMetallicTextureGreen = true;
    // 使用金属度 蓝色通道
    pbr.useMetallnessFromMetallicTextureBlue = true;
}

// 光泽流模式下的PBR材质
const demo8 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);


    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;


    /**
     * PBRSpecularGlossinessMaterial	   PBRMaterial
     * diffuseColor	                        albedoColor
     * diffuseTexture	                    albedoTexture
     * specularGlossinessTexture	        reflectivityTexture
     * specularColor	                    reflectivityColor
     * glossiness	                        microSurface
     * normalTexture	                    bumpTexture
     * occlusionTexture	                    ambientTexture
     * occlusionTextureStrength	            ambientTextureStrength
     */

    //  设置基础色
    pbr.albedoColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 设置反射颜色
    pbr.reflectivityColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 设置为表面系数
    pbr.microSurface = 1.0; // Let the texture controls the value 
    // 设置反射贴图 
    pbr.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    // 反射强度分布
    pbr.reflectivityTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/sg.png", scene);
    // 微表面系数来自 alpha 通道
    pbr.useMicroSurfaceFromReflectivityMapAlpha = true;
    
}

// PBR 透明
const demo9 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    /**
     * ​​反射的另一个有趣特性是保留透明表面最明亮部分的反射光​​。
     * 虽然这句话听起来有些矛盾，但实际效果非常实用。
     * 例如：当你在明亮的房间内透过窗户看向夜晚的室外时，
     * 能看到玻璃上反射的灯光或电视画面——这在PBR材质中同样可实现。
     * 通过添加属性 pbr.useRadianceOverAlpha = true，
     * 可以控制这种效果：不仅反射（即辐射亮度）会穿透透明层显示，镜面高光也会叠加在透明表面上。
     */

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 200, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    // 创建点光源
    new BABYLON.PointLight("point", new BABYLON.Vector3(0, 40, 0), scene);

    // 环境贴图
    var hdrTexture = new BABYLON.HDRCubeTexture("https://playground.babylonjs.com/textures/room.hdr", scene, 512);

    // 创建天空盒
    var hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:1000.0}, scene);
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    // 天空的反射贴图
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 微表面系数
	hdrSkyboxMaterial.microSurface = 1.0;
    // 曝光度
	hdrSkyboxMaterial.cameraExposure = 0.66;
    // 对比度
	hdrSkyboxMaterial.cameraContrast = 1.66;
    // 不启用光照
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    // 无限距离
    hdrSkybox.infiniteDistance = true;

    // 创建一个球
    var sphereGlass = BABYLON.MeshBuilder.CreateSphere("sphereGlass", {segments:48, diameter:80.0}, scene);
    
    // 创建一个玻璃材质 PBR
    var glass = new BABYLON.PBRMaterial("glass", scene);
    // 设置反射贴图
    glass.reflectionTexture = hdrTexture;    
    // 设置反射系数
    glass.indexOfRefraction = 0.52;
    // 设置不透明度
    glass.alpha = 0.5;

    // 关闭直射光， 强度为0
    glass.directIntensity = 0.0;
    // 环境光强度
    glass.environmentIntensity = 0.7;
    // 曝光度
    glass.cameraExposure = 0.66;
    // 对比度
    glass.cameraContrast = 1.66;
    // 微表面系数
    glass.microSurface = 1;
    // 反射颜色
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    // 基础色
    glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    glass.useRadianceOverAlpha = true;
    sphereGlass.material = glass;
    
}

// 折射
const demo10 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 200, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    // 创建点光源
    new BABYLON.PointLight("point", new BABYLON.Vector3(0, 40, 0), scene);

    // 创建关键贴图
    var hdrTexture = new BABYLON.HDRCubeTexture("https://playground.babylonjs.com/textures/room.hdr", scene, 512);

    // 创建天空盒
    var hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:1000.0}, scene);
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	hdrSkyboxMaterial.microSurface = 1.0;
	hdrSkyboxMaterial.cameraExposure = 0.66;
	hdrSkyboxMaterial.cameraContrast = 1.66;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;

    // 创建一个球
    var sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 48, 80.0, scene);
    
    // Create materials
    var glass = new BABYLON.PBRMaterial("glass", scene);
    // 设置反射材质
    glass.reflectionTexture = hdrTexture;
    // 设置折射材质
    glass.refractionTexture = hdrTexture;
    // 将透明度与折射强度绑定
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;

    glass.alpha = 0.0;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
    sphereGlass.material = glass;
}

// 次表面折射
const demo11 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 清屏色
    scene.clearColor =BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0;    
    
    // 启用次表面折射
    pbr.subSurface.isRefractionEnabled = true;
    
    // 使用默认相机
    scene.createDefaultCamera(true, true, true);

    // 创建默认天空
    scene.createDefaultSkybox(scene.environmentTexture);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "SUBSURFACE");

}

// 次表面折射 IOR控制
const demo12 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 清屏色
    scene.clearColor =BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0;    
    
    // 启用次表面折射
    pbr.subSurface.isRefractionEnabled = true;

    pbr.subSurface.indexOfRefraction = 1.8;

    var a = 0;
    scene.afterRender = () => {
        a += 0.01;
        pbr.subSurface.indexOfRefraction = 1.5 + Math.cos(a) * 0.5;
    };
    
    // 使用默认相机
    scene.createDefaultCamera(true, true, true);

    // 创建默认天空
    scene.createDefaultSkybox(scene.environmentTexture);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "SUBSURFACE");

}

// 次表面折射的颜色叠加效果 tintColor 
const demo13 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 清屏色
    scene.clearColor =BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0;    
    
    // 启用次表面折射
    pbr.subSurface.isRefractionEnabled = true;

    pbr.subSurface.indexOfRefraction = 1.5;
    pbr.subSurface.tintColor = new BABYLON.Color3(0, 0, 0);

    var a = 0;
    scene.beforeRender = () => {
        a += 0.01;
        pbr.subSurface.tintColor.g = Math.cos(a) * 0.5 + 0.5;
        pbr.subSurface.tintColor.b = pbr.subSurface.tintColor.g;
    }
    
    // 使用默认相机
    scene.createDefaultCamera(true, true, true);

    // 创建默认天空
    scene.createDefaultSkybox(scene.environmentTexture);

    // scene.debugLayer.show({ showExplorer: false });
    // scene.debugLayer.select(pbr, "SUBSURFACE");

}
// 是否产生体积光散射
const demo14 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
       // 清屏色
       scene.clearColor =BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

       // 设置环境光
       scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
   
       var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);
   
       var pbr = new BABYLON.PBRMaterial("pbr", scene);
       sphere.material = pbr;
   
       pbr.metallic = 0.0;
       pbr.roughness = 0; 
       
       pbr.subSurface.isTranslucencyEnabled = true;
       
       // 使用默认相机
       scene.createDefaultCamera(true, true, true);
   
       // 创建默认天空
       scene.createDefaultSkybox(scene.environmentTexture);
}

// 次表面折射的颜色叠加效果 tintColor 
const demo15 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 清屏色
    scene.clearColor =BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0; 
    
    pbr.subSurface.isTranslucencyEnabled = true;
    pbr.subSurface.tintColor = BABYLON.Color3.Teal();

    var a = 0;
    scene.beforeRender = () => {
        a += 0.01;

        pbr.subSurface.tintColor.g = Math.cos(a) * 0.5 + 0.5;
        pbr.subSurface.tintColor.b = pbr.subSurface.tintColor.g;
    }
    
    
    // 使用默认相机
    scene.createDefaultCamera(true, true, true);

    // 创建默认天空
    scene.createDefaultSkybox(scene.environmentTexture);
}


// 次表面散射
const demo16 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
     // 环境光照
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    scene.imageProcessingConfiguration.exposure = 1.6;
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    // ASCE tongmap
    scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;

    // 创建一个球，表示灯光的位置
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.005, segments: 32}, scene);

    // 创建 PBR 材质
    const sphereMat = sphere.material = new BABYLON.PBRMaterial('metal', scene);
    sphereMat.roughness = 1.0;
    sphereMat.metallic = 0.0;
    sphereMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // 设置位置
    sphere.setPivotMatrix(BABYLON.Matrix.Translation(0, 1/50, -4/20), false);

    // 创建灯光，和球相同位置
    var light = new BABYLON.PointLight("point", sphere.position, scene);
    // 漫反射
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    // 高光颜色
    light.specular = new BABYLON.Color3(1, 1, 1);
    //  光线强度
    light.intensity = 0.01;


    const hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:5,updatable:false, sideOrientation:BABYLON.Constants.MATERIAL_CounterClockWiseSideOrientation}, scene);
    const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = scene.environmentTexture!.clone();
    if (hdrSkyboxMaterial.reflectionTexture) {
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    }
    hdrSkyboxMaterial.microSurface = 0.7;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkyboxMaterial.twoSidedLighting = true;
    hdrSkybox.infiniteDistance = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    // 模型路径
    var root = "https://assets.babylonjs.com/meshes/Georgia-Tech-Dragon/";

    BABYLON.AppendSceneAsync(root+"dragonUV.glb", scene).then((result)=> {
        var mat = scene.getMeshById("dragonLR")!.material as BABYLON.PBRMaterial;
        mat.metallic = 0;
        mat.roughness = 0.160;
        mat.albedoColor = BABYLON.Color3.FromHexString("#40F7E0").toLinearSpace();
        // 材质厚度分布​​ 的关键纹理, 灰度图
        mat.subSurface.thicknessTexture = new BABYLON.Texture(root + "thicknessMap.png", scene, false, false);
        // 最大厚度
        mat.subSurface.maximumThickness = 2.2;
        // 启用光线穿透
        mat.subSurface.isTranslucencyEnabled = true;
        // 启用次表面散射
        mat.subSurface.isScatteringEnabled = true;
        // 预处理次表面数据​
        scene.enableSubSurfaceForPrePass()!.metersPerUnit = 0.4;
        scene.prePassRenderer!.samples = 4;

        scene.createDefaultCamera(true,true,true);
        (scene.activeCamera as BABYLON.ArcRotateCamera).alpha += Math.PI;

   

        scene.registerAfterRender(() => {
            sphere.rotation.y += 0.01;
            light.position = sphere.getAbsolutePosition();
        });

    });
}

// Diffusion Profiles ​扩散剖面
// 扩散剖面描述了光线在材质内部传播时的 ​​散射强度分布​​。它决定了光线在穿透材质后，从表面不同位置射出的光强分布（如边缘光晕的宽度和亮度）。
const demo17 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建相机 
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5.6, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 5.6, 0));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建一个球，显示光的位置
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, segments: 32}, scene);

    // 设置球的材质
    const sphereMat = sphere.material = new BABYLON.PBRMaterial('metal', scene);
    sphereMat.roughness = 1.0;
    sphereMat.metallic = 0.0;
    sphereMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    sphere.setPivotMatrix(BABYLON.Matrix.Translation(0, 7, -8), false);

    // 设置环境光照
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    // 创建天空环境
    scene.createDefaultSkybox(scene.environmentTexture, true);
    // 显示调试面板
    scene.debugLayer.show({ showExplorer: false });

    // 创建点光源
    var light = new BABYLON.PointLight("point", sphere.position, scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.intensity = 100;

    var mainMesh:BABYLON.Mesh;

    BABYLON.ImportMeshAsync(
        "https://models.babylonjs.com/Lee-Perry-Smith-Head/head.glb",
        scene).then(
         (result)=> {
        const meshes = result.meshes;
        meshes[0].scaling.scaleInPlace(20);

        mainMesh = meshes[1] as BABYLON.Mesh;
        // 启用次表面散射
        const mat = mainMesh.material as BABYLON.PBRMaterial;

        mat.subSurface.isScatteringEnabled = true;
        // 启用预处理
        scene.enableSubSurfaceForPrePass()!.metersPerUnit = 0.07;
        mat.metallic = 0
        mat.roughness = 0.670
        scene.debugLayer.select(mainMesh.material, "SUBSURFACE");
        // 表示 ​​不同颜色通道的散射距离比例​​
        mat.subSurface.scatteringDiffusionProfile = new BABYLON.Color3(0.750, 0.25, 0.20);
   
        
        scene.enablePrePassRenderer()!.samples = 8;
    });

    scene.registerAfterRender(() => {
        sphere.rotation.y += 0.01;
        light.position = sphere.getAbsolutePosition();
    });
}

// 清漆
const demo18 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
    pbr.metallic = 1.0;
    pbr.roughness = 1.0;    
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;

    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "CLEAR COAT");
}

// 清漆 + 物体法线
const demo19 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    //Ensures irradiance is computed per fragment to make the 
    // Bump visible
    pbr.forceIrradianceInFragment = true;
    pbr.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor_bump.png", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 1.0;   
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;

    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "CLEAR COAT");
}

// 清漆 + 物体法线 + 清漆法线
const demo20 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    //Ensures irradiance is computed per fragment to make the 
    // Bump visible
    pbr.forceIrradianceInFragment = true;
    pbr.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor_bump.png", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 1.0;   
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;
    var coatBump = new BABYLON.Texture("https://playground.babylonjs.com/textures/waterbump.png", scene);
    pbr.clearCoat.bumpTexture = coatBump;

    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "CLEAR COAT");
}

// 清漆 + tintColor 
const demo21 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    //Ensures irradiance is computed per fragment to make the 
    // Bump visible
    pbr.forceIrradianceInFragment = true;
    pbr.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor_bump.png", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 1.0;   
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;
    pbr.clearCoat.isTintEnabled = true;
    pbr.clearCoat.tintColor = BABYLON.Color3.Teal();
    pbr.clearCoat.tintColorAtDistance = 1;
    pbr.clearCoat.tintThickness = 1.5;

    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "CLEAR COAT");
}

// 清漆 + 清漆粗糙度 
const demo22 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    //Ensures irradiance is computed per fragment to make the 
    // Bump visible
    pbr.forceIrradianceInFragment = true;
    pbr.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor_bump.png", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 1.0;   
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;

    var a = 0;
    scene.afterRender = () => {
        a += 0.05;
        pbr.clearCoat.roughness = Math.cos(a) * 0.1 + 0.1;
    };


    scene.createDefaultCamera(true, true, true);

    // scene.debugLayer.show({ showExplorer: false });
    // scene.debugLayer.select(pbr, "CLEAR COAT");
}


// 清漆 + 清漆IOR
const demo23 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 清屏色
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    // 创建PBR材质
    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    // 基础色
    //Ensures irradiance is computed per fragment to make the 
    // Bump visible
    pbr.forceIrradianceInFragment = true;
    pbr.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor_bump.png", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 1.0;   
    
    // 启用清漆
    pbr.clearCoat.isEnabled = true;

    var a = 0;
    scene.afterRender = () => {
        a += 0.05;
        pbr.clearCoat.indexOfRefraction = 1.5 + 0.5 * Math.cos(a);
    };

    scene.createDefaultCamera(true, true, true);

    // scene.debugLayer.show({ showExplorer: false });
    // scene.debugLayer.select(pbr, "CLEAR COAT");
}

// 虹膜效应
const demo24 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

    // 创建环境光
    const environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.env", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:128, diameter:2}, scene);

    scene.createDefaultSkybox(environmentTexture, true, undefined, 0.3, true);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    // 金属性为1
    pbr.metallic = 1.0;
    // 粗糙度为0
    pbr.roughness = 0.0;
    
    // 启用虹膜效果
    pbr.iridescence.isEnabled = true;

    pbr.iridescence.indexOfRefraction = 1.3;
    pbr.iridescence.minimumThickness = 100; // in nanometers
    pbr.iridescence.maximumThickness = 400; // in nanometers
}

// 各向异性
const demo25 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

    // 创建环境光
    const environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.env", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:128, diameter:2}, scene);

    scene.createDefaultSkybox(environmentTexture, true, undefined, 0.3, true);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    // 金属性为1
    pbr.metallic = 1.0;
    // 粗糙度为0
    pbr.roughness = 0.0;
    
    // 启用各向异性
    pbr.anisotropy.isEnabled = true;

    var a = 0;
    scene.afterRender = () => {
        a += 0.01;
        // 各向异性强度
        pbr.anisotropy.intensity = Math.cos(a) * 0.5 + 0.5;
    };


    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "ANISOTROPIC");

}


// 各向异性方向变化
const demo26 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    camera.attachControl(canvas, true);

    // 创建环境光
    const environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.env", scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:128, diameter:2}, scene);

    scene.createDefaultSkybox(environmentTexture, true, undefined, 0.3, true);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    // 金属性为1
    pbr.metallic = 1.0;
    // 粗糙度为0
    pbr.roughness = 0.0;
    
    // 启用各向异性
    pbr.anisotropy.isEnabled = true;
    pbr.anisotropy.intensity = 0.7;
    
    var a = 0;
    scene.afterRender = () => {
        a += 0.01;
        pbr.anisotropy.direction.x = Math.cos(a);
        pbr.anisotropy.direction.y = Math.sin(a);
    };


    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "ANISOTROPIC");

}

// 光泽度 sheen
const demo27 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 清屏色
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0.5;    
    
    // 启用光泽度
    pbr.sheen.isEnabled = true;
    
    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "SHEEN");
}


// 光泽度 sheen + 光泽颜色
const demo28 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 清屏色
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:128, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.metallic = 0.0;
    pbr.roughness = 0.5;    
    
    // 启用光泽度
    pbr.sheen.isEnabled = true;
    // 光泽颜色
    pbr.sheen.color = BABYLON.Color3.Red();
    
    var a = 0;
    scene.afterRender = () => {
        a += 0.05;
        pbr.sheen.color.r = Math.cos(a) * 0.5 + 0.5;
    };
    
    scene.createDefaultCamera(true, true, true);
    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "SHEEN");
}

// 使用灯光贴图 lightMap  
const demo29 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    BABYLON.ImportMeshAsync(Assets.meshes.StanfordBunny.path,scene).then((result) => {
        scene.createDefaultCamera(true, true, true);
        (scene.activeCamera as BABYLON.ArcRotateCamera).alpha += Math.PI;
        const mat = new BABYLON.PBRMaterial("Bunny");
        mat.metallic = 0;
        mat.roughness = 1;
        result.meshes[0].material = mat;
        const lmapUrl = "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/textures/lightmaps/BunnyLightMap.png";
        const lmapTex = new BABYLON.Texture(lmapUrl);
        mat.lightmapTexture = lmapTex;

        const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui");

        let useLmap = true;
        const cb = GUI.Checkbox.AddCheckBoxWithHeader("use lightmap texture", (val) => {
            useLmap = !useLmap;
            if (useLmap) {
                mat.lightmapTexture = lmapTex;
            } else {
                mat.lightmapTexture = null;
            }
        });
        cb.horizontalAlignment = 0;
        cb.verticalAlignment = 0;
        gui.addControl(cb);


        scene.createDefaultEnvironment();
    });
} 

// 灯光半径， 小的半径
const demo30 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, 0, 120, BABYLON.Vector3.Zero(), scene);
    camera.minZ = 0.1;
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.PointLight("point", new BABYLON.Vector3(0, 85, 0), scene);
    light.intensity = 20;
    //light.radius = 10;

    // 创建环境光
    var hdrTexture = new BABYLON.HDRCubeTexture("https://playground.babylonjs.com/textures/room.hdr", scene, 512);

    // 创建天空
    var hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:1000.0}, scene);
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.cameraExposure = 0.66;
    hdrSkyboxMaterial.cameraContrast = 1.66;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;

    // Create meshes
    var sphereGlass = BABYLON.MeshBuilder.CreateSphere("sphereGlass", {segments:48, diameter:80.0}, scene);

    // Create materials
    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.directIntensity = 1.0;
    glass.environmentIntensity = 0.1;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
    sphereGlass.material = glass;
}


// 灯光半径， 大的半径
const demo31 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, 0, 120, BABYLON.Vector3.Zero(), scene);
    camera.minZ = 0.1;
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.PointLight("point", new BABYLON.Vector3(0, 85, 0), scene);
    light.intensity = 20;
    light.radius = 10;

    // 创建环境光
    var hdrTexture = new BABYLON.HDRCubeTexture("https://playground.babylonjs.com/textures/room.hdr", scene, 512);

    // 创建天空
    var hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:1000.0}, scene);
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.cameraExposure = 0.66;
    hdrSkyboxMaterial.cameraContrast = 1.66;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;

    // Create meshes
    var sphereGlass = BABYLON.MeshBuilder.CreateSphere("sphereGlass", {segments:48, diameter:80.0}, scene);

    // Create materials
    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.directIntensity = 1.0;
    glass.environmentIntensity = 0.1;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
    sphereGlass.material = glass;
}

// 高光抗锯齿技术
const demo32 = (engine:BABYLON.Engine, scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 设置屏幕像素比
    engine.setHardwareScalingLevel(0.5);
    
   // 创建默认相机灯光
    scene.createDefaultCamera(true, true, true);

    engine.displayLoadingUI();

    BABYLON.ImportMeshAsync("https://models.babylonjs.com/shark.glb", scene).then((result)=> {
     
       
        console.log(result);
        let camera  = scene.activeCamera as BABYLON.ArcRotateCamera

       camera.alpha = Math.PI;
       camera.lowerRadiusLimit = 10.0;
       camera.upperRadiusLimit = 30.0;

        // 创建默认环境
        var helper = scene.createDefaultEnvironment({
            createGround: false
        });

        // UI
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.renderScale = 0.5;
        var UiPanel = new GUI.StackPanel();
        UiPanel.width = "220px";
        UiPanel.fontSize = "14px";
        UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
		advancedTexture.addControl(UiPanel);

        var button = GUI.Button.CreateSimpleButton("button", "Toggle Specular AA");
        button.paddingTop = "10px";
        button.width = "120px";
        button.height = "50px";
        button.color = "white";
        button.background = "#0088FF";
        button.onPointerDownObservable.add(function() {
            for (var i = 0; i < scene.materials.length; i++) {
                (scene.materials[i] as BABYLON.PBRMaterial).enableSpecularAntiAliasing = !(scene.materials[i] as BABYLON.PBRMaterial).enableSpecularAntiAliasing;
            }
        });

        UiPanel.addControl(button);  
		
		scene.animationGroups[0].start(true);  
		
        engine.hideLoadingUI();
    });
}

// 高级
const demo33 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 清屏色
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    
    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
    pbr.metallic = 0;
    pbr.roughness = 1.0;

    scene.createDefaultCamera(true, true, true);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(pbr, "ADVANCED");
}

// PBR  能量守恒
const demo34 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 清屏色
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 设置环境光
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
  
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:2}, scene);
    sphere.position.x -= 1;

    var pbr = new BABYLON.PBRMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
    pbr.metallic = 1.0;
    pbr.roughness = 1.0;

    var sphereNo = BABYLON.MeshBuilder.CreateSphere("sphereNo",{segments:16, diameter:2}, scene);
    sphereNo.position.x += 1;

    var pbrNo = new BABYLON.PBRMaterial("pbrNo", scene);
    sphereNo.material = pbrNo;

    pbrNo.albedoColor = new BABYLON.Color3(1, 1, 1);
    pbrNo.metallic = 1.0;
    pbrNo.roughness = 1.0;

    // 关闭能量守恒
    pbrNo.brdf.useEnergyConservation = false;

    scene.createDefaultCamera(true, true, true);
}
