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

//动画相关的demo
import '../demos/animations/index'
import '../demos/behaviors/index'
import '../demos/cameras/index'

import { buildAScene } from '../demos/scenes/build_a_world' 
import { cameraAdjustScene } from '../demos/scenes/camera_adjust'
import { skyboxScene } from '../demos/scenes/skybox_scene'
import { loadScene } from '../demos/scenes/load_scene'
import { interactingScene } from '../demos/scenes/interacting'
import { interacting2Scene } from '../demos/scenes/interacting2'
import { interacting3Scene } from '../demos/scenes/interacting3'
import { selectScene } from '../demos/scenes/select'
import { multiViewsScene } from '../demos/scenes/multi_views'
import { loadingUIScene } from '../demos/scenes/loading_ui'
import { loadingRateMultipleAssetsScene } from '../demos/scenes/loading_rate'
import { performancePriorityScene } from '../demos/scenes/performance_priority'
import { instrumentationScene } from '../demos/scenes/instrumentation'
import { reducingMemoryScene } from '../demos/scenes/reducing_memory'
import { toPNGScene } from '../demos/scenes/to_png'
import { makeVideoScene } from '../demos/scenes/make_video'
import { clippingPlanesScene } from '../demos/scenes/clipping_planes'









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

DemoInstance.add('buildascene', buildAScene);
DemoInstance.add('cameraadjustscene', cameraAdjustScene)
DemoInstance.add('skyboxscene', skyboxScene);
DemoInstance.add('loadscene', loadScene);
DemoInstance.add('interactingScene', interactingScene);
DemoInstance.add('interactingScene2', interacting2Scene);
DemoInstance.add('interacting3Scene', interacting3Scene);
DemoInstance.add('selectScene', selectScene);
DemoInstance.add('multiViewsScene', multiViewsScene);
DemoInstance.add('loadingUIScene', loadingUIScene);
DemoInstance.add('loadingratemultipleassetsscene', loadingRateMultipleAssetsScene)
DemoInstance.add('performancepriorityscene', performancePriorityScene)
DemoInstance.add('instrumentationscene', instrumentationScene)
DemoInstance.add('reducingmemoryscene', reducingMemoryScene)
DemoInstance.add('topngscene', toPNGScene);
DemoInstance.add('makeVideoScene', makeVideoScene);
DemoInstance.add('clippingPlanesScene', clippingPlanesScene);






export const currDemo = 'clippingPlanesScene';