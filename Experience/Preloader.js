import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import { CubeCamera } from "three";
import convert from "./Utils/convertDivsToSpans.js";


export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", ()=> {
            this.setAssets();
            this.playFirstIntro();
        })
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero0-main-title"));
        convert(document.querySelector(".hero0-main-description"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise ((resolve) =>{
            this.firstTimeline = new GSAP.timeline();

            if(this.device === "desktop") {
                this.firstTimeline.to(this.roomChildren.cubeintro.scale, {
                    x: 0.2,
                    y: 0.3142,
                    z: 0.2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -5.5,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                })
            } else {
                this.firstTimeline.to(this.roomChildren.cubeintro.scale, {
                    x: 0.2,
                    y: 0.3142,
                    z: 0.2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: -7,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                })
            }

            this.firstTimeline.to(".intro-text .animated", {
                yPercent: -200,
                stagger: 0.05,
                ease: "back.out(1.7)",
                onComplete: resolve,
            });
        })
    }

    secondIntro() {
        return new Promise ((resolve) =>{

            this.secondTimeline = new GSAP.timeline();

                this.secondTimeline.to(".intro-text .animated", {
                    yPercent: 200,
                    stagger: 0.05,
                    ease: "back.in(1.2)",
                }
                ).to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    ease: "power1.out",
                }, "same"
                ).to(this.roomChildren.cubeintro.rotation, {
                    y: 2*Math.PI,
                    duration: 1,
                }, "same"
                )
                
                if(this.device === "desktop") {
                    this.secondTimeline.to(this.room.position, {x: 0,y: 0,z: 0,duration: 1,ease: "power1.out",}, "same")
                } else {
                    this.secondTimeline.to(this.room.scale, {x:0.7,y:0.7,z:0.7, duration:1,},"same")
                    this.secondTimeline.to(this.room.position, {x: 0,y: 2,z: 0,duration: 1,ease: "power1.out",}, "same")
                }

                this.secondTimeline.to(this.roomChildren.cubeintro.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1,
                }, "same"
                ).to(this.roomChildren.cubeintro.position, {
                    y: 3.2189,
                    duration: 1,
                }, "same"
                ).to(this.camera.orthographicCamera.position, {
                    y: 10,
                    duration: 1,
                }, "same"

                ).to(this.roomChildren.cubeintro.scale, {
                    x: 0,
                    y: 0,
                    z: 0, 
                    ease: "power1.out",
                    duration: 0.5,
                }, "second"
                ).to(this.roomChildren.walls.scale, {
                    x: 1,
                    y: 1,
                    z: 1, 
                    ease: "power1.out",
                    duration: 0.3,
                }, "second"
                ).to(this.roomChildren.floor.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.3,}, "second"
                ).to(this.roomChildren.bike.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.book.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.chair.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.clock.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.couch.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.cup.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.curtain.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.curtain2.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.curtainholder.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.curtainholder2.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.curtainrod.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.desk.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.epiano.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.laptop.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.map.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.phone.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.plate.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.pot.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.rug.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.table.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.walls.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,}, "same2"
                ).to(this.roomChildren.window.scale, {x:1,y:1,z:1,ease:"power1.out",duration: 0.7,onComplete:resolve,}, "same2"
                ).to(".hero0-main-title .animated", {
                    yPercent: -200,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                }, "<+0.2"
                ).to(".hero0-main-description .animated", {
                    yPercent: -200,
                    stagger: 0.03,
                    ease: "back.out(1.7)",
                },
                );
        });
    }

    onScroll(e) {
        console.log("mouse wheel");
        this.removeEventListeners()
        this.playSecondIntro();
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swiped up");
            this.removeEventListeners()
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playFirstIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);

    };

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;

        this.emit("enablecontrols");
    }

    move() {
        if(this.device === "desktop") {
            this.room.position.set(-5.5,0,0);
        } else {
            this.room.position.set(0,0,-7);
        }
    }

    // scale() {
    //     if(this.device === "desktop") {
    //         this.room.scale.set(1,1,1);
    //     } else {
    //         this.room.scale.set(0.6,0.6,0.6);
    //     }
    // }

    update() {
        if(this.moveFlag){this.move();}
        // if(this.scaleFlag){this.scale();}
    }
}