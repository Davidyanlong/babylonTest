import { DemoInstance } from "../../base/register";

import { customShaderScene } from './custom_shaders'
import { computeShaderScene } from './compute_shader'
import { computeShaderBlurScene } from './compute_shader_blur'



DemoInstance.add('customshader', customShaderScene);
DemoInstance.add('computeshader', computeShaderScene, true);
DemoInstance.add('computeshaderblur', computeShaderBlurScene, true);