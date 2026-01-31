class RaceEvent {

    static #EVENT_NAME = 'race';

    static #ROOM_PREFIX = `${this.#EVENT_NAME}`;
    static #JOIN = `${this.#EVENT_NAME}:join`;
    static #LEAVE = `${this.#EVENT_NAME}:leave`;
    static #UPDATE = `${this.#EVENT_NAME}:update`;
    static #CONNECTED = `${this.#EVENT_NAME}:connected?`;

    static get ROOM_PREFIX() { return this.#ROOM_PREFIX; }
    static get JOIN() { return this.#JOIN; }
    static get LEAVE() { return this.#LEAVE; }
    static get UPDATE() { return this.#UPDATE; }
    static get CONNECTED() { return this.#CONNECTED; }
}

export default RaceEvent;