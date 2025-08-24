import { ref, onMounted } from 'vue'
import type { Doctor } from '@/types/doctor'
import type { ApiError } from '@/types/api'
import { fetchDoctors as fetchDoctorsApi } from '@/services/doctor'

export function useDoctors() {
  const doctors = ref<Doctor[]>([])
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const fetchDoctors = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetchDoctorsApi()
      const data = await response.json()

      // Extract doctors from response
      doctors.value = Array.isArray(data) ? data : data.doctors || []
      
    } catch (err) {
      // Improved error handling with user-friendly messages
      let errorMessage = 'Failed to load doctors'
      let status: number | undefined

      if (err instanceof Response) {
        status = err.status
        switch (err.status) {
          case 404:
            errorMessage = 'Doctors not found'
            break
          case 500:
            errorMessage = 'Server error - please try again later'
            break
          case 401:
            errorMessage = 'Unauthorized access'
            break
          case 403:
            errorMessage = 'Access forbidden'
            break
          default:
            errorMessage = `Request failed (${err.status})`
        }
      } else if (err instanceof Error) {
        // Check if this is an HTTP error from our service
        const httpErrorMatch = err.message.match(/HTTP error! status: (\d+)/)
        if (httpErrorMatch) {
          status = parseInt(httpErrorMatch[1])
          switch (status) {
            case 404:
              errorMessage = 'Doctors not found'
              break
            case 500:
              errorMessage = 'Server error - please try again later'
              break
            case 401:
              errorMessage = 'Unauthorized access'
              break
            case 403:
              errorMessage = 'Access forbidden'
              break
            default:
              errorMessage = `Request failed (${status})`
          }
        } else {
          errorMessage = err.message
        }
      }

      error.value = { message: errorMessage, status }
    } finally {
      loading.value = false
    }
  }

  const retryFetch = (): void => {
    fetchDoctors()
  }

  onMounted(() => {
    fetchDoctors()
  })

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    retryFetch,
  }
}
