// @flow

import React from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import {View, StyleSheet} from "react-native";
import Images from "../images";
import {Styles} from "../pure-components";

@inject("mapsStore")
@observer
export default class Map extends React.Component<{}> {


    getRenderContent(): React.Node {
        return (
            <MapView
                style={styles.cardContainer}
                initialRegion={{
                    latitude: this.props.localization.latitude,
                    longitude: this.props.localization.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03
                }}
            >
                {this.setDataIntoMap()}
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.localization.latitude,
                        longitude: this.props.localization.longitude
                    }}
                    title="Your Location"
                />

            </MapView>
        );
    }

    setDataIntoMap(): React.Node {
        const channels = this.props.channels;
        return (
            channels.map((member, index) => {
                return (<MapView.Marker
                    key={index}
                    coordinate={{
                        latitude: member.latitude,
                        longitude: member.longitude
                    }}
                    image={Images.rtMarker}
                    title={member.name}
                    description="description"
                    onpre
                />);
            })

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
        width: 390,
        height: 500
    }
});

