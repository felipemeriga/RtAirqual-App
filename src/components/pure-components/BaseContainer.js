// @flow
import * as React from "react";
import {StyleSheet, Image, Alert} from "react-native";
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
                        <Button
                        // onPress = {emBreve()} 
                        // onPress={() => navigation.navigate("Boletim")} transparent
                        >
                            {/* <Icon name="ios-add-circle-outline" style={style.icon} /> */}
                        </Button>
                        <Button transparent onPress={() => navigation.navigate("Home")}>
                            <Icon name="ios-map-outline" style={style.largeIcon} />
                        </Button>
                        <Button onPress={() => navigation.navigate("Boletim")} transparent>
                            <Icon name="ios-paper-outline" style={style.icon} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function emBreve(){
        Alert.alert(
          
          // This is Alert Dialog Title
          "Reportar exercício",
       
          // This is Alert Dialog Message. 
          "Essa funcionalidade estará disponível em breve!",
          [
            // First Text Button in Alert Dialog.
            // {text: 'Ask me later', onPress: () => console.log('Ask me later Button Clicked')},
       
            // Second Cancel Button in Alert Dialog.
            // {text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
       
            // Third OK Button in Alert Dialog
            {text: 'OK', onPress: () => console.log('OK ButtonPressed')},
            
          ]
       
        )
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
