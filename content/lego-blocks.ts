export type LegoBlock = {
  id: string;
  name: string;
  oneLine: string;
  spanCols?: 1 | 2 | 3;
  spanRows?: 1 | 2;
  ports: string[];
  hot?: boolean;
  callout?: string;
};

export const LEGO_BLOCKS: LegoBlock[] = [
  {
    id: "beach",
    name: "Beach concierge",
    oneLine: "Sea quality, wind, water temperature, crowd score per beach in one answer.",
    spanCols: 2,
    spanRows: 1,
    ports: ["IZOR", "DHMZ", "Webcam Vision"],
    hot: true,
  },
  {
    id: "parking",
    name: "Parking signal",
    oneLine: "Promet's decade-old sensor grid surfaces empty spots and powers SF-style dynamic pricing under the hood.",
    spanCols: 1,
    spanRows: 2,
    ports: ["Promet Parking"],
    callout: "SFpark, under the hood",
  },
  {
    id: "bus",
    name: "Bus reality",
    oneLine: "Where the bus actually is vs where the timetable claims it should be. Crowdsourced taps tune the next prediction.",
    spanCols: 1,
    spanRows: 1,
    ports: ["Promet Buses", "Crowdsourcing"],
  },
  {
    id: "civic",
    name: "Civic action",
    oneLine: "Photo of a pothole → classified, geocoded, routed to the right Split department with a ticket number you can watch.",
    spanCols: 2,
    spanRows: 1,
    ports: ["Civic Action Router", "Vision"],
    hot: true,
  },
  {
    id: "ferry",
    name: "Ferry + bus + parking trip",
    oneLine: "Say “I want to be on Brač by 11” and Splitko composes the slot, the bus, the parking, and the realistic ETA.",
    spanCols: 2,
    spanRows: 1,
    ports: ["Promet", "Jadrolinija schedule", "HAK Traffic"],
  },
  {
    id: "bureaucracy",
    name: "Bureaucracy RAG",
    oneLine: "“kako otvoriti obrt” → personalised checklist with the exact office, form, fee and opening hours.",
    spanCols: 1,
    spanRows: 1,
    ports: ["e-Građani", "gov.hr"],
  },
  {
    id: "legal",
    name: "Legal & document RAG",
    oneLine: "City Statute, GUP, building permits, parish records — retrieved and explained, with citations.",
    spanCols: 1,
    spanRows: 1,
    ports: ["City Statute", "GUP", "Permit Index"],
  },
  {
    id: "marketplace",
    name: "Agentic marketplace",
    oneLine: "Your Splitko negotiates with their Splitko. Students who leave for summer match families arriving from Frankfurt.",
    spanCols: 2,
    spanRows: 1,
    ports: ["Marketplace", "Crowdsourcing"],
    hot: true,
  },
  {
    id: "culture",
    name: "Cultural & community calendar",
    oneLine: "Klape concerts, Hajduk fixtures, school holidays, parish festivities. “što ima u Splitu večeras s djecom?”",
    spanCols: 1,
    spanRows: 1,
    ports: ["Cultural Calendar"],
  },
  {
    id: "safety",
    name: "Civil safety",
    oneLine: "CV on Marjan/Mosor cams watching for smoke, DHMZ wind translated into practical instructions for your morning.",
    spanCols: 1,
    spanRows: 1,
    ports: ["Webcam Vision", "DHMZ", "DUZS forward"],
  },
  {
    id: "triage",
    name: "Smart triage & health queues",
    oneLine: "Estimated KBC waits, scheduling support — genetic algorithm under the hood, Rector’s Award 2023.",
    spanCols: 1,
    spanRows: 1,
    ports: ["KBC Public Queue"],
  },
  {
    id: "crowd",
    name: "Crowdsourcing flywheel",
    oneLine: "Every “bus full”, every “it's fine actually”, every reject of a recommendation trains the next answer.",
    spanCols: 1,
    spanRows: 1,
    ports: ["All ports"],
  },
];
