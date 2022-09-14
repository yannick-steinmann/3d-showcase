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
    }


    setMaterial() {
        
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.roomColor
        })
         
    }
 
    setModel() {
        
        this.actualRoom.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.material = this.material
            }
        });


        this.actualRoom.children[5].children[0].material = new THREE.MeshBasicMaterial({
            map: this.resources.items.screen
        })
        
        this.actualRoom.rotation.y = - Math.PI / 4;
        //this.actualRoom.castShadow = true;

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