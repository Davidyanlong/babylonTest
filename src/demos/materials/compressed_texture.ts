import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const compressedTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个材质
    var scene = new BABYLON.Scene(engine);

    demo1(engine, scene, canvas);

    // demo2(scene, canvas);

    return scene;
}

const demo1 = ( engine:BABYLON.Engine, scene: BABYLON.Scene, canvas: HTMLCanvasElement) => {
   
    // detect available formats
    // 测试的格式
   var available = ['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc1.ktx', '-etc2.ktx'];
   // 可用的格式
   var formatUsed = engine.setTextureFormatToUse(available);
    console.log(formatUsed)

   // 创建相机
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Zero());
   // This attaches the camera to the canvas
   camera.attachControl(canvas, true);


   // 创建灯光
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
   // Default intensity is 1. Let's dim the light a small amount
   light.intensity = 0.7;


   // 创建地面
   var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);

   var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
   const diffuseTexture  = materialPlane.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/Vinc3r/BJS-KTX-textures/master/BJS/UVgrid.png", scene);
   diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
   diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes

   ground.material = materialPlane;

   //GUI
   var myGUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

   var panel = new GUI.StackPanel();
   panel.width = "210px";
   panel.isVertical = true;
   panel.horizontalAlignment =GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
   panel.verticalAlignment =GUI.Control.VERTICAL_ALIGNMENT_TOP;    
   myGUI.addControl(panel);
   
   var panelHeading = new GUI.StackPanel();
   panelHeading.width = "150px";
   panelHeading.height = "45px";
   panelHeading.isVertical = false;
   panelHeading.horizontalAlignment =GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   panelHeading.verticalAlignment =GUI.Control.VERTICAL_ALIGNMENT_CENTER;    
   panel.addControl(panelHeading);
   
   var heading = new GUI.TextBlock();
   heading.text = "Image Format is " + formatUsed;
   heading.width = "180px";
   heading.height = "40px"
   heading.paddingLeft = "10px";
   heading.paddingBottom = "15px";
   heading.textHorizontalAlignment =GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   heading.color = "white";
   panelHeading.addControl(heading); 
}
