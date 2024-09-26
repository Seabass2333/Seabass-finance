import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '../page'

jest.mock('@/features/accounts/api/use-accounts', () => ({
  useAccounts: jest.fn(() => ({
    data: [],
    isLoading: false,
    error: null
  }))
}))

describe('Accounts Page', () => {
  it('renders without crashing', () => {
    render(<Page />)
    expect(
      screen.getByRole('heading', { name: /accounts/i })
    ).toBeInTheDocument()
  })

  it('displays loading state', () => {
    jest
      .spyOn(require('@/features/accounts/api/use-accounts'), 'useAccounts')
      .mockReturnValue({ data: [], isLoading: true, error: null })

    render(<Page />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays error state', () => {
    jest
      .spyOn(require('@/features/accounts/api/use-accounts'), 'useAccounts')
      .mockReturnValue({
        data: [],
        isLoading: false,
        error: new Error('Failed to fetch')
      })

    render(<Page />)
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('displays account list when data is loaded', () => {
    const mockAccounts = [
      { id: '1', name: 'Account 1', balance: 1000 },
      { id: '2', name: 'Account 2', balance: 2000 }
    ]
    jest
      .spyOn(require('@/features/accounts/api/use-accounts'), 'useAccounts')
      .mockReturnValue({ data: mockAccounts, isLoading: false, error: null })

    render(<Page />)
    expect(screen.getByText('Account 1')).toBeInTheDocument()
    expect(screen.getByText('Account 2')).toBeInTheDocument()
  })
})
