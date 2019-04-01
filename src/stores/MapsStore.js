// @flow
import {observable, action} from "mobx";
import axios from "axios";

class MapsStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    @observable markDetail: Object = {};
    @observable thermalConfortMessage: Object = {};
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
                this.loadingDetail = false;
                this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
                //console.log("thermalConfortMessage-------------------------------------------------------\n");
                //console.log(this.thermalConfortMessage);
                //console.log("marker----------------------------------------------------------------------\n");
                //console.log(this.marker);
                //console.log("markDetail------------------------------------------------------------------\n");
                //console.log(this.markDetail.thermalConfort);
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
