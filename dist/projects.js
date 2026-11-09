// Verified from the public source repositories on 2026-11-09.
// Status describes the scope of each personal project, not production readiness.
window.PORTFOLIO_PROJECTS = [
  {
    title: "FinFlow Banking Platform",
    category: "Banking & Fintech",
    status: "Prototype",
    featured: true,
    description: "A Java 21 and Spring Boot banking learning project with separate identity, account, and transaction services, a React dashboard, and PostgreSQL data stores.",
    features: [
      "JWT registration and sign-in with account ownership checks.",
      "Checking and savings accounts, deposits, and transfers through service APIs.",
      "Transaction ledger and authenticated history in the dashboard."
    ],
    tags: ["Java 21", "Spring Boot", "Microservices", "React", "PostgreSQL", "JWT"],
    repo: "https://github.com/Saitej999/finflow-banking-platform"
  },
  {
    title: "Ecom — Full Stack Commerce",
    category: "Java & Spring Boot",
    status: "Prototype",
    description: "A Spring Boot and React commerce study connecting a product catalog, shopping cart, and checkout UI to REST APIs.",
    features: [
      "Product listing, category, and keyword search endpoints.",
      "JWT sign-in with admin and seller management routes.",
      "Cart updates and order submission through the application."
    ],
    tags: ["Java 21", "Spring Boot", "React", "PostgreSQL", "JWT", "Stripe"],
    repo: "https://github.com/Saitej999/Ecom"
  },
  {
    title: "Wayfinder Travel Planner",
    category: "Full Stack",
    status: "Prototype",
    description: "A local travel-planning app with a React interface and FastAPI backend that distinguishes sourced places from simulated offers and traveler estimates.",
    features: [
      "City search and day-by-day itinerary planning.",
      "MapLibre markers for source-backed places and hotel locations.",
      "Python budget recalculation from traveler-entered estimates."
    ],
    tags: ["React", "TypeScript", "FastAPI", "Python", "MapLibre", "Google ADK"],
    repo: "https://github.com/Saitej999/multi-agent-travel-planner",
    image: "assets/wayfinder-results.png",
    imageAlt: "Wayfinder sample trip results with budget charts and simulated flight and hotel offers"
  }
];
