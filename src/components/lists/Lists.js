// @flow
import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Button, Icon} from "native-base";

import {BaseContainer, Styles} from "../pure-components";
import type {ScreenProps} from "../pure-components/Types";

import variables from "../../../native-base-theme/variables/commonColor";

export default class Lists extends React.PureComponent<ScreenProps<>> {
    render(): React.Node {
        return (
            <BaseContainer title="Lists" navigation={this.props.navigation} scrollable>
                <Item title="Design new icon" done />
                <Item title="Work on UI Kit" />
                <Item title='React article: "Designing for Mobile"' />
                <Item title="Revise wireframes" done />
                <Item title="Catch up with Mary" />
                <Item title="Design explorations for new project" />
            </BaseContainer>
        );
    }
}

type ItemProps = {
    title: string,
    // eslint-disable-next-line react/no-unused-prop-types
    done?: boolean
};

type ItemState = {
    done: boolean
};

class Item extends React.Component<ItemProps, ItemState> {

    static defaultProps = {
        done: false
    };

    constructor(props: ItemProps) {
        super(props);
        this.state = {
            done: !!props.done
        };
    }

    toggle = () => {
        const done = !this.state.done;
        this.setState({ done });
    }

    render(): React.Node {
        const {title} = this.props;
        const {done} = this.state;
        const txtStyle = done ? Styles.whiteText : Styles.grayText;
        return (
            <View style={[Styles.listItem, style.item]}>
                <Button
                    transparent
                    onPress={this.toggle}
                    style={[Styles.center, style.button]}
                >
                    <Icon name="md-checkmark" style={txtStyle} />
                </Button>
                <TouchableOpacity onPress={this.toggle}>
                    <View style={style.title}>
                        <Text style={txtStyle}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    item: {
        marginHorizontal: 0
    },
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: variables.contentPadding
    }
});
