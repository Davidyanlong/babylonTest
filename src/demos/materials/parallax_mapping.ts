import { BABYLON, dat } from "../../base/commonIncludes";

// 场景基本的构建方法
export const parallaxMappingScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 100, new BABYLON.Vector3(0, 0, 0), scene);
	// 绑定事件
    camera.attachControl(canvas, false);

    // 设置相机朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 创建一个半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // 设置光线的强度
    light.intensity = 0.7;

    // 创建一个box
    var mesh = BABYLON.Mesh.CreateBox("box01", 50, scene);

    // 设置位置
    mesh.position = new BABYLON.Vector3(0, 0, 0);

    // 定义一些贴图的URL

    // 砖墙
	var brickWallDiffURL = "https://i.imgur.com/Rkh1uFK.png";
	var brickWallNHURL = "https://i.imgur.com/GtIUsWW.png";
    // 石头墙
	var stoneDiffURL = "https://i.imgur.com/VSbN3Fc.png";
	var stoneNHURL = "https://i.imgur.com/zVGaZNi.png";

    // 创建贴图
    var stoneDiffuseTexture = new BABYLON.Texture(stoneDiffURL, scene);
    var stoneNormalsHeightTexture = new BABYLON.Texture(stoneNHURL, scene);
    var wallDiffuseTexture = new BABYLON.Texture(brickWallDiffURL, scene);
    var wallNormalsHeightTexture = new BABYLON.Texture(brickWallNHURL, scene);
	var normalsHeightTexture = stoneNormalsHeightTexture;

    // 创建材质一
    var material = new BABYLON.StandardMaterial("mtl01", scene);
    // 漫反射使用石头墙贴图
    material.diffuseTexture = stoneDiffuseTexture;
    // 使用bump贴图
    material.bumpTexture = stoneNormalsHeightTexture;
    // 开启视差
    material.useParallax = true;
    // 开始视差屏蔽
    material.useParallaxOcclusion = true;
    // 设置bias 系数， 越大凹凸越厉害
    material.parallaxScaleBias = 0.1;
    // 设置高光的强度
    material.specularPower = 1000.0;
    // 设置高光的颜色
	material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    mesh.material = material;

    // 配置dat.GUI
	var configObject = {
		scaleBias: 0.1,
		renderMode: "Parallax Occlusion",
		texture: "Stone"
	}
	
	var oldgui = document.querySelector("#datGUI");
	if (oldgui != null)
	{
		oldgui.remove();
	}
	
	var gui = new dat.GUI();	
	gui.domElement.style.marginTop = "50px";
	gui.domElement.id = "datGUI";
	
	gui.add(configObject, 'scaleBias', 0.01, 0.2).onChange(function(value) {
		material.parallaxScaleBias = value;
	});
	
	gui.add(configObject, 'renderMode', ['Parallax Occlusion', 'Parallax', 'Bump', "Flat"])
		.onChange(function (value) {
			switch (value) {
	            case "Flat":
                    // 关闭凹凸贴图
	                material.bumpTexture = null;
	                break;
	            case "Bump":
                    // 添加凹凸贴图
	                material.bumpTexture = normalsHeightTexture;
                    // 关闭视差
	                material.useParallax = false;
	                break;
	            case "Parallax":
                    // 添加贴图
	                material.bumpTexture = normalsHeightTexture;
                    // 开始视差
	                material.useParallax = true;
                    // 关闭视差遮蔽
	                material.useParallaxOcclusion = false;
	                break;
	            case "Parallax Occlusion":
                     // 添加贴图
	                material.bumpTexture = normalsHeightTexture;
                     // 开始视差
	                material.useParallax = true;
                     // 开启视差遮蔽
	                material.useParallaxOcclusion = true;
	                break;
			}
	});

	gui.add(configObject, 'texture', ["stone", "wall"])
		.onChange(function (value) {
			switch (value) {
				case "stone":
					material.diffuseTexture = stoneDiffuseTexture;
					normalsHeightTexture = stoneNormalsHeightTexture;
					break;
				case "wall":
					material.diffuseTexture = wallDiffuseTexture;
					normalsHeightTexture = wallNormalsHeightTexture;
					break;
			}
			material.bumpTexture = normalsHeightTexture;
	});
	
    return scene;

}