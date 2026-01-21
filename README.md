# Offshoot - Spotify Enhancement Tools

Breathe new life into your Spotify playlists with powerful tools that transform how you discover, organize, and experience your music!

## Description

Offshoot provides three core features to help you get more out of your Spotify account:

- **Playlist Splitter**: Split large playlists into smaller, organized collections based on various criteria (number of songs, genres, moods, etc.)
- **Monthly Wrap**: View detailed statistics about your listening habits over the past month, including top songs, artists, and genres
- **Music Discovery**: Get personalized music recommendations based on your listening history and preferences

## Roadmap

### Phase 1: Core Features

- User authentication via Spotify OAuth through Appwrite
- Spotify profile integration
- Basic dashboard interface

### Phase 2: Playlist Management (Current)

- Playlist splitting functionality
    - Split by number of songs
    - Split by number of playlists
    - Split by criteria (genre, mood, decade, BPM)
- Playlist preview and editing
- Bulk playlist operations

### Phase 3: Analytics

- Monthly listening statistics
- Top songs and artists visualization
- Genre distribution analysis
- Listening time tracking
- Shareable monthly wrap reports

### Phase 4: Discovery

- Integration with an external music recommendation engine
- Personalized music recommendations
- Preference-based filtering (energy, popularity, etc.)

## Installation

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Appwrite account
- Spotify Developer account

### Environment Setup

#### Backend (.env)

```env
# Server
PORT=
NODE_ENV=
CORS_ORIGIN=
BACKEND_URL=

# Appwrite
APPWRITE_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=

# Frontend
FRONTEND_URI=

# Security
JWT_SECRET=
```

#### Frontend (.env)

```env
VITE_API_URL=
```

### Installation Steps

1. Install backend dependencies

```bash
cd server
yarn install
```

2. Install frontend dependencies

```bash
cd ../client
yarn install
```

3. Configure Appwrite
    - Create a new project in Appwrite
    - Enable Spotify OAuth provider
    - Add your Spotify credentials
    - Copy Appwrite redirect URI

4. Configure Spotify Developer App
    - Create app at https://developer.spotify.com/dashboard
    - Add copied Appwrite redirect URI

5. Start the development servers

Backend:

```bash
cd server
yarn dev
```

Frontend (in a new terminal):

```bash
cd client
yarn dev
```

7. Access the application at `http://localhost:3000`

## Tech Stack

### Frontend

- **React** - UI library
- **TypeScript** - Type safety
- **React Router v7** - Client-side routing with data loaders
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind component library
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Appwrite** - Authentication and user management
- **JWT** - Token-based authentication
- **Axios** - HTTP client for Spotify API
- **Zod** - Schema validation
- **dotenvx** - Environment variable management

### External Services

- **Spotify Web API** - Music data and user information
- **Appwrite Cloud** - OAuth management and user database

### Development Tools

- **tsx** - TypeScript execution
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```
offshoot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── apis/          # API service layer
│   │   ├── assets/        # Static assets (images, icons, fonts)
│   │   ├── components/    # Reusable components
│   │   ├── config/        # Application and service configuration and constants
│   │   ├── contexts/      # React context providers for global state
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # Business logic services
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── router.tsx     # Route configuration
│   │   └── main.tsx       # Application entry point
│   └── package.json
│
└── server/                # Backend Express application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Request handlers
    │   ├── errors/        # Error definitions
    │   ├── middleware/    # Express middleware
    │   ├── routes/        # Route definitions
    │   ├── services/      # Business logic
    │   ├── types/         # TypeScript type definitions
    │   ├── utils/         # Utility functions
    │   ├── validators/    # Zod schemas
    │   └── app.ts         # Express app setup
    └── package.json
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
