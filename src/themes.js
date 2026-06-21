export const T = {
  green: "#2E7D32",
  greenLight: "#4CAF50",
  greenPale: "#E8F5E9",
  yellow: "#F9A825",
  yellowLight: "#FFF8E1",
  red: "#C62828",
  redLight: "#EF5350",
  redPale: "#FFEBEE",
  orange: "#E65100",
  orangeLight: "#FF6D00",
  white: "#FFFFFF",
  offWhite: "#FAFAF8",
  text: "#1A1A1A",
  textMuted: "#555",
  border: "#E0E0E0",
};

export const CAT_COLORS = {
  rice: { bg: "#FFF3E0", color: "#E65100" },
  snacks: { bg: "#FFEBEE", color: "#C62828" },
  drinks: { bg: "#E3F2FD", color: "#0D47A1" },
  protein: { bg: "#F3E5F5", color: "#6A1B9A" },
  soup: { bg: "#E8F5E9", color: "#1B5E20" },
  special: { bg: "#FFFDE7", color: "#F57F17" },
};

export const CAT_LABELS = {
  rice: "Rice Dishes",
  protein: "Protein",
  soup: "Soups & Stews",
  snacks: "Snacks",
  drinks: "Drinks",
  special: "Today's Special",
};

export const CATEGORIES = [
  { id: "rice", label: "Rice Dishes", emoji: "🍚" },
  { id: "protein", label: "Protein", emoji: "🥩" },
  { id: "soup", label: "Soups & Stews", emoji: "🥘" },
  { id: "snacks", label: "Snacks", emoji: "🥙" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "special", label: "Today's Special", emoji: "⭐" },
];

export const PAYMENT_METHODS = {
  mpesa: {
    id: "mpesa",
    icon: "📱",
    label: "M-Pesa",
    details: (
      <>
        <strong>M-Pesa STK Push</strong>
        <br />
        Paybill: <strong>522900</strong>
        <br />
        Account: Your Student ID
        <br />
        Show confirmation SMS at counter
      </>
    )
  },
  card: {
    id: "card",
    icon: "💳",
    label: "Student ID Card",
    details: (
      <>
        <strong>Student ID Card</strong>
        <br />
        Accepted
      </>
    )
  }
};

export const PICKUP_TIMES = [
  "ASAP (Next Available)",
  "Morning Break (10:00 AM)",
  "Lunch Break (12:30 PM)",
  "Afternoon Break (3:00 PM)",
  "After School (4:30 PM)"
];

export const HERO_BADGES = [
  "🕐 Mon–Fri 7am–5pm",
  "✅ Fresh Daily",
  "💚 Affordable Prices",
  "📱 M-Pesa Accepted"
];

export const CONTACT_INFO = [
  {
    icon: "📍",
    bg: "green",
    title: "Location",
    text: "Students' Centre, Phase 2\n"
  },
  {
    icon: "📱",
    bg: "green",
    title: "Phone / WhatsApp",
    text: "+254 712 345 678\n+254 798 765 432"
  },
  {
    icon: "✉️",
    bg: "yellow",
    title: "Email",
    text: "meals@campuseats.co.ke"
  },
];

export const OPENING_HOURS = [
  { day: "Monday – Thursday", hours: "7:00 AM – 5:00 PM" },
  { day: "Friday", hours: "7:00 AM – 4:30 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" }
];