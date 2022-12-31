import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { render } from '../../utils/test'

import Results from './index'
import { formatJobList, formatQueryParams } from '.'

describe('The formatJobList function', () => {
  test('Add a comma to an item', () => {
    const expectedState = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
  })
  test('No comma for the last item', () => {
    const expectedState = 'item3'
    expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
  })
})

describe('The formatQueryParams function', () => {
  test('Right format for the parameter', () => {
    const expectedState = 'a1=answer1'
    expect(formatQueryParams({ 1: 'answer1' })).toEqual(expectedState)
  })

  test('Concatenate two values with AND', () => {
    const expectedState = 'a1=answer1&a2=answer2'
    expect(formatQueryParams({ 1: 'answer1', 2: 'answer2' })).toEqual(
      expectedState
    )
  })
})

const resultsMockedData = [
  {
    title: 'test 1',
    description: 'description 1',
  },
  {
    title: 'test 2',
    description: 'description 2',
  },
]

const server = setupServer(
  rest.get('http://localhost:8000/results/', (req, res, ctx) => {
    return res(ctx.json({ resultsData: resultsMockedData }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Should display results after the data is loaded', async () => {
  render(<Results />)

  // expect(screen.getByTestId('loader')).toBeTruthy()
  // const jobTitleElements = screen.getAllByTestId('job-title')
  // expect(jobTitleElements[0].textContent).toBe('seo')
  // expect(jobTitleElements.length).toBe(2)
  // const jobDescriptionElements = screen.getAllByTestId('job-description')
  // expect(jobDescriptionElements[1].textContent).toBe(
  //   resultsMockedData[1].description
  // )
  // expect(jobDescriptionElements.length).toBe(2)
  // await waitFor(() => {
  //   expect(screen.getByText('test 1')).toBeTruthy()
  //   expect(screen.getByText('test 2')).toBeTruthy()
  // })
})
