// @flow
import * as React from "react";
import {Text, StyleSheet} from "react-native";
import variables from "../../native-base-theme/variables/commonColor";

import type {BaseProps, ChildrenProps} from "./Types";

type SmallProps = BaseProps & ChildrenProps;

export default class Small extends React.PureComponent<SmallProps> {
    render(): React.Node {
        return <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>;
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: variables.white
    }
});
