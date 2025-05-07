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
import '../demos/scenes/index'

import { reactionToLightColorScene } from '../demos/materials/reaction_to_light_color'
import { ambientColorScene } from '../demos/materials/ambient_color'
import { transparencyScene } from '../demos/materials/transparency'
import { textureDiffuseEmissiveAmbientScene } from '../demos/materials/texture_diffuse_emissive_ambient'
import { transparentTextureScene } from '../demos/materials/transparent_texture'
import { hasAlphaTextureScene } from '../demos/materials/has_alpha_texture'
import { wireFrameScene } from '../demos/materials/wireframe'
import { blendWireFrameScene } from '../demos/materials/blend_wireframe'
import { bumpTextureScene } from '../demos/materials/bump_texture'
import { opacityTextureScene } from '../demos/materials/opacity_texture'
import { tilingScene } from '../demos/materials/texture_scale_offset'
import { detailMapScene } from '../demos/materials/detailmap'
import { parallaxMappingScene } from '../demos/materials/parallax_mapping'
import { normalMapScene } from '../demos/materials/normalmap'
import { blendModeScene } from '../demos/materials/blend_mode'
import { meshFacesScene } from '../demos/materials/mesh_faces'
import { meshFace2sScene } from '../demos/materials/mesh_faces2'
import { frontAndBackDiffTextureScene } from '../demos/materials/front_back_texture'
import{ multiMaterialScene } from '../demos/materials/multi-materials'
import { multiMaterialMergeMeshScene } from '../demos/materials/multi-material_merge_mesh'
import { dynamicTextureScene } from '../demos/materials/dynamic_texture'
import { videoTextureScene } from '../demos/materials/video_texture'
import { reflectionAndRefractionScene } from '../demos/materials/reflection_refraction'
import { fresnelScene } from '../demos/materials/fresnel'
import { pbrScene } from '../demos/materials/pbr'
import { pbrSpecularReflectionScene } from '../demos/materials/pbr_specular_reflection'
import { noiseTextureScene } from '../demos/materials/noise_texture'
import { materialPluginsScene } from '../demos/materials/material_plugins'






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


DemoInstance.add('reactiontolightcolor', reactionToLightColorScene);
DemoInstance.add('ambientcolor', ambientColorScene);
DemoInstance.add('transparency', transparencyScene);
DemoInstance.add('texturediffuseemissiveambient', textureDiffuseEmissiveAmbientScene);
DemoInstance.add('transparenttexture', transparentTextureScene);
DemoInstance.add('hasalphatexture', hasAlphaTextureScene);
DemoInstance.add('wireframe', wireFrameScene);
DemoInstance.add('blendwireframe', blendWireFrameScene);
DemoInstance.add('bumptexture', bumpTextureScene);
DemoInstance.add('opacitytexture',opacityTextureScene);
DemoInstance.add('tiling', tilingScene);
DemoInstance.add('detailMap', detailMapScene);
DemoInstance.add('parallaxmapping', parallaxMappingScene);
DemoInstance.add('normalmap', normalMapScene);
DemoInstance.add('blendmode', blendModeScene);
DemoInstance.add('meshfaces', meshFacesScene);
DemoInstance.add('meshface2', meshFace2sScene);
DemoInstance.add('frontandbackdifftexture', frontAndBackDiffTextureScene)
DemoInstance.add('multimaterial', multiMaterialScene);
DemoInstance.add('multimaterialmergemesh', multiMaterialMergeMeshScene)
DemoInstance.add('dynamictexture', dynamicTextureScene)
DemoInstance.add('videotexture', videoTextureScene)
DemoInstance.add('reflectionandrefraction', reflectionAndRefractionScene)
DemoInstance.add('fresnel', fresnelScene);
DemoInstance.add('pbr', pbrScene);
DemoInstance.add('pbrspecularreflection', pbrSpecularReflectionScene);
DemoInstance.add('noiseTexture', noiseTextureScene)
DemoInstance.add('materialplugins', materialPluginsScene)





export const currDemo = 'materialplugins';