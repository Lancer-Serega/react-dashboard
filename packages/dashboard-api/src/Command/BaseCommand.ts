import {Command} from "@sirian/console";
import {importSchema} from "graphql-import";
import * as path from "path";

export class BaseCommand extends Command {
    constructor() {
        super();

        this.definition.addOptions([]);
    }

    getTypeDefs() {
        return importSchema(path.join(__dirname, "../../resources/query.graphql"));
    }
}
