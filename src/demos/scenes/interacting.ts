import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const interactingScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    //  相机朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 相机事件
    camera.attachControl(canvas, true);

    // 半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // 灯光强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments: 16, diameter: 2}, scene);

    // 设置球的位置
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 6, height: 6, subdivisions: 2}, scene);

     // 绑定鼠标事件
     scene.onPointerObservable.add((pointerInfo) => {
		switch (pointerInfo.type) {
            // 鼠标按下
			case BABYLON.PointerEventTypes.POINTERDOWN:
				console.log("POINTER DOWN");
				break;
            // 鼠标弹起
			case BABYLON.PointerEventTypes.POINTERUP:
				console.log("POINTER UP");
				break;
            // 鼠标移动
			case BABYLON.PointerEventTypes.POINTERMOVE:
				console.log("POINTER MOVE");
				break;
            // 鼠标滚轮
			case BABYLON.PointerEventTypes.POINTERWHEEL:
				console.log("POINTER WHEEL");
				break;
            // 鼠标单击
			case BABYLON.PointerEventTypes.POINTERPICK:
				console.log("POINTER PICK");
				break;
            // 轻点
			case BABYLON.PointerEventTypes.POINTERTAP:
				console.log("POINTER TAP");
				break;
            // 双击
			case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
				console.log("POINTER DOUBLE-TAP");
				break;
        }
    });

    // 键盘事件
	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
            // 键盘按下
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				console.log("KEY DOWN: ", kbInfo.event.key);
				break;
            // 键盘弹起
			case BABYLON.KeyboardEventTypes.KEYUP:
				console.log("KEY UP: ", kbInfo.event.code);
				break;
		}
	});
   

    return scene;
};
