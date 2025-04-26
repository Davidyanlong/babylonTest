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
// https://doc.babylonjs.com/features/featuresDeepDive/behaviors/
