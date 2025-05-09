import { BABYLON, proceduraTextures } from "../../base/commonIncludes";

// 场景基本的构建方法
export const advancedMaterialScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个材质
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);

    demo2(scene, canvas);

    return scene;
}


const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);



    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // Creates a node material from a snippet saved by the node material editor
    // 从一个nodeMaterial的案例中，截图
    BABYLON.NodeMaterial.ParseFromSnippetAsync("#A7A3UB#1", scene).then((nodeMaterial) => {
        // 截图生成texture
        const proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);

        let mat = new BABYLON.StandardMaterial("");

        mat.emissiveTexture = proceduralTexture;

        ground.material = mat;
    });

}


const demo2  = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    var camera = new BABYLON.ArcRotateCamera("Camera", 1, 1.2, 25, new BABYLON.Vector3(10, 0, 0), scene);
    camera.upperBetaLimit = 1.2;
    camera.attachControl(canvas, true);

    const name = 'material_';

    //Material declaration
    var woodMaterial = new BABYLON.StandardMaterial(name, scene);
    var woodTexture = new proceduraTextures.WoodProceduralTexture(name + "text", 1024, scene);
    woodTexture.ampScale = 50.0;
    woodMaterial.diffuseTexture = woodTexture;

    var grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
    var grassTexture = new proceduraTextures.GrassProceduralTexture(name + "textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;

    var marbleMaterial = new BABYLON.StandardMaterial("torus", scene);
    var marbleTexture = new proceduraTextures.MarbleProceduralTexture("marble", 512, scene);
    // @ts-ignore
    marbleTexture.numberOfBricksHeight = 5;
     // @ts-ignore
    marbleTexture.numberOfBricksWidth = 5;
    marbleMaterial.ambientTexture = marbleTexture;

    var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
    var fireTexture = new proceduraTextures.FireProceduralTexture("fire", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;

    var brickMaterial = new BABYLON.StandardMaterial(name, scene);
    var brickTexture = new proceduraTextures.BrickProceduralTexture(name + "text", 512, scene);
    brickTexture.numberOfBricksHeight = 2;
    brickTexture.numberOfBricksWidth = 3;
    brickMaterial.diffuseTexture = brickTexture;

    //light
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-0.5, -1, -0.5), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    // light.groundColor = new BABYLON.Color3(0, 0, 0);
    light.position = new BABYLON.Vector3(20, 40, 20);

    //Create a square of grass using a custom procedural texture
    var square = BABYLON.MeshBuilder.CreateGround("square", {width: 20, height: 20, subdivisions: 2}, scene);
    square.position = new BABYLON.Vector3(0, 0, 0);
    var customMaterial = new BABYLON.StandardMaterial("custommat", scene);
    // 生成纹理
    /**
     * https://playground.babylonjs.com/textures/customProceduralTextures/land/config.json
     * https://playground.babylonjs.com/textures/customProceduralTextures/land/dirt.jpg
     * https://playground.babylonjs.com/textures/customProceduralTextures/land/grass.png
     * https://playground.babylonjs.com/textures/customProceduralTextures/land/custom.fragment.fx
     */
    var customProcText = new BABYLON.CustomProceduralTexture("customtext", 
        "https://playground.babylonjs.com/textures/customProceduralTextures/land", 
        1024, scene);

    customMaterial.ambientTexture = customProcText;
    square.material = customMaterial;

    //Applying some shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    square.receiveShadows = true;
    //Creating 4 bosquets
    CreateBosquet("b1", -9, 1, 9, scene, shadowGenerator, woodMaterial, grassMaterial);
    CreateBosquet("b2", -9, 1, -9, scene, shadowGenerator, woodMaterial, grassMaterial);
    CreateBosquet("b3", 9, 1, 9, scene, shadowGenerator, woodMaterial, grassMaterial);
    CreateBosquet("b4", 9, 1, -9, scene, shadowGenerator, woodMaterial, grassMaterial);

    CreateTree("a1", 0, 3.5, 0, scene, shadowGenerator, woodMaterial, grassMaterial);


    //Creating macadam
    var macadam = BABYLON.MeshBuilder.CreateGround("square", {width: 20, height: 20, subdivisions: 2}, scene);
    macadam.position = new BABYLON.Vector3(20, 0, 0);
    var customMaterialmacadam = new BABYLON.StandardMaterial("macadam", scene);
    var customProcTextmacadam = new proceduraTextures.RoadProceduralTexture("customtext", 512, scene);
    customMaterialmacadam.diffuseTexture = customProcTextmacadam;
    macadam.material = customMaterialmacadam;
    macadam.receiveShadows = true;

    //Creating a fontain
    createFontain("fontain", 20, 0.25, 0, scene, shadowGenerator, marbleMaterial, fireMaterial);
    createTorch("torch1", 15, 0.5, 5, scene, shadowGenerator, brickMaterial, woodMaterial, grassMaterial);
    createTorch("torch2", 15, 0.5, -5, scene, shadowGenerator, brickMaterial, woodMaterial, grassMaterial);
    createTorch("torch3", 25, 0.5, 5, scene, shadowGenerator, brickMaterial, woodMaterial, grassMaterial);
    createTorch("torch4", 25, 0.5, -5, scene, shadowGenerator, brickMaterial, woodMaterial, grassMaterial);

    //Using a procedural texture to create the sky
    var boxCloud = BABYLON.MeshBuilder.CreateSphere("boxCloud", {segments:100, diameter:1000}, scene);
    boxCloud.position = new BABYLON.Vector3(0, 0, 12);
    var cloudMaterial = new BABYLON.StandardMaterial("cloudMat", scene);
    var cloudProcText = new proceduraTextures.CloudProceduralTexture("cloud", 1024, scene);
    cloudMaterial.emissiveTexture = cloudProcText;
    cloudMaterial.backFaceCulling = false;
    cloudMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    boxCloud.material = cloudMaterial;

    scene.registerBeforeRender(function () {
        camera.alpha += 0.001 * scene.getAnimationRatio();
    });
}


var CreateBosquet =  (
    name:string, 
    x:number, y:number, z:number, 
    scene:BABYLON.Scene, 
    shadowGenerator:BABYLON.ShadowGenerator,
    woodMaterial:BABYLON.StandardMaterial, 
    grassMaterial:BABYLON.StandardMaterial)=>{

    var bosquet = BABYLON.MeshBuilder.CreateBox(name, {size: 2}, scene);
    bosquet.position = new BABYLON.Vector3(x, y, z);
    bosquet.material = grassMaterial;

    var bosquetbawl = BABYLON.MeshBuilder.CreateBox(name + "bawl", {}, scene);
    bosquetbawl.position = new BABYLON.Vector3(x, y + 1, z);
    bosquetbawl.material = grassMaterial;

    shadowGenerator.getShadowMap()!.renderList!.push(bosquet);
    shadowGenerator.getShadowMap()!.renderList!.push(bosquetbawl);
}

var CreateTree =  (
    name:string, 
    x:number, y:number, z:number,
    scene:BABYLON.Scene, 
    shadowGenerator:BABYLON.ShadowGenerator,
    woodMaterial:BABYLON.StandardMaterial, 
    grassMaterial:BABYLON.StandardMaterial)=> {
    
    var trunk = BABYLON.MeshBuilder.CreateCylinder(name + "trunk", {height: 7, diameter: 2, tessellation: 12, subdivisions:1}, scene);
    trunk.position = new BABYLON.Vector3(x, y, z);
    trunk.material = woodMaterial;

    var leafs = BABYLON.MeshBuilder.CreateSphere(name + "leafs", {segments: 20, diameter: 7}, scene);
    leafs.position = new BABYLON.Vector3(x, y + 5.0, z);
    leafs.material = grassMaterial;

    shadowGenerator.getShadowMap()!.renderList!.push(trunk);
    shadowGenerator.getShadowMap()!.renderList!.push(leafs);
}

var createFontain =  (
    name:string, 
    x:number, y:number, z:number,
    scene:BABYLON.Scene, 
    shadowGenerator:BABYLON.ShadowGenerator,
     marbleMaterial:BABYLON.StandardMaterial, 
     fireMaterial:BABYLON.StandardMaterial)=> {

    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 1, tessellation: 20}, scene);
    torus.position = new BABYLON.Vector3(x, y, z);
    torus.material = marbleMaterial;

    var fontainGround = BABYLON.MeshBuilder.CreateBox("fontainGround", {size: 4}, scene);
    fontainGround.position = new BABYLON.Vector3(x, y - 2, z);
    fontainGround.material = marbleMaterial;
                                                                            
    var fontainSculptur1 = BABYLON.MeshBuilder.CreateCylinder("fontainSculptur1", {height: 2, diameterTop: 2, diameterBottom: 1, tessellation: 10, subdivisions:1}, scene);
    fontainSculptur1.position = new BABYLON.Vector3(x, y, z);
    fontainSculptur1.material = marbleMaterial;

    var fontainSculptur2 = BABYLON.MeshBuilder.CreateSphere("fontainSculptur2", {segments: 7, diameter: 1.7}, scene);
    fontainSculptur2.position = new BABYLON.Vector3(x, y + 0.9, z);
    fontainSculptur2.material = fireMaterial;
    fontainSculptur2.rotate(new BABYLON.Vector3(1.0, 0.0, 0.0), Math.PI / 2.0, BABYLON.Space.Local);

     shadowGenerator.getShadowMap()!.renderList!.push(torus);
     shadowGenerator.getShadowMap()!.renderList!.push(fontainSculptur1);
     shadowGenerator.getShadowMap()!.renderList!.push(fontainSculptur2);
}

var createTorch =  ( name:string, 
    x:number, y:number, z:number,
    scene:BABYLON.Scene, 
    shadowGenerator:BABYLON.ShadowGenerator,
    brickMaterial:BABYLON.StandardMaterial,
     woodMaterial:BABYLON.StandardMaterial, 
     grassMaterial:BABYLON.StandardMaterial)=> {
    //createBrickBlock
    var brickblock = BABYLON.MeshBuilder.CreateBox(name + "brickblock", {}, scene);
    brickblock.position = new BABYLON.Vector3(x, y, z);
    brickblock.material = brickMaterial;

    //createWood
                                                                    
    var torchwood = BABYLON.MeshBuilder.CreateCylinder(name + "torchwood", {height: 2, diameterTop: 0.25, diameterBottom: 0.1, tessellation: 12, subdivisions:1}, scene);
    torchwood.position = new BABYLON.Vector3(x, y + 1, z);
    torchwood.material = woodMaterial;

    //leafs
    var leafs2 = BABYLON.MeshBuilder.CreateSphere(name + "leafs2", {segments: 10, diameter: 1.2}, scene);
    leafs2.position = new BABYLON.Vector3(x, y + 2, z);
    leafs2.material = grassMaterial;

    shadowGenerator.getShadowMap()!.renderList!.push(torchwood);
    shadowGenerator.getShadowMap()!.renderList!.push(leafs2);
    shadowGenerator.getShadowMap()!.renderList!.push(brickblock);
}


