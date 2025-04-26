import { BABYLON } from "../base/commonIncludes";

// 场景基本的构建方法
export const particleSystemDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    const scene = new BABYLON.Scene(engine);

	const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 70, BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);

	const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0));

    // 粒子状态
    let switched = false;
    const pointerDown = (mesh:BABYLON.Mesh) => {
        if (mesh === fountain) {
            switched = !switched;
            if(switched) {
                // Start the particle system
                particleSystem.start();
            }
            else {
                // Stop the particle system
                particleSystem.stop();
            }
        }

    }

    // 点击事件
    scene.onPointerObservable.add((pointerInfo) => {   
        // console.log(pointerInfo)   		
        switch (pointerInfo.type) {
            // 鼠标按下
			case BABYLON.PointerEventTypes.POINTERDOWN:
                // 如果点击到物体
				if(pointerInfo?.pickInfo?.hit) {
                    pointerDown(pointerInfo!.pickInfo!.pickedMesh as BABYLON.Mesh)
                }
				break;
        }
    });


    // 参数化图形作为底座
	const fountainProfile = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(10, 4, 0),
		new BABYLON.Vector3(8, 4, 0),
        new BABYLON.Vector3(8, 1, 0),
        new BABYLON.Vector3(1, 2, 0),
		new BABYLON.Vector3(1, 15, 0),
		new BABYLON.Vector3(3, 17, 0)
	];
	
	//  创建参数化图形
	const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
	fountain.position.y = -5;
    
    //  创建粒子系统
    var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);

    // 粒子的纹理贴图
    particleSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);

    // 粒子从哪里开始反射
    particleSystem.emitter = new BABYLON.Vector3(0, 10, 0); // the starting object, the emitter
    // 发射面的范围
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

    // 粒子的颜色在两个颜色中随机插值
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    // 粒子的死亡颜色
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // 随机粒子大小在这两个值之间
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    //随机粒子的生命周期
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 3.5;

    // 每次粒子的发射率
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // 粒子的重力加速度
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // 粒子的发射方向在这两个值直接插值
    particleSystem.direction1 = new BABYLON.Vector3(-2, 8, 2);
    particleSystem.direction2 = new BABYLON.Vector3(2, 8, -2);

    //  随机粒子的角速度插值
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // 粒子的随机速度
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    // 动画的速度
    particleSystem.updateSpeed = 0.025;

    // 启动粒子系统
    // particleSystem.start();


	return scene;
}