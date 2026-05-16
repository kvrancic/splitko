export type FunnelPanel = {
  id: string;
  city: string;
  headline: string;
  body: string;
  stat: { value: string; label: string };
  citation: string;
  /** Pexels search queries; first hit wins. */
  imageQuery: string[];
  /** Tone affects panel surface. Split panel switches to red. */
  surface: "navy" | "red";
};

export const FUNNEL: FunnelPanel[] = [
  {
    id: "buenos-aires",
    city: "Buenos Aires",
    headline: "26,181,606 conversations in a single quarter.",
    body:
      "Boti has been running on WhatsApp since 2019. Over seventy public procedures handled by one chatbot. Argentina has >80% phone penetration, so most of the city talks to its government on a green bubble.",
    stat: { value: "26.1M", label: "Q1 2022 conversations" },
    citation: "Buenos Aires Government, April 2022",
    imageQuery: [
      "buenos aires plaza de mayo",
      "buenos aires obelisk",
      "buenos aires aerial",
    ],
    surface: "navy",
  },
  {
    id: "san-francisco",
    city: "San Francisco",
    headline: "Demand-priced parking since 2011.",
    body:
      "Every metered spot has a sensor. The city tunes the price block by block until cruising drops and the right number of spots stay open. Fifteen years ago. We have the sensors. We don’t have the layer.",
    stat: { value: "2011", label: "SFpark went live" },
    citation: "SFMTA programme docs",
    imageQuery: [
      "san francisco street parking",
      "san francisco cable car",
      "san francisco aerial",
    ],
    surface: "navy",
  },
  {
    id: "barcelona",
    city: "Barcelona",
    headline: "Tens of millions of euros per program category.",
    body:
      "A decade of instrumented light, water, waste and parking. €42.5M/yr in water savings. ~€36.5M/yr in smart parking. ~$37M/yr in smart lighting. 47,000 net new jobs from the smart-city portfolio.",
    stat: { value: "€42.5M", label: "water savings / year" },
    citation: "SmartCityWorld, Harvard Data-Smart City",
    imageQuery: [
      "barcelona la sagrada familia",
      "barcelona park guell",
      "barcelona aerial",
    ],
    surface: "navy",
  },
  {
    id: "dubrovnik",
    city: "Dubrovnik",
    headline: "Six CV cameras at the Old Town gates. Hard cap: 8,000.",
    body:
      "Updated every 15 minutes. Named 2026 European Green Pioneer of Smart Tourism. A Croatian city of 40,000 people, an hour and a half down the coast from where we built nothing.",
    stat: { value: "8,000", label: "max bodies inside Stradun" },
    citation: "Dubrovnik Tourist Board, ITU",
    imageQuery: [
      "dubrovnik stradun old town",
      "dubrovnik city walls",
      "dubrovnik aerial",
    ],
    surface: "navy",
  },
  {
    id: "split",
    city: "Split",
    headline: "Sensors in the ground. Cameras on the walls. €403M budget.",
    body:
      "The data is collected. The layer on top is empty. Seven million tourist nights cross through this city every year. Nobody has wired the buses to the parking to the sea to the streets to the citizen.",
    stat: { value: "€0", label: "spent on the connected layer" },
    citation: "Splitko, 2026",
    imageQuery: [
      "split croatia riva waterfront sunset",
      "split croatia palm riva",
      "split croatia old town aerial",
    ],
    surface: "red",
  },
];
