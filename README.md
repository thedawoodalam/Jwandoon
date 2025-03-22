# Jwandoon - Blood Donation App

Jwandoon is a mobile application that connects blood donors with recipients in need. The app facilitates blood donation by matching donors with nearby blood requests and managing the entire donation process.

## Features

- **User Authentication**: Secure login and registration system
- **User Profiles**: Manage donor and recipient profiles with blood type information
- **Blood Request System**: Create and manage blood donation requests
- **Location-based Matching**: Find nearby donors and requests using geolocation
- **Donation History**: Track donation history and schedule
- **Real-time Updates**: Get notified about nearby blood requests
- **Admin Dashboard**: Manage users, requests, and donations

## Technology Stack

- React Native
- TypeScript
- Firebase Authentication
- Cloud Firestore
- React Navigation
- React Native Paper
- React Native Maps
- Expo Location

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- React Native development environment setup
- Firebase project setup
- Google Maps API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jwandoon.git
cd jwandoon
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run the app:
```bash
# For Android
npm run android
# or
yarn android

# For iOS
npm run ios
# or
yarn ios
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React Context providers
├── navigation/    # Navigation configuration
├── screens/       # Screen components
│   ├── admin/    # Admin-specific screens
│   ├── auth/     # Authentication screens
│   └── main/     # Main app screens
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)
Project Link: [https://github.com/yourusername/jwandoon](https://github.com/yourusername/jwandoon) 