# Movie Explorer - Movie & TV Show Discovery App

Movie Explorer is a modern, responsive web application built with React and Redux that allows users to explore trending movies and TV shows, search for specific titles, and view detailed information including trailers. It integrates with The Movie Database (TMDB) API to provide up-to-date entertainment data.

![Movie Explorer Preview](thumnail.png)

## Features

- **Trending Content**: Browse trending movies and TV shows on the home page.
- **Detailed Information**: View detailed descriptions, ratings, popularity, and release dates for every title.
- **Video Playback**: Watch movie and TV show trailers directly within the app.
- **Search**: Easily find your favorite movies and TV shows using the integrated search functionality.
- **Mobile Responsive**: Optimized for various screen sizes, from mobile devices to desktops.
- **Dynamic Theming**: Beautiful UI with smooth transitions and gradients.

## Tech Stack

- **Frontend**: React.js
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Data Fetching**: Axios
- **API**: The Movie Database (TMDB)

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A TMDB API Read Access Token. You can get one by creating an account at [themoviedb.org](https://www.themoviedb.org/).

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
    Create a `.env` file in the root directory and add your TMDB Access Token:
    ```env
    REACT_APP_ACCESS_TOKEN=your_tmdb_access_token_here
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
