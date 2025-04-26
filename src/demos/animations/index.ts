import { DemoInstance } from "../../base/register";

import { animationSildeDemo } from './animation_slide'
import { squencingAnimationDemo } from './sequencing'
import { groupAnimationDemo } from './group'
import { combinAnimationDemo } from './combining'
import { characterAnimationDemo } from './character'
import { WASD_characterAnimationDemo } from './character_wasd'
import { advanceAnmiationDemo } from './advance'
import { controlAnimationDemo } from './control'
import { advanceAdditiveAnmiationDemo } from './advance_additive'
import { advanceAdditiveOffsetAnmiationDemo } from './advance_additive_offset'
import { easingFunctionDemo } from './easing_function'
import { logAnimationDemo } from './log_animation'
import { onBeforeRenderObservableDemo } from './onBeforeRenderObservable'
import { VATDemo } from './vat'




DemoInstance.add('animationsilde', animationSildeDemo);
DemoInstance.add('squencingAnimation', squencingAnimationDemo);
DemoInstance.add('groupAnimation', groupAnimationDemo);
DemoInstance.add('combinAnimation', combinAnimationDemo);
DemoInstance.add('characterAnimation',characterAnimationDemo);
DemoInstance.add('wasdcharacterAnimation', WASD_characterAnimationDemo);
DemoInstance.add('advanceanmiation', advanceAnmiationDemo);
DemoInstance.add('controlanimation', controlAnimationDemo);
DemoInstance.add('advanceadditiveanmiation',advanceAdditiveAnmiationDemo);
DemoInstance.add('advanceadditiveOffsetanmiation', advanceAdditiveOffsetAnmiationDemo);
DemoInstance.add('easingfunction', easingFunctionDemo);
DemoInstance.add('loganimation', logAnimationDemo);
DemoInstance.add('onbeforerenderobservable', onBeforeRenderObservableDemo);
DemoInstance.add('vat', VATDemo);

