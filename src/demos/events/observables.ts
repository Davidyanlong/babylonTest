import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const observableScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    demo2(scene, canvas);


    return scene;

};
// Observable 的基本使用方法
const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 创建一个主角 球体
    var master = BABYLON.MeshBuilder.CreateSphere("master", {}, scene);
    const onXChangeWS = new WeakMap<BABYLON.Mesh, BABYLON.Observable<unknown>> ()
    const startPositionWS = new WeakMap<BABYLON.Mesh, BABYLON.Vector3>()

    /**
     * add(): to add an Observer
     * addOnce(): to add an Observer which will be executed once and then removed
     * remove(): to remove a previously registered Observer
     * removeCallback(): same as above but giving the callback instead of the Observer instance
     * notifyObservers(): used to notify all the registered Observers
     * notifyObserversWithPromise(): calling this will execute each callback, expecting it to be a promise or return a value. If at any point in the chain one function fails, the promise will fail and the execution will not continue.
     * hasObservers: a property that returns true if at least one Observer is registered
     * hasSpecificMask(mask): a function that returns true if at least one Observer is registered with this mask
     * clear() to remove all Observers
     * clone() to simply clone the object but not the registered Observers.
     */



    // 创建  BABYLON.Observable 自定义订阅发布
    onXChangeWS.set(master, new BABYLON.Observable())
    // master.onXChange = new BABYLON.Observable();
    
    const setX = function(value:number) {
        // 如果输入的值与Master的位置相等， 就返回输入值本身
        if(value === master.position.x) {
            return value;
        }
        // 更改master的位置 x 
        master.position.x = value;
        // 发布x的位置信息  BABYLON.Observable 发布
        onXChangeWS.get(master)!.notifyObservers(master.position.x);
    }

    // 创建跟随的小球
    var minion0 = BABYLON.MeshBuilder.CreateSphere("minion0", {diameter: 0.5}, scene);
    startPositionWS.set(minion0, new BABYLON.Vector3(2.5 - 5 * Math.random(), 2.5 - 5 * Math.random(), 5 + 5 * Math.random()));
    minion0.position = startPositionWS.get(minion0)!;
    // 接受数据
    onXChangeWS.get(master)!.add(function(value:any) {       
        minion0.position.x = startPositionWS.get(minion0)!.x + value / 200;
    })

    var minion1 = BABYLON.MeshBuilder.CreateSphere("minion1", {diameter: 0.5}, scene);
    startPositionWS.set(minion1, new BABYLON.Vector3(2.5 - 5 * Math.random(), 2.5 - 5 * Math.random(), 5 + 5 * Math.random()));
    minion1.position = startPositionWS.get(minion1)!;
    
    // 接受数据
    onXChangeWS.get(master)!.add(function(value:any) {       
        minion1.position.x = startPositionWS.get(minion1)!.x+ value / 150;
    })

    var angle = 0;
    scene.registerBeforeRender(function(){
        // 改变Master 的位置
        setX(5 * Math.sin(angle));
        angle += 0.01;
    })
}

// 引擎内置的一些Obserable
const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

	// Let's add an observer to the scene.beforeRender event:

    /**
     * ​​1. 动画更新阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeAnimationsObservable	所有动画更新前触发	修改动画参数、动态调整动画速度
     * scene.onAfterAnimationsObservable	所有动画更新后触发	动画后处理（如基于动画结果的逻辑计算）
     * 
     * ​​2. 物理模拟阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforePhysicsObservable	物理引擎模拟前触发	修改物理参数、预处理碰撞检测
     * scene.onAfterPhysicsObservable	物理引擎模拟后触发	基于物理结果的逻辑处理
     * ​​
     * 3. 渲染核心阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeActiveMeshesEvaluationObservable	场景主动画（Mesh）更新前触发	修改 Mesh 属性（如位置、旋转）
     * scene.onAfterActiveMeshesEvaluationObservable	场景主动画更新后触发	主动画后的逻辑处理
     * ​​
     * 4. 粒子系统阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeParticlesRenderingObservable	粒子系统渲染前触发	修改粒子属性（如颜色、大小）
     * scene.onAfterParticlesRenderingObservable	粒子系统渲染后触发	粒子效果后处理
     * ​​
     * 5. 相机渲染阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeCameraRenderObservable	相机渲染前触发	修改相机参数（如视野、投影矩阵）
     * scene.onAfterCameraRenderObservable	相机渲染后触发	相机后处理（如调整渲染目标）
     * 
     * ​​6. 渲染目标阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeRenderTargetsRenderObservable	渲染目标（如后期处理纹理）绘制前触发	修改渲染目标属性
     * scene.onAfterRenderTargetsRenderObservable	渲染目标绘制后触发	渲染目标后处理
     * ​​
     * 7. 绘制阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeDrawPhaseObservable	几何体绘制前触发	修改渲染状态（如开启/关闭深度测试）
     * scene.onAfterDrawPhaseObservable	几何体绘制后触发	绘制后状态清理
     * 
     * ​​8. 最终渲染阶段​​
     * Observable 事件	触发时机	作用
     * scene.onBeforeRenderObservable	整个场景渲染前触发	全局预处理（如动态 HDR 曝光调整）
     * scene.onAfterRenderObservable	整个场景渲染完成后触发	最终输出处理（如截图、帧率统计）
     * ​​
     * 执行顺序示意图​​
     * onBeforeAnimationsObservable
     *   → onAfterAnimationsObservable
     *   → onBeforePhysicsObservable
     *   → onAfterPhysicsObservable
     *   → onBeforeActiveMeshesEvaluationObservable
     *   → onAfterActiveMeshesEvaluationObservable
     *   → onBeforeParticlesRenderingObservable
     *   → onAfterParticlesRenderingObservable
     *   → onBeforeCameraRenderObservable
     *   → onBeforeRenderTargetsRenderObservable
     *   → onAfterRenderTargetsRenderObservable
     *   → onBeforeDrawPhaseObservable
     *   → onAfterDrawPhaseObservable
     *   → onBeforeRenderObservable
     *   → onAfterCameraRenderObservable
     *   → onAfterRenderObservable
     */



	
	var alpha = 0;
    // 引擎内部的Observable
	scene.onBeforeRenderObservable.add(function () {
        // 渲染前触发 缩放Y值
		sphere.scaling.y = Math.cos(alpha);
		
		alpha += 0.01;
	});

}