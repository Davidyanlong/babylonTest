import { DemoInstance } from "../../base/register";

import {setShapesScene} from './set_shapes'
import { parametricMeshScene } from './parametirc_shapes'
import { polyhedraSharpScene } from './polyhedra_shapes'
import { customMeshesScene } from './custom_meshes'
import { transformMeshScene } from './transform'
import { latticeScene } from "./lattice";
import { cloneCopyInstanceScene } from './clone_copy_instance'
import { intersectsMeshScene } from './intersects'
import { drawBoundboxScene } from './bounding_box_draw' 
import { billboardScene } from './billboard'
import { decalsScene } from './decals'
import { highLightingScene } from './highlighting'
import { mergeMeshScene } from './merge'
import { drawCurvesScene } from './curves'
import { path3dScene } from './path3d'
import { facetDataScene } from './facet_data'
import { lodMeshScene } from './lod'
import { morthMeshScene } from './morph'
import { boneSkeletonsMeshScene } from './bone_skeletons'
import { boundingboxComputeShaderScene } from './bounding_webgpu'
import { occlusionQueriesScene } from './occlusion_queries'


DemoInstance.add('setShapes', setShapesScene);
DemoInstance.add('parametricshapes', parametricMeshScene);
DemoInstance.add('polyhedrasharp', polyhedraSharpScene);
DemoInstance.add('custommeshes', customMeshesScene);
DemoInstance.add('transformmesh', transformMeshScene);
DemoInstance.add('lattice', latticeScene);
DemoInstance.add('clonecopyinstance', cloneCopyInstanceScene);
DemoInstance.add('intersectsmesh', intersectsMeshScene);
DemoInstance.add('drawboundbox', drawBoundboxScene);
DemoInstance.add('billboard', billboardScene);
DemoInstance.add('decals', decalsScene)
DemoInstance.add('highlighting', highLightingScene);
DemoInstance.add('mergemesh', mergeMeshScene);
DemoInstance.add('drawcurves', drawCurvesScene);
DemoInstance.add('path3d', path3dScene)
DemoInstance.add('facetdata', facetDataScene)
DemoInstance.add('lodmesh', lodMeshScene)
DemoInstance.add('morthmesh', morthMeshScene)
DemoInstance.add('boneskeletonsmesh', boneSkeletonsMeshScene);
DemoInstance.add('boundingboxcomputeshader', boundingboxComputeShaderScene, true)
DemoInstance.add('occlusionqueries', occlusionQueriesScene)
