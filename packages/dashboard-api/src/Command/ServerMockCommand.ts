import {IO, Option} from "@sirian/console";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import * as cors from "cors";
import * as express from "express";
import {addMockFunctionsToSchema, makeExecutableSchema, MockList} from "graphql-tools";
import * as morgan from "morgan";
import {DateTimeType} from "../GraphQL/DateTimeType";
import {BaseCommand} from "./BaseCommand";
import bodyParser = require("body-parser");

export class ServerMockCommand extends BaseCommand {
    constructor() {
        super();

        this.definition.addOptions({
            port: new Option({default: 3000, valueRequired: true}),
            locale: new Option({valueRequired: true, default: "en"})
        });
    }

    execute(io: IO) {
        const app = express();

        const schema = this.getSchema(io);
        const graphql = graphqlExpress({schema});

        app.use(morgan("combined"));

        app.use("/graphql", cors(), bodyParser.json(), graphql);
        app.use("/console", graphiqlExpress({endpointURL: "/graphql"}));

        let port = +io.input.getOption("port");
        app.listen(port);

        io.writeln(`Server listen at <info>http://127.0.0.1:${port}</info>`);
    }

    getSchema(io: IO) {
        const schema = makeExecutableSchema({
            typeDefs: this.getTypeDefs(),
            resolverValidationOptions: {
                requireResolversForResolveType: false
            },
            resolvers: {
                DateTime: DateTimeType
            }
        });

        addMockFunctionsToSchema({
            schema,
            mocks: this.getMocks(io),
            preserveResolvers: true
        });

        return schema;
    }

    getMocks(io: IO) {
        const input = io.input;
        const incUserId = this.createAutoIncrement();
        const incPostId = this.createAutoIncrement();
        const incProductId = this.createAutoIncrement();
        const faker: Faker.FakerStatic = require(`faker/locale/${input.getOption("locale")}`);

        const rand = (min = 1, max = 10) => Math.round((Math.random() * (max - min)) + min);
        const user = () => ({
            _id: () => incUserId(),
            name: () => faker.internet.userName(),
            email: () => faker.internet.email(),
            password: () => faker.internet.password(),
            created: () => faker.date.past(),
            posts: () => new MockList(rand(0, 10), post),
            stats: () => ({
                posts: rand(1, 20)
            })
        });

        const post = () => ({
            _id: () => incPostId(),
            text: () => faker.lorem.paragraph(),
            user_id: () => rand(1, 100),
            created: () => faker.date.past(),
            user
        });

        const product = () => ({
            _id: () => incProductId(),
            name: () => faker.commerce.productName(),
            code: () => faker.commerce.productName(),
            price: () => faker.finance.amount(0.01, 100),
            list_price: () => faker.finance.amount(0.01, 100),
            quantity: () => rand(1, 1000),
            created: () => faker.date.past(),
        });

        return {
            Query: () => ({
                posts: (root: any, {limit}: any) => {
                    return ({
                        skip: limit.skip,
                        limit: limit.limit,
                        count: 45231,
                        node: () => new MockList(limit.limit, post)
                    });
                },
                users: (root: any, {limit}: any) => {
                    return ({
                        skip: limit.skip,
                        limit: limit.limit,
                        count: 3215,
                        node: () => new MockList(limit.limit, user)
                    });
                },
                products: (root: any, {limit}: any) => {
                    return ({
                        skip: limit.skip,
                        limit: limit.limit,
                        count: 5231,
                        node: () => new MockList(limit.limit, product)
                    });
                }
            }),
            User: user,
            Post: post,
            Product: product,
            DateTime: () => new Date()
        };
    }

    createAutoIncrement() {
        let id = 1;
        return () => {
            return id++;
        };
    }
}
