import React from 'react';
import Card from '../Card';
import { shallow } from 'enzyme';

describe('Card', () => {
  test('that it matches an existing snapshot', () => {

    const wrapper = shallow( <Card text='' emoji='' onFormSubmitCallback={() => {} } />);

    expect(wrapper).toMatchSnapshot();
  });
});