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

import { universalCameraDemo } from '../demos/cameras/universal_camera'
import { arcRotateCameraDemo } from '../demos/cameras/arc_rotate_camera'
import { arcRotateCameraDemo2 } from '../demos/cameras/arc_rotate_camera2'
import { arcRotateCameraDemo3 } from '../demos/cameras/arc_rotate_camera3'
import { followCameraDemo } from '../demos/cameras/follow_camera'
import { collisionCameraDemo } from  '../demos/cameras/collision_base'
import { collisionMeshDemo } from '../demos/cameras/collision_mesh'
import { customInputCamera1Demo } from '../demos/cameras/customizing_inputs1'
import { walkLookAroundCameraDemo } from '../demos/cameras/walk_look_around_camera'
import { freeCameraPointersInputDemo } from '../demos/cameras/free_camera_pointers_input'
import { viewportDemo } from '../demos/cameras/viewport'
import { gunSightDemo } from '../demos/cameras/gun_sight'
import { pictureInPictuceVistualCameraDemo } from '../demos/cameras/picture_in_picture'





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


DemoInstance.add('scrollwheelcamera',universalCameraDemo)
DemoInstance.add('arcrotatecamera',arcRotateCameraDemo);
DemoInstance.add('arcrotatecamera2', arcRotateCameraDemo2);
DemoInstance.add('arcrotatecamera3', arcRotateCameraDemo3);
DemoInstance.add('followcamera',followCameraDemo);
DemoInstance.add('collisioncamera', collisionCameraDemo);
DemoInstance.add('collisionmesh', collisionMeshDemo);
DemoInstance.add('custominputcamera1', customInputCamera1Demo);
DemoInstance.add('walklookaroundcamera', walkLookAroundCameraDemo)
DemoInstance.add('freecamerapointersinput', freeCameraPointersInputDemo);
DemoInstance.add('viewport', viewportDemo);
DemoInstance.add('gunsight', gunSightDemo);
DemoInstance.add('pictureinpictucevistualcamera', pictureInPictuceVistualCameraDemo);



export const currDemo = 'pictureinpictucevistualcamera';