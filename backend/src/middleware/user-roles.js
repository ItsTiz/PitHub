class UserRole {
    static #USER = 'user';
    static #TEAM = 'team';
    static #ADMIN = 'admin';

    static get USER() { return this.#USER; }
    static get TEAM() { return this.#TEAM; }
    static get ADMIN() { return this.#ADMIN; }
}

export default UserRole;