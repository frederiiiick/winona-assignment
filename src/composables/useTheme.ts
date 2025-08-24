import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

// Function to update theme
const updateTheme = () => {
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Initialize theme from localStorage
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
  } else {
    // Default to light theme
    isDark.value = false;
  }
  updateTheme();
};

// Initialize theme immediately if we're in the browser
if (typeof window !== 'undefined') {
  initializeTheme();
}

export function useTheme() {
  // Initialize theme when composable is used (for SSR safety)
  onMounted(() => {
    if (!localStorage.getItem('theme')) {
      initializeTheme();
    }
  });

  return {
    isDark,
    toggleTheme,
    updateTheme,
    initializeTheme
  };
}
