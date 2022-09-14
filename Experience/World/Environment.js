import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
        this.setPointlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        //this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 100;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(5,10,-3);
        this.scene.add(this.sunLight);
    }

    setPointlight() {
        this.pointLight = new THREE.PointLight("#ffffff", 100, 100, 2);
        this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);
        this.pointLight.position.set(0,8,0);
        //this.pointLight.castShadow = true;
        //this.scene.add(this.pointLight, this.pointLightHelper);
    }

    resize(){

    }

    update(){

    }
}