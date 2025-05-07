import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const reflectionAndRefractionScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas)
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
    demo16(scene, canvas);     
    
    return scene;
}

// box 的环境反射
const demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    // 创建灯光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 创建一个box 天空盒
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    
    // 创建标准材质
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    
    // 关闭背面裁剪， 双面渲染
	skyboxMaterial.backFaceCulling = false;
    // 创建cube Texture
       /**
     * Creates a cube texture to use with reflection for instance. It can be based upon dds or six images as well
     * as prefiltered data.
     * @param rootUrl defines the url of the texture or the root name of the six images
     * @param sceneOrEngine defines the scene or engine the texture is attached to
     * @param extensionsOrOptions defines the suffixes add to the picture name in case six images are in use like _px.jpg or set of all options to create the cube texture
     * @param noMipmap defines if mipmaps should be created or not
     * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
     * @param onLoad defines a callback triggered at the end of the file load if no errors occurred
     * @param onError defines a callback triggered in case of error during load
     * @param format defines the internal format to use for the texture once loaded
     * @param prefiltered defines whether or not the texture is created from prefiltered data
     * @param forcedExtension defines the extensions to use (force a special type of file to load) in case it is different from the file name
     * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
     * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
     * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
     * @param loaderOptions options to be passed to the loader
     * @param useSRGBBuffer Defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU) (default: false)
     * @returns the cube texture
     */
    // 设置反射纹理
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
   
    /*
    * | Value | Type                                | Description |
    * | ----- | ----------------------------------- | ----------- |
    * | 0     | EXPLICIT_MODE                       |  显式模式​​：直接使用自定义 UV 坐标（需手动设置顶点或纹理坐标）。           |
    * | 1     | SPHERICAL_MODE                      |  ​​球面映射​​：将贴图投影到球体表面，适合球体或圆形物体的反射（易产生接缝）          |
    * | 2     | PLANAR_MODE                         |  ​​平面映射​​：将贴图沿平面（如 XY/YZ/XZ）投影，适合平面或简单几何体。           |
    * | 3     | CUBIC_MODE                          |  立方体贴图模式​​：从立方体六个面采样，无接缝，适合动态环境反射（如天空盒）。          |
    * | 4     | PROJECTION_MODE                     |  投影映射​​：类似摄像机投影（正交或透视），适合屏幕空间反射或复杂形状。           |
    * | 5     | SKYBOX_MODE                         |  天空盒模式​​：自动关联场景的天空盒贴图，常用于全局环境反射。          |
    * | 6     | INVCUBIC_MODE                       |  逆立方体模式​​：优化立方体贴图的采样方向，减少边缘畸变（类似环境光遮蔽）           |
    * | 7     | EQUIRECTANGULAR_MODE                |  等距圆柱投影​​：2:1 比例的全景贴图（如 360° 照片），需配套球形网格使用。           |
    * | 8     | FIXED_EQUIRECTANGULAR_MODE          |  ​​固定等距圆柱模式​​：与 EQUIRECTANGULAR_MODE 类似，但固定 UV 映射方向。           |
    * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |  像等距圆柱模式​​：在 EQUIRECTANGULAR 基础上镜像 UV，解决对称问题。
    */
     
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 漫反射与高光设置为黑色
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// 创建一个box 盒子
	var shape = BABYLON.MeshBuilder.CreateBox("shape", {}, scene);
    // 创建材质
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
    // 背面裁剪开启
	shapeMaterial.backFaceCulling = true;

    // 设置反射贴图
	shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	
    // 设置反射贴图的坐标模式 立方体贴图模式
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
     // 漫反射与高光设置为黑色
	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	
	
    // 旋转box
	shape.rotation.y = Math.PI/8;
	shape.rotation.x = -Math.PI/8;		
}

// 平面的环境反射
const demo2 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    // 创建灯光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 创建一个box 天空盒
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    
    // 创建标准材质
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    
    // 关闭背面裁剪， 双面渲染
	skyboxMaterial.backFaceCulling = false;
    // 创建cube Texture
       /**
     * Creates a cube texture to use with reflection for instance. It can be based upon dds or six images as well
     * as prefiltered data.
     * @param rootUrl defines the url of the texture or the root name of the six images
     * @param sceneOrEngine defines the scene or engine the texture is attached to
     * @param extensionsOrOptions defines the suffixes add to the picture name in case six images are in use like _px.jpg or set of all options to create the cube texture
     * @param noMipmap defines if mipmaps should be created or not
     * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
     * @param onLoad defines a callback triggered at the end of the file load if no errors occurred
     * @param onError defines a callback triggered in case of error during load
     * @param format defines the internal format to use for the texture once loaded
     * @param prefiltered defines whether or not the texture is created from prefiltered data
     * @param forcedExtension defines the extensions to use (force a special type of file to load) in case it is different from the file name
     * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
     * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
     * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
     * @param loaderOptions options to be passed to the loader
     * @param useSRGBBuffer Defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU) (default: false)
     * @returns the cube texture
     */
    // 设置反射纹理
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
   
    /*
    * | Value | Type                                | Description |
    * | ----- | ----------------------------------- | ----------- |
    * | 0     | EXPLICIT_MODE                       |  显式模式​​：直接使用自定义 UV 坐标（需手动设置顶点或纹理坐标）。           |
    * | 1     | SPHERICAL_MODE                      |  ​​球面映射​​：将贴图投影到球体表面，适合球体或圆形物体的反射（易产生接缝）          |
    * | 2     | PLANAR_MODE                         |  ​​平面映射​​：将贴图沿平面（如 XY/YZ/XZ）投影，适合平面或简单几何体。           |
    * | 3     | CUBIC_MODE                          |  立方体贴图模式​​：从立方体六个面采样，无接缝，适合动态环境反射（如天空盒）。          |
    * | 4     | PROJECTION_MODE                     |  投影映射​​：类似摄像机投影（正交或透视），适合屏幕空间反射或复杂形状。           |
    * | 5     | SKYBOX_MODE                         |  天空盒模式​​：自动关联场景的天空盒贴图，常用于全局环境反射。          |
    * | 6     | INVCUBIC_MODE                       |  逆立方体模式​​：优化立方体贴图的采样方向，减少边缘畸变（类似环境光遮蔽）           |
    * | 7     | EQUIRECTANGULAR_MODE                |  等距圆柱投影​​：2:1 比例的全景贴图（如 360° 照片），需配套球形网格使用。           |
    * | 8     | FIXED_EQUIRECTANGULAR_MODE          |  ​​固定等距圆柱模式​​：与 EQUIRECTANGULAR_MODE 类似，但固定 UV 映射方向。           |
    * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |  像等距圆柱模式​​：在 EQUIRECTANGULAR 基础上镜像 UV，解决对称问题。
    */
     
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 漫反射与高光设置为黑色
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// 创建一个地面
	var shape = BABYLON.MeshBuilder.CreateGround("shape", {width:4, height:4}, scene);
    // 创建材质
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
    // 背面裁剪开启
	shapeMaterial.backFaceCulling = true;
    // 设置反射贴图
	shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	// 设置坐标模式 为平面
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;

	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	
	
	shape.rotation.y = Math.PI/8;
	shape.rotation.x = -Math.PI/8;		
}


// 球面的环境反射
const demo3 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    // 创建灯光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 创建一个box 天空盒
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    
    // 创建标准材质
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    
    // 关闭背面裁剪， 双面渲染
	skyboxMaterial.backFaceCulling = false;
    // 创建cube Texture
       /**
     * Creates a cube texture to use with reflection for instance. It can be based upon dds or six images as well
     * as prefiltered data.
     * @param rootUrl defines the url of the texture or the root name of the six images
     * @param sceneOrEngine defines the scene or engine the texture is attached to
     * @param extensionsOrOptions defines the suffixes add to the picture name in case six images are in use like _px.jpg or set of all options to create the cube texture
     * @param noMipmap defines if mipmaps should be created or not
     * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
     * @param onLoad defines a callback triggered at the end of the file load if no errors occurred
     * @param onError defines a callback triggered in case of error during load
     * @param format defines the internal format to use for the texture once loaded
     * @param prefiltered defines whether or not the texture is created from prefiltered data
     * @param forcedExtension defines the extensions to use (force a special type of file to load) in case it is different from the file name
     * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
     * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
     * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
     * @param loaderOptions options to be passed to the loader
     * @param useSRGBBuffer Defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU) (default: false)
     * @returns the cube texture
     */
    // 设置反射纹理
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
   
    /*
    * | Value | Type                                | Description |
    * | ----- | ----------------------------------- | ----------- |
    * | 0     | EXPLICIT_MODE                       |  显式模式​​：直接使用自定义 UV 坐标（需手动设置顶点或纹理坐标）。           |
    * | 1     | SPHERICAL_MODE                      |  ​​球面映射​​：将贴图投影到球体表面，适合球体或圆形物体的反射（易产生接缝）          |
    * | 2     | PLANAR_MODE                         |  ​​平面映射​​：将贴图沿平面（如 XY/YZ/XZ）投影，适合平面或简单几何体。           |
    * | 3     | CUBIC_MODE                          |  立方体贴图模式​​：从立方体六个面采样，无接缝，适合动态环境反射（如天空盒）。          |
    * | 4     | PROJECTION_MODE                     |  投影映射​​：类似摄像机投影（正交或透视），适合屏幕空间反射或复杂形状。           |
    * | 5     | SKYBOX_MODE                         |  天空盒模式​​：自动关联场景的天空盒贴图，常用于全局环境反射。          |
    * | 6     | INVCUBIC_MODE                       |  逆立方体模式​​：优化立方体贴图的采样方向，减少边缘畸变（类似环境光遮蔽）           |
    * | 7     | EQUIRECTANGULAR_MODE                |  等距圆柱投影​​：2:1 比例的全景贴图（如 360° 照片），需配套球形网格使用。           |
    * | 8     | FIXED_EQUIRECTANGULAR_MODE          |  ​​固定等距圆柱模式​​：与 EQUIRECTANGULAR_MODE 类似，但固定 UV 映射方向。           |
    * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |  像等距圆柱模式​​：在 EQUIRECTANGULAR 基础上镜像 UV，解决对称问题。
    */
     
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 漫反射与高光设置为黑色
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// 创建一个球
	var shape = BABYLON.MeshBuilder.CreateSphere("shape", {}, scene);
    // 创建标准材质
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
    // 背面裁剪
	shapeMaterial.backFaceCulling = true;
    // 设置反射贴图
	shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	// 设置为 屏幕坐标模式
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	
	
	shape.rotation.y = Math.PI/8;
	shape.rotation.x = -Math.PI/8;	
}

// 两个图形的环境反射
const demo4 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 8, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    // 创建灯光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// 红色的光线
    light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 创建天空盒 
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
    // "skybox_px.jpg", "skybox_nx.jpg", "skybox_py.jpg", "skybox_ny.jpg", "skybox_pz.jpg" and "skybox_nz.jpg"
	// +x, -x, +y, -y, +z, and -z facing
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// 创建盒子一
	var shape = BABYLON.MeshBuilder.CreateBox("shape", {}, scene);
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
	shapeMaterial.backFaceCulling = true;
    // 设置反射贴图
	shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	// 设置反射坐标模式
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	
	shape.rotation.y = Math.PI/8;
	shape.rotation.x = -Math.PI/8;		

    // 创建盒子二
    var extra = BABYLON.MeshBuilder.CreateBox("extra", {}, scene);
    extra.position.x = 2;
}

// cubemap mode
const demo5 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 1, 0), scene);
    // 创建点光源
    var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-17.6, 18.8, -49.9), scene);
	
	
    camera.setPosition(new BABYLON.Vector3(-15, 3, 0));
    camera.attachControl(canvas, true);

    // 相机最小位置
    camera.minZ = 0.01;

    // 相机半径限定
    camera.upperRadiusLimit = 50;
    camera.lowerRadiusLimit = 2;
    // 相机bate角度限定
    camera.upperBetaLimit = Math.PI / 2;

    // 创建一个地面
	var ground = BABYLON.MeshBuilder.CreateGround('ground', {width:100, height:100, subdivisions:1}, scene);
    // 创建地面的材质
    var material = new BABYLON.StandardMaterial("kosh", scene);
    // 设置材质的反射贴图
    const reflectionTexture = material.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
    // 设置反射贴图的包围盒大小， 与天空地面对齐
    reflectionTexture.boundingBoxSize = new BABYLON.Vector3(100, 100, 100);
    // 材质不感光
    material.disableLighting = true;
	ground.material = material;

    // 创建天空盒
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:100.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // 关闭背面裁剪
    skyboxMaterial.backFaceCulling = false;
    // 设置反射材质
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
    // 设置UV坐标模式
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;


    // 定义GUI

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new GUI.StackPanel();
    panel.width = "200px";
    panel.isVertical = false;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    var checkbox = new GUI.Checkbox();
    checkbox.width = "20px";
    checkbox.height = "20px";
    checkbox.isChecked = true;
    checkbox.color = "green";
    // 复选框事件
    checkbox.onIsCheckedChangedObservable.add(function(value) {
        if (!reflectionTexture!.boundingBoxSize) {
            reflectionTexture.boundingBoxSize = new BABYLON.Vector3(100, 100, 100);
        } else {
            //@ts-ignore
            reflectionTexture.boundingBoxSize = null;
        }
    });
    panel.addControl(checkbox);    

    var header = new GUI.TextBlock();
    header.text = "Local cubemap mode";
    header.width = "180px";
    header.paddingLeft = "5px";
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.color = "white";
    panel.addControl(header); 
}

// EquiRectangularCubeTexture 
const demo6 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;
    
    // 创建 EquiRectangularCubeTexture 环境贴图
      /**
     * Instantiates an EquiRectangularCubeTexture from the following parameters.
     * @param url The location of the image
     * @param scene The scene the texture will be used in
     * @param size The cubemap desired size (the more it increases the longer the generation will be)
     * @param noMipmap Forces to not generate the mipmap if true
     * @param gammaSpace Specifies if the texture will be used in gamma or linear space
     * (the PBR material requires those textures in linear space, but the standard material would require them in Gamma space)
     * @param onLoad — defines a callback called when texture is loaded
     * @param onError — defines a callback called if there is an error
     * @param supersample — defines if texture must be supersampled (default: false)
     */
    const eqTexture = new BABYLON.EquiRectangularCubeTexture(
        'https://playground.babylonjs.com/textures/equirectangular.jpg', 
        scene, 512);

    // 设置曝光
    scene.imageProcessingConfiguration.exposure = 1.0;
    // 设置对比度
    scene.imageProcessingConfiguration.contrast = 2.0;

    // 创建天空盒
    const hdrSkybox = BABYLON.MeshBuilder.CreateBox("hdrSkyBox", {size:1000.0}, scene);
    // 创建PBR材质
    const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    // 关闭背面裁剪
    hdrSkyboxMaterial.backFaceCulling = false;
    // 设置反射贴图
    hdrSkyboxMaterial.reflectionTexture = eqTexture.clone();
    // 设置UV 坐标为天空盒模式
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 设置微表面系数
    hdrSkyboxMaterial.microSurface = 1.0;
    // 不感光
    hdrSkyboxMaterial.disableLighting = false;
    hdrSkybox.material = hdrSkyboxMaterial;
    // 设置为无限距离远
    hdrSkybox.infiniteDistance = true;

    // 创建一个球
    const sphereGlass = BABYLON.MeshBuilder.CreateSphere("sphereGlass", {segments:48, diameter:30.0}, scene);
    // 向右平移位置
    sphereGlass.translate(new BABYLON.Vector3(1, 0, 0), -60);

    // 创建一个球
    const sphereMetal = BABYLON.MeshBuilder.CreateSphere("sphereMetal", {segments:48, diameter:30.0}, scene);
    // 向右平移位置
    sphereMetal.translate(new BABYLON.Vector3(1, 0, 0), 60);

    // 创建一个球
    const spherePlastic = BABYLON.MeshBuilder.CreateSphere("spherePlastic", {segments:48, diameter:30.0}, scene);
    // 向前平移位置
    spherePlastic.translate(new BABYLON.Vector3(0, 0, 1), -60);

    // 创建要给box 
    const woodPlank = BABYLON.MeshBuilder.CreateBox("plane", { width: 65, height: 1, depth: 65 }, scene);

    // 创建PBR 材质 玻璃材质
    const glass = new BABYLON.PBRMaterial("glass", scene);
    // 设置反色贴图
    glass.reflectionTexture = eqTexture;
    // 设置折射贴图
    glass.refractionTexture = eqTexture;

    // 透明是开启折射
    glass.linkRefractionWithTransparency = true;
    // 折射系数
    glass.indexOfRefraction = 0.52;
    // 设置透明度
    glass.alpha = 0.0;
    // 设置微表明系数
    glass.microSurface = 1;
    // 反射系数
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    // 环境光的颜色
    glass.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;

    // 创建一个PBR 金属材质
    const metal = new BABYLON.PBRMaterial("metal", scene);
    // 设置反射贴图
    metal.reflectionTexture = eqTexture;
    // 设置微表明系数
    metal.microSurface = 0.96;
    // 反射系数
    metal.reflectivityColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    // 环境光系数
    metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
    sphereMetal.material = metal;
    
    // 创建一个PBR材质， 塑料材质
    const plastic = new BABYLON.PBRMaterial("plastic", scene);
    // 反射贴图
    plastic.reflectionTexture = eqTexture;
    // 微表明系数
    plastic.microSurface = 0.96;
    // 环境光系数
    plastic.albedoColor = new BABYLON.Color3(0.206, 0.94, 1);
    // 反射系数
    plastic.reflectivityColor = new BABYLON.Color3(0.003, 0.003, 0.003);
    spherePlastic.material = plastic;

    // 创建一个PBR材质， 木头材质
    const wood = new BABYLON.PBRMaterial("wood", scene);
    // 反射贴图
    wood.reflectionTexture = eqTexture;
    // 环境光强度
    wood.environmentIntensity = 1;
    // 高光强度
    wood.specularIntensity = 0.3;
    // 设置反射忒图
    wood.reflectivityTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/reflectivity.png", scene);
    //  微表面系数来自于反射贴图的alpha 通道
    wood.useMicroSurfaceFromReflectivityMapAlpha = true;

    // 环境光颜色
    wood.albedoColor = BABYLON.Color3.White();
    // 环境光贴图
    wood.albedoTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/albedo.png", scene);
    woodPlank.material = wood;
}

// HDRCubeTexture
const demo7 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    // 创建点光源
    new BABYLON.PointLight("point", new BABYLON.Vector3(20, 20, 10), scene);

    // 创建天空盒
    var skybox = BABYLON.MeshBuilder.CreateBox("SkyBox", {size:1000.0}, scene);
    // 标准材质
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // 背面裁剪关闭
    skyboxMaterial.backFaceCulling = false;
    // 加载HDR cube 材质
     /**
     * Instantiates an HDRTexture from the following parameters.
     *
     * @param url The location of the HDR raw data (Panorama stored in RGBE format)
     * @param sceneOrEngine The scene or engine the texture will be used in
     * @param size The cubemap desired size (the more it increases the longer the generation will be)
     * @param noMipmap Forces to not generate the mipmap if true
     * @param generateHarmonics Specifies whether you want to extract the polynomial harmonics during the generation process
     * @param gammaSpace Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space)
     * @param prefilterOnLoad Prefilters HDR texture to allow use of this texture as a PBR reflection texture.
     * @param onLoad on success callback function
     * @param onError on error callback function
     * @param supersample Defines if texture must be supersampled (default: false)
     * @param prefilterIrradianceOnLoad Prefilters HDR texture to allow use of this texture for irradiance lighting.
     * @param prefilterUsingCdf Defines if the prefiltering should be done using a CDF instead of the default approach.
     */
    skyboxMaterial.reflectionTexture = new BABYLON.HDRCubeTexture("https://playground.babylonjs.com/textures/room.hdr", scene, 512);
    // 设置UV坐标模式
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;
}

// 平面纹理作为环境贴图
const demo8 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 3, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	// 创建贴空
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // 背面裁剪关闭
	skyboxMaterial.backFaceCulling = false;
    //天空反射纹理
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        "https://playground.babylonjs.com/textures/Space/space_", scene,
        ["left.jpg", "up.jpg", "front.jpg", "right.jpg", "down.jpg", "back.jpg"]);
    
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// 创建一个球
	var shape = BABYLON.MeshBuilder.CreateSphere("shape", {}, scene);
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
    // 开启背面裁剪
	shapeMaterial.backFaceCulling = true;
    // 设置反射贴图
	shapeMaterial.reflectionTexture = new BABYLON.Texture("https://i.imgur.com/hfleQSi.jpg", scene);
	// 设置为UV 坐标模式
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	
	
	shape.rotation.y = Math.PI/8;
	shape.rotation.x = -Math.PI/8;		
}

// 动态反射探针
const demo9 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);
	// 限定相机
	camera.upperBetaLimit = Math.PI / 2;
	camera.lowerRadiusLimit = 4;

    // 创建半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 创建 TorusKnot Mesh 
    var knot = BABYLON.MeshBuilder.CreateTorusKnot("knot", {radius:1, tube:0.4, radialSegments:128, tubularSegments:64, p:2, q:3}, scene);
		
    // 创建黄色球
	var yellowSphere = BABYLON.MeshBuilder.CreateSphere("yellowSphere", {segments:16, diameter:1.5}, scene);
	// 设置局部坐标
    yellowSphere.setPivotMatrix(BABYLON.Matrix.Translation(3, 0, 0), false);
	
    // 创建蓝色球
	var blueSphere = BABYLON.MeshBuilder.CreateSphere("blueSphere",  {segments:16, diameter:1.5}, scene);
	// 设置局部位置
    blueSphere.setPivotMatrix(BABYLON.Matrix.Translation(-1, 3, 0), false);
	
	// 创建绿色球
    var greenSphere = BABYLON.MeshBuilder.CreateSphere("greenSphere",  {segments:16, diameter:1.5}, scene);
	// 设置局部位置变换
    greenSphere.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 3), false);

	var generateSatelliteMaterial = function (root:BABYLON.Mesh, color:BABYLON.Color3, others:BABYLON.Mesh[]) {
		var material = new BABYLON.StandardMaterial("satelliteMat" + root.name, scene);
		material.diffuseColor = color;
		// 创建反射探针
         /**
         * Creates a new reflection probe
         * @param name defines the name of the probe
         * @param size defines the texture resolution (for each face)
         * @param scene defines the hosting scene
         * @param generateMipMaps defines if mip maps should be generated automatically (true by default)
         * @param useFloat defines if HDR data (float data) should be used to store colors (false by default)
         * @param linearSpace defines if the probe should be generated in linear space or not (false by default)
         */
		var probe = new BABYLON.ReflectionProbe("satelliteProbe" + root.name, 512, scene);
        probe.renderList = [];
        // 探针需要渲染的物体
		for (var index = 0; index < others.length; index++) {
			probe.renderList.push(others[index]);			
		}
		
        // 反射贴图为探针渲染的贴图
		material.reflectionTexture = probe.cubeTexture;
		
        //  ​​菲涅尔反射参数
		material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        // 菲涅尔曲线的偏移量，控制反射开始的阈值（0~1）。
    	material.reflectionFresnelParameters.bias = 0.02;
		
		root.material = material;
		probe.attachToMesh(root);
	}
	
	// Mirror
    // 镜面反射效果
    var mirror = BABYLON.MeshBuilder.CreateBox("Mirror", {size:1.0}, scene);
    // 设置缩放 100 倍
    mirror.scaling = new BABYLON.Vector3(100.0, 0.01, 100.0);

    // 定义材质
    const mirrorMaterial= mirror.material = new BABYLON.StandardMaterial("mirror", scene);
    // 漫反射贴图
    mirrorMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);
	// 重复贴图
    (mirrorMaterial.diffuseTexture as BABYLON.Texture).uScale = 10;
	(mirrorMaterial.diffuseTexture as BABYLON.Texture).vScale = 10;
    // 创建一个MirrorTexture 贴图
       /**
     * Instantiates a Mirror Texture.
     * Mirror texture can be used to simulate the view from a mirror in a scene.
     * It will dynamically be rendered every frame to adapt to the camera point of view.
     * You can then easily use it as a reflectionTexture on a flat surface.
     * In case the surface is not a plane, please consider relying on reflection probes.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/reflectionTexture#mirrors
     * @param name
     * @param size
     * @param scene
     * @param generateMipMaps
     * @param type
     * @param samplingMode
     * @param generateDepthBuffer
     */
    const mirrorTexture = mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    // 设置反射面
    mirrorTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -2.0);
    // 反射面的渲染对象
    mirrorTexture.renderList = [greenSphere, yellowSphere, blueSphere, knot];
    // 强度
    mirrorTexture.level = 0.5;
    // 设置位置
    mirror.position = new BABYLON.Vector3(0, -2, 0);	
	
	// 设置主材质	
	var mainMaterial = new BABYLON.StandardMaterial("main", scene);
    // 设置材质
	knot.material = mainMaterial;
	
    // 创建反射探针
	var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList = [];
    // 添加探针渲染的对象
	probe.renderList.push(yellowSphere);
	probe.renderList.push(greenSphere);	
	probe.renderList.push(blueSphere);	
	probe.renderList.push(mirror);	
    // 设置漫反射颜色
	mainMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);	
    // 设置反射贴图为探针渲染的物体
	mainMaterial.reflectionTexture = probe.cubeTexture;
    // ​​菲涅尔反射参数
	mainMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    mainMaterial.reflectionFresnelParameters.bias = 0.02;
		
	// 通过探针，创建不同物体的反射
	generateSatelliteMaterial(yellowSphere, BABYLON.Color3.Yellow(), [greenSphere, blueSphere, knot, mirror]);
	generateSatelliteMaterial(greenSphere, BABYLON.Color3.Green(), [yellowSphere, blueSphere, knot, mirror]);
	generateSatelliteMaterial(blueSphere, BABYLON.Color3.Blue(), [greenSphere, yellowSphere, knot, mirror]);

    // 添加线性雾
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor =  new BABYLON.Color3( scene.clearColor.r,  scene.clearColor.g,  scene.clearColor.b)
    // 雾的开始位置
    scene.fogStart = 20.0;
    // 雾的结束位置
    scene.fogEnd = 50.0;
	
	// Animations
	scene.registerBeforeRender(function () {
		yellowSphere.rotation.y += 0.01;
		greenSphere.rotation.y += 0.01;
		blueSphere.rotation.y += 0.01;
	});
}

// 镜面反射
const demo10 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera",  -7 * Math.PI / 16, 4 * Math.PI / 8, 20, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

    // 创建灯光
	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 10, -5), scene);
	//var light2 = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 10, 5), scene);
	// 创建被反射对象 球体
	var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", {}, scene);
	//sphere.position.z = -1;
	
    // 创建红色的材质
	var redMaterial = new BABYLON.StandardMaterial("red", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
	// 应用材质
	sphere.material = redMaterial;
	
	// 创建四个反射面
	for(var i=0; i<4; i++) {
        // 创建一个平面
		var glass = BABYLON.MeshBuilder.CreatePlane("glass", {width: 5, height: 5}, scene);
		// 设置位置
        let x = ((i<2?1:0) - 0.5)*12*((i%2) == 1?1:0);
        let z = ((i<2?1:0) - 0.5)*12*((i%2) == 0?1:0);
        glass.position = new BABYLON.Vector3(x, 0, z);
        // 旋转
		glass.rotation = new BABYLON.Vector3(0, i * Math.PI / 2, 0);
	
		//Ensure working with new values for glass by computing and obtaining its worldMatrix
		// 计算世界矩阵
        glass.computeWorldMatrix(true);
        // 获取世界矩阵
		var glass_worldMatrix = glass.getWorldMatrix();
	
		//Obtain normals for plane and assign one of them as the normal
        // 获取法线数据
  		var glass_vertexData = glass.getVerticesData("normal") as BABYLON.FloatArray;
        // 法线方向
		var glassNormal = new BABYLON.Vector3(glass_vertexData[0], glass_vertexData[1], glass_vertexData[2]);	
		// 变换法线
		glassNormal = BABYLON.Vector3.TransformNormal(glassNormal, glass_worldMatrix)
	
		//Create reflecting surface for mirror surface
        // 计算一个反射面
		var reflector = BABYLON.Plane.FromPositionAndNormal(glass.position, glassNormal.scale(-1));

		//Create the mirror material
        // 创建镜面材质
		var mirrorMaterial = new BABYLON.StandardMaterial("mirror", scene);
        // 创建镜面贴图
		const mirrorTexture = mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
		mirrorTexture.mirrorPlane = reflector;
		mirrorTexture.renderList = [sphere];
		mirrorTexture.level = 1;
	
		glass.material = mirrorMaterial;
	}
}

// 反射模糊
const demo11 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
	
	camera.setPosition(new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);
	
	camera.upperBetaLimit = Math.PI / 2;
	camera.lowerRadiusLimit = 4;

    // 创建点光源
    var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    light.intensity = 0.7;

    // 
    // var knot = BABYLON.Mesh.CreateTorusKnot("knot", 1, 0.4, 128, 64, 2, 3, scene);
    var knot = BABYLON.MeshBuilder.CreateTorusKnot("knot", {
        radius:1, 
        tube:0.4, 
        radialSegments:128,
        tubularSegments:64, 
        p:2, 
        q:3
    }, scene);
	
	// Mirror
    var mirror = BABYLON.MeshBuilder.CreateBox("Mirror", {size:1.0}, scene);
    mirror.scaling = new BABYLON.Vector3(100.0, 0.01, 100.0);
    const mat = mirror.material = new BABYLON.StandardMaterial("mirror", scene);
    const tex = mat.reflectionTexture = new BABYLON.MirrorTexture("mirror", {ratio: 0.5}, scene, true);
    // 设置反射面
    tex.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -2.0);
    // 设置渲染对象
    tex.renderList = [knot];
    // 渲染强度
    tex.level = 1.0;
    // 模糊核数
    tex.adaptiveBlurKernel = 32;
    // 镜面位置
	mirror.position = new BABYLON.Vector3(0, -2, 0);	
	
	// Main material	
	var mainMaterial = new BABYLON.StandardMaterial("main", scene);
	knot.material = mainMaterial;
	mainMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);

    // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(scene.clearColor.r,scene.clearColor.g,scene.clearColor.b);
    scene.fogStart = 20.0;
    scene.fogEnd = 50.0;
}

// 折射案例
const demo12 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));
	camera.attachControl(canvas);
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 4;

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 生成一个 ​​圆盘（Disc）
	// var disc = BABYLON.Mesh.CreateDisc("disc", 3, 60, scene);
    var disc = BABYLON.MeshBuilder.CreateDisc("disc", {radius:3, tessellation:60}, scene);
	disc.position.y += 2;
	
    // var yellowSphere = BABYLON.Mesh.CreateSphere("yellowSphere", 16, 1.5, scene);
    var yellowSphere = BABYLON.MeshBuilder.CreateSphere("yellowSphere", {segments:16, diameter:1.5}, scene);

    // 设置位置和材质
    yellowSphere.setPivotMatrix(BABYLON.Matrix.Translation(3, 0, 0));
	var yellowMaterial = new BABYLON.StandardMaterial("yellowMaterial", scene);
    yellowMaterial.diffuseColor = BABYLON.Color3.Yellow();
    yellowSphere.material = yellowMaterial;

    // var greenSphere = BABYLON.Mesh.CreateSphere("greenSphere", 16, 1.5, scene);
    var greenSphere = BABYLON.MeshBuilder.CreateSphere("yellowSphere", {segments:16, diameter:1.5}, scene);

    // 设置位置和材质
    greenSphere.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 3));
	var greenMaterial = new BABYLON.StandardMaterial("greenMaterial", scene);
    greenMaterial.diffuseColor = BABYLON.Color3.Green();
    greenSphere.material = greenMaterial;

    // Ground
    var ground = BABYLON.MeshBuilder.CreateBox("Mirror",{size: 1.0}, scene);
    // 所致缩放
    ground.scaling = new BABYLON.Vector3(100.0, 0.01, 100.0);
    // 定义材质
    const groundMat = ground.material = new BABYLON.StandardMaterial("ground", scene);
    const groundTexture = groundMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);
    groundTexture.uScale = 10;
    groundTexture.vScale = 10;
    ground.position = new BABYLON.Vector3(0, -2, 0);

    // 定义主材质	
    var mainMaterial = new BABYLON.StandardMaterial("main", scene);
    disc.material = mainMaterial;
	
    // 创建折射材质
        /**
     * Creates a refraction texture used by refraction channel of the standard material.
     * It is like a mirror but to see through a material.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/reflectionTexture#refraction
     * @param name Define the texture name
     * @param size Define the size of the underlying texture
     * @param scene Define the scene the refraction belongs to
     * @param generateMipMaps Define if we need to generate mips level for the refraction
     */
	var refractionTexture = new BABYLON.RefractionTexture("th", 1024, scene);
    // 折射渲染列表
    refractionTexture.renderList = [];
    refractionTexture.renderList.push(yellowSphere);
    refractionTexture.renderList.push(greenSphere);
    refractionTexture.renderList.push(ground);
    // 设置折射面
	refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 0);
    // 折射深度
	refractionTexture.depth = 2.0;
	
    // 设置漫反射颜色
    mainMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    // 设置折射忒图
	mainMaterial.refractionTexture = refractionTexture;
    // 设置射线系数 IOR
	mainMaterial.indexOfRefraction = 0.6;
	
    // Animations
    scene.registerBeforeRender(function () {
        yellowSphere.rotation.y += 0.01;
        greenSphere.rotation.y += 0.01;
    });

}

// 折射系数的改变
const demo13 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera",  -7 * Math.PI / 16,  8 * Math.PI / 16, 20, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

    // 创建点光源
	var light = new BABYLON.PointLight("hemi", new BABYLON.Vector3(25, 25, -10), scene);
	

	// 反射球对象
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
	sphere.position.z = 6;
	
	var redMaterial = new BABYLON.StandardMaterial("red", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
	
	sphere.material = redMaterial;
	
	// 创建一个水面
	var water = BABYLON.MeshBuilder.CreatePlane("water", {width: 15, height: 15}, scene);

	// 创建材质
	var waterMaterial = new BABYLON.StandardMaterial("water", scene);
	waterMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    // 创建一个折射贴图
	const refractionTexture =  waterMaterial.refractionTexture = new BABYLON.RefractionTexture("water", 1024, scene, true);
	// 折射面
    refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 1);
    // 渲染对象
	refractionTexture.renderList = [sphere];
    // 折射深度
	refractionTexture.depth = 50;
    // 默认的IOR
	waterMaterial.indexOfRefraction = 0.1;
	water.material = waterMaterial;
    // 不透明度
	waterMaterial.alpha = 0.5;
	
	var IoR = 0.1;
	var theta = 0;
	scene.registerBeforeRender(function () {
        // 动态变化IOR
		waterMaterial.indexOfRefraction = IoR + Math.abs(Math.cos(theta)*1.5);
		//console.log(waterMaterial.indexOfRefraction);
		theta += 0.015;
	});
}

// 折射深度的改变
const demo14 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera",  -7 * Math.PI / 16,  8 * Math.PI / 16, 20, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

    // 创建灯光
	var light = new BABYLON.PointLight("hemi", new BABYLON.Vector3(25, 25, -10), scene);
	
	// 创建渲染对象球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
	sphere.position.z = 6;
	
	var redMaterial = new BABYLON.StandardMaterial("red", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
	
	sphere.material = redMaterial;
	
	// 创建水的平面，观察折射情况
	var water = BABYLON.MeshBuilder.CreatePlane("water", {width: 15, height: 15}, scene);

	//Create the water material
	var waterMaterial = new BABYLON.StandardMaterial("water", scene);
	  // 创建一个折射贴图
      const refractionTexture =  waterMaterial.refractionTexture = new BABYLON.RefractionTexture("water", 1024, scene, true);
      // 折射面
      refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 1);
      // 渲染对象
      refractionTexture.renderList = [sphere];
      // 折射深度
      refractionTexture.depth = 50;
      // 默认的IOR
      waterMaterial.indexOfRefraction = 0.1;
      water.material = waterMaterial;
      // 不透明度
      waterMaterial.alpha = 0.5;
	
	var theta = 0;
	scene.registerBeforeRender(function () {
        // 改变折射的深度值
	    refractionTexture.depth = Math.abs(Math.sin(theta)*100);
		theta += 0.015;
	});
	
}

//  不同的坐标模式
const demo15 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建自由相机
    const camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -10));
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.applyGravity = true;
    camera.speed = 0.25;

    // 创建环境光
	scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    // 创建半球光
	const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 10, -10), scene);
	light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.intensity = 1.0;

    // Demonstrate coordinate modes that use a 3-D texture.
    // 创建不同模式的UV 坐标模式
        /*
    * | Value | Type                                | Description |
    * | ----- | ----------------------------------- | ----------- |
    * | 0     | EXPLICIT_MODE                       |  显式模式​​：直接使用自定义 UV 坐标（需手动设置顶点或纹理坐标）。           |
    * | 1     | SPHERICAL_MODE                      |  ​​球面映射​​：将贴图投影到球体表面，适合球体或圆形物体的反射（易产生接缝）          |
    * | 2     | PLANAR_MODE                         |  ​​平面映射​​：将贴图沿平面（如 XY/YZ/XZ）投影，适合平面或简单几何体。           |
    * | 3     | CUBIC_MODE                          |  立方体贴图模式​​：从立方体六个面采样，无接缝，适合动态环境反射（如天空盒）。          |
    * | 4     | PROJECTION_MODE                     |  投影映射​​：类似摄像机投影（正交或透视），适合屏幕空间反射或复杂形状。           |
    * | 5     | SKYBOX_MODE                         |  天空盒模式​​：自动关联场景的天空盒贴图，常用于全局环境反射。          |
    * | 6     | INVCUBIC_MODE                       |  逆立方体模式​​：优化立方体贴图的采样方向，减少边缘畸变（类似环境光遮蔽）           |
    * | 7     | EQUIRECTANGULAR_MODE                |  等距圆柱投影​​：2:1 比例的全景贴图（如 360° 照片），需配套球形网格使用。           |
    * | 8     | FIXED_EQUIRECTANGULAR_MODE          |  ​​固定等距圆柱模式​​：与 EQUIRECTANGULAR_MODE 类似，但固定 UV 映射方向。           |
    * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |  像等距圆柱模式​​：在 EQUIRECTANGULAR 基础上镜像 UV，解决对称问题。
    */

    createShape(-2, 1, "PLANAR", BABYLON.Texture.PLANAR_MODE);
    createShape(0, 1, "CUBIC", BABYLON.Texture.CUBIC_MODE);
    createShape(2, 1, "INVCUBIC", BABYLON.Texture.INVCUBIC_MODE);
    createShape(-1, -1, "SKYBOX", BABYLON.Texture.SKYBOX_MODE);
    createShape(1, -1, "PROJECTION", BABYLON.Texture.PROJECTION_MODE);


    return scene;
}

const createShape=(x: number, y: number, name: string, mode: number)=>{
     // 创建box
    const shape = BABYLON.MeshBuilder.CreateBox(name, {size: 1});
    shape.position.x = x;
    shape.position.y = y;
    // 创建一个材质
    shape.material = createMaterial(name, mode);

    // 创建一个平面，文字标签
    const sign = BABYLON.MeshBuilder.CreatePlane(name + "_Sign", {width: 1.75, height: 0.25});
    sign.position.x = x;
    sign.position.y = y - 0.75;
    const mat= sign.material = new BABYLON.StandardMaterial(name + "_SignMat");
    mat.backFaceCulling = false;
    mat.specularColor = BABYLON.Color3.Black();
    // 设置动态纹理
    const tex= mat.diffuseTexture = new BABYLON.DynamicTexture(name + "_SignTex", {width: 350, height: 50});
   tex.drawText(name, null, null, "Bold 32px Arial", "#ffff00", "#808080", true);

}

const createMaterial = (name:string, mode:number)=>{
    // 创建一个标准材质
    const mat = new BABYLON.StandardMaterial(name + "_Mat");
    // 关闭背面裁剪
    mat.backFaceCulling = false;
    mat.specularColor = BABYLON.Color3.Black();
    if (mode == null) {
        mat.diffuseTexture = createTexture();
        mat.diffuseTexture.name = name + "_Tex";
    } else {

        mat.diffuseColor =  BABYLON.Color3.Black();
        // 设置反射贴图
        mat.reflectionTexture = createTexture();
        mat.reflectionTexture.name = name + "_Tex";
        // 设置 UV 坐标模式
        mat.reflectionTexture.coordinatesMode = mode;
    }
    return mat;
}

const createTexture = () => {
    // 创建一个Cube 贴图
 
    return new BABYLON.CubeTexture(
           //@ts-ignore
        "https://i.imgur.com/", null,
        // suffixes for sides: +x, +y, +z, -x, -y, -z
        ["9w0oORu.png", "xJC8U8H.png", "kazMI5o.png", "MjuECMA.png", "aVDN8jr.png", "WZTpMAg.png"]);
};

// 旋转反射贴图矩阵
const demo16 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    // 灯光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 天空盒
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
	
	// Sphere
	var shape = BABYLON.MeshBuilder.CreateSphere("shape", {}, scene);
	var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
	shapeMaterial.backFaceCulling = true;
	shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
	shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	shape.material = shapeMaterial;	

	var theta = 0;
	scene.registerBeforeRender(function () {
        BABYLON.Matrix.RotationYToRef(theta, shapeMaterial.reflectionTexture!.getReflectionTextureMatrix()); 
		theta += 0.015;
	});

}