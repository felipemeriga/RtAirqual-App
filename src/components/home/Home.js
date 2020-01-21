// @flow
import * as Progress from "react-native-progress";
import { StyleSheet, View, Image, Text, ImageBackground, Alert, Dimensions, TextInput } from "react-native";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MapView from 'react-native-maps';
import { BaseContainer } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import Styles from "../pure-components/Styles";
import { Tabs, Tab, TabHeading, Container, Content, Card, CardItem, Body, Thumbnail, Icon, Button, Left, Right } from "native-base";
import variables from "../../../native-base-theme/variables/commonColor";
import Map from "./Map";

// pontos = [
//     { id: "lago", temp: 0, umid: 0, airq: 0 }, //0
//     { id: "jardim", temp: 0, umid: 0, airq: 0 }, //1
//     { id: "puc", temp: 0, umid: 0, airq: 0 },  //2
//     { id: "uel", temp: 0, umid: 0, airq: 0 }, //3
//     { id: "utfpr", temp: 0, umid: 0, airq: 0 }//4
// ]

dicasPontos = [
    { id: "lago", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281488/feeds.json?results=2?id=281488" },
    { id: "jardim", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/580874/feeds.json?results=2?id=281491" },
    { id: "puc", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/740676/feeds.json?results=2?id=281489" },
    { id: "uel", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/323194/feeds.json?results=2?id=281490" },
    { id: "utfpr", dicaTemp: '0', dicaUmid: '0', dicaAirq: '0', urlDica: "https://2y3nnveut3.execute-api.us-west-2.amazonaws.com/dev?endPoint=https://api.thingspeak.com/channels/281501/feeds.json?results=2?id=281492" }
]

const CARD = 1;
const MAPA = 2;

@inject("channelsStore")
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

    // renderContent = () => {

    // }

    // exibeDialogDica(dica) {
    //     Alert.alert(
    //         'Dica:',
    //         dica,
    //         [
    //             { text: 'Voltar' }
    //         ],
    //         { cancelable: true },
    //     );
    // }

    // getTempUmidAirqToCards() {
    //     //PUC PONTOS[2] cardsDetail[0]
    //     pontos[2].temp = parseFloat(this.props.channelsStore.cardsDetail[0].lastValues.thermalConfort).toFixed(1);
    //     pontos[2].umid = parseFloat(this.props.channelsStore.cardsDetail[0].lastValues.moisture).toFixed(0);
    //     pontos[2].airq = this.props.channelsStore.cardsDetail[0].lastValues.airQuality;

    //     //LAGO IGAPO PONTOS[0] cardsDetail[1]
    //     pontos[0].temp = parseFloat(this.props.channelsStore.cardsDetail[1].lastValues.thermalConfort).toFixed(1);
    //     pontos[0].umid = parseFloat(this.props.channelsStore.cardsDetail[1].lastValues.moisture).toFixed(0);
    //     pontos[0].airq = this.props.channelsStore.cardsDetail[1].lastValues.airQuality;

    //     //JARDIM BOTANICO PONTOS[1] cardsDetail[2]
    //     pontos[1].temp = parseFloat(this.props.channelsStore.cardsDetail[2].lastValues.thermalConfort).toFixed(1);
    //     pontos[1].umid = parseFloat(this.props.channelsStore.cardsDetail[2].lastValues.moisture).toFixed(0);
    //     pontos[1].airq = this.props.channelsStore.cardsDetail[2].lastValues.airQuality;

    //     //PISTA ATLETISMO UEL PONTOS[3] cardsDetail[3]
    //     pontos[3].temp = parseFloat(this.props.channelsStore.cardsDetail[3].lastValues.thermalConfort).toFixed(1);
    //     pontos[3].umid = parseFloat(this.props.channelsStore.cardsDetail[3].lastValues.moisture).toFixed(0);
    //     pontos[3].airq = this.props.channelsStore.cardsDetail[3].lastValues.airQuality;

    //     //UTF PONTOS[4] cardsDetail[4]
    //     pontos[4].temp = parseFloat(this.props.channelsStore.cardsDetail[4].lastValues.thermalConfort).toFixed(1);
    //     pontos[4].umid = parseFloat(this.props.channelsStore.cardsDetail[4].lastValues.moisture).toFixed(0);
    //     pontos[4].airq = this.props.channelsStore.cardsDetail[4].lastValues.airQuality;
    // }


    // render(): React.Node {
    //     const sectionName = "Pontos";
    //     return (
    //         <BaseContainer title={sectionName} navigation={this.props.navigation}>
    //             {this.renderContent()}
    //         </BaseContainer>
    //     );
    // }

    render(): React.Node {
        const sectionName = "Airtrak";
        //const { navigation } = this.props;
        return (
            <BaseContainer title={sectionName} navigation={this.props.navigation}>
                <Tabs>
                    <Tab heading={<TabHeading style={style.tabHeader}><Text style={style.textotabHeader}>Mapa</Text></TabHeading>}>
                        <View style={style.container}>
                            <Map channels={this.props.channelsStore.channels} localization={this.props.channelsStore.localization}></Map>
                        </View>
                    </Tab>
                    <Tab heading={<TabHeading style={style.tabHeader}><Text style={style.textotabHeader}>Cards</Text></TabHeading>}>
                        <View style={style.container}>
                            <Text style={{ fontSize: 25, color: "#FFF" }}>Em breve!</Text>
                        </View>
                    </Tab>
                </Tabs>
            </BaseContainer>
        );
    }
}

// type OverviewTabProps = {
//     tela: 1 | 2
// };

// @inject("channelsStore")
// @observer
// class OverviewTab extends React.Component<OverviewTabProps> {

//     constructor(props: React.Node) {
//         super(props);
//         this.props.channelsStore.getChannels();
//     }

//     componentDidUpdate(): React.Node {

//     }

//     render(): React.Node {
//         const { tela } = this.props;
//         var date = new Date().getDate(); //Current Date
//         var month = new Date().getMonth() + 1; //Current Month
//         var year = new Date().getFullYear(); //Current Year
//         var hours = new Date().getHours(); //Current Hours
//         if (hours < 10) {
//             hours = "0" + hours;
//         }
//         var min = new Date().getMinutes(); //Current Minutes
//         if (min < 10) {
//             min = "0" + min;
//         }
//         // var sec = new Date().getSeconds(); //Current Seconds

//         const data = date + '/' + month + '/' + year + ' ' + hours + ':' + min;
//         // + ':' + sec;
//         if (tela === 1) {
//             if (this.props.channelsStore.loadingChannels === false
//                 && this.props.channelsStore.loadingLocalization === false) {
//                 return (
//                     // <Map channels={this.props.channelsStore.channels} localization={this.props.channelsStore.localization} />
//                     <Container>

//                     </Container>
//                 );
//             }
//             return (
//                 <View style={[Styles.center, Styles.flexGrow]}>
//                     <Progress.Circle size={50} indeterminate />
//                 </View>
//             );
//         } else if (tela === 2) {
//             // this.carregaCards();
//             return (
//                 <Container>

//                 </Container>
//             );
//         }
//     }
//     //retorna cores
// }


const { width } = Dimensions.get("window");
const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mapa: {
        width: width,
        height: 1000
    },
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
    },
    tabHeader: {
        borderTopWidth: 1,
        borderRadius: 1,
        backgroundColor: '#2D2D2D',
    },
    textotabHeader: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    }
});