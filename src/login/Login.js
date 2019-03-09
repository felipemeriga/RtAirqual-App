// @flow
import * as React from "react";
import {StyleSheet, Image, View, TextInput, SafeAreaView} from "react-native";
import { Button, Text, Content} from "native-base";
import {Constants} from "expo";

import {Images, WindowDimensions, Field, Small, Styles} from "../components";
import {AnimatedView} from "../components/Animations";
import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Login extends React.Component<ScreenProps<>> {

    // $FlowFixMe
    password: TextInput;


    // $FlowFixMe
    setPasswordRef = (input: TextInput) => this.password = input._root;
    goToPassword = () => this.password.focus();
    signIn = () => this.props.navigation.navigate("Walkthrough");
    signUp = () => this.props.navigation.navigate("SignUp");

    render(): React.Node {
        return (
            <View style={styles.container}>
                <Image source={Images.gradient} style={styles.image} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={[StyleSheet.absoluteFill, styles.content]}>
                        <AnimatedView style={styles.innerContent}>
                            <View style={styles.logo}>
                                <View>
                                    <Image source={Images.logoSymbol} style={styles.logoSymbol} />
                                </View>
                            </View>
                            <View style={styles.logoLetterView}>
                                <View>
                                    <Image source={Images.logoLetter} style={styles.logoLetter} />
                                </View>
                            </View>
                            <View>
                                <Field
                                    label="Usuário"
                                    autoCapitalize="none"
                                    returnKeyType="next"
                                    onSubmitEditing={this.goToPassword}
                                    inverse
                                />
                                <Field
                                    label="Senha"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    returnKeyType="go"
                                    textInputRef={this.setPasswordRef}
                                    onSubmitEditing={this.signIn}
                                    last
                                    inverse
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
    logo: {
        marginVertical: variables.contentPadding * 2,
        alignItems: "center",
        justifyContent: "center"
    },
    logoLetterView: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
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

