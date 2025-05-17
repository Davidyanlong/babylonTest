import { BABYLON, GUI } from "../../base/commonIncludes";


// 碰撞时间相关案例
export const billboardScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
   camera.useAutoRotationBehavior = true;
   // 自动旋转速度
   camera.autoRotationBehavior!.idleRotationSpeed = 1;
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box.position.y = 1;
    const mat = box.material = new BABYLON.StandardMaterial("boxMat", scene);
    mat.diffuseColor = BABYLON.Color3.Blue();

    /**
     * 
     * value	Type
     * 0	BILLBOARDMODE_NONE
     * 1	BILLBOARDMODE_X
     * 2	BILLBOARDMODE_Y
     * 4	BILLBOARDMODE_Z
     * 7	BILLBOARDMODE_ALL
     */



    //BillboardMode ensures a mesh is always facing towards the camera.
    // 默认设置模式为 0
    box.billboardMode = 0;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);


    //GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let guiButton = GUI.Button.CreateSimpleButton("guiButton", "BillBoardMode On");
    guiButton.width = "300px"
    guiButton.height = "40px";
    guiButton.color = "white";
    guiButton.cornerRadius = 10;
    guiButton.background = "blue";
    guiButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    guiButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    // 点击事件
    guiButton.onPointerUpObservable.add(function() {
        // 改变模式
        if(box.billboardMode === 0){
            box.billboardMode = 7;
            guiButton.textBlock!.text = "BillBoardMode Off";
        }
        else{
            box.billboardMode = 0;
            guiButton.textBlock!.text = "BillBoardMode On";
        }
    });
    advancedTexture.addControl(guiButton); 

   
    return scene;
}

