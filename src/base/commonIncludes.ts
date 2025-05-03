import '../style.css'
export * as BABYLON from "@babylonjs/core"
import * as GUI from '@babylonjs/gui';
import "@babylonjs/loaders/glTF";
import earcut  from 'earcut';
import * as dat from 'dat.gui';
import CANNON from 'cannon'
import  Assets from '@babylonjs/assets'

// console.log(Assets)
export { earcut, GUI, dat , CANNON, Assets}