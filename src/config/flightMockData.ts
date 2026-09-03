// src/config/flightMockData.ts — mock content for the Flights flow
// Image URLs are stable Wikimedia Commons files (Special:FilePath redirects to the CDN asset).

const wiki = (file: string, width = 600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`;

export const FLIGHT_IMAGES = {
  planeHero: wiki("Nose_of_a_Boeing_737-200_Plane.jpg", 700),
  planeWindowSunset: wiki("Airplane_window_sunset_(Unsplash).jpg", 700),
  dubai: wiki("Burj_Khalifa_Night_View_02.jpg", 500),
  london: wiki("Big_Ben_and_Westminster_Bridge_at_night.jpg", 500),
  istanbul: wiki("Istanbul_skyline_at_night.jpg", 500),
  newYork: wiki("New_York_City_Skyline_at_night.jpg", 500),
};

export type AirlineCode = "EK" | "QR" | "ET" | "TK" | "FZ";

export const AIRLINES: Record<AirlineCode, { name: string; color: string }> = {
  EK: { name: "Emirates", color: "#C8102E" },
  QR: { name: "Qatar Airways", color: "#5C0632" },
  ET: { name: "Ethiopian Airlines", color: "#0B7A3B" },
  TK: { name: "Turkish Airlines", color: "#C70A0E" },
  FZ: { name: "flydubai", color: "#0033A0" },
};

export interface Destination {
  key: string;
  city: string;
  image: string;
  fromPrice: string;
}

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    key: "london",
    city: "London",
    image: FLIGHT_IMAGES.london,
    fromPrice: "NGN 420,000",
  },
  {
    key: "istanbul",
    city: "Istanbul",
    image: FLIGHT_IMAGES.istanbul,
    fromPrice: "NGN 380,000",
  },
  {
    key: "newyork",
    city: "New York",
    image: FLIGHT_IMAGES.newYork,
    fromPrice: "NGN 560,000",
  },
];

export interface TopDeal {
  key: string;
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
}

export const TOP_DEALS: TopDeal[] = [
  {
    key: "deal-dxb",
    badge: "FLIGHT DEAL",
    image: FLIGHT_IMAGES.dubai,
    title: "Lagos → Dubai",
    subtitle: "20 Aug – 27 Aug, 2026",
    price: "NGN 420,000",
    originalPrice: "NGN 560,000",
  },
  {
    key: "deal-hotel",
    badge: "HOTEL DEAL",
    image: FLIGHT_IMAGES.istanbul,
    title: "Radisson Blu Hotel",
    subtitle: "Istanbul, Turkey",
    price: "from NGN 180,000",
    originalPrice: "NGN 240,000",
  },
];

export interface RecentSearch {
  key: string;
  icon: "flight" | "hotel" | "car";
  title: string;
  subtitle: string;
}

export const RECENT_SEARCHES: RecentSearch[] = [
  {
    key: "r1",
    icon: "flight",
    title: "Lagos (LOS) → Dubai (DXB)",
    subtitle: "20 Aug – 27 Aug, 2026 • 1 Passenger",
  },
  {
    key: "r2",
    icon: "hotel",
    title: "Istanbul, Turkey",
    subtitle: "10 Sep – 14 Sep, 2026 • 2 Guests",
  },
  {
    key: "r3",
    icon: "car",
    title: "Lagos, Nigeria",
    subtitle: "12 Sep – 15 Sep, 2026",
  },
];

export interface FlightResult {
  key: string;
  airline: AirlineCode;
  flightNumber: string;
  returnFlightNumber: string;
  aircraft: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  arriveNextDay?: boolean;
  duration: string;
  stops: "Direct" | "1 Stop";
  price: string;
  flightFare: string;
  taxesAndFees: string;
  badge?: string;
}

export const SEARCH_RESULTS: FlightResult[] = [
  {
    key: "f1",
    airline: "EK",
    flightNumber: "EK783",
    returnFlightNumber: "EK784",
    aircraft: "Boeing 777-300ER",
    from: "LOS",
    to: "DXB",
    departTime: "14:30",
    arriveTime: "00:25",
    arriveNextDay: true,
    duration: "7h 55m",
    stops: "Direct",
    price: "NGN 420,000",
    flightFare: "NGN 390,000",
    taxesAndFees: "NGN 30,000",
    badge: "Best overall",
  },
  {
    key: "f2",
    airline: "QR",
    flightNumber: "QR1275",
    returnFlightNumber: "QR1276",
    aircraft: "Boeing 787-9",
    from: "LOS",
    to: "DXB",
    departTime: "18:10",
    arriveTime: "04:45",
    arriveNextDay: true,
    duration: "9h 35m",
    stops: "1 Stop",
    price: "NGN 385,000",
    flightFare: "NGN 355,000",
    taxesAndFees: "NGN 30,000",
  },
  {
    key: "f3",
    airline: "ET",
    flightNumber: "ET902",
    returnFlightNumber: "ET903",
    aircraft: "Boeing 787-9",
    from: "LOS",
    to: "DXB",
    departTime: "08:05",
    arriveTime: "20:25",
    duration: "11h 20m",
    stops: "1 Stop",
    price: "NGN 336,000",
    flightFare: "NGN 306,000",
    taxesAndFees: "NGN 30,000",
  },
  {
    key: "f4",
    airline: "TK",
    flightNumber: "TK625",
    returnFlightNumber: "TK626",
    aircraft: "Airbus A330-300",
    from: "LOS",
    to: "DXB",
    departTime: "21:50",
    arriveTime: "08:15",
    arriveNextDay: true,
    duration: "10h 25m",
    stops: "1 Stop",
    price: "NGN 329,000",
    flightFare: "NGN 299,000",
    taxesAndFees: "NGN 30,000",
  },
  {
    key: "f5",
    airline: "FZ",
    flightNumber: "FZ619",
    returnFlightNumber: "FZ620",
    aircraft: "Boeing 737 MAX 8",
    from: "LOS",
    to: "DXB",
    departTime: "10:40",
    arriveTime: "18:20",
    duration: "7h 40m",
    stops: "Direct",
    price: "NGN 315,000",
    flightFare: "NGN 285,000",
    taxesAndFees: "NGN 30,000",
  },
];

export const SELECTED_FLIGHT = {
  airline: "EK" as AirlineCode,
  flightNumber: "EK783",
  aircraft: "Boeing 777-300ER",
  cabin: "Economy",
  checkedBaggage: "23kg checked",
  cabinBaggage: "7kg cabin",
  outbound: {
    date: "20 Aug 2026",
    from: "LOS",
    to: "DXB",
    departTime: "14:30",
    arriveTime: "00:25",
    arriveNextDay: true,
    duration: "7h 55m",
    stops: "Direct" as const,
  },
  return: {
    flightNumber: "EK784",
    date: "27 Aug 2026",
    from: "DXB",
    to: "LOS",
    departTime: "09:45",
    arriveTime: "16:05",
    duration: "8h 20m",
    stops: "Direct" as const,
  },
  benefits: [
    "Free seat selection",
    "Checked baggage included",
    "Complimentary meal",
    "Wi-Fi available",
  ],
  fareBreakdown: {
    flightFare: "NGN 390,000",
    taxesAndFees: "NGN 30,000",
    total: "NGN 420,000",
  },
};

export type FlightDetails = Omit<
  typeof SELECTED_FLIGHT,
  "airline" | "flightNumber" | "outbound" | "return"
> & {
  airline: AirlineCode;
  flightNumber: string;
  badge?: string;
  outbound: Omit<typeof SELECTED_FLIGHT.outbound, "arriveNextDay" | "stops"> &
    Pick<FlightResult, "arriveNextDay" | "stops">;
  return: Omit<typeof SELECTED_FLIGHT.return, "flightNumber"> & {
    flightNumber: string;
  };
};

export function getFlightDetails(key?: string): FlightDetails & {
  airlineDetails: (typeof AIRLINES)[AirlineCode];
} {
  const result =
    SEARCH_RESULTS.find((flight) => flight.key === key) ?? SEARCH_RESULTS[0];

  return {
    ...SELECTED_FLIGHT,
    airline: result.airline,
    flightNumber: result.flightNumber,
    badge: result.badge,
    aircraft: result.aircraft,
    airlineDetails: AIRLINES[result.airline],
    outbound: {
      ...SELECTED_FLIGHT.outbound,
      from: result.from,
      to: result.to,
      departTime: result.departTime,
      arriveTime: result.arriveTime,
      arriveNextDay: result.arriveNextDay,
      duration: result.duration,
      stops: result.stops,
    },
    return: {
      ...SELECTED_FLIGHT.return,
      flightNumber: result.returnFlightNumber,
    },
    fareBreakdown: {
      ...SELECTED_FLIGHT.fareBreakdown,
      flightFare: result.flightFare,
      taxesAndFees: result.taxesAndFees,
      total: result.price,
    },
  };
}

export const TRIP_ROUTE = {
  from: "Lagos (LOS)",
  fromCity: "Lagos, Nigeria",
  to: "Dubai (DXB)",
  toCity: "Dubai, UAE",
  departDate: "20 Aug, 2026",
  returnDate: "27 Aug, 2026",
  passengers: "1 Passenger • Economy",
  image: FLIGHT_IMAGES.dubai,
};
