import SearchForm from './SearchForm.js';
import React from 'react';
import { shallow } from 'enzyme';

describe('SearchForm Tests', () => {

  it('updates the state of when the input value changes', () => {
    const wrapper = shallow(<SearchForm
      updateDistricts={jest.fn()} />);
    const mockEvent = { target: { value: 'abc'} };
    const expectedState = 'abc' ;

    wrapper.instance().handleInput(mockEvent);
    expect(wrapper.state().district).toEqual(expectedState);
  });

  it('should update state when handle input is invoked', () => {
    const wrapper = shallow(<SearchForm updateDistricts={jest.fn()}/>);
    const mockTyping = { target: {value: 'taco'}};
    const expected = 'taco';

    wrapper.instance().handleInput(mockTyping);

    expect(wrapper.state('district')).toEqual(expected);

  });

});