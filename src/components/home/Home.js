// @flow
import * as Progress from "react-native-progress";
import { StyleSheet, View, Image, Text } from "react-native";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import * as React from "react";
import { BaseContainer } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import Map from "./Map";
import Styles from "../pure-components/Styles";
import { Tab, Tabs, TabHeading, H1, H3, Container, Header, Content, Card, CardItem, Body, Thumbnail, Button, Icon, Left, Right } from "native-base";
import variables from "../../../native-base-theme/variables/commonColor";

const Mapa = 1;
const Pontos = 2;

pontos = [
    { id: "lago", temp: 0, umid: 0, airq: 0 },
    { id: "jardim", temp: 0, umid: 0, airq: 0 },
    { id: "puc", temp: 0, umid: 0, airq: 0 },
    { id: "uel", temp: 0, umid: 0, airq: 0 },
    { id: "utfpr", temp: 0, umid: 0, airq: 0 }
]

@inject("boletimStore")
@inject("channelsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {

    constructor(props: React.Node) {
        super(props);
        this.props.boletimStore.getBoletim();
        this.props.channelsStore.getChannels();
        this.props.channelsStore.getLocalization();
    }

    renderContent = (type) => {
        return (
            <OverviewTab channelsStore={this.props.channelsStore} tela={type} />
        )
    }


    render(): React.Node {
        const sectionName = "RT Airqual";
        //const { navigation } = this.props;
        return (
            //<BaseContainer title={sectionName} {...{ navigation }} scrollable style={styles.container}>
            <BaseContainer title={sectionName} navigation={this.props.navigation}>
                <Tabs>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>Mapa</Text></TabHeading>}>
                        {this.renderContent(Mapa)}
                    </Tab>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>Visão geral</Text></TabHeading>}>
                        {this.renderContent(Pontos)}
                    </Tab>
                </Tabs>
            </BaseContainer>
        );
    }
}

type OverviewTabProps = {
    tela: 1 | 2
};

teste = null;

@inject("channelsStore")
@inject("mapsStore")
@observer
class OverviewTab extends React.Component<OverviewTabProps> {


    static get propTypes(): React.Node {
        return {
            boletins: PropTypes.any,
            localization: PropTypes.any,

            boletimStore: PropTypes.any
        };
    }

    carregaCards() {
        //PUC PONTOS[2] cardsDetail[0]
        pontos[2].temp = parseFloat(this.props.channelsStore.cardsDetail[0].lastValues.thermalConfort).toFixed(1);
        pontos[2].umid = this.props.channelsStore.cardsDetail[0].lastValues.moisture;
        pontos[2].airq = this.props.channelsStore.cardsDetail[0].lastValues.airQuality;

        //LAGO IGAPO PONTOS[0] cardsDetail[1]
        pontos[0].temp = parseFloat(this.props.channelsStore.cardsDetail[1].lastValues.thermalConfort).toFixed(1);
        pontos[0].umid = this.props.channelsStore.cardsDetail[1].lastValues.moisture;
        pontos[0].airq = this.props.channelsStore.cardsDetail[1].lastValues.airQuality;

        //JARDIM BOTANICO PONTOS[1] cardsDetail[2]
        pontos[1].temp = parseFloat(this.props.channelsStore.cardsDetail[2].lastValues.thermalConfort).toFixed(1);
        pontos[1].umid = this.props.channelsStore.cardsDetail[2].lastValues.moisture;
        pontos[1].airq = this.props.channelsStore.cardsDetail[2].lastValues.airQuality;

        //PISTA ATLETISMO UEL PONTOS[3] cardsDetail[3]
        pontos[3].temp = parseFloat(this.props.channelsStore.cardsDetail[3].lastValues.thermalConfort).toFixed(1);
        pontos[3].umid = this.props.channelsStore.cardsDetail[3].lastValues.moisture;
        pontos[3].airq = this.props.channelsStore.cardsDetail[3].lastValues.airQuality;

        //UTF PONTOS[4] cardsDetail[4]
        pontos[4].temp = parseFloat(this.props.channelsStore.cardsDetail[4].lastValues.thermalConfort).toFixed(1);
        pontos[4].umid = this.props.channelsStore.cardsDetail[4].lastValues.moisture;
        pontos[4].airq = this.props.channelsStore.cardsDetail[4].lastValues.airQuality;
    }


    constructor(props: React.Node) {
        super(props);
        this.props.channelsStore.getChannels();
        this.props.channelsStore.getLocalization();
    }

    componentDidUpdate(): React.Node {

    }

    render(): React.Node {
        const { tela } = this.props;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds

        const data = date + '/' + month + '/' + year + ' ' + hours + ':' + min;
        // + ':' + sec;
        if (tela === 1) {
            if (this.props.channelsStore.loadingChannels === false
                && this.props.channelsStore.loadingLocalization === false) {
                return (
                    <Map channels={this.props.channelsStore.channels} localization={this.props.channelsStore.localization} />
                );
            }
            return (
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Progress.Circle size={50} indeterminate />
                </View>
            );
        } else if (tela === 2) {
            this.carregaCards();
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../../../assets/appIcon.png')} />
                                    <Body>
                                        <Text>Lago Igapó</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../../../assets/images/lago_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thermometer" />
                                        <Text> </Text>
                                        <Text> {pontos[0].temp} </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="water" />
                                        <Text> </Text>
                                        <Text> {pontos[0].umid}% </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="leaf" />
                                        <Text> </Text>
                                        <Text> {pontos[0].airq} </Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../../../assets/appIcon.png')} />
                                    <Body>
                                        <Text>Jardim Botânico</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../../../assets/images/jardim_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thermometer" />
                                        <Text> </Text>
                                        <Text> {pontos[1].temp} </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="water" />
                                        <Text> </Text>
                                        <Text> {pontos[1].umid}% </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="leaf" />
                                        <Text> </Text>
                                        <Text> {pontos[1].airq} </Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../../../assets/appIcon.png')} />
                                    <Body>
                                        <Text>PUC</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../../../assets/images/puc_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thermometer" />
                                        <Text> </Text>
                                        <Text> {pontos[2].temp} </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="water" />
                                        <Text> </Text>
                                        <Text> {pontos[2].umid}% </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="leaf" />
                                        <Text> </Text>
                                        <Text> {pontos[2].airq} </Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../../../assets/appIcon.png')} />
                                    <Body>
                                        <Text>Pista atletismo UEL</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../../../assets/images/uel_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thermometer" />
                                        <Text> </Text>
                                        <Text> {pontos[3].temp} </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="water" />
                                        <Text> </Text>
                                        <Text> {pontos[3].umid}% </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="leaf" />
                                        <Text> </Text>
                                        <Text> {pontos[3].airq} </Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../../../assets/appIcon.png')} />
                                    <Body>
                                        <Text>UTFPR</Text>
                                        <Text note>Atualizado em: {data}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../../../assets/images/utfpr_card.png')} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thermometer" />
                                        <Text> </Text>
                                        <Text> {pontos[4].temp} </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="water" />
                                        <Text> </Text>
                                        <Text> {pontos[4].umid}% </Text>
                                    </Button>
                                </Left>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="leaf" />
                                        <Text> </Text>
                                        <Text> {pontos[4].airq} </Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        }
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
    textoBoletim: {
        fontSize: (variables.fontSizeBase * 0.7) + variables.contentPadding,
        color: "white",
        padding: variables.contentPadding,
        alignSelf: "baseline",
        flexDirection: "row",
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginHorizontal: variables.contentPadding * 2
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
});
