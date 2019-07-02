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

    listDiario = [];

    listRanking = [];

    listHistorico = [];

    @action
    async getBoletim(): React.node {
        this.dialogOn = true;
        this.loadingDetail = true;
        const url = "https://9sh2q766re.execute-api.us-west-2.amazonaws.com/dev";
        axios.get(url)
            .then((response) => {
                this.boletimDetail = response.data.body;
                
                this.diario = this.boletimDetail.diario;
                this.historico = this.boletimDetail.historico;
                this.ranking = this.boletimDetail.ranking;

                for (i in this.ranking) {
                    listRanking.push({
                        local: this.ranking[i].name,
                        descricao: this.ranking[i].mensagem,
                        id: this.ranking[i].ID
                    });
                }

                for (i in this.diario) {
                    listDiario.push({
                        local: "Londrina", descricao: this.diario[i].descricao
                    });
                }

                for (i in this.historico) {
                    listHistorico.push({
                        data: this.historico[i].data, descricao: this.historico[i].descricao,
                        id: this.historico[i].id
                    });                   
                }

                //ordenando rankings
                listRanking=listRanking.sort(function(a, b) {
                    return a.id - b.id;
                });

                //ordenando historico
                listHistorico=listHistorico.sort(function(a, b) {
                    return  b.id - a.id;
                });
                console.log("rodou boletim store");
                this.loadingDetail = false;
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
