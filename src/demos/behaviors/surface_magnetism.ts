import { BABYLON } from "../../base/commonIncludes";

// 表面吸附案例
export const surfaceMagnetismBehaviorDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
    // 创建场景和相机
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    
    // 创建地面和墙壁
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    const wall = BABYLON.MeshBuilder.CreateBox("wall", {width: 10, height: 5, depth: 0.5}, scene);
    wall.position.z = -5;
    
    // 创建可吸附的物体
    const mat = new BABYLON.StandardMaterial('box_mat');
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box.position.y = 3;
    mat.diffuseColor = BABYLON.Color3.Blue();
    box.material = mat;
    
    
    // 创建并配置表面磁力行为
    const surfaceMagnetismBehavior = new BABYLON.SurfaceMagnetismBehavior();
    surfaceMagnetismBehavior.attach(box);
    surfaceMagnetismBehavior.meshes = [ground, wall];
    surfaceMagnetismBehavior.maxStickingDistance = 15;
    surfaceMagnetismBehavior.hitNormalOffset = 0.5; // 让物体浮在表面上方
    
    // 添加拖拽行为来测试
    const dragBehavior = new BABYLON.PointerDragBehavior();
    dragBehavior.moveAttached = false;
    dragBehavior.useObjectOrientationForDragging = false;
    box.addBehavior(dragBehavior);
    
    // 拖拽时更新吸附位置
    dragBehavior.onDragObservable.add(() => {
        surfaceMagnetismBehavior.updateAttachPoint();
    });
    return scene;
};
