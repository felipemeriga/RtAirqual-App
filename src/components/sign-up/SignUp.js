// @flow
import * as React from "react";
import {View, Image, StyleSheet, TextInput} from "react-native";
import {Button, Header, Left, Right, Body, Icon, Title, Text, Content} from "native-base";
import {Constants} from "expo";
import {inject, observer} from "mobx-react";
import {Container, Images, Field, Styles, SingleChoice, WindowDimensions} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";


@inject("authStore")
@observer
export default class SignUp extends React.Component<ScreenProps<>> {

    // $FlowFixMe
    username: TextInput;
    password: TextInput;
    name: TextInput;
    phone: TextInput;


    // $FlowFixMe
    setUsernameRef = (input: TextInput) => this.username = input._root;
    setNameRef = (input: TextInput) => this.name = input._root;
    setPhoneRef = (input: TextInput) => this.phone = input._root;
    goToUsername = () => this.username.focus();
    setPasswordRef = (input: TextInput) => this.password = input._root;
    goToPassword = () => this.password.focus();
    goToPhone = () => this.phone.focus();
    back = () => this.props.navigation.navigate("Login");
    signIn = () => console.log(this.name._getText());
    // signIn = () => this.props.authStore.signUp("felipe.meriga@gmail.com", "Meleka1!", {
    //     phone_number: "+5543996205231"
    // });
    facebookFederatedSignIn = () => this.props.authStore.facebookFederatedSignIn();
    googleFederatedSignIn = () => this.props.authStore.googleFederatedSignIn();

    render(): React.Node {
        return (
            <Container safe>
                <Image source={Images.gradient} style={style.img}/>
                <Content style={Styles.flexGrow}>
                    <Header noShadow>
                        <Left>
                            <Button onPress={this.back} transparent>
                                <Icon name="close"/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Criar Conta</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={style.row}>
                        <Button transparent block style={style.btn} onPress={this.googleFederatedSignIn}>
                            <Icon name="logo-google"/>
                            <Text style={Styles.textCentered}>Conectar com</Text>
                            <Text style={Styles.textCentered}>Google</Text>
                        </Button>
                        <Button transparent block style={[style.btn, style.facebook]}
                                onPress={this.facebookFederatedSignIn}>
                            <Icon name="logo-facebook"/>
                            <Text style={Styles.textCentered}>Conectar com</Text>
                            <Text style={Styles.textCentered}>Facebook</Text>
                        </Button>
                    </View>
                    <Button transparent block style={[style.btn, style.email]}>
                        <Icon name="ios-mail-outline" style={style.icon}/>
                        <Text>Ou use um endereço de email válido</Text>
                    </Button>
                    <View style={Styles.form}>
                        <Field
                            label="Nome"
                            textInputRef={this.setNameRef}
                            onSubmitEditing={this.goToUsername}
                            returnKeyType="next"
                        />
                        <Field
                            label="Email"
                            textInputRef={this.setUsernameRef}
                            onSubmitEditing={this.goToPassword}
                            returnKeyType="next"
                        />
                        <Field
                            label="Senha"
                            secureTextEntry
                            textInputRef={this.setPasswordRef}
                            onSubmitEditing={this.goToPhone}
                            returnKeyType="go"
                        />
                        <Field
                            label="Telefone"
                            textInputRef={this.setPhoneRef}
                            returnKeyType="next"
                            textContentType="telephoneNumber"
                        />
                    </View>
                </Content>
                <Button info block onPress={this.signIn} style={{height: variables.footerHeight}}>
                    <Text>CONTINUAR</Text>

                </Button>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...StyleSheet.absoluteFillObject,
        width: WindowDimensions.width,
        height: WindowDimensions.height - Constants.statusBarHeight,
        top: Constants.statusBarHeight
    },
    row: {
        flexDirection: "row"
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
    facebook: {
        borderLeftWidth: variables.borderWidth,
        borderColor: "white"
    },
    email: {
        borderTopWidth: variables.borderWidth,
        borderBottomWidth: variables.borderWidth,
        borderColor: "white",
        flexDirection: "row",
        height: 87
    },
    icon: {
        color: "white",
        marginRight: 5
    }
});
