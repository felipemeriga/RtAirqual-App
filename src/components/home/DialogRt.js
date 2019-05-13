// @flow
import React from "react";
import {inject, observer} from "mobx-react";
import * as Progress from "react-native-progress";
import Dialog, {SlideAnimation, DialogContent, DialogTitle} from "react-native-popup-dialog";
import PropTypes from "prop-types";
import {StyleSheet, Text, View} from "react-native";
import {Styles} from "../pure-components";

@inject("mapsStore")
@observer
export default class DialogRt extends React.Component<{}> {

    /*
    *Conforto térmico

Abaixo de 13°C
FORTE EXTRESSE AO FRIO
Cor: R96 G74 B126

Entre 13°C e 19°C
FRIO MODERADO
Cor: 25 209 182

Entre 19°C e 26°C
LIGEIRAMENTE FRIO À CONFORTÁVEL
Cor: 4 240 8

Entre 27°C e 32°C
ATENÇÃO, LIGEIRAMENTE QUENTE
Cor: 247 150 70

Entre 32°C e 39°C
CUIDADO, MUITO QUENTE
Cor: 255 0 0

Acima de 39°C
PERIGO
Cor: 139 0 0


----------------


Umidade relativa

Menor que 25%
ALERTA, TEMPO MUITO SECO!
Cor: 255 0 0

25% e 40%
ATENÇÃO, TEMPO SECO!
Cor: 255 191 0

Entre 40% e 60%
CONFORTÁVEL
Cor: 4 240 8


Entre 60% e 80%
ATENÇÃO, TEMPO ÚMIDO!
Cor: 255 191 0


Acima de 80%ALERTA
 TEMPO MUITO ÚMIDO!
Cor: 255 0 0*Umidade relativa*

Menor que 25%
ALERTA, TEMPO MUITO SECO!
Cor: 255 0 0

25% e 40%
ATENÇÃO, TEMPO SECO!
Cor: 255 191 0

Entre 40% e 60%
CONFORTÁVEL
Cor: 4 240 8


Entre 60% e 80%
ATENÇÃO, TEMPO ÚMIDO!
Cor: 255 191 0


Acima de 80%ALERTA
 TEMPO MUITO ÚMIDO!
Cor: 255 0 0


-----------------


Qualidade do ar

Menor que 40
CONDIÇÕES BOAS
Cor: 4 240 8


Entre 41 e 80
CONDIÇÕES MODERADAS
Cor: 255 191 0


Entre 81 e 120
CONDIÇÕES RUINS
Cor: 247 150 70

Entre 121 e 200
CONDIÇÕES MUITO RUINS
Cor: 255 0 0


Maior que 200
CONDIÇÕES PÉSSIMAS
Cor: 160 63 119

    *
    * */

    getRenderContent(): React.Node {
        return (
            <Dialog
                dialogTitle={<DialogTitle title={this.props.mapsStore.marker.name} style={styles.titleDialog}/>}
                visible={this.props.mapsStore.dialogOn}
                dialogAnimation={new SlideAnimation({
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

                        <View style={{
                            //  alignItems: 'stretch',
                            flexDirection: "row",
                            justifyContent: "space-around", //  center , space-between, space-around
                            padding: 5
                        }}
                        >
                            <View style={styles.caixaInfoDialogTemp}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                          console.log("CLICOU EM TEMP");
                                          // this.props.mapsStore.onTouchOutside();
                                         // criaDialog();
                                      }}
                                >
                                    {this.props.mapsStore.markDetail.field1}º
                                </Text>
                            </View>

                            <View style={styles.caixaInfoDialogHum}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                          console.log("CLICOU EM HUM");
                                      }}
                                >
                                    {this.props.mapsStore.markDetail.field2}%
                                </Text>
                            </View>

                            <View style={styles.caixaInfoDialogConf}>
                                <Text style={styles.textBoxDialog}
                                      onPress={() => {
                                          console.log("CLICOU EM CONF");
                                      }}
                                >
                                    {parseFloat(this.props.mapsStore.markDetail.field3)
                                        .toPrecision(3)}
                                </Text>
                            </View>
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
    }
});
