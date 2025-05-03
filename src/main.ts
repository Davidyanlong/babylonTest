import { app } from './base/app'
import  './base/register_demos'
import { DemoInstance } from "./base/register";
import { currDemo } from './base/register_demos';


// 构建场景

app.then(_app=>{
  // Hello World 场景构建
  // const _scene = helloWorldScene(_app.getEngine(), _app.getCanvasDom());
  // const demoName  = 'village'
  const demoName = currDemo
  const testSence = DemoInstance.find(demoName);

  console.assert(!!testSence, `${demoName}不存在`);
  
  const _scene = testSence!(_app.getEngine(), _app.getCanvasDom())


  _app.addScene(_scene);
  _app.startRenderLoop();
})

//  学习进度
// https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToVideo/


// 跳过部分:

// The Scene Optimizer  https://doc.babylonjs.com/features/featuresDeepDive/scene/sceneOptimizer/
// Optimizing With Octrees https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeOctrees/
// Optimizing Using Cached Resources https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeCached/
// Floating Origin  https://doc.babylonjs.com/features/featuresDeepDive/scene/floating_origin/
// Offscreen Canvas https://doc.babylonjs.com/features/featuresDeepDive/scene/offscreenCanvas/
// In-Depth layerMask  https://doc.babylonjs.com/features/featuresDeepDive/scene/layermask/