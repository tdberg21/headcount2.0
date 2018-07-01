import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('should have a default state property of cards that contains all 181 districts', () => {

    expect(Object.keys(wrapper.state('cards')).length).toEqual(181)
  })

  it('should have a default state property of clickedCards that is an empty array', () => {

    expect(Object.keys(wrapper.state('clickedCards')).length).toEqual(0)
  })
  it('matches the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  })

  it('updates the state when a district is searched', () => {
    const mockClickedCard = 'Colorado';
    const expected = { "COLORADO SPRINGS 11": { "2004": 0.069, "2005": 0.509, "2006": 0.638, "2007": 0.994, "2008": 0.992, "2009": 1, "2010": 0.993, "2011": 0.994, "2012": 0.993, "2013": 0.989, "2014": 0.994 }, "Colorado": { "2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395, "2008": 0.536, "2009": 0.598, "2010": 0.64, "2011": 0.672, "2012": 0.695, "2013": 0.703, "2014": 0.741 } };
    wrapper.instance().updateDistricts(mockClickedCard)

    expect(wrapper.state('cards')).toEqual(expected);
  })

  it('adds an object to the clickedCards array in state when a card is clicked', () => {
    const mockDistrict = 'Colorado';
    const mockContent = { "2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395, "2008": 0.536, "2009": 0.598, "2010": 0.64, "2011": 0.672, "2012": 0.695, "2013": 0.703, "2014": 0.741 };
    const expected = [{ "Colorado": { "2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395, "2008": 0.536, "2009": 0.598, "2010": 0.64, "2011": 0.672, "2012": 0.695, "2013": 0.703, "2014": 0.741 } }]

    wrapper.instance().updateClickedCard(mockDistrict, mockContent);

    expect(wrapper.state('clickedCards')).toEqual(expected)
  });

  it('adds another object to the clickedCards array in state when a second card is clicked', () => {
    const mockDistrict1 = 'Colorado';
    const mockDistrict2= 'COLORADO SPRINGS 11';
    const mockContent1 = { "2004": 0.24 };
    const mockContent2 = { "2004": 0.069 };
    const expected = [{ "COLORADO SPRINGS 11": { "2004": 0.069 }}, {"Colorado": { "2004": 0.24 } }]

    wrapper.instance().updateClickedCard(mockDistrict2, mockContent2);
    wrapper.instance().updateClickedCard(mockDistrict1, mockContent1);

    expect(wrapper.state('clickedCards')).toEqual(expected)
  })

})
