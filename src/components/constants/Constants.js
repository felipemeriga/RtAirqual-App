// @flow


class Constants {
    // Authentication and Authorization Constants
    facebookAppClient = "2286396934947742";
    androidClientId = "392315602601-9d5mnk7o3njoaonajfjki7tfufls4q0s.apps.googleusercontent.com";
    //iosClientId = "46612203335-bnqr0359icq524cohsvrouql30hasias.apps.googleusercontent.com";
    iosClientId = "392315602601-8ea5bmorc21ljcsq8ja92h5jaeqnpo9o.apps.googleusercontent.com";
    authMethod = {
        USER_POOLS: "USER_POOLS",
        FEDERATED: {
            GOOGLE: "GOOGLE",
            FACEBOOK: "FACEBOOK"
        }
    };

    loginErrors: {
        fieldsNull: "Preencha todos os campos!",
        userNotConfirmedException: "Seu usuário não esta confirmado!",
        passwordResetRequiredException: "Sua senha foi resetada, acesse esqueci minha senha",
        notAuthorizedException: "Senha inválida",
        userNotFoundException: "Usuário inexistente"
    };

    signUpErrors: {
        usernameExistsException: "Já existe um usuário com esse email",
        notAuthorizedException: "Senha inválida",
        invalidParameterException: "Formato de telefone inválido, o correto é DDD+Número sem espaços"
    }

    formValidationMessages = {
        email: "Email no formato inválido",
        password: "A senha deve ter no mínimo 8 dígitos, uma letra maiúscula e um caractere especial",
        phone: "O telefone deve estar no formato Código de área + número"
    };

    federatedMessages = {
        googleError: "Erro ao conectar ao google",
        facebookError: "Erro ao conectar ao facebook"
    }

    numberPrefix: "+55";


}


export default new Constants();
