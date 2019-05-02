// @flow
import {observable, action} from "mobx";
import {Auth} from "aws-amplify";
import {Facebook, Google} from "expo";
import Constants from "../components/constants/Constants";


class AuthStore {
    @observable authenticated: boolean = false;
    @observable autheticating: boolean = false;
    @observable user = {};
    @observable error: string;
    @observable hasError: boolean = false;
    authMethod = {
        USER_POOLS: "USER_POOLS",
        FEDERATED: {
            GOOGLE: "GOOGLE",
            FACEBOOK: "FACEBOOK"
        }
    };

    @action
    async signIn(username: string, password: string): React.node {
        this.autheticating = true;
        // const validationData = {};
        console.log(username);
        console.log(password);
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
                        this.successfulSignIn(user);
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
                this.successfulSignIn(user);
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
                    console.log("Got aws credentials", credentials);
                    this.successfulSignIn(userInformation);
                })
                .catch(e => {
                    this.signInError("Erro ao conectar ao facebook");
                    console.log(e);
                });
        }
    }


    @action
    async googleFederatedSignIn(): React.Node {
        const {type, idToken, user, accessTokenExpirationDate} = await Google.logInAsync({
            androidClientId: Constants.androidClientId,
            iosClientId: Constants.iosClientId,
            scopes: ["profile", "email"]
        });

        if (type === "success") {

            Auth.federatedSignIn("google", {token: idToken, expires_at: accessTokenExpirationDate}, user)
                .then(credentials => {
                    console.log("Got aws credentials", credentials);
                    this.successfulSignIn(user);
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
        Auth.signUp({
            username,
            password,
            attributes,
            validationData: [] // optional
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
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
            .catch(err => console.log(err));
    }

    successfulSignIn(user: any): React.Node {
        this.authenticated = true;
        this.autheticating = false;
        this.hasError = false;
        this.user = user;
        this.error = "";
    }

    signInError(message: string): React.Node {
        this.authenticated = false;
        this.autheticating = false;
        this.hasError = true;
        this.error = message;
    }
}

export default new AuthStore();
