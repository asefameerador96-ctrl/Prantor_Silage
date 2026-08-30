export const SITE = 'https://www.prantorsilage.com'
export const SITE_NAME = 'প্রান্তর সাইলেজ'
export const DEFAULT_IMAGE = `${SITE}/img/hero-sunset.webp`

/** The sister brand — linked from the footer and declared in JSON-LD. */
export const SISTER_SITE = {
  url: 'https://www.aksilage.com',
  nameBn: 'এ কে সাইলেজ',
  nameEn: 'AK Silage',
}

/**
 * Per-route metadata, in Bengali because that is what the audience searches in.
 *
 * scripts/generate-sitemap.mjs and scripts/prerender.mjs both read this file, so a
 * route added here is automatically crawled, prerendered and listed in the sitemap.
 */
export const ROUTE_META = {
  '/': {
    title: 'প্রান্তর সাইলেজ | অবিরাম পুষ্টি, অফুরন্ত যোগান — ভুট্টার সাইলেজ ৫০ কেজি',
    description:
      'প্রান্তর সাইলেজ — মিল্কিং স্টেজের পুরো ভুট্টা গাছের পুষ্টিতে তৈরি সাইলেজ। গরু সহজে খায়, হজম করে, সুস্থ থাকে। পাওয়া যাচ্ছে দেশজুড়ে, কুরিয়ারে ডেলিভারি। অর্ডার: ০১৯০১২৪৪২৪৮',
  },
  '/guide': {
    title: 'খামারির গাইড — সাইলেজ নিয়ে সব প্রশ্নের উত্তর',
    description:
      'গরুকে দিনে কত সাইলেজ খাওয়াবেন, সাইলেজ কতদিন ভালো থাকে, কাঁচা ঘাসের সাথে পার্থক্য কী — খামারিদের সবচেয়ে বেশি করা প্রশ্নগুলোর বিস্তারিত উত্তর।',
  },
  '/guide/what-is-silage': {
    title: 'সাইলেজ কী এবং কীভাবে তৈরি হয়',
    description:
      'সাইলেজ কী, কীভাবে ফার্মেন্টেশনে তৈরি হয়, খড়ের সাথে পার্থক্য কোথায়, আর ভালো সাইলেজ চেনার সহজ উপায় — রঙ, গন্ধ ও গঠন দেখে।',
  },
  '/guide/how-much-silage-per-cow': {
    title: 'গরুকে দিনে কত সাইলেজ খাওয়াবেন',
    description:
      'প্রতি ১০০ কেজি ওজনের জন্য দিনে ৫–৭ কেজি সাইলেজ। ৩০০ কেজি গাভীর জন্য ১৫–২১ কেজি। কীভাবে ধীরে ধীরে শুরু করবেন, সাথে আর কী কী খাওয়াতে হবে, আর বাছুরের ক্ষেত্রে কী নিয়ম।',
  },
  '/guide/silage-vs-green-grass': {
    title: 'সাইলেজ না কাঁচা ঘাস — কোনটা ভালো',
    description:
      'কাঁচা ঘাস আর সাইলেজের পাশাপাশি তুলনা: সারাবছর প্রাপ্যতা, পুষ্টির ধারাবাহিকতা, দৈনিক পরিশ্রম ও সংরক্ষণ। খরচের হিসাবটা আসলে কীভাবে করবেন।',
  },
  '/guide/storage-and-shelf-life': {
    title: 'সাইলেজ কতদিন থাকে ও কীভাবে সংরক্ষণ করবেন',
    description:
      'সিল করা ব্যাগ মাসের পর মাস ভালো থাকে; খোলার পর ৩–৫ দিনে শেষ করুন। নষ্ট সাইলেজ চেনার উপায় — ছত্রাক, দুর্গন্ধ, পিচ্ছিল ভাব ও অস্বাভাবিক গরম।',
  },
  '/guide/price-and-ordering': {
    title: 'সাইলেজের দাম ও অর্ডার করার নিয়ম',
    description:
      'প্রান্তর সাইলেজের বর্তমান দর জানতে ০১৯০১২৪৪২৪৮ নম্বরে কল করুন। ৫০ কেজি ফুড-গ্রেড ব্যাগ, সারাদেশে কুরিয়ার ডেলিভারি, পাইকারি পরিমাণে আলাদা দর।',
  },
}

/**
 * Emitted on every indexable page.
 *
 * Prantor Silage and AK Silage are separate brands with their own premises — this
 * one at Mahigonj, AK at Paglapir — under the same parent company. They are
 * deliberately NOT linked with sameAs: in schema.org that asserts the two URLs are
 * the same entity, which would tell search engines these are one business. The
 * shared parent is declared instead, which is what is actually true.
 */
export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prantor Silage',
  alternateName: 'প্রান্তর সাইলেজ',
  slogan: 'অবিরাম পুষ্টি, অফুরন্ত যোগান',
  url: SITE,
  description:
    'Corn silage made from whole maize plants at milking stage, for cattle farmers in Bangladesh. Produced at Mahigonj, Rangpur.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mahigonj',
    addressRegion: 'Rangpur',
    addressCountry: 'BD',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'A.K. Heritage & Corporation',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+8801901244248',
    contactType: 'sales',
    areaServed: 'BD',
    availableLanguage: ['bn', 'en'],
  },
}
