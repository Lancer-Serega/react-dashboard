import BaseModel from '../../BaseModel';
import Product from "../Product/Product";
import faker = require('faker/locale/en');

export default class Order extends BaseModel {
    public getOrder () {
        const product = new Product();
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            numberDW: () => BaseModel.rand(100000000, 999999999),
            vendorNumber: () => BaseModel.rand(100000000, 999999999),
            created  : () => faker.date.past(),
            statusDW: () => faker.random.arrayElement(["processed","completed","open","failed","canceled","backordered"]),
            vendorStatus: () => faker.random.arrayElement(["processed","shipped","created","failed"]),
            trackingNumber: () => [faker.random.alphaNumeric(13), faker.random.alphaNumeric(13)],
            vendorName: () => faker.random.words(2),
            cost: () => faker.finance.amount(0.01, 1000),
            buyerName: () => faker.random.words(3),
            errorNotes: () => [faker.random.words(10)],
        };
    }
}