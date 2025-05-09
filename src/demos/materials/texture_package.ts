import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const texturePackageScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个材质
    var scene = new BABYLON.Scene(engine);

    demo1(scene, canvas);

    // demo2(scene, canvas);

    return scene;
}

const  demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    prepTest(scene); //Preps the Random textures and meshes.


    /**
     * let pack = new BABYLON.TexturePacker(name, targetMeshes, options, scene);
     * pack.processAsync().then(success).catch(error);
     */


    // 创建一个纹理打包
    let pack = new BABYLON.TexturePacker('TestPack', outs, {
            frameSize:256,
            layout : BABYLON.TexturePacker.LAYOUT_POWER2,
            paddingMode : BABYLON.TexturePacker.SUBUV_EXTEND,
        }, scene);

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

    var button = GUI.Button.CreateSimpleButton("button", "Pack Textures");
    button.width = 0.2
    button.height = "40px"
    button.color = "white"
    button.background = "green"
    advancedTexture.addControl(button);

    var text1 = new GUI.TextBlock();
    text1.text = "Active Textures : ";
    text1.color = "white";
    text1.fontSize = 24;
    text1.height = '26px';
    text1.top = '6px';
    text1.verticalAlignment = 	GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(text1); 

    // 点击按钮打包纹理
    button.onPointerClickObservable.add(()=>{ 
        //Start the package       
        pack.processAsync().then( //Success
            ()=>{
                console.log('PACK DONE!');
            }, 
            //Error
            (err)=>{
                console.log('PACK Error!', err);
        })        
        advancedTexture.removeControl(button);
    })

    // 渲染前调用
    scene.onBeforeRenderObservable.add(()=>{
        text1.text = "Active Textures : "+(scene.textures.length - 1);
        //Dont count the UI
    })

}



const sRandom = ()=>{
    return ((Math.sin(Date.now())*0.5+0.5)+Math.random())*0.5
}
// 存放创建的材质
let matBank = []
const newMaterial = (scene:BABYLON.Scene) =>{
    // 创建一个标准材质
    let m = new BABYLON.StandardMaterial('m'+matBank.length, scene)
    matBank.push(m)
    return m
}

type standardMaterialKeyType = 'ambientTexture'| 'bumpTexture' | 'diffuseTexture' |'emissiveTexture' | 'lightmapTexture'| 'opacityTexture'| 'reflectionTexture'|'refractionTexture'| 'specularTexture'          

let channels:standardMaterialKeyType[] = [ 
    //'ambientTexture',
    //'bumpTexture',
    'diffuseTexture',
    'emissiveTexture',
    //'lightmapTexture',
    'opacityTexture',
    //'reflectionTexture',
    //'refractionTexture',
    'specularTexture'                               
]
let tUrls = [
    false,
    '/textures/grass.jpg',
    '/textures/albedo.png',
    '/textures/bloc.jpg',
    '/textures/cloud.png',
    '/textures/crate.png',
    '/textures/fire.png',
    '/textures/floor.png',
    '/textures/fur.jpg'
]
const getRandomColor = (fullAlpha = false)=>{
    return 'rgba('+Math.floor(sRandom()*255)+','+Math.floor(sRandom()*255)+','+(!fullAlpha?Math.floor(sRandom()*255)+','+sRandom().toFixed(2):1)+')'
}
const genTexture = (i:number , scene:BABYLON.Scene )=>{
    // 随机取纹理
    let r = tUrls[Math.floor(sRandom()*tUrls.length)]
    let t:BABYLON.DynamicTexture | BABYLON.Texture
    if(typeof r === 'string'){
        t = new BABYLON.Texture( 'https://playground.babylonjs.com' + r, scene )!;
    }else{
        t = new BABYLON.DynamicTexture(i+'dt', 512, scene);
        (t as BABYLON.DynamicTexture).drawText(`${i}`, 120, 256, '120px Arial', 'white', getRandomColor(), true, true);
    }
   
    return t
}

let tBank = []
const genTextures = (material:BABYLON.StandardMaterial, scene:BABYLON.Scene)=>{    
    let i = channels.length - 1
    let c = channels.slice()

    while(i>=0){
        let _c = c.splice(i, 1)[0] 
        // 设置材质相应的纹理
        material[_c] = genTexture( i + tBank.length, scene )
        tBank.push(material[_c])
        i--
    }
}
let outs:BABYLON.Mesh[] = []
let count = 6
const prepTest = (scene:BABYLON.Scene)=>{
    for(let x = 0; x < count; x++){
        for(let y = 0; y < count; y++){
            // 创建一个平面
            let oPlane = BABYLON.MeshBuilder.CreatePlane(x+':'+y, {size:0.9}, scene)
            // 设置位置
            oPlane.position = new BABYLON.Vector3(
                x - (count*0.5), y - (count*0.5), 0
            )
            // 创建一个材质
            let mat = newMaterial(scene)
            genTextures(mat, scene)
            
            oPlane.material = mat
            outs.push(oPlane)
        }
    }
}