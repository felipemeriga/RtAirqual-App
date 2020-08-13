// @flow
import * as React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, Image, View, TextInput, SafeAreaView, Animated, ToastAndroid, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StatusBar, AppRegistry, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { inject, observer } from "mobx-react";
import { Button, Text, Content } from "native-base";
import Constants from 'expo-constants'
import { Alert } from "react-native";
import { Images, WindowDimensions, Field, Small, Styles } from "../pure-components";
import { AnimatedView } from "../pure-components/Animations";
import type { ScreenProps } from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";

const background = require("../../../assets/images/fundo_1.png");

@inject("authStore")
@observer
export default class Login extends React.Component<ScreenProps<>> {
    // $FlowFixMe
    password: TextInput;
    email: TextInput;

    // state={
    //     email:"",
    //     password:""
    //   }

    googleFederatedSignIn = () => this.props.authStore.googleFederatedSignIn();

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
        console.log("bateu compwillmount");
        if (this.props.authStore.logado == true) {
            console.log("VALOR=TRUE");
        } else {
            console.log("VALOR=FALSE");
        }
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
                    <Text style={styles.textoLoading}>Conectando ao servidor...</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={Images.logoLetter} style={styles.logoLetter} resizeMode="contain" />
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
                        <TouchableOpacity activeOpacity={.5} style={styles.button} onPress={this.signIn}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} onPress={this.googleFederatedSignIn} style={styles.buttonGoogle}>
                            <Text style={styles.buttonText} >Entrar com Google</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            {/* <Text style={styles.accountText}>Ainda não tem uma conta?</Text> */}
                            <TouchableOpacity>
                                <View>
                                    <Text style={styles.signupLinkText} onPress={this.signUp}>Criar nova conta</Text>
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
    // signIn = () => this.props.navigation.navigate("Home");
    signIn = () => {
        if (this.email._getText() === "" || this.password._getText() === "") {
            this.props.authStore.logInError("É necessário preencher os campos corretamente!");
        } else {
            this.props.authStore.signIn(this.email._getText()
                .toLocaleLowerCase(), this.password._getText());
        }
    };



    signUp = () => this.props.navigation.navigate("SignUp");

    render(): React.Node {
        this.onLoad();
        this.hasError();
        return (
            <View style={styles.containerLoading}>
                {this.renderContent()}
            </View>
        );
    }
}

const { height, width } = WindowDimensions;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"black"
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
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        borderRadius: 25
    },
    buttonGoogle: {
        backgroundColor: "#db3236",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        borderRadius: 25
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8",
        fontSize: 20
    },
    signupLinkText: {
        color: "#FFF",
        fontSize: 25
    },
    logoLetter: {
        width: width,
        height: height * 0.11,
        marginTop: height * 0.15
    },
    textoLoading: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        margin: 10
    },




    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "90%",
        // backgroundColor: "#fff",
        backgroundColor: "rgba(247,252,252, 0.7)",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 60,
        color: "black"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "85%",
        // backgroundColor: "#fb5b5a",
        backgroundColor: "rgba(1,254,254, 0.5)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginBtnGoogle: {
        width: "85%",
        backgroundColor: "#db3236",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    loginText: {
        color: "white",
        fontSize: 20
    }
});
