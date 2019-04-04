// @flow
import React from "react";
import * as Progress from "react-native-progress";
import Dialog, {SlideAnimation, DialogContent, DialogTitle} from "react-native-popup-dialog";
import PropTypes from "prop-types";
import {StyleSheet, Text, View} from "react-native";
import {Styles} from "../pure-components";


export default class Map extends React.PureComponent<{}> {

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
                        }}>
                            <View style={styles.caixaInfoDialog}>
                                <Text style={styles.textBoxDialog}>
                                    {this.props.mapsStore.markDetail.field1}º
                                </Text>
                                <Text style={styles.legenda}>
                                    Temperatura
                                </Text>
                            </View>

                            <View style={styles.caixaInfoDialog2}>
                                <Text style={styles.textBoxDialog}>
                                    {this.props.mapsStore.markDetail.field2}%
                                </Text>
                                <Text style={styles.legenda}>
                                    Umidade
                                </Text>
                            </View>

                            <View style={styles.caixaInfoDialog3}>
                                <Text style={styles.textBoxDialog}>
                                    {parseFloat(this.props.mapsStore.markDetail.field3)
                                        .toPrecision(3)}                                </Text>
                                <Text style={styles.legenda}>
                                    IQA
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.infoDicaDialog}>
                            Condição: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.tittle}
                            </Text>
                        </Text>
                        <Text style={styles.infoDicaDialog}>
                            Dica: {"\b"}{"\b"}
                            <Text style={styles.textNormal}>
                                {this.props.mapsStore.thermalConfortMessage.message}
                            </Text>
                        </Text>

                    </View>
                </DialogContent>
            </Dialog>
        );
    }


    static get propTypes(): React.Node {
        return {
            mapsStore: PropTypes.arrayOf(Object)
        };
    }


    render(): React.Node {
        return (
            <View>
                {this.getRenderContent()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textNormal: {
        fontWeight: "normal"
    },
    caixaInfoDialog: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: "#ffcccc",
        borderColor: "#000000"
    },
    caixaInfoDialog2: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: "#ccffcc",
        borderColor: "#000000"
    },
    caixaInfoDialog3: {
        flex: 1,
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
