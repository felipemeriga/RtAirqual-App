// @flow
import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import {H1, H3} from "native-base";

import Styles from "./Styles";

import variables from "../../../native-base-theme/variables/commonColor";

type TaskOverviewProps = {
    textoEsquerda: text,
    textoDireita: text
};

export default class TaskOverview extends React.PureComponent<TaskOverviewProps> {
    render(): React.Node {
        const {textoEsquerda, textoDireita} = this.props;
        return (
            <View style={style.container}>
                <View style={[style.count, Styles.center, style.leftCell]}>
                    <H3 style={style.heading}>{`${textoEsquerda}`}</H3>
                </View>
                <View style={[style.count, Styles.center, style.rightCell]}>
                    <H3 style={style.heading}>{`${textoDireita}`}</H3>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderTopWidth: variables.borderWidth,
        borderBottomWidth: variables.borderWidth,
        borderColor: variables.listBorderColor
    },
    leftCell: {
        flex: 1,
        borderRightWidth: variables.borderWidth,
        borderColor: variables.listBorderColor
    },
    rightCell: {
        flex: 1
    },
    count: {
        flex: 0.5,
        padding: variables.contentPadding * 2
    },
    heading: {
        color: "white"
    }
});
