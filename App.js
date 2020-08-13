// @flow
/* eslint-disable no-console, global-require, no-nested-ternary, react/jsx-indent */
import * as React from "react";
import { Dimensions } from "react-native";
import { StyleProvider } from "native-base";
import { Provider } from "mobx-react";
import Amplify from "aws-amplify";
import {
    createAppContainer, createSwitchNavigator, createDrawerNavigator
} from "react-navigation";
import { AppLoading } from "expo";
import * as Font from 'expo-font'

import { Images } from "./src/components/pure-components";
import { Login } from "./src/components/login";
import { SignUp } from "./src/components/sign-up";
import { Walkthrough } from "./src/components/walkthrough";
import { Drawer } from "./src/components/drawer";
import { Home } from "./src/components/home";
import { Check } from "./src/components/check";
import { Boletim } from "./src/components/boletim";
import { Profile } from "./src/components/profile";
import { Create } from "./src/components/create";
import channelsStore from "./src/stores/ChannelsStore";
import mapsStore from "./src/stores/MapsStore";
import authStore from "./src/stores/AuthStore";
import boletimStore from "./src/stores/BoletimStore";
import cardStore from "./src/stores/CardStore";
import atividadeStore from "./src/stores/AtividadeStore";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import { MemoryStorageNew } from './src/components/login/MemoryStorageNew'

const stores = {
    channelsStore,
    mapsStore,
    authStore,
    boletimStore,
    cardStore,
    atividadeStore
};


type AppState = {
    ready: boolean
};

export default class App extends React.Component<{}, AppState> {

    startAuthSide(): React.Node {
        Amplify.configure({
            Auth: {
                // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
                identityPoolId: "us-west-2:dbd50025-b072-41d4-ace9-1785d737524e",

                // REQUIRED - Amazon Cognito Region
                region: "us-west-2",

                // OPTIONAL - Amazon Cognito Federated Identity Pool Region
                // Required only if it"s different from Amazon Cognito Region
                identityPoolRegion: "us-west-2",

                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: "us-west-2_4OQ3MrZUf",

                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: "54bnu2rsv2uq4ho57bfufheack",

                // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
                mandatorySignIn: false,

                // OPTIONAL - customized storage object
                 storage: MemoryStorageNew,

                // OPTIONAL - Manually set the authentication flow type. Default is "USER_SRP_AUTH"
                authenticationFlowType: "USER_PASSWORD_AUTH"
            }
        });
    }

    state = {
        ready: false
    };

    componentWillMount() {
        const promises = [];
        this.startAuthSide();
        // Images.setPlataformImages();
        promises.push(Font.loadAsync({
            "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
            "Avenir-Light": require("./fonts/Avenir-Light.ttf")
        }));
        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.setState({ ready: true }))
            // eslint-disable-next-line
            .catch(error => console.error(error));
    }

    render(): React.Node {
        const { ready } = this.state;
        return (
            <Provider {...stores}>
                <StyleProvider style={getTheme(variables)}>
                    {
                        ready
                            ?
                            <AppNavigator onNavigationStateChange={() => undefined} />
                            :
                            <AppLoading startAsync={null} onError={null} onFinish={null} />
                    }
                </StyleProvider>
            </Provider>
        );
    }
}

const MainNavigator = createDrawerNavigator({
    Home: { screen: Home },
    Boletim: { screen: Boletim },
    Profile: { screen: Profile },
    Create: { screen: Create }
}, {
    drawerWidth: Dimensions.get("window").width,
    // eslint-disable-next-line flowtype/no-weak-types
    contentComponent: (Drawer: any),
    drawerBackgroundColor: variables.brandInfo
});

const AppNavigator = createAppContainer(createSwitchNavigator({
    Check: { screen: Check },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Walkthrough: { screen: Walkthrough },
    Main: { screen: MainNavigator }
}, {
    headerMode: "none",
    cardStyle: {
        backgroundColor: variables.brandInfo
    }
}));
export { AppNavigator };
