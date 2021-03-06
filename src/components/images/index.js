// @flow
/* eslint-disable global-require */
import { Asset } from 'expo-asset'
import Platform from "react-native";


import Gradient from "../../../assets/images/loginFundoPreto.jpg";
// import Gradient from "../../../assets/images/loginFundoPreto.jpg";
import LoginBackground from "../../../assets/images/loginFundoPreto.jpg";
import SignUp from "../../../assets/images/fundo_airtracking.png";
import Check from "../../../assets/images/fundo_airtracking.png";
import Walkthrough from "../../../assets/images/fundo_airtracking.png";
import Profile from "../../../assets/images/profile_running.jpg";
import LogoSymbol from "../../../assets/images/logoSymbol.png";
import BoletimBackground from "../../../assets/images/boletim_background.jpg";
import LogoLetter from "../../../assets/images/airtrack_logo_slogan_negativo.png";
import SmartCity from "../../../assets/images/smartCityRT.png";
import Notifications from "../../../assets/images/notifications.png";
import Boletim from "../../../assets/images/boletim.png"; 
import Graphic from "../../../assets/images/graphic.png";
import RtMarkerIos from "../../../assets/marker_rt_small.png";
import RtMarkerAndroid from "../../../assets/marker_rt_big.png";
import DefaultAvatar from "../../../assets/images/user_icon.png";
import DefaultAvatar1 from "../../../assets/images/avatars/avatar-1.jpg";
import DefaultAvatar2 from "../../../assets/images/avatars/avatar-2.jpg";
import DefaultAvatar3 from "../../../assets/images/avatars/avatar-3.jpg";
import Music from "../../../assets/images/music.jpg";
import Architecture from "../../../assets/images/architecture.jpg";
import Travel from "../../../assets/images/travel.jpg";

export default class Images {
    static gradient = Gradient;
    static check = Check;
    static signUp = SignUp;
    static walkthrough = Walkthrough;
    static profile = Profile;
    static logoSymbol = LogoSymbol;
    static BoletimBackground = BoletimBackground;
    static logoLetter = LogoLetter;
    static defaultAvatar = DefaultAvatar;
    static avatar1 = DefaultAvatar1;
    static avatar2 = DefaultAvatar2;
    static avatar3 = DefaultAvatar3;
    static music = Music;
    static architecture = Architecture;
    static travel = Travel;
    static smartCity = SmartCity;
    static loginBackground = LoginBackground;
    static notifications = Notifications;
    static boletim = Boletim;
    static graphic = Graphic;
    static rtMarker = RtMarkerAndroid;
    static rtMarker = RtMarkerIos;

    static setPlataformImages(): React.Node {
        if (Platform.OS === "ios") {
            Images.rtMarker = RtMarkerIos;
        } else {
            Images.rtMarker = RtMarkerAndroid;
        }
    }

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.fromModule(Images.gradient)
                .downloadAsync(),
            Asset.fromModule(Images.check)
                .downloadAsync(),
            Asset.fromModule(Images.logoSymbol)
                .downloadAsync(),
            Asset.fromModule(Images.logoLetter)
                .downloadAsync(),
            Asset.fromModule(Images.signUp)
                .downloadAsync(),
            Asset.fromModule(Images.walkthrough)
                .downloadAsync(),
            Asset.fromModule(Images.profile)
                .downloadAsync(),
            Asset.fromModule(Images.defaultAvatar)
                .downloadAsync(),
            Asset.fromModule(Images.avatar1)
                .downloadAsync(),
            Asset.fromModule(Images.avatar2)
                .downloadAsync(),
            Asset.fromModule(Images.avatar3)
                .downloadAsync(),
            Asset.fromModule(Images.music)
                .downloadAsync(),
            Asset.fromModule(Images.architecture)
                .downloadAsync(),
            Asset.fromModule(Images.travel)
                .downloadAsync(),
            Asset.fromModule(Images.smartCity)
                .downloadAsync(),
            Asset.fromModule(Images.loginBackground)
                .downloadAsync(),
            Asset.fromModule(Images.notifications)
                .downloadAsync(),
            Asset.fromModule(Images.boletim)
                .downloadAsync(),
            Asset.fromModule(Images.graphic)
                .downloadAsync(),
            Asset.fromModule(Images.rtMarker)
                .downloadAsync()
        ];
    }
}
