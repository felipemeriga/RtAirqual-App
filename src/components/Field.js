// @flow
import * as _ from "lodash";
import * as React from "react";
import {StyleSheet} from "react-native";
import type TextInput from "native-base";
import {ListItem, Item, Label, Input, Body, Right} from "native-base";

type FieldProps = {
    label: string,
    defaultValue?: string,
    last?: boolean,
    inverse?: boolean,
    right?: () => React.Node,
    textInputRef?: TextInput => void,
    children?: React.Node
};

type FieldState = {
    value: string
};

export default class Field extends React.Component<FieldProps, FieldState> {

    state = {
        value: ""
    };

    componentDidMount() {
        this.setValue(this.props.defaultValue || "");
    }

    setValue = (value: string) => this.setState({ value })

    render(): React.Node {
        const {label, last, inverse, defaultValue, right, textInputRef, children} = this.props;
        const {value} = this.state;
        const style = inverse ? { color: "white"} : {color: "white", fontSize: 20};
        const itemStyle = inverse ? { borderColor: "white" } : {};
        const keysToFilter = ["right", "defaultValue", "inverse", "label", "last"];
        const props = _.pickBy(this.props, (v, key) => keysToFilter.indexOf(key) === -1);
        if (React.Children.count(children) > 0) {
            return (
                <ListItem {...{ last }} style={itemStyle}>
                    <Body>
                        <Item
                            style={styles.field}
                            floatingLabel={false}
                            stackedLabel={false}
                        >
                            <Label {...{ style }}>{label}</Label>
                            {children}
                        </Item>
                    </Body>
                    {
                        right && <Right>{right()}</Right>
                    }
                </ListItem>
            );
        }
        return (
            <ListItem {...{ last }} style={itemStyle}>
                <Body>
                    <Item
                        style={styles.field}
                        floatingLabel={!defaultValue}
                        stackedLabel={!!defaultValue}
                    >
                        <Label {...{ style }}>{label}</Label>
                        <Input onChangeText={this.setValue} getRef={textInputRef} {...{ value, style }} {...props} />
                    </Item>
                </Body>
                {
                    right && <Right>{right()}</Right>
                }
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    field: { borderBottomWidth: 1.6 }
});
