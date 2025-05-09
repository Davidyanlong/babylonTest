import { app } from './base/app'
import  './base/register_demos'
import { DemoInstance } from "./base/register";
import { currDemo, isWebGPU } from './base/register_demos';
import { BABYLON } from './base/commonIncludes';


// 构建场景

app.then(_app=>{
  // Hello World 场景构建
  // const _scene = helloWorldScene(_app.getEngine(), _app.getCanvasDom());
  // const demoName  = 'village'
  const demoName = currDemo
  const testSence = DemoInstance.find(demoName);

  console.assert(!!testSence, `${demoName}不存在`);
  
  let engine = _app.getEngine(isWebGPU);
  let promise:Promise<void>
  if(isWebGPU){
    promise = (engine as BABYLON.WebGPUEngine).initAsync();
  }else{
    promise = Promise.resolve(undefined)
  }

  promise.then(()=>{
    const _scene = testSence!(engine, _app.getCanvasDom())
    _app.addScene(_scene);
    _app.startRenderLoop();
  })

 
})

//  学习进度
// https://doc.babylonjs.com/features/featuresDeepDive/materials/using/masterPBR/


