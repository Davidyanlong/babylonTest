import { BABYLON } from "../../base/commonIncludes";


// 场景基本的构建方法
// 级联阴影案例
export const cascadedShadowLightScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    demo3(scene, canvas);

    return scene;
};

function populateScene(base:BABYLON.Mesh, numObjs:number, size:number, scene:BABYLON.Scene) {
    const created = [];
    for (let i = 0; i < numObjs; i++) {
        const obj = base.createInstance(`${i}`);
        obj.position.x = (Math.random() - 0.5) * size; 
        obj.position.y = Math.random() * size * 0.25 + 1; 
        obj.position.z = (Math.random() - 0.5) * size;

        obj.rotation = BABYLON.Vector3.Random(0, 3.14);
        created.push(obj); 
    }
    return created;
}

const demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
    // 创建大小
    var sceneSize = 2000;
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera(
        "Camera", 
        -Math.PI / 2, 
        Math.PI / 3, 
        sceneSize * 1.1, 
        BABYLON.Vector3.Zero(), 
        scene);
    
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建光源
    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0,-1,-1), scene);
    light.intensity = 0.8;
    light.autoCalcShadowZBounds = true;

    // 创建级联阴影投射
    const csm = new BABYLON.CascadedShadowGenerator(1024, light);
    // const csm = new BABYLON.ShadowGenerator(1024, light);

    // 创建灯光组件
    const lightGizmo = new BABYLON.LightGizmo();
    lightGizmo.light = light;

    // 创建地面
    const floor = BABYLON.MeshBuilder.CreateGround("ground", {
        width: sceneSize,
        height: sceneSize
    });
    // 地面接受阴影
    floor.receiveShadows = true;
    // 创建渲染对象
    const base = BABYLON.MeshBuilder.CreateTorusKnot("Base", {radius: 20, tube: 5}, scene);
    base.material = new BABYLON.StandardMaterial("base");
    (base.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.Green();
    const objects = populateScene(base, 200, sceneSize, scene);
    for (let i = 0; i < objects.length; i++) {
        csm.addShadowCaster(objects[i]);
    }
}


const demo2 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);
    camera.maxZ = 200;

	// 创建光源
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);

	var lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:10, diameter:2}, scene);
	lightSphere.position = light.position;
	lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	(lightSphere.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 0);

	// Ground
	// var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", 
    //     "https://playground.babylonjs.com/textures/heightMap.png", 
    //     100, 100, 100, 0, 10, scene, false);

    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
            "https://playground.babylonjs.com/textures/heightMap.png", 
            {
                width:100, 
                height:100, 
                subdivisions:100, 
                minHeight:0, 
                maxHeight:10,
                updatable:false
            }, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	(groundMaterial.diffuseTexture as BABYLON.Texture).uScale = 6;
	(groundMaterial.diffuseTexture as BABYLON.Texture).vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	// Torus
	// var torus = BABYLON.Mesh.CreateTorus("torus", 4, 2, 30, scene, false);
    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {     
        diameter:4,
        thickness:2, 
        tessellation:30,
        updatable:false
    }, scene);
    torus.position = new BABYLON.Vector3(30, 30,0);

	// Shadows
	var shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, light);
	shadowGenerator.getShadowMap()!.renderList!.push(torus);

	ground.receiveShadows = true;
}



const demo3 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);
    camera.maxZ = 200;

	// 创建光源
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);

	var lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:10, diameter:2}, scene);
	lightSphere.position = light.position;
	lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	(lightSphere.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 0);

	// Ground
	// var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", 
    //     "https://playground.babylonjs.com/textures/heightMap.png", 
    //     100, 100, 100, 0, 10, scene, false);

    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
            "https://playground.babylonjs.com/textures/heightMap.png", 
            {
                width:100, 
                height:100, 
                subdivisions:100, 
                minHeight:0, 
                maxHeight:10,
                updatable:false
            }, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	(groundMaterial.diffuseTexture as BABYLON.Texture).uScale = 6;
	(groundMaterial.diffuseTexture as BABYLON.Texture).vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	// Torus
	// var torus = BABYLON.Mesh.CreateTorus("torus", 4, 2, 30, scene, false);
    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {     
        diameter:4,
        thickness:2, 
        tessellation:30,
        updatable:false
    }, scene);
    torus.position = new BABYLON.Vector3(30, 30,0);

	// Shadows
	var shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, light);
	shadowGenerator.getShadowMap()!.renderList!.push(torus);
    camera.maxZ = 200;
    shadowGenerator.splitFrustum();

	ground.receiveShadows = true;
}

