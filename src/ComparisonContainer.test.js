import ComparisonContainer from './ComparisonContainer.js';
import React from 'react';
import { shallow } from 'enzyme';

describe ('Comparison Container tests', () => {
  it('matches the snapshot when no cards have been clicked', () => {
    const mockArray = []
    const wrapper = shallow(<ComparisonContainer cardArray={mockArray} />);
    expect(wrapper).toMatchSnapshot()
  })

  it('displays a card in the comparison container when a district card is clicked on', () => {
    const mockDistrict = {
      'ACADEMY 20':
        { 2004: 0.302, 2005: 0.267, 2006: 0.354, 2007: 0.392, 2008: 0.385, 2009: 0.39, 2010: 0.436, 2011: 0.489, 2012: 0.479, 2013: 0.488, 2014: 0.49 }
    }
    const mockArray = [mockDistrict]
    
    const wrapper = shallow(<ComparisonContainer cardArray={mockArray}/>);
    const expected = wrapper.find('.comp-card').length
    expect(expected).toBe(1)
  });

  it('displays 2 district cards and 1 comparison card in the comparison container when two district cards  have been clicked on', () => {
    const mockDistrict1 = {
      'ACADEMY 20':
        { 2004: 0.302, 2005: 0.267, 2006: 0.354, 2007: 0.392, 2008: 0.385, 2009: 0.39, 2010: 0.436, 2011: 0.489, 2012: 0.479, 2013: 0.488, 2014: 0.49 }
    }
    const mockDistrict2 = {
      'Colorado':
        { 2004: 0.303, 2005: 0.267, 2006: 0.354, 2007: 0.392, 2008: 0.385, 2009: 0.39, 2010: 0.436, 2011: 0.489, 2012: 0.479, 2013: 0.488, 2014: 0.45 }
    }
    const mockArray = [mockDistrict1, mockDistrict2]

    const wrapper = shallow(<ComparisonContainer cardArray={mockArray} />);
    const expectedDistrictCards = wrapper.find('.comp-card').length
    const expectedTotalCards = wrapper.find('.total-card').length
    expect(expectedDistrictCards).toBe(2)
    expect(expectedTotalCards).toBe(1)
  })

})

