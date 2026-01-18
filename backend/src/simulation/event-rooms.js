class EventRooms {

    static #TELEMETRY_EVENT_NAME = 'telemetry';

    static #TELEMETRY_ROOM_PREFIX = `${this.#TELEMETRY_EVENT_NAME}-team-`;
    static #TELEMETRY_JOIN = `${this.#TELEMETRY_EVENT_NAME}:join`;
    static #TELEMETRY_LEAVE = `${this.#TELEMETRY_EVENT_NAME}:leave`;
    static #TELEMETRY_UPDATE = `${this.#TELEMETRY_EVENT_NAME}:update`;

    static get TELEMETRY_ROOM_PREFIX() { return this.#TELEMETRY_ROOM_PREFIX; }
    static get TELEMETRY_JOIN() { return this.#TELEMETRY_JOIN; }
    static get TELEMETRY_LEAVE() { return this.#TELEMETRY_LEAVE; }
    static get TELEMETRY_UPDATE() { return this.#TELEMETRY_UPDATE; }
}

export default EventRooms;