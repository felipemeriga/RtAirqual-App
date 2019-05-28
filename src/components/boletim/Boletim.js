// @flow
import moment from "moment";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import * as React from "react";
import { ListItem } from 'react-native-elements'
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Tab, Tabs, TabHeading, H1, H3} from "native-base";
import {BaseContainer, Task, Styles, TaskOverview} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";

const DAY = 1;
const WEEK = 2;
const MONTH = 3;

//preencher com dados AWS diario
const listDiario = [
    {
      title: 'Appointments',
      icon: 'av-timer'
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff'
    }
  ]

//preencher com dados AWS ranking
const listRanking = [
    {
    local: "UTFPR (Zona Leste)",
    descricao: "A região da UTFPR apresentou hoje o menor nível de conforto térmico, de 13,2 C, às 6h." 
    },
    {
    local: "Lago Igapó 2",
    descricao: "A região do Lago Igapó 2 apresentou hoje o 2o menor nível de conforto térmico, de 14,6 C, às 6h."
    },    
    {
    local: "PUC (Zona Oeste)",
    descricao: "A região da PUC apresentou hoje o 3o menor nível de conforto térmico, de 14,7 C, às 6h." 
    }
]

//preencher com dados AWS boletim
const listBoletim = [
    {
    data: "06 de Maio de 2019",
    descricao: "⛅ Tendência de tempo estável e quente, com chance de pouca chuva nos próximos dias.😰 Alerta para o índice de conforto térmico, que tem sido alto no período da tarde e deve permanecer em estado de ALERTA entre às 11h e 17h. Nessa categoria, pode haver dificuldade para treinos leves e fortes e afetar a performance em mais de 20%. Reforce a hidratação a cada 15/20min.😰 Ponto de atenção também para a umidade relativa do ar, que tem permanecido em categoria de ATENÇÃO com tempo ÚMIDO (entre 60 e 80%) na maior parte do dia. Pode causar forte sensação de abafado ao se exercitar e suor excessivo, mantenha-se hidratado.📌Dica: Com aumento no nível de conforto térmico, destaca-se como períodos mais CONFORTÁVEIS do dia: até às 9h da manhã e após às 19h.📌Dica: Com o tempo quente e abafado, procure manter uma hidratação reforçada ao longo de todo o dia, pois a tendência é que seu corpo libere mais suor durante a atividade física."
    },
    {
    data: "13 de Maio de 2019",
    descricao: "🌦De modo geral, queda brusca na temperatura e possibilidade de chuva ao longo do dia. 🙂Com a recente queda de temperatura,  o índice de conforto térmico deve permanecer em estado de CONFORTÁVEL (entre 19°C e 26°C) ao longo de todo o dia.  Deve causar pouco efeito sobre o desempenho e são condições agradáveis para atividade física. 😰 Ponto de atenção apenas para a umidade relativa do ar, que tem permanecido em categoria de ATENÇÃO com tempo ÚMIDO (entre 60 e 80%) na maior parte do dia. Pode causar forte sensação de abafado ao se exercitar e suor excessivo. Portanto, mantenha-se hidratado.📌Dica: Com a situação permanecendo confortável ao longo de todo o dia, aproveite sua corrida! 📌Dica: Com o tempo úmido, procure manter uma hidratação reforçada ao longo de todo o dia, pois a tendência é que seu corpo libere mais suor durante a atividade física."    
    }
]


@inject("boletimStore")
@observer
export default class Boletim extends React.Component<ScreenProps<>> {

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
    static get propTypes(): React.Node {
        return {
            boletins: PropTypes.arrayOf(Object),
            localization: PropTypes.any,
            boletimStore: PropTypes.any
        };
    }
    render(): React.Node {

        const boletins = this.props.boletins;
        // var SampleNameArray = [ "Londrina, Segunda, 06 de Maio, 2019 ⛅ Tendência de tempo estável e quente, com chance de pouca chuva nos próximos dias.😰 Alerta para o índice de conforto térmico, que tem sido alto no período da tarde e deve permanecer em estado de ALERTA entre às 11h e 17h. Nessa categoria, pode haver dificuldade para treinos leves e fortes e afetar a performance em mais de 20%. Reforce a hidratação a cada 15/20min.😰 Ponto de atenção também para a umidade relativa do ar, que tem permanecido em categoria de ATENÇÃO com tempo ÚMIDO (entre 60 e 80%) na maior parte do dia. Pode causar forte sensação de abafado ao se exercitar e suor excessivo, mantenha-se hidratado.📌Dica: Com aumento no nível de conforto térmico, destaca-se como períodos mais CONFORTÁVEIS do dia: até às 9h da manhã e após às 19h.📌Dica: Com o tempo quente e abafado, procure manter uma hidratação reforçada ao longo de todo o dia, pois a tendência é que seu corpo libere mais suor durante a atividade física."
        // ];

        const {period} = this.props;
        const diaDaSemana = retornaDia(new Date().getDay());
        const mesDoAno = retornaMes(new Date().getMonth() + 1);
        let label;
        if (period === 1) { 
            
            // diario
            
            
            return (
                <View style={style.container}>
                    <ScrollView>
                    {
                    listDiario.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                        />
                    ))
                    }

                        {/* <View style={[style.tab, Styles.center]}>
                            <H1>{diaDaSemana}</H1>
                            <H3>Texto descritivo para {diaDaSemana}</H3>
                        </View>
                        <TaskOverview
                            textoEsquerda="Texto descritivo para poluicao do ar"
                            textoDireita="Texto descritivo para conforto termico"
                        /> 
                        {/* <Task date="2015-05-08 09:30" title="New Icons" subtitle="Mobile App" completed />
                        <Task
                            date="2015-05-08 11:00"
                            title="Design Stand Up"
                            subtitle="Hangouts"
                            collaborators={[1, 2, 3]}
                            completed={false}
                        />
                        <Task date="2015-05-08 14:00" title="New Icons" subtitle="Home App" completed />
                        <Task date="2015-05-08 16:00" title="Revise Wireframes" subtitle="Company Website" completed /> */}
                    </ScrollView>
                </View>
            );
        } else if (period === 2) { 
            
            
            // ranking
            
            
            label = `Week ${moment().format("W")}`;
            return (
                <View style={style.container}>
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
        
        carregaDados();
        // historico
        label = moment().format("MMMM");
        return (

           <View style={style.container}>
                <ScrollView>
                    <View style={[style.tab, Styles.center]}>
                        <H1>{mesDoAno.toUpperCase()}</H1>
                    </View>
                    {/* { SampleNameArray.map((item, key)=>( //SampleNameArray boletins
                        <Text style={style.textoBoletim} key={key} > { item } </Text>)
                    )} */}
                    {
                    listBoletim.map((item, i) => (
                        <Text style={style.textoBoletim}
                            key={i}
                        >
                            {item.data}
                            {"\n"}{"\n"}
                            {item.descricao}
                            </Text>
                    ))
                    }


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

function carregaDados(){
    console.log("CARREGOU");
    //this.props.boletimStore.getBoletim("boletim");
};

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
