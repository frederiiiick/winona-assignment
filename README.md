# 🏥 Winona Doctor Management System

[![Vue.js](https://img.shields.io/badge/Vue.js-3.0+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

A modern, responsive web application for managing and viewing doctor information with a beautiful dark/light theme toggle and comprehensive testing suite.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🌓 **Theme Toggle** - Seamless dark/light mode switching
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Doctor Search & Filtering** - Easy navigation through doctor listings
- 📋 **Detailed Doctor Profiles** - Comprehensive information display
- 🧪 **Comprehensive Testing** - Full test coverage with Vitest
- ⚡ **Fast Performance** - Built with Vite for optimal development experience
- 🔐 **Secure API Integration** - Authenticated external data fetching

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/winona-assignment.git
   cd winona-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ui` | Run tests with UI interface |

## 🧪 Testing

This project includes a comprehensive testing suite built with **Vitest** and **Vue Test Utils**.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

### Test Structure

```
tests/
├── components/          # Component tests
│   ├── DoctorCard.test.ts
│   ├── DoctorsList.test.ts
│   └── ThemeToggle.test.ts
├── index.test.ts       # Main test file
└── setup.ts           # Test configuration
```

## 🏗️ Project Structure

```
src/
├── components/         # Vue components
│   ├── DoctorCard.vue      # Individual doctor display
│   ├── DoctorsList.vue     # Doctor listing container
│   └── ThemeToggle.vue     # Theme switching component
├── composables/       # Vue composables
│   ├── useDoctors.ts       # Doctor data management
│   └── useTheme.ts         # Theme state management
├── services/          # API services
│   └── doctor.ts           # Doctor API integration
├── types/             # TypeScript type definitions
│   ├── api.ts              # API response types
│   └── doctor.ts           # Doctor data types
├── views/             # Page components
│   ├── DashboardView.vue   # Main dashboard
│   └── DoctorDetailsView.vue # Doctor detail page
└── router/            # Vue Router configuration
    └── index.ts            # Route definitions
```

## 🎨 Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Type Safety**: TypeScript for robust development
- **State Management**: Pinia for application state
- **Routing**: Vue Router for navigation
- **Testing**: Vitest with Vue Test Utils
- **Package Manager**: npm

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Test runner configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vue.js](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [DaisyUI](https://daisyui.com/)
- Testing powered by [Vitest](https://vitest.dev/)

---

<div align="center">
  <p>Made with ❤️ using Vue.js and modern web technologies</p>
  <p>For questions or support, please open an issue on GitHub</p>
</div>
