import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import Icons from '../src/components/atoms/Icons/index'

test("index Component Loading",()=>{
    render(<Icons name="welcome"  type="button" color={null} size={null} />)
 
 })
 test("index component snapshot", () => {
    let component = render(<Icons name="welcome"  type="button" color={null} size={null}/>).toJSON();
    //console.log(JSON.stringify(component))
    expect(component).toMatchSnapshot();
})


describe("index Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<Icons name="welcome"  type="button" color={null} size={null}/>).toJSON();

    });

    test("Testing static text data", () => {
        let styles = component.children[0].children[0].props.style;
        expect(styles).toStrictEqual({
            backgroundColor	:	"transparent",
            alignItems	: "center",
            justifyContent	: "center"

        });
    });

})