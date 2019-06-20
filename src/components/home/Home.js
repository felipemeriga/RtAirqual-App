// @flow
import * as Progress from "react-native-progress";
import { StyleSheet, View } from "react-native";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseContainer } from "../pure-components";
import { ScreenProps } from "../pure-components/Types";
import Map from "./Map";
import Styles from "../pure-components/Styles";

@inject("channelsStore")
@observer
export default class Home extends React.Component<ScreenProps<>> {
    constructor(props: React.Node) {
        super(props);
        this.props.channelsStore.getChannels();
        this.props.channelsStore.getLocalization();
    }

    renderContent(): React.Node {
        if (this.props.channelsStore.loadingChannels === false
            && this.props.channelsStore.loadingLocalization === false) {
            return (
                <Map channels={this.props.channelsStore.channels} localization={this.props.channelsStore.localization} />
            );
        }

        return (
            <View style={[Styles.center, Styles.flexGrow]}>
                <Progress.Circle size={50} indeterminate />
            </View>
        );
    }

    render(): React.Node {
        const sectionName = "Pontos RT";
        const { navigation } = this.props;
        return (
            <BaseContainer title={sectionName} {...{ navigation }} scrollable style={styles.container}>
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
