import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { render } from '../../utils/test'

import Freelances from './index'

const freelancersMockedData = [
  {
    name: 'Philippe Sendze',
    job: 'Développeur frontend',
    picture: '',
  },
  {
    name: 'Festus Ndjounouga',
    job: 'Développeur fullstack',
    picture: '',
  },
]

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())

// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())

// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

test('Should display freelancers names', async () => {
  render(<Freelances />)
  //   expect(screen.getByTestId('loader')).toBeTruthy()

  //Making sure the element is removed before the next test
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
  await waitFor(() => {
    expect(screen.getByText('Philippe Sendze')).toBeTruthy()
    expect(screen.getByText('Festus Ndjounouga')).toBeTruthy()
  })
})
