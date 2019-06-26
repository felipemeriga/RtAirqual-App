// @flow

import React from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import Images from "../images";
import { Styles } from "../pure-components";
import Dialog, { DialogContent, DialogTitle, ScaleAnimation } from "react-native-popup-dialog";
import DialogRt from "./DialogRt";
import { inject, observer } from "mobx-react";
import * as Progress from "react-native-progress";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from 'react-native-elements';


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
            <DialogRt />
        );
    }

    getMapView(): React.Node {
        const channels = this.props.channels;
        return (
            <MapView
                showsUserLocation
                mapType="standard"
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
                            image={require("../../../assets/marker_rt_big.png")}
                            onPress={() => {
                                this.onMarkerTouched(member);
                            }}
                        >
                        </MapView.Marker>);
                    })
                }

                <Dialog
                    dialogTitle={<DialogTitle
                        title={this.props.mapsStore.marker.name}
                        style={styles.titleDialog} />}
                    visible={this.props.mapsStore.dialogOn}
                    dialogAnimation={new ScaleAnimation({
                        slideFrom: "bottom"
                    })}
                    onTouchOutside={() => {
                        this.props.mapsStore.onTouchOutside();
                    }}
                >
                    <DialogContent style={Styles.centerDialog}>
                        <Progress.Circle
                            style={[this.props.mapsStore.loadingDetail ? {} :
                                styles.hideLoadingDialog, styles.dialogPadding]}
                            size={25}
                            indeterminate
                            borderWidth={3}
                        />
                        <View style={this.props.mapsStore.loadingDetail ? styles.hideLoadingDialog : {}}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: 10
                                }}>

                                <Button
                                    large
                                    leftIcon={{ name: "cloud" }}
                                    borderRadius={15}
                                    raised={true}
                                    onPress={() =>
                                        Alert.alert(
                                            "O que esse número diz sobre o conforto térmico: ",
                                            this.props.mapsStore.thermalConfortMessage.message,
                                            [
                                                { text: 'Voltar' }
                                            ],
                                            { cancelable: true },
                                        )
                                    }
                                    title={"O conforto térmico é: " + this.props.mapsStore.markDetail.field1 + "°"}
                                    backgroundColor={this.retornaCorTemp(this.props.mapsStore.markDetail.field1)}
                                />

                                <Button
                                    large
                                    leftIcon={{ name: "opacity" }}
                                    borderRadius={15}
                                    raised={true}
                                    onPress={() =>
                                        Alert.alert(
                                            "O que esse número diz sobre a humidade: ",
                                            this.props.mapsStore.relativeHumityMessage.message,
                                            [
                                                { text: 'Voltar' }
                                            ],
                                            { cancelable: true },
                                        )
                                    }
                                    title={"A humidade do ar é: " + this.props.mapsStore.markDetail.field2 + "%"}
                                    backgroundColor={this.retornaCorHumi(this.props.mapsStore.markDetail.field2)}

                                />

                                <Button
                                    large
                                    leftIcon={{ name: "toys" }}
                                    borderRadius={15}
                                    raised={true}
                                    onPress={() =>
                                        Alert.alert(
                                            "O que esse número diz sobre a poluição do ar: ",
                                            this.props.mapsStore.airQualityMessage.message,
                                            [
                                                { text: 'Voltar' }
                                            ],
                                            { cancelable: true },
                                        )
                                    }
                                    title={"A poluição do ar é: " + this.props.mapsStore.markDetail.field3}
                                    backgroundColor={this.retornaCorPolu(this.props.mapsStore.markDetail.field3)}
                                />
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </MapView>
        );
    }

    retornaCorTemp(temperatura) {
        temperatura = parseFloat(temperatura);
        if (temperatura <= 13) { return "#604a7e" }
        else
            if (temperatura > 13 && temperatura <= 19) { return "#19d1b6" }
            else
                if (temperatura > 19 && temperatura <= 26) { return "#04f008" }
                else
                    if (temperatura > 26 && temperatura <= 32) { return "#f79646" }
                    else
                        if (temperatura > 32 && temperatura <= 39) { return "#ff0000" }
                        else
                            return "#8b0000"
    }

    retornaCorHumi(humidade) {
        humidade = parseFloat(humidade);
        if (humidade <= 25) { return "#ff0000" }
        else
            if (humidade > 25 && humidade <= 40) { return "#ffbf00" }
            else
                if (humidade > 40 && humidade <= 60) { return "#04f008" }
                else
                    if (humidade > 60 && humidade <= 80) { return "#ffbf00" }
                    else
                        return "#ff0000"
    }

    retornaCorPolu(poluicao) {
        poluicao = parseFloat(poluicao);
        if (poluicao <= 40) { return "#04f008" }
        else
            if (poluicao > 40 && poluicao <= 80) { return "#ffbf00" }
            else
                if (poluicao > 80 && poluicao <= 120) { return "#f79646" }
                else
                    if (poluicao > 120 && poluicao <= 200) { return "#ff0000" }
                    else
                        return "#a03f77"
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
    },
    hideLoadingDialog: {
        display: "none"
    },
    titleDialog: {
        fontWeight: "bold",
        fontSize: 30
    },
    button: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black"
    }
});
