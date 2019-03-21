// @flow
import * as React from "react";
import {View} from "react-native";
import {Button, Text, CheckBox as RNCheckBox} from "native-base";

import Styles from "./Styles";

type SingleChoiceProps = {
    labels: string[]
};

type SingleChoiceState = {
    index: number
};

export default class SingleChoice extends React.Component<SingleChoiceProps, SingleChoiceState> {

    state = {
        index: -1
    };

    render(): React.Node {
        const {labels} = this.props;
        const {index} = this.state;
        return (
            <View style={Styles.row}>
                {
                    labels.map((label, i) => (<CheckBox
                        key={i}
                        label={label}
                        checked={i === index}
                        onPress={() => this.setState({ index: i })}
                    />))
                }
            </View>
        );
    }
}

type CheckBoxProps = {
    label: string,
    checked: boolean,
    onPress: () => mixed
};

class CheckBox extends React.PureComponent<CheckBoxProps> {

    render(): React.Node {
        const {label, checked, onPress} = this.props;
        const style = { color: checked ? "white" : "rgba(255, 255, 255, .5)" };
        const margin = 15;
        return (
            <Button {...{ onPress }} disabled={checked} transparent>
                <RNCheckBox {...{ checked, onPress }} style={{ margin }} />
                <Text {...{style}}>{label}</Text>
            </Button>
        );
    }
}
