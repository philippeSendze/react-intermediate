import { ThemeProvider, SurveyProvider } from '../context'
import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <SurveyProvider>{children}</SurveyProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

export function render(ui) {
  rtlRender(ui, { wrapper: Wrapper })
}
