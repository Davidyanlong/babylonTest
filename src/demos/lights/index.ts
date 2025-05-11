
import { DemoInstance } from "../../base/register";

import { lightColorPropertiesScene } from './color'
import { shadowLightScene } from './shadows'
import { cascadedShadowLightScene } from './cascaded_shadow'
import { volumetricLightScatteringScene } from './volumetric_scatter'

DemoInstance.add('lightcolorproperties', lightColorPropertiesScene)
DemoInstance.add('shadowlight', shadowLightScene)
DemoInstance.add('cascadedshadowlight', cascadedShadowLightScene)
DemoInstance.add('volumetriclightscattering', volumetricLightScatteringScene)