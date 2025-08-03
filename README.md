# E-Commerce Mobile App

A modern, feature-rich e-commerce mobile application built with React Native and TypeScript. This app provides a seamless shopping experience with product browsing, cart management, and detailed product views.

## 📱 Features

- **Product Catalog**: Browse a comprehensive list of products with category filtering
- **Product Details**: View detailed information about each product including images and descriptions
- **Shopping Cart**: Add, remove, and manage items in your cart with quantity controls
- **Persistent Storage**: Cart data is saved locally using AsyncStorage for a seamless user experience
- **Real-time Updates**: Cart badge updates in real-time as items are added or removed
- **Responsive Design**: Optimized for both iOS and Android platforms
- **Category Filtering**: Filter products by categories for easier browsing
- **Pull to Refresh**: Refresh product data with a simple pull gesture

## 🛠 Tech Stack

- **Framework**: React Native 0.80.2
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation v7
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (>= 18.0.0)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- JDK 11 or newer

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MostafaHamdy3/E_Commerce.git
   cd E_Commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install
   ```

4. **Android Setup**
   - Ensure Android Studio is installed and configured
   - Start an Android emulator or connect a physical device

## 🏃‍♂️ Running the App

### Development Mode

Start the Metro bundler:
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

## 📁 Project Structure

```
app/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── services/           # API services and external integrations
├── store/              # State management (Zustand stores)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and constants
```

## 📱 Screenshots

<!-- Add screenshots of your app here -->

## 🔧 Configuration

The app uses the following external API:
- **Products API**: `https://api.escuelajs.co/api/v1`

To use a different API, update the base URL in `app/services/api.ts`.

## 🌟 Key Components

- **Products Screen**: Main product listing with category filtering
- **Product Details Screen**: Detailed view of individual products
- **Cart Screen**: Shopping cart management
- **Cart Store**: Global state management for cart functionality
- **Navigation**: Stack-based navigation between screens

## 🔄 State Management

The app uses Zustand for state management, specifically for:
- Cart items management
- Product quantity tracking
- Persistent storage integration
- Real-time cart updates

## 🚀 Performance Features

- Optimized FlatList rendering for product lists
- Image caching and optimization
- Efficient state updates with Zustand
- Lazy loading of product details
- Pull-to-refresh functionality

## Author 👨‍💻

<div align="center">

**Mostafa Hamdy**  
React Native | React Developer

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mostafa7amdy.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/🔗_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mostafa-7amdy/)
[![Email](https://img.shields.io/badge/📧_Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mostafa44hamdy@gmail.com)

</div>
