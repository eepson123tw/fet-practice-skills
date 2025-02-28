# Frontend Practice Skills

<div align="center">
  <span style="padding: 5px 15px; margin-right: 10px; background-color: #007BFF; color: white; border-radius: 5px; font-weight: bold;">English</span>
  <a href="README.zh.md" style="padding: 5px 15px; text-decoration: none; background-color: #28A745; color: white; border-radius: 5px; font-weight: bold;">繁體中文</a>
</div>


A comprehensive repository for practicing and showcasing modern front-end development skills and interactive demos.

![Frontend Practice Skills Preview](https://github.com/user-attachments/assets/5c96a124-e468-4818-a64f-1ec3169e3a86)

## 🚀 Features

- **Interactive Canvas Animations**
- **TypeScript Integration**
- **Modern Component Architecture**
- **Responsive UI Patterns**
- **Browser API Implementations**
- **Theme Switching Capability**
- **Optimized Bundler Configuration**
- **Automated GitHub Actions Pipeline**

## 📋 Included Technologies

- **TypeScript**: Type-safe JavaScript for better developer experience
- **React**: Component-based UI development
- **Modern CSS**: Utilizing latest CSS features and techniques
- **Canvas API**: Creating dynamic visual experiences
- **Browser APIs**: Leveraging modern browser capabilities
- **Vite**: Fast bundling and development experience
- **GitHub Actions**: Automated testing and deployment

For more details about updates and improvements, refer to the [changelog](docs/CHANGELOG.md).

## 🌐 Browser Compatibility

Fully compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## 🔍 Technical Insights

### 1. Module Import Strategies: Local vs. Global

#### Impact on Bundle Size and Performance
- **Local Import**: `import { feature } from 'package'`
  - Only includes specific features
  - Results in smaller bundle size
  - Better for tree-shaking

- **Global Import**: `import * as package from 'package'`
  - Imports all features from a package
  - Can increase bundle size
  - May include unused code

The choice between local and global imports significantly affects your final bundle size and application performance.

### 2. XHR vs Fetch API Comparison

| Feature                  | XMLHttpRequest |    Fetch    |
|--------------------------|:--------------:|:-----------:|
| Basic request capability |       ✓        |      ✓      |
| Response handling        |       ✓        |      ✓      |
| Request speed monitoring |       ✓        |      ✗      |
| Response speed monitoring|       ✓        |      ✓      |
| Service Worker support   |       ✗        |      ✓      |
| Cookie control           |       ✗        |      ✓      |
| Redirect control         |       ✗        |      ✓      |
| Request cancellation     |       ✓        |      ✓      |
| Custom Referrer          |       ✗        |      ✓      |
| Stream support           |       ✗        |      ✓      |
| API style                |     Event      |   Promise   |
| Future support           | Being phased out | Long-term |

## 🖥️ Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/fet-practice-skills.git

# Navigate to project directory
cd fet-practice-skills

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🗂️ Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── docs/                  # Documentation
└── vite.config.ts         # Vite configuration
```


