// @flow
import * as React from "react";
import {View, Image, StyleSheet, ToastAndroid, Animated} from "react-native";
import * as Progress from "react-native-progress";
import {TextField} from "react-native-material-textfield";
import {Button, Header, Left, Right, Body, Icon, Title, Text, Content} from "native-base";
import {Constants} from "expo";
import {inject, observer} from "mobx-react";
import {Container, Images, Styles, WindowDimensions} from "../pure-components";
import {AnimatedView} from "../pure-components/Animations";
import type {ScreenProps} from "../pure-components/Types";
import variables from "../../../native-base-theme/variables/commonColor";


@inject("authStore")
@observer
export default class SignUp extends React.Component<ScreenProps<>> {

    // $FlowFixMe
    username: string;
    password: string;
    name: string;
    phone: string;


    // $FlowFixMe
    back = () => this.props.navigation.navigate("Login");
    facebookFederatedSignIn = () => this.props.authStore.facebookFederatedSignIn();
    googleFederatedSignIn = () => this.props.authStore.googleFederatedSignIn();

    componentDidUpdate(): React.Node {
        if (this.props.authStore.authenticated) {
            this.props.navigation.navigate("Home");
        }
    }

    componentWillMount(): React.Node {
        this.props.authStore.animation = new Animated.Value(0);
        this.props.authStore.errorAlreadyShown();
    }

    onLoad(): React.Node {
        Animated.timing(this.props.authStore.animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        })
            .start();
    }


    hasError(): React.Node {
        if (this.props.authStore.hasError) {
            ToastAndroid.show(this.props.authStore.error, ToastAndroid.LONG);
        }
    }

    validateFields = () => {
        this.props.authStore.clearSignUpForm();
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const numberRegex = /\d{2,3}\d{4,5}\d{4}/;

        if (regEmail.test(this.username) === false) {
            this.props.authStore.errorForm.email = "Email no formato inválido";
        } else if (regPass.test(this.password) === false) {
            this.props.authStore.errorForm.password = "A senha deve ter no mínimo 8 dígitos, uma letra maiúscula e um caracter especial";
        } else if (numberRegex.test(this.phone) === false) {
            this.props.authStore.errorForm.phone = "O telefone deve estar no formato Código de área + número";
        } else {
            this.props.authStore.signUp(this.username.toLocaleLowerCase(), this.password, {
                phone_number: "+55" + this.phone,
                name: this.name
            });
        }
    };


    renderContent(): React.Node {

        if (this.props.authStore.autheticating) {
            return (
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Progress.Circle size={80} indeterminate/>
                </View>
            );
        }
        return (

            <Content contentContainerStyle={style.container}>
                <AnimatedView>
                    <Animated.View style={{opacity: this.props.authStore.animation}}>
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
                            <Button transparent
                                    block style={[style.btn, style.facebook]}
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
                        <View style={[Styles.form, Styles.flexGrow]}>
                            <View>
                                <TextField
                                    textColor="#6267d1"
                                    fontSize={20}
                                    baseColor="#FFFFFF"
                                    labelFontSize={20}
                                    value={this.name}
                                    onChangeText={(e) => this.name = e}
                                    label="Nome"
                                />
                                <TextField
                                    textColor="#6267d1"
                                    fontSize={20}
                                    baseColor="#FFFFFF"
                                    labelFontSize={20}
                                    value={this.username}
                                    error={this.props.authStore.errorForm.email}
                                    onChangeText={(e) => this.username = e}
                                    label="Email"
                                />
                                <TextField
                                    textColor="#6267d1"
                                    fontSize={20}
                                    baseColor="#FFFFFF"
                                    labelFontSize={20}
                                    secureTextEntry
                                    error={this.props.authStore.errorForm.password}
                                    value={this.password}
                                    onChangeText={(e) => this.password = e}
                                    label="Senha"
                                />
                                <TextField
                                    textColor="#6267d1"
                                    fontSize={20}
                                    baseColor="#FFFFFF"
                                    labelFontSize={20}
                                    keyboardType="phone-pad"
                                    value={this.phone}
                                    error={this.props.authStore.errorForm.phone}
                                    onChangeText={(e) => this.phone = e}
                                    label="Telefone"
                                />
                            </View>
                        </View>
                        <Button info block onPress={this.validateFields} style={{height: variables.footerHeight}}>
                            <Text>CONTINUAR</Text>
                        </Button>
                    </Animated.View>
                </AnimatedView>
            </Content>

        );


    }

    render(): React.Node {
        this.onLoad();
        this.hasError();
        return (
            <Container safe style={Styles.flexGrow}>
                <Image source={Images.gradient} style={style.img}/>
                {this.renderContent()}
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
    loadingCircle: {
        marginTop: 60,
        alignItems: "center",
        justifyContent: "center"
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
