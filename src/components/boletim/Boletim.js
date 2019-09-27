// @flow
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import * as React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, View, Text, ScrollView, ListView, FlatList, ImageBackground, StatusBar } from "react-native";
import { Tab, Tabs, TabHeading, H1 } from "native-base";
import { BaseContainerBoletim, BaseContainer, Task, Styles } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";
import CustomRow from './CustomRow';
import Swiper from 'react-native-swiper';
import { format, render, cancel, register } from 'timeago.js';

const BOLETIM = 1;
const ALERTAS = 2;


@inject("boletimStore")
@observer
export default class Boletim extends React.Component<ScreenProps<>> {

    componentWillUnmount() {
    }

    componentWillMount() {
        this.props.boletimStore.getBoletim();
    }

    renderContent = () => {
        if (this.props.boletimStore.loadingDetail) {
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
        }
        return (
            <Tabs style={{ backgroundColor: "white" }}>
                <Tab heading={
                    <TabHeading style={style.tabBoletim}>
                        <Text style={style.tabHeadingBoletim}>Boletim</Text>
                    </TabHeading>}>
                    <OverviewTab period={BOLETIM} />
                </Tab>
                <Tab heading={<TabHeading style={style.tabAlertas}><Text style={style.tabHeadingBoletim}>Alertas</Text></TabHeading>}>
                    <OverviewTab period={ALERTAS} />
                </Tab>
            </Tabs>
        );
    };

    render(): React.Node {
        return (
            <BaseContainerBoletim title="FEED" navigation={this.props.navigation}>
                {this.renderContent()}
            </BaseContainerBoletim>
        );
    }
}

type OverviewTabProps = {
    period: 1 | 2
};

@inject("boletimStore")
@observer
class OverviewTab extends React.Component<OverviewTabProps> {

    static get propTypes(): React.Node {
        return {
            boletins: PropTypes.arrayOf(Object),
            localization: PropTypes.any,
            boletimStore: PropTypes.any
        };
    }

    render(): React.Node {
        const period = this.props.period;
        const diaDaSemana = new Date().getDate();
        const mesDoAno = retornaMes(new Date().getMonth() + 1);
        const ano = new Date().getFullYear();
        const listDiary = this.props.boletimStore.listDiario;
        const listRanking = this.props.boletimStore.listRanking;

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


        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };

        if (period === 1) {
            return (
                <View style={style.containerDiario}>
                    <StatusBar
                        backgroundColor="white"
                        barStyle="light-content"
                    />
                    <ScrollView >
                        <ImageBackground source={require("../../../assets/images/boletim_background.jpg")} style={{ width: '100%', height: '100%' }}>
                            <View style={[style.tab, Styles.center]}>
                                <H1 style={{ color: "black" }}>Londrina, {diaDaSemana} de {mesDoAno} de {ano} </H1>
                            </View>
                            {
                                listDiary.map((item, i) => (
                                    <Task
                                        subtitle={item.descricao}
                                    />
                                ))
                            }
                        </ImageBackground>
                    </ScrollView>
                </View>
            );
        } else if (period === 2) {
            return (
                <View style={style.containerRanking}>
                    <FlatList
                        data={listRanking}
                        renderItem={({ item }) => <CustomRow
                        data={format(item.data, 'en_US')}
                        classificacao={item.classificacao}
                            title={item.local}
                            description={item.descricao}
                        />}
                    />
                </View>
            );
        }
    }
}

function retornaDia(date) {
    switch (date) {
        case 1:
            return "Segunda";
        case 2:
            return "Terça";
        case 3:
            return "Quarta";
        case 4:
            return "Quinta";
        case 5:
            return "Sexta";
        case 6:
            return "Sábado";
        case 7:
            return "Domingo";
    }
}

function retornaMes(date) {
    switch (date) {
        case 1:
            return "Janeiro";
        case 2:
            return "Fevereiro";
        case 3:
            return "Março";
        case 4:
            return "Abril";
        case 5:
            return "Maio";
        case 6:
            return "Junho";
        case 7:
            return "Julho";
        case 8:
            return "Agosto";
        case 9:
            return "Setembro";
        case 10:
            return "Outubro";
        case 11:
            return "Novembro";
        case 12:
            return "Dezembro";
    }
}

const style = StyleSheet.create({
    containerDiario: {
        backgroundColor: 'white'
    },
    tabBoletim: {
        borderRightWidth: 0.3,
        borderBottomWidth: 0.3
    },
    tabAlertas: {
        borderLeftWidth: 0.3,
        borderBottomWidth: 0.3
    },
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
    },
    containerRanking: {
        flexGrow: 1,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    tabHeading: {
        color: "white"
    },
    tabHeadingBoletim: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    tab: {
        padding: variables.contentPadding * 4
    },
    textoBoletim: {
        fontSize: (variables.fontSizeBase * 1) + variables.contentPadding,
        color: "white",
        padding: variables.contentPadding,
        alignSelf: "baseline",
        flexDirection: "row",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginHorizontal: variables.contentPadding * 2
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },

});
