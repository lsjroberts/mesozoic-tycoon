import View = require("awayjs-display/lib/containers/View");
import Scene = require("awayjs-display/lib/containers/Scene");
import Camera = require("awayjs-display/lib/entities/Camera");
import PointLight = require("awayjs-display/lib/entities/PointLight");
import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
import DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
import HoverController = require("awayjs-display/lib/controllers/HoverController");
import StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
import DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");

import State = require('../core/State');

module Game {
    export class BasicState extends State {
        // Engine
        public scene: Scene;
        public view: View;
        public camera: Camera;
        public cameraController: HoverController;

        // Lights
        public directionalLight: DirectionalLight;
        public lightPicker: StaticLightPicker;

        // Camera data
        private lastPanAngle: number;
        private lastTiltAngle: number;
        private lastMouseX: number;
        private lastMouseY: number;
        private isCameraMoving: boolean;
        private minCameraDistance: number = 300;
        private maxCameraDistance: number = 800;

        create() {
            this.initDefaultEngine();
            this.initDefaultCamera();
            this.initDefaultLights();
            this.initDefaultObjects();
            this.initDefaultListeners();
        }

        update(dt: number, time: number) {
            this.view.render();
        }

        initDefaultEngine(): void {
            this.scene = new Scene();
            this.camera = new Camera();

            this.view = new View(new DefaultRenderer());
            this.view.scene = this.scene;
            this.view.camera = this.camera;
        }

        initDefaultCamera(): void {
            this.cameraController = new HoverController(this.camera);
            this.cameraController.distance = this.maxCameraDistance;
            this.cameraController.minTiltAngle = 10;
            this.cameraController.maxTiltAngle = 60;
            this.cameraController.panAngle = 45;
            this.cameraController.tiltAngle = 60;
        }

        initDefaultLights(): void {
            this.directionalLight = new DirectionalLight(0, -1, 0);
            this.directionalLight.color = 0xffffff;
            this.directionalLight.diffuse = .5;
            this.directionalLight.ambient = .5;
            this.directionalLight.specular = 0;
            this.directionalLight.ambientColor = 0x000000;

            this.directionalLight.castsShadows = true;
            (<DirectionalShadowMapper> this.directionalLight.shadowMapper).lightOffset = 1000;

            this.view.scene.addChild(this.directionalLight);

            this.lightPicker = new StaticLightPicker([this.directionalLight]);
        }

        initDefaultObjects(): void {

        }

        initDefaultListeners(): void {
            window.onresize = (event: UIEvent) => this.onResize(event);
            this.onResize();

            document.onmousedown = (event: MouseEvent) => this.onMouseDown(event);
            document.onmouseup = (event: MouseEvent) => this.onMouseUp(event);
            document.onmousemove = (event: MouseEvent) => this.onMouseMove(event);
            document.onmousewheel = (event: MouseWheelEvent) => this.onMouseWheel(event);
        }

        private onResize(event: UIEvent = null): void {
            this.view.x = 0;
            this.view.y = 0;
            this.view.width = window.innerWidth;
            this.view.height = window.innerHeight;
        }

        private onMouseDown(event: MouseEvent): any {
            this.lastPanAngle = this.cameraController.panAngle;
            this.lastTiltAngle = this.cameraController.tiltAngle;
            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
            this.isCameraMoving = true;
        }

        private onMouseUp(event: MouseEvent): any {
            this.isCameraMoving = false;
        }

        private onMouseMove(event: MouseEvent): any {
            if (this.isCameraMoving) {
                //this.cameraController.panAngle = .3 * (event.clientX - this.lastMouseX) + this.lastPanAngle;
                //this.cameraController.tiltAngle = .3 * (event.clientY - this.lastMouseY) + this.lastTiltAngle;

                //this.cameraController.
            }
        }

        private onMouseWheel(event: MouseWheelEvent): any {
            var ratio;

            this.cameraController.distance -= .3 * event.wheelDelta;

            if (this.cameraController.distance < this.minCameraDistance) {
                this.cameraController.distance = this.minCameraDistance;
            } else if (this.cameraController.distance > this.maxCameraDistance) {
                this.cameraController.distance = this.maxCameraDistance;
            }

            ratio = (this.cameraController.distance - this.minCameraDistance) / (this.maxCameraDistance - this.minCameraDistance);
            this.cameraController.tiltAngle = ratio * (this.cameraController.maxTiltAngle - this.cameraController.minTiltAngle);
        }
    }
}

export = Game;
