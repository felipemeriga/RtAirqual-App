// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {Linking} from "react-native";
import {View, Image, StyleSheet, Dimensions} from "react-native";
import {H1, Text, Button, Icon} from "native-base";
import { Ionicons } from '@expo/vector-icons';

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
            <BaseContainer title="Airtrak" navigation={this.props.navigation} scrollable style={style.container}>
                {this.returnUserPhoto()}
                <View style={style.row}>
                    <H1>Olá, {this.getUserInformation()}</H1>
                    <Text style={Styles.textCentered}>Parabéns por estar praticando em alta performance conosco!</Text>
                    <Text style={Styles.textCentered}>{'\n'}Em breve teremos várias informações importantíssimas para que você dê um gás na sua performance, fique ligado!</Text>
                    <Text style={Styles.textCentered}>{'\n'}Enquanto isso, não deixe de nos conferir nas redes sociais e ficar por dentro das novidades!</Text>
                </View>

                <View style={style.buttonsBottom}>
                    <View style={style.rowShare}>
                        <Button transparent block style={style.btn}
                                onPress={() => Linking.openURL("https://www.instagram.com/airtrak/")}>
                            {/* <Icon style={style.icon} name="logo-instagram" /> */}
                            <Ionicons name="logo-instagram" size={50} color="white" />
                            <Text style={style.buttonText}>Instagram</Text>
                        </Button>
                        <Button transparent
                                onPress={() => Linking.openURL("https://www.facebook.com/n/?rtairqual")}
                                block style={[style.btn, style.facebook]}>
                            {/* <Icon style={style.icon} name="logo-facebook"/> */}
                            <Ionicons name="logo-facebook" size={50} color="white" />
                            <Text style={style.buttonText}>Facebook</Text>
                        </Button>
                    </View>
                </View>
                <Text style={style.version}>V. 4.0.2</Text>
            </BaseContainer>
        );
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    buttonsBottom: {
        flex: 1,
        marginBottom: 10
    },
    img: {
        width,
        height: width * 0.6,
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
    },
    buttonText: {
        color: 'white'
    },
    version: {
        color: 'white',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center"
    }
});
