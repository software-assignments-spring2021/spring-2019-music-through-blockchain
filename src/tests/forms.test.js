import SigninComponent from '../containers/SigninComponent'
import SignupComponent from '../containers/SignupComponent'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'


const EnzymeAdapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() })

describe('form tests', () => {
    let wrapper;
    it('should render signin', () => {
      wrapper = shallow(<SigninComponent  />);
      console.log(wrapper)
      // Expect the wrapper object to be defined
      expect(wrapper.exists()).toBe(true);
    });
    it('should render signup', () => {
        wrapper = shallow(<SignupComponent  />);
        console.log(wrapper)
        // Expect the wrapper object to be defined
        expect(wrapper.exists()).toBe(true);
    });
    it('sign up renders input correctly with empty value', () => {
      const props = {
              emailInput: null
      },
      wrapper = shallow(<SignupComponent {...props} />);
      expect(wrapper.instance().props.emailInput).toEqual(null);
  });
  it('sign in renders input correctly with empty value', () => {
    const props = {
            emailInput: null
    },
    wrapper = shallow(<SigninComponent {...props} />);
    expect(wrapper.instance().props.emailInput).toEqual(null);
});



  
});