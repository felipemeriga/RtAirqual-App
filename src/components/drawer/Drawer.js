// @flow
import * as React from "react";
import { inject, observer } from "mobx-react";
import { View, StyleSheet, Image, TouchableHighlight, Linking, Alert, console } from "react-native";
import { Button, Icon, Header, Text, Left, Title, Body, Right } from "native-base";
import Constants from 'expo-constants'
import { DrawerActions } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import { Images, Styles, WindowDimensions, Container } from "../pure-components";
import type { NavigationProps } from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";


@inject("authStore")
@observer
export default class Drawer extends React.Component<NavigationProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    login = () => {
        this.props.authStore.signOut();
        this.props.navigation.navigate("Login");
    };

    render(): React.Node {
        const { navigation } = this.props;
        return (
            <Container safe>
                <Image source={Images.gradient} style={style.img} />
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}>
                            {/* <Icon name="ios-close-outline" style={style.closeIcon}/> */}
                            <Ionicons name="ios-close" size={50} color="#0BFBE1" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontWeight: 'bold' }}>Menu</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={style.itemContainer}>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} name="Pontos Airtrak" icon="ios-map" left descricao="Home" />
                        <DrawerItem {...{ navigation }} name="Feed" icon="ios-calendar" descricao="Boletim"/* icon="ios-analytics-outline" */ />

                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} name="Reportar treino" icon="stats" descricao="Create" left />
                        <DrawerItem {...{ navigation }} name="Mudar região" icon="md-globe" descricao="Create" />

                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} name="Blog" icon="md-browsers" descricao="Blog" left />
                        <DrawerItem {...{ navigation }} name="WhatsApp" icon="logo-whatsapp" descricao="Whats" />
                    </View>
                </View>
                <Button transparent block onPress={this.login}>
                    <Text style={{ fontWeight: 'bold' }}>Sair</Text>
                </Button>
            </Container>
        );
    }
}

type DrawerItemProps = NavigationProps<> & {
    name: string,
    icon: string,
    left?: boolean
};

class DrawerItem extends React.PureComponent<DrawerItemProps> {


    render(): React.Node {

        function seleciona(descricao) {
            if (descricao === "") {
        
            }
            else
            if (descricao === "Create") {
                Alert.alert(
                    "Em breve!",
                    "Fique atento que logo teremos novidades em nosso app!",
                    [
                        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {
                            text: "Voltar",
                            // onPress: () => console.log('Cancel Pressed'),
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                );
            }
            else
                if (descricao === "Blog") {
                    Alert.alert(
                        "Você será direcionado para nosso blog",
                        "Deseja continuar?",
                        [
                            //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {
                                text: "Voltar",
                                // onPress: () => console.log('Cancel Pressed'),
                                style: "cancel"
                            },
                            { text: "Confirmar", onPress: () => Linking.openURL("https://www.airtrak.com.br/blog") }
                        ],
                        { cancelable: false }
                    );
                } else if (descricao === "Whats") {
                    Linking.openURL("whatsapp://send?phone=5543991461916");
                } else {
                    navigation.navigate(descricao);
                }
        }

        const { name, navigation, icon, left, descricao } = this.props;
        const navState = this.props.navigation.state;
        const active = navState.routes[navState.index].key === descricao;
        const props = {
            // onPress: () => navigation.navigate(descricao),
            onPress: () => seleciona(descricao),
            style: [style.item, left ? { borderRightWidth: variables.borderWidth } : undefined]
        };
        return (
            <TouchableHighlight {...props} activeOpacity={0.5} underlayColor="rgba(255, 255, 255, .2)">
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Icon name={icon} style={{ color: 'white' }} />
                    <Text style={{ marginTop: variables.contentPadding }}>{name}</Text>
                    {
                        active && <View style={style.dot} />
                    }
                </View>
            </TouchableHighlight>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...StyleSheet.absoluteFillObject,
        width: WindowDimensions.width,
        height: WindowDimensions.height - Constants.statusBarHeight,
        top: Constants.statusBarHeight
    },
    closeIcon: {
        fontSize: 50,
        color: variables.listBorderColor
    },
    itemContainer: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: "row",
        borderColor: variables.listBorderColor,
        borderBottomWidth: variables.borderWidth
    },
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        borderColor: variables.listBorderColor
    },
    dot: {
        backgroundColor: "#0BFBE1",
        height: 10,
        width: 10,
        borderRadius: 5,
        position: "absolute",
        right: variables.contentPadding,
        top: variables.contentPadding,
        alignSelf: "flex-end"
    }
});
