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
        console.log(token);
        this.props.authStore.expoToken = token;

        this.subscription = Notifications.addListener(this.handleNotification);


/*        fetch("https://exp.host/--/api/v2/push/send", {
            body: JSON.stringify({
                to: token,
                title: title,
                body: body,
                data: {message: `${title} - ${body}`}
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }); */

    }

    handleNotification = notification => {
        console.log(notification);
    };

    async componentWillMount(): React.Node {
        this.registerForPushNotifications();
    }

    async componentDidMount(): React.Node {
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
