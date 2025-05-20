
# VinylVision

VinylVision is a Next.js application for exploring and managing your LP collection, complete with BPM insights and administrative tools.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if applicable):**
    If you have this project cloned from a Git repository:
    ```bash
    git clone <repository-url>
    cd vinylvision 
    ```
    If you are working within an environment like Firebase Studio, the files might already be set up for you.

2.  **Install dependencies:**
    Navigate to the project's root directory and run:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Then, edit `.env.local` to set your desired administrator credentials:
    ```
    NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
    NEXT_PUBLIC_ADMIN_PASSWORD=password
    ```

### Running the Development Server

Once dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
```
or with yarn:
```bash
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json` or terminal output) with your browser to see the application.

The application features:
*   A public view to browse albums.
*   An admin section (login at `/login`) to manage albums.

## Technologies Used

*   **Framework**: [Next.js](https://nextjs.org/) (v15 with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React](https://reactjs.org/)
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [ShadCN UI](https://ui.shadcn.com/) (component library built with Radix UI and Tailwind CSS)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation**: [Zod](https://zod.dev/)
*   **AI/Generative Features (Planned/Integrated)**: [Genkit by Google](https://firebase.google.com/docs/genkit) (dependencies included)
*   **Client-Side Data Persistence**: Browser `localStorage` (for prototype data like albums, artists, genres, theme preference)

## Project Structure Highlights

*   `src/app/`: Contains all the routes, pages, and layouts (using Next.js App Router).
    *   `src/app/admin/`: Admin-specific routes and pages.
    *   `src/app/api/`: API routes (if any).
*   `src/components/`: Reusable React components.
    *   `src/components/ui/`: ShadCN UI components.
*   `src/lib/`: Utility functions, type definitions, and mock data/localStorage logic.
*   `src/hooks/`: Custom React hooks (e.g., `useTheme`, `useIsMobile`).
*   `src/ai/`: Genkit related flows and configurations.
*   `public/`: Static assets.
