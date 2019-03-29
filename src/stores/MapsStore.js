// @flow
import {observable, action} from "mobx";
import axios from "axios";

class MapsStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    @observable markDetail: Object;
    @observable error = false;

    @action
    async getMarkDetail(mark: any): React.node {
        this.dialogOn = true;
        this.loadingDetail = true;
        axios.get(mark.endPoint)
            .then((response) => {
                this.markDetail = response.data.body;
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

export default new MapsStore();
