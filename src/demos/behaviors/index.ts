import { DemoInstance } from "../../base/register";

import { bouncingBehaviorDemo } from './bouncing'
import { autoRotationBehaviorDemo } from './auto-rotation'
import { framingBehaviorDemo } from './framing'
import { pointerDragBehaviorDemo } from './pointer_drag'
import { sixDofDragBehaviorDemo } from "./six_dof_drag"
import { followBehaviorDemo } from './follwe_camera'
import {surfaceMagnetismBehaviorDemo } from './surface_magnetism'


DemoInstance.add('bouncingbehavior', bouncingBehaviorDemo);
DemoInstance.add('autorotationbehavior', autoRotationBehaviorDemo);
DemoInstance.add('framingbehavior', framingBehaviorDemo)
DemoInstance.add('pointerdragbehavior', pointerDragBehaviorDemo);
DemoInstance.add('sixdofdragbehavior', sixDofDragBehaviorDemo);
DemoInstance.add('followbehavior', followBehaviorDemo);
DemoInstance.add('surfacemagnetismbehavior', surfaceMagnetismBehaviorDemo)