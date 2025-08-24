<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchDoctorById } from '@/services/doctor'
import type { Doctor } from '@/types/doctor'
import DoctorCard from '@/components/DoctorCard.vue'

const route = useRoute()
const router = useRouter()
const doctor = ref<Doctor | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchDoctor = async () => {
  try {
    loading.value = true
    const doctorId = route.params.id as string
    
    const response = await fetchDoctorById(doctorId)
    const foundDoctor: Doctor = await response.json()
    
    doctor.value = foundDoctor
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch doctor details'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDoctor()
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <main class="px-3 py-3 flex flex-col gap-3 max-w-screen-lg mx-auto mt-10 mb-10">
    <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="loading loading-spinner loading-lg text-[#fd7c3f]"></div>
        <span class="ml-3 text-base-content/70">Loading doctor details...</span>
    </div>
    
    <div v-else-if="error" class="flex flex-col items-center justify-center py-16 px-4">
      <!-- Error Icon -->
      <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <!-- Error Title -->
      <h2 class="text-2xl font-semibold text-base-content mb-3">Doctor Not Found</h2>
      
      <!-- Error Message -->
      <p class="text-gray-600 text-center max-w-md mb-8">
        {{ error }}
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button 
          @click="router.push('/')" 
          class="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#fd7c3f] hover:bg-[#e66a2e] transition-all duration-200 font-medium text-white border border-[#fd7c3f] hover:border-[#e66a2e] hover:shadow-sm cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Go to Dashboard</span>
        </button>
      </div>
    </div>
    
    <div v-else-if="doctor" class="flex flex-col gap-4">
      <button 
        @click="goBack" 
        class="group w-fit flex items-center gap-3 px-4 py-2 rounded-lg bg-base-200/50 hover:bg-base-200 transition-all duration-200 font-medium text-base-content/70 hover:text-base-content border border-base-300/30 hover:border-base-300/50 hover:shadow-sm cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm">Back</span>
      </button>
      <DoctorCard :doctor="doctor" />
    </div>
    
    <div v-else class="text-center py-8">
      <p>Doctor not found</p>
    </div>
  </main>
</template>
