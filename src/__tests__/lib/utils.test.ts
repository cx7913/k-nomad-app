import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils.ts', () => {
  describe('cn(...inputs)', () => {
    it('단일 클래스 문자열 처리', () => {
      const result = cn('text-red-500')
      expect(result).toBe('text-red-500')
    })

    it('여러 클래스 병합', () => {
      const result = cn('text-red-500', 'bg-blue-500', 'p-4')
      expect(result).toBe('text-red-500 bg-blue-500 p-4')
    })

    it('조건부 클래스 처리 (boolean)', () => {
      const isActive = true
      const isDisabled = false

      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )

      expect(result).toBe('base-class active-class')
      expect(result).not.toContain('disabled-class')
    })

    it("Tailwind 충돌 클래스 병합 ('p-2', 'p-4' -> 'p-4')", () => {
      const result = cn('p-2', 'p-4')
      expect(result).toBe('p-4')
    })

    it('undefined/null 값 무시', () => {
      const result = cn('text-red-500', undefined, null, 'bg-blue-500')
      expect(result).toBe('text-red-500 bg-blue-500')
    })

    it('객체 형태 조건부 클래스', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': true,
        'p-4': false,
        hidden: false,
      })

      expect(result).toBe('text-red-500 bg-blue-500')
      expect(result).not.toContain('p-4')
      expect(result).not.toContain('hidden')
    })

    it('배열 형태 입력 처리', () => {
      const result = cn(['text-red-500', 'bg-blue-500'], ['p-4', 'm-2'])
      expect(result).toBe('text-red-500 bg-blue-500 p-4 m-2')
    })

    it('복합 Tailwind 충돌 클래스 병합', () => {
      // 여러 충돌 클래스가 있는 경우 마지막 값이 적용됨
      const result = cn('px-2 py-1', 'px-4', 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('빈 입력 처리', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('빈 문자열 입력 처리', () => {
      const result = cn('', 'text-red-500', '')
      expect(result).toBe('text-red-500')
    })

    it('복합 시나리오: 조건부 + 충돌 + 배열', () => {
      const isError = true
      const isSuccess = false

      const result = cn(
        'base-class',
        'p-2',
        ['flex', 'items-center'],
        isError && 'text-red-500',
        isSuccess && 'text-green-500',
        { 'bg-gray-100': true, 'bg-white': false },
        'p-4' // p-2를 덮어씀
      )

      expect(result).toContain('base-class')
      expect(result).toContain('flex')
      expect(result).toContain('items-center')
      expect(result).toContain('text-red-500')
      expect(result).not.toContain('text-green-500')
      expect(result).toContain('bg-gray-100')
      expect(result).not.toContain('bg-white')
      expect(result).toContain('p-4')
      expect(result).not.toContain('p-2')
    })

    it('색상 클래스 충돌 병합', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('hover/focus 상태 클래스 처리', () => {
      const result = cn(
        'hover:bg-gray-100',
        'focus:ring-2',
        'hover:bg-gray-200' // hover:bg-gray-100을 덮어씀
      )
      expect(result).toBe('focus:ring-2 hover:bg-gray-200')
    })
  })
})
