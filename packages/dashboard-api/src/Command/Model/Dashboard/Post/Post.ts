import BaseModel from '../../BaseModel';
import User from "../User/User";
import faker = require('faker/locale/en');

export default class Post extends BaseModel {
    public getPost () {
        const user = new User();
        return {
            _id: () => 1,//BaseModel.createAutoIncrement(),
            text: () => faker.lorem.paragraph(),
            user_id: () => BaseModel.rand(1, 100),
            created: () => faker.date.past(),
            user: user.getUser()
        };
    }
}