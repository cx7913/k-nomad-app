import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ShareButton } from '@/components/city/ShareButton'

describe('ShareButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('Rendering Tests', () => {
    it('should render share button with text', () => {
      render(<ShareButton />)
      expect(screen.getByText('공유하기')).toBeInTheDocument()
    })

    it('should render Share2 icon', () => {
      render(<ShareButton />)
      const button = screen.getByRole('button')
      const svgIcon = button.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
    })
  })

  describe('Clipboard Functionality Tests', () => {
    it('should copy current URL to clipboard when clicked', async () => {
      render(<ShareButton />)
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href)
    })

    it('should display "복사됨!" on successful copy', async () => {
      render(<ShareButton />)
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      expect(screen.getByText('복사됨!')).toBeInTheDocument()
    })

    it('should display Check icon on successful copy', async () => {
      render(<ShareButton />)
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      const checkIcon = button.querySelector('svg')
      expect(checkIcon).toHaveClass('text-green-600')
    })

    it('should return to original state after 2 seconds', async () => {
      render(<ShareButton />)
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      expect(screen.getByText('복사됨!')).toBeInTheDocument()

      await act(async () => {
        vi.advanceTimersByTime(2000)
      })

      expect(screen.getByText('공유하기')).toBeInTheDocument()
    })

    it('should call console.error on clipboard API failure', async () => {
      vi.useRealTimers()
      const error = new Error('Clipboard error')
      vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(error)

      render(<ShareButton />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Failed to copy:', error)
      })
    })
  })
})
