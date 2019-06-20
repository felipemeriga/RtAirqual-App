// @flow
import * as React from "react";
import { inject, observer } from "mobx-react";
import { View, StyleSheet, Image, TouchableHighlight, Linking, Alert, console } from "react-native";
import { Button, Icon, Header, Text, Left, Title, Body, Right } from "native-base";
import { Constants } from "expo";
import { DrawerActions } from "react-navigation";

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
    }

    render(): React.Node {
        const { navigation } = this.props;
        return (
            <Container safe>
                <Image source={Images.gradient} style={style.img} />
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}>
                            <Icon name="ios-close-outline" style={style.closeIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Menu</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={style.itemContainer}>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} name="Pontos RT" icon="ios-map-outline" left descricao="Home" />
                        <DrawerItem {...{ navigation }} name="Boletim" icon="ios-paper-outline" descricao="Boletim"/* icon="ios-analytics-outline" */ />

                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} name="Blog" icon="ios-browsers-outline" descricao="Blog" left />
                        <DrawerItem {...{ navigation }} name="WhatsApp" icon="logo-whatsapp" descricao="Whats" />
                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} /* name="Lists" icon="ios-list-outline" */ left />
                        <DrawerItem {...{ navigation }} /* name="Profile" icon="ios-contact-outline" */ />
                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{ navigation }} /* name="Timeline" icon="ios-time-outline" */ left />
                        <DrawerItem {...{ navigation }} /* name="Settings" icon="ios-options-outline" */ />
                    </View>
                </View>
                <Button transparent block onPress={this.login}>
                    <Text>Sair</Text>
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
            if (descricao === "Blog") {
                Alert.alert(
                    "Você será direcionado para nosso blog",
                    "Deseja continuar?",
                    [
                        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {
                            text: 'Cancel',
                            // onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        { text: 'OK', onPress: () => Linking.openURL("https://www.rtairqual.com.br/blog") },
                    ],
                    { cancelable: false },
                );
            } else
                if (descricao === "Whats") {
                    Linking.openURL('whatsapp://send?text=""&phone=5543991461916');
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
                    <Icon name={icon} style={{ color: variables.listBorderColor }} />
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
        backgroundColor: "white",
        height: 10,
        width: 10,
        borderRadius: 5,
        position: "absolute",
        right: variables.contentPadding,
        top: variables.contentPadding,
        alignSelf: "flex-end"
    }
});
