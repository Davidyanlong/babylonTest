import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const controlAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 关闭离线缓存
    engine.enableOfflineSupport = false;
    //用于控制是否允许对矩阵(Matrix)类型的动画进行插值计算。
	BABYLON.Animation.AllowMatricesInterpolation = true;
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.6;
	light.specular = BABYLON.Color3.Black();

    // 直射灯
    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light2.position = new BABYLON.Vector3(0, 5, 5);

    // 阴影对象
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    // 使用ESM 模糊过滤
    shadowGenerator.useBlurExponentialShadowMap = true;
    // 模糊卷积核
    shadowGenerator.blurKernel = 32;
	
    // 显示Loading UI 
    engine.displayLoadingUI();

	BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/dummy2.babylon", scene).then( (result)=>{
        // 骨骼
        var skeleton = result.skeletons[0];
        const newMeshes = result.meshes;
        // 添加阴影
        shadowGenerator.addShadowCaster(scene.meshes[0], true);
        for (var index = 0; index < newMeshes.length; index++) {
            // 模型接受阴影设置为 false
            newMeshes[index].receiveShadows = false;;
        }

        // 创建默认环境
        var helper = scene.createDefaultEnvironment({
            enableGroundShadow: true
        }) as BABYLON.EnvironmentHelper;
        // 设置颜色为灰色
        helper.setMainColor(BABYLON.Color3.Gray());

        // 设置环境的地面位置
        helper.ground!.position.y += 0.01;

        // 动画 beginWeightedAnimation 根据权重动画
        var idleAnim = scene.beginWeightedAnimation(skeleton, 0, 89, 1.0, true);
        var walkAnim = scene.beginWeightedAnimation(skeleton, 90, 118, 0, true);
		var runAnim = scene.beginWeightedAnimation(skeleton, 119, 135, 0, true);
		       
        // UI
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // 创建一个Panel
        var UiPanel = new GUI.StackPanel();
        UiPanel.width = "220px";
        UiPanel.fontSize = "14px";
        // 横向靠右
        UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        // 水平居中
        UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(UiPanel);

        const ws = new WeakMap()
        
        var params = [
            {name: "Idle", anim: idleAnim},
            {name: "Walk", anim: walkAnim},
            {name: "Run", anim: runAnim}
        ]
        params.forEach((param)=>{
            // 文字块
            var header = new GUI.TextBlock();
            header.text = param.name + ":" + param.anim.weight.toFixed(2);
            header.height = "40px";
            header.color = "green";
            header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            header.paddingTop = "10px";
            UiPanel.addControl(header); 
            // 滑动条
            var slider = new GUI.Slider();
            slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            slider.minimum = 0;
            slider.maximum = 1;
            slider.color = "green";
            slider.value = param.anim.weight;
            slider.height = "20px";
            slider.width = "205px";
            UiPanel.addControl(slider); 
            // 滑动条事件
            slider.onValueChangedObservable.add((v)=>{
                // 动画权重
                param.anim.weight = v;
                 // 名称+值
                header.text = param.name + ":" + param.anim.weight.toFixed(2);
            }) 
            ws.set(param.anim,slider);
            // param.anim._slider = slider;
        });

        var button = GUI.Button.CreateSimpleButton("but0", "From idle to walk");
        button.paddingTop = "10px";
        button.width = "100px";
        button.height = "50px";
        button.color = "white";
        button.background = "green";
        // 按钮点击事件
        button.onPointerDownObservable.add(function() {
            ws.get(idleAnim).value = 1.0;
            ws.get(walkAnim).value = 0.0;
            ws.get(runAnim).value = 1.0;


            // idleAnim._slider.value = 1.0;
            // walkAnim._slider.value = 0;
			// runAnim._slider.value = 0.0;
			
            // 同步动画
			walkAnim.syncWith(null);     // 停止同步
			idleAnim.syncWith(walkAnim); // idleAnim 与 walkAnim 动画使用权重，需要同步一下，保证一样长的帧
            // 逐帧，根据权重切换动画
            let obs = scene.onBeforeAnimationsObservable.add(function() {
                // idleAnim._slider.value -= 0.01;

                ws.get(idleAnim).value -= 0.01;

                if ( ws.get(idleAnim).value <= 0) {
                    //  当前权重为 0 的使用移除逐帧调用
                    scene.onBeforeAnimationsObservable.remove(obs);
                    // idleAnim._slider.value = 0;
                    ws.get(idleAnim).value = 0;
                    // walkAnim._slider.value = 1.0;
                    ws.get(walkAnim).value = 1.0;
                } else {
                    // walkAnim._slider.value = 1.0 - idleAnim._slider.value;
                    ws.get(walkAnim).value = 1.0 - ws.get(idleAnim).value;
                }
            })
        });
        UiPanel.addControl(button);   	

        button = GUI.Button.CreateSimpleButton("but0", "From walk to run");
        button.paddingTop = "10px";
        button.width = "100px";
        button.height = "50px";
        button.color = "white";
        button.background = "green";
        button.onPointerDownObservable.add(function() {
            // walkAnim._slider.value = 1.0;
            // idleAnim._slider.value = 0;
			// runAnim._slider.value = 0.0;

            ws.get(idleAnim).value = 0.0;
            ws.get(walkAnim).value = 1.0;
            ws.get(runAnim).value = 0.0;



			// 同步动画,
			walkAnim.syncWith(runAnim);			
            let obs = scene.onBeforeAnimationsObservable.add(function() {
                // walkAnim._slider.value -= 0.01;
                ws.get(walkAnim).value-= 0.01;

                // if (walkAnim._slider.value <= 0) {
                if( ws.get(walkAnim).value  <=0) {
                    scene.onBeforeAnimationsObservable.remove(obs);
                    // walkAnim._slider.value = 0;
                    ws.get(walkAnim).value  = 0;
                    // runAnim._slider.value = 1.0;
                    ws.get(runAnim).value = 1.0;
                } else {
                    // runAnim._slider.value = 1.0 - walkAnim._slider.value;
                    ws.get(runAnim).value  = 1.0 -  ws.get(walkAnim).value
                }
            })
        });
        UiPanel.addControl(button); 

        // 移除加载 loading
        engine.hideLoadingUI();
    });	
	
    return scene;
};