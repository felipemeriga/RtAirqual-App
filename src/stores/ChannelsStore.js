// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Channel from "../model/Channel";

class ChannelsStore {
    @observable loading = false;
    @observable error = false;
    @observable channels = [];
    @observable error;


    @action
    getChannels = () => {
        this.loading = true;
        axios.get("https://fep6atgqtd.execute-api.us-west-2.amazonaws.com/dev")
            .then((response) => {
                response.data.forEach(ch => {
                    this.channels.push(new Channel(ch));
                });
                this.loading = false;
            })
            .catch((error) => {
                this.error = error;
                this.error = true;
            });
    }
}

export default new ChannelsStore();
