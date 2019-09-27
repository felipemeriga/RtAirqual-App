// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Channel from "../model/User";

class ChannelsStore {
    // @observable loadingLocalization = true;
    @observable loadingChannels = true;
    @observable loadingDetail = true;
    @observable errorFlag = false;
    @observable channels: Channel = [];
    @observable error;
    @observable cardsDetail: Object = {};
    @observable thermalConfortMessage: Object = {};
    @observable relativeHumityMessage: Object = {};
    @observable airQualityMessage: Object = {};
    @observable markDetail: Object = {};

    @observable dicasPontos = [
        { id: "lago", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488" },
        { id: "jardim", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/580874/feeds.json?results=2?id=281491" },
        { id: "puc", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/740676/feeds.json?results=2?id=281489" },
        { id: "uel", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/323194/feeds.json?results=2?id=281490" },
        { id: "utfpr", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281501/feeds.json?results=2?id=281492" }
    ]

    // @observable localization = {
    //     latitude: Number,
    //     longitude: Number,
    //     error: String
    // };

    @action
    async getChannels(): React.node {
        this.loadingChannels = true;
        axios.get("https://fep6atgqtd.execute-api.us-west-2.amazonaws.com/dev")
            .then((response) => {
                this.channels = response.data.body;
                this.cardsDetail = response.data.body;
                // this.loadingChannels = false;
                console.log('atualizou valores');
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
                this.loadingChannels = false;
                console.log(this.error);
            });

        //LAGO
        axios.get(dicasPontos[0].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if (this.markDetail.relativeHumityMessage.length < 1) {
                    this.markDetail.relativeHumityMessage = this.markDetail.thermalConfortMessage;
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
                this.dicasPontos[0].dicaTemp = this.thermalConfortMessage.message;
                if (this.thermalConfortMessage.message === this.relativeHumityMessage.message) {
                    this.dicasPontos[0].dicaUmid = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                } else {
                    this.dicasPontos[0].dicaUmid = this.relativeHumityMessage.message;
                }
                this.dicasPontos[0].dicaAirq = this.airQualityMessage.message;
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });


        //JARDIM
        axios.get(dicasPontos[1].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if (this.markDetail.relativeHumityMessage.length < 1) {
                    this.markDetail.relativeHumityMessage = this.markDetail.thermalConfortMessage;
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
                this.dicasPontos[1].dicaTemp = this.thermalConfortMessage.message;
                if (this.thermalConfortMessage.message === this.relativeHumityMessage.message) {
                    this.dicasPontos[1].dicaUmid = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                } else {
                    this.dicasPontos[1].dicaUmid = this.relativeHumityMessage.message;
                }
                this.dicasPontos[1].dicaAirq = this.airQualityMessage.message;
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });

        //PUC
        axios.get(dicasPontos[2].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if (this.markDetail.relativeHumityMessage.length < 1) {
                    this.markDetail.relativeHumityMessage = this.markDetail.thermalConfortMessage;
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
                this.dicasPontos[2].dicaTemp = this.thermalConfortMessage.message;
                if (this.thermalConfortMessage.message === this.relativeHumityMessage.message) {
                    this.dicasPontos[2].dicaUmid = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                } else {
                    this.dicasPontos[2].dicaUmid = this.relativeHumityMessage.message;
                }
                this.dicasPontos[2].dicaAirq = this.airQualityMessage.message;
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });


        //UEL
        axios.get(dicasPontos[3].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if (this.markDetail.relativeHumityMessage.length < 1) {
                    this.markDetail.relativeHumityMessage = this.markDetail.thermalConfortMessage;
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
                this.dicasPontos[3].dicaTemp = this.thermalConfortMessage.message;
                if (this.thermalConfortMessage.message === this.relativeHumityMessage.message) {
                    this.dicasPontos[3].dicaUmid = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                } else {
                    this.dicasPontos[3].dicaUmid = this.relativeHumityMessage.message;
                }
                this.dicasPontos[3].dicaAirq = this.airQualityMessage.message;
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });


        //UTFPR
        axios.get(dicasPontos[4].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if (this.markDetail.relativeHumityMessage.length < 1) {
                    this.markDetail.relativeHumityMessage = this.markDetail.thermalConfortMessage;
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
                this.dicasPontos[4].dicaTemp = this.thermalConfortMessage.message;
                if (this.thermalConfortMessage.message === this.relativeHumityMessage.message) {
                    this.dicasPontos[4].dicaUmid = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                } else {
                    this.dicasPontos[4].dicaUmid = this.relativeHumityMessage.message;
                }
                this.dicasPontos[4].dicaAirq = this.airQualityMessage.message;
                // console.log("Dados Lago...");
                // console.log(this.dicasPontos[0].dicaTemp + "\n");
                // console.log(this.dicasPontos[0].dicaUmid + "\n");
                // console.log(this.dicasPontos[0].dicaAirq + "\n" + "\n" + "\n");
                
                // console.log("Dados Jardim...");
                // console.log(this.dicasPontos[1].dicaTemp + "\n");
                // console.log(this.dicasPontos[1].dicaUmid + "\n");
                // console.log(this.dicasPontos[1].dicaAirq + "\n" + "\n" + "\n");

                // console.log("Dados PUC...");
                // console.log(this.dicasPontos[2].dicaTemp + "\n");
                // console.log(this.dicasPontos[2].dicaUmid + "\n");
                // console.log(this.dicasPontos[2].dicaAirq + "\n" + "\n" + "\n");

                // console.log("Dados UEL...");
                // console.log(this.dicasPontos[3].dicaTemp + "\n");
                // console.log(this.dicasPontos[3].dicaUmid + "\n");
                // console.log(this.dicasPontos[3].dicaAirq + "\n" + "\n" + "\n");

                // console.log("Dados UTFPR...");
                // console.log(this.dicasPontos[4].dicaTemp + "\n");
                // console.log(this.dicasPontos[4].dicaUmid + "\n");
                // console.log(this.dicasPontos[4].dicaAirq + "\n" + "\n" + "\n");
                this.loadingChannels = false;
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });
    }

    // @action
    // async getDica(urlCard): React.node {
    //     this.dialogOn = true;
    //     this.loadingDetail = true;
    //     const url = urlCard;
    //     console.log(url);
    //     axios.get(url)
    //         .then((response) => {
    //             this.markDetail = response.data.body[0];
    //             this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
    //             this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
    //             this.airQualityMessage = this.markDetail.airQualityMessage[0];
    //             this.loadingDetail = false;
    //             // console.log(this.thermalConfortMessage);
    //             // console.log(this.relativeHumityMessage);
    //             // console.log(this.airQualityMessage);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             this.error = true;
    //             this.loadingDetail = false;
    //         });
    // }
    // @action
    // async getLocalization(): React.node {
    //     this.loadingLocalization = true;
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.localization.latitude = position.coords.latitude;
    //             this.localization.longitude = position.coords.longitude;
    //             this.loadingLocalization = false;
    //         },
    //         (error) => this.localization.error = error,
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //     );
    // }
}

export default new ChannelsStore();
