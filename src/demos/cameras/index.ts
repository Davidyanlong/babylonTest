import { DemoInstance } from "../../base/register";

import { universalCameraDemo } from './universal_camera'
import { arcRotateCameraDemo } from './arc_rotate_camera'
import { arcRotateCameraDemo2 } from './arc_rotate_camera2'
import { arcRotateCameraDemo3 } from './arc_rotate_camera3'
import { followCameraDemo } from './follow_camera'
import { collisionCameraDemo } from  './collision_base'
import { collisionMeshDemo } from './collision_mesh'
import { customInputCamera1Demo } from './customizing_inputs1'
import { walkLookAroundCameraDemo } from './walk_look_around_camera'
import { freeCameraPointersInputDemo } from './free_camera_pointers_input'
import { viewportDemo } from './viewport'
import { gunSightDemo } from './gun_sight'
import { pictureInPictuceVistualCameraDemo } from './picture_in_picture'





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
