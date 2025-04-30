import { BABYLON } from "../../base/commonIncludes";

// 基于相机的碰撞
export const collisionMeshDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    const scene = new BABYLON.Scene(engine);
    // 定义轨道相机
    const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 3.5, 25, new BABYLON.Vector3(0, 0, 0));
    // 绑定相机事件
    camera.attachControl(canvas, true);

    camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
    camera.checkCollisions = true;
    
    // 定义半球光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 定义光的强度
    light.intensity = 0.7;

    /* Set Up Scenery 
    _____________________*/

    // 定义地面
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
    const groundMat = ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    groundMat.backFaceCulling = false;


    // 定义一个大木箱
    const box = BABYLON.MeshBuilder.CreateBox("crate", {size: 2}, scene);
    const boxMat = box.material = new BABYLON.StandardMaterial("Mat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene);
    box.checkCollisions = true;

    const boxNb = 6;
    let theta = 0;
    const radius = 6;
    // 大木箱的随机位置
    box.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));

    // 创建 6 个大木箱， 并随机位置
    const boxes = [box];
    for (let i = 1; i < boxNb; i++) {
        theta += 2 * Math.PI / boxNb;
        const newBox = box.clone("box" + i);
        boxes.push(newBox);
        newBox.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));
    }
    /* End Create Scenery */

    //  创建一个空的Mesh
    const base = new BABYLON.Mesh("pivot");
    
    // 包含了两个子Mesh, 分别表示头 和身体
    const headDiam = 1.5;
    const bodyDiam = 2; 
    const head = BABYLON.MeshBuilder.CreateSphere("h", {diameter: headDiam});
    head.parent = base;
    const body = BABYLON.MeshBuilder.CreateSphere("b", {diameter: bodyDiam});
    body.parent = base;
    head.position.y = 0.5 * (headDiam + bodyDiam);
    base.position.y = 0.5 * bodyDiam;


    const extra = 0.25;
    // 设置拖球体
    base.ellipsoid = new BABYLON.Vector3(0.5 * bodyDiam, 0.5 * (headDiam + bodyDiam), 0.5 * bodyDiam); //x and z must be same value
   
    // 拖球体增加0.25
    base.ellipsoid.addInPlace(new BABYLON.Vector3(extra, extra, extra));
    // 相对的 Y方向， 让椭球体在地面上
    const offsetY = 0.5 * (headDiam + bodyDiam) - base.position.y
    // 设置相对位置
    base.ellipsoidOffset = new BABYLON.Vector3(0, offsetY, 0);
    // 可视化拖球体
    const a = base.ellipsoid.x;
    const b = base.ellipsoid.y;
    const points = [];
    for(let theta = -Math.PI/2; theta < Math.PI/2; theta += Math.PI/36) {
        points.push(new BABYLON.Vector3(0, b * Math.sin(theta) + offsetY, a * Math.cos(theta)));
    }

    const ellipse = [];
    ellipse[0] = BABYLON.MeshBuilder.CreateLines("e", {points:points}, scene);
    ellipse[0].color = BABYLON.Color3.Red();
    ellipse[0].parent = base;
    const steps = 12;
    const dTheta = 2 * Math.PI / steps; 
    for(let i = 1; i < steps; i++) {
            ellipse[i] = ellipse[0].clone("el" + i);
            ellipse[i].parent = base;
            ellipse[i].rotation.y = i * dTheta;
    }

    // 键盘控制
    const forward = new BABYLON.Vector3(0, 0, 1);
    let angle = 0;
    let matrix = BABYLON.Matrix.Identity();

    // 前方的方向
    let line = BABYLON.MeshBuilder.CreateLines("f", {points: [base.position.add(new BABYLON.Vector3(0, 3, 0)), base.position.add(new BABYLON.Vector3(0, 3, 0)).add(forward.scale(3))], updatable: true});
    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        angle -= 0.01;
                        BABYLON.Matrix.RotationYToRef(angle, matrix);
                        BABYLON.Vector3.TransformNormalToRef(forward, matrix, forward);
                        base.rotation.y = angle;
                    break;
                    case "d":
                    case "D":
                        angle += 0.01;
                        BABYLON.Matrix.RotationYToRef(angle, matrix);
                        BABYLON.Vector3.TransformNormalToRef(forward, matrix, forward);
                        base.rotation.y = angle;
                    break;
                    case "w":
                    case "W":
                        base.moveWithCollisions(forward.scale(0.1));
                    break
                    case "s":
                    case "S":
                        base.moveWithCollisions(forward.scale(-0.1));
                    break
                }
			break;
		}
        line = BABYLON.MeshBuilder.CreateLines("f", {points: [
            base.position.add(new BABYLON.Vector3(0, 3, 0)), 
            base.position.add(new BABYLON.Vector3(0, 3, 0)).add(forward.scale(3))
        ], instance:line});
	});

    return scene;

    
};


function randomNumber(min:number, max:number) {
    if (min == max) {
        return (min);
    }
    const random = Math.random();
    return ((random * (max - min)) + min);
};