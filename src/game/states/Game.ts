import View = require("awayjs-display/lib/containers/View");
import Scene = require("awayjs-display/lib/containers/Scene");
import Camera = require("awayjs-display/lib/entities/Camera");
import DefaultRenderer = require("awayjs-stagegl/lib/render/DefaultRenderer");
import DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
import StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");

import State = require('../core/State');

module Game {
    export class BasicState extends State {
        // Engine
        public scene: Scene;
        public camera: Camera;
        public view: View;

        // Lights
        public directionalLight: DirectionalLight;
        public lightPicker: StaticLightPicker;

        create() {
            this.initEngine();
            this.initLights();
            this.initObjects();
            this.initListeners();
        }

        update(dt: number, time: number) {
            this.view.render();
        }

        initEngine(): void {
            this.scene = new Scene();
            this.camera = new Camera();

            this.view = new View(new DefaultRenderer());
            this.view.scene = this.scene;
            this.view.camera = this.camera;
        }

        initLights(): void {
            this.directionalLight = new DirectionalLight(0, -1, 0);
            this.directionalLight.castsShadows = false;
            this.directionalLight.color = 0xff3366;
            this.directionalLight.diffuse = .5;
            this.directionalLight.ambient = .5;
            this.directionalLight.specular = 0;
            this.directionalLight.ambientColor = 0x808090;

            this.view.scene.addChild(this.directionalLight);

            this.lightPicker = new StaticLightPicker([this.directionalLight]);
        }

        initObjects(): void {

        }

        initListeners(): void {
            window.onresize = (event:UIEvent) => this.onResize(event);
            this.onResize();
        }

        private onResize(event:UIEvent = null): void {
            this.view.x = 0;
            this.view.y = 0;
            this.view.width = window.innerWidth;
            this.view.height = window.innerHeight;
        }
    }
}

export = Game;
