<script setup lang="ts">
import { useDoctors } from '@/composables/useDoctors'
import { useRouter } from 'vue-router'

const navigateTo = (path: string) => {
  router.push(path)
}

const { doctors, loading, error, retryFetch } = useDoctors()
const router = useRouter()
</script>

<template>
  <div class="card bg-base-100 shadow-lg border border-base-300 rounded-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold mb-4 text-base-content">List of Doctors</h2>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="loading loading-spinner loading-lg text-[#fd7c3f]"></div>
        <span class="ml-3 text-base-content/70">Loading list of doctors...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 class="font-bold">Error loading doctors</h3>
          <div class="text-xs">{{ error.message }}</div>
        </div>
        <button @click="retryFetch" class="btn btn-sm btn-outline">Retry</button>
      </div>

      <!-- Doctors List -->
      <div v-else-if="doctors.length > 0" class="space-y-3">
        <div
          v-for="doctor in doctors"
          :key="doctor.id"
          class="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
        >
          <div class="flex-1 flex items-center gap-4">
            <div class="avatar avatar-placeholder">
              <div class="bg-[#fd7c3f] text-primary-content w-12 rounded-full">
                <span class="text-xl font-bold">{{ doctor.firstName.charAt(0) }}{{ doctor.lastName.charAt(0) }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold text-base-content text-base-content">
                {{ doctor.firstName }} {{ doctor.lastName }}
              </div>
              <div class="text-sm text-base-content/70 uppercase font-semibold tracking-wide">
                {{ doctor.state }}
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="cursor-pointer hover:bg-base-200 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24">
              <li>
                <a class="text-xs font-bold flex justify-center" @click="navigateTo(`/doctor/${doctor.id}`)">
                Details
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8 text-base-content/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <p class="text-lg font-medium">No doctors available</p>
        <p class="text-sm">Check back later for available appointments</p>
      </div>
    </div>
  </div>
</template>
