// src/config/foodMockData.ts — mock data for the Food module

export const FOOD_IMAGES = {
  heroBanner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
};

export const FOOD_CATEGORIES = [
  { key: "burgers", label: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
  { key: "pizza", label: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" },
  { key: "local", label: "Local", image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=200" },
  { key: "chinese", label: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200" },
  { key: "drinks", label: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200" },
  { key: "desserts", label: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200" },
];

export const NEARBY_RESTAURANTS = [
  {
    key: "r1",
    name: "The Grill House",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
    cuisine: "Burgers • Grill",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: "₦500",
  },
  {
    key: "r2",
    name: "Mama's Kitchen",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
    cuisine: "Nigerian • Local",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "₦400",
  },
  {
    key: "r3",
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400",
    cuisine: "Chinese • Asian",
    rating: 4.4,
    deliveryTime: "30-40 min",
    deliveryFee: "₦600",
  },
  {
    key: "r4",
    name: "Slice & Co",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    cuisine: "Pizza • Italian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "₦500",
  },
];

export const FOOD_TOP_DEALS = [
  {
    key: "d1",
    title: "30% off your first order",
    subtitle: "Use code WELCOME30",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    key: "d2",
    title: "Free delivery this weekend",
    subtitle: "On orders above ₦5,000",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500",
  },
  {
    key: "d3",
    title: "Buy 1 Get 1 on Pizza",
    subtitle: "Slice & Co only, ends soon",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
  },
];

export const RECENT_ORDERS = [
  {
    key: "o1",
    restaurantName: "The Grill House",
    itemsSummary: "Signature Burger, Loaded Fries",
    date: "Yesterday",
    total: "₦7,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200",
  },
  {
    key: "o2",
    restaurantName: "Mama's Kitchen",
    itemsSummary: "Jollof Special, Chapman",
    date: "3 days ago",
    total: "₦5,300",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=200",
  },
];

export const DELIVERY_ADDRESS = {
  label: "Home",
  address: "12 Adeola Odeku Street, Victoria Island, Lagos",
};
