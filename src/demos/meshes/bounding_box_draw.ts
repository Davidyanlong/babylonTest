import { BABYLON, GUI } from "../../base/commonIncludes";


// 碰撞时间相关案例
export const drawBoundboxScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 12, BABYLON.Vector3.Zero(), scene);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    // demo4(scene);
    demo5(scene);
    return scene;
}
// 最简单的显示包围盒
const demo1 = (scene:BABYLON.Scene)=>{
    // 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 显示包围盒
    sphere.showBoundingBox = true;
}

// 设置包围盒， 计算整体包围盒
const demo2 = (scene:BABYLON.Scene)=>{
  // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 获取球的包围盒信息
    let sphereMin = sphere.getBoundingInfo().boundingBox.minimum;
    let sphereMax = sphere.getBoundingInfo().boundingBox.maximum;

    // 获取地面的包围盒信息
    let groundMin = ground.getBoundingInfo().boundingBox.minimum;
    let groundMax = ground.getBoundingInfo().boundingBox.maximum;

    // 计算一个整体的包围盒
    let newMin = BABYLON.Vector3.Minimize(sphereMin, groundMin);
    let newMax = BABYLON.Vector3.Maximize(sphereMax, groundMax);

    // 设置球的包围盒
    sphere.setBoundingInfo(new BABYLON.BoundingInfo(newMin, newMax));
    
    // 显示包围盒
    sphere.showBoundingBox = true;

}

// 变换 包围盒
const demo3 = (scene:BABYLON.Scene)=>{

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    
    // 创建一个空的mesh
    let parent = new BABYLON.Mesh("parent", scene);

    // 设置父级对象
    sphere.setParent(parent);
    ground.setParent(parent);
    
    // 计算包围盒，使用minimumWorld maximumWorld 计算世界空间
    let sphereMin = sphere.getBoundingInfo().boundingBox.minimumWorld;
    let sphereMax = sphere.getBoundingInfo().boundingBox.maximumWorld;

    let groundMin = ground.getBoundingInfo().boundingBox.minimumWorld;
    let groundMax = ground.getBoundingInfo().boundingBox.maximumWorld;

    let newMin = BABYLON.Vector3.Minimize(sphereMin, groundMin);
    let newMax = BABYLON.Vector3.Maximize(sphereMax, groundMax);


    parent.setBoundingInfo(new BABYLON.BoundingInfo(newMin, newMax));
    
    parent.showBoundingBox = true;
}

// 使用getHierarchyBoundingVectors 计算包围盒
const demo4 = (scene:BABYLON.Scene)=>{

    // 创建球
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere1.position.y = 1;

    // 创建球2
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere2.position = new BABYLON.Vector3(2, 2, 1);

    // 创建球3
    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere3.position = new BABYLON.Vector3(-3, 0, -2);

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 创建空的Mesh，作为父级
    let parent = new BABYLON.Mesh("parent", scene);

    // 设置父级关系
    sphere1.setParent(parent);
    sphere2.setParent(parent);
    sphere3.setParent(parent);
    ground.setParent(parent);

    // 计算包围盒信息
    let { min, max } = parent.getHierarchyBoundingVectors();
    
    parent.setBoundingInfo(new BABYLON.BoundingInfo(min, max));
    
    parent.showBoundingBox = true;
}

// 添加子模型， 更新包围盒
const demo5 = (scene:BABYLON.Scene)=>{

    // 创建一个球
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere1.position.y = 1;

    // 创建球2
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere2.position = new BABYLON.Vector3(2, 2, 1);

    // 创建球3
    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere3.position = new BABYLON.Vector3(-3, 0, -2);

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 创建父级空mesh
    let parent = new BABYLON.Mesh("parent", scene);
    
    parent.showBoundingBox = true;

    let detectReentrancy = false
    // 父级世界矩阵更新时调用
    parent.onAfterWorldMatrixUpdateObservable.add((v) => {
        console.log(333)
        // 下一帧调用
        setTimeout(() => {
            if (detectReentrancy) {
                return;
            }
            detectReentrancy = true;
            // 计算包围盒
            let { min, max } = parent.getHierarchyBoundingVectors(); //triggers observable causing infinite loop
            // 设置包围盒
            parent.setBoundingInfo(new BABYLON.BoundingInfo(min, max));
            
            setTimeout(() => {
                detectReentrancy = false;
            });
        });
    })
    
    // 每次设置父级对象， 父级对象的世界矩阵都有计算一次，从而会触发事件的调用
    sphere1.setParent(parent);
    sphere2.setParent(parent);
    sphere3.setParent(parent);
    setTimeout(()=>{
        ground.setParent(parent);
    },2000)
    
}