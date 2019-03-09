// @flow
/* eslint-disable global-require */
import {Asset} from "expo";


import Gradient from "../../../assets/images/rainbowBlue.jpg";
import SignUp from "../../../assets/images/signUp.jpg";
import Walkthrough from "../../../assets/images/walkthrough.jpg";
import Profile from "../../../assets/images/profile.jpg";
import LogoSymbol from "../../../assets/images/logoSymbol.png";
import LogoLetter from "../../../assets/images/logoLetter.png";

import DefaultAvatar from "../../../assets/images/avatars/default-avatar.jpg";
import DefaultAvatar1 from "../../../assets/images/avatars/avatar-1.jpg";
import DefaultAvatar2 from "../../../assets/images/avatars/avatar-2.jpg";
import DefaultAvatar3 from "../../../assets/images/avatars/avatar-3.jpg";

import Music from "../../../assets/images/music.jpg";
import Architecture from "../../../assets/images/architecture.jpg";
import Travel from "../../../assets/images/travel.jpg";

export default class Images {
    static gradient = Gradient;
    static signUp = SignUp;
    static walkthrough = Walkthrough;
    static profile = Profile;
    static logoSymbol = LogoSymbol;
    static logoLetter = LogoLetter;

    static defaultAvatar = DefaultAvatar;
    static avatar1 = DefaultAvatar1;
    static avatar2 = DefaultAvatar2;
    static avatar3 = DefaultAvatar3;

    static music = Music;
    static architecture = Architecture;
    static travel = Travel;

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.fromModule(Images.gradient).downloadAsync(),
            Asset.fromModule(Images.logoSymbol).downloadAsync(),
            Asset.fromModule(Images.logoLetter).downloadAsync(),
            Asset.fromModule(Images.signUp).downloadAsync(),
            Asset.fromModule(Images.walkthrough).downloadAsync(),
            Asset.fromModule(Images.profile).downloadAsync(),

            Asset.fromModule(Images.defaultAvatar).downloadAsync(),
            Asset.fromModule(Images.avatar1).downloadAsync(),
            Asset.fromModule(Images.avatar2).downloadAsync(),
            Asset.fromModule(Images.avatar3).downloadAsync(),

            Asset.fromModule(Images.music).downloadAsync(),
            Asset.fromModule(Images.architecture).downloadAsync(),
            Asset.fromModule(Images.travel).downloadAsync()
        ];
    }
}
