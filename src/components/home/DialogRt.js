// @flow
import React from "react";
import { inject, observer } from "mobx-react";
import * as Progress from "react-native-progress";
import Dialog, { SlideAnimation, DialogContent, DialogTitle, ScaleAnimation } from "react-native-popup-dialog";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { Styles } from "../pure-components";


@inject("mapsStore")
@observer
export default class DialogRt extends React.Component<{}> {

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

    getRenderContent(): React.Node {
        return (
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
                    />
                    <View style={this.props.mapsStore.loadingDetail ? styles.hideLoadingDialog : {}}>

                        <View
                            style={{
                                //  alignItems: 'stretch',
                                flexDirection: "column",
                                justifyContent: "space-between", //  center , space-between, space-around
                                padding: 10
                            }}>

                            <Button style={styles.button}
                                onPress={""
                                    // Alert.alert(
                                    //     //alert title
                                    //    //this.props.mapsStore.thermalConfortMessage.title,
                                    //    "O que esse número diz sobre a temperatura: ",
                                    //    //alert message
                                    //    this.props.mapsStore.thermalConfortMessage.message,
                                    //    [
                                    //        //alert button
                                    //      {text: 'Voltar'}
                                    //    ],
                                    //    {cancelable: true},
                                    //  )
                                }
                                title={"a temperatura é: " + this.props.mapsStore.markDetail.field1 + "°"}
                                color={this.retornaCorTemp(this.props.mapsStore.markDetail.field1)}
                            />

                            <Button style={styles.button}
                            
                                onPress={""
                                    // Alert.alert(
                                    //     //alert title
                                    //    //this.props.mapsStore.thermalConfortMessage.title,
                                    //    "O que esse número diz sobre a humidade: ",
                                    //    //alert message
                                    //    this.props.mapsStore.relativeHumityMessage.message,
                                    //    [
                                    //        //alert button
                                    //      {text: 'Voltar'}
                                    //    ],
                                    //    {cancelable: true},
                                    //  )
                                }
                                title={"a humidade do ar é: " + this.props.mapsStore.markDetail.field2 + "%"}
                                color={this.retornaCorHumi(this.props.mapsStore.markDetail.field2)}
                            />

                            <Button style={styles.button}
                                onPress={""
                                    // Alert.alert(
                                    //     //alert title
                                    //    //this.props.mapsStore.thermalConfortMessage.title,
                                    //    "O que esse número diz sobre a poluição do ar: ",
                                    //    //alert message
                                    //    this.props.mapsStore.airQualityMessage.message,
                                    //    [
                                    //        //alert button
                                    //      {text: 'Voltar'}
                                    //    ],
                                    //    {cancelable: true},
                                    //  )
                                }
                                title={"a poluição do ar é: " + this.props.mapsStore.markDetail.field3}
                                color={this.retornaCorPolu(this.props.mapsStore.markDetail.field3)}
                            />

                            <Text style={{ color: 'grey', padding: 10 }}>
                                Clique em uma das caixas acima para obter mais informações!
</Text>

                            {/* <View style={styles.caixaInfoDialogTemp}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                          //abreDialog()
                                        //console.log("CLICOU EM TEMP");
                                          // this.props.mapsStore.onTouchOutside();
                                         // criaDialog();

                                         Alert.alert(
                                             //alert title
                                            //this.props.mapsStore.thermalConfortMessage.title,
                                            "O que esse número diz sobre a temperatura: ",
                                            //alert message
                                            this.props.mapsStore.thermalConfortMessage.message,
                                            [
                                                //alert button
                                              {text: 'Voltar'}
                                            ],
                                            {cancelable: true},
                                          );
                                      }}
                                >
                                    {this.props.mapsStore.markDetail.field1}º
                                </Text>
                            </View>  */}
                            {/* 
                            <View style={styles.caixaInfoDialogHum}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                        Alert.alert(
                                            //alert title
                                        //    this.props.mapsStore.relativeHumityMessage.title,
                                        "O que esse número diz sobre a humidade relativa: ",
                                           //alert message
                                           this.props.mapsStore.relativeHumityMessage.message,
                                           [
                                               //alert button
                                             {text: 'Voltar'}
                                           ],
                                           {cancelable: true},
                                         );
                                          //console.log("CLICOU EM HUM");
                                      }}
                                >
                                    {this.props.mapsStore.markDetail.field2}%
                                </Text>
                            </View> */}
                            {/* 
                            <View style={styles.caixaInfoDialogConf}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                        Alert.alert(
                                            //alert title
                                        //    this.props.mapsStore.airQualityMessage.title,
                                        "O que esse número diz sobre a qualidade do ar: ",
                                           //alert message
                                           this.props.mapsStore.airQualityMessage.message,
                                           [
                                               //alert button
                                             {text: 'Voltar'}
                                           ],
                                           {cancelable: true},
                                         );
                                        // console.log("CLICOU EM CONF");
                                      }}
                                >
                                    {parseFloat(this.props.mapsStore.markDetail.field3)
                                        .toPrecision(3)}
                                </Text>
                            </View> */}
                        </View>
                    </View>
                </DialogContent>
            </Dialog>
        );
    }


    static get propTypes(): React.Node {
        return {
            mapsStore: PropTypes.any
        };
    }


    render(): React.Node {
        return (
            <View style={styles.mapContainer}>
                {this.getRenderContent()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    caixaInfoDialogTemp: {
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: "#ffcccc",
        borderColor: "#000000"
    },
    caixaInfoDialogHum: {
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: "#ccffcc",
        borderColor: "#000000"
    },
    caixaInfoDialogConf: {
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: "#ffffcc",
        borderColor: "#000000"
    },
    legenda: {
        fontWeight: "bold",
        textAlign: "center"
    },
    textBoxDialog: {
        fontWeight: "bold",
        padding: 5,
        fontSize: 25,
        textAlign: "center"
    },
    titleDialog: {
        fontWeight: "bold",
        fontSize: 30
    },
    infoDicaDialog: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 2
    },
    dialogPadding: {
        paddingTop: 20
    },
    hideLoadingDialog: {
        display: "none"
    },
    button: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "black"
    }
});
