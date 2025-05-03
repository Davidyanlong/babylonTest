### 如何优化场景

1. 使用 `TransformNode` 替代 `AbstractMesh` 或者空Mesh
2. 减少Shaders 开销 `material.freeze();`
3. 减少世界矩阵的计算 `mesh.freezeWorldMatrix();`
4. 冻结活跃Meshs `scene.freezeActiveMeshes();`
5. 不更新包围盒信息 `mesh.doNotSyncBoundingInfo = true;`
6. 不开启场景的鼠标拾取 `scene.skipPointerMovePicking = true`
7. 减少draw calls 可以使用`instances` 采用 `mesh.clone("newName")` 相同材质和几何体
8. 减少调用`gl.clear()` 使用 `scene.autoClear = false;`, `scene.autoClearDepthAndStencil = false;`
9. 使用提前深度 pre-pass 使用 `mesh.material.needDepthPrePass = true.`
10. 使用没有索引的网格体 使用`mesh.convertToUnIndexedMesh();`
11. 关闭屏幕像素比的适配,使用 `var engine = new BABYLON.Engine(canvas, antialiasing, null, true);`
12. 启用阻塞脏数据机制, 使用`scene.blockMaterialDirtyMechanism = true;`
13. 使用动画的频率， 使用`scene.getAnimationRatio();`
14. 调用WebGL context lost 上下文丢失 `engine.onContextLostObservable `
15. 场景中有大量的Meshes, 可以采用有些方法：
    1. 使用`useGeometryIdsMap = true` 加速几何体销毁的速度
    2. 使用`useMaterialMeshMap  = true` 加速材质销毁的速度
    3. 使用`useClonedMeshMap = true`  加速销毁Mesh的速度 
    4. 使用`scene.blockfreeActiveMeshesAndRenderingGroups = true;`  阻止引擎自动释放活动网格和渲染组的缓存
16. 改变Mesh的剔除策略 
    ```javascript
    /**
    * Possible values : 
    * - BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD  标准剔除策略 使用网格的边界框(Bounding Box)进行视锥剔除
    * - BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY  仅使用边界球剔除 使用网格的边界球(Bounding Sphere)进行粗略剔除
    * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION  乐观包含策略 如果边界球与视锥体相交，则直接包含网格
    * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY  乐观包含+边界球二次验证 先使用乐观包含策略 对包含的网格再使用边界球验证
    */
    mesh.cullingStrategy = oneOfThePossibleValues;
    ```
| 策略名称 | 常量值 | 计算开销 | 剔除精度 | 内存占用 | 适用场景 | 备注 |
|---------|--------|---------|---------|---------|----------|------|
| **标准剔除** | `CULLINGSTRATEGY_STANDARD` | 高 | ⭐⭐⭐⭐⭐ (最高) | 中 | 1. 精确剔除关键场景<br>2. 近景复杂模型<br>3. 需要精确渲染的项目 | 使用完整边界框检测 |
| **仅边界球剔除** | `CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY` | 中 | ⭐⭐☆☆☆ (较低) | 低 | 1. 简单形状物体<br>2. 远距离物体<br>3. 球形明显物体 | 快速但可能有过度绘制 |
| **乐观包含** | `CULLINGSTRATEGY_OPTIMISTIC_INCLUSION` | 最低 | ⭐☆☆☆☆ (最低) | 最低 | 1. VR/AR应用<br>2. 性能优先场景<br>3. 低端设备 | 最大化帧率，但可能渲染不可见物体 |
| **乐观包含+边界球验证** | `CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY` | 中低 | ⭐⭐⭐☆☆ (中等) | 中低 | 1. 开放世界游戏<br>2. 平衡型应用<br>3. 动态加载场景 | 性能与精度折中方案 |

17. 选择合适的性能优化策略 ` scene.performancePriority`

| 值 |	常量 |	优化策略 |	适用场景 |
|---------|---------|---------|---------|
| 0	 | SCENE_PERFORMANCE_PRIORITY_LOW |	质量优先 |	- 高质量渲染<br> - 静态场景<br> - 高端设备 |
| 1	 | SCENE_PERFORMANCE_PRIORITY_MEDIUM |	平衡模式  |	- 默认值<br> - 通用场景<br> - 中端设备 |
| 2	 | SCENE_PERFORMANCE_PRIORITY_HIGH	 | 性能优先	| - 动态场景<br> - 移动设备<br> - VR/AR应用 |
| 3	 | SCENE_PERFORMANCE_PRIORITY_AGGREGATIVE |	聚合优化 |	- 超大规模场景<br> - 需要特殊优化的项目 |


> ref:
 https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene/
