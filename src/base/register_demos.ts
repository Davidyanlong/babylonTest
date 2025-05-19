import { DemoInstance } from "./register";

// 案例
import { helloWorldScene } from "../demos/hello_world";
import { loadModelDemo } from '../demos/load_babylon'
import { villageDemo } from '../demos/village'
import { parentSubmeshDemo } from '../demos/parent_submesh'
import { extrudePolygonDemo } from '../demos/extrudePolygon'
import { carDemo } from '../demos/car'
import { skeletonsDemo } from '../demos/skeletons'
import { moveToPathDemo } from '../demos/move_to_path'
import { villageDetectionDemo } from '../demos/village_detection'
import { heightMapDemo } from '../demos/heightmap'
import { latheDemo } from '../demos/lathe'
import { particleSystemDemo } from '../demos/particle'
import { streetLightDemo } from '../demos/street_light'
import { shawdowDemo } from '../demos/shadow'


// 相关的demo
import '../demos/animations/'
import '../demos/behaviors/'
import '../demos/cameras/'
import '../demos/scenes/'
import '../demos/materials/'
import '../demos/shaders/'
import '../demos/lights/'
import '../demos/meshes/'

import { deviceSourceManagerScene } from '../demos/inputs/DeviceSourceManager'









// 注册案例
DemoInstance.add('helloworld', helloWorldScene);
DemoInstance.add('loadmodel', loadModelDemo);
DemoInstance.add('village', villageDemo);
DemoInstance.add('parentsubmesh', parentSubmeshDemo);
DemoInstance.add('extrudePolygon',extrudePolygonDemo);
DemoInstance.add('car', carDemo);
DemoInstance.add('skeletons', skeletonsDemo);
DemoInstance.add('movetopath', moveToPathDemo);
DemoInstance.add('villagedetection', villageDetectionDemo);
DemoInstance.add('heightmap', heightMapDemo);
DemoInstance.add('lathe', latheDemo);
DemoInstance.add('particlesystem', particleSystemDemo);
DemoInstance.add('streetLight', streetLightDemo);
DemoInstance.add('shawdow', shawdowDemo);


DemoInstance.add('devicesourcemanager', deviceSourceManagerScene)












export const currDemo = 'devicesourcemanager';
export const isWebGPU = DemoInstance.isWebGPU(currDemo);