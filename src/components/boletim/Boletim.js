// @flow
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import * as React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, View, Text, ScrollView, FlatList, ImageBackground, StatusBar } from "react-native";
import { Tab, Tabs, TabHeading, H1 } from "native-base";
import { BaseContainer, Task, Styles } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";
import CustomRow from './CustomRow';
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
                        color="#0BFBE1"
                        borderWidth={5}
                    />
                    <Text style={style.textoLoading}>Recebendos dados...</Text>
                </View>
            );
        }
        return (
            <Tabs>
                <Tab heading={<TabHeading style={style.tabBoletim}><Text style={style.textoTabBoletim}>Boletim</Text></TabHeading>}>
                <OverviewTab tela={BOLETIM} />
                </Tab>
                <Tab heading={<TabHeading style={style.tabBoletim}><Text style={style.textoTabBoletim}>Alertas</Text></TabHeading>}>
                <OverviewTab tela={ALERTAS} />
                </Tab>
            </Tabs>
        );
    };

    render(): React.Node {
        const sectionName = "FEED";
        return (
            <BaseContainer title={sectionName}navigation={this.props.navigation}>
                {this.renderContent()}
            </BaseContainer>
        );
    }
}

type OverviewTabProps = {
    tela: 1 | 2
};

@inject("boletimStore")
@observer
class OverviewTab extends React.Component<OverviewTabProps> {

    static get propTypes(): React.Node {
        return {
            boletins: PropTypes.arrayOf(Object),
            boletimStore: PropTypes.any
        };
    }

    render(): React.Node {
        const tela = this.props.tela;
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

        if (tela === 1) {
            return (
                <View style={style.containerDiario}>
                    <ScrollView >
                        <ImageBackground source={require("../../../assets/images/boletim_background.jpg")} style={{ width: '100%', height: '100%' }}>
                            <View style={[style.tab, Styles.center]}>
                                <H1 style={{ color: "black" }}>Londrina, {diaDaSemana} de {mesDoAno} de {ano} </H1>
                            </View> 
                            {
                                listDiary.map((item, i) => (
                                    <Task
                                        subtitle={item.descricao}
                                        key={item.id}
                                    />
                                ))
                            }
                        </ImageBackground>
                    </ScrollView>
                </View>
            );
        } else if (tela === 2) {
            return (
                <View style={style.containerRanking}>
                    <FlatList
                        data={listRanking}
                        renderItem={({ item }) => 
                            <CustomRow
                                data={format(item.data, 'pt_BR')}
                                classificacao={item.classificacao}
                                title={item.local}
                                description={item.descricao}
                                key={item.id}
                            />
                        }
                        keyExtractor={(item, index) => item.id}
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
        borderTopWidth: 1,
        borderRadius: 1,
        backgroundColor: '#2D2D2D',
    },
    tabAlertas: {
        borderLeftWidth: 1,
        borderBottomWidth: 1
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
        backgroundColor: "white"
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    tabHeading: {
        color: "white"
    },
    textoTabBoletim: {
        color: "white",
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
    textoLoading: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        margin: 10
    },
});
