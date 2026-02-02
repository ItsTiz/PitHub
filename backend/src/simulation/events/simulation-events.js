class SimulationEvent {

    static #EVENT_NAME = 'sim';
    static #ROOM_PREFIX = `${this.#EVENT_NAME}`;

    static #JOIN = `${this.#EVENT_NAME}:join`;
    static #LEAVE = `${this.#EVENT_NAME}:leave`;
    static #START = `${this.#EVENT_NAME}:start`;
    static #STOP = `${this.#EVENT_NAME}:stop`;
    static #STATUS = `${this.#EVENT_NAME}:status`;
    static #LOG = `${this.#EVENT_NAME}:log`;
    static #CIRCUIT = `${this.#EVENT_NAME}:circuit`;

    static get ROOM_PREFIX() { return this.#ROOM_PREFIX; }
    static get JOIN() { return this.#JOIN; }
    static get LEAVE() { return this.#LEAVE; }
    static get START() { return this.#START; }
    static get STOP() { return this.#STOP; }
    static get STATUS() { return this.#STATUS; }
    static get LOG() { return this.#LOG; }
    static get CIRCUIT() {return this.#CIRCUIT;};
}

export default SimulationEvent;