// @flow
import * as Progress from "react-native-progress";
import {StyleSheet, View} from "react-native";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {BaseContainer} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";
import Map from "./Map";
import Styles from "../pure-components/Styles";

@inject("channelsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {

    constructor(props: React.Node) {
        super(props);
        this.props.channelsStore.getChannels();
    }

    renderContent(): React.Node {
        if (this.props.channelsStore.loading === false) {
            return (
                <Map channels={this.props.channelsStore.channels} />
            );
        }

        return (
            <View style={[Styles.center, Styles.flexGrow]}>
                <Progress.Circle size={100} indeterminate />
            </View>
        );
    }

    render(): React.Node {
        const sectionName = "RtAirQual";
        const {navigation} = this.props;
        return (
            <BaseContainer title={sectionName} {...{navigation}} scrollable style={styles.container}>
                {this.renderContent()}
            </BaseContainer>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
