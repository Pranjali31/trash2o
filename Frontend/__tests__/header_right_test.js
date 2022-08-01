import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderRight from '../src/components/atoms/headerRight/index';

test("index Component Loading", () => {
    render(<HeaderRight onPressHandler={() => { }} />)

})
test("index component snapshot", () => {
    let component = render(<HeaderRight onPressHandler={() => { }} />).toJSON();
    expect(component).toMatchSnapshot();
})