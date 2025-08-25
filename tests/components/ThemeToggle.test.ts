import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../../src/components/ThemeToggle.vue'

// Mock the composable
const mockUseTheme = vi.fn()

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => mockUseTheme(),
}))

describe('ThemeToggle', () => {
  const mockTheme = {
    isDark: false,
    toggleTheme: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue(mockTheme)
  })

  describe('Props', () => {
    it('should accept size prop and apply appropriate sizing', () => {
      const wrapper = mount(ThemeToggle, {
        props: { size: 'lg' },
      })
      
      expect(wrapper.props('size')).toBe('lg')
      expect(wrapper.find('label.swap').exists()).toBe(true)
    })

    it('should have default size prop', () => {
      const wrapper = mount(ThemeToggle)
      expect(wrapper.props('size')).toBe('md')
    })
  })

  describe('Theme State and Toggle', () => {
    it('should reflect light theme state', () => {
      mockUseTheme.mockReturnValue({
        isDark: false,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeUndefined()
    })

    it('should reflect dark theme state', () => {
      mockUseTheme.mockReturnValue({
        isDark: true,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeDefined()
    })

    it('should call toggleTheme when toggled', async () => {
      const toggleTheme = vi.fn()
      mockUseTheme.mockReturnValue({
        isDark: false,
        toggleTheme,
      })

      const wrapper = mount(ThemeToggle)
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.trigger('change')
      
      expect(toggleTheme).toHaveBeenCalledTimes(1)
    })
  })

  describe('Component Structure', () => {
    it('should render with basic required elements', () => {
      const wrapper = mount(ThemeToggle)
      
      expect(wrapper.find('label.swap').exists()).toBe(true)
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
      expect(wrapper.find('.swap-off').exists()).toBe(true)
      expect(wrapper.find('.swap-on').exists()).toBe(true)
    })

    it('should have proper accessibility attributes', () => {
      const wrapper = mount(ThemeToggle)
      
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('checkbox')
    })
  })
})
