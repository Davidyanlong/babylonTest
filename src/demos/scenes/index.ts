import { DemoInstance } from "../../base/register";

import { buildAScene } from './build_a_world' 
import { cameraAdjustScene } from './camera_adjust'
import { skyboxScene } from './skybox_scene'
import { loadScene } from './load_scene'
import { interactingScene } from './interacting'
import { interacting2Scene } from './interacting2'
import { interacting3Scene } from './interacting3'
import { selectScene } from './select'
import { multiViewsScene } from './multi_views'
import { loadingUIScene } from './loading_ui'
import { loadingRateMultipleAssetsScene } from './loading_rate'
import { performancePriorityScene } from './performance_priority'
import { instrumentationScene } from './instrumentation'
import { reducingMemoryScene } from './reducing_memory'
import { toPNGScene } from './to_png'
import { makeVideoScene } from './make_video'
import { clippingPlanesScene } from './clipping_planes'

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


// 跳过部分:

// The Scene Optimizer  https://doc.babylonjs.com/features/featuresDeepDive/scene/sceneOptimizer/
// Optimizing With Octrees https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeOctrees/
// Optimizing Using Cached Resources https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeCached/
// Floating Origin  https://doc.babylonjs.com/features/featuresDeepDive/scene/floating_origin/
// Offscreen Canvas https://doc.babylonjs.com/features/featuresDeepDive/scene/offscreenCanvas/
// In-Depth layerMask  https://doc.babylonjs.com/features/featuresDeepDive/scene/layermask/
