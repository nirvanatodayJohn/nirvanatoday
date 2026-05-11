export type ProductFamily = {
  name: string;
  items: string[];
};

export const SHOP_CATEGORIES = [
  {
    name: "Gummies",
    href: "/gummies",
    image: "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
    tagline: "Daily mood and calm support in easy-to-love flavors.",
    pill: "Best Seller",
  },
  {
    name: "Tinctures",
    href: "/tinctures",
    image: "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/T2.png",
    tagline: "Fast-acting drops with precise control per serving.",
    pill: "New",
  },
  {
    name: "THCP Vapes",
    href: "/vapes",
    image:
      "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/THCPVape.png",
    tagline: "Portable, smooth, and crafted for instant unwind.",
    pill: "Trending",
  },
  {
    name: "CBD",
    href: "/cbd",
    image: "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/CBDHemp.png",
    tagline: "Clean everyday essentials for total body balance.",
    pill: "Essential",
  },
  {
    name: "Pets",
    href: "/pets",
    image:
      "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/PetsTincture.png",
    tagline: "Calm routines and joint comfort for furry companions.",
  },
  {
    name: "Capsules",
    href: "/capsules",
    image:
      "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Capsules.png",
    tagline: "No-mess precision and consistent strength per capsule.",
  },
];

export const POINTS = [
  "No phony percentages.",
  "No slashed MSRP prices.",
  "No referral tricks.",
  "No spin-the-wheels.",
  "No last minute discounts.",
  "No pop-ups ever.",
];

export const FAQ_ITEMS = [
  {
    question:
      "Is CBD legal to purchase and receive by mail in the United States?",
    answer:
      "Yes, hemp-derived CBD is legal under federal law as long as it contains less than 0.3% Delta-9 THC. This means you can legally purchase CBD products online and have them shipped to any state in the U.S. However, some states have additional regulations, so it’s always a good idea to double-check your local laws. We ship CBD products to all 50 states, and we ensure everything we sell complies with federal guidelines.",
  },
  {
    question: "Are there any side effects to using your products?",
    answer:
      "Our products are made with natural ingredients, and most customers do not experience negative side effects. However, everyone’s body reacts differently to cannabinoids, so we recommend starting with a small dose and increasing gradually. If you experience any discomfort, we suggest discontinuing use and consulting with a healthcare professional.",
  },
  {
    question: "How should I store my products and do they expire?",
    answer:
      "To preserve the quality of our products, store them in a cool, dry place away from direct sunlight. Proper storage helps maintain potency. We list a recommended expiration date on each product, but if stored correctly, most items will stay fresh and effective for a considerable amount of time.",
  },
  {
    question: "Veteran/first responder discounts?",
    answer: "Yes — permanent discounts with quick verification.",
  },
  {
    question: "What payment methods do you accept and is my checkout secure?",
    answer:
      "We accept all major credit and debit cards, along with other secure payment options listed during checkout. Our site is encrypted with SSL security, ensuring that your personal and payment information is kept safe throughout the entire checkout process.",
  },
  {
    question: "How do I know which product is right for me?",
    answer:
      "We understand that choosing the right product can be overwhelming, especially with so many options. We provide detailed descriptions, usage suggestions, and effects for each product on its page.",
  },
  {
    question: "Do you really ship to all 50 U.S. states?",
    answer:
      "Yes, we ship to all 50 states across the U.S. Our goal is to process and ship orders promptly, but delivery times may vary depending on your location. We’ll always keep you informed and provide tracking details once your order is on its way.",
  },
  {
    question: "Are your products lab‑tested and how can I see the results?",
    answer:
      "Yes, all of our products undergo third-party lab testing for quality assurance. We provide Certificates of Analysis (COA) for each product, which you can access on the product page. These certificates show the exact potency and ingredient profile, so you can shop with confidence knowing what’s in every item.",
  },
  /*
  {
    question:
      "What is THCA and how is it different from CBD or Delta‑8/Delta‑9?",
    answer:
      "THCA is a cannabinoid found in raw cannabis and hemp. Unlike CBD, which does not convert into THC, THCA can convert into Delta‑9 THC when heated, providing different effects. It’s important to know the distinction so you can choose the right product for your needs. We make sure to explain the differences clearly on our site so you can make an informed decision.",
  },
  */
  {
    question:
      "How long will it take for my order to arrive and how is it shipped?",
    answer:
      "Once you place your order, we aim to process it within 1‑2 business days. Shipping time varies depending on your location, but we strive to ensure timely delivery. All packages are shipped discreetly, with tracking information provided so you can monitor the status of your order every step of the way.",
  },
  {
    question: "What is your return or refund policy?",
    answer:
      "We offer a straightforward return policy. If you receive a damaged product or it differs from what you ordered, please contact us within the specified return period, and we’ll assist with a replacement or refund. Please note that we do not accept returns on opened products unless they are defective, but we’re committed to resolving any issues promptly.",
  },
  {
    question: "Is what I buy legal in my state?",
    answer:
      "All of our products comply with federal laws, but local regulations may vary. While our products are legal under federal law, we recommend checking your state’s specific cannabis or hemp laws to ensure compliance in your area. We always try to stay updated on regulations and can offer guidance if needed.",
  },
];

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    name: "CBD",
    items: [
      "Gummies",
      "Capsules",
      "Pre Rolls",
      "Tinctures",
      "Topicals",
      "Vapes",
      "Pets",
    ],
  },
  {
    name: "Delta 8",
    items: [
      "Capsules",
      "Gummies",
      "Topicals",
      "Tinctures",
      "Pre Rolls",
      "Vapes",
    ],
  },
  {
    name: "Delta 9",
    items: ["Gummies"],
  },
  /*
  {
    name: "Delta 10",
    items: ["Tinctures", "Vapes"],
  },
  */
  /*
  {
    name: "THCP",
    items: ["Vapes"],
  },
  */
  {
    name: "Blends",
    items: ["Vapes"],
  },
  {
    name: "Kratom",
    items: ["Powders"],
  },
];

export const SHOP_BY_TYPE = [
  "Capsules",
  "Gummies",
  "Powders",
  "Pre-Rolls",
  "Tinctures",
  "Topicals",
  "Vapes",
  "Sleep",
  "Pets",
];

export const PRIMARY_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "No Gimmicks", href: "/no-gimmicks" },
];

export const BANNER_ITEMS = [
  "Veteran Owned & Operated",
  "Free Shipping",
  "30-day guarantee",
  "3rd-Party Lab Tested",
  "US-Grown Hemp",
  "Money-Back Guarantee",
  "No Gimmicks",
];

export type HeroStat = {
  label: string;
  value: string;
  detail?: string;
};

export type HeroCTA = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost";
};

export type HeroContent = {
  title: {
    prefix: string;
    emphasis: string;
    suffix: string;
  };
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  highlights: string[];
  ctas: HeroCTA[];
  stats: HeroStat[];
};

export const HERO_CONTENT: HeroContent = {
  title: {
    prefix: "Wellness for",
    emphasis: "Comfortable",
    suffix: "Living",
  },
  description:
    "Veteran-owned brand offering capsules, gummies, topicals, THCP Vapes, tinctures, pre-rolls, vapes, sleep, kratom and pet care, made in the USA, transparently tested.",
  image: {
    src: "/Products.png",
    alt: "Nirvana Today wellness products",
    width: 800,
    height: 800,
  },
  highlights: [
    "3rd-party lab tested",
    "No fake discounts",
    "Fast, free shipping",
    "Veteran owned and operated",
  ],
  ctas: [
    { label: "Shop Now", href: "/shop", variant: "default" },
    { label: "View Lab Results", href: "/lab-results", variant: "outline" },
  ],
  stats: [
    { label: "Purity grade", value: "99.9%", detail: "Verified batches" },
    {
      label: "Active botanicals",
      value: "100+",
      detail: "Purpose-built blends",
    },
    { label: "Shipping", value: "$0", detail: "On qualifying orders" },
    {
      label: "Customer rating",
      value: "4.9/5",
      detail: "Across verified reviews",
    },
  ],
};
