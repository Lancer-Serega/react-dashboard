import {computed, observable, transaction} from "mobx";

export class SearchStore {
    @observable
    public value?: string;

    @computed get is() {
        return Boolean(this.value);
    }

    constructor() {
        // you can restore search state here from query string for example
    }

    handleUpdate = (value: string) => {
        this.value = value;
    };

    reset = (callback?: Function) => {
        transaction(() => {
            if (this.is) {
                this.value = "";
            }

            callback && callback();
        });
    }
}