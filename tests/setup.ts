import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock Vue Router (needed globally for components that use router)
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useRoute: () => ({
    params: { id: '1' },
  }),
}))

// Global test configuration
config.global.stubs = {
  'router-link': true,
  'router-view': true,
}
