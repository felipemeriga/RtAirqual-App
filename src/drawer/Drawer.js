// @flow
import * as React from "react";
import {View, StyleSheet, Image, TouchableHighlight} from "react-native";
import {Button, Icon, Header, Text, Left, Title, Body, Right} from "native-base";
import {Constants} from "expo";
import {DrawerActions} from "react-navigation";

import {Images, Styles, WindowDimensions, Container} from "../components";
import type {NavigationProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Drawer extends React.Component<NavigationProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    login = () => {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        const {navigation} = this.props;
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
                        <Title>NAVIGATE</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={style.itemContainer}>
                    <View style={style.row}>
                        <DrawerItem {...{navigation}} name="Home" icon="ios-home-outline" left />
                        <DrawerItem {...{navigation}} name="Calendar" icon="ios-calendar-outline" />
                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{navigation}} name="Groups" icon="ios-apps-outline" left />
                        <DrawerItem {...{navigation}} name="Overview" icon="ios-analytics-outline" />
                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{navigation}} name="Lists" icon="ios-list-outline" left />
                        <DrawerItem {...{navigation}} name="Profile" icon="ios-contact-outline" />
                    </View>
                    <View style={style.row}>
                        <DrawerItem {...{navigation}} name="Timeline" icon="ios-time-outline" left />
                        <DrawerItem {...{navigation}} name="Settings" icon="ios-options-outline" />
                    </View>
                </View>
                <Button transparent block onPress={this.login}>
                    <Text>LOGOUT</Text>
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
        const {name, navigation, icon, left} = this.props;
        const navState = this.props.navigation.state;
        const active = navState.routes[navState.index].key === name;
        const props = {
            onPress: () => navigation.navigate(name),
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
