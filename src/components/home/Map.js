// @flow

import React from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import { Styles } from "../pure-components";
import Dialog, { DialogContent, DialogTitle, ScaleAnimation, DialogFooter, DialogButton } from "react-native-popup-dialog";
import DialogRt from "./DialogRt";
import { inject, observer } from "mobx-react";
import * as Progress from "react-native-progress";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

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

    state = {
        show: false
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    getMapView(): React.Node {
        const channels = this.props.channels;
        return (
            <MapView
                showsUserLocation
                mapType="standard"
                style={styles.cardContainer}
                initialRegion={{
                    latitude: -23.329732,
                    longitude: -51.173405,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08
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
                            image={require("../../../assets/atk_marker.png")}
                            onPress={() => {
                                this.onMarkerTouched(member);
                                this.handleOpen();
                            }}
                        >
                        </MapView.Marker>);
                    })
                }

                <Dialog
                    dialogTitle={
                        <DialogTitle
                            title={
                                "Carregando dados..."
                            }
                            style={styles.titleDialog}
                        />
                    }
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
                            size={50}
                            indeterminate
                            color="#0BFBE1"
                            borderWidth={5}
                        />
                        <View style={this.props.mapsStore.loadingDetail ? styles.hideLoadingDialog : {}}>

                            <SCLAlert

                                subtitle="Dados de monitoramento:"
                                theme="atk"
                                show={this.state.show}
                                cancellable={true}
                                title={this.props.mapsStore.marker.name}

                                onRequestClose={() => {
                                    this.props.mapsStore.onTouchOutside();
                                }}
                            >
                                <SCLAlertButton
                                    theme={this.retornaCorTemp(this.props.mapsStore.markDetail.field1)}
                                    onPress={() => {
                                        Alert.alert(
                                            "O que esse número diz sobre o conforto térmico: ",
                                            this.props.mapsStore.thermalConfortMessage.message,
                                            [
                                                { text: "Voltar" }
                                            ],
                                            { cancelable: true },
                                        )
                                    }}
                                >
                                    {"Conforto térmico: " + this.props.mapsStore.markDetail.field1 + "°"}
                                </SCLAlertButton>

                                <SCLAlertButton
                                    theme={this.retornaCorUmi(this.props.mapsStore.markDetail.field2)}
                                    onPress={() => {
                                        Alert.alert(
                                            "O que esse número diz sobre a umidade relativa: ",
                                            this.props.mapsStore.relativeHumityMessage.message,
                                            [
                                                { text: "Voltar" }
                                            ],
                                            { cancelable: true },
                                        )
                                    }}
                                >
                                    {"Umidade relativa do ar: " + this.props.mapsStore.markDetail.field2 + "%"}
                                </SCLAlertButton>

                                <SCLAlertButton
                                    theme={this.retornaCorPolu(this.props.mapsStore.markDetail.field3)}
                                    onPress={() => {
                                        Alert.alert(
                                            "O que esse número diz sobre o índice de qualidade do ar: ",
                                            this.props.mapsStore.airQualityMessage.message,
                                            [
                                                { text: "Voltar" }
                                            ],
                                            { cancelable: true },
                                        )
                                    }}
                                >
                                    {"Índice de qualidade do ar: " + this.props.mapsStore.markDetail.field3}
                                </SCLAlertButton>

                                <SCLAlertButton
                                    theme="default"
                                    onPress={() => { this.handleClose(); this.props.mapsStore.onTouchOutside(); }}
                                >
                                    Voltar
                                </SCLAlertButton>
                            </SCLAlert>
                        </View>
                    </DialogContent>
                </Dialog>
            </MapView>
        );
    }

    //novos metodos retornando os temas padrao do dialog
    retornaCorTemp(temperatura) {
        temperatura = parseFloat(temperatura);
        if (temperatura <= 13) { return "c604a7e"; }
        else
            if (temperatura > 13 && temperatura <= 19) { return "c19d1b6"; }
            else
                if (temperatura > 19 && temperatura <= 26) { return "c04f008"; }
                else
                    if (temperatura > 26 && temperatura <= 32) { return "cf79646"; }
                    else
                        if (temperatura > 32 && temperatura <= 39) { return "cff0000"; }
                        else
                            return "c8b0000"
    }

    retornaCorUmi(umidade) {
        umidade = parseFloat(umidade);
        if (umidade <= 25) { return "cff0000" }
        else
            if (umidade > 25 && umidade <= 40) { return "cffbf00" }
            else
                if (umidade > 40 && umidade <= 60) { return "c04f008" }
                else
                    if (umidade > 60 && umidade <= 80) { return "cffbf00" }
                    else
                        return "c8b0000"
    }

    retornaCorPolu(poluicao) {
        poluicao = parseFloat(poluicao);
        if (poluicao <= 40) { return "c04f008" }
        else
            if (poluicao > 40 && poluicao <= 80) { return "cffbf00" }
            else
                if (poluicao > 80 && poluicao <= 120) { return "cf79646" }
                else
                    if (poluicao > 120 && poluicao <= 200) { return "cff0000" }
                    else
                        return "ca03f77"
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
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: width,
        height: 1000
    },
    hideLoadingDialog: {
        display: "none"
    },
    titleDialog: {
        fontWeight: "bold",
        fontSize: 40
    },
    button: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black"
    }
});