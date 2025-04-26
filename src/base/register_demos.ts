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
import { animationSildeDemo } from '../demos/animations/animation_slide'
import { squencingAnimationDemo } from '../demos/animations/sequencing'
import { groupAnimationDemo } from '../demos/animations/group'
import { combinAnimationDemo } from '../demos/animations/combining'
import { characterAnimationDemo } from '../demos/animations/character'
import { WASD_characterAnimationDemo } from '../demos/animations/character_wasd'
import { advanceAnmiationDemo } from '../demos/animations/advance'
import { controlAnimationDemo } from '../demos/animations/control'
import { advanceAdditiveAnmiationDemo } from '../demos/animations/advance_additive'
import { advanceAdditiveOffsetAnmiationDemo } from '../demos/animations/advance_additive_offset'
import { easingFunctionDemo } from '../demos/animations/easing_function'
import { logAnimationDemo } from '../demos/animations/log_animation'
import { onBeforeRenderObservableDemo } from '../demos/animations/onBeforeRenderObservable'
import { VATDemo } from '../demos/animations/vat'


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
DemoInstance.add('animationsilde', animationSildeDemo);
DemoInstance.add('squencingAnimation', squencingAnimationDemo);
DemoInstance.add('groupAnimation', groupAnimationDemo);
DemoInstance.add('combinAnimation', combinAnimationDemo);
DemoInstance.add('characterAnimation',characterAnimationDemo);
DemoInstance.add('wasdcharacterAnimation', WASD_characterAnimationDemo);
DemoInstance.add('advanceanmiation', advanceAnmiationDemo);
DemoInstance.add('controlanimation', controlAnimationDemo);
DemoInstance.add('advanceadditiveanmiation',advanceAdditiveAnmiationDemo);
DemoInstance.add('advanceadditiveOffsetanmiation', advanceAdditiveOffsetAnmiationDemo);
DemoInstance.add('easingfunction', easingFunctionDemo);
DemoInstance.add('loganimation', logAnimationDemo);
DemoInstance.add('onbeforerenderobservable', onBeforeRenderObservableDemo);
DemoInstance.add('vat', VATDemo);


export const currDemo = 'vat';