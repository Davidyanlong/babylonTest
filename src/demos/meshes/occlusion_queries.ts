import { BABYLON, GUI } from "../../base/commonIncludes";

// 模型合并
export const occlusionQueriesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    var scene = new BABYLON.Scene(engine);


    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    var plane = BABYLON.Mesh.CreatePlane('opaque1', 5, scene);
    plane.position.y = 1;
    plane.position.z = -2;

    // occlusion sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', {segments:16, diameter:2}, scene);
    sphere.position.y = 1;
    // 遮蔽查询算法

     /** Use an accurate occlusion algorithm */
    // static OCCLUSION_ALGORITHM_TYPE_ACCURATE: number;
    /** Use a conservative occlusion algorithm */
    // static OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE: number;
    sphere.occlusionQueryAlgorithmType = BABYLON.AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE;
    // 是否开启遮蔽查询
    sphere.isOccluded = true;

    /**
     * OCCLUSION_TYPE_OPTIMISTIC: this option will render the mesh if a break is happened.
     * OCCLUSION_TYPE_STRICT: this option will restore the last state of the object whether visible continue as visible or hidden continue as hidden.
     */
    sphere.occlusionType = BABYLON.AbstractMesh.OCCLUSION_TYPE_STRICT;
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {width:6, height:6, subdivisions:2}, scene);

        scene.registerBeforeRender(function () {
        if(sphere.isOccluded)
            scene.clearColor = new BABYLON.Color4(0.5, 0.8, 0.5, 1);
        else
            scene.clearColor = new BABYLON.Color4(0.1, 0.2, 0.8, 1);
    });



    return scene;
}