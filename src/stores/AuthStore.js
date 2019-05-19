// @flow
import {Animated} from "react-native";
import axios from "axios";
import {observable, action} from "mobx";
import {Auth} from "aws-amplify";
import {Facebook, Google} from "expo";
import Constants from "../components/constants/Constants";
import User from "../model/User";


class AuthStore {
    @observable authenticated: boolean = false;
    @observable autheticating: boolean = false;
    @observable authenticationType: string;
    @observable user = {};
    @observable error: string;
    @observable hasError: boolean = false;
    @observable animation: any;
    @observable name: any;
    @observable errorForm = {
        email: "",
        name: "",
        password: "",
        phone: ""
    };

    authMethod = {
        USER_POOLS: "USER_POOLS",
        FEDERATED: {
            GOOGLE: "GOOGLE",
            FACEBOOK: "FACEBOOK"
        }
    };

    @action
    async signIn(username: string, password: string): React.node {
        this.animation = new Animated.Value(0);
        this.autheticating = true;
        // const validationData = {};
        try {
            const user = await Auth.signIn(username, password);
            if (user.challengeName === "SMS_MFA" ||
                user.challengeName === "SOFTWARE_TOKEN_MFA") {
                console.log("SOFTWARE_TOKEN_MFA");
                // You need to get the code from the UI inputs
                // and then trigger the following function with a button click
                // If MFA is enabled, sign-in should be confirmed with the confirmation code
            } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                // Used when you have to set a new password
                await Auth.completeNewPassword(user, password)
                    .then(() => {
                        user.attributes.id = user.attributes.sub;
                        this.authenticationType = this.authMethod.USER_POOLS;
                        this.registerUserAccess(user.attributes);
                        console.log("Password updated");
                    });
            } else if (user.challengeName === "MFA_SETUP") {
                console.log("MFA_SETUP");
                // This happens when the MFA method is TOTP
                // The user needs to setup the TOTP before using it
                // More info please check the Enabling MFA part
                Auth.setupTOTP(user);
            } else {
                // The user directly signs in
                user.attributes.id = user.attributes.sub;
                this.authenticationType = this.authMethod.USER_POOLS;
                this.registerUserAccess(user.attributes);
            }
        } catch (err) {
            let message: string;
            if (err.code === "UserNotConfirmedException") {
                message = "Seu usuário não esta confirmado!";
                // The error happens if the user didn"t finish the confirmation step when signing up
                // In this case you need to resend the code and confirm the user
                // About how to resend the code and confirm the user, please check the signUp part
            } else if (err.code === "PasswordResetRequiredException") {
                message = "Sua senha foi resetada, acesse esqueci minha senha";
                // The error happens when the password is reset in the Cognito console
                // In this case you need to call forgotPassword to reset the password
                // Please check the Forgot Password part.
            } else if (err.code === "NotAuthorizedException") {
                message = "Senha inválida";
                // The error happens when the incorrect password is provided
            } else if (err.code === "UserNotFoundException") {
                message = "Usuário inexistente";
                // The error happens when the supplied username/email does not exist in the Cognito user pool
            } else {
                console.log(err);
            }
            this.signInError(message);
        }
    }

    @action
    async facebookFederatedSignIn(): React.Node {
        this.animation = new Animated.Value(0);
        this.autheticating = true;
        const {type, token, expires} = await Facebook.logInWithReadPermissionsAsync(Constants.facebookAppClient, {
            permissions: ["public_profile", "email"]
        });
        if (type === "success") {
            const responseQl = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
            const userInformation = await responseQl.json();
            const expireToken = expires * 10000 + new Date().getTime();
            // sign in with federated identity
            Auth.federatedSignIn("facebook", {token, expires_at: expireToken}, userInformation)
                .then(credentials => {
                    console.log("Got aws credentials", Object.getOwnPropertyNames(credentials.cognito.config.params.Logins));
                    this.authenticationType = this.authMethod.FEDERATED.FACEBOOK;
                    this.registerUserAccess(userInformation);
                })
                .catch(e => {
                    this.signInError("Erro ao conectar ao facebook");
                    console.log(e);
                });
        }
    }


    @action
    async googleFederatedSignIn(): React.Node {
        this.animation = new Animated.Value(0);
        this.autheticating = true;
        const {type, idToken, user, accessTokenExpirationDate} = await Google.logInAsync({
            androidClientId: Constants.androidClientId,
            iosClientId: Constants.iosClientId,
            scopes: ["profile", "email"]
        });

        if (type === "success") {

            Auth.federatedSignIn("google", {token: idToken, expires_at: accessTokenExpirationDate}, user)
                .then(credentials => {
                    this.authenticationType = this.authMethod.FEDERATED.GOOGLE;
                    this.registerUserAccess(user);
                })
                .catch(e => {
                    this.signInError("Erro ao conectar ao google");
                    console.log(e);
                });
        }
    }

    // TODO - Verify data to call successful login
    @action
    async signUp(username: string, password: string, attributes: {}): React.node {
        this.animation = new Animated.Value(0);
        this.autheticating = true;
        Auth.signUp({
            username,
            password,
            attributes,
            validationData: [] // optional
        })
            .then(data => {
                const user = {
                    id: data.userSub.toString()
                };
                console.log(data);
                this.authenticationType = this.authMethod.USER_POOLS;
                this.registerUserAccess(user);
            })
            .catch(err => this.signUpError(err));
    }


    @action
    async signOut(): React.node {
        Auth.signOut({global: true})
            .then((data) => {
                console.log(data);
                this.authenticated = false;
                this.error = false;
                this.autheticating = false;
            })
            .catch(err => {
                console.log(err);
            });
    }

    @action
    async userIsAlreadyAuthenticated(user: any): React.Node {
        this.user = user;
        this.authenticated = true;
        this.autheticating = false;
        this.hasError = false;
        this.user = user;
        this.error = "";
    }


    @action
    async clearSignUpForm(): React.Node {
        this.errorForm.name = "";
        this.errorForm.email = "";
        this.errorForm.password = "";
        this.errorForm.phone = "";
    }

    successfulSignIn(user: any): React.Node {
        console.log("authenticated");
        this.animation = new Animated.Value(0);
        this.authenticated = true;
        this.autheticating = false;
        this.hasError = false;
        this.user = user;
        this.error = "";
    }

    signInError(message: string): React.Node {
        this.animation = new Animated.Value(0);
        this.authenticated = false;
        this.autheticating = false;
        this.error = message;
        this.hasError = true;
    }

    logInError(message: string): React.Node {
        this.authenticated = false;
        this.autheticating = false;
        this.error = message;
        this.hasError = true;
    }

    signUpError(err: any): React.Node {
        if (err.code === "UsernameExistsException") {
            this.error = "Já existe um usuário com esse email";
        } else if (err.code === "NotAuthorizedException") {
            this.error = "Senha inválida";
        } else if (err.code === "InvalidParameterException") {
            this.error = "Formato de telefone inválido, o correto é DDD+Número sem espaços";
        }
        this.animation = new Animated.Value(0);
        this.authenticated = false;
        this.autheticating = false;
        this.hasError = true;
    }

    @action
    errorAlreadyShown(): React.Node {
        this.hasError = false;
        this.error = "";
    }

    @action
    getUserAuthMethod(user: any) {
        console.log("registering user");
        const type = "update";
        axios.post("https://gfr41svvbi.execute-api.us-west-2.amazonaws.com/dev", {
            id: user.id,
            type: "new"
        })
            .then((response) => {
                console.log(JSON.stringify(response));
                this.userIsAlreadyAuthenticated(user);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                this.signInError("Erro ao conectar ao servidor");
            });

    }

    @action
    async registerUserAccess(user: any): React.Node {
        axios.post("https://gfr41svvbi.execute-api.us-west-2.amazonaws.com/dev", {
            id: user.id,
            authenticationType: this.authenticationType,
            type: "new"
        })
            .then((response) => {
                console.log(JSON.stringify(response));
                this.successfulSignIn(user);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                this.signInError("Erro ao conectar ao servidor");
            });
    }
}

export default new AuthStore();
