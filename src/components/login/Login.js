// @flow
import * as React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, Image, View, TextInput, SafeAreaView, Animated, ToastAndroid, KeyboardAvoidingView, StatusBar, AppRegistry, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { inject, observer } from "mobx-react";
import { Button, Text, Content } from "native-base";
import Constants from 'expo-constants'
import { Alert } from "react-native";

import { Images, WindowDimensions, Field, Small, Styles } from "../pure-components";
import { AnimatedView } from "../pure-components/Animations";
import type { ScreenProps } from "../pure-components/Types";


import variables from "../../../native-base-theme/variables/commonColor";


const background = require("../../../assets/images/fundo_1.png");
const mark = require("../../../assets/images/login1_mark.png");
const lockIcon = require("../../../assets/images/login1_lock.png");
const personIcon = require("../../../assets/images/login1_person.png");

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
                    <Progress.Circle
                        size={65} indeterminate
                        color="#0BFBE1"
                        borderWidth={5}
                    />
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, margin: 10 }}>Conectando. . .</Text>
                </View>
            );
        }
        return (
            // <KeyboardAvoidingView behavior="padding">
            //     <StatusBar
            //         backgroundColor="black"
            //         barStyle="light-content"
            //     />
            //     <Field
            //         label="Usuário ou email"
            //         autoCapitalize="none"
            //         returnKeyType="next"
            //         textInputRef={this.setEmailRef}
            //     />
            //     <Field
            //         label="Senha"
            //         secureTextEntry
            //         autoCapitalize="none"
            //         returnKeyType="go"
            //         textInputRef={this.setPasswordRef}
            //         onSubmitEditing={this.signIn}
            //         last
            //     />
            //     <View>
            //         <View>
            //             <Button info full onPress={this.signIn}>
            //                 <Text>Entrar</Text>
            //             </Button>
            //         </View>
            //         <View>
            //             <Button transparent full onPress={this.signUp}>
            //                 <Small style={Styles.whiteText}>Cadastre-se!</Small>
            //             </Button>
            //         </View>
            //     </View>
            // </KeyboardAvoidingView>
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={Images.logoLetter} style={styles.logoLetter} resizeMode="contain" />
                        {/* <Image source={mark} style={styles.mark} resizeMode="contain" /> */}
                    </View>
                    <View style={styles.wrapper}>
                        <Field
                            label="Email"
                            autoCapitalize="none"
                            returnKeyType="next"
                            style={styles.input} 
                            textInputRef={this.setEmailRef}
                            last
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
                        {/* <TouchableOpacity activeOpacity={.5}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity activeOpacity={.5} onPress={this.signIn}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText} >Entrar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>Ainda não tem uma conta?</Text>
                            <TouchableOpacity activeOpacity={.5}>
                                <View>
                                    <Text style={styles.signupLinkText} onPress={this.signUp}>Cadastrar!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    // $FlowFixMe
    setPasswordRef = (input: TextInput) => this.password = input._root;
    setEmailRef = (input: TextInput) => this.email = input._root;
    goToPassword = () => this.password.focus();
    signIn = () => this.props.navigation.navigate("Home");
    // signIn = () => {
        // if (this.email._getText() === "" || this.password._getText() === "") {
        //     this.props.authStore.logInError("É necessário preencher os campos corretamente!");
        // } else {
        // this.props.authStore.signIn(this.email._getText()
            // .toLocaleLowerCase(), this.password._getText());
        // }
    // };



    signUp = () => this.props.navigation.navigate("SignUp");

    render(): React.Node {
        this.onLoad();
        this.hasError();
        return (
            <View style={styles.container}>
                <Image source={Images.loginBackground} style={styles.image} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={[StyleSheet.absoluteFill, styles.content]}>
                        <AnimatedView style={styles.innerContent}>
                            <Animated.View style={{ opacity: this.props.authStore.animation }}>
                                {/* <View style={styles.verticalAlign}> */}
                                {/* <View style={styles.logo}>
                                        <View>
                                            <Image source={Images.logoSymbol} style={styles.logoSymbol} />
                                        </View>
                                    </View> */}
                                {/* <View style={styles.logoLetterView}>
                                    <View>
                                        <Image source={Images.logoLetter} style={styles.logoLetter} />
                                    </View>
                                </View> */}
                                {/* </View> */}
                            </Animated.View>
                            {this.renderContent()}
                        </AnimatedView>
                    </Content>
                </SafeAreaView>
            </View>
        );
    }
}

const { height, width } = WindowDimensions;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     image: {
//         height,
//         width
//     },
//     content: {
//         flexGrow: 1
//     },
//     innerContent: {
//         height: height - Constants.statusBarHeight,
//         justifyContent: "flex-end"
//     },
//     verticalAlign: {
//         flexDirection: "column"
//     },
//     logo: {
//         marginVertical: variables.contentPadding * 2,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 200

//     },
//     logoLetterView: {
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     loadingCircle: {
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     logoSymbol: {
//         width: width * 0.25,
//         height: height * 0.15,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     logoLetter: {
//         width: width,
//         height: height * 0.11,
//         marginBottom: height * 0.15
//     }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        marginTop: 300,
        paddingVertical: 30
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        //	HTML code:	#01FEE9
// RGB code:	R: 1 G: 254 B: 233  
        backgroundColor: "rgba(1,254,254, 0.5)",
        // backgroundColor: "#111",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    },
    logoLetter: {
        width: width,
        height: height * 0.11,
        marginTop: height * 0.15
    }
});
