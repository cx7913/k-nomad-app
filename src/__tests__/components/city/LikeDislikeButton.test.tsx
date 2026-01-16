import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LikeDislikeButton } from '@/components/city/LikeDislikeButton'

describe('LikeDislikeButton', () => {
  describe('Rendering Tests', () => {
    it('should display initial likes count', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('should display initial dislikes count', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('should render ThumbsUp and ThumbsDown buttons', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })
  })

  describe('State Management Tests', () => {
    it('should increase like count when like button is clicked', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const likeButton = screen.getAllByRole('button')[0]
      fireEvent.click(likeButton)
      expect(screen.getByText('101')).toBeInTheDocument()
    })

    it('should cancel like and return to original count when like is clicked again', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const likeButton = screen.getAllByRole('button')[0]
      fireEvent.click(likeButton)
      expect(screen.getByText('101')).toBeInTheDocument()
      fireEvent.click(likeButton)
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('should increase dislike count when dislike button is clicked', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const dislikeButton = screen.getAllByRole('button')[1]
      fireEvent.click(dislikeButton)
      expect(screen.getByText('11')).toBeInTheDocument()
    })

    it('should cancel dislike and return to original count when dislike is clicked again', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const dislikeButton = screen.getAllByRole('button')[1]
      fireEvent.click(dislikeButton)
      expect(screen.getByText('11')).toBeInTheDocument()
      fireEvent.click(dislikeButton)
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('should switch from like to dislike (likes -1, dislikes +1)', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const likeButton = screen.getAllByRole('button')[0]
      const dislikeButton = screen.getAllByRole('button')[1]

      fireEvent.click(likeButton)
      expect(screen.getByText('101')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()

      fireEvent.click(dislikeButton)
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('11')).toBeInTheDocument()
    })

    it('should switch from dislike to like (dislikes -1, likes +1)', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const likeButton = screen.getAllByRole('button')[0]
      const dislikeButton = screen.getAllByRole('button')[1]

      fireEvent.click(dislikeButton)
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('11')).toBeInTheDocument()

      fireEvent.click(likeButton)
      expect(screen.getByText('101')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('should apply green style (fill-green-600) when like is active', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const likeButton = screen.getAllByRole('button')[0]
      fireEvent.click(likeButton)

      const svgIcon = likeButton.querySelector('svg')
      expect(svgIcon).toHaveClass('fill-green-600')
    })

    it('should apply red style (fill-red-600) when dislike is active', () => {
      render(<LikeDislikeButton initialLikes={100} initialDislikes={10} />)
      const dislikeButton = screen.getAllByRole('button')[1]
      fireEvent.click(dislikeButton)

      const svgIcon = dislikeButton.querySelector('svg')
      expect(svgIcon).toHaveClass('fill-red-600')
    })
  })
})
