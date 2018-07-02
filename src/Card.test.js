import React from 'react';
import Card from './Card.js';
import { shallow } from 'enzyme';

describe('Card', () => {
  const mockData = { 2004: 0.75, 2005: 0.9 };

  it('should render each data point as an aside', () => { 
    const wrapper = shallow(<Card title="Colorado" content={mockData}/>);
    expect(wrapper.find('aside').length).toEqual(2);
  });

  it('should match the snapshot', () => {
    const mockContent = {
      2004: 0.302, 2005: 0.267};
    const wrapper = shallow(
      <Card 
        title='ACADEMY 20'
        content={ mockContent }
        updateClickedCard={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('invokes the updateClickedCard function when a card is clicked', () => {
    const updateClickedMock = jest.fn();
    const wrapper = shallow(
      <Card 
        title="Colorado" 
        content={mockData} 
        updateClickedCard={updateClickedMock}/>);

    wrapper.find('.Card').simulate('click');
    expect(updateClickedMock).toHaveBeenCalled();
  });
});