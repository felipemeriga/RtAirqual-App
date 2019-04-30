// @flow
import moment from "moment";
import * as React from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Tab, Tabs, TabHeading, H1, H3} from "native-base";
import {BaseContainer, Task, Styles, TaskOverview} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";


const DAY = 1;
const WEEK = 2;
const MONTH = 3;

export default class Overview extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        return (
            <BaseContainer title="Boletim" navigation={this.props.navigation}>
                <Tabs>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>DIÁRIO</Text></TabHeading>}>
                        <OverviewTab period={DAY} />
                    </Tab>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>RANKING</Text></TabHeading>}>
                        <OverviewTab period={WEEK} />
                    </Tab>
                    <Tab heading={<TabHeading><Text style={style.tabHeading}>HISTÓRICO</Text></TabHeading>}>
                        <OverviewTab period={MONTH} />
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

    render(): React.Node {
        const {period} = this.props;
        const diaDaSemana = retornaDia(new Date().getDay());
        const mesDoAno = retornaMes(new Date().getMonth() + 1);
        let label;
        if (period === 1) { // diario
            return (
                <View style={style.container}>
                    <ScrollView>
                        <View style={[style.tab, Styles.center]}>
                            <H1>{diaDaSemana}</H1>
                            <H3>Texto descritivo pirocona das galaxias supremas</H3>
                        </View>
                        <TaskOverview
                            textoEsquerda="Texto descritivo para poluicao do ar"
                            textoDireita="Texto descritivo para conforto termico"
                        />
                        <Task date="2015-05-08 09:30" title="New Icons" subtitle="Mobile App" completed />
                        <Task
                            date="2015-05-08 11:00"
                            title="Design Stand Up"
                            subtitle="Hangouts"
                            collaborators={[1, 2, 3]}
                            completed={false}
                        />
                        <Task date="2015-05-08 14:00" title="New Icons" subtitle="Home App" completed />
                        <Task date="2015-05-08 16:00" title="Revise Wireframes" subtitle="Company Website" completed />
                    </ScrollView>
                </View>
            );
        } else if (period === 2) { // ranking
            label = `Week ${moment().format("W")}`;
            return (
                <View style={style.container}>
                    <ScrollView>
                        <View style={[style.tab, Styles.center]}>
                            <H1>RANKING SEMANAL</H1>
                        </View>
                        <Task
                            date="2015-05-08 11:00"
                            title="Design Stand Up"
                            subtitle="Hangouts"
                            collaborators={[1, 2, 3]}
                            completed={false}
                        />
                        <Task date="2015-05-08 16:00" title="Revise Wireframes" subtitle="Company Website" completed />
                    </ScrollView>
                </View>
            );
        }
        // historico
        label = moment()
            .format("MMMM");
        return (
            <View style={style.container}>
                <ScrollView>
                    <View style={[style.tab, Styles.center]}>
                        <H1>{mesDoAno.toUpperCase()}</H1>
                    </View>
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Task
                        texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />

                    <Task
                        date="2015-05-08 11:00"
                        title="Design Stand Up"
                        subtitle="Hangouts"
                        collaborators={[1, 2, 3]}
                        completed={false}
                    />
                    <Task date="2015-05-08 14:00" title="New Icons" subtitle="Home App" completed/>
                    <Task date="2015-05-08 16:00" title="Revise Wireframes" subtitle="Company Website" completed/>
                </ScrollView>
            </View>
        );

        return (
            <View style={style.container}>
                <ScrollView>
                    <View style={[style.tab, Styles.center]}>
                        <H1>{label}</H1>
                    </View>
                    <TaskOverview completed={64} overdue={5} />
                    <Task date="2015-05-08 09:30" title="New Icons" subtitle="Mobile App" completed />
                    <Task
                        date="2015-05-08 11:00"
                        title="Design Stand Up"
                        subtitle="Hangouts"
                        collaborators={[1, 2, 3]}
                        completed={false}
                    />
                    <Task date="2015-05-08 14:00" title="New Icons" subtitle="Home App" completed />
                    <Task date="2015-05-08 16:00" title="Revise Wireframes" subtitle="Company Website" completed />
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
    }
});
