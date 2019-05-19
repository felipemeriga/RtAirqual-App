// @flow

export default class User {
    id: number;
    name: string;
    authenticationType: string;


    constructor(id: number, type: string, authenticationType: string) {
        this.id = id;
        this.type = type;
        this.authenticationType = authenticationType;
    }
}
