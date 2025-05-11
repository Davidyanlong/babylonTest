import { BABYLON, proceduraTextures } from "../../base/commonIncludes";


// 场景基本的构建方法
// 级联阴影案例
export const volumetricLightScatteringScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // demo1(engine, scene, canvas);
    demo2(engine, scene, canvas);

    return scene;
};

const  demo1 = (engine: BABYLON.Engine, scene: BABYLON.Scene, canvas: HTMLCanvasElement) => {
   	// 创建点光源
	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", -0.5, 2.2, 100, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);

	// 导入模型
	BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/skull.babylon", scene).then(function (result) {
		// Set the target of the camera to the first imported mesh
		const newMeshes:BABYLON.Mesh[] = result.meshes as BABYLON.Mesh[];
        camera.target = newMeshes[0].position;

		newMeshes[0].material = new BABYLON.StandardMaterial("skull", scene);
		(newMeshes[0].material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
	});

	// Create the "God Rays" effect (volumetric light scattering)
    // 创建体积光 VolumetricLightScatteringPostProcess
    /**
     * @constructor
     * @param name The post-process name
     * @param ratio The size of the post-process and/or internal pass (0.5 means that your postprocess will have a width = canvas.width 0.5 and a height = canvas.height 0.5)
     * @param camera The camera that the post-process will be attached to
     * @param mesh The mesh used to create the light scattering
     * @param samples The post-process quality, default 100
     * @param samplingMode The post-process filtering mode
     * @param engine The babylon engine
     * @param reusable If the post-process is reusable
     * @param scene The constructor needs a scene reference to initialize internal components. If "camera" is null a "scene" must be provided
     */
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess(
        'godrays', 
        1.0,
         camera, 
         undefined, 
         100, 
         BABYLON.Texture.BILINEAR_SAMPLINGMODE, 
         engine, 
         false
        );

	// By default it uses a billboard to render the sun, just apply the desired texture
	// 设置光源的纹理
    const diffuseTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	(godrays.mesh.material as BABYLON.StandardMaterial).diffuseTexture = diffuseTexture;
	// Set the texture to be transparent
    diffuseTexture.hasAlpha = true;
	godrays.mesh.position = new BABYLON.Vector3(-150, 150, 150);
	godrays.mesh.scaling = new BABYLON.Vector3(350, 350, 350);

	light.position = godrays.mesh.position;
}



const demo2 = async (engine: BABYLON.Engine, scene: BABYLON.Scene, canvas: HTMLCanvasElement) =>{

    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0 ,0, .15);

	// 创建半球光， 作为环境光
	// var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 40, 0), scene);
	var light = new BABYLON.HemisphericLight("Hemi", new BABYLON.Vector3(0, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 1, 1);
	// light.specular = new BABYLON.Color3(1, 1, 1);
	light.intensity = .15;

	// 创建轨道相机
	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.2, 20, new BABYLON.Vector3(0, 1, 0), scene);
	camera.attachControl(canvas, false);
	camera.wheelPrecision = 50;

// -------------------------------------------------------------------------
	// 创建一组材质
	var aux1Mat = new BABYLON.StandardMaterial("aux1Mat", scene);
	aux1Mat.wireframe = true;
	aux1Mat.backFaceCulling = false;
	aux1Mat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	aux1Mat.emissiveColor = new BABYLON.Color3(0, .5, 0);

	var aux2Mat = new BABYLON.StandardMaterial("aux2Mat", scene);
	aux2Mat.wireframe = true;
	aux2Mat.backFaceCulling = false;
	aux2Mat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	aux2Mat.emissiveColor = new BABYLON.Color3(.5, 0, 0);

	var aux3Mat = new BABYLON.StandardMaterial("aux3Mat", scene);
	aux3Mat.wireframe = true;
	aux3Mat.backFaceCulling = false;
	aux3Mat.diffuseColor = new BABYLON.Color3(1, 0, 1);
	aux3Mat.emissiveColor = new BABYLON.Color3(.5, 0, .5);

	var aux4Mat = new BABYLON.StandardMaterial("aux4Mat", scene);
	aux4Mat.wireframe = true;
	aux4Mat.backFaceCulling = false;
	aux4Mat.diffuseColor = new BABYLON.Color3(0, 1, 1);
	aux4Mat.emissiveColor = new BABYLON.Color3(0, .5, .5);

	var aux5Mat = new BABYLON.StandardMaterial("aux5Mat", scene);
	aux5Mat.wireframe = true;
	aux5Mat.backFaceCulling = false;
	aux5Mat.diffuseColor = new BABYLON.Color3(1, 1, 0);
	aux5Mat.emissiveColor = new BABYLON.Color3(.5, .5, 0);

// -------------------------------------------------------------------------
	// 创建一些几何体三维对象
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:4}, scene);
	var box1 = BABYLON.MeshBuilder.CreateBox("box1", {size:4}, scene);
	var box2 = BABYLON.MeshBuilder.CreateBox("box2", {size:4}, scene);

	var box3 = BABYLON.MeshBuilder.CreateBox("box3", {size:8}, scene);
	// box3.showBoundingBox = true;
	var box4 = BABYLON.MeshBuilder.CreateBox("box4", {size:8}, scene);
	// box4.showBoundingBox = true;
	var box5 = BABYLON.MeshBuilder.CreateBox("box5", {size:8}, scene);
	// box5.showBoundingBox = true;
	var box6 = BABYLON.MeshBuilder.CreateBox("box6", {size:8}, scene);
	// box6.showBoundingBox = true;
	var cyl1 = BABYLON.MeshBuilder.CreateCylinder("cyl1", {
		height:10, 
		diameterTop:11, 
		diameterBottom:11, 
		subdivisions:16
	}, scene);

// -------------------------------------------------------------------------
	// 应用材质
	sphere.material = aux3Mat;
	box1.material = aux4Mat;
	box2.material = aux5Mat;

	box3.material = aux1Mat;
	box4.material = aux1Mat;
	box5.material = aux1Mat;
	box6.material = aux1Mat;
	cyl1.material = aux2Mat;

	box2.rotation.y += Math.PI / 8.0;

	sphere.position = new BABYLON.Vector3(15, 3.5, 15);
	box1.position = new BABYLON.Vector3(15, 1, 15);
	box2.position = new BABYLON.Vector3(15, 2, 15);


	box3.position = new BABYLON.Vector3(-15, 3, 20);
	box3.rotation = new BABYLON.Vector3(0, 0, 0);

	box4.position = new BABYLON.Vector3(-15, 3, 20);
	box4.rotation = new BABYLON.Vector3(0, (Math.PI/8), 0);

	box5.position = new BABYLON.Vector3(-15, 3, 20);
	box5.rotation = new BABYLON.Vector3(0, (Math.PI/8)*2, 0);

	box6.position = new BABYLON.Vector3(-15, 3, 20);
	box6.rotation = new BABYLON.Vector3(0, (Math.PI/8)*3, 0);

	cyl1.position = new BABYLON.Vector3(-15, 3, 20);
	cyl1.rotation = new BABYLON.Vector3(0, 0, 0);

    await BABYLON.InitializeCSG2Async();

// -------------------------------------------------------------------------
	// csg-ify the mesh
    // 这里的 csg 是一个类， 通过这个类可以实现布尔运算
	var sphereCSG = BABYLON.CSG2.FromMesh(sphere);
	var box1CSG = BABYLON.CSG2.FromMesh(box1);
	var box2CSG = BABYLON.CSG2.FromMesh(box2);
	var box3CSG = BABYLON.CSG2.FromMesh(box3);
	var box4CSG = BABYLON.CSG2.FromMesh(box4);
	var box5CSG = BABYLON.CSG2.FromMesh(box5);
	var box6CSG = BABYLON.CSG2.FromMesh(box6);
	var cyl1CSG = BABYLON.CSG2.FromMesh(cyl1);

// -------------------------------------------------------------------------
	// Set up a MultiMaterial
    // 创建材质
	var mat0 = new BABYLON.StandardMaterial("mat0", scene);
	mat0.diffuseColor.copyFromFloats(0.4, 0.1, 0.6);
	mat0.emissiveColor.copyFromFloats(0.1, 0, 0.2);
	mat0.backFaceCulling = false;

	var mat1 = new BABYLON.StandardMaterial("mat1", scene);
	mat1.diffuseColor.copyFromFloats(0.2, 0.8, 0.2);
	mat1.emissiveColor.copyFromFloats(0, 0.2, 0);
	mat1.backFaceCulling = false;

// -------------------------------------------------------------------------
	// go csg-crazy
    // CSG 布尔运算
	var subCSG = box1CSG.subtract(sphereCSG);
	var newMesh = subCSG.toMesh("csg", scene,{materialToUse: mat0});
	newMesh.position = new BABYLON.Vector3(-12, 0, 0);

	subCSG = sphereCSG.subtract(box1CSG);
	newMesh = subCSG.toMesh("csg2", scene,{materialToUse: mat0});
	newMesh.position = new BABYLON.Vector3(12, 0, 0);

	subCSG = sphereCSG.intersect(box1CSG);
	newMesh = subCSG.toMesh("csg3", scene, {materialToUse: mat0});
	newMesh.position = new BABYLON.Vector3(12, 0, 10);

	// Submeshes are built in order : mat0 will be for the first cube, and mat1 for the second
	var multiMat = new BABYLON.MultiMaterial("multiMat", scene);
	multiMat.subMaterials.push(mat0, mat1);

	// Last parameter to true means you want to build 1 subMesh for each mesh involved
	subCSG = box1CSG.subtract(box2CSG);
	newMesh = subCSG.toMesh("csg4", scene, { materialToUse: multiMat});
	newMesh.position = new BABYLON.Vector3(-12, 0, 10);

	// wingy's fiddle-padiddle
	subCSG = cyl1CSG.subtract(box3CSG);
	subCSG = subCSG.subtract(box4CSG);
	subCSG = subCSG.subtract(box5CSG);
	subCSG = subCSG.subtract(box6CSG);
	// subCSG = cyl1CSG.subtract(box4CSG);
	// subCSG = cyl1CSG.subtract(box5CSG);
	// subCSG = cyl1CSG.subtract(box6CSG);
	newMesh = subCSG.toMesh("csg5", scene, {materialToUse: mat0});
	newMesh.position = new BABYLON.Vector3(0, 2, 0);
	newMesh.scaling = new BABYLON.Vector3(1, .8, 1);

// -----------------------------------------------------------------------------------------------------------------------
	// the bricks
	var brickMat = new BABYLON.StandardMaterial("auxMat", scene);
	const diffuseTexture = brickMat.diffuseTexture = new proceduraTextures.BrickProceduralTexture("brickme", 512, scene);
	// brickMat.bumpTexture = brickMat.diffuseTexture;
	// brickMat.emissiveTexture = brickMat.diffuseTexture;
	brickMat.emissiveColor = new BABYLON.Color3(.1, .1, .1);

	// numberOfBricksHeight no workie... problem at...
	// master/Babylon/Materials/Textures/Procedurals/babylon.standardProceduralTexture.ts#L288
	// brickMat.diffuseTexture._numberOfBricksHeight = 10;
	// brickMat.diffuseTexture.updateShaderUniforms();
	// brickMat.diffuseTexture.numberOfBricksHeight = 10;
	// brickMat.diffuseTexture.cloudColor = 20;

	diffuseTexture.numberOfBricksWidth = 20;
	// brickMat.diffuseTexture.jointColor = new BABYLON.Color4(1, 1, 1, 1);
	// brickMat.diffuseTexture.brickColor = new BABYLON.Color3(0, 0, 2);
	newMesh.material = brickMat;
	// brickMat.diffuseTexture.wAng = Math.PI/2;

// -----------------------------------------------------------------------------------------------------------------------
	// the rad1 radiator (the logo)
	// var rad1 = BABYLON.Mesh.CreateBox("rad1", 5, scene);
	var rad1 = BABYLON.MeshBuilder.CreatePlane("rad1", {size:2}, scene);
	// var rad1 = BABYLON.Mesh.CreateSphere("rad1", 8, 16, scene);
	// var rad1 = BABYLON.Mesh.CreateCylinder("rad1", 10, 5, 5, 8, 8, scene);
	rad1.visibility = 1;

	const rad1Mat = rad1.material = new BABYLON.StandardMaterial("bmat", scene);
	rad1Mat.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);
	rad1Mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
	// rad1.material.emissiveColor = new BABYLON.Color3(0.3, 0.1, 0.1);
	rad1.material.backFaceCulling = false;

	rad1.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

	// rad1.position = new BABYLON.Vector3(10, 5, 0);
	rad1.position = newMesh.position;
    rad1.scalingDeterminant *= 2;

// ------------------------------------------------------------------------------
	// ground
	var grd = BABYLON.MeshBuilder.CreateGround("grd", {width:50, height:50, subdivisions:1}, scene);
	// var grd = BABYLON.Mesh.CreatePlane("grd", 50, scene);
	grd.showBoundingBox = true;
	grd.position = new BABYLON.Vector3(0, -2.02, 0);
	grd.rotation = new BABYLON.Vector3(0, 0, 0);
	grd.setEnabled(true);

	const grdMat = grd.material = new BABYLON.StandardMaterial("gmat", scene);
	grd.material.backFaceCulling = false;
	// grd.material.diffuseColor = new BABYLON.Color4(0.3,0.1,0.1);

// ------------------------------------------------------------------------------
	// Create the "God Rays" effect (volumetric light scattering)
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, rad1, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

    // @ts-ignore
	godrays._volumetricLightScatteringRTT.renderParticles = true;

    godrays.exposure = 0.1;
    godrays.decay = 0.96815;
    godrays.weight = 0.98767;
    godrays.density = 0.996;
	const godraysMat = godrays.mesh.material as BABYLON.StandardMaterial

	// set the godrays texture to be the image.
	godraysMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/BJS-logo_v3.png", scene);
    godraysMat.diffuseTexture.hasAlpha = true;

/*
	// fog testing
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	scene.fogDensity = 0.1;
	scene.fogStart = 20.0;
	scene.fogEnd = 60.0;
	scene.fogColor = new BABYLON.Color3(0.1, 0.5, 0.1);
*/

	scene.registerBeforeRender(function () {
		// camera.alpha += .01;
		// rad1.rotation.y += .05;
		newMesh.rotation.y -= .01;
	});
}