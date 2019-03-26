// @flow
import {AppRegistry, StyleSheet, Dimensions, View} from "react-native";
import { inject, observer } from "mobx-react";
import {TabNavigator} from "react-navigation";
import {Container, Text} from "native-base";
import * as React from "react";
import {BaseContainer, Styles} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";
import MapView from "react-native-maps";
import {Callout} from "react-native-maps";

@inject("channelsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    componentDidMount() {
        // Calling get channels
        this.props.channelsStore.getChannels();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("wokeeey");
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000}
        );
    }


    render(): React.Node {
        const nomePagina = "rtAirQual";
        const {navigation} = this.props;
        return (
            <BaseContainer title={nomePagina} {...{navigation}} scrollable style={styles.container}>
                <View style={Styles.flexGrow}>
                    <View style={[styles.mapContainer, Styles.center]}>
                        <MapView
                            style={styles.cardContainer}
                            initialRegion={{
                                latitude: -23.3436887,
                                longitude: -51.1726026,
                                latitudeDelta: 1,
                                longitudeDelta: 1
                            }}
                        >

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.329533,
                                    longitude: -51.173548
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="Lago 2"
                                description="description"
                                onpre
                            >

                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322067,
                                    longitude: -51.173079
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="Bosque Universitário"
                                description="description"
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.299477,
                                    longitude: -51.210220
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="PUC"
                                description="description"
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.307478,
                                    longitude: -51.113860
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="UTFPR"
                                description="description"
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.323550,
                                    longitude: -51.163392
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="Zerão"
                                description="description"
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322218,
                                    longitude: -51.206351
                                }}
                                image={{uri: "https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png"}}
                                title="Pista Atletismo UEL"
                                description="description"
                            >
                            </MapView.Marker>

                            {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                                coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
                                title="Your Location"
                            />}
                        </MapView>
                    </View>
                </View>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
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
