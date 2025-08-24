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
    it('should have default size prop', () => {
      const wrapper = mount(ThemeToggle)
      
      expect(wrapper.props('size')).toBe('md')
    })

    it('should accept custom size prop', () => {
      const wrapper = mount(ThemeToggle, {
        props: {
          size: 'lg',
        },
      })
      
      expect(wrapper.props('size')).toBe('lg')
    })

    it('should handle all size variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      
      sizes.forEach(size => {
        const wrapper = mount(ThemeToggle, {
          props: { size },
        })
        
        expect(wrapper.props('size')).toBe(size)
      })
    })
  })

  describe('Size Classes', () => {
    it('should apply correct size classes for small size', () => {
      const wrapper = mount(ThemeToggle, {
        props: { size: 'sm' },
      })
      
      const sunIcon = wrapper.find('.swap-off')
      const moonIcon = wrapper.find('.swap-on')
      
      expect(sunIcon.classes()).toContain('size-4')
      expect(moonIcon.classes()).toContain('size-4')
    })

    it('should apply correct size classes for medium size', () => {
      const wrapper = mount(ThemeToggle, {
        props: { size: 'md' },
      })
      
      const sunIcon = wrapper.find('.swap-off')
      const moonIcon = wrapper.find('.swap-on')
      
      expect(sunIcon.classes()).toContain('size-5')
      expect(moonIcon.classes()).toContain('size-5')
    })

    it('should apply correct size classes for large size', () => {
      const wrapper = mount(ThemeToggle, {
        props: { size: 'lg' },
      })
      
      const sunIcon = wrapper.find('.swap-off')
      const moonIcon = wrapper.find('.swap-on')
      
      expect(sunIcon.classes()).toContain('size-6')
      expect(moonIcon.classes()).toContain('size-6')
    })
  })

  describe('Theme State', () => {
    it('should display sun icon when theme is light', () => {
      mockUseTheme.mockReturnValue({
        isDark: false,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      
      // Both icons are always present in DaisyUI swap, but the checkbox state reflects the theme
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeUndefined()
    })

    it('should display moon icon when theme is dark', () => {
      mockUseTheme.mockReturnValue({
        isDark: true,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      
      // Both icons are always present in DaisyUI swap, but the checkbox state reflects the theme
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeDefined()
    })
  })

  describe('Theme Toggle', () => {
    it('should call toggleTheme when checkbox is changed', async () => {
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

    it('should update checkbox checked state based on theme', () => {
      mockUseTheme.mockReturnValue({
        isDark: true,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeDefined()
    })

    it('should not have checked attribute when theme is light', () => {
      mockUseTheme.mockReturnValue({
        isDark: false,
        toggleTheme: vi.fn(),
      })

      const wrapper = mount(ThemeToggle)
      
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.attributes('checked')).toBeUndefined()
    })
  })

  describe('Component Structure', () => {
    it('should have correct HTML structure', () => {
      const wrapper = mount(ThemeToggle)
      
      expect(wrapper.find('label.swap').exists()).toBe(true)
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
      expect(wrapper.find('.swap-off').exists()).toBe(true)
      expect(wrapper.find('.swap-on').exists()).toBe(true)
    })

    it('should have swap-rotate class for animation', () => {
      const wrapper = mount(ThemeToggle)
      
      const label = wrapper.find('label.swap')
      expect(label.classes()).toContain('swap-rotate')
    })

    it('should have proper SVG icons with correct structure', () => {
      const wrapper = mount(ThemeToggle)
      
      const sunIcon = wrapper.find('.swap-off')
      const moonIcon = wrapper.find('.swap-on')
      
      expect(sunIcon.exists()).toBe(true)
      expect(moonIcon.exists()).toBe(true)
      
      // Check that the icons have the correct classes and structure
      expect(sunIcon.classes()).toContain('swap-off')
      expect(moonIcon.classes()).toContain('swap-on')
    })
  })

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      const wrapper = mount(ThemeToggle)
      
      const label = wrapper.find('label')
      const input = wrapper.find('input')
      
      expect(label.exists()).toBe(true)
      expect(input.exists()).toBe(true)
    })

    it('should have checkbox input type', () => {
      const wrapper = mount(ThemeToggle)
      
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('checkbox')
    })
  })

  describe('Icon Content', () => {
    it('should have sun icon with correct classes', () => {
      const wrapper = mount(ThemeToggle)
      
      const sunIcon = wrapper.find('.swap-off')
      expect(sunIcon.exists()).toBe(true)
      expect(sunIcon.classes()).toContain('swap-off')
      expect(sunIcon.classes()).toContain('fill-current')
    })

    it('should have moon icon with correct classes', () => {
      const wrapper = mount(ThemeToggle)
      
      const moonIcon = wrapper.find('.swap-on')
      expect(moonIcon.exists()).toBe(true)
      expect(moonIcon.classes()).toContain('swap-on')
      expect(moonIcon.classes()).toContain('fill-current')
    })
  })
})
