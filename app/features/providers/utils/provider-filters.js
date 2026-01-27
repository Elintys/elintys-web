export const POPULARITY_THRESHOLD = 50;

export const INITIAL_FILTERS = {
  categories: [],
  city: "",
  radius: "",
  date: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  isVerified: false,
  pricingModel: "",
  languages: [],
};

export const PRICING_MODELS = [
  { value: "HOURLY", label: "Horaire" },
  { value: "FIXED", label: "Forfait fixe" },
  { value: "PACKAGE", label: "Package" },
];

export const MIN_RATING_OPTIONS = [
  { value: "1", label: "1+ etoile" },
  { value: "2", label: "2+ etoiles" },
  { value: "3", label: "3+ etoiles" },
  { value: "4", label: "4+ etoiles" },
  { value: "4.5", label: "4.5+ etoiles" },
];
