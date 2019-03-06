// @flow
import * as React from "react";
import {View, Dimensions, Image, StyleSheet} from "react-native";
import {Text, Icon} from "native-base";

import {BaseContainer, Images, Field, SingleChoice} from "../components";
import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Settings extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        return (
            <BaseContainer title="Settings" navigation={this.props.navigation} scrollable>
                <View style={style.img}>
                    <Image source={Images.profile} resizeMode="cover" style={[StyleSheet.absoluteFill, style.img]} />
                    <View style={style.add}>
                        <Icon name="ios-camera-outline" style={{ color: variables.brandSecondary }} />
                    </View>
                </View>
                <View style={style.section}>
                    <Text>GENERAL</Text>
                </View>
                <View>
                    <Field label="Name" defaultValue="Paul Jensen" />
                    <Field label="Email" defaultValue="paul@gmail.com" />
                    <Field label="Password" defaultValue="foobar" secureTextEntry />
                    <Field label="Gender">
                        <SingleChoice labels={["Male", "Female"]} />
                    </Field>
                    <Field label="Birthday" defaultValue="May 25, 1983" />
                </View>
            </BaseContainer>
        );
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    img: {
        width,
        height: width * (500 / 750)
    },
    add: {
        backgroundColor: "white",
        height: 50,
        width: 50,
        borderRadius: 25,
        position: "absolute",
        bottom: variables.contentPadding,
        left: variables.contentPadding,
        alignItems: "center",
        justifyContent: "center"
    },
    section: {
        padding: variables.contentPadding * 2,
        borderBottomWidth: variables.borderWidth,
        borderColor: variables.listBorderColor
    }
});
