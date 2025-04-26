import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const advanceAdditiveOffsetAnmiationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
	const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI * 1.5, Math.PI/2, 15, new BABYLON.Vector3(4.0, 3.0, 0.0), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //  创建球 
    const sphere_reference = BABYLON.MeshBuilder.CreateSphere("sphere_reference", 
		{ diameter: 2, segments: 32 }, scene);

    const sphere_additive = BABYLON.MeshBuilder.CreateSphere("sphere_additive", 
		{ diameter: 2.5, segments: 32 }, scene);

    // 设置球的材质和颜色
    const sphereMat = new BABYLON.StandardMaterial("sphere_referenceMat", scene);
	// 绿色球
    sphereMat.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);
	// 设置材质
    sphere_additive.material = sphereMat;

    const sphere_referenceMat = new BABYLON.StandardMaterial("sphere_referenceMat", scene);
	// 红色球
    sphere_referenceMat.diffuseColor = new BABYLON.Color3(1.0, 0.0, 0.0);
	// 设置材质
    sphere_reference.material = sphere_referenceMat;

    // 定义动画的路线
	// 起点
    const startPos = new BABYLON.Vector3(0.0, 2.0, 0.0);
	// 终点
    const targetPos = new BABYLON.Vector3(8, 5, 0);

	// 创建线条
    BABYLON.MeshBuilder.CreateLines("lines", {points: [startPos, targetPos]});
	
	// 设置 additive 球的位置 z 这设为 1
    sphere_additive.position = new BABYLON.Vector3(startPos.x, startPos.y, 1.0);
    // 设置 reference 球的位置
	sphere_reference.position = startPos;

    // 定义动画帧的总数
    const frameCount = 400
	// 定义每秒中多少帧
    const frameRate = 60

    // create base motion animation for reference sphere
    const reference = createAnim({
        frameRate: frameRate,
        frameCount: frameCount,
        name: "reference",
        property: "position",
        type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        keys: [
			// 开始位置
            {
                frame: 0,
                value: startPos
            },
			// 目标位置
            {
                frame: frameCount,
                value: targetPos
            }
        ]
    })

    // create base motion animation for additive sphere
    const baseline = createAnim({
        frameRate: frameRate,
        frameCount: frameCount,
        name: "baseline",
        property: "position",
        type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        keys: [
			// Z 值为1的开始位置
            {
                frame: 0,
                value: new BABYLON.Vector3(startPos.x, startPos.y, 1.0)
            }, 
			// Z 值为1的目标位置   
            {
                frame: frameCount,
                value: new BABYLON.Vector3(targetPos.x, targetPos.y, 1.0)
            }    
        ]    
    })    

    // 定义动画位置的偏移量
    const offset = new BABYLON.Vector3(0, 2, 0);

    // create offset animation for additive sphere
    const offsetAnim = createAnim({
        frameRate: frameRate,
        frameCount: frameCount,
        name: "offset",
        property: "position",
        type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        keys: [
			// 开始位置的偏移量
            {
                frame: 0,
                value: offset
            },
			// 结束位置的偏移量
            {
                frame: frameCount,
                value: offset
            }
        ]
    })

	// 权重的动画
    const offsetWeightAnim = createAnim({
        frameRate: frameRate,
        frameCount: frameCount,
        name: "offsetWeight",
        property: "weight",
        type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        keys: [
			// 开始 0 
            {
                frame: 0,
                value: 0.0
            },
			// 20% 0
            {
                frame: frameCount * 0.2,
                value: 0.0
            },
			// 20% + 30帧 变为 1
            {
                frame: frameCount * 0.2 + 30,
                value: 1.0
            },
			// 65%  1
            {
                frame: frameCount * 0.65,
                value: 1.0
            },
			// 65% + 30 变为
            {
                frame: frameCount * 0.65 + 30,
                value: 0.0
            },
			// 结束恢复到 0 
			{
                frame: frameCount,
                value: 0.0
            }
        ]
    })

    // 创建一个动画组
    const animGrp = new BABYLON.AnimationGroup("animGrp", scene);
	// baseline 动画绑定给 additive 球
    animGrp.addTargetedAnimation(baseline, sphere_additive);
	// 不启用混合blend
    animGrp.enableBlending = false;
	// 权重为 1
    animGrp.weight = 1.0;

    // 创建一个动画组
    const offsetGrp = new BABYLON.AnimationGroup("offsetGrp", scene);
	// offset 动画绑定给 additive 球
    offsetGrp.addTargetedAnimation(offsetAnim, sphere_additive);

    // set up animation group parameters with enableBlending set to false to prevent blending 
    // from the sphere's initial position. Also setting isAdditive to true to use this animation 
    // group's key values as the reference point to be added to any other active animation group's  
    // key values. In this case, we want to add the offset animation to the baseline animation 
    // that is targeting the additive sphere. Set additive weight to 0.0 to start.
	// 不启用 混合 blend
    offsetGrp.enableBlending = false;
	// 动画叠加
    offsetGrp.isAdditive = true;
	// 权重 为 0 
    offsetGrp.weight = 0.0;

    // 启动动画
    animGrp.play(true);
    offsetGrp.play(true);

    // 绑定 reference 动画 
    sphere_reference.animations.push(reference);
	// 开启 reference 动画
    scene.beginAnimation(sphere_reference, 0, frameCount, true)

    // offset动画组，播放 offsetWeightAnim 动画, 通过动画动态改变动画组的 weight 值
    scene.beginDirectAnimation(offsetGrp, [offsetWeightAnim], 0, frameCount, true)

    return scene;
}

interface params {
	frameRate:number; 
	name:string;
	property:string;
	type:number;
	keys:any;
	[key:string]:any;
}

// 创建一个动画
function createAnim({ frameRate, name, property, type, keys }:params) {
    const xSlide = new BABYLON.Animation(
        name,
        property,
        frameRate,
        type,
        BABYLON.Animation.ANIMATIONLOOPMODE_YOYO,
        true,
    );

    xSlide.enableBlending = false;
    xSlide.setKeys(keys);

    return xSlide
}