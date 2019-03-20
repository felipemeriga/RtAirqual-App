// @flow
import moment from "moment";
import * as React from "react";
import {ScrollView} from "react-native";
import {Icon, Picker} from "native-base";

import Month, {Date} from "./Month";

import {BaseContainer, Task} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

const now = moment();
const month = now.month();
const day = now.date();

type CalendarState = {
    selectedMonth: number,
    selectedDate: Date
};

export default class Calendar extends React.Component<ScreenProps<>, CalendarState> {

    state = {
        selectedMonth: month,
        selectedDate: { month, day }
    };

    onChangeMonth = (selectedMonth: number) => this.setState({ selectedMonth })
    onChangeDate = (selectedDate: Date) => this.setState({ selectedDate })

    render(): React.Node {
        const {navigation} = this.props;
        const {selectedMonth, selectedDate} = this.state;
        const width = 150;
        const itemTextStyle = { color: "black" };
        const itemStyle = { borderColor: "black" };
        const textStyle = { color: "white" };
        const title = (
            <Picker
                selectedValue={selectedMonth}
                onValueChange={this.onChangeMonth}
                style={{ width }}
                iosHeader="Select Month"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                {...{ itemTextStyle, itemStyle, textStyle}}
            >
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                        .map(val => <Picker.Item key={val} value={val} label={moment().month(val).format("MMMM")} />)
                }
            </Picker>
        );
        return (
            <BaseContainer {...{ navigation, title }}>
                <Month month={selectedMonth} date={selectedDate} onPress={this.onChangeDate} />
                <ScrollView>
                    <Task
                        date="2015-05-08 08:30"
                        title="New Icons"
                        subtitle="Mobile App"
                        completed
                    />
                    <Task
                        date="2015-05-08 10:00"
                        title="Coffee Break"
                        completed={false}
                    />
                    <Task
                        date="2015-05-08 14:00"
                        title="Design Stand Up"
                        subtitle="Hangouts"
                        collaborators={[1, 2, 3]}
                        completed={false}
                    />
                </ScrollView>
            </BaseContainer>
        );
    }
}
