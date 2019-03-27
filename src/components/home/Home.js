// @flow
import {StyleSheet} from "react-native";
import { inject, observer } from "mobx-react";
import * as React from "react";
import {BaseContainer} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";
import Map from "./Map";

@inject("channelsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {
    render(): React.Node {
        const nomePagina = "rtAirQual";
        const {navigation} = this.props;
        return (
            <BaseContainer title={nomePagina} {...{navigation}} scrollable style={styles.container}>
                <Map />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
