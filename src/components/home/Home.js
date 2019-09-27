// @flow
import * as Progress from "react-native-progress";
import { StyleSheet, View, Image, Text, ImageBackground, Alert } from "react-native";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseContainer } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import Styles from "../pure-components/Styles";
import { Container, Content, Card, CardItem, Body, Thumbnail, Icon, Button, Left, Right } from "native-base";
import variables from "../../../native-base-theme/variables/commonColor";

pontos = [
    { id: "lago", temp: 0, umid: 0, airq: 0 }, //0
    { id: "jardim", temp: 0, umid: 0, airq: 0 }, //1
    { id: "puc", temp: 0, umid: 0, airq: 0 },  //2
    { id: "uel", temp: 0, umid: 0, airq: 0 }, //3
    { id: "utfpr", temp: 0, umid: 0, airq: 0 }//4
]

dicasPontos = [
    { id: "lago", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488" },
    { id: "jardim", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/580874/feeds.json?results=2?id=281491" },
    { id: "puc", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/740676/feeds.json?results=2?id=281489" },
    { id: "uel", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/323194/feeds.json?results=2?id=281490" },
    { id: "utfpr", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281501/feeds.json?results=2?id=281492" }
]

@inject("channelsStore")
@inject("mapsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {

    constructor() {
        super();
        this.state = {
            status: false
        }
    }

    ShowHideTextComponentView() {
        if (this.state.status == true) {
            this.setState({ status: false });
        }
        else {
            this.setState({ status: true });
        }
    }

    componentWillUnmount() {
    }

    componentWillMount() {
        this.props.channelsStore.getChannels();
    }

    componentDidUpdate(): React.Node {
    }

    renderContent = () => {
        if (this.props.channelsStore.loadingChannels) {
            return (
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Progress.Circle
                        size={65} indeterminate
                        color="#FFF"
                        borderWidth={5}
                    />
                    <Text style={style.textoLoading}>Recebendos dados...</Text>
                </View>
            );
        } else {
            this.getTempUmidAirqToCards();
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            if (hours < 10) {
                hours = "0" + hours;
            }
            var min = new Date().getMinutes(); //Current Minutes
            if (min < 10) {
                min = "0" + min;
            }
            var sec = new Date().getSeconds(); //Current Seconds
            if (sec < 10) {
                sec = "0" + sec;
            }
            const data = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
            return (
                    <Content>
                        <Card>
                            <CardItem style={style.cardItem}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/images/atk_icon_black.png')} />
                                    <Body>
                                        <Text style={style.textoNomePonto}>Lago Igapó</Text>
                                        <Text style={style.textoDica}>{data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='#fff'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                        />
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={style.cardItem}>
                                <ImageBackground source={require('../../../assets/images/ponto_lago.png')} style={{ height: 250, width: null, flex: 1 }} >
                                    <View style={style.viewBotaoDados}>
                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorTemp(pontos[0].temp),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[0].dicaTemp)}
                                        >
                                            <Text style={style.textoBotaoDados}>Conforto térmico: {'\n'} {pontos[0].temp} °C</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorUmi(pontos[0].umid),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[0].dicaUmid)}
                                        >
                                            <Text style={style.textoBotaoDados}>Umidade relativa: {'\n'} {pontos[0].umid}%</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorPolu(pontos[0].airq),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[0].dicaAirq)}
                                        >
                                            <Text style={style.textoBotaoDados}>Qualidade do ar: {'\n'} {pontos[0].airq}</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={style.textoDica}>
                                            {"Conforto térmico:\n" + this.props.channelsStore.dicasPontos[0].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Umidade relativa:\n" + this.props.channelsStore.dicasPontos[0].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Qualidade do ar:\n" + this.props.channelsStore.dicasPontos[0].dicaAirq + "\n"}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>
                        <Card>
                            <CardItem style={style.cardItem}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/images/atk_icon_black.png')} />
                                    <Body>
                                        <Text style={style.textoNomePonto}>Jardim Botânico</Text>
                                        <Text note> {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        {/* <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text> */}
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={style.cardItem}>
                                <ImageBackground source={require('../../../assets/images/ponto_jardimbotanico.png')} style={{ height: 250, width: null, flex: 1 }} >
                                    <View style={style.viewBotaoDados}>
                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorTemp(pontos[1].temp),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[1].dicaTemp)}
                                        >
                                            <Text style={style.textoBotaoDados}>Conforto térmico: {'\n'} {pontos[1].temp} °C</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorUmi(pontos[1].umid),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[1].dicaUmid)}
                                        >
                                            <Text style={style.textoBotaoDados}>Umidade relativa: {'\n'} {pontos[1].umid}%</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorPolu(pontos[1].airq),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[1].dicaAirq)}
                                        >
                                            <Text style={style.textoBotaoDados}>Qualidade do ar: {'\n'} {pontos[1].airq}</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={style.textoDica}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[1].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[1].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[1].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={style.cardItem}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/images/atk_icon_black.png')} />
                                    <Body>
                                        <Text style={style.textoNomePonto}>Pista de atletismo - UEL</Text>
                                        <Text note> {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        {/* <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text> */}
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={style.cardItem}>
                                <ImageBackground source={require('../../../assets/images/ponto_uel.png')} style={{ height: 250, width: null, flex: 1 }} >
                                    <View style={style.viewBotaoDados}>
                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorTemp(pontos[3].temp),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[3].dicaTemp)}
                                        >
                                            <Text style={style.textoBotaoDados}>Conforto térmico: {'\n'} {pontos[3].temp} °C</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorUmi(pontos[3].umid),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[3].dicaUmid)}

                                        >
                                            <Text style={style.textoBotaoDados}>Umidade relativa: {'\n'} {pontos[3].umid}%</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorPolu(pontos[3].airq),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[3].dicaAirq)}

                                        >
                                            <Text style={style.textoBotaoDados}>Qualidade do ar: {'\n'} {pontos[3].airq}</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={style.textoDica}>
                                            {"Conforto térmico:\n" + this.props.channelsStore.dicasPontos[3].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Umidade relativa:\n" + this.props.channelsStore.dicasPontos[3].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Qualidade do ar:\n" + this.props.channelsStore.dicasPontos[3].dicaAirq + "\n"}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={style.cardItem}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/images/atk_icon_black.png')} />
                                    <Body>
                                        <Text style={style.textoNomePonto}>UTFPR</Text>
                                        <Text note> {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        {/* <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text> */}
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={style.cardItem}>
                                <ImageBackground source={require('../../../assets/images/ponto_utfpr.png')} style={{ height: 250, width: null, flex: 1 }} >
                                    <View style={style.viewBotaoDados}>
                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorTemp(pontos[4].temp),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[4].dicaTemp)}
                                        >
                                            <Text style={style.textoBotaoDados}>Conforto térmico: {'\n'} {pontos[4].temp} °C</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorUmi(pontos[4].umid),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[4].dicaUmid)}
                                        >
                                            <Text style={style.textoBotaoDados}>Umidade relativa: {'\n'} {pontos[4].umid}%</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorPolu(pontos[4].airq),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[4].dicaAirq)}
                                        >
                                            <Text style={style.textoBotaoDados}>Qualidade do ar: {'\n'} {pontos[4].airq}</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={style.textoDica}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[4].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[4].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[4].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={style.cardItem}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/images/atk_icon_black.png')} />
                                    <Body>
                                        <Text style={style.textoNomePonto}>Zerão</Text>
                                        <Text note> {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        {/* <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text> */}
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={style.cardItem}>
                                <ImageBackground source={require('../../../assets/images/ponto_zerao.png')} style={{ height: 250, width: null, flex: 1 }} >
                                    <View style={style.viewBotaoDados}>
                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorTemp(pontos[2].temp),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[2].dicaTemp)}
                                        >
                                            <Text style={style.textoBotaoDados}>Conforto térmico: {'\n'} {pontos[2].temp} °C</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorUmi(pontos[2].umid),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[2].dicaUmid)}
                                        >
                                            <Text style={style.textoBotaoDados}>Umidade relativa: {'\n'} {pontos[2].umid}%</Text>
                                        </Button>

                                        <Button transparent large style={{
                                            borderWidth: 3,
                                            borderColor: this.retornaCorPolu(pontos[2].airq),
                                            flex: 1,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            margin: 3
                                        }}
                                            // onPress={() => this.ShowHideTextComponentView()}
                                            onPress={() => this.exibeDialogDica(this.props.channelsStore.dicasPontos[2].dicaAirq)}
                                        >
                                            <Text style={style.textoBotaoDados}>Qualidade do ar: {'\n'} {pontos[2].airq}</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={style.textoDica}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[2].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[2].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={style.textoDica}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[2].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>
                    </Content>
            );
        }
    }

    exibeDialogDica(dica){
        console.log(dica);
        Alert.alert(
            'Dica:',
            dica,
            [
              {text: 'Voltar'}
            ],
            {cancelable: true},
          );
    }

    getTempUmidAirqToCards() {
        //PUC PONTOS[2] cardsDetail[0]
        pontos[2].temp = parseFloat(this.props.channelsStore.cardsDetail[0].lastValues.thermalConfort).toFixed(1);
        pontos[2].umid = parseFloat(this.props.channelsStore.cardsDetail[0].lastValues.moisture).toFixed(0);
        pontos[2].airq = this.props.channelsStore.cardsDetail[0].lastValues.airQuality;

        //LAGO IGAPO PONTOS[0] cardsDetail[1]
        pontos[0].temp = parseFloat(this.props.channelsStore.cardsDetail[1].lastValues.thermalConfort).toFixed(1);
        pontos[0].umid = parseFloat(this.props.channelsStore.cardsDetail[1].lastValues.moisture).toFixed(0);
        pontos[0].airq = this.props.channelsStore.cardsDetail[1].lastValues.airQuality;

        //JARDIM BOTANICO PONTOS[1] cardsDetail[2]
        pontos[1].temp = parseFloat(this.props.channelsStore.cardsDetail[2].lastValues.thermalConfort).toFixed(1);
        pontos[1].umid = parseFloat(this.props.channelsStore.cardsDetail[2].lastValues.moisture).toFixed(0);
        pontos[1].airq = this.props.channelsStore.cardsDetail[2].lastValues.airQuality;

        //PISTA ATLETISMO UEL PONTOS[3] cardsDetail[3]
        pontos[3].temp = parseFloat(this.props.channelsStore.cardsDetail[3].lastValues.thermalConfort).toFixed(1);
        pontos[3].umid = parseFloat(this.props.channelsStore.cardsDetail[3].lastValues.moisture).toFixed(0);
        pontos[3].airq = this.props.channelsStore.cardsDetail[3].lastValues.airQuality;

        //UTF PONTOS[4] cardsDetail[4]
        pontos[4].temp = parseFloat(this.props.channelsStore.cardsDetail[4].lastValues.thermalConfort).toFixed(1);
        pontos[4].umid = parseFloat(this.props.channelsStore.cardsDetail[4].lastValues.moisture).toFixed(0);
        pontos[4].airq = this.props.channelsStore.cardsDetail[4].lastValues.airQuality;
    }


    render(): React.Node {
        const sectionName = "Pontos";
        return (
            <BaseContainer title={sectionName} navigation={this.props.navigation}>
                {this.renderContent()}
            </BaseContainer>
        );
    }

    retornaCorTemp(temperatura) {
        temperatura = parseFloat(temperatura);
        if (temperatura <= 13) { return "#604a7e"; }
        else
            if (temperatura > 13 && temperatura <= 19) { return "#19d1b6"; }
            else
                if (temperatura > 19 && temperatura <= 26) { return "#04f008"; }
                else
                    if (temperatura > 26 && temperatura <= 32) { return "#f79646"; }
                    else
                        if (temperatura > 32 && temperatura <= 39) { return "#ff0000"; }
                        else
                            return "#8b0000"
    }

    retornaCorUmi(umidade) {
        umidade = parseFloat(umidade);
        if (umidade <= 25) { return "#ff0000" }
        else
            if (umidade > 25 && umidade <= 40) { return "#ffbf00" }
            else
                if (umidade > 40 && umidade <= 60) { return "#04f008" }
                else
                    if (umidade > 60 && umidade <= 80) { return "#ffbf00" }
                    else
                        return "#8b0000"
    }

    retornaCorPolu(poluicao) {
        poluicao = parseFloat(poluicao);
        if (poluicao <= 40) { return "#04f008" }
        else
            if (poluicao > 40 && poluicao <= 80) { return "#ffbf00" }
            else
                if (poluicao > 80 && poluicao <= 120) { return "#f79646" }
                else
                    if (poluicao > 120 && poluicao <= 200) { return "#ff0000" }
                    else
                        return "#a03f77"
    }
}

const style = StyleSheet.create({
    viewBotaoDados: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    textoBotaoDados: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    textoLoading: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    textoNomePonto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textoDica: {
        fontStyle: 'italic'
    },
    cardItem: {
        backgroundColor: '#eee'
    },
    container: {
        flexGrow: 1
    },
    tabHeading: {
        color: "white"
    },
    tab: {
        padding: variables.contentPadding * 4
    },
    text: {
        fontSize: (variables.fontSizeBase * 0.5) + variables.contentPadding,
        color: "black",
        alignItems: "center",
        padding: variables.contentPadding,
        borderRightWidth: variables.borderWidth * 0,
        borderColor: variables.listBorderColor,
        alignSelf: "baseline"
    },
    buttonStyle: {
        borderWidth: 3,
        borderColor: '#336633',
        flex: 1,
        borderRadius: 15,
        justifyContent: 'center',
        margin: 1
    }
});
