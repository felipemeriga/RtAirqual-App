// @flow
import {observable, action} from "mobx";
import axios from "axios";

class BoletimStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    @observable boletimDetail: Object = {};
    @observable boletim: Object = {};
    @observable error = false;
    @observable diarioMessage: Object = {};
    @observable rankingMessage: Object = {};
    @observable boletimMessage: Object = {};

    @action
    async getBoletim(): React.node {
        // this.boletim = boletim;
        this.dialogOn = true;
        this.loadingDetail = true;
        const url = "https://9sh2q766re.execute-api.us-west-2.amazonaws.com/dev";
        axios.get(url)
            .then((response) => {
                this.boletimDetail = response.data.body[0];
                this.loadingDetail = false;
                this.diarioMessage = this.boletimDetail.diario;
                this.boletimMessage = this.boletimDetail.boletim;
                this.rankingMessage = this.boletimDetail.ranking;

            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });
    }

    @action
    onTouchOutside(): React.node {
        this.loadingDetail = false;
        this.dialogOn = false;
        this.error = false;
    }
}
export default new BoletimStore();
