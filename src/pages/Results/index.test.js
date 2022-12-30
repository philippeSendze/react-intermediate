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
