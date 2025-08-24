<script setup lang="ts">
import type { Doctor } from '@/types/doctor'

defineProps<{
  doctor: Doctor
}>()

</script>

<template>
  <div class="card lg:card-side bg-base-100 shadow-sm border border-base-300 rounded-xl transition-all duration-300">
    <figure>
      <img src="@/assets/bg.png" alt="Background" class="lg:h-100 lg:w-150 h-40 w-full object-cover object-center" />
    </figure>
    <div class="card-body">
      <div class="flex justify-between mb-2 flex-wrap gap-4 flex-col-reverse md:flex-row">
        <div class="flex items-center space-x-4">
          <div class="avatar avatar-placeholder">
            <div class="bg-[#fd7c3f] text-primary-content w-18 rounded-full">
              <span class="text-xl font-bold">{{ doctor.firstName.charAt(0) }}{{ doctor.lastName.charAt(0) }}</span>
            </div>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-base-content">
              Dr. {{ doctor.firstName }} {{ doctor.lastName }}
            </h1>
            <p class="text-base-content/70 text-lg">Medical Professional</p>
          </div>
        </div>
        
        <!-- License Status Badge -->
        <div :class="['badge badge-sm self-end md:self-start', doctor.licenseActive ? 'badge-success' : 'badge-error']">
          {{ doctor.licenseActive ? 'Active' : 'Inactive' }}
        </div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <p class="text-base-content">
          Dr. {{ doctor.firstName }} {{ doctor.lastName }} is a licensed physician dedicated to providing compassionate, patient-centered care. Dr. {{ doctor.lastName }} focuses on promoting health, preventing illness, and helping patients live healthier lives.
        </p>
      </div>

      <!-- Doctor Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Personal Information -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-[#fd7c3f]/10 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-[#fd7c3f]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-base-content/60">Full Name</p>
              <p class="font-medium text-base-content">{{ doctor.firstName }} {{ doctor.lastName }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-base-content/60">Location</p>
              <p class="font-medium text-base-content">{{ doctor.state }}</p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                <path d="M3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                <path d="M8 6a1 1 0 100 2h4a1 1 0 100-2H8z"/>
                <path d="M7 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"/>
                <path d="M9 2a1 1 0 100 2h2a1 1 0 100-2H9z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-base-content/60">Date of Birth</p>
              <p class="font-medium text-base-content">{{ new Date(doctor.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-base-content/60">Member Since</p>
              <p class="font-medium text-base-content">{{ new Date(doctor.signedUpDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
