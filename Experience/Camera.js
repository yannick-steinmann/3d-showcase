import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(75,25,-62);
    }

    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum),
            (this.sizes.aspect * this.sizes.frustrum),
            this.sizes.frustrum,
            -this.sizes.frustrum,
            -50,
            50
        );
        this.orthographicCamera.position.set(0,6,5);
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);

        // this.orthographicCameraHelper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.orthographicCameraHelper);
      

        // const size = 200;
        // const divisions = 40;
        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );

        // const axesHelper = new THREE.AxesHelper( 10 );
        // this.scene.add( axesHelper );
    }

    setOrbitControls () {
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas)
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize(){
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum);
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum);
        this.orthographicCamera.top = this.sizes.frustrum;
        this.orthographicCamera.bottom = -this.sizes.frustrum;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update()

        // this.orthographicCameraHelper.matrixWorldNeedsUpdate = true;
        // this.orthographicCameraHelper.update();
        // this.orthographicCameraHelper.position.copy(this.orthographicCamera.position);
        // this.orthographicCameraHelper.rotation.copy(this.orthographicCamera.rotation);

    }
}