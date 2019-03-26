// @flow
/* eslint-disable no-console, global-require, no-nested-ternary, react/jsx-indent */
import * as React from "react";
import {Dimensions} from "react-native";
import {StyleProvider} from "native-base";
import {Provider} from "mobx-react";
import {
    createAppContainer, createSwitchNavigator, createDrawerNavigator
} from "react-navigation";
import {Font, AppLoading} from "expo";

import {Images} from "./src/components/pure-components";
import {Login} from "./src/components/login";
import {SignUp} from "./src/components/sign-up";
import {Walkthrough} from "./src/components/walkthrough";
import {Drawer} from "./src/components/drawer";
import {Home} from "./src/components/home";
import {Calendar} from "./src/components/calendar";
import {Overview} from "./src/components/overview";
import {Groups} from "./src/components/groups";
import {Lists} from "./src/components/lists";
import {Profile} from "./src/components/profile";
import {Timeline} from "./src/components/timeline";
import {Settings} from "./src/components/settings";
import {Create} from "./src/components/create";
import channelsStore from "./src/stores/ChannelsStore";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

const stores = {
    channelsStore
};


type AppState = {
    ready: boolean
};

export default class App extends React.Component<{}, AppState> {

    state = {
        ready: false
    };

    componentWillMount() {
        const promises = [];
        promises.push(Font.loadAsync({
            "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
            "Avenir-Light": require("./fonts/Avenir-Light.ttf")
        }));
        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.setState({ready: true}))
            // eslint-disable-next-line
            .catch(error => console.error(error));
    }

    render(): React.Node {
        const {ready} = this.state;
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
    Home: {screen: Home},
    Calendar: {screen: Calendar},
    Overview: {screen: Overview},
    Groups: {screen: Groups},
    Lists: {screen: Lists},
    Profile: {screen: Profile},
    Timeline: {screen: Timeline},
    Settings: {screen: Settings},
    Create: {screen: Create}
}, {
    drawerWidth: Dimensions.get("window").width,
    // eslint-disable-next-line flowtype/no-weak-types
    contentComponent: (Drawer: any),
    drawerBackgroundColor: variables.brandInfo
});

const AppNavigator = createAppContainer(createSwitchNavigator({
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    Walkthrough: {screen: Walkthrough},
    Main: {screen: MainNavigator}
}, {
    headerMode: "none",
    cardStyle: {
        backgroundColor: variables.brandInfo
    }
}));

export {AppNavigator};
