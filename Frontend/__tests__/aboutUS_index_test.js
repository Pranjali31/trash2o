import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AboutUs from '../src/screens/aboutUs/index';

test("AboutUs Component Loading", () => {
    render(<AboutUs />)

})
test("index component snapshot", () => {
    let component = render(<AboutUs />).toJSON();
    expect(component).toMatchSnapshot();
    console.log(JSON.stringify(component))
})


describe("index Testing component", () => {
    var component;
    beforeEach(() => {
        component = render(<AboutUs />).toJSON();
    })

    test("Testing about_us_1", () => {
        let styles = component.children[0].children[0].children[0].children[0];
        expect(styles).toStrictEqual('Tras.h2O is a one stop solution for getting to know the refill stations that are avaible nearby as well as recording the data of the usage and frequency of the refilling ,For each activity perfomred few points are added into the users account which could be used to redeem for a coupon from the ones that are availble.');
    })

    test("Testing about_us_2", () => {
        let styles = component.children[0].children[0].children[1].children[0];
        expect(styles).toStrictEqual("Tras.h2O's objective is to provide a platform and service that could contribute to the reusability of containers as well as motivate users to go green as well as encourage others to join in.");
    })

    test("Testing about_us_3", () => {
        let styles = component.children[0].children[0].children[2].children[0];
        expect(styles).toStrictEqual('Get to Know our team: ');
    })

    test("Testing about_us_4", () => {
        let styles = component.children[0].children[0].children[3].children[0];
        expect(styles).toStrictEqual('Ayush Kaushik Mistry ');
    })

    test("Testing about_us_5", () => {
        let styles = component.children[0].children[0].children[4].children[0];
        expect(styles).toStrictEqual('Harsh Bharath Nimmakuri ');
    })

    test("Testing about_us_6", () => {
        let styles = component.children[0].children[0].children[5].children[0];
        expect(styles).toStrictEqual('Karan Amitkumar Zaveri');
    })

    test("Testing about_us_7", () => {
        let styles = component.children[0].children[0].children[6].children[0];
        expect(styles).toStrictEqual('Marc Smith');
    })

    test("Testing about_us_7", () => {
        let styles = component.children[0].children[0].children[7].children[0];
        expect(styles).toStrictEqual('Parth Ashokbhai Patel ');
    })

    test("Testing about_us_7", () => {
        let styles = component.children[0].children[0].children[8].children[0];
        expect(styles).toStrictEqual('Pranjali Mukeshkumar Prajapati');
    })

    test("about_us Testing Styles1", () => {
        const index = component
        // console.log(JSON.stringify(homescreen));
        let Styles = index.children[0].children[0].children[0].props.style;
        expect(Styles).toStrictEqual({
            paddingHorizontal: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
        });
    });
    test("about us Testing Styles2", () => {
        const index = component
        // console.log(JSON.stringify(homescreen));
        let Styles = index.children[0].children[0].children[8].props.style;
        expect(Styles).toStrictEqual({
            paddingTop: 20,
            paddingHorizontal: 40,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 30,
        
        });
    });

    test("about us Testing Styles3", () => {
        const index = component
        // console.log(JSON.stringify(homescreen));
        let Styles = index.props.style;
        expect(Styles).toStrictEqual({
            paddingVertical: 20,
            backgroundColor: '#050f24',
            flex: 1,
            paddingHorizontal: 10,
        });
    });

    test("about us Testing Styles4", () => {
        const index = component
        // console.log(JSON.stringify(homescreen));
        let Styles = index.children[0].children[0].props.style;
        expect(Styles).toStrictEqual({
            flex: 1,
    paddingBottom: 100,
        });
    });

})

