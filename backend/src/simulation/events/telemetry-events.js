class TelemetryEvent {

    static #EVENT_NAME = 'telemetry';

    static #ROOM_PREFIX = `${this.#EVENT_NAME}-team-`;
    static #JOIN = `${this.#EVENT_NAME}:join`;
    static #LEAVE = `${this.#EVENT_NAME}:leave`;
    static #UPDATE = `${this.#EVENT_NAME}:update`;

    static get ROOM_PREFIX() { return this.#ROOM_PREFIX; }
    static get JOIN() { return this.#JOIN; }
    static get LEAVE() { return this.#LEAVE; }
    static get UPDATE() { return this.#UPDATE; }
}

export default TelemetryEvent;