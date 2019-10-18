// @flow
import * as React from "react";
import { StyleSheet, Image, Alert, Text } from "react-native";
import { Footer, FooterTab, Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import Constants from 'expo-constants'
import Avatar from "./Avatar";
import Images from "../images";
import WindowDimensions from "./WindowDimensions";
import Container from "./Container";

import type { NavigationProps, ChildrenProps } from "./Types";

type BaseContainerProps = NavigationProps<> & ChildrenProps & {
    title: string | React.Node
};

export default class BaseContainer extends React.PureComponent<BaseContainerProps> {
    render(): React.Node {
        const { title, navigation } = this.props;
        return (
            <Container safe>
                <Image source={Images.gradient} style={[StyleSheet.absoluteFill, style.img]} />
                <NBHeader noShadow>
                    <Left>
                        <Button onPress={() => navigation.openDrawer()} transparent>
                            <EvilIcons name="navicon" size={32} color="#0BFBE1" />
                        </Button>
                    </Left>
                    <Body>
                        {
                            typeof (title) === "string" ? <Title>{title.toUpperCase()}</Title> : title
                        }
                    </Body>
                    <Right style={style.right}>
                        <Button onPress={() => navigation.navigate("Profile")} transparent>
                            <Avatar size={32} />
                        </Button>
                    </Right>
                </NBHeader>
                <Content contentContainerStyle={style.container}>
                    {this.props.children}
                </Content>
                <Footer>
                <FooterTab>
                        <Button onPress={() => navigation.navigate("Home")} transparent>
                            <Icon name="ios-map" style={style.icon} />
                            <Text style={style.footerIconText}>Pontos</Text>
                        </Button>

                        {/* <Button transparent onPress={() => navigation.navigate("Create")}>
                            <Icon name="ios-add-circle" style={style.largeIcon} />
                            <Text style={style.footerIconText}>Atividade</Text>
                        </Button> */}

                        <Button onPress={() => navigation.navigate("Boletim")} transparent>
                            <Icon name="ios-calendar" style={style.icon} />
                            <Text style={style.footerIconText}>Feed</Text>
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
    },
    footerIconText: {
        color: 'white'
    }
});
