import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderLeft from '../src/components/atoms/headerLeft/index';

test("index Component Loading", () => {
    render(<HeaderLeft  onPress={() => { }}  />)

})
test("index component snapshot", () => {
    let component = render(<HeaderLeft  onPress={() => { }}  />).toJSON();
    expect(component).toMatchSnapshot();
})