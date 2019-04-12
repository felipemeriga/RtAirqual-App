// @flow
import {observable, action} from "mobx";
import {Auth} from "aws-amplify";

class AuthStore {
    @observable authenticated: boolean = false;
    @observable autheticating: boolean = false;
    @observable user = {};
    @observable error: string;
    @observable hasError: boolean = false;

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
                        console.log("Password updated");
                    });
            } else if (user.challengeName === "MFA_SETUP") {
                console.log("MFA_SETUP");
                // This happens when the MFA method is TOTP
                // The user needs to setup the TOTP before using it
                // More info please check the Enabling MFA part
                Auth.setupTOTP(user);
            } else {
                console.log("DONE");
                // The user directly signs in
                this.authenticated = true;
                this.autheticating = false;
                this.hasError = false;
                this.user = user;
                this.error = "";
            }
        } catch (err) {
            this.autheticating = false;
            this.hasError = true;
            if (err.code === "UserNotConfirmedException") {
                this.error = "Seu usuário não esta confirmado!";
                // The error happens if the user didn"t finish the confirmation step when signing up
                // In this case you need to resend the code and confirm the user
                // About how to resend the code and confirm the user, please check the signUp part
            } else if (err.code === "PasswordResetRequiredException") {
                this.error = "Sua senha foi resetada, acesse esqueci minha senha";
                // The error happens when the password is reset in the Cognito console
                // In this case you need to call forgotPassword to reset the password
                // Please check the Forgot Password part.
            } else if (err.code === "NotAuthorizedException") {
                this.error = "Senha inválida";
                // The error happens when the incorrect password is provided
            } else if (err.code === "UserNotFoundException") {
                this.error = "Usuário inexistente";
                // The error happens when the supplied username/email does not exist in the Cognito user pool
            } else {
                console.log(err);
            }
        }
    }

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

}

export default new AuthStore();
