import BaseModel from '../../BaseModel';
import {MockList} from "graphql-tools";
import Post from "../Post/Post";
import faker = require('faker/locale/en');

export default class User extends BaseModel {

    public getUser () {
        const post = new Post();

        return {
            _id: () => this.createAutoIncrement(),
            name: () => faker.internet.userName(),
            email: () => faker.internet.email(),
            password: () => faker.internet.password(),
            created: () => faker.date.past(),
            posts: () => new MockList(BaseModel.rand(0, 10), post.getPost),
            stats: () => ({
                posts: BaseModel.rand(1, 20)
            })
        };
    }
}