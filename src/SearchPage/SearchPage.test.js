import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchPage from './SearchPage'

it('renders without errors', () => {
  const wrapper = shallow(<SearchPage />)
  expect(toJson(wrapper)).toMatchSnapshot()
})