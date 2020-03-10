import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddPage from './AddPage'

it('renders without errors', () => {
  const wrapper = shallow(<AddPage />)
  expect(toJson(wrapper)).toMatchSnapshot()
})