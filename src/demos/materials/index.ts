import { DemoInstance } from "../../base/register";

import { reactionToLightColorScene } from './reaction_to_light_color'
import { ambientColorScene } from './ambient_color'
import { transparencyScene } from './transparency'
import { textureDiffuseEmissiveAmbientScene } from './texture_diffuse_emissive_ambient'
import { transparentTextureScene } from './transparent_texture'
import { hasAlphaTextureScene } from './has_alpha_texture'
import { wireFrameScene } from './wireframe'
import { blendWireFrameScene } from './blend_wireframe'
import { bumpTextureScene } from './bump_texture'
import { opacityTextureScene } from './opacity_texture'
import { tilingScene } from './texture_scale_offset'
import { detailMapScene } from './detailmap'
import { parallaxMappingScene } from './parallax_mapping'
import { normalMapScene } from './normalmap'
import { blendModeScene } from './blend_mode'
import { meshFacesScene } from './mesh_faces'
import { meshFace2sScene } from './mesh_faces2'
import { frontAndBackDiffTextureScene } from './front_back_texture'
import{ multiMaterialScene } from './multi-materials'
import { multiMaterialMergeMeshScene } from './multi-material_merge_mesh'
import { dynamicTextureScene } from './dynamic_texture'
import { videoTextureScene } from './video_texture'
import { reflectionAndRefractionScene } from './reflection_refraction'
import { fresnelScene } from './fresnel'
import { pbrScene } from './pbr'
import { pbrSpecularReflectionScene } from './pbr_specular_reflection'
import { noiseTextureScene } from './noise_texture'
import { materialPluginsScene } from './material_plugins'



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