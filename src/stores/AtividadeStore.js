// @flow
import axios from "axios";
import {observable, action} from "mobx";

class AtividadeStore {
    @action
    // async getReportActivity(user: any): React.Node {
    async getReportActivity(): React.Node {
        await axios.post("https://igiy8d9iwa.execute-api.us-west-2.amazonaws.com/dev/", {
                data: "11/01/2019",
                esforço: "moderacasdado",
                tipo: "corriasdda",
                user_id: "1231231"
        })
            .then((response) => {
                console.log(JSON.stringify("Resposta: "));
                console.log(JSON.stringify(response));
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                this.signInError("Erro ao conectar ao servidor");
                //alert
            });
    }
}
export default new AtividadeStore();
