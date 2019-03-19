// @flow
import * as React from "react";
import {View, StyleSheet, Image, SafeAreaView} from "react-native";
import {Button, Footer, FooterTab, Text, Icon} from "native-base";
import Swiper from "react-native-swiper";

import {Styles, Images, WindowDimensions} from "../components";
import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Walkthrough extends React.Component<ScreenProps<>> {

    // $FlowFixMe
    swiper = React.createRef();

    home = () => this.props.navigation.navigate("Main");

    renderPagination = (): React.Node => (
        <View>
            <Footer style={{borderTopWidth: variables.borderWidth, borderBottomWidth: variables.borderWidth}}>
                <FooterTab>
                    <Button onPress={this.home} transparent>
                        <Text>PULAR</Text>
                    </Button>
                    <Button transparent onPress={() => this.swiper.current.scrollBy(1)} style={style.next}>
                        <Text>PRÓXIMO</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
    );

    render(): React.Node {
        const {renderPagination} = this;
        return (
            <SafeAreaView style={style.container}>
                <Image source={Images.gradient} style={style.img} />
                {
                    // $FlowFixMe
                    <Swiper
                        ref={this.swiper}
                        height={swiperHeight}
                        dot={<Icon name="ios-radio-button-off-outline" style={style.dot} />}
                        activeDot={<Icon name="ios-radio-button-on" style={style.dot} />}
                        {...{renderPagination}}
                    >
                        <View style={[Styles.center, Styles.flexGrow]}>
                            <Image source={Images.smartCity} style={style.smartCityContainer} />
                            <Text>Tenha acesso a dados de temperatura</Text>
                            <Text>umidade relativa e poluição do ar</Text>
                            <Text>de locais específicos onde </Text>
                            <Text>pratica sua corrida.</Text>
                        </View>
                        <View style={[Styles.center, Styles.flexGrow]}>
                            <Image source={Images.notifications} style={style.notificationsContainer} />
                            <Text>Receba alertas e dicas de situações</Text>
                            <Text>críticas ou favoráveis ao longo do dia</Text>
                        </View>
                        <View style={[Styles.center, Styles.flexGrow]}>
                            <Image source={Images.boletim} style={style.boletimContainer} />
                            <Text>Saiba qual o perfil de clima</Text>
                            <Text>e qualidade do ar todos os dias</Text>
                            <Text>e como isso pode te afetar.</Text>
                        </View>
                        <View style={[Styles.center, Styles.flexGrow]}>
                            <Image source={Images.graphic} style={style.graphicContainer} />
                            <Text>Com análises personalizadas,</Text>
                            <Text> entenda seus padrões de desempenho </Text>
                            <Text>em relação ao clima e a qualidade do ar.</Text>
                        </View>
                    </Swiper>
                }
            </SafeAreaView>
        );
    }
}

// eslint-disable-next-line react/prefer-stateless-function
class Phone extends React.PureComponent<{}> {
    render(): React.Node {
        return (
            <View style={style.phone}>
                <View style={style.phoneContainer}>
                    <Icon name="ios-checkmark-circle-outline" style={style.phoneContainerIcon} />
                </View>
                <View style={style.phoneFooter}>
                    <Icon name="ios-radio-button-off" style={style.phoneFooterIcon} />
                </View>
            </View>
        );
    }
}

const {height, width} = WindowDimensions;
const borderWidth = variables.borderWidth * 2;
const swiperHeight = height;
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        ...WindowDimensions,
        ...StyleSheet.absoluteFillObject
    },
    next: {
        borderRadius: 0,
        borderLeftWidth: variables.borderWidth,
        marginLeft: variables.borderWidth,
        borderColor: "white"
    },
    phone: {
        borderColor: "white",
        borderWidth,
        borderRadius: 4,
        height: 175,
        width: 100,
        marginBottom: variables.contentPadding
    },
    phoneContainer: {
        width: width * 0.75,
        height: height * 0.40,
        justifyContent: "center",
        alignItems: "center"
    },
    smartCityContainer: {
        width: width * 0.75,
        height: height * 0.40,
        justifyContent: "center",
        alignItems: "center"
    },
    notificationsContainer: {
        width: width * 0.65,
        height: height * 0.40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    boletimContainer: {
        width: width * 0.65,
        height: height * 0.40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    graphicContainer: {
        width: width * 0.40,
        height: height * 0.25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25
    },
    phoneFooter: {
        flex: 0.2,
        borderColor: "white",
        borderTopWidth: borderWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    dot: {
        fontSize: 12,
        margin: 4
    },
    phoneContainerIcon: {
        fontSize: 45
    },
    phoneFooterIcon: {
        fontSize: 15
    }
});
