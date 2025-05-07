import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const noiseTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个面
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {size:10.0}, scene);


    var mat = new BABYLON.StandardMaterial("mat", scene);
    plane.material = mat;

    mat.disableLighting = true;
    mat.backFaceCulling = false;
    // 创建柏林噪声
    var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 512, scene);
    mat.emissiveTexture = noiseTexture;

    // 创建默认的相机与灯光
    scene.createDefaultCameraOrLight(true, true);
    (scene.activeCamera as BABYLON.ArcRotateCamera).attachControl(true);

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    var addSlider = function(title:string, value:number, min:number, max:number, onChange:any, isInteger:boolean) {
        var header = new GUI.TextBlock();
        header.text = title + ": " + (isInteger ? value | 0 : value.toFixed(2));
        header.height = "30px";
        header.color = "white";
        panel.addControl(header); 
    
        var slider = new GUI.Slider();
        slider.minimum = min;
        slider.maximum = max;
        slider.value = value;
        slider.height = "20px";
        slider.width = "200px";
        slider.onValueChangedObservable.add(function(value) {
            header.text = title + ": " + (isInteger ? value | 0 : value.toFixed(2));
            onChange(value);
    
        });
        panel.addControl(slider);    
    }

    /**
     * brightness: Gets or sets a value between 0 and 1 indicating the overall brightness of the texture (default is 0.2)
     * octaves: Defines the number of octaves to process (default is 3)
     * persistence: Defines the level of persistence (0.8 by default)
     * animationSpeedFactor: Gets or sets animation speed factor (default is 1)
     */
        
    addSlider("octaves", noiseTexture.octaves, 0, 8, (value:number) => {
        noiseTexture.octaves = value;
    }, true);

    addSlider("persistence", noiseTexture.persistence, 0, 2, (value:number) => {
        noiseTexture.persistence = value;
    },false);    

    addSlider("speedX", noiseTexture.animationSpeedFactor, -20, 20, (value:number) => {
        noiseTexture.animationSpeedFactor = value;
    },false);        

    return scene;
}