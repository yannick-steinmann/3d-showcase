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

        this.textures.cubeColor = this.resources.items.cubeTexture;
        this.textures.cubeColor.flipY = false;
        this.textures.cubeColor.encoding = THREE.sRGBEncoding;

        this.textures.wallTexture = this.resources.items.wallTexture;
        this.textures.wallTexture.flipY = false;
        this.textures.wallTexture.encoding = THREE.sRGBEncoding;

        this.textures.roomColor = this.resources.items.roomTexture;
        this.textures.roomColor.flipY = false;
        this.textures.roomColor.encoding = THREE.sRGBEncoding;

        

        console.log(this.textures);
    }


    setMaterial() {
        

        this.materialCube = new THREE.MeshBasicMaterial({
            map: this.textures.cubeColor
        });   
        this.materialWall = new THREE.MeshBasicMaterial({
            map: this.textures.wallTexture
        });   
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.roomColor
        });      
    }
 
    setModel() {
        
        this.actualRoom.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.material = this.materialWall;
            }
        });

        this.actualRoom.children.forEach((child) => {
            child.scale.set(0,0,0);

            // if (child.name === "walls" ||
            // child.name === "rug" ||
            // child.name === "floor" ||
            // child.name === "phone" ||
            // child.name === "laptop" ||
            // child.name === "desk" ) {
            //     child.material = this.materialWall;
                //child.children[0].material = this.materialWall;
            // }
            // if (child.name === "rug") {
            //     child.material = this.materialWall;
            // }
            // if (child.name === "floor") {
            //     child.material = this.materialWall;
            // }
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

            if (child.name === "laptop") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.laptopTexture
                })
            }
            

            this.roomChildren[child.name] = child;
        });
        
        this.actualRoom.rotation.y = - Math.PI / 4;

        console.log(this.actualRoom)

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