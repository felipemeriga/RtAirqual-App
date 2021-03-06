// @flow
import { observable, action } from "mobx";
import axios from "axios";

class MapsStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    @observable markDetail: Object = {};
    @observable thermalConfortMessage: Object = {};
    @observable relativeHumityMessage: Object = {};
    @observable airQualityMessage: Object = {};
    @observable marker: Object = {};
    @observable error = false;

    @action
    async getMarkDetail(mark: any): React.node {
        this.marker = mark;
        this.dialogOn = true;
        this.loadingDetail = true;
        const url = "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint="
            + mark.endPoint + "?id=" + mark.id;
            axios.get(url)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                if(!this.markDetail.relativeHumityMessage[0].message){
                    this.relativeHumityMessage = 'Forte sensação de abafado ao se exercitar. Risco: suor excessivo, fadiga precoce e queda de desempenho. Indica-se atividades mais leves.';
                }
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
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
        console.log("ontouchoutside");
        this.loadingDetail = false;
        this.dialogOn = false;
        this.error = false;
    }
}
export default new MapsStore();
