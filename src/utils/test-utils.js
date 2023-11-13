import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import timeReducer from '../features/time/time-slice'
import { MemoryRouter } from 'react-router-dom'

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: { time: timeReducer }, preloadedState }),
    route,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {renderWithProviders as render}