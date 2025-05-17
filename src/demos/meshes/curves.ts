import { BABYLON, earcut, GUI } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 模型合并
export const drawCurvesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
   var scene = new BABYLON.Scene(engine);  

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);
    // demo5(scene, canvas);
    demo6(scene, canvas);

   return scene;  
}
// 使用 ArcThru3Points 计算经过三个点的弧线 getPoints 获取弧线上的点
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    // 创建相机
     const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // 创建灯光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 定义三个点
    const f = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const s = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const t = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    
    // 计算一段弧线 BABYLON.Curve3
    // 经过三个点的弧线
    const arc = BABYLON.Curve3.ArcThru3Points(f, s, t);
    // 绘制线条
    const arcLine = BABYLON.MeshBuilder.CreateLines("arc", {points: arc.getPoints()})

    // 创建一个球，放在第一个点，
    const sphereF = BABYLON.MeshBuilder.CreateSphere("F", {});
    const sphereS = BABYLON.MeshBuilder.CreateSphere("S", {});
    const sphereT = BABYLON.MeshBuilder.CreateSphere("T", {});
    
    // 第一个蓝色球
    sphereF.position = f;
    const matF = sphereF.material = new BABYLON.StandardMaterial("F");
    matF.diffuseColor = BABYLON.Color3.Blue();
    // 第二个绿色球
    sphereS.position = s;
     const matS = sphereS.material = new BABYLON.StandardMaterial("S");
   matS.diffuseColor = BABYLON.Color3.Green();
     
    // 第三个红色球
    sphereT.position = t;
     const matT = sphereT.material = new BABYLON.StandardMaterial("T");
    matT.diffuseColor = BABYLON.Color3.Red();
}

// 使用 ArcThru3Points 计算经过三个点的弧线 getPoints 获取弧线上的点 封闭线条
const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    // 创建相机
     const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // 创建灯光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 定义三个点
    const f = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const s = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const t = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    
    // 计算一段弧线 BABYLON.Curve3
    // 经过三个点的弧线
    /**
     * Returns a Curve3 object along an arc through three vector3 points:
     * The three points should not be colinear. When they are the Curve3 is empty.
     * @param first (Vector3) the first point the arc must pass through.
     * @param second (Vector3) the second point the arc must pass through.
     * @param third (Vector3) the third point the arc must pass through.
     * @param steps (number) the larger the number of steps the more detailed the arc.
     * @param closed (boolean) optional with default false, when true forms the chord from the first and third point
     * @param fullCircle Circle (boolean) optional with default false, when true forms the complete circle through the three points
     * @returns the created Curve3
     */
     const arc = BABYLON.Curve3.ArcThru3Points(f, s, t, 32, true);
    // 绘制线条
    const arcLine = BABYLON.MeshBuilder.CreateLines("arc", {points: arc.getPoints()})

    // 创建一个球，放在第一个点，
    const sphereF = BABYLON.MeshBuilder.CreateSphere("F", {});
    const sphereS = BABYLON.MeshBuilder.CreateSphere("S", {});
    const sphereT = BABYLON.MeshBuilder.CreateSphere("T", {});
    
    // 第一个蓝色球
    sphereF.position = f;
    const matF = sphereF.material = new BABYLON.StandardMaterial("F");
    matF.diffuseColor = BABYLON.Color3.Blue();
    // 第二个绿色球
    sphereS.position = s;
     const matS = sphereS.material = new BABYLON.StandardMaterial("S");
   matS.diffuseColor = BABYLON.Color3.Green();
     
    // 第三个红色球
    sphereT.position = t;
     const matT = sphereT.material = new BABYLON.StandardMaterial("T");
    matT.diffuseColor = BABYLON.Color3.Red();
}


// 使用 ArcThru3Points 计算经过三个点的弧线 getPoints 获取弧线上的点 封闭线条圆形
const demo3 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    // 创建相机
     const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // 创建灯光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 定义三个点
    const f = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const s = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    const t = new BABYLON.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).scale(20);
    
    // 计算一段弧线 BABYLON.Curve3
    // 经过三个点的弧线
    /**
     * Returns a Curve3 object along an arc through three vector3 points:
     * The three points should not be colinear. When they are the Curve3 is empty.
     * @param first (Vector3) the first point the arc must pass through.
     * @param second (Vector3) the second point the arc must pass through.
     * @param third (Vector3) the third point the arc must pass through.
     * @param steps (number) the larger the number of steps the more detailed the arc.
     * @param closed (boolean) optional with default false, when true forms the chord from the first and third point
     * @param fullCircle Circle (boolean) optional with default false, when true forms the complete circle through the three points
     * @returns the created Curve3
     */
     const arc = BABYLON.Curve3.ArcThru3Points(f, s, t, 64, false, true);
    // 绘制线条
    const arcLine = BABYLON.MeshBuilder.CreateLines("arc", {points: arc.getPoints()})

    // 创建一个球，放在第一个点，
    const sphereF = BABYLON.MeshBuilder.CreateSphere("F", {});
    const sphereS = BABYLON.MeshBuilder.CreateSphere("S", {});
    const sphereT = BABYLON.MeshBuilder.CreateSphere("T", {});
    
    // 第一个蓝色球
    sphereF.position = f;
    const matF = sphereF.material = new BABYLON.StandardMaterial("F");
    matF.diffuseColor = BABYLON.Color3.Blue();
    // 第二个绿色球
    sphereS.position = s;
     const matS = sphereS.material = new BABYLON.StandardMaterial("S");
   matS.diffuseColor = BABYLON.Color3.Green();
     
    // 第三个红色球
    sphereT.position = t;
     const matT = sphereT.material = new BABYLON.StandardMaterial("T");
    matT.diffuseColor = BABYLON.Color3.Red();
}

//  创建贝塞尔曲线
const demo4 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {

    // 清屏色
    scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(-10, -10, -100));
    camera.attachControl(canvas, true);


    // CURVE3 : Bezier Quadratic Curve

    // 创建贝塞尔曲线
    /**
     * Returns a Curve3 object along a Quadratic Bezier curve : https://doc.babylonjs.com/features/featuresDeepDive/mesh/drawCurves#quadratic-bezier-curve
     * @param v0 (Vector3) the origin point of the Quadratic Bezier
     * @param v1 (Vector3) the control point
     * @param v2 (Vector3) the end point of the Quadratic Bezier
     * @param nbPoints (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    var quadraticBezierVectors = BABYLON.Curve3.CreateQuadraticBezier(
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(50, 30, 10),
        new BABYLON.Vector3(20, 50, 0),
        25);
    var quadraticBezierCurve = BABYLON.MeshBuilder.CreateLines("qbezier", 
        {points:quadraticBezierVectors.getPoints()}, scene);
    // 线条颜色
    quadraticBezierCurve.color = new BABYLON.Color3(1, 1, 0.5);

  

    showAxis(30, scene);
}

// Hermite Spline 埃尔米特样条线
const demo5 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 清屏色
    scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1.0);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -150));
    camera.attachControl(canvas, true);

    // 创建艾尔米特样条曲线
      /**
     * Returns a Curve3 object along a Hermite Spline curve : https://doc.babylonjs.com/features/featuresDeepDive/mesh/drawCurves#hermite-spline
     * @param p1 (Vector3) the origin point of the Hermite Spline
     * @param t1 (Vector3) the tangent vector at the origin point
     * @param p2 (Vector3) the end point of the Hermite Spline
     * @param t2 (Vector3) the tangent vector at the end point
     * @param nSeg (integer) the number of curve segments or nSeg + 1 points in the array
     * @returns the created Curve3
     */
    var hermite = BABYLON.Curve3.CreateHermiteSpline(
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(-30, 30, -140),
        new BABYLON.Vector3(20, 10, 40),
        new BABYLON.Vector3(90, -30, -30),
        60);

    var HermiteSpline = BABYLON.MeshBuilder.CreateLines("hermite",  
        {points:hermite.getPoints()}, scene);



    showAxis(30, scene);
}

// Catmull-Rom Spline 
const demo6 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    // 清屏色
    scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1);

     // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -150));
    camera.attachControl(canvas, true);

    // 创建 Catmull-Rom 样条
      /**
     * Returns a Curve3 object along a CatmullRom Spline curve :
     * @param points (array of Vector3) the points the spline must pass through. At least, four points required
     * @param nbPoints (integer) the wanted number of points between each curve control points
     * @param closed (boolean) optional with default false, when true forms a closed loop from the points
     * @returns the created Curve3
     */
    var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
        [BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(10, 1, 5),
        new BABYLON.Vector3(20, 16, 20),
        new BABYLON.Vector3(25, -21, 15),
        new BABYLON.Vector3(35, 30, 0)
        ],
        60);

    var catmullRomSpline = BABYLON.MeshBuilder.CreateLines("catmullRom",  
        {points:catmullRom.getPoints()}, scene);
        
    showAxis(50,scene);
}
