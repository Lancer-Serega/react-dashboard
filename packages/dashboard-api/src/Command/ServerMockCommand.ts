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
        const incOrderId = this.createAutoIncrement();
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

        const order = () => ({
            _id: () => incOrderId(),
            numberDW: () => rand(100000000, 999999999),
            numberAli: () => rand(100000000, 999999999),
            created  : () => faker.date.past(),
            statusDW: () => faker.random.arrayElement(["processed","completed","open","failed","canceled","backordered"]),
            statusAli: () => faker.random.arrayElement(["processed","shipped","created","failed"]),
            trackingNumber: () => faker.random.alphaNumeric(13),
            vendor: () => faker.random.words(2),
            cost: () => faker.finance.amount(0.01, 1000),
            buyer: () => faker.random.words(3),
            errorsNotes: () => faker.random.words(10),
        });

        const product = () => ({
            _id: () => incProductId(),
            idAli: () => rand(100000000, 999999999),
            image: () => faker.image.technics(50, 50),
            title: () => faker.commerce.productName(),
            status: () => faker.random.arrayElement(["active","hidden","disabled"]),
            price: () => faker.finance.amount(0.01, 100),
            listPrice: () => faker.finance.amount(0.01, 100),
            vendor: () => faker.commerce.department(),
            fullDescription: () => faker.lorem.paragraphs(10),
            quantity: () => rand(1, 1000),
            created: () => faker.date.past(),
        });

        const productGeneralInformation = () => ({
            _id: () => incProductId(),
            idAli: () => rand(100000000, 999999999),
            title: () => faker.commerce.productName(),
            status: () => faker.random.arrayElement(["active","hidden","disabled"]),
            price: () => faker.finance.amount(0.01, 100),
            vendor: () => faker.commerce.department(),
            fullDescription: () => faker.lorem.paragraphs(10),
            category: () => faker.commerce.productMaterial(),
            linkToDw: () => faker.internet.url(),
            linkToAli: () => faker.internet.url(),
        });

        const productOptionsSettings = () => ({
            _id: () => incProductId(),
            optionsType: () => faker.random.arrayElement(['simultaneous', 'sequential']),
            exceptionsType: () => faker.random.arrayElement(['forbidden', 'allowed']),
        });

        const productPricingInventory = () => ({
            _id: () => incProductId(),
            idAli: () => rand(100000000, 999999999),
            listPrice: () => faker.finance.amount(0.01, 1000),
            inStock: () => faker.random.number(99999),
            zeroPriceAction: () => faker.random.arrayElement(['R', 'P', 'A']),
            inventory: () => faker.random.arrayElement(['B', 'D']),
            orderQuantityMin: () => rand(1, 10),
            orderQuantityMax: () => rand(11, 100),
            quantityStep: () => faker.random.number(999),
            listQuantityCount: () => faker.random.number(999),
            vat: () => faker.random.boolean(),
        });

        const productAvailability = () => ({
            _id: () => incProductId(),
            userGroups: () => ['All', 'Registered user'],
            creationDate: () => faker.date.past(),
            availSince: () => faker.date.past(),
            outOfStockActions: () => faker.random.arrayElement(['N', 'B', 'S']),
        });

        const productExtra = () => ({
            _id: () => incProductId(),
            shortDescription: () => faker.lorem.paragraphs(10),
            popularity: () => faker.random.word(),
            searchWords: () => faker.random.word(),
            promoText: () => faker.random.word(),
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
                },
                orders: (root: any, {limit}: any) => {
                    return ({
                        skip: limit.skip,
                        limit: limit.limit,
                        count: 2048,
                        node: () => new MockList(limit.limit, order)
                    });
                }
            }),
            User: user,
            Post: post,
            Order: order,
            Product: product,
            ProductGeneralInformation: productGeneralInformation,
            ProductOptionsSettings: productOptionsSettings,
            ProductPricingInventory: productPricingInventory,
            ProductAvailability: productAvailability,
            ProductExtra: productExtra,
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
