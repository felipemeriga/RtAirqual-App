// @flow

import React from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import {View, StyleSheet} from "react-native";
import Images from "../images";
import {Styles} from "../pure-components";
import DialogRt from "./DialogRt";

@inject("mapsStore")
@observer
export default class Map extends React.Component<{}> {

    onMarkerTouched(marker: any): React.Node {
        this.props.mapsStore.getMarkDetail(marker);
    }

    getRenderContent(): React.Node {
        return this.getMapView();
    }

    getDialog(): React.Node {
        return (
            <DialogRt/>
        );

    }

    getMapView(): React.Node {
        const channels = this.props.channels;
        return (
            <MapView
                showsUserLocation
                mapType="standard" // changes map style, default = standard, satellite, hybrid, terrain
                style={styles.cardContainer}
                initialRegion={{
                    latitude: this.props.localization.latitude,
                    longitude: this.props.localization.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }}
            >
                {
                    channels.map((member, index) => {
                        return (<MapView.Marker
                            key={index}
                            coordinate={{
                                latitude: member.latitude,
                                longitude: member.longitude
                            }}
                            image={Images.rtMarker}
                            onPress={() => {
                                this.onMarkerTouched(member);
                            }}
                        >
                        </MapView.Marker>);
                    })
                }
                {this.getDialog()}
            </MapView>
        );
    }

    componentDidMount() {
    }

    static get propTypes(): React.Node {
        return {
            channels: PropTypes.arrayOf(Object),
            localization: PropTypes.any,
            mapsStore: PropTypes.any
        };
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

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: 500,
        height: 1000
    }
});
