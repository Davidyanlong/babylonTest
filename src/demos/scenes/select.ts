import { BABYLON } from "../../base/commonIncludes";

interface posType{
    x:number
    y:number
}

// 场景基本的构建方法
export const selectScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    const scene = new BABYLON.Scene(engine);
    
    // 创建一个相机
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, -5, 0), scene);
    // 设置激活相机
    scene.activeCamera = camera;
    // 相机朝向
    camera.target = BABYLON.Vector3.Zero()

    // 半球光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 光的强度
    light.intensity = 0.7;

    // 创建一组球
    const spheres:BABYLON.Mesh[] = []
    const sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 1, segments: 32}, scene);
    sphere1.setAbsolutePosition(new BABYLON.Vector3(5, 2, 0))
    spheres.push(sphere1)

    const sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 1, segments: 32}, scene);
    sphere2.setAbsolutePosition(new BABYLON.Vector3(3, -2, 0))
    spheres.push(sphere2)

    const sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter: 1, segments: 32}, scene);
    sphere3.setAbsolutePosition(new BABYLON.Vector3(0, 2, 0))
    spheres.push(sphere3)

    const sphere4 = BABYLON.MeshBuilder.CreateSphere("sphere4", {diameter: 1, segments: 32}, scene);
    sphere4.setAbsolutePosition(new BABYLON.Vector3(-3, -2, 0))
    spheres.push(sphere4)

    const sphere5 = BABYLON.MeshBuilder.CreateSphere("sphere5", {diameter: 1, segments: 32}, scene);
    sphere5.setAbsolutePosition(new BABYLON.Vector3(-5, 2, 0))
    spheres.push(sphere5)



    // 初始球的位置
    let startPointerPosition:BABYLON.Nullable<posType> = null

    //  创建一个dom,显示选择的范围
    const dragBox:HTMLDivElement = document.querySelector("#_dragBox") || document.createElement("div");
    // 设置ID
    dragBox.id = "_dragBox";
    // 拖拽框的背景
    const defStyle = "background-color: gray; position: absolute; opacity: 0.3;";
    dragBox.style = defStyle;

    // make the position of div with id canvasZone relative, so that the dragBox can refer to it
    (document.querySelector(".canvasZone") as HTMLDivElement).style = "position: relative;";
    // set the canvasZone to be the parent of dragBox
    (document.querySelector(".canvasZone") as HTMLDivElement).appendChild(dragBox);



    // 鼠标事件
    scene.onPointerObservable.add((eventData) => {
        if (eventData.type === BABYLON.PointerEventTypes.POINTERDOWN) {
            // 记录按下的位置
            startPointerPosition = { x: scene.pointerX, y: scene.pointerY }

        } else if (eventData.type === BABYLON.PointerEventTypes.POINTERMOVE) {

            if (dragBox && startPointerPosition) {
                // 当前的位置
                const currentPointerPosition = { x: scene.pointerX, y: scene.pointerY }
                
                // compute min and max of screen XY with start/currentPointerPosition
                // to set left, top, width and height of the dragBox
                const minX = Math.min(startPointerPosition.x, currentPointerPosition.x)
                const minY = Math.min(startPointerPosition.y, currentPointerPosition.y)
                const maxX = Math.max(startPointerPosition.x, currentPointerPosition.x)
                const maxY = Math.max(startPointerPosition.y, currentPointerPosition.y)
                
                // 设置选择框的大小位置样式
                dragBox.style = `${defStyle} left: ${minX}px; top: ${minY}px; width: ${maxX - minX}px; height: ${maxY - minY}px;`;
            }
        } else if (eventData.type === BABYLON.PointerEventTypes.POINTERUP) {
            if (startPointerPosition) {
                // 结束位置
                const endPointerPosition = { x: scene.pointerX, y: scene.pointerY }
                // 过滤选择的mesh
                const selectedSpheres = spheres.filter((sphere) => isTargetIn(scene, startPointerPosition, endPointerPosition, sphere.getAbsolutePosition(), camera))
                
                // 初始化开始位置
                startPointerPosition = null
                // initialize dragBox's style with default one wich doesn't include width and height
                dragBox.style = defStyle;
                
                // log selected spheres
                console.log('selectedSpheres: ', selectedSpheres)
                // alert with selected spheres counts
                alert(`${selectedSpheres.length} ${selectedSpheres.length > 1 ? 'spheres are' : 'sphere is'} selected!`)
            }
        }
    })


    return scene;
};


const isTargetIn = (scene:BABYLON.Scene, startPosition:BABYLON.Nullable<posType>, endPosition:BABYLON.Nullable<posType>, target:BABYLON.Vector3, camera:BABYLON.ArcRotateCamera) => {
    // 计算屏幕坐标
    const targetScreenPosition = BABYLON.Vector3.Project(
        target,
        BABYLON.Matrix.IdentityReadOnly,
        scene.getTransformMatrix(),
        camera.viewport.toGlobal(
            scene.getEngine().getRenderWidth(),
            scene.getEngine().getRenderHeight()
        )
    )

    if(!startPosition) return false;
    if(!endPosition) return false;


    const minX = Math.min(startPosition.x, endPosition.x)
    const minY = Math.min(startPosition.y, endPosition.y)
    const maxX = Math.max(startPosition.x, endPosition.x)
    const maxY = Math.max(startPosition.y, endPosition.y)

    // 是否圈中
    if (
        targetScreenPosition.x >= minX &&
        targetScreenPosition.x <= maxX &&
        targetScreenPosition.y >= minY &&
        targetScreenPosition.y <= maxY
    ) {
        return true
    }
    return false
}