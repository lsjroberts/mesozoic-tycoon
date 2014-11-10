import Mesh = require("awayjs-display/lib/entities/Mesh");
import Scene = require("awayjs-display/lib/containers/Scene");

import State = require('./State');
import Entity = require('./Entity');
import Task = require('./ai/tasks/Task');
import Sense = require('./ai/senses/Sense');
import StateManager = require('./StateManager');
import Schedule = require('./ai/schedules/Schedule');
import Condition = require('./ai/conditions/Condition');

/**
 * --------------------------------------------------------------------------
 * Actor
 * --------------------------------------------------------------------------
 *
 * An actor is an entity that can perform a set of actions on other entities
 * and actors within the scene and has the ability to self function.
 *
 */

interface ActorSenseInterface {
    sense: Sense;
    awareness: number;
}

interface SensedActorsInterface {
    sense: ActorSenseInterface
}

class Actor extends Entity {
    public states: StateManager;
    public senses: Array<ActorSenseInterface>;

    constructor(mesh: Mesh, scene: Scene) {
        super(mesh, scene);

        this.states = new StateManager(true);
    }

    addSense(sense: Sense, awareness: number = 1) {
        this.senses.push({
            sense: sense,
            awareness: awareness
        });
    }

    think(): void {
        var conditions,
            state,
            schedule,
            task;

        // Generate a list of conditions
        conditions = this.getConditions();

        // Choose an appropriate state
        state = this.getStateFromConditions(conditions);

        // Select a new schedule if appropriate
        schedule = this.getScheduleForState(state);

        // Get the next task in the schedule
        task = this.getNextTaskInSchedule(schedule, this.currentTask);

        if (!task) {
            task = this.getIdleTask();
        }

        // Perform the next task
        task.perform(this);
    }

    getConditions(): Array<Condition> {
        var sensedActors;

        sensedActors = this.getSensedActors();


    }

    getSensedActors(): Array<Actor> {
        var sensedActors = allActors;

        // Perform sensing
        _.each(this.senses, (sense) => {
            sensedActors = sense.sense.check(sensedActors, sense.awareness);
        });

        return sensedActors;
    }

    getConditionsFromSensedActors(actors: Array<Actor>): Array<Condition> {

    }

    getStateFromConditions(conditions: Array<Condition>): State {

    }

    getScheduleForState(state: State): Schedule {

    }

    getNextTaskInSchedule(schedule: Schedule, currentTask: Task = null): any {

    }

    getIdleTask(): Task {

    }
}

export = Actor;