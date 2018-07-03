import {observable} from "mobx";

export class LocalState {
    @observable
    public collapsed: boolean = false;

    constructor() {
        Object.assign(this, this.restore());
    }

    private restore() {
        const state = localStorage.getItem("local-state");
        if (state) {
            return JSON.parse(state);
        }
    }

    save = (state: Partial<LocalState>) => {
        localStorage.setItem("local-state", JSON.stringify(Object.assign(this, state)));
    }
}