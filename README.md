# Movie Explorer - Movie & TV Show Discovery App

Movie Explorer is a modern, responsive web application built with React and Redux that allows users to explore trending movies and TV shows, search for specific titles, and view detailed information including trailers. It features personalized recommendations, secure authentication via Auth0, and a sleek user interface powered by Tailwind CSS.

![Movie Explorer Banner](https://raw.githubusercontent.com/Vipeen-kumar/movieoapp/main/thumnail.png)

## Features

- **Trending Content**: Browse trending movies and TV shows on the home page.
- **Detailed Information**: View detailed descriptions, ratings, popularity, and release dates for every title.
- **Video Playback**: Watch movie and TV show trailers directly within the app.
- **Real-time Search Suggestions**: Dynamic autocomplete recommendations as you type, with optimized debouncing.
- **Personalized Recommendations**: Intelligent content suggestions based on your favorite genres after signing in.
- **Secure Authentication**: Integrated Auth0 for seamless and secure user login/signup.
- **Genre Selection**: Choose your favorite genres to customize your discovery experience.
- **About & Contact Pages**: Dedicated sections to learn more about the project and get in touch.
- **Mobile Responsive**: Optimized for various screen sizes, from mobile devices to desktops.
- **Dynamic Theming**: Beautiful UI with smooth transitions and gradients.

### Dashboard Preview
![Trending Content](https://raw.githubusercontent.com/Vipeen-kumar/movieoapp/main/thumnail.png)

### Mobile Experience
![Mobile View](https://raw.githubusercontent.com/Vipeen-kumar/movieoapp/main/thumnail.png)

## Tech Stack

- **Frontend**: React.js (v18.3.1)
- **State Management**: Redux Toolkit (v2.2.4)
- **Authentication**: Auth0 (@auth0/auth0-react)
- **Routing**: React Router DOM (v6.23.1)
- **Styling**: Tailwind CSS (v3.4.3)
- **Icons**: React Icons
- **Data Fetching**: Axios (v1.6.8)
- **API**: The Movie Database (TMDB)

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A TMDB API Read Access Token. You can get one by creating an account at [themoviedb.org](https://www.themoviedb.org/).
- An Auth0 Application (SPA) for authentication.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd movie-explorer
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your TMDB and Auth0 credentials:
    ```env
    REACT_APP_ACCESS_TOKEN=your_tmdb_access_token_here
    REACT_APP_AUTH0_DOMAIN=your_auth0_domain_here
    REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id_here
    ```

4.  **Run the application**:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

## Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.

## License

This project is open-source. Created by Vipeen Kumar.
