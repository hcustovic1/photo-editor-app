# Photo Editor App

## Description

This is a photo editor app that allows users to view, edit, and download images.

## Out of Scope

The following are not included in this project:

- UI testing with Storybook
- E2E testing with Playwright
- Improved UI/UX (e.g., responsive design, accessibility)

## Project Structure

- `src`: contains the source code of the app
  - `components`: contains reusable UI components
  - `hooks`: contains custom hooks
  - `pages`: contains pages that make up the app's routing
  - `routes`: contains routing configuration
  - `types`: contains TypeScript type definitions
  - `utils`: contains utility functions
- `tests`: contains type configuration for vitest library

## Technical Details

- Framework: React
- Library: React Router, SWR
- CSS: CSS Modules
- Bundler: Vite
- Language: TypeScript

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local file` in root directory and add `VITE_IMAGES_API_BASE_URL` key-value pair to it
4. Start the development server: `npm run dev`

## Testing

1. Unit and integration tests: `npm run test`

## Future Enhancements

- Improve UI/UX (e.g., responsive design, accessibility)
- Add more features to the image editor (e.g., filters, adjustments)
- Add user authentication and authorization
- Implement image upload functionality

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

