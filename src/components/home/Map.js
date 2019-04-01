// @flow

import React from "react";
import * as Progress from "react-native-progress";
import Dialog, {SlideAnimation, DialogContent, DialogTitle} from "react-native-popup-dialog";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import {View, StyleSheet, Text} from "react-native";
import Images from "../images";
import {Styles} from "../pure-components";

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
            <Dialog
                dialogTitle={<DialogTitle title={this.props.mapsStore.marker.name}/>}
                visible={this.props.mapsStore.dialogOn}
                dialogAnimation={new SlideAnimation({
                    slideFrom: "bottom"
                })}
                onTouchOutside={() => {
                    this.props.mapsStore.onTouchOutside();
                }}
            >
                <DialogContent style={Styles.center}>
                    <Progress.Circle
                        style={[this.props.mapsStore.loadingDetail ? {} : styles.hideLoadingDialog, styles.dialogPadding]}
                        size={25}
                        indeterminate
                    />
                    <View style={this.props.mapsStore.loadingDetail ? styles.hideLoadingDialog : {}}>
                        <Text style={styles.textBold}>
                            Temperatura: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.markDetail.field1}º
                            </Text>
                        </Text>
                        <Text style={styles.textBold}>
                            Umidade relativa: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.markDetail.field2} %
                            </Text>
                        </Text>
                        <Text style={styles.textBold}>
                            Condição: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.tittle}
                            </Text>
                        </Text>
                        <Text style={styles.textBold}>
                            Resumo: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.message}
                            </Text>
                        </Text>
                        <Text style={styles.textBold}>
                            Teste: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                temp:{this.props.mapsStore.markDetail.field1},
                                hum:{this.props.mapsStore.markDetail.field2},
                                polu:{this.props.mapsStore.markDetail.field3},
                                confT:{this.props.mapsStore.markDetail.therm}
                            </Text>
                        </Text>
                    </View>
                </DialogContent>
            </Dialog>
        );

    }

    getMapView(): React.Node {
        const channels = this.props.channels;
        return (
            <MapView
                style={styles.cardContainer}
                initialRegion={{
                    latitude: this.props.localization.latitude,
                    longitude: this.props.localization.longitude,
                    latitudeDelta: 0.020,
                    longitudeDelta: 0.020
                }}
                showsUserLocation
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

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

const styles = StyleSheet.create({
    textNormal: {
        fontWeight: "normal"
    },
    textBold: {
        fontWeight: "bold"
    },
    dialogPadding: {
        paddingTop: 20
    },
    hideLoadingDialog: {
        display: "none"
    },
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: 500,
        height: 1000
    }
});
