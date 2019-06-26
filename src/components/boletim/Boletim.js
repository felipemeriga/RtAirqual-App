// @flow
import moment from "moment";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import * as React from "react";
import * as Progress from "react-native-progress";
import { ListItem } from 'react-native-elements'
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Tab, Tabs, TabHeading, H1, H3 } from "native-base";
import { BaseContainer, Task, Styles, TaskOverview } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";

const DIARIO = 1;
const RANKING = 2;
const HISTORICO = 3;

listDiario = [];
listRanking = [];
listHistorico = [];

@inject("boletimStore")
@observer
export default class Boletim extends React.Component<ScreenProps<>> {

    constructor(props: React.Node) {
        super(props);
    }

    componentWillUnmount() {
        listDiario = [];
        listRanking = [];
        listHistorico = [];
    }

    listDiario = this.props.boletimStore.listDiario;

    listRanking = this.props.boletimStore.listRanking;

    listHistorico = this.props.boletimStore.listHistorico;

    renderContent = (type) => {
        // if (this.props.boletimStore.loadingDetail) {
        //     return (
        //         <View style={[Styles.center, Styles.flexGrow]}>
        //             <Progress.Circle
        //                 size={65} indeterminate
        //                 color="#FFF"
        //                 borderWidth={5}
        //             />
        //         </View>
        //     )
        // } else {
            return (
                <OverviewTab period={type} />
            )
        // }
    }

    render(): React.Node {
        return (
            <BaseContainer title={"Boletim"} navigation={this.props.navigation}>
                <Tabs>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>DIÁRIO</Text></TabHeading>}>
                        {this.renderContent(DIARIO)}
                    </Tab>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>RANKING</Text></TabHeading>}>
                        {this.renderContent(RANKING)}
                    </Tab>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>HISTÓRICO</Text></TabHeading>}>
                        {this.renderContent(HISTORICO)}
                    </Tab>
                </Tabs>
            </BaseContainer>
        );
    }
}

type OverviewTabProps = {
    period: 1 | 2 | 3
};

class OverviewTab extends React.PureComponent<OverviewTabProps> {

    static get propTypes(): React.Node {
        return {
            boletins: PropTypes.arrayOf(Object),
            localization: PropTypes.any,
            boletimStore: PropTypes.any
        };
    }

    render(): React.Node {
        const { period } = this.props;
        const diaDaSemana = new Date().getDate();
        const mesDoAno = retornaMes(new Date().getMonth() + 1);
        const ano = new Date().getFullYear();
        if (period === 1) {
            return (
                <View style={style.container}>
                    <ScrollView>
                        <View style={[style.tab, Styles.center]}>
                            <H1>Londrina, {diaDaSemana} de  {mesDoAno} de {ano} </H1>
                        </View>
                        {
                            listDiario.map((item, i) => (
                                <Task
                                    key={i}
                                    subtitle={item.descricao}
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            );
        } else if (period === 2) {
            label = `Week ${moment().format("W")}`;
            return (<View style={style.container}>
                <ScrollView>
                    <View style={[style.tab, Styles.center]}>
                        <H1>Ranking atual</H1>
                    </View>
                    {
                        listRanking.map((item, i) => (
                            <Task
                                key={i}
                                title={item.local}
                                subtitle={item.descricao}
                            />
                        ))
                    }
                </ScrollView>
            </View>
            );
        }
        label = moment().format("MMMM");
        return (<View style={style.container}>
            <ScrollView>
                <View style={[style.tab, Styles.center]}>
                    <H1>{mesDoAno.toUpperCase()}</H1>
                </View>
                {
                    listHistorico.map((item, i) => (
                        <Task
                            key={i}
                            title={item.data}
                            subtitle={item.descricao}
                        />
                    ))
                }
            </ScrollView>
        </View>
        );
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
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginHorizontal: variables.contentPadding * 2
    },
});
