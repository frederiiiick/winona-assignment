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

  describe('Props and Display', () => {
    it('should render doctor information correctly', () => {
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

      expect(wrapper.text()).toContain('Dr. Mary Johnson-Smith')
    })
  })

  describe('License Status', () => {
    it('should display active license status', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.text()).toContain('Active')
    })

    it('should display inactive license status', () => {
      const inactiveDoctor: Doctor = {
        ...mockDoctor,
        licenseActive: false,
      }

      const wrapper = mount(DoctorCard, {
        props: {
          doctor: inactiveDoctor,
        },
      })

      expect(wrapper.text()).toContain('Inactive')
    })
  })

  describe('Date Formatting', () => {
    it('should format dates correctly', () => {
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
    it('should render with basic required elements', () => {
      const wrapper = mount(DoctorCard, {
        props: {
          doctor: mockDoctor,
        },
      })

      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('img').exists()).toBe(true)
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
