import Mesh = require("awayjs-display/lib/entities/Mesh");
import PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
import PrimitiveTorusPrefab = require("awayjs-display/lib/prefabs/PrimitiveTorusPrefab");
import PrimitivePlanePrefab = require("awayjs-display/lib/prefabs/PrimitivePlanePrefab");
import ShadowSoftMethod = require("awayjs-methodmaterials/lib/methods/ShadowSoftMethod");
import TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");

import Game = require('./Game');

module Debug {
    export class Plane extends Game.BasicState {
        // Scene Objects
        public plane: Mesh;

        // Materials
        public planeMaterial: TriangleMethodMaterial;

        create() {
            super.create();
            this.initMaterials();
            this.initObjects();
        }

        initMaterials() {
            this.planeMaterial = new TriangleMethodMaterial(0xFFFFFF, 1);
            this.planeMaterial.mipmap = false;
            this.planeMaterial.specular = 10;
            this.planeMaterial.lightPicker = this.lightPicker;
        }

        initObjects() {
            var shadowMethod: ShadowSoftMethod;

            this.plane = <Mesh> new PrimitivePlanePrefab(1000, 1000).getNewObject();
            this.plane.material = this.planeMaterial;
            this.plane.y = -20;

            shadowMethod = new ShadowSoftMethod(this.directionalLight, 20);
            shadowMethod.range = 3;
            shadowMethod.epsilon = .1;
            // this.plane.material.shadowMethod = shadowMethod;

            this.scene.addChild(this.plane);
        }
    }

    export class Primitives extends Plane {
        // Scene Objects
        public cubes: Array<Mesh>;

        initObjects() {
            super.initObjects();

            var cube: Mesh,
                size: number,
                count: number,
                colours: Array<TriangleMethodMaterial>;

            colours = [
                new TriangleMethodMaterial(0xFF6666, 1),
                new TriangleMethodMaterial(0x66FF66, 1),
                new TriangleMethodMaterial(0x6666FF, 1),
            ];

            count = 100;

            for (var i = 0; i < count; i++) {
                size = 20.0;
                cube = <Mesh> new PrimitiveCubePrefab(size, size, size).getNewObject();
                cube.material = colours[Math.floor(Math.random() * (colours.length))];

                cube.x = Math.sin(i / 4) * size * 4;
                cube.z = Math.cos(i / 4) * size * 4;
                cube.y = i * (size / 4);

                this.scene.addChild(cube);
            }
        }
    }
}

export = Debug;
