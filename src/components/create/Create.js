// @flow
import * as React from "react";
import { StyleSheet, View, Button, Text, Alert,Platform } from "react-native";

import { BaseContainer, Avatar, Field, Styles } from "../pure-components";
import type { ScreenProps } from "../pure-components/Types";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Date from "./Date";
import variables from "../../../native-base-theme/variables/commonColor";
import atividadeStore from "../../stores/AtividadeStore";
import { inject, observer } from "mobx-react";
import { Slider } from 'react-native';

import {Component} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


var radio_props = [
    { label: 'TESTE0', value: 0 },
    { label: 'TESTE1', value: 1 },
    { label: 'TESTE2', value: 2 }
];



@inject("atividadeStore")
@observer
export default class Create extends React.PureComponent<ScreenProps<>> {

    state = {
        date: new Date('2020-06-12T14:42:42'),
        mode: 'date',
        show: false,
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    constructor(props) {
        super(props);
        this.state = {
            rangeValue: 5,
        };
    }

    change(rangeValue) {
        this.setState(() => {
            return {
                rangeValue: parseFloat(rangeValue),
            };
        });
    }
    

    render(): React.Node {
        const { rangeValue } = this.state;
        const { show, date, mode } = this.state;
        return (
            <BaseContainer title="Reportar" navigation={this.props.navigation} scrollable>

                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: 'powderblue' }} />
                        <View style={{ flex: 1, backgroundColor: 'skyblue' }} />
                        <View style={{ flex: 1, backgroundColor: 'steelblue' }} />
                    </View>
                    <Text style={styles.text}>{String(rangeValue)}</Text>
                    <Slider

                        style={{ width: 200, height: 40, justifyContent: 'flex-end' }}
                        step={1}
                        maximumValue={10}
                        onValueChange={this.change.bind(this)}
                        rangeValue={rangeValue}
                    />
                </View>
                <View>
                    <View>
                        <Button onPress={this.datepicker} title="Show date picker!" />
                    </View>
                    <View>
                        <Button onPress={this.timepicker} title="Show time picker!" />
                    </View>
                    {show && <DateTimePicker value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate} />
                    }
                </View>

                <View style={styles.container}>
                    <Button
                        title="Enviar"
                        // onPress={() => Alert.alert('Simple Button pressed')}
                        onPress={() => this.props.atividadeStore.getReportActivity()}
                    />
                </View>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    avatars: {
        flexDirection: "row"
    },
    avatar: {
        marginRight: variables.contentPadding
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
    },
    view: {
        backgroundColor: "#fff"
    }

});
