import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RefillLocations from '../src/screens/refillLocations/index';

test("RefillLocations Component Loading", () => {
    render(<RefillLocations name="RefillLocations" type="text" />)

})
test("RefillLocations component snapshot", () => {
    let component = render(<RefillLocations />).toJSON();
    expect(component).toMatchSnapshot();
})

describe("RefillLocations Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<RefillLocations />).toJSON();

    })

    test("Testing static text data", () => {
        console.log(JSON.stringify(component))
        let styles = component.props.style;
        expect(styles).toStrictEqual({
            flex: 1,
            backgroundColor: "black"

        });
    })
})