import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const easingFunctionDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);



    // 绿色的材质
    var materialBox = new BABYLON.StandardMaterial("texture1", scene);
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green


    // Torus
    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter:8,thickness:2,tessellation:32, updatable:false}, scene);
    let mat = materialBox.clone('torus_mat');
    mat.diffuseColor = BABYLON.Color3.Red();
    torus.material = mat;
    torus.position.x = 25;
    torus.position.z = 30;



    // -----------------------------------------
    // Creation of an easing animation within predefined easing functions
    // ------------------------------------------

    // 创建每秒30帧的动画，位置的变化
    var animationTorus = new BABYLON.Animation("torusEasingAnimation", "position", 
        30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    // 得到一个新的位置
    var nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, 0));

    // 关键帧
    var keysTorus = [];
    // 初始的位置
    keysTorus.push({ frame: 0, value: torus.position });
    // 目标位置
    keysTorus.push({ frame: 120, value: nextPos });
    // 设置关键帧
    animationTorus.setKeys(keysTorus);

    // Adding an easing function
    // You can use :
    //1.	CircleEase()
    //2.	BackEase(amplitude)
    //3.	BounceEase(bounces, bounciness)
    //4.	CubicEase()
    //5.	ElasticEase(oscillations, springiness)
    //6.	ExponentialEase(exponent)
    //7.	PowerEase(power)
    //8.	QuadraticEase()
    //9.	QuarticEase()
    //10.	QuinticEase()
    //11.	SineEase()
    // And if you want a total control, you can use a Bezier Curve animation
    //12.   BezierCurveEase(x1, y1, x2, y2)

    // 创建一个Easing 函数
    var easingFunction = new BABYLON.CircleEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    // 设置动画模式 easeIn  easeOut easeInOut
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // 设置动画模式函数
    animationTorus.setEasingFunction(easingFunction);

    // 绑定动画
    torus.animations.push(animationTorus);

    // 播放动画
    scene.beginAnimation(torus, 0, 120, true);

    // ------------------------------------------
    // Using Bezier curve to create a custom easing function
    // See here to see some samples and values : http://cubic-bezier.com/
    // -----------------------------------------

    // 创建 torus 
    var bezierTorus = BABYLON.MeshBuilder.CreateTorus("bezierTorus", {diameter:8,thickness:2,tessellation:32, updatable:false}, scene);
    bezierTorus.position.x = 25;
    bezierTorus.position.z = 0;
    let bezierTorus_mat = materialBox.clone('bezierTorus_mat');
    bezierTorus_mat.diffuseColor = BABYLON.Color3.Blue();
    bezierTorus.material = bezierTorus_mat;


    // 创建位置动画
    var animationBezierTorus = new BABYLON.Animation("animationBezierTorus", "position", 
    30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // 定义关键帧
    var keysBezierTorus = [];
    // 开始位置
    keysBezierTorus.push({ frame: 0, value: bezierTorus.position });
    // 目标位置
    keysBezierTorus.push({ frame: 120, value: bezierTorus.position.add(new BABYLON.Vector3(-80, 0, 0)) });
    // 设置关键帧
    animationBezierTorus.setKeys(keysBezierTorus);
    // 创建一个Easing 函数
    var bezierEase = new BABYLON.BezierCurveEase(0.32, -0.73, 0.69, 1.59);
    // 设置easing 函数
    animationBezierTorus.setEasingFunction(bezierEase);
    // 绑定动画
    bezierTorus.animations.push(animationBezierTorus);
    // 开启动画
    scene.beginAnimation(bezierTorus, 0, 120, true);

    // ------------------------------------------
    // Create a simple animation without easing functions
    // ------------------------------------------

    var torus0 = BABYLON.MeshBuilder.CreateTorus("torus0", {diameter:8,thickness:2,tessellation:32, updatable:false}, scene);
    torus0.position.x = 25;
    torus0.position.z = -30;
    torus0.material = materialBox;

    // 创建并开始动画
    BABYLON.Animation.CreateAndStartAnimation("anim", 
        torus0, 
        "position", 
        30, 
        120,
        torus0.position, 
        torus0.position.add(new BABYLON.Vector3(-80, 0, 0)));

    return scene;
}
