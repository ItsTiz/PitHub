class SimulationEvent {

    static #EVENT_NAME = 'sim';

    static #START = `${this.#EVENT_NAME}:start`;
    static #STOP = `${this.#EVENT_NAME}:stop`;
    static #PAUSE = `${this.#EVENT_NAME}:pause`;

    static get START() { return this.#START; }
    static get STOP() { return this.#STOP; }
    static get PAUSE() { return this.#PAUSE; }
}

export default SimulationEvent;