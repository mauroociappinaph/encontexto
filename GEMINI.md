# Project Overview

This is a React.js frontend application built with TypeScript and Vite, designed to function as a news portal. It allows users to browse news articles, filter them by category, and search for specific content. The application consumes news data from a dedicated service.

## Key Technologies

*   **Frontend Framework:** React.js
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **API Key Management:** Utilizes `GEMINI_API_KEY` from environment variables for data fetching.

## Building and Running

To set up and run the application locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure API Key:**
    Create a `.env.local` file in the project root and set your `GEMINI_API_KEY`:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

3.  **Run the Application:**
    ```bash
    npm run dev
    ```
    This will start the development server, and you can access the application in your browser.

## Development Conventions

*   **Component Structure:** The application uses React functional components and leverages React Hooks (`useState`, `useEffect`, `useMemo`) for state management and side effects.
*   **Separation of Concerns:** Logic is separated into distinct areas: components for UI, services for data fetching (`newsService.ts`), and types for data structures (`types.ts`).
*   **Styling:** Tailwind CSS is used for styling, with utility classes applied directly in JSX.
*   **Error Handling and Loading States:** The application includes basic error handling and loading indicators for a better user experience during data fetching.
