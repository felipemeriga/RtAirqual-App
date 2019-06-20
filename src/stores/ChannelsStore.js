// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Channel from "../model/User";

class ChannelsStore {
    @observable loadingLocalization = false;
    @observable loadingChannels = false;
    @observable errorFlag = false;
    @observable channels: Channel = [];
    @observable error;

    @observable localization = {
        latitude: Number,
        longitude: Number,
        error: String
    };

    @action
    async getChannels(): React.node {
        this.loading = true;
        axios.get("https://fep6atgqtd.execute-api.us-west-2.amazonaws.com/dev")
            .then((response) => {
                this.channels = response.data.body;
                this.loading = false;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
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
