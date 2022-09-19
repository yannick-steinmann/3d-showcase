import * as THREE from "three";
import Experience from "../Experience.js";
import assets from "../Utils/assets.js";
import GSAP from "gsap";

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setTextures();
        this.setMaterial();
        this.setModel();
        this.onMouseMove();
    }

    setTextures() {
        this.textures = {};

        this.textures.roomColor = this.resources.items.roomTexture;
        this.textures.roomColor.flipY = false;
        this.textures.roomColor.encoding = THREE.sRGBEncoding;

        this.textures.cubeColor = this.resources.items.cubeTexture;
        this.textures.cubeColor.flipY = true;

    }


    setMaterial() {
        
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.roomColor
        });
        this.materialCube = new THREE.MeshBasicMaterial({
            map: this.textures.cubeColor
        });
         
    }
 
    setModel() {
        
        this.actualRoom.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.material = this.material
            }
        });

        this.actualRoom.children.forEach((child) => {
            child.scale.set(0,0,0);

            if (child.name === "cubeintro") {
                child.material = this.materialCube;
                //child.scale.set(1,1,1);
                child.position.set(0,7,0); // cube is centered in room at position.set(0,4.5,0)
            }

            if (child.name === "map") {
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen
                })
            }

            this.roomChildren[child.name] = child;
        });
        
        this.actualRoom.rotation.y = - Math.PI / 4;

        this.scene.add(this.actualRoom);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2)*2) / window.innerWidth;
            this.lerp.target = this.rotation*0.1;
        });
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = (- Math.PI / 4) + this.lerp.current;
        
    }
}