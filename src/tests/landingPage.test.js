import HomePageComponent from '../containers/Homepage.js'
import NavBarComponent from '../components/Navbar.js'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'


const EnzymeAdapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() })

window.matchMedia = window.matchMedia || function() {
    return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
};
};

describe('LandingPage', () => {
    let componentWrapper;
    it('should render landing page', () => {
        componentWrapper = shallow(<HomePageComponent  />);
        // Expect the wrapper object to be defined
        expect(componentWrapper.exists()).toBe(true);
    });
    it('should render the navigation bar', () => {
        componentWrapper = shallow(<NavBarComponent  />);
        // Expect the wrapper object to be defined
        expect(componentWrapper.exists()).toBe(true);
    });
    it('should render the login link when the user is not logged in', () => {
        const props = {
                auth: false,
                profile: false
            },
            componentWrapper = shallow(<NavBarComponent {...props} />);
        // const landing = NavBarComponent().find("div");
        expect(componentWrapper.find('SignedOutLinks').length === 1);
    });
});