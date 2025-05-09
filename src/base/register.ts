import { BABYLON } from "./commonIncludes";

export type fnType = (...args: any[]) => BABYLON.Scene;

// 注册示例demo
export class DemoInstance {
  private static demos: Map<string, fnType> = new Map();
  private static ws:WeakMap<fnType, boolean> = new WeakMap();

  static add(name: string, demo: fnType, isWebGPU = false) {
    if (this.demos.has(name)) {
      console.warn(`demo ${name}已经存在，发生了示例替换`);
    }
    this.demos.set(name, demo);
    this.ws.set(demo, isWebGPU)
  }

  static remove(name: string): boolean {
    return this.demos.delete(name);
  }

  static find(name: string): fnType | null {
    let ret = this.demos.get(name);
    return ret ?? null;
  }

  static isWebGPU(name:string):boolean{
    return this.ws.get(this.find(name)!)!
  }

  static clean() {
    this.demos.clear();
  }
}
