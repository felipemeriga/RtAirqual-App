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
						<Text style={styles.textBold1}>
                            {this.props.mapsStore.markDetail.field1} ºC
                        </Text>
						<Text>
						Temperatura {"\b"}{"\b"}
						</Text>
						
                        <Text style={styles.textBold2}>
                            {this.props.mapsStore.markDetail.field2} %
                        </Text>
						<Text>
                        Umidade relativa {"\b"}{"\b"}
						</Text>
						
						
                            <Text style={styles.textBold3}>
                                {parseFloat(this.props.mapsStore.markDetail.field3).toPrecision(3)}
                            </Text>
						<Text>
                        Poluição do ar {"\b"}{"\b"}
						</Text>
						
						
                        <Text style={styles.textBold4}>
                            Condição: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.tittle}
                            </Text>
                        </Text>
                        <Text style={styles.textBold5}>
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.message}
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
				showsUserLocation
				mapType={"standard"} //changes map style, default = standard
					style={styles.cardContainer}
					initialRegion={{
						latitude: this.props.localization.latitude,
						longitude: this.props.localization.longitude,
						latitudeDelta: 0.030,
						longitudeDelta: 0.030
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

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

const styles = StyleSheet.create({
    textNormal: {
        fontWeight: "normal"
    },
    textBold1: {
        fontWeight: "bold",
		backgroundColor: "grey"
    },
	    textBold2: {
        fontWeight: "bold",
		backgroundColor: "red"
    },
	    textBold3: {
        fontWeight: "bold",
		backgroundColor: "green"
    },
	    textBold4: {
        fontWeight: "bold",
		backgroundColor: "yellow"
    },
	    textBold5: {
        fontWeight: "bold",
		backgroundColor: "blue"
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
