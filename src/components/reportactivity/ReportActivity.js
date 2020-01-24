// @flow
import moment from "moment";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Icon, Text } from "native-base";

import { BaseContainer, Styles, Task } from "../components";
import type { ScreenProps } from "../components/Types";
import DatePicker from 'react-native-datepicker';

import variables from "../../native-base-theme/variables/commonColor";

export default class ReportActivity extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        //const today = moment();
        return (
            <BaseContainer title="ReportActivity" navigation={this.props.navigation} scrollable>
                <View style={styles.container}>

                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        maxDate="01-01-2019"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />

                </View>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding:16,
        flex: 1
    },
    feelingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    feelingsContent: {
        alignItems: 'center',
        padding: 10,
    },
    title: {
        color: '#00acee',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
});

