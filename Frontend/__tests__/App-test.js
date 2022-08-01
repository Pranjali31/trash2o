import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomButton from '../src/components/atoms/customButton/index';

props = {onPress : () => {}, children : ""}
test("index Component Loading", () => {
    render(<CustomButton props={props} />)

})
test("index component snapshot", () => {
    let component = render(<CustomButton props={props} />).toJSON();
    expect(component).toMatchSnapshot();
})


describe("index Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<CustomButton props={props} />);

    })

    test("Testing Styles", () => {
        const index = component.toJSON();
        // console.log(JSON.stringify(homescreen));
        let Styles = index.children[0].children[0].props.style;
        expect(Styles).toStrictEqual({
            color: 'white',
            fontSize: 18,
        });
    });

        test("Testing Styles", () => {
            const index = component.toJSON();
            // console.log(JSON.stringify(homescreen));
            let Styles = index.children[0].props.style;
            expect(Styles).toStrictEqual({
                borderRadius: 25,
                paddingHorizontal: 30,
                paddingVertical: 12,
            });
    })

})