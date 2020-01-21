// @flow
import moment from "moment";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Icon, Text } from "native-base";

import { BaseContainer, Styles, Task } from "../components";
import type { ScreenProps } from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class ReportActivity extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        //const today = moment();
        return (
            <BaseContainer title="ReportActivity" navigation={this.props.navigation} scrollable>
                <View style={styles.container}>
                    <Text style={styles.title}>How are you feeling today?</Text>
                    <View style={styles.feelingsContainer}>
                        <View style={styles.feelingsContent}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/cool.png')}
                            />
                            <Text>Great</Text>
                        </View>

                        <View style={styles.feelingsContent}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/cool.png')}
                            />
                            <Text>so-So</Text>
                        </View>

                        <View style={styles.feelingsContent}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/cool.png')}
                            />
                            <Text>Bad</Text>
                        </View>
                    </View>
                    <Text>Content</Text>

                </View>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    feelingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    feelingsContent: {
        alignItems: 'center',
        padding: 10,
    },
    title: {
        color: '#00acee',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
});

