// @noflow
import React from "react";
import renderer from "react-test-renderer";

import {AppNavigator} from "./App";

// eslint-disable-next-line no-undef
it("renders without crashing", () => {
    const rendered = renderer.create(<AppNavigator />).toJSON();
    // eslint-disable-next-line no-undef
    expect(rendered).toBeTruthy();
});
