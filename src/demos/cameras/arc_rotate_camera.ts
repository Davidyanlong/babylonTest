import { Nullable } from "@babylonjs/core";
import { BABYLON, GUI } from "../../base/commonIncludes";

/**
 * ArcRotateCamera UpVector Changes Demo
 * By Dave Solares (PolygonalSun)
 * 
 * The purpose of this demo is to show how changes to the upVector will affect how
 * the ArcRotateCamera will move with respect to alpha and beta rotations.
 * 
 * The upVector is a vector that defines what direction the camera treats as up (think
 * opposite direction of gravity).  If you want to change this vector, note that either 
 * the position or the alpha/beta values will change, depending on how the upVector
 * changes.
 * 
 * All controls are handled via the UI.
 */

var ROLL_SPEED = 0.002;
var rollAngle = 0;
var camUp:Nullable<BABYLON.GreasedLineMesh> = null;

// 场景基本的构建方法
export const arcRotateCameraDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

   //  创建一个场景
   var scene = new BABYLON.Scene(engine);

   // 创建一个自由相机,通过自由相机来查看 ArcRotateCamera 的变化
   var freeCamera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 5, -50), scene);
   // lookAt [0,0,0]
   freeCamera.setTarget(BABYLON.Vector3.Zero());

   // 创建一个ArcRotateCamera 轨道相机
   var camera = new BABYLON.ArcRotateCamera(
    "arcCamera",                    // name
    0,                              // alpha
    Math.PI/3,                      // beta
    15,                             // radius
    BABYLON.Vector3.Zero(),         // lookAt 
    scene);

   // 设置lookAt  
   camera.setTarget(BABYLON.Vector3.Zero());
   
   // 相机控件
   var gizmo = new BABYLON.CameraGizmo();
   // arcRotateCamera
   gizmo.camera = camera;

   // 得到相机的 aspect
   const pipH = 0.25 * engine.getAspectRatio(freeCamera);
   const pipY = 1 - pipH;
   
   // 设置相机的视口，在屏幕的左上角查看相机看到的结果
   camera.viewport = new BABYLON.Viewport(0, pipY, 0.25, pipH);
   // 设置相机的 蒙版
   camera.layerMask = 2;

   scene.activeCameras = scene.activeCameras ||[];
   scene.activeCameras.push(freeCamera);
   scene.activeCameras.push(camera);
   // 设置渲染的结果
   gizmo.gizmoLayer.setRenderCamera(freeCamera);
   

   // 定义半球光
   var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

   // 定义强度
   light.intensity = 0.7;

   // 创建一个球
   var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);


   // 球的位置
   sphere.position.y = 1;

   // 创建一个地面
   var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);


   // 相机的UP向量 放大 4 倍
   const upVectorPoint = camera.upVector.scale(4);
   // 创建 up 向量的方向
   camUp = BABYLON.CreateGreasedLine(
       "upVector",
       { 
           updatable: true,
           points: [BABYLON.Vector3.ZeroReadOnly, upVectorPoint] 
       },
       { color: BABYLON.Color3.White() },
       scene
   ) as BABYLON.GreasedLineMesh;

   // 添加箭头端点
   const cap = BABYLON.GreasedLineTools.GetArrowCap(
       upVectorPoint, camera.upVector, 0.4, 4, 4
   );

   // 绘制箭头
   BABYLON.CreateGreasedLine(
       'line',
       {
           points: cap.points,
           widths: cap.widths,
           instance: camUp
       },
       { color: BABYLON.Color3.White() },
       scene
   );

   // Create UI
   var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, gizmo.gizmoLayer.utilityLayerScene);
   scene.cameraToUseForPointers = freeCamera;
   advancedTexture.layer!.layerMask = 4;

   var panel = new GUI.StackPanel();
   panel.width = "220px";
   panel.height= "1100px";
   panel.fontSize = "14px";
   panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
   panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
   advancedTexture.addControl(panel);

   // 创建滑动条
   var alphaSlider = createSlider("alpha", 0, 2*Math.PI, camera.alpha);
   var betaSlider = createSlider("beta", 0, Math.PI, camera.beta);
   var rollSlider = createSlider("roll", -Math.PI, Math.PI, 0);

   // 创建文字
   var alphaHeader = createHeader("alphaHeader", `Alpha: ${BABYLON.Tools.ToDegrees(camera.alpha).toPrecision(4)} deg`);
   var betaHeader = createHeader("betaHeader", `Beta: ${BABYLON.Tools.ToDegrees(camera.beta).toPrecision(4)} deg`);
   var rollHeader = createHeader("rollHeader", `Rotate upVector: ${BABYLON.Tools.ToDegrees(rollSlider.value).toPrecision(4)} deg`)

   panel.addControl(alphaHeader);
   panel.addControl(alphaSlider);
   panel.addControl(betaHeader);
   panel.addControl(betaSlider);
   panel.addControl(rollHeader);
   panel.addControl(rollSlider);

   // 定义滑动事件
   alphaSlider.onValueChangedObservable.add(function(value) {
       if (value !== camera.alpha) {
           rollAngle = 0;
           rollSlider.value = 0;
           // 修改相机 alpha
           camera.alpha = value;
       }
       alphaHeader.text = "Alpha: " + (BABYLON.Tools.ToDegrees(value) | 0).toPrecision(4) + " deg";
   });

   betaSlider.onValueChangedObservable.add(function(value) {
       if (value !== camera.beta) {
           rollAngle = 0;
           rollSlider.value = 0;
           // 修改相机 beta
           camera.beta = value;
       }
       betaHeader.text = "Beta: " + (BABYLON.Tools.ToDegrees(value) | 0).toPrecision(4) + " deg";
   });

   // 相机up方向
   var upVectorLoc = new GUI.TextBlock("upVec", `(${camera.upVector.x.toFixed(3)}, ${camera.upVector.y.toFixed(3)}, ${camera.upVector.z.toFixed(3)})`);
   upVectorLoc.height = "100px";
   upVectorLoc.color = "white";
   upVectorLoc.paddingTopInPixels = 40;
   advancedTexture.addControl(upVectorLoc);

   // up方向 时间
   rollSlider.onValueChangedObservable.add(function(value) {
       if (value !== 0) {
           const delta = value - rollAngle;
           rollAngle = value;
           // 相机滚动
           rollCamera(camera, delta);
           upVectorLoc.text = `(${camera.upVector.x.toFixed(3)}, ${camera.upVector.y.toFixed(3)}, ${camera.upVector.z.toFixed(3)})`;
           alphaSlider.value = camera.alpha;
           betaSlider.value = camera.beta;
       }
       rollHeader.text = `Rotate upVector: ${BABYLON.Tools.ToDegrees(rollSlider.value).toPrecision(4)} deg`;
   });

   // 重设按钮
   var button = GUI.Button.CreateSimpleButton("resetButton", "Reset UpVector");
   button.width = "200px";
   button.height = "40px";
   button.color = "white";
   button.background = "green";
   button.paddingTop = "10px";
   button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   // 重设参数
   button.onPointerClickObservable.add(() => {
       // 重设场景
       resetScene(camera);
       rollSlider.value = 0;
       upVectorLoc.text = `(${camera.upVector.x.toFixed(3)}, ${camera.upVector.y.toFixed(3)}, ${camera.upVector.z.toFixed(3)})`;
   });
   panel.addControl(button);   

   return scene;
    
};




/**
 * Rotate the upVector via the camera's forward direction.  This will then update
 * the camera's perspective to appear as though it rotated.
 */
function rotateCamera(camera:BABYLON.ArcRotateCamera, localAxis:BABYLON.Vector3, angle:number) {
    const upVector = camera.upVector.clone();
    // 计算旋转后的UP向量
    const axis = BABYLON.Quaternion.RotationAxis(localAxis, angle);
    // 更新UP 向量
    upVector.applyRotationQuaternionInPlace(axis);
    camera.upVector = upVector;

    // Note about this function: If you want to keep the same position, you'll
    // need to call this function.  This will take the current camera position
    // and recalculate the alpha and beta values.  Not calling this function will
    // instead force the position to be changed on the next camera update.
    camera.rebuildAnglesAndRadius();

    // Since alpha has no limits, we want to try and keep it between 0 and 2 * PI
    if (camera.alpha > Math.PI * 2) {
        camera.alpha -= Math.PI * 2;
    }
    else if (camera.alpha < 0) {
        camera.alpha += Math.PI * 2;
    }
}

/**
 * Rotate the camera but also update the visual arrow for the upVector
 */
function rollCamera(camera:BABYLON.ArcRotateCamera, angle:number) {
    const localZ = camera.getDirection(BABYLON.Axis.Z);
    // 旋转相机 绕Z轴
    rotateCamera(camera, localZ, angle);
    if(camUp){
        // 计算UP向量
        camUp.rotate(localZ, angle, BABYLON.Space.WORLD);
    }
}

/**
 * Reset the rotation of both the upVector and its visual representation (camUp)
 */
function resetScene(camera:BABYLON.ArcRotateCamera) {
    camera.upVector = BABYLON.Axis.Y;
    if(camUp){
        camUp.rotation.copyFromFloats(0, 0, 0);
        camUp.rotationQuaternion = null;
    }

    // Like in the rotateCamera function, we're calling this so that the position remains
    // the same and the angles are rotated instead.
    camera.rebuildAnglesAndRadius();
}

/**
 * Create UI header for Slider
 */
function createHeader(name:string, text:string) {
    const header = new GUI.TextBlock(name, text);
    header.height = "40px";
    header.color = "white";
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.paddingTop = "10px";

    return header;
}

/**
 * 创建一个 Slider
 */
function createSlider(name:string, min:number, max:number, value:number) {
    const slider = new GUI.Slider(name);
    slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    slider.minimum = min;
    slider.maximum = max;
    slider.color = "green";
    slider.height = "20px";
    slider.width = "200px";
    slider.value = value;

    return slider;
}
