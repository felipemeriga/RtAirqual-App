// @flow
import * as Progress from "react-native-progress";
import { StyleSheet, View, Image, Text } from "react-native";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseContainer } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import Styles from "../pure-components/Styles";
import { Container, Content, Card, CardItem, Body, Thumbnail, Button, Icon, Left, Right } from "native-base";
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

    renderContent = () => {
        if (this.props.channelsStore.loadingChannels) {
            return (
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Progress.Circle
                        size={65} indeterminate
                        color="#FFF"
                        borderWidth={5}
                    />
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, margin: 10 }}>Recebendos dados...</Text>
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
                <Container>
                    <Content>
                        <Card>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/new_icon.png')} />
                                    <Body>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Lago Igapó</Text>
                                        <Text style={{ fontStyle: 'italic' }}>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels("https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488")}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        <Text onPress={() => this.props.channelsStore.getChannels("https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488")} >Atualizar</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{ backgroundColor: '#eee' }}>
                                <Image source={require('../../../assets/images/lago_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }} >
                                <Text style={{ fontStyle: 'italic', fontSize: 13 }}>*Não deixe condições adversas te atrapalhar! Clique nos botões abaixo para receber dicas!</Text>
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorTemp(pontos[0].temp),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                    onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Conforto térmico: {'\n'} {pontos[0].temp} °C</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorUmi(pontos[0].umid),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                    onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Umidade relativa: {'\n'} {pontos[0].umid}%</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorPolu(pontos[0].airq),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff',
                                }}
                                    onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Qualidade do ar: {'\n'} {pontos[0].airq}</Text>
                                </Button>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Conforto térmico:\n" + this.props.channelsStore.dicasPontos[0].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Umidade relativa:\n" + this.props.channelsStore.dicasPontos[0].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Qualidade do ar:\n" + this.props.channelsStore.dicasPontos[0].dicaAirq + "\n"}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/new_icon.png')} />
                                    <Body>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Jardim Botânico</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{ backgroundColor: '#eee' }} >
                                <Image source={require('../../../assets/images/jardim_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorTemp(pontos[1].temp),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Conforto térmico: {'\n'} {pontos[1].temp} °C</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorUmi(pontos[1].umid),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Umidade relativa: {'\n'} {pontos[1].umid}%</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorPolu(pontos[1].airq),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Qualidade do ar: {'\n'} {pontos[1].airq}</Text>
                                </Button>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[1].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[1].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[1].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/new_icon.png')} />
                                    <Body>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pista de atletismo - UEL</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{ backgroundColor: '#eee' }}>
                                <Image source={require('../../../assets/images/uel_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }}>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorTemp(pontos[3].temp),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Conforto térmico: {'\n'} {pontos[3].temp} °C</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorUmi(pontos[3].umid),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Umidade relativa: {'\n'} {pontos[3].umid}%</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorPolu(pontos[3].airq),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Qualidade do ar: {'\n'} {pontos[3].airq}</Text>
                                </Button>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Conforto térmico:\n" + this.props.channelsStore.dicasPontos[3].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Umidade relativa:\n" + this.props.channelsStore.dicasPontos[3].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Qualidade do ar:\n" + this.props.channelsStore.dicasPontos[3].dicaAirq + "\n"}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/new_icon.png')} />
                                    <Body>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>UTFPR</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{ backgroundColor: '#eee' }}>
                                <Image source={require('../../../assets/images/utfpr_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }}>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorTemp(pontos[4].temp),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Conforto térmico: {'\n'} {pontos[4].temp} °C</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorUmi(pontos[4].umid),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Umidade relativa: {'\n'} {pontos[4].umid}%</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorPolu(pontos[4].airq),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Qualidade do ar: {'\n'} {pontos[4].airq}</Text>
                                </Button>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[4].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[4].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[4].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>

                        <Card>
                            <CardItem style={{ backgroundColor: '#eee' }}>
                                <Left>
                                    <Thumbnail source={require('../../../assets/new_icon.png')} />
                                    <Body>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Zerão</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <View>
                                        <Icon
                                            name='ios-refresh'
                                            color='black'
                                            onPress={() => this.props.channelsStore.getChannels()}
                                            style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} />
                                        <Text onPress={() => this.props.channelsStore.getChannels()} >Atualizar</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{ backgroundColor: '#eee' }}>
                                <Image source={require('../../../assets/images/zerao_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#eee' }}>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorTemp(pontos[2].temp),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Conforto térmico: {'\n'} {pontos[2].temp} °C</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorUmi(pontos[2].umid),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Umidade relativa: {'\n'} {pontos[2].umid}%</Text>
                                </Button>

                                <Button large style={{
                                    borderWidth: 2,
                                    borderColor: this.retornaCorPolu(pontos[2].airq),
                                    flex: 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    margin: 1,
                                    backgroundColor: '#fff'
                                }}
                                onPress={() => this.ShowHideTextComponentView()}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Qualidade do ar: {'\n'} {pontos[2].airq}</Text>
                                </Button>
                            </CardItem>
                            {
                                this.state.status ?
                                    <View>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para o conforto térmico:\n" + this.props.channelsStore.dicasPontos[2].dicaTemp + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a umidade relativa:\n" + this.props.channelsStore.dicasPontos[2].dicaUmid + "\n"}
                                        </Text>
                                        <Text style={{ fontStyle: 'italic' }}>
                                            {"Para a qualidade do ar:\n" + this.props.channelsStore.dicasPontos[2].dicaAirq}
                                        </Text>
                                    </View>
                                    : null
                            }
                        </Card>
                    </Content>
                </Container>
            );
        }
    }

    componentDidUpdate(): React.Node {
    }


    getTempUmidAirqToCards() {
        //PUC PONTOS[2] cardsDetail[0]
        console.log(this.props.channelsStore.cardsDetail[0].lastValues.moisture);
        console.log(this.props.channelsStore.cardsDetail[1].lastValues.moisture);
        console.log(this.props.channelsStore.cardsDetail[2].lastValues.moisture);
        console.log(this.props.channelsStore.cardsDetail[3].lastValues.moisture);
        console.log(this.props.channelsStore.cardsDetail[4].lastValues.moisture);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const style = StyleSheet.create({
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
        // backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#336633',
        flex: 1,
        borderRadius: 15,
        justifyContent: 'center',
        margin: 1
        // paddingTop: 4,
        // paddingBottom: 4,
        // paddingRight: 10,
        // paddingLeft: 10,
        // marginTop: 10,
        // width: 300
    }
});
