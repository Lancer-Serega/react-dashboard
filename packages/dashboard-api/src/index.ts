import {Application} from "@sirian/console";
import {ServerMockCommand} from "./Command/ServerMockCommand";

const app = new Application();
app.addCommands([
    ServerMockCommand
]);

app.run();
