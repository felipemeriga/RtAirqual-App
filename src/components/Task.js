// @flow
import moment from "moment";
import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {H3} from "native-base";

import Avatar from "../components/Avatar";
import Styles from "../components/Styles";

import variables from "../../native-base-theme/variables/commonColor";
// import Circle from "../components/Circle";

type TaskProps = {
    date: string,
    title: string,
    subtitle?: string,
    collaborators?: number[],
    completed?: boolean,
    timeline?: boolean
};

export default class Task extends React.PureComponent<TaskProps> {

    static defaultProps = {
        collaborators: []
    }

    render(): React.Node {
        const {title, subtitle, collaborators, timeline} = this.props;
        const date = moment(this.props.date);
        // $FlowFixMe
        const height = collaborators.length > 1 ? 150 : 100;
        return (
            <View style={[Styles.listItem, { height }, timeline ? style.noBorder : {}]}>
                <View style={[style.title, timeline ? style.timelineLeft : {}]}>
                    <H3>{title}</H3>
                    {subtitle && <Text style={Styles.grayText}>{subtitle}</Text>}
                    <View style={style.row}>
                        {
                            // $FlowFixMe
                            collaborators.map((id, key) => <Avatar {...{ id, key }} style={style.avatar} />)
                        }
                    </View>
                </View>
                <View style={[style.time, timeline ? style.timelineRight : {}]}>
                    <Text style={style.titleText}>{date.format("HH")}</Text>
                    <View>
                        <Text style={Styles.whiteText}>{`\xa0${date.format("mm")}`}</Text>
                        <Text style={Styles.grayText}>{`\xa0${date.format("A")}`}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        marginTop: variables.contentPadding,
        marginRight: variables.contentPadding
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        padding: variables.contentPadding
    },
    title: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    },
    titleText: {
        fontSize: (variables.fontSizeBase * 2) + variables.contentPadding,
        color: "white"
    },
    noBorder: {
        borderBottomWidth: 0
    },
    timelineLeft: {
        flex: 0.5,
        borderRightWidth: variables.borderWidth,
        borderColor: variables.listBorderColor
    },
    timelineRight: {
        flex: 0.5,
        justifyContent: "flex-end"
    }
});
