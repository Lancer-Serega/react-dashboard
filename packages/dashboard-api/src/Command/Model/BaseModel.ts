export default class BaseModel {
    protected static rand (min = 1, max = 10) {
        return Math.round((Math.random() * (max - min)) + min);
    }

    public createAutoIncrement() {
        let id = 1;
        return () => {
            return id++;
        };
    }
}