import { render, screen, fireEvent } from '@testing-library/react'
import Card from './'

describe('Card', () => {
  test('Should render the picture', async () => {
    render(
      <Card
        label="testLabel"
        title="testTitle"
        src="../../assets/profile.png"
      />
    )
    const cardImg = screen.getByRole('img')

    expect(cardImg.src).toBe('http://localhost/profile.png')
  })

  test('Should add stars when clicked', async () => {
    render(
      <Card
        label="testLabel"
        title="testTitle"
        src="../../assets/profile.png"
      />
    )
    const cardTitle = screen.getByText('testTitle')
    const parentNode = cardTitle.closest('div')
    fireEvent.click(parentNode)
    expect(cardTitle.textContent).toBe('⭐️ testTitle ⭐️')
  })
})
