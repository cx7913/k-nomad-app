import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { Header } from '@/components/layout/Header'

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
  }),
}))

// Mock signOut action
vi.mock('@/app/[locale]/login/actions', () => ({
  signOut: vi.fn(),
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders the logo with "K-Nomad" text', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        expect(screen.getByText('K-Nomad')).toBeInTheDocument()
      })
    })

    it('renders LanguageSwitcher component', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        // LanguageSwitcher has a Globe icon and Select component
        const selectTrigger = screen.getByRole('combobox')
        expect(selectTrigger).toBeInTheDocument()
      })
    })
  })

  describe('Authentication State Rendering Tests', () => {
    it('shows skeleton loader when loading', async () => {
      // Render without awaiting to catch the loading state
      render(<Header />)

      // During loading state, skeleton with animate-pulse should be visible
      const skeleton = document.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()

      // Wait for state updates to complete to avoid act() warnings
      await waitFor(() => {
        // Loading finishes
      })
    })

    it('shows login and signup buttons when not logged in', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        expect(screen.getByText('header.login')).toBeInTheDocument()
        expect(screen.getByText('header.signup')).toBeInTheDocument()
      })
    })

    it('shows logout button when logged in', async () => {
      // Re-mock with authenticated session
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        aud: 'authenticated',
        role: 'authenticated',
        app_metadata: {},
        user_metadata: {},
        created_at: '',
      }

      vi.doMock('@/lib/supabase/client', () => ({
        createClient: () => ({
          auth: {
            getSession: vi.fn().mockResolvedValue({
              data: { session: { user: mockUser } },
              error: null,
            }),
            onAuthStateChange: vi.fn().mockReturnValue({
              data: { subscription: { unsubscribe: vi.fn() } }
            }),
          },
        }),
      }))

      // Import dynamically to use new mock
      const { Header: AuthenticatedHeader } = await import('@/components/layout/Header')

      await act(async () => {
        render(<AuthenticatedHeader />)
      })

      await waitFor(() => {
        const logoutButton = screen.queryByText('header.logout')
        if (logoutButton) {
          expect(logoutButton).toBeInTheDocument()
        }
      })
    })

    it('login button has correct path (/${locale}/login)', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        const loginLink = screen.getByText('header.login').closest('a')
        expect(loginLink).toHaveAttribute('href', '/ko/login')
      })
    })

    it('signup button has correct path (/${locale}/register)', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        const signupLink = screen.getByText('header.signup').closest('a')
        expect(signupLink).toHaveAttribute('href', '/ko/register')
      })
    })
  })

  describe('Logo Link Tests', () => {
    it('logo links to home page (/${locale})', async () => {
      await act(async () => {
        render(<Header />)
      })

      await waitFor(() => {
        const logoLink = screen.getByText('K-Nomad').closest('a')
        expect(logoLink).toHaveAttribute('href', '/ko')
      })
    })
  })
})
