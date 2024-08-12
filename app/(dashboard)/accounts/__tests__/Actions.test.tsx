import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Actions from '../actions'

// 模拟依赖
jest.mock('@/features/accounts/hooks/use-open-account', () => ({
  useOpenAccount: jest.fn(() => ({ onOpen: jest.fn() }))
}))
jest.mock('@/features/accounts/api/use-delete-account', () => ({
  useDeleteAccount: jest.fn(() => ({ mutate: jest.fn(), isPending: false }))
}))
jest.mock('@/hooks/use-confirm', () => ({
  useConfirm: jest.fn(() => [
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    jest.fn().mockResolvedValue(true)
  ])
}))

describe('Actions Component', () => {
  it('renders the dropdown menu', () => {
    render(<Actions id='test-id' />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens the dropdown menu when clicked', () => {
    render(<Actions id='test-id' />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('calls onOpen when Edit is clicked', () => {
    const mockOnOpen = jest.fn()
    jest
      .spyOn(
        require('@/features/accounts/hooks/use-open-account'),
        'useOpenAccount'
      )
      .mockReturnValue({ onOpen: mockOnOpen })

    render(<Actions id='test-id' />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Edit'))

    expect(mockOnOpen).toHaveBeenCalledWith('test-id')
  })

  it('calls deleteAccount when Delete is confirmed', async () => {
    const mockDeleteAccount = jest.fn()
    jest
      .spyOn(
        require('@/features/accounts/api/use-delete-account'),
        'useDeleteAccount'
      )
      .mockReturnValue({ mutate: mockDeleteAccount, isPending: false })

    render(<Actions id='test-id' />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Delete'))

    await waitFor(() => {
      expect(mockDeleteAccount).toHaveBeenCalled()
    })
  })

  it('disables menu items when isPending is true', () => {
    jest
      .spyOn(
        require('@/features/accounts/api/use-delete-account'),
        'useDeleteAccount'
      )
      .mockReturnValue({ mutate: jest.fn(), isPending: true })

    render(<Actions id='test-id' />)
    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText('Edit')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('Delete')).toHaveAttribute('aria-disabled', 'true')
  })
})
