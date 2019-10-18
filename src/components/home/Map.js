// @flow
import React from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import { Styles } from "../pure-components";
import { inject, observer } from "mobx-react";
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from "react-native";

@inject("mapsStore")
@observer
export default class Map extends React.Component<{}> {

    getRenderContent(): React.Node {
        return (
            <MapView
                showsUserLocation
                mapType="standard"
                style={styles.mapa}
                initialRegion={{
                    latitude: -23.329732,
                    longitude: -51.173405,
                    latitudeDelta: 0.115,
                    longitudeDelta: 0.115,
                }}
            >

                <Marker
                    coordinate={{
                        latitude: -23.329732,
                        longitude: -51.173405,
                    }}
                    title={'Lago Igapó'}
                    description={'Ponto de monitoramento posicionado no Lago Igapó'}
                />

                <Marker
                    coordinate={{
                        latitude: -23.362858,
                        longitude: -51.175215,
                    }}
                    title={'Jardim Botânico'}
                    description={'Ponto de monitoramento posicionado no Jardim Botânico'}
                />

                <Marker
                    coordinate={{
                        latitude: -23.322218,
                        longitude: -51.206351,
                    }}
                    title={'UEL'}
                    description={'Ponto de monitoramento posicionado na UEL'}
                />

                <Marker
                    coordinate={{
                        latitude: -23.307478,
                        longitude: -51.11386,
                    }}
                    title={'UTFPR'}
                    description={'Ponto de monitoramento posicionado na UTFPR'}
                />

                <Marker
                    coordinate={{
                        latitude: -23.3246476,
                        longitude: -51.1640946,
                    }}
                    title={'Zerão'}
                    description={'Ponto de monitoramento posicionado no Zerão'}
                />
            </MapView>
        );
    }

    componentDidMount() {
    }

    render(): React.Node {
        return (
            <View style={Styles.flexGrow}>
                <View style={[styles.mapContainer, Styles.center]}>
                    {this.getRenderContent()}
                </View>
            </View>
        );
    }
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    mapa: {
        width: width,
        height: 1000
    }
});
