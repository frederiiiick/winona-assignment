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
    it('should display loading spinner when loading is true', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: true,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.find('.loading-spinner').exists()).toBe(true)
      expect(wrapper.text()).toContain('Loading list of doctors...')
    })
  })

  describe('Error State', () => {
    it('should display error message when there is an error', () => {
      const error = { message: 'Failed to fetch doctors' }
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.find('.alert-error').exists()).toBe(true)
      expect(wrapper.text()).toContain('Error loading doctors')
      expect(wrapper.text()).toContain('Failed to fetch doctors')
    })

    it('should call retryFetch when retry button is clicked', async () => {
      const retryFetch = vi.fn()
      const error = { message: 'Failed to fetch doctors' }
      
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error,
        retryFetch,
      })

      const wrapper = mount(DoctorsList)
      
      await wrapper.find('button').trigger('click')
      
      expect(retryFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Doctors List', () => {
    it('should display list of doctors when doctors are available', () => {
      mockUseDoctors.mockReturnValue({
        doctors: mockDoctors,
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.findAll('.avatar-placeholder')).toHaveLength(2)
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

    it('should navigate to doctor details when details link is clicked', async () => {
      mockUseDoctors.mockReturnValue({
        doctors: [mockDoctors[0]],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      // Open dropdown
      await wrapper.find('[role="button"]').trigger('click')
      
      // Click details link
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
    it('should have correct CSS classes and structure', () => {
      mockUseDoctors.mockReturnValue({
        doctors: [],
        loading: false,
        error: null,
        retryFetch: vi.fn(),
      })

      const wrapper = mount(DoctorsList)
      
      expect(wrapper.find('.card').exists()).toBe(true)
      expect(wrapper.find('.card-body').exists()).toBe(true)
      expect(wrapper.find('.card-title').exists()).toBe(true)
      expect(wrapper.find('h2').text()).toBe('List of Doctors')
    })
  })
})
