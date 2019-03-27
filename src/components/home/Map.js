// @flow
import React from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import {View, StyleSheet} from "react-native";
import Images from "../images";
import {Styles} from "../pure-components";

// eslint-disable-next-line react/prefer-stateless-function
export default class Map extends React.PureComponent<{}> {


    constructor(props: React.Node) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    setDataIntoMap(): React.Node {
        console.log(this.props.channels[0]);
    }

    componentDidMount() {
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
        this.setDataIntoMap();
    }

    static get propTypes(): React.Node {
        return {
            channels: PropTypes.arrayOf(Object)
        };
    }

    render(): React.Node {
        return (
            <View style={Styles.flexGrow}>
                <View style={[styles.mapContainer, Styles.center]}>
                    <MapView
                        style={styles.cardContainer}
                        initialRegion={{
                            latitude: -23.3436887,
                            longitude: -51.1726026,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        }}
                    >

                        <MapView.Marker
                            coordinate={{
                                latitude: -23.329533,
                                longitude: -51.173548
                            }}
                            image={Images.rtMarker}
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
                            image={Images.rtMarker}
                            title="Bosque Universitário"
                            description="description"
                        >
                        </MapView.Marker>

                        <MapView.Marker
                            coordinate={{
                                latitude: -23.299477,
                                longitude: -51.210220
                            }}
                            image={Images.rtMarker}
                            title="PUC"
                            description="description"
                        >
                        </MapView.Marker>

                        <MapView.Marker
                            coordinate={{
                                latitude: -23.307478,
                                longitude: -51.113860
                            }}
                            image={Images.rtMarker}
                            title="UTFPR"
                            description="description"
                        >
                        </MapView.Marker>

                        <MapView.Marker
                            coordinate={{
                                latitude: -23.323550,
                                longitude: -51.163392
                            }}
                            image={Images.rtMarker}
                            title="Zerão"
                            description="description"
                        >
                        </MapView.Marker>

                        <MapView.Marker
                            coordinate={{
                                latitude: -23.322218,
                                longitude: -51.206351
                            }}
                            image={Images.rtMarker}
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
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: 390,
        height: 500
    }
});

