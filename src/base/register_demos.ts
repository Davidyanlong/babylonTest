import { DemoInstance } from "./register";



// 相关的demo
import '../demos/introduction/'
import '../demos/animations/'
import '../demos/behaviors/'
import '../demos/cameras/'
import '../demos/scenes/'
import '../demos/materials/'
import '../demos/shaders/'
import '../demos/lights/'
import '../demos/meshes/'
import '../demos/events/'
import '../demos/inputs/'
import '../demos/importAssets/'






export const currDemo = 'anyfilesimport';
export const isWebGPU = DemoInstance.isWebGPU(currDemo);