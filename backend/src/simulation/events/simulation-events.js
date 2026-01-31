class SimulationEvent {

    static #EVENT_NAME = 'sim';

    static #START = `${this.#EVENT_NAME}:start`;
    static #STOP = `${this.#EVENT_NAME}:stop`;
    static #STATUS = `${this.#EVENT_NAME}:status`;
    static #PAUSE = `${this.#EVENT_NAME}:pause`;
    static #CIRCUIT = `${this.#EVENT_NAME}:circuit`;

    static get START() { return this.#START; }
    static get STOP() { return this.#STOP; }
    static get STATUS() { return this.#STATUS; }
    static get PAUSE() { return this.#PAUSE; }
    static get CIRCUIT() {return this.#CIRCUIT;};
}

export default SimulationEvent;