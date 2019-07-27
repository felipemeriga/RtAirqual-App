// @flow
import { observable, action } from "mobx";
import axios from "axios";

class CardStore {
    @observable dialogOn = false;
    @observable loadingDetail = false;
    // @observable markDetail: Object = {};
    @observable cardDetail: Object = {};
    // @observable thermalConfortMessage: Object = {};
    // @observable relativeHumityMessage: Object = {};
    // @observable airQualityMessage: Object = {};
    @observable marker: Object = {};
    @observable markerCard: Object = {};
    @observable error = false;

    // @action
    // async getCardDetail(mark: any): React.node {
    //     //console.log("bateu maps");
    //     this.marker = mark;
    //     this.dialogOn = true;
    //     this.loadingDetail = true;
    //     const url = "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint="
    //         + mark.endPoint + "?id=" + mark.id;
    //         console.log(url);
    //         axios.get(url)
    //         .then((response) => {
    //             this.markDetail = response.data.body[0];
    //             this.loadingDetail = false;
    //             this.thermalConfortMessage = this.markDetail.thermalConfortMessage[0];
    //             this.relativeHumityMessage = this.markDetail.relativeHumityMessage[0];              
    //             this.airQualityMessage = this.markDetail.airQualityMessage[0];
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             this.error = true;
    //             this.loadingDetail = false;
    //         });
    // }

    @action
    async getCardDetail(card: any): React.node {
        // console.log("bateu card");
        // this.markerCard = card;
        const url = "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint="
            + card.endPoint + "?id=" + card.id;

            console.log("CARD URL: " + url);
        axios.get(url)
            .then((responseCard) => {
                this.cardDetail = responseCard.data.body[0];
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
            });
            //console.log("CARD: " + this.markDetailCards.entry_id);
    }

    @action
    onTouchOutside(): React.node {
        console.log("ontouchoutside");
        this.loadingDetail = false;
        this.dialogOn = false;
        this.error = false;
    }
}
export default new CardStore();