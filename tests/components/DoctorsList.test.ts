import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DoctorsList from '../../src/components/DoctorsList.vue'
import type { Doctor } from '../../src/types/doctor'

// Mock the composables
const mockUseDoctors = vi.fn()
const mockUseRouter = vi.fn()

vi.mock('@/composables/useDoctors', () => ({
  useDoctors: () => mockUseDoctors(),
}))

vi.mock('vue-router', () => ({
  useRouter: () => mockUseRouter(),
}))

describe('DoctorsList', () => {
  const mockRouter = {
    push: vi.fn(),
  }

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      state: 'CA',
      licenseActive: true,
      dob: '1980-01-01',
      signedUpDate: '2020-01-01',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      state: 'NY',
      licenseActive: false,
      dob: '1985-05-15',
      signedUpDate: '2019-06-01',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseRouter.mockReturnValue(mockRouter)
  })

  describe('Loading State', () => {
    it('should display loading state when loading is true', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: true,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.text()).toContain('Loading list of doctors...')
    })
  })

  describe('Error State', () => {
    it('should display error message and retry functionality', async () => {
      const retryFetch = vi.fn()
      const error = { message: 'Failed to fetch doctors' }
      
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error,
        retryFetch,
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.text()).toContain('Error loading doctors')
      expect(wrapper.text()).toContain('Failed to fetch doctors')
      
      // Test retry functionality
      await wrapper.find('button').trigger('click')
      expect(retryFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Doctors List', () => {
    it('should display list of doctors when available', () => {
      mockUseDoctors.mockReturnValue({
        doctors: mockDoctors,
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.text()).toContain('John Doe')
      expect(wrapper.text()).toContain('Jane Smith')
      expect(wrapper.text()).toContain('CA')
      expect(wrapper.text()).toContain('NY')
    })

    it('should display doctor initials in avatar', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [mockDoctors[0]],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      const avatar = wrapper.find('.avatar-placeholder span')
      expect(avatar.text()).toBe('JD')
    })

    it('should navigate to doctor details when clicked', async () => {
      mockUseDoctors.mockReturnValue({
        doctors: [mockDoctors[0]],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      // Open dropdown and click details link
      await wrapper.find('[role="button"]').trigger('click')
      await wrapper.find('a').trigger('click')
      
      expect(mockRouter.push).toHaveBeenCalledWith('/doctor/1')
    })
  })

  describe('Empty State', () => {
    it('should display empty state when no doctors are available', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.text()).toContain('No doctors available')
      expect(wrapper.text()).toContain('Check back later for available appointments')
    })
  })

  describe('Component Structure', () => {
    it('should render with basic required elements', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.find('h2').text()).toBe('List of Doctors')
    })
  })
})
