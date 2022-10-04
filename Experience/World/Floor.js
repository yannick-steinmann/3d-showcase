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
        // this.material = new THREE.MeshStandardMaterial({
        //     color: 0x000000,
        //     side: THREE.DoubleSide,
        // });
        this.material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -2;
    }

    setCircle() {
        const geometry = new THREE.CircleGeometry(5, 64);
        // const material = new THREE.MeshBasicMaterial({ color: 0x58980E});
        const material = new THREE.MeshBasicMaterial({ color: 0xFCB017});
        //const material = new THREE.MeshStandardMaterial({ color: 0x2B3E15});
        const material2 = new THREE.MeshStandardMaterial({ color: 0xA7182B});
        const material3 = new THREE.MeshStandardMaterial({ color: 0x2A469B});

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
        this.circleFourth = new THREE.Mesh(geometry, material);
        
        this.circleFirst.position.y = 0; // -1.99
        this.circleSecond.position.y = 0.97;
        this.circleThird.position.y = 0.98;
        this.circleFourth.position.y = 0.99;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);
        this.circleFourth.scale.set(0,0,0);

        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = this.circleFourth.rotation.x = -Math.PI / 2;
        
        this.scene.add(this.circleFirst, this.circleSecond, this.circleThird, this.circleFourth);
    }

    resize(){

    }

    update(){

    }
}