// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";


import {BaseContainer, Styles} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import {Marker} from "react-native-maps";
import MapView from "react-native-maps";
import { Constants, Location, Permissions } from 'expo';
import { TabNavigator } from "react-navigation";
import { Container, Text } from "native-base";

export default class Home extends React.Component<ScreenProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }
	
	constructor(props){
    super(props);
    state = {
        myLocation: null
    };
}

componentDidMount = () => {
    this.getMyLocation();
};

getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            myLocation: 'Permission denied',
        });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
        myLocation: JSON.stringify(location)
    });
};
	
    render(): React.Node {
        const {navigation} = this.props;
        const nomePagina = "rtAirQual";
        return (
            <BaseContainer title={nomePagina} {...{navigation}} scrollable style={style.container}>
                <View style={Styles.flexGrow}>
                    <View style={[style.mapContainer, Styles.center]}>
                        <MapView style={style.cardContainer}
                                 initialRegion={{
                                     latitude: -23.3436887,
                                     longitude: -51.1726026,
                                     latitudeDelta: 0.0922,
                                     longitudeDelta: 0.0421,
                                 }}>
                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.329533,
                                    longitude: -51.173548
                                }}
								image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"Lago 2"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322067,
                                    longitude: -51.173079
                                }}
								image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"Bosque Universitário"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.299477,
                                    longitude: -51.210220
                                }}
                                image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"PUC"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.307478,
                                    longitude: -51.113860
                                }}
								image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"UTFPR"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.323550,
                                    longitude: -51.163392
                                }}
								image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"Zerão"}
                                description={"description"}
                            >
                            </MapView.Marker>

                            <MapView.Marker
                                coordinate={{
                                    latitude: -23.322218,
                                    longitude: -51.206351
                                }}
								image={{uri: 'https://raw.githubusercontent.com/felipemeriga/RtAirqual-App/master/assets/marker_rt.png'}}
                                title={"Pista Atletismo UEL"}
                                description={"description"}
                            >
                            </MapView.Marker>
                        </MapView>
                    </View>
                </View>
            </BaseContainer>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        flex: 1
    },
    cardContainer: {
        width: 390,
        height: 500
    }
});
