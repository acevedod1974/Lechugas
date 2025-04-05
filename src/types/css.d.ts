declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Add Tailwind specific rules to help TypeScript understand the directives
declare namespace CSS {
  interface AtRule {
    apply: any;
    tailwind: any;
    variants: any;
    responsive: any;
    screen: any;
  }
}