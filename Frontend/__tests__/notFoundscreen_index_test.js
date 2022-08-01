import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import NotFoundScreen from '../src/screens/notFoundScreen/index';

test("NotFoundScreen Component Loading", () => {
    render(<NotFoundScreen name="got to home" onPressHandler={() => { }} type="button" data={{}} />)

})
test("NotFoundScreen component snapshot", () => {
    let component = render(<NotFoundScreen/>).toJSON();
    expect(component).toMatchSnapshot();
})


describe("NotFoundScreen Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<NotFoundScreen/>);

    })

    test("Not found screen Testing Styles1", () => {
        const index = component.toJSON();
        console.log((JSON.stringify(index)));
        let Styles = index.props.style;
        expect(Styles).toStrictEqual({
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        })
    });
        test("Not found screen Testing Styles2", () => {
            const index = component.toJSON();
            // console.log(JSON.stringify(homescreen));
            let Styles = index.children[0].props.style;
            expect(Styles).toStrictEqual({
                fontSize: 20,
                fontWeight: 'bold',
            })
        });

        test("Not found screen Testing Styles3", () => {
            const index = component.toJSON();
            // console.log(JSON.stringify(homescreen));
            let Styles = index.children[1].props.style;
            expect(Styles).toStrictEqual({
                marginTop: 15,
                paddingVertical: 15,
                opacity	:	1

            })
        });

        test("Not found screen Testing Styles4", () => {
            const index = component.toJSON();
            // console.log(JSON.stringify(homescreen));
            let Styles = index.children[1].children[0].props.style;
            expect(Styles).toStrictEqual({
                fontSize: 14,
                color: '#2e78b7',
            })
        });
})

