import { BABYLON } from "./commonIncludes";

// 单例方式运行
export class App {
    private _canvas: HTMLCanvasElement | null;
    private _isInit : boolean;
    private _engine: BABYLON.Engine | null;
    private _sceneToRender: BABYLON.Scene | null
    
    constructor(){
        this._canvas = null;
        this._isInit = false;
        this._engine = null;
        this._sceneToRender = null;
    }
    async initalize(){
        this.getCanvasDom();
        this._isInit = true;

        window.addEventListener("resize",  this.resizeFn);
        return this;
    }

    addScene(scene:BABYLON.Scene){
        this._sceneToRender = scene;
    }

    getScene(){
        return this._sceneToRender;
    }

    resizeFn = ()=>{
        const engine = this.getEngine();
        engine.resize();
    }

    destroy(){
        window.removeEventListener("resize",  this.resizeFn); 
    }


    startRenderLoop() {
        if(!this._isInit) return;
        const engine = this.getEngine();
        const scene = this.getScene();
        engine.runRenderLoop(function () {
            if (scene && scene.activeCamera) {
                scene.render();
            }
        });
    }

    getCanvasDom():HTMLCanvasElement{
        if(!this._canvas){
            this._canvas = document.querySelector("#renderCanvas");
        }
        if(!this._canvas){
            throw new Error('没有找到Canvas画布,画布ID为 renderCanvas ');
        }
        return this._canvas;
    }

    getEngine():BABYLON.Engine{
        if(!this._engine){
            let canvas = this.getCanvasDom();
            this._engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
        }

        return this._engine;
    }
}


export const app =  (new App()).initalize();