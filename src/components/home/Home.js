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
        const nomePagina = "Pontos rtAirQual";
        return (
            <BaseContainer title={nomePagina} {...{navigation}} scrollable style={style.container}>
                <View style={Styles.flexGrow}>
                    <View style={[style.mapContainer, Styles.center]}>
                        <MapView style={style.cardContainer}
                                 initialRegion={{
                                     latitude: -23.3436887,
                                     longitude: -51.1726026,
                                     latitudeDelta: 0.0922,
                                     longitudeDelta: 0.0421,
                                 }}>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.329533,
                                    longitude: -51.173548
                                }}
                                title={"Lago 2"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322067,
                                    longitude: -51.173079
                                }}
                                title={"Bosque Universitário"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.299477,
                                    longitude: -51.210220
                                }}
                                //image={{uri: 'https://facebook.github.io/react-native/img/favicon.png'}}
                                title={"PUC"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.307478,
                                    longitude: -51.113860
                                }}
                                title={"UTFPR"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.323550,
                                    longitude: -51.163392
                                }}
                                title={"Zerão"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322218,
                                    longitude: -51.206351
                                }}
                                title={"Pista Atletismo UEL"}
                                description={"description"}
                            >
                            </MapView.Marker>

                        </MapView>

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
        width: 390,
        height: 500
    }
});
