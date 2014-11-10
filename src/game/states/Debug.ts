import _ = require('lodash');
import Mesh = require('awayjs-display/lib/entities/Mesh');
import PrimitiveCubePrefab = require('awayjs-display/lib/prefabs/PrimitiveCubePrefab');
import PrimitiveTorusPrefab = require('awayjs-display/lib/prefabs/PrimitiveTorusPrefab');
import PrimitivePlanePrefab = require('awayjs-display/lib/prefabs/PrimitivePlanePrefab');
import ShadowSoftMethod = require('awayjs-methodmaterials/lib/methods/ShadowSoftMethod');
import ShadowHardMethod = require('awayjs-methodmaterials/lib/methods/ShadowHardMethod');
import TriangleMethodMaterial = require('awayjs-methodmaterials/lib/TriangleMethodMaterial');

import Game = require('./Game');
import Flora = require('../actors/Flora');
import Fauna = require('../actors/Fauna');

module Debug {
    export class Plane extends Game.BasicState {
        public plane: Mesh;
        public planeMaterial: TriangleMethodMaterial;
        public shadowMethod: ShadowHardMethod;

        create() {
            super.create();
            this.initLights();
            this.initMaterials();
            this.initObjects();
        }

        initLights() {
            this.shadowMethod = new ShadowHardMethod(this.directionalLight);
        }

        initMaterials() {
            this.planeMaterial = new TriangleMethodMaterial(0x578220, 1);
            this.planeMaterial.lightPicker = this.lightPicker;
            this.planeMaterial.shadowMethod = this.shadowMethod;
        }

        initObjects() {
            var shadowMethod: ShadowSoftMethod;

            this.plane = <Mesh> new PrimitivePlanePrefab(1000, 1000).getNewObject();
            this.plane.material = this.planeMaterial;
            this.plane.y = -20;

            //shadowMethod = new ShadowSoftMethod(this.directionalLight, 20);
            //shadowMethod.range = 3;
            //shadowMethod.epsilon = .1;
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

    export class FloraFauna extends Plane {
        public flora: Array<Flora.Plant> = [];
        public fauna: Array<Fauna.Animal> = [];

        initObjects() {
            var countFlora = 10,
                countFauna = 3;

            super.initObjects();

            _.times(countFlora, (i) => {
                var plant = new Flora.Plant(this.scene);
                plant.mesh.x = 100 - Math.floor(Math.random() * 200);
                plant.mesh.z = 100 - Math.floor(Math.random() * 200);
                //plant.material.shadowMethod = this.shadowMethod;
                this.flora.push(plant);
            });

            _.times(countFauna, (i) => {
                var animal = new Fauna.Animal(this.scene);
                animal.mesh.x = 400 - Math.floor(Math.random() * 800);
                animal.mesh.z = 400 - Math.floor(Math.random() * 800);
                this.fauna.push(animal);
            });
        }
    }
}

export = Debug;
