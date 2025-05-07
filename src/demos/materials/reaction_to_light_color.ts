import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const reactionToLightColorScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
	
    // 定义一组材质的颜色
	var mats = [
        // 黄色
		new BABYLON.Color3(1, 1, 0),
        // 粉色
		new BABYLON.Color3(1, 0, 1),
        // 青色
		new BABYLON.Color3(0, 1, 1),
        // 白色
		new BABYLON.Color3(1, 1, 1)
	]
	
    // 定义红色材质
	var redMat = new BABYLON.StandardMaterial("redMat", scene);
    // 自发光
	redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
	
    // 绿色材质
	var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    // 自发光
	greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0);
	

    // 蓝色材质
	var blueMat = new BABYLON.StandardMaterial("blueMat", scene);
    // 自发光
	blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
	
    // 白色材质
	var whiteMat = new BABYLON.StandardMaterial("whiteMat", scene);
    // 自发光
	whiteMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
	
	
	// 红色聚光灯
	var lightRed = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-0.9, 1 , -1.8), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// 漫反射颜色
    lightRed.diffuse = new BABYLON.Color3(1, 0, 0);
    // 关闭高光
    lightRed.specular = new BABYLON.Color3(0, 0, 0);
	 
	// 绿色聚光灯
	var lightGreen = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, 1, -0.5), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// 漫反射颜色
    lightGreen.diffuse = new BABYLON.Color3(0, 1, 0);
     // 关闭高光
    lightGreen.specular = new BABYLON.Color3(0, 0, 0);
	
	// 蓝色聚光灯
	var lightBlue = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(0.9, 1, -1.8), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// 漫反射
    lightBlue.diffuse = new BABYLON.Color3(0, 0, 1);
    // 关闭高光
    lightBlue.specular = new BABYLON.Color3(0, 0, 0);
	
	// 白色聚光灯
	var lightWhite = new BABYLON.SpotLight("spotLight3", new BABYLON.Vector3(0, 1, 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// 漫反射
    lightWhite.diffuse = new BABYLON.Color3(1, 1, 1);
    // 关闭高光
    lightWhite.specular = new BABYLON.Color3(0, 0, 0);
	
    // 创建红色球
	var redSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
    // 红色球材质
	redSphere.material = redMat;
    // 红色球为红色灯光的位置
	redSphere.position = lightRed.position;
	
    // 创建绿色球
	var greenSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
	// 绿色球材质
    greenSphere.material = greenMat;
    // 绿球为绿色灯光的位置
	greenSphere.position = lightGreen.position;
	
    // 创建蓝色球
	var blueSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
	// 蓝色球的材质
    blueSphere.material = blueMat;
    // 篮球为蓝色灯光的位置
	blueSphere.position = lightBlue.position;
	
    // 创建白色球
	var whiteSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
	// 白色球的材质
    whiteSphere.material = whiteMat;
    // 白球为白色灯光的位置
	whiteSphere.position = lightWhite.position;
	
    // 创建一个地面材质
	var groundMat = new BABYLON.StandardMaterial("groundMat", scene);

    // 设置地面材质的颜色
	groundMat.diffuseColor = mats[0];

    // 创建一个地面
	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 6}, scene);	
	// 设置材质
    ground.material = groundMat;

    /*******************GUI***********************/
    var makeYellow = function() {
        groundMat.diffuseColor = mats[0];
    }

    var makePurple = function() {
        groundMat.diffuseColor = mats[1];
    }

    var makeCyan = function() {
        groundMat.diffuseColor = mats[2];
    }

    var makeWhite = function() {
        groundMat.diffuseColor = mats[3];
    }

    // 创建一组单选按钮
    var matGroup = new GUI.RadioGroup("Material Color");    
    matGroup.addRadio("Yellow", makeYellow, true);
    matGroup.addRadio("Purple", makePurple);
    matGroup.addRadio("Cyan", makeCyan);
    matGroup.addRadio("White", makeWhite);

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var selectBox = new GUI.SelectionPanel("sp", [matGroup]);
    selectBox.width = 0.25;
    selectBox.height = "50%";
    selectBox.top = "4px";
    selectBox.left = "4px";
    selectBox.background = "white";
    selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    advancedTexture.addControl(selectBox);
			    
    return scene;


};