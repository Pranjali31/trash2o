import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderTitle from '../src/components/atoms/headerTitle/index';

test("index Component Loading", () => {
    render(<HeaderTitle />)

})
test("index component snapshot", () => {
    let component = render(<HeaderTitle/>).toJSON();
    expect(component).toMatchSnapshot();
})

describe("index Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<HeaderTitle />).toJSON();;
        //console.log(JSON.stringify(component))

    })
    
    test("Testing static text data", () => {
        let styles = component.children[0].children[0];
        expect(styles).toStrictEqual('Tras.h2o');
    })
})