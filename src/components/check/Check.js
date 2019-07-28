// @flow
import * as React from "react";
import {Notifications, Permissions} from "expo";
import {Image, StyleSheet, View} from "react-native";
import {Auth} from "aws-amplify";
import {inject, observer} from "mobx-react";
import type {ScreenProps} from "../pure-components/Types";
import {Images, WindowDimensions} from "../pure-components";


@inject("authStore")
@observer
export default class Check extends React.Component<ScreenProps<>> {

    async registerForPushNotifications(): React.Node {
        let {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (status !== "granted") {
            status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== "granted") {
                return;
            }
        }
        const token = await Notifications.getExpoPushTokenAsync();
        this.props.authStore.storeUserToken(token);

        this.subscription = Notifications.addListener(this.handleNotification);

        this.allValidationsCompleted();
    }

    handleNotification = notification => {
        console.log(notification);
    };

    async componentWillMount(): React.Node {
        // TODO - This part of the code will prevent the yellow boxes warning, If you need them, just comment the next line
        console.disableYellowBox = true;
        this.registerForPushNotifications();
    }

    async allValidationsCompleted(): React.Node {
        try {
            const user = await Auth.currentAuthenticatedUser();
            if (user.hasOwnProperty("attributes")) {
                user.attributes.id = user.attributes.sub;
                await this.props.authStore.getUserAuthMethod(user.attributes);
            } else {
                await this.props.authStore.getUserAuthMethod(user);
            }
            this.props.navigation.navigate("Home");
        } catch (err) {
            console.log(err);
            this.props.navigation.navigate("Login");
        }
    }

    render(): React.Node {
        return (
            <View style={styles.container}>
                <Image source={Images.check} style={styles.image}/>
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
    }
});
