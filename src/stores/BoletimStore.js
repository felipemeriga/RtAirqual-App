// @flow
import { observable, action } from "mobx";
import axios from "axios";

class BoletimStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    @observable boletimDetail: any = {};
    @observable boletim: any = {};
    @observable error = false;
    @observable diario: any = {};
    @observable historico: any = {};
    @observable ranking: any = {};

    @action
    async getBoletim(): React.node {
        this.dialogOn = true;
        this.loadingDetail = true;
        const url = "https://9sh2q766re.execute-api.us-west-2.amazonaws.com/dev";
        axios.get(url)
            .then((response) => {
                this.boletimDetail = response.data.body;
                this.loadingDetail = false;
                this.diario = this.boletimDetail.diario;
                this.historico = this.boletimDetail.historico;
                this.ranking = this.boletimDetail.ranking;
                console.log(response.data.body);
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
