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
        console.log(url);
        axios.get(url)
            .then((response) => {
                this.markDetail = response.data.body[0];
                this.loadingDetail = false;
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];
                this.airQualityMessage = this.markDetail.airQualityMessage[0];
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
export default new MapsStore();
