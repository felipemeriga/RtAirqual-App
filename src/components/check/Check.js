// @flow
import * as React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Auth} from "aws-amplify";
import {inject, observer} from "mobx-react";
import type {ScreenProps} from "../pure-components/Types";
import {Images, WindowDimensions} from "../pure-components";


@inject("authStore")
@observer
export default class Check extends React.Component<ScreenProps<>> {

    async componentDidMount(): React.Node {
        try {
            const user = await Auth.currentAuthenticatedUser();
            if (user.hasOwnProperty("attributes")) {
                user.attributes.id = user.attributes.sub;
                await this.props.authStore.getUserAuthMethod(user.attributes);
            } else {
                await this.props.authStore.getUserAuthMethod(user);
            }
            console.log("antess");
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
