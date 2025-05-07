import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const bumpTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 3 * Math.PI / 8, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
    
    
    // 创建半球光
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // 灯光颜色
    light.diffuse = new BABYLON.Color3(1, 1, 1);
	
    // 创建一个标准材质
	var mat0 = new BABYLON.StandardMaterial("mat0", scene);
    // 设置漫反射颜色
	mat0.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // 设置bumpTexture
	mat0.bumpTexture = new BABYLON.Texture("https://i.imgur.com/wGyk6os.png", scene);
	
    // 创建一个标准材质
	var mat1 = new BABYLON.StandardMaterial("mat1", scene);
    // 设置漫反射贴图
	mat1.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/Wk1cGEq.png", scene);
    // 设置凹凸贴图
	mat1.bumpTexture = new BABYLON.Texture("https://i.imgur.com/wGyk6os.png", scene);
	
    // 创建一个材质
	var mat2 = new BABYLON.StandardMaterial("mat2", scene);
    // 设置漫反射贴图
	mat2.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
    // 设置凹凸贴图
	mat2.bumpTexture = new BABYLON.Texture("https://i.imgur.com/wGyk6os.png", scene);

    // // 翻转bump
    // demo2(mat0);
    // demo2(mat1);
    // demo2(mat2);
	
	//颜色材质 + 凹凸贴图
	var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
	sphere0.position.x = -1.5;
	sphere0.material = mat0;	
	
	// 贴图材质 + 凹凸贴图
	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
	sphere1.material = mat1;
	
	// 其他贴图 + 凹凸贴图
	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {}, scene);
	sphere2.material = mat2;
	sphere2.position.x = 1.5;			
        
    return scene;
}

const demo2 = (myMaterial:BABYLON.StandardMaterial)=>{
    // 翻转bump
    myMaterial.invertNormalMapX = true;
    myMaterial.invertNormalMapY = true;
}