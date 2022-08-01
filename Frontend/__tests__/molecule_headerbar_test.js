import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderBar from '../src/components/molecules/headerBar/index';

test("HeaderBar Component Loading", () => {
    render(<HeaderBar name="molecule_headerbar" type="text" />)

})

test("HeaderBar component snapshot", () => {
    let component = render(<HeaderBar/>).toJSON();
    expect(component).toMatchSnapshot();
})

describe("index Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<HeaderBar/>).toJSON();

    })

    test("Testing static text data", () => {
        console.log(JSON.stringify(component))
        let styles = component.children[0].children[0];
        expect(styles).toStrictEqual('HeaderBar');
    })
});