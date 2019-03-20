// @flow
import * as React from "react";
import {StyleSheet, Image, Dimensions, View} from "react-native";
import {H1} from "native-base";

import {BaseContainer, Images, Small} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";

export default class Groups extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        return (
            <BaseContainer title="Groups" navigation={this.props.navigation} scrollable>
                <Group title="Music" description="15 ITEMS" picture={Images.music} />
                <Group title="Architecture" description="18 ITEMS" picture={Images.architecture} />
                <Group title="Travel" description="8 ITEMS" picture={Images.travel} />
            </BaseContainer>
        );
    }
}

type GroupProps = {
    title: string,
    description: string,
    picture: string
};

class Group extends React.PureComponent<GroupProps> {

    render(): React.Node {
        const {title, description, picture} = this.props;
        return (
            <View style={style.container}>
                <Image source={picture} resizeMode="cover" style={style.img} />
                <H1>{title}</H1>
                <Small style={style.text}>{description.toUpperCase()}</Small>
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    container: {
        width,
        height: width * (402 / 750),
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        ...StyleSheet.absoluteFillObject,
        width,
        height: width * (402 / 750)
    },
    text: {
        borderColor: "white",
        borderWidth: variables.borderWidth,
        padding: variables.contentPadding,
        margin: variables.contentPadding
    }
});
