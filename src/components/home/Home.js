// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";


import {BaseContainer, Styles} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import {Marker} from "react-native-maps";
import MapView from "react-native-maps";

export default class Home extends React.Component<ScreenProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    render(): React.Node {
        const {navigation} = this.props;
        const nomePagina = "Locais";
        return (
            <BaseContainer title={nomePagina} {...{navigation}} scrollable style={style.container}>
                <View style={Styles.flexGrow}>
                    <View style={[style.mapContainer, Styles.center]}>
                        <MapView style={style.cardContainer} />
                    </View>
                </View>
            </BaseContainer>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: 370,
        height: 500
    }
});
