// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Channel from "../model/User";

class ChannelsStore {
    @observable loadingChannels = true;
    @observable loadingDetail = true;
    @observable errorFlag = false;
    @observable channels: Channel = [];
    @observable error;
    @observable cardsDetail: Object = {};
    @observable channel: any = {};
    @observable markDetail: Object = {};

    @observable dicasPontos = [
        { id: "lago", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488" },
        { id: "jardim", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/580874/feeds.json?results=2?id=281491" },
        { id: "puc", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/740676/feeds.json?results=2?id=281489" },
        { id: "uel", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/323194/feeds.json?results=2?id=281490" },
        { id: "utfpr", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281501/feeds.json?results=2?id=281492" }
    ]

    @action
    async getChannels(): React.node {
        this.loadingChannels = true;
        this.loadingDetail = true;
        axios.get("https://fep6atgqtd.execute-api.us-west-2.amazonaws.com/dev")
            .then((response) => {
                this.channels = response.data.body;
                this.cardsDetail = response.data.body;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
                this.loadingChannels = false;
                this.loadingDetail = false;
                console.log(this.error);
            });

        //LAGO
        axios.get(dicasPontos[0].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
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
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });

        //ZERAO
        axios.get(dicasPontos[2].urlDica)
            .then((response) => {
                this.markDetail = response.data.body[0];
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
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });


        //UTFPR
        axios.get(dicasPontos[4].urlDica)
            .then((response) => {
                console.log("response.data.body: " + response.data);
                // this.markDetail = response.data.body[0];
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
                this.loadingDetail = false;
            });
        this.loadingDetail = false;
        this.loadingChannels = false;
        console.log("Chegou aqui getChannels");
    }

    @action
    async getLocalization(): React.node {
        this.loadingLocalization = true;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.localization.latitude = position.coords.latitude;
                this.localization.longitude = position.coords.longitude;
                this.loadingLocalization = false;
            },
            (error) => this.localization.error = error,
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }
}

export default new ChannelsStore();
