import { BABYLON } from "./commonIncludes";

export type fnType = (...args: any[]) => BABYLON.Scene;

// 注册示例demo
export class DemoInstance {
  private static demos: Map<string, fnType> = new Map();

  static add(name: string, demo: fnType) {
    if (this.demos.has(name)) {
      console.warn(`demo ${name}已经存在，发生了示例替换`);
    }
    this.demos.set(name, demo);
  }

  static remove(name: string): boolean {
    return this.demos.delete(name);
  }

  static find(name: string): fnType | null {
    let ret = this.demos.get(name);
    return ret ?? null;
  }

  static clean() {
    this.demos.clear();
  }
}
