// @flow
import * as React from "react";
import * as Progress from "react-native-progress";
import {StyleSheet, Image, View, TextInput, SafeAreaView, Animated, ToastAndroid} from "react-native";
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

    componentDidUpdate(): React.Node {
        if (this.props.authStore.authenticated) {
            this.props.navigation.navigate("Home");
        }
    }

    onLoad(): React.Node {
        Animated.timing(this.props.authStore.animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        })
            .start();
    }

    componentWillMount(): React.Node {
        this.props.authStore.signOut();
        this.props.authStore.animation = new Animated.Value(0);
        this.props.authStore.errorAlreadyShown();
    }

    hasError(): React.Node {
        if (this.props.authStore.hasError) {
            ToastAndroid.show(this.props.authStore.error, ToastAndroid.LONG);
        }
    }

    renderContent(): React.Node {
        if (this.props.authStore.autheticating) {
            return (
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Progress.Circle size={80} indeterminate style={styles.loadingCircle}/>
                </View>
            );
        }
        return (
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
        );
    }


    // $FlowFixMe
    setPasswordRef = (input: TextInput) => this.password = input._root;
    setEmailRef = (input: TextInput) => this.email = input._root;
    goToPassword = () => this.password.focus();
    signIn = () => this.props.navigation.navigate("Walkthrough");
    // signIn = () => {
    //
    //     if (this.email._getText() === "" || this.password._getText() === "") {
    //         this.props.authStore.logInError("Preencha todos os campos!");
    //     } else {
    //         this.props.authStore.signIn(this.email._getText()
    //             .toLocaleLowerCase(), this.password._getText());
    //     }
    //
    // };
    signUp = () => this.props.navigation.navigate("SignUp");

    render(): React.Node {
        this.onLoad();
        this.hasError();
        return (
            <View style={styles.container}>
                <Image source={Images.loginBackground} style={styles.image}/>
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={[StyleSheet.absoluteFill, styles.content]}>
                        <AnimatedView style={styles.innerContent}>
                            <Animated.View style={{opacity: this.props.authStore.animation}}>
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
                            </Animated.View>
                            {this.renderContent()}
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
        flex: 1
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
    loadingCircle: {
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
