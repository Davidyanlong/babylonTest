import { BABYLON, GUI} from "../../base/commonIncludes";

// 场景基本的构建方法
export const instrumentationScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

 /**
  * 计数器名称	                         启用标志	                                                  测量内容	             优化建议
  * activeMeshesEvaluationTimeCounter	instrumentation.captureActiveMeshesEvaluationTime = true	 评估活动网格时间(ms)	 优化视锥剔除策略
  * renderTargetsRenderTimeCounter	    instrumentation.captureRenderTargetsRenderTime = true	     渲染目标纹理时间(ms)	 减少渲染目标数量/分辨率
  * drawCallsCounter	                自动启用	                                                  每帧绘制调用次数	      合并材质/使用实例化渲染
  * frameTimeCounter	                instrumentation.captureFrameTime = true	                     整帧处理时间(ms)	     综合优化
  * renderTimeCounter	                instrumentation.captureRenderTime = true	                 纯渲染时间(ms)	         优化渲染管线
  * interFrameTimeCounter	            instrumentation.captureInterFrameTime = true	             帧间间隔时间(ms)	     优化非渲染逻辑
  * particlesRenderTimeCounter	        instrumentation.captureParticlesRenderTime = true	         粒子渲染时间(ms) 	     简化粒子系统
  * spritesRenderTimeCounter	        instrumentation.captureSpritesRenderTime = true	             精灵渲染时间(ms)	     合并精灵图
  * physicsTimeCounter	                instrumentation.capturePhysicsTime = true	                 物理模拟时间(ms)	     简化碰撞体
  * cameraRenderTimeCounter	            instrumentation.captureCameraRenderTime = true	             单相机渲染时间(ms)	     优化相机配置
  */

 // 创建一个场景
 var scene = new BABYLON.Scene(engine);
 // 创建轨道相机
 var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
 // 创建标准材质
 var material = new BABYLON.StandardMaterial("kosh", scene);

 // 创建要给球
 var sphere1 = BABYLON.MeshBuilder.CreateSphere("Sphere1", {segments:32, diameter:5}, scene);
 // 创建点光源
 var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-17.6, 18.8, -49.9), scene);
// 设置相机位置
camera.setPosition(new BABYLON.Vector3(-15, 3, 0));
// 相机绑定事件
 camera.attachControl(canvas, true);

// Sphere1 material
 // 折射纹理
 material.refractionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
 // 反射纹理
 material.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/TropicalSunnyDay", scene);
 // 基础色
 material.diffuseColor = new BABYLON.Color3(0, 0, 0);
 
 // 反转折射贴图/环境的垂直(Y)方向 修正某些情况下折射效果的视觉方向
 material.invertRefractionY = false;
 // 反射系数
 material.indexOfRefraction = 0.98;
 // 高光系数
 material.specularPower = 128;
 sphere1.material = material;

 // 材质的菲尼尔反射参数
material.refractionFresnelParameters = new BABYLON.FresnelParameters();
 material.refractionFresnelParameters.power = 2;
 material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
 material.reflectionFresnelParameters.power = 2;
 material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
 material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();

// 创建一个天空盒
 var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:100.0}, scene);
 var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
 skyboxMaterial.backFaceCulling = false;
 skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com//textures/TropicalSunnyDay", scene);
 skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
 skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
 skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
 skyboxMaterial.disableLighting = true;
 skybox.material = skyboxMaterial;
 

 var colorGrading = new BABYLON.ColorGradingTexture("https://playground.babylonjs.com//textures/LateSunset.3dl", scene);
 skyboxMaterial.cameraColorGradingTexture = colorGrading;
 material.cameraColorGradingTexture = colorGrading;
 skyboxMaterial.cameraColorGradingEnabled = true;
 material.cameraColorGradingEnabled = true;

 // 创建参数说明
 var instrumentation = new BABYLON.EngineInstrumentation(engine);
 instrumentation.captureGPUFrameTime = true;
 instrumentation.captureShaderCompilationTime = true;
 
 // GUI
 var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
 var stackPanel = new GUI.StackPanel();
 stackPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;   
 stackPanel.isVertical = true;
 advancedTexture.addControl(stackPanel);     

 var text1 = new GUI.TextBlock();
 text1.text = "";
 text1.color = "white";
 text1.fontSize = 16;
 text1.height = "30px";
 stackPanel.addControl(text1);       

 var text2 = new GUI.TextBlock();
 text2.text = "";
 text2.color = "white";
 text2.fontSize = 16;
 text2.height = "30px";
 stackPanel.addControl(text2);       

 var text3 = new GUI.TextBlock();
 text3.text = "";
 text3.color = "white";
 text3.fontSize = 16;
 text3.height = "30px";
 stackPanel.addControl(text3);       

 var text4 = new GUI.TextBlock();
 text4.text = "";
 text4.color = "white";
 text4.fontSize = 16;
 text4.height = "30px";
 stackPanel.addControl(text4);        

 var text5 = new GUI.TextBlock();
 text5.text = "";
 text5.color = "white";
 text5.fontSize = 16;
 text5.height = "30px";
 stackPanel.addControl(text5);       

 var i = 0;
 scene.registerBeforeRender(function () {
     colorGrading.level = Math.sin(i++ / 120) * 0.5 + 0.5; 

     text1.text = "current frame time (GPU): " + (instrumentation.gpuFrameTimeCounter!.current * 0.000001).toFixed(2) + "ms";
     text2.text = "average frame time (GPU): " + (instrumentation.gpuFrameTimeCounter!.average * 0.000001).toFixed(2) + "ms";
     text3.text = "total shader compilation time: " + (instrumentation.shaderCompilationTimeCounter.total).toFixed(2) + "ms";
     text4.text = "average shader compilation time: " + (instrumentation.shaderCompilationTimeCounter.average).toFixed(2) + "ms";
     text5.text = "compiler shaders count: " + instrumentation.shaderCompilationTimeCounter.count;
 });

 return scene;

};