import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import InfoPage from './InfoPage'

it('renders without errors', () => {
  const wrapper = shallow(<InfoPage />)
  expect(toJson(wrapper)).toMatchSnapshot()
})