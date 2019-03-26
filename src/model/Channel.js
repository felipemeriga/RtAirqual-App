// @flow
import {observable} from "mobx";


export default class Channel {
    @observable id: number;
    @observable lastEntryId: number;
    @observable name: string;
    @observable field1: string;
    @observable field2: string;
    @observable field3: string;
    @observable field4: string;
    @observable description: string;
    @observable longitude: string;
    @observable elevation: string;
    @observable endPoint: string;
    @observable updatedAt: string;
    @observable createdAt: string;
    constructor(value: object) {
        this.id = value.id;
    }

}
