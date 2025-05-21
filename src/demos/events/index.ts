import { DemoInstance } from "../../base/register";
import { actionEventsScene } from './actions'
import { observableScene } from './observables'

DemoInstance.add('actionevents', actionEventsScene);
DemoInstance.add('observable', observableScene)