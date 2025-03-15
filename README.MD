# USD to VES Converter

This is a **React + TypeScript** project that allows users to convert US Dollars (USD) to Venezuelan Bolívares (VES) using real-time exchange rates. The application supports multiple exchange rate types, including **BCV**, **Parallel**, and **Promedio** rates.

## Features

- **Real-Time Exchange Rates**: Fetches the latest exchange rates from the [pydolarve.org](https://pydolarve.org) API.
- **Multiple Rate Types**: Supports BCV, Parallel, and Promedio rates.
- **Auto-Update**: Automatically updates rates every 5 minutes.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.
- **Error Handling**: Provides fallback rates in case of API failure.

## Tech Stack

- **React**: Frontend framework.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library for React.
- **Axios**: For making API requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the app in your browser at http://localhost:5173

Here is a suggested `README.md` file for your project:

````markdown
# USD to VES Converter

This is a **React + TypeScript** project that allows users to convert US Dollars (USD) to Venezuelan Bolívares (VES) using real-time exchange rates. The application supports multiple exchange rate types, including **BCV**, **Parallel**, and **Promedio** rates.

## Features

- **Real-Time Exchange Rates**: Fetches the latest exchange rates from the [pydolarve.org](https://pydolarve.org) API.
- **Multiple Rate Types**: Supports BCV, Parallel, and Promedio rates.
- **Auto-Update**: Automatically updates rates every 5 minutes.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.
- **Error Handling**: Provides fallback rates in case of API failure.

## Tech Stack

- **React**: Frontend framework.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library for React.
- **Axios**: For making API requests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

```
├── .bolt/                # Configuration for the Bolt template
├── .repomix/             # Repomix configuration (if applicable)
├── src/                  # Source code
│   ├── components/       # React components
│   ├── services/         # API and data-fetching logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind CSS imports
├── public/               # Static assets
├── .gitignore            # Git ignore rules
├── package.json          # Project metadata and dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## API Endpoints

The app fetches exchange rates from the following endpoints:

- **BCV Rate**: `https://pydolarve.org/api/v1/dollar?monitor=bcv`
- **Parallel Rate**: `https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla`

## How It Works

1. **Currency Input**: Users enter the amount in USD they want to convert.
2. **Rate Selection**: Users can toggle between BCV, Parallel, and Promedio rates.
3. **Conversion**: The app calculates the equivalent amount in VES based on the selected rate.
4. **Result Display**: The converted amount and the last update timestamp are displayed.

## Customization

- **Tailwind CSS**: Modify the `tailwind.config.js` file to customize the design.
- **API Base URL**: Update the `API_BASE_URL` in `src/services/api.ts` if the API changes.

## Known Issues

- **API Downtime**: If the API is unavailable, fallback rates are used.
- **Rate Precision**: Promedio rates are calculated as the average of BCV and Parallel rates, which may not always reflect real-world values.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [pydolarve.org](https://pydolarve.org) for providing exchange rate data.
- [Tailwind CSS](https://tailwindcss.com) for the design framework.
- [Lucide React](https://lucide.dev) for the icons.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
