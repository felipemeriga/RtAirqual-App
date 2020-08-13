// @flow
import {observable, action} from "mobx";
import axios from "axios";

class BoletimStore {
    @observable dialogOn = false;
    @observable loadingDetail = true;
    @observable boletimDetail: any = {};
    @observable boletim: any = {};
    @observable error = false;
    @observable diario: any = {};
    @observable historico: any = {};
    @observable ranking: any = {};
    @observable alertas: any = {};

    @observable listDiario = [];

    @observable listRanking = [];

    @observable listHistorico = [];

    @observable listAlertas = [];

    @action
    async getBoletim(): React.node {
        this.dialogOn = true;
        this.loadingDetail = true;
        const url = "https://9sh2q766re.execute-api.us-west-2.amazonaws.com/dev";
        axios.get(url)
            .then((response) => {
                this.boletimDetail = response.data.body;
                this.listRanking = [];
                this.diario = this.boletimDetail.diario;
                this.historico = this.boletimDetail.historico;
                this.alertas = this.boletimDetail.alertas;
                this.ranking = this.boletimDetail.ranking;

                const iterableListAlertas = [];
                this.alertas.forEach((item) => {
                    const alerta = {
                        id: item.ID,
                        categoria: item.categoria,
                        classificacao: item.classificacao,
                        descricao: item.descricao,
                        horario: item.horario,
                        localizacao: item.localizacao,
                    };
                    iterableListAlertas.push(alerta);
                });
                this.listAlertas = iterableListAlertas;

                this.listAlertas = this.listAlertas.sort((a, b) =>{
                    return a.id < b.id ? 1 : -1;
                });

                // Populating the Ranking List
                const iterableListRanking = [];
                this.ranking.forEach((item) => {
                    const ite = {
                        local: item.name,
                        descricao: item.mensagem,
                        id: item.ID,
                        data: item.data,
                        classificacao: item.classificacao
                    };
                    iterableListRanking.push(ite);
                });
                this.listRanking = iterableListRanking;
                // Populating the Diary list
                const iterableListDiario = [];
                this.diario.forEach((item) => {

                    iterableListDiario.push({
                        local: "Londrina",
                        descricao: item.descricao,
                        id: item.id
                    });
                });
                this.listDiario = iterableListDiario;

                // Populating the History list
                const iterableListHistory = [];
                this.diario.forEach((item) => {

                    iterableListHistory.push({
                        data: item.data,
                        descricao: item.descricao,
                        id: item.id
                    });
                });
                this.listHistorico = iterableListHistory;

                // ordenando rankings
                this.listRanking = this.listRanking.slice().sort(function (a, b) {
                    return a.id + b.id;
                });

                // ordenando historico
                this.listHistorico = this.listHistorico.slice().sort(function (a, b) {
                    return b.id + a.id;
                });
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
