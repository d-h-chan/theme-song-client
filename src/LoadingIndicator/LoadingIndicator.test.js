import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LoadingIndicator from './LoadingIndicator'

it('renders without errors', () => {
  const wrapper = shallow(<LoadingIndicator />)
  expect(toJson(wrapper)).toMatchSnapshot()
})