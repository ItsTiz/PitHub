class Errors {
    // 4xx
    static #BAD_REQUEST = 400;
    static #NOT_FOUND = 404;
    
    // 5xx
    static #GENERIC_SERVER = 500;

    static get BAD_REQUEST() { return this.#BAD_REQUEST; }
    static get NOT_FOUND() { return this.#NOT_FOUND; }
    static get GENERIC_SERVER() { return this.#GENERIC_SERVER; }
}

export default Errors;