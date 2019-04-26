// @flow
import * as React from "react";
import {StyleSheet, Image, View, TextInput, SafeAreaView} from "react-native";
import {inject, observer} from "mobx-react";
import {Button, Text, Content} from "native-base";
import {Constants} from "expo";

import {Images, WindowDimensions, Field, Small, Styles} from "../pure-components";
import {AnimatedView} from "../pure-components/Animations";
import type {ScreenProps} from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";

@inject("authStore")
@observer
export default class Login extends React.Component<ScreenProps<>> {

    // $FlowFixMe
    password: TextInput;
    email: TextInput;


    componentWillUnmount(): React.Node {
        if (this.props.user != null) {
            this.props.authStore.firstAccess = false;
            this.props.authStore.authenticated = true;
            this.props.authStore.user = this.props.user;
            this.props.navigation.navigate("Main");
        }
    }

    checkAuthentication(): React.Node {
        if (this.props.authStore.authenticated && this.props.authStore.firstAccess) {
            this.props.navigation.navigate("Walkthrough");
        } else if (this.props.authStore.authenticated && !this.props.authStore.firstAccess) {
            this.props.navigation.navigate("Main");
        }
    }


    // $FlowFixMe
    setPasswordRef = (input: TextInput) => this.password = input._root;
    setEmailRef = (input: TextInput) => this.email = input._root;
    goToPassword = () => this.password.focus();
    signIn = () => this.props.navigation.navigate("Walkthrough");
    // signIn = () => this.props.authStore.signIn("felipe.meriga@gmail.com", "Meleka1!");
    signUp = () => this.props.navigation.navigate("SignUp");

    render(): React.Node {
        this.checkAuthentication();
        return (
            <View style={styles.container}>
                <Image source={Images.loginBackground} style={styles.image}/>
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={[StyleSheet.absoluteFill, styles.content]}>
                        <AnimatedView style={styles.innerContent}>
                            <View style={styles.verticalAlign}>
                                <View style={styles.logo}>
                                    <View>
                                        <Image source={Images.logoSymbol} style={styles.logoSymbol}/>
                                    </View>
                                </View>
                                <View style={styles.logoLetterView}>
                                    <View>
                                        <Image source={Images.logoLetter} style={styles.logoLetter}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Field
                                    label="Usuário ou email"
                                    autoCapitalize="none"
                                    returnKeyType="next"
                                    textInputRef={this.setEmailRef}
                                />
                                <Field
                                    label="Senha"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    returnKeyType="go"
                                    textInputRef={this.setPasswordRef}
                                    onSubmitEditing={this.signIn}
                                    last
                                />
                                <View>
                                    <View>
                                        <Button info full onPress={this.signIn}>
                                            <Text>Entrar</Text>
                                        </Button>
                                    </View>
                                    <View>
                                        <Button transparent full onPress={this.signUp}>
                                            <Small style={Styles.whiteText}>Ainda não possui conta? Crie agora!</Small>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </AnimatedView>
                    </Content>
                </SafeAreaView>
            </View>
        );
    }
}

const {height, width} = WindowDimensions;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        height,
        width
    },
    content: {
        flexGrow: 1
    },
    innerContent: {
        height: height - Constants.statusBarHeight,
        justifyContent: "flex-end"
    },
    verticalAlign: {
        flexDirection: "column"
    },
    logo: {
        marginVertical: variables.contentPadding * 2,
        alignItems: "center",
        justifyContent: "center"
    },
    logoLetterView: {
        alignItems: "center",
        justifyContent: "center"
    },
    logoSymbol: {
        width: width * 0.25,
        height: height * 0.15,
        alignItems: "center",
        justifyContent: "center"
    },
    logoLetter: {
        width: width * 0.4,
        height: height * 0.1
    }

});

