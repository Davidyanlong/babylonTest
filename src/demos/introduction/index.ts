import { DemoInstance } from "../../base/register";

import { helloWorldScene } from "./hello_world";
import { loadModelDemo } from './load_babylon'
import { villageDemo } from './village'
import { parentSubmeshDemo } from './parent_submesh'
import { extrudePolygonDemo } from './extrudePolygon'
import { carDemo } from './car'
import { skeletonsDemo } from './skeletons'
import { moveToPathDemo } from './move_to_path'
import { villageDetectionDemo } from './village_detection'
import { heightMapDemo } from './heightmap'
import { latheDemo } from './lathe'
import { particleSystemDemo } from './particle'
import { streetLightDemo } from './street_light'
import { shawdowDemo } from './shadow'



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