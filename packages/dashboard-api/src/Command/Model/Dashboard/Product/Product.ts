import BaseModel from '../../BaseModel';
import faker = require('faker/locale/en');

export default class Product extends BaseModel {
    public getProduct () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            idAli: () => BaseModel.rand(100000000, 999999999),
            image: () => faker.image.technics(50, 50),
            title: () => faker.commerce.productName(),
            status: () => faker.random.arrayElement(["active","hidden","disabled"]),
            price: () => faker.finance.amount(0.01, 100),
            listPrice: () => faker.finance.amount(0.01, 100),
            vendor: () => faker.commerce.department(),
            fullDescription: () => faker.lorem.paragraphs(10),
            quantity: () => BaseModel.rand(1, 1000),
            created: () => faker.date.past(),
        };
    }

    public getGeneralInformation () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            idAli: () => BaseModel.rand(100000000, 999999999),
            title: () => faker.commerce.productName(),
            status: () => faker.random.arrayElement(["active","hidden","disabled"]),
            price: () => faker.finance.amount(0.01, 100),
            vendor: () => faker.commerce.department(),
            fullDescription: () => faker.lorem.paragraphs(10),
            category: () => faker.commerce.productMaterial(),
            linkToDw: () => faker.internet.url(),
            linkToAli: () => faker.internet.url(),
        };
    }

    public getOptionsSettings () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            optionsType: () => faker.random.arrayElement(['simultaneous', 'sequential']),
            exceptionsType: () => faker.random.arrayElement(['forbidden', 'allowed']),
        };
    }

    public getPricingInventory () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
                idAli: () => BaseModel.rand(100000000, 999999999),
            listPrice: () => faker.finance.amount(0.01, 1000),
            inStock: () => faker.random.number(99999),
            zeroPriceAction: () => faker.random.arrayElement(['R', 'P', 'A']),
            inventory: () => faker.random.arrayElement(['B', 'D']),
            orderQuantityMin: () => BaseModel.rand(1, 10),
            orderQuantityMax: () => BaseModel.rand(11, 100),
            quantityStep: () => faker.random.number(999),
            listQuantityCount: () => faker.random.number(999),
            vat: () => faker.random.boolean(),
        };
    }

    public getAvailability () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            userGroups: () => ['All', 'Registered user'],
            creationDate: () => faker.date.past(),
            availSince: () => faker.date.past(),
            outOfStockActions: () => faker.random.arrayElement(['N', 'B', 'S']),
        };
    }

    public getExtra () {
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            shortDescription: () => faker.lorem.paragraphs(10),
            popularity: () => faker.random.word(),
            searchWords: () => faker.random.word(),
            promoText: () => faker.random.word(),
        };
    }
}