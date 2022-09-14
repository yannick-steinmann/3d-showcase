import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircle();
    }
 
    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -2;
        this.plane.receiveShadow = true;
    }

    setCircle() {
        const geometry = new THREE.CircleGeometry(5, 64);
        //const material = new THREE.MeshBasicMaterial({ color: 0x9CDE4E});
        const material = new THREE.MeshStandardMaterial({ color: 0x2B3E15});
        const material2 = new THREE.MeshStandardMaterial({ color: 0xE5A1AA});
        const material3 = new THREE.MeshStandardMaterial({ color: 0x8395CD});

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
        
        this.circleFirst.position.y = -1.99;
        this.circleSecond.position.y = -1.98;
        this.circleSecond.position.x = 5;
        this.circleThird.position.y = -1.97;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);

        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI / 2;
        
        this.scene.add(this.circleFirst, this.circleSecond, this.circleThird);
    }

    resize(){

    }

    update(){

    }
}