export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Enable standard appearance property to fix vendor prefix linting issues
      add: true,
      remove: false // Don't remove any prefixes
    },
  },
};
