import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DoctorCard from '../../src/components/DoctorCard.vue'
import type { Doctor } from '../../src/types/doctor'

describe('DoctorCard', () => {
  const mockDoctor: Doctor = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    state: 'CA',
    licenseActive: true,
    dob: '1980-01-01',
    signedUpDate: '2020-01-01',
  }

  describe('Props', () => {
    it('should render with doctor prop', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('Dr. John Doe')
      expect(wrapper.text()).toContain('CA')
    })

    it('should display doctor information correctly', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('Dr. John Doe')
      expect(wrapper.text()).toContain('Medical Professional')
      expect(wrapper.text()).toContain('CA')
      expect(wrapper.text()).toContain('January 1, 1980')
      expect(wrapper.text()).toContain('January 1, 2020')
    })
  })

  describe('Avatar Display', () => {
    it('should display doctor initials in avatar', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      const avatar = wrapper.find('.avatar-placeholder span')
      expect(avatar.text()).toBe('JD')
    })

    it('should handle different name combinations', () => {
      const doctorWithMiddleName: Doctor = {
        ...mockDoctor,
        firstName: 'Mary',
        lastName: 'Johnson-Smith',
      }

      const wrapper = mount(DoctorCard, {
        props: {
          doctor: doctorWithMiddleName,
        },
      })

      const avatar = wrapper.find('.avatar-placeholder span')
      expect(avatar.text()).toBe('MJ')
    })
  })

  describe('License Status Badge', () => {
    it('should display active license badge when licenseActive is true', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      const badge = wrapper.find('.badge-success')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('Active')
    })

    it('should display inactive license badge when licenseActive is false', () => {
      const inactiveDoctor: Doctor = {
        ...mockDoctor,
        licenseActive: false,
      }

      const wrapper = mount(DoctorCard, {
        props: {
          doctor: inactiveDoctor,
        },
      })

      const badge = wrapper.find('.badge-error')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('Inactive')
    })
  })

  describe('Date Formatting', () => {
    it('should format date of birth correctly', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('January 1, 1980')
    })

    it('should format signed up date correctly', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('January 1, 2020')
    })

    it('should handle different date formats', () => {
      const doctorWithDifferentDates: Doctor = {
        ...mockDoctor,
        dob: '1995-12-25',
        signedUpDate: '2023-06-15',
      }

      const wrapper = mount(DoctorCard, {
        props: {
          doctor: doctorWithDifferentDates,
        },
      })

      expect(wrapper.text()).toContain('December 25, 1995')
      expect(wrapper.text()).toContain('June 15, 2023')
    })
  })

  describe('Component Structure', () => {
    it('should have correct CSS classes and structure', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.find('.card').exists()).toBe(true)
      expect(wrapper.find('.card-body').exists()).toBe(true)
      expect(wrapper.find('figure').exists()).toBe(true)
      expect(wrapper.find('h1').exists()).toBe(true)
    })

    it('should display background image', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toContain('bg.png')
      expect(img.attributes('alt')).toBe('Background')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      const grid = wrapper.find('.grid')
      expect(grid.exists()).toBe(true)
      expect(grid.classes()).toContain('grid-cols-1')
      expect(grid.classes()).toContain('md:grid-cols-2')
    })

    it('should have responsive card layout', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      const card = wrapper.find('.card')
      expect(card.classes()).toContain('lg:card-side')
    })
  })

  describe('Information Display', () => {
    it('should display all doctor information sections', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('Full Name')
      expect(wrapper.text()).toContain('Location')
      expect(wrapper.text()).toContain('Date of Birth')
      expect(wrapper.text()).toContain('Member Since')
    })

    it('should display professional description', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('licensed physician')
      expect(wrapper.text()).toContain('patient-centered care')
    })
  })
})
