// @flow
import * as React from "react";
import {StyleSheet, Image} from "react-native";
import {Footer, FooterTab, Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content} from "native-base";
import {EvilIcons} from "@expo/vector-icons";
import {Constants} from "expo";

import Avatar from "./Avatar";
import Images from "../images";
import WindowDimensions from "./WindowDimensions";
import Container from "./Container";

import type {NavigationProps, ChildrenProps} from "./Types";

// import variables from "../../native-base-theme/variables/commonColor";
type BaseContainerProps = NavigationProps<> & ChildrenProps & {
    title: string | React.Node
};

export default class BaseContainer extends React.PureComponent<BaseContainerProps> {
    render(): React.Node {
        const {title, navigation} = this.props;
        return (
            <Container safe>
                <Image source={Images.gradient} style={[StyleSheet.absoluteFill, style.img]} />
                <NBHeader noShadow>
                    <Left>
                        <Button onPress={() => navigation.openDrawer()} transparent>
                            <EvilIcons name="navicon" size={32} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        {
                            typeof (title) === "string" ? <Title>{title.toUpperCase()}</Title> : title
                        }
                    </Body>
                    <Right style={style.right}>
                        <Button onPress={() => navigation.navigate("Profile")} transparent>
                            <Avatar size={30} />
                        </Button>
                    </Right>
                </NBHeader>
                <Content contentContainerStyle={style.container}>
                    {this.props.children}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => navigation.navigate("Calendar")} transparent>
                            <Icon name="ios-calendar-outline" style={style.icon} />
                        </Button>
                        <Button transparent onPress={() => navigation.navigate("Home")}>
                            <Icon name="ios-map" style={style.largeIcon} />
                        </Button>
                        <Button onPress={() => navigation.navigate("Overview")} transparent>
                            <Icon name="ios-stats-outline" style={style.icon} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: WindowDimensions.width,
        height: WindowDimensions.height - Constants.statusBarHeight,
        top: Constants.statusBarHeight
    },
    right: {
        alignItems: "center"
    },
    icon: {
        fontSize: 32
    },
    largeIcon: {
        fontSize: 50,
        height: 50
    }
});
