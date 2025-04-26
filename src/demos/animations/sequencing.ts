import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const squencingAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    var scene = new BABYLON.Scene(engine);
	
	var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, -1), scene);   
    light1.intensity =0.25;
    light2.intensity =0.5; 

    // 每秒播放的帧数
    var frameRate = 20;

	/*********performers*********/
	//定义一个通用相机
	var camera = new BABYLON.UniversalCamera(
        "UniversalCamera", 
        new BABYLON.Vector3(0, 3, -30), 
        scene);

	//创建一个门
	var door = BABYLON.MeshBuilder.CreateBox("door", {width:2, height:4, depth:0.1}, scene);
    
    // 创建一个铰链
    var hinge = BABYLON.MeshBuilder.CreateBox("hinge", {}, scene)
    // 铰链不可见
	hinge.isVisible = false;
    // 门的父级是铰链
	door.parent = hinge;
    // 铰链的位置
	hinge.position.y = 2;
    // 门的位置
	door.position.x = -1;
	
	//灯光

    // 创建一个球，作为灯具
    var sphereLight = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.1}, scene);
    // 设置球的材质
    sphereLight.material = new BABYLON.StandardMaterial("", scene);
    // 自发光颜色 白色
    (sphereLight.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 1);
    // 灯具的位置
    sphereLight.position.x = 2;
    sphereLight.position.y = 3;
    sphereLight.position.z = 0.1;

    // 插入灯具到灯具数组中
    const sphereLights = [sphereLight];
    // 灯的位置
    const lightPositions = [-2, 3, 6.9]

    // 添加灯
    for(var i = 0; i < 1; i++) {
        // 克隆被粗放到数组中
        sphereLights.push(sphereLight.clone(""));
        // 设置克隆灯的位置
        sphereLights[i + 1].position = new BABYLON.Vector3(lightPositions[3*i], lightPositions[3*i + 1], lightPositions[3*i + 2])
        // 定义聚光灯数组
        var spotLights = [];
        // 聚光灯的 方向
        var lightDirections = [
            -0.5, -0.25, 1,
             0, 0, -1
            ];

        // 目前是两个灯具    
        for(var i = 0; i < sphereLights.length; i++) {
            // 创建聚光灯
            spotLights[i] = new BABYLON.SpotLight("spotlight" + i, sphereLights[i].position, new BABYLON.Vector3(lightDirections[3*i], lightDirections[3*i + 1], lightDirections[3*i + 2]), Math.PI / 8, 5, scene);
            // 聚光灯颜色
            spotLights[i].diffuse = new BABYLON.Color3(1, 1, 1);
            // 聚光灯高光颜色
            spotLights[i].specular = new BABYLON.Color3(0.5, 0.5, 0.5);
            // 聚光灯强度
            spotLights[i].intensity = 0;
        }

        /*********animations*************/

        /**
         * ANIMATIONLOOPMODE_CONSTANT	Stops and holds the last keyframe value
         * ANIMATIONLOOPMODE_CYCLE	Restarts from the first keyframe (loops indefinitely).
         * ANIMATIONLOOPMODE_RELATIVE	Repeats but adds the last keyframe's value as an offset each cycle.
         */


        // 为相机定义扫一圈的动画
        var rotate = new BABYLON.Animation("rotate", "rotation.y", 
            frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            // 动画只播放一次
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        
        var rotate_keys = []; 

        rotate_keys.push({
            frame: 0,
            value: 0
        });
        // 前 9 * frameRate 不动
        rotate_keys.push({
            // 第 9 秒
            frame: 9 * frameRate,
            value: 0
        });

        // 接下来从 9 * frameRate 到 14 * frameRate 旋转PI
        rotate_keys.push({
            // 第 14 秒
            frame: 14 * frameRate,
            value: Math. PI
        });

        rotate.setKeys(rotate_keys);
        
        // 相机向前移动动画
        var movein = new BABYLON.Animation("movein", "position", 
            frameRate, 
            // 动画数据类型为Vector3
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        
        var movein_keys = []; 

        // 开始位置
        movein_keys.push({
            frame: 0,
            value: new BABYLON.Vector3(0, 5, -30)
        });

        // 第 3 秒的位置
        movein_keys.push({
            frame: 3 * frameRate,
            value: new BABYLON.Vector3(0, 2, -10)
        });

        // 第 5 秒的位置 (保存不移动)
        movein_keys.push({
            frame: 5 * frameRate,
            value: new BABYLON.Vector3(0, 2, -10)
        });

        // 第 8 秒的位置
        movein_keys.push({
            frame: 8 * frameRate,
            value: new BABYLON.Vector3(-2, 2, 3)
        });

        movein.setKeys(movein_keys);

        
        // 开关门动画
        var sweep = new BABYLON.Animation("sweep", "rotation.y", 
            frameRate, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var sweep_keys = []; 
        // 开始位置    
        sweep_keys.push({
            frame: 0,
            value: 0
        });

        // 第 3 秒旋转 （保持不动）
        sweep_keys.push({
            frame: 3 * frameRate,
            value: 0
        });

        // 第 5 秒 旋转  （开门）
        sweep_keys.push({
            frame: 5 * frameRate,
            value: Math.PI/3
        });

        // 第 13 秒 保持不动
        sweep_keys.push({
            frame: 13 * frameRate,
            value: Math.PI/3
        });

        // 第 15 秒 关闭
        sweep_keys.push({
            frame: 15 * frameRate,
            value: 0
        });

        sweep.setKeys(sweep_keys);
        
        // 为灯光的强度定义的动画
        var lightDimmer = new BABYLON.Animation("dimmer", "intensity", 
            frameRate, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        
        var light_keys = []; 

        // 初始强度
        light_keys.push({
            frame: 0,
            value: 0
        });

        // 第 7 秒 （保持不动）
        light_keys.push({
            frame: 7 * frameRate,
            value: 0
        });

        // 第 10 秒，强度为 1
        light_keys.push({
            frame: 10 * frameRate,
            value: 0.2
        });

        // 第 14 秒 （保持不动）
        light_keys.push({
            frame: 14 * frameRate,
            value: 0.2
        });

        // 第 15 秒 强度为 0（关闭灯） 
        light_keys.push({
            frame: 15 * frameRate,
            value: 0
        });


        lightDimmer.setKeys(light_keys);

        /*******Run Clips**********/

        // 开启相机动画， 两个动画同时播放， 15 秒
        scene.beginDirectAnimation(camera, [movein, rotate], 0, 15 * frameRate, false);
        // 开始铰链动画 
        scene.beginDirectAnimation(hinge, [sweep], 0, 15 * frameRate, false);
        // 开启聚光灯动画
        scene.beginDirectAnimation(spotLights[0], [lightDimmer], 0, 15 * frameRate, false);
        // 开启另一个聚光灯动画， 动画克隆 
        scene.beginDirectAnimation(spotLights[1], [lightDimmer.clone()], 0, 15 * frameRate, false);
        

        /************** 创建房子 ***************/
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:50}, scene);
        
        var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {width:8, height:6, depth:0.1}, scene);
        wall1.position.x = -6;
        wall1.position.y = 3;

        var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {width:4, height:6, depth:0.1}, scene);
        wall2.position.x = 2;
        wall2.position.y = 3;

        var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", {width:2, height:2, depth:0.1}, scene);
        wall3.position.x = -1;
        wall3.position.y = 5;

        var wall4 = BABYLON.MeshBuilder.CreateBox("wall4", {width:14, height:6, depth:0.1}, scene);
        wall4.position.x = -3;
        wall4.position.y = 3;
        wall4.position.z = 7;

        var wall5 = BABYLON.MeshBuilder.CreateBox("wall5", {width:7, height:6, depth:0.1}, scene);
        wall5.rotation.y = Math.PI/2;
        wall5.position.x = -10;
        wall5.position.y = 3;
        wall5.position.z = 3.5;

        var wall6 = BABYLON.MeshBuilder.CreateBox("wall6", {width:7, height:6, depth:0.1}, scene);
        wall6.rotation.y = Math.PI/2;
        wall6.position.x = 4;
        wall6.position.y = 3;
        wall6.position.z = 3.5;

        var roof = BABYLON.MeshBuilder.CreateBox("roof", {width:14, height:7, depth:0.1}, scene);
        roof.rotation.x = Math.PI/2;
        roof.position.x = -3;
        roof.position.y = 6;
        roof.position.z = 3.5;

    }

    return scene;
}