// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {Linking} from "react-native";
import {View, Image, StyleSheet, Dimensions} from "react-native";
import {H1, Text, Button, Icon} from "native-base";

import {BaseContainer, Images, Styles} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";


@inject("authStore")
@observer
export default class Profile extends React.Component<ScreenProps<>> {

    getUserInformation = () => {
        if (this.props.authStore.authenticationType === "GOOGLE" || this.props.authStore.authenticationType === "FACEBOOK") {
            return (this.props.authStore.user.name);
        }
        return (this.props.authStore.user.name);
    };

    returnUserPhoto = () => {
        if (this.props.authStore.authenticationType === "GOOGLE") {
            return (
                <Image source={{uri: this.props.authStore.user.photoUrl}} style={style.img}/>
            );
        } else if (this.props.authStore.authenticationType === "FACEBOOK") {
            const facebookUrl = `https://graph.facebook.com/${this.props.authStore.user.id}/picture?height=700`;
            return (
                <Image source={{uri: facebookUrl}} style={style.img}/>
            );
        }
        return (
            <Image source={Images.profile} style={style.img}/>
        );
    };

    render(): React.Node {
        return (
            <BaseContainer title="AIRTRACKING" navigation={this.props.navigation} scrollable style={style.container}>
                {this.returnUserPhoto()}
                <View style={style.row}>
                    <H1>{this.getUserInformation()}</H1>
                    <Text style={Styles.textCentered}>Parabéns por estar praticando em alta performance conosco!</Text>
                </View>

                <View style={style.buttonsBottom}>
                    <View style={style.rowShare}>
                        <Button transparent block style={style.btn}
                                onPress={() => Linking.openURL("http://instagram.com/_u/rtairqual")}>
                            <Icon style={style.icon} name="logo-instagram"/>
                        </Button>
                        <Button transparent
                                onPress={() => Linking.openURL("https://www.facebook.com/n/?rtairqual")}
                                block style={[style.btn, style.facebook]}>
                            <Icon style={style.icon} name="logo-facebook"/>
                        </Button>
                    </View>
                </View>

            </BaseContainer>
        );
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    buttonsBottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10
    },
    img: {
        width,
        height: width * (500 / 750),
        resizeMode: "cover"
    },
    row: {
        justifyContent: "center",
        alignItems: "center",
        padding: variables.contentPadding * 2
    },
    rowShare: {
        borderTopWidth: variables.borderWidth,
        borderColor: "white",
        flexDirection: "row",
        height: 120
    },
    btn: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center",
        height: 125,
        flexDirection: "column"
    },
    icon: {
        fontSize: 35
    },
    facebook: {
        borderLeftWidth: variables.borderWidth,
        borderColor: "white"
    },
    container: {
        flex: 1
    }
});
