import pilau from '../assets/images/pilau.jpg';
import ugali from '../assets/images/ugali.jpeg';
import chicken from '../assets/images/chicken.jpg';
import fish from '../assets/images/fish.jpg';
import soup from '../assets/images/soup.jpg';
import githeri from '../assets/images/githerii.jpg';
import mandazi from '../assets/images/mandazi.jpeg';
import samosa from '../assets/images/samosa.jpeg';
import tea from '../assets/images/tea.jpg';
import juice from '../assets/images/juice.jpg';
import coffee from '../assets/images/coffee.jpeg';
import chapati from '../assets/images/chapati.jpeg';

export const INIT_DISHES = [
  {
    id: 1,
    name: "Beef Pilau",
    desc: "Aromatic basmati rice with tender beef & spices",
    category: "rice",
    fullPrice: 150,
    halfPrice: 80,
    veg: false,
    img: pilau,
  },
  {
    id: 2,
    name: "Ugali & Sukuma Wiki",
    desc: "Classic maize ugali with sautéed kale and onions",
    category: "rice",
    fullPrice: 80,
    halfPrice: 45,
    veg: true,
    img: ugali,
  },
  {
    id: 3,
    name: "Chicken Stew",
    desc: "Tender chicken in rich tomato & herb gravy",
    category: "protein",
    fullPrice: 180,
    halfPrice: 100,
    veg: false,
    img: chicken,
  },
  {
    id: 4,
    name: "Grilled Tilapia",
    desc: "Fresh whole tilapia, grilled with lemon & spices",
    category: "protein",
    fullPrice: 200,
    halfPrice: 120,
    veg: false,
    img: fish,
  },
  {
    id: 5,
    name: "Bean Soup",
    desc: "Hearty beans with vegetables & coconut milk",
    category: "soup",
    fullPrice: 70,
    halfPrice: 40,
    veg: true,
    img: soup,
  },
  {
    id: 6,
    name: "Githeri",
    desc: "Traditional maize & bean stew, slow-cooked to perfection",
    category: "soup",
    fullPrice: 90,
    halfPrice: 50,
    veg: true,
    img: githeri,
  },
  {
    id: 7,
    name: "Mandazi",
    desc: "Freshly fried East African doughnuts, lightly sweetened",
    category: "snacks",
    fullPrice: 30,
    halfPrice: null,
    veg: true,
    img: mandazi,
  },
  {
    id: 8,
    name: "Samosa (2 pcs)",
    desc: "Crispy pastry filled with spiced minced meat",
    category: "snacks",
    fullPrice: 50,
    halfPrice: null,
    veg: false,
    img: samosa,
  },
  {
    id: 9,
    name: "Chai",
    desc: "Hot spiced Kenyan chai with fresh ginger & milk",
    category: "drinks",
    fullPrice: 30,
    halfPrice: 20,
    veg: true,
    img: tea,
  },
  {
    id: 10,
    name: "Fresh Juice",
    desc: "Seasonal fresh fruit juice — ask for today's flavour",
    category: "drinks",
    fullPrice: 60,
    halfPrice: 40,
    veg: true,
    img: juice,
  },
  {
    id: 11,
    name: "Chef's Special Combo",
    desc: "Full meal: rice, protein & drink of the day",
    category: "special",
    fullPrice: 220,
    halfPrice: 130,
    veg: false,
    img: coffee,
  },
  {
    id: 12,
    name: "Chapati & Beef",
    desc: "Soft handmade chapati with slow-cooked beef stew",
    category: "rice",
    fullPrice: 160,
    halfPrice: 90,
    veg: false,
    img: chapati,
  },
];

export const INIT_ORDERS = [
  {
    ref: "CE-001",
    student: "Alex Kamau",
    id: "STU001",
    total: 230,
    pay: "mpesa",
    pickup: "Lunch Break",
    status: "New",
    time: "10:34 AM",
    items: ["Beef Pilau", "Chai (Tea)"]
  },
  {
    ref: "CE-002",
    student: "Brenda Wanjiku",
    id: "STU002",
    total: 180,
    pay: "card",
    pickup: "Morning Break",
    status: "Ready",
    time: "09:12 AM",
    items: ["Chicken Stew"]
  }
];

export const INIT_ACCOUNTS = [
  { id: "ADM001", pass: "admin123", name: "Admin User", role: "admin" },
  { id: "STU001", pass: "student123", name: "Alex Kamau", role: "student" },
  { id: "STU002", pass: "pass456", name: "Brenda Wanjiku", role: "student" },
];