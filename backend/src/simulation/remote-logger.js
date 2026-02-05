import SimulationEvent from "../simulation/events/simulation-events.js";

const originalLog = console.log;
const originalError = console.error;

class SimulationLogs {

    static #INFO = 'INFO';
    static #WARNING = 'WARNING';
    static #ERROR = 'ERROR';

    static get INFO() { return this.#INFO; }
    static get WARNING() { return this.#WARNING; }
    static get ERROR() { return this.#ERROR; }
}

export const enableRemoteLogging = (io) => {
    
    console.log = (...args) => {
        originalLog.apply(console, args);

        const message = mapArgs(args);

        io.to(SimulationEvent.ROOM_PREFIX)
          .volatile //to drop packets if it becomes too much
          .emit(SimulationEvent.LOG, { type: SimulationLogs.INFO, message, timestamp: new Date() });
    };

    console.error = (...args) => {
        originalError.apply(console, args);

        const message = mapArgs(args);
        io.to(SimulationEvent.ROOM_PREFIX)
          .volatile
          .emit(SimulationEvent.LOG, { type: SimulationLogs.ERROR, message, timestamp: new Date() });
    };
};

function mapArgs(args) {
    return args
            .map(arg => (typeof arg === 'object') ? JSON.stringify(arg) : String(arg))
            .join(' ');
}
