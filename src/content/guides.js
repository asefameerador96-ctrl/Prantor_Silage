/**
 * Guide content for the pages under /guide.
 *
 * These exist because farmers search for specific questions — how much to feed,
 * how long a bag keeps, whether silage beats green grass — and the single-page
 * site had nothing to rank for any of them.
 *
 * Every entry is a function of `t(bn, en)` so a page reads in whichever language
 * the visitor has chosen, with Bengali as the default.
 *
 * On accuracy: feeding quantities here are the ordinary ranges used in dairy
 * practice and are written as starting points, not prescriptions. Anything
 * specific to a farm — a sick animal, an unusual ration, exact pricing — is
 * pointed at the hotline or a livestock officer rather than answered here.
 */

export const HOTLINE = '01901244248'
export const HOTLINE_TEL = '+8801901244248'

/** Slug order is the order guides appear in listings and in the sitemap. */
export const GUIDES = [
  {
    slug: 'what-is-silage',
    icon: '🌾',
    title: (t) => t('সাইলেজ কী এবং কীভাবে তৈরি হয়', 'What is silage, and how is it made'),
    lede: (t) =>
      t(
        'সাইলেজ মানে শুধু কাটা ঘাস নয়। বাতাস বন্ধ করে গাঁজন করানো একটি সংরক্ষিত সবুজ খাদ্য — যেটা বারো মাস একই পুষ্টি ধরে রাখে।',
        'Silage is not simply chopped grass. It is a preserved green feed, fermented with the air sealed out, that holds the same nutrition all twelve months of the year.'
      ),
    sections: (t) => [
      {
        h: t('সহজ কথায় সাইলেজ', 'Silage in plain terms'),
        p: t(
          'ভুট্টা গাছ যখন সবচেয়ে পুষ্টিকর অবস্থায় থাকে, তখন গোটা গাছ — পাতা, কাণ্ড ও দানাসহ — কেটে কুচি করা হয়। এরপর বাতাস বের করে দিয়ে এয়ারটাইট করে রাখা হয়। ভেতরে থাকা উপকারী ব্যাকটেরিয়া গাছের চিনি খেয়ে ল্যাকটিক অ্যাসিড তৈরি করে। এই অ্যাসিড খাদ্যটিকে টক করে তোলে, আর সেই টক পরিবেশে পচনের জীবাণু বাঁচতে পারে না। ফলে সবুজ খাদ্যটি নষ্ট না হয়ে মাসের পর মাস টিকে থাকে।',
          'Whole maize plants — leaf, stalk and grain together — are cut at their most nutritious stage and chopped. The air is then pressed out and the feed sealed airtight. Helpful bacteria inside consume the plant sugars and produce lactic acid. That acid makes the feed sour, and spoilage organisms cannot survive in sour conditions. The green feed therefore keeps for months instead of rotting.'
        ),
      },
      {
        h: t('খড়ের সাথে পার্থক্য কোথায়', 'How it differs from dry straw'),
        p: t(
          'খড় শুকিয়ে সংরক্ষণ করা হয়, আর শুকানোর সময়েই বেশিরভাগ পুষ্টি ও ভিটামিন হারিয়ে যায়। সাইলেজে পানি ও পুষ্টি দুটোই ভেতরে আটকে থাকে। এজন্যই সাইলেজ খাওয়ানো গরুর রুচি ভালো থাকে এবং হজমেও সহজ হয়।',
          'Straw is preserved by drying, and most of its nutrition and vitamins are lost in the drying itself. Silage keeps both the moisture and the nutrients locked inside. That is why cattle on silage keep their appetite and digest their feed more easily.'
        ),
      },
      {
        h: t('ভালো সাইলেজ চিনবেন কীভাবে', 'How to recognise good silage'),
        list: [
          t('রঙ জলপাই-সবুজ বা হালকা সোনালি-সবুজ', 'Colour is olive-green or a light golden-green'),
          t('গন্ধ মিষ্টি-টক, অনেকটা আচারের মতো', 'Smell is sweet-sour, close to pickle'),
          t('হাতে নিলে ঝরঝরে — চটচটে বা পিচ্ছিল নয়', 'Loose in the hand — not sticky or slimy'),
          t('গাছের গঠন বোঝা যায়, পুরোটা গলে যায়নি', 'Plant structure is still visible, not broken down to mush'),
          t('সাদা বা কালো ছত্রাকের দাগ নেই', 'No white or black mould patches'),
        ],
        p: t(
          'পচা বা ঝাঁঝালো দুর্গন্ধ, পিচ্ছিল ভাব কিংবা ছত্রাক দেখলে সেই সাইলেজ গরুকে খাওয়াবেন না।',
          'If it smells rotten or sharply foul, feels slimy, or shows mould, do not feed it to your cattle.'
        ),
      },
      {
        h: t('প্রান্তর সাইলেজে কী থাকে', 'What goes into Prantor Silage'),
        p: t(
          'আমরা মিল্কিং স্টেজের গোটা ভুট্টা গাছ দানাসহ গ্রাইন্ড করে ফার্মেন্ট করি, তারপর ৫০ কেজির ফুড-গ্রেড ব্যাগে এয়ারটাইট প্যাক করি। দানা বাদ দিলে শক্তির বড় অংশ বাদ পড়ে যায় — সেজন্য দানাসহ প্রক্রিয়াকরণ আমাদের কাছে জরুরি।',
          'We grind and ferment whole maize plants at the milking stage with the grain included, then pack the result airtight in 50 kg food-grade bags. Leaving the grain out removes a large part of the energy, which is why processing it in is something we insist on.'
        ),
      },
    ],
  },

  {
    slug: 'how-much-silage-per-cow',
    icon: '⚖️',
    title: (t) => t('গরুকে দিনে কত সাইলেজ খাওয়াবেন', 'How much silage to feed a cow per day'),
    lede: (t) =>
      t(
        'সবচেয়ে বেশি যে প্রশ্নটি আমরা পাই। সংক্ষেপে: প্রতি ১০০ কেজি ওজনের জন্য প্রায় ৫–৭ কেজি, ধীরে ধীরে শুরু করে।',
        'The question we are asked most. In short: roughly 5–7 kg for every 100 kg of body weight, introduced gradually.'
      ),
    sections: (t) => [
      {
        h: t('দৈনিক পরিমাণের হিসাব', 'Working out the daily amount'),
        p: t(
          'সাধারণ নিয়ম হলো গরুর শরীরের ওজনের প্রতি ১০০ কেজির জন্য দিনে ৫–৭ কেজি সাইলেজ। অর্থাৎ ৩০০ কেজি ওজনের একটি গাভীর জন্য দিনে মোটামুটি ১৫–২১ কেজি, আর ৪০০ কেজির জন্য ২০–২৮ কেজি। দুধেল গাভী বেশি খায়, বকনা বা শুকনো গাভী কম।',
          'The usual rule is 5–7 kg of silage per day for every 100 kg of body weight. A 300 kg cow therefore needs roughly 15–21 kg a day, and a 400 kg cow 20–28 kg. Milking cows eat at the higher end; heifers and dry cows at the lower.'
        ),
      },
      {
        h: t('শুরু করতে হবে ধীরে', 'Start slowly'),
        p: t(
          'হঠাৎ পুরো পরিমাণ দিলে পেটের সমস্যা হতে পারে, কারণ গরুর পাকস্থলীর জীবাণুগুলোর নতুন খাদ্যে অভ্যস্ত হতে সময় লাগে। প্রথম দিন ৩–৫ কেজি দিয়ে শুরু করুন, তারপর ৭–১০ দিনে ধাপে ধাপে বাড়িয়ে পূর্ণ পরিমাণে নিয়ে যান।',
          'Giving the full amount at once can upset the stomach, because the microbes in the rumen need time to adjust to a new feed. Start with 3–5 kg on the first day and step it up over 7–10 days until you reach the full amount.'
        ),
      },
      {
        h: t('সাইলেজই একমাত্র খাদ্য নয়', 'Silage is not the whole ration'),
        p: t(
          'সাইলেজ আঁশ ও শক্তির চমৎকার উৎস, কিন্তু এটি সম্পূর্ণ খাদ্য নয়। এর সাথে অবশ্যই দিতে হবে:',
          'Silage is an excellent source of fibre and energy, but it is not a complete feed. Alongside it your cattle still need:'
        ),
        list: [
          t('পরিমাণমতো দানাদার খাদ্য — দুধ উৎপাদন অনুযায়ী', 'Concentrate feed in proportion to milk yield'),
          t('কিছু শুকনো আঁশ, যেমন খড় — জাবর কাটা ঠিক রাখতে', 'Some dry fibre such as straw, to keep rumination normal'),
          t('খনিজ ও লবণ', 'Minerals and salt'),
          t('সবসময় পরিষ্কার পানি — সাইলেজে পানি থাকলেও আলাদা পানি লাগবেই', 'Clean water at all times — silage contains moisture but does not replace drinking water'),
        ],
      },
      {
        h: t('বাছুর ও অল্পবয়সী গরু', 'Calves and young stock'),
        p: t(
          'খুব ছোট বাছুরের পাকস্থলী তখনও পুরোপুরি তৈরি হয়নি, তাই তাদের সাইলেজ দেবেন না। সাধারণত ৩–৪ মাস বয়সের পর অল্প পরিমাণে শুরু করা যায় এবং বয়স বাড়ার সাথে সাথে ধীরে ধীরে বাড়ানো যায়।',
          'Very young calves do not yet have a developed rumen, so silage is not for them. Small amounts can usually begin after three to four months of age and increase gradually as the animal grows.'
        ),
      },
      {
        h: t('একটি জরুরি কথা', 'One important note'),
        p: t(
          'উপরের পরিমাণগুলো শুরু করার জন্য সাধারণ নির্দেশনা। আপনার গরুর জাত, বয়স, দুধের পরিমাণ, গর্ভাবস্থা ও শারীরিক অবস্থা অনুযায়ী প্রয়োজন আলাদা হতে পারে। খামারের নির্দিষ্ট রেশন ঠিক করতে স্থানীয় প্রাণিসম্পদ কর্মকর্তা বা পশু চিকিৎসকের পরামর্শ নিন।',
          'The amounts above are general starting points. Your animals’ breed, age, milk yield, pregnancy and condition all change what they need. For a ration matched to your own farm, ask your local livestock officer or a veterinarian.'
        ),
      },
    ],
  },

  {
    slug: 'silage-vs-green-grass',
    icon: '🌱',
    title: (t) => t('সাইলেজ না কাঁচা ঘাস — কোনটা ভালো', 'Silage or green grass — which is better'),
    lede: (t) =>
      t(
        'কাঁচা ঘাস ভালো, যখন পাওয়া যায়। সমস্যা হলো বছরের বড় একটা সময় সেটা পাওয়া যায় না।',
        'Green grass is good when you can get it. The problem is that for much of the year you cannot.'
      ),
    sections: (t) => [
      {
        h: t('আসল পার্থক্যটা মৌসুমে', 'The real difference is seasonal'),
        p: t(
          'বর্ষায় ঘাস প্রচুর, শীতে ও খরায় প্রায় নেই। বন্যায় মাঠ ডুবে গেলে কিছুই থাকে না। ঠিক এই সময়গুলোতেই দুধ কমে যায় এবং খাদ্যের খরচ বেড়ে যায়। সাইলেজ বানানোই হয় এই ফাঁকটা পূরণ করার জন্য — যখন ঘাস ছিল, তখনকার পুষ্টি সংরক্ষণ করে রাখা হয় যখন ঘাস নেই তখনের জন্য।',
          'Grass is plentiful in the monsoon and nearly absent in winter and drought. When fields flood, there is nothing at all. Those are precisely the periods when milk drops and feed costs climb. Silage exists to fill that gap: nutrition captured when grass was abundant, stored for when it is not.'
        ),
      },
      {
        h: t('পাশাপাশি তুলনা', 'Side by side'),
        table: [
          [t('বিষয়', 'Point'), t('কাঁচা ঘাস', 'Green grass'), t('সাইলেজ', 'Silage')],
          [t('সারাবছর পাওয়া', 'Year-round supply'), t('মৌসুমভিত্তিক', 'Seasonal'), t('বারো মাস', 'All twelve months')],
          [t('পুষ্টির ধারাবাহিকতা', 'Consistency'), t('মৌসুম ও মাঠভেদে বদলায়', 'Varies by season and field'), t('ব্যাচে ব্যাচে প্রায় একই', 'Near-identical batch to batch')],
          [t('দৈনিক পরিশ্রম', 'Daily labour'), t('প্রতিদিন কাটা ও বহন', 'Cutting and carrying every day'), t('ব্যাগ খুলে দিলেই হলো', 'Open the bag and feed')],
          [t('সংরক্ষণ', 'Storage'), t('দ্রুত শুকিয়ে বা পচে যায়', 'Wilts or spoils quickly'), t('সিল করা অবস্থায় মাসের পর মাস', 'Months while sealed')],
        ],
      },
      {
        h: t('দুটোই একসাথে চলতে পারে', 'They work together'),
        p: t(
          'সাইলেজ কাঁচা ঘাসের শত্রু নয়। যেসব মাসে ঘাস আছে, ঘাসই খাওয়ান — খরচ কম। আর ঘাসের টান পড়লে সাইলেজ দিয়ে ঘাটতি পূরণ করুন। অনেক খামারি সারাবছরই দুটো মিশিয়ে দেন, তাতে খাদ্যের মান হঠাৎ বদলায় না এবং দুধ স্থিতিশীল থাকে।',
          'Silage is not a rival to green grass. In the months when grass is available, feed grass — it costs less. When grass runs short, close the gap with silage. Many farmers mix the two all year, which keeps feed quality from swinging suddenly and holds milk yield steady.'
        ),
      },
      {
        h: t('খরচের হিসাবটা যেভাবে দেখবেন', 'How to think about the cost'),
        p: t(
          'সাইলেজের দাম শুধু ব্যাগের দাম নয়। হিসাবের মধ্যে ধরুন — প্রতিদিন ঘাস কাটার শ্রম, ঘাসের জমির খরচ, আর সবচেয়ে বড় যেটা: টান পড়ার মাসগুলোতে দুধ কমে গিয়ে যে আয় হারায়। অনেক খামারির ক্ষেত্রে দুধ স্থিতিশীল রাখাই সাইলেজের খরচ তুলে আনে।',
          'The cost of silage is not just the price of the bag. Count the daily labour of cutting grass, the cost of land kept for fodder, and the largest item of all: the income lost when milk falls away in the lean months. For many farms, simply holding milk yield steady is what pays for the silage.'
        ),
      },
    ],
  },

  {
    slug: 'storage-and-shelf-life',
    icon: '📦',
    title: (t) => t('সাইলেজ কতদিন থাকে ও কীভাবে রাখবেন', 'How long silage keeps, and how to store it'),
    lede: (t) =>
      t(
        'সিল করা ব্যাগ অনেক মাস ভালো থাকে। ব্যাগ খোলার পর হিসাবটা দিনের — বাতাস ঢুকলেই ঘড়ি চালু হয়ে যায়।',
        'A sealed bag keeps for many months. Once opened the clock is measured in days, because the moment air gets in, spoilage begins.'
      ),
    sections: (t) => [
      {
        h: t('না খোলা ব্যাগ', 'Unopened bags'),
        p: t(
          'এয়ারটাইট ফুড-গ্রেড ব্যাগে সাইলেজ দীর্ঘদিন ভালো থাকে, কারণ ভেতরে বাতাস নেই এবং টক পরিবেশে জীবাণু জন্মাতে পারে না। ব্যাগ ঠান্ডা ও ছায়াযুক্ত জায়গায় রাখুন, সরাসরি রোদে নয়। ব্যাগে ফুটো বা ছিদ্র হলে সেটাই আগে খাওয়ানোর জন্য আলাদা করে রাখুন।',
          'In an airtight food-grade bag silage keeps for a long time, because there is no air inside and spoilage organisms cannot grow in sour conditions. Store bags somewhere cool and shaded, out of direct sun. If a bag is punctured or torn, set it aside to be used first.'
        ),
      },
      {
        h: t('ব্যাগ খোলার পর', 'After opening'),
        p: t(
          'ব্যাগ খোলার পর সাধারণত ৩–৫ দিনের মধ্যে শেষ করাই ভালো, বিশেষ করে গরমের দিনে। প্রতিবার খাওয়ানোর পর ব্যাগের ভেতরের বাতাস চেপে বের করে মুখ ভালোভাবে বেঁধে দিন। প্রয়োজনের বেশি একসাথে বের করবেন না — বাইরে ফেলে রাখা সাইলেজ দ্রুত গরম হয়ে নষ্ট হয়।',
          'Once opened, finish a bag within about three to five days, especially in hot weather. After each feeding, press the air out and tie the mouth of the bag tightly. Do not take out more than you need — silage left standing in the open heats up and spoils quickly.'
        ),
      },
      {
        h: t('নষ্ট হয়েছে কি না বুঝবেন যেভাবে', 'Telling whether it has spoiled'),
        list: [
          t('সাদা, সবুজ বা কালো ছত্রাকের দাগ', 'White, green or black mould'),
          t('পচা বা ঝাঁঝালো দুর্গন্ধ — মিষ্টি-টক গন্ধ নয়', 'A rotten or sharply foul smell rather than sweet-sour'),
          t('পিচ্ছিল, চটচটে বা কাদার মতো গঠন', 'A slimy, sticky or muddy texture'),
          t('অস্বাভাবিক গরম — ভেতরে অবাঞ্ছিত গাঁজন হচ্ছে', 'Unusual warmth, which means unwanted fermentation inside'),
        ],
        p: t(
          'এর কোনোটি দেখলে ওই অংশ ফেলে দিন। সন্দেহ হলে খাওয়াবেন না — নষ্ট সাইলেজ থেকে গরুর অসুস্থতা হতে পারে, আর সেই ক্ষতি ব্যাগের দামের চেয়ে অনেক বেশি।',
          'If you see any of these, discard that portion. When in doubt, do not feed it — spoiled silage can make cattle ill, and that costs far more than the bag.'
        ),
      },
      {
        h: t('কেনার পরিমাণ ঠিক করা', 'Buying the right quantity'),
        p: t(
          'কত গরু, দিনে কত খাওয়াবেন, আর কতদিনের মধ্যে শেষ করতে পারবেন — এই তিনটি হিসাব করে অর্ডার দিন। গুদামে অনেক ব্যাগ পড়ে থাকার চেয়ে নিয়মিত অল্প অল্প নেওয়া ভালো, বিশেষ করে যদি সংরক্ষণের জায়গা গরম হয়।',
          'Order on the basis of three things: how many cattle you have, how much you feed daily, and how quickly you can use it. Taking regular smaller deliveries beats stockpiling, particularly if your storage area gets hot.'
        ),
      },
    ],
  },

  {
    slug: 'price-and-ordering',
    icon: '📞',
    title: (t) => t('দাম ও অর্ডার করার নিয়ম', 'Price and how to order'),
    lede: (t) =>
      t(
        'সরাসরি ফোনে অর্ডার। সারাদেশে কুরিয়ারে ডেলিভারি, আর পাইকারি নিলে আলাদা দর।',
        'Orders are taken by phone. Courier delivery is available nationwide, and wholesale quantities are priced separately.'
      ),
    sections: (t) => [
      {
        h: t('দাম জানবেন কীভাবে', 'Getting a price'),
        p: t(
          `বর্তমান দর ও ডেলিভারি খরচ জানতে ${HOTLINE} নম্বরে কল করুন। কাঁচামালের দাম ও আপনার এলাকার কুরিয়ার খরচ অনুযায়ী দর কিছুটা বদলায়, তাই ওয়েবসাইটে স্থির দাম না লিখে ফোনেই সঠিক হিসাব দেওয়া হয়। কত ব্যাগ লাগবে সেটা বলুন — পাইকারি পরিমাণে আলাদা দর আছে।`,
          `Call ${HOTLINE} for the current rate and delivery cost. Prices move with raw material costs and with courier charges to your area, so rather than publish a fixed figure that goes stale, we quote accurately over the phone. Tell us how many bags you need — wholesale quantities are priced separately.`
        ),
      },
      {
        h: t('অর্ডারের ধাপ', 'The ordering steps'),
        list: [
          t(`${HOTLINE} নম্বরে কল করুন অথবা ফেসবুক পেজে মেসেজ দিন`, `Call ${HOTLINE} or message the Facebook page`),
          t('কত ব্যাগ এবং কোন এলাকায় ডেলিভারি লাগবে জানান', 'Tell us how many bags and the delivery area'),
          t('দর ও কুরিয়ার খরচ নিশ্চিত করে নিন', 'Confirm the rate and the courier charge'),
          t('একই দিনে অর্ডার প্রসেস করা হয়', 'The order is processed the same day'),
        ],
      },
      {
        h: t('ডেলিভারি', 'Delivery'),
        p: t(
          'সারাদেশে কুরিয়ারে পাঠানো হয়। পৌঁছাতে কতদিন লাগবে তা আপনার এলাকা ও কুরিয়ার সেবার উপর নির্ভর করে — অর্ডারের সময় জানিয়ে দেওয়া হবে। ব্যাগ বুঝে নেওয়ার সময় ছেঁড়া বা ফুটো আছে কি না দেখে নিন, কারণ বাতাস ঢুকলে সাইলেজের মান নষ্ট হয়।',
          'We ship by courier nationwide. Delivery time depends on your area and the courier service, and is confirmed when you order. Check the bags for tears or punctures when you receive them, since air getting in is what damages the silage.'
        ),
      },
      {
        h: t('পণ্যের তথ্য', 'Product details'),
        table: [
          [t('বিষয়', 'Item'), t('তথ্য', 'Detail')],
          [t('প্যাক', 'Pack'), t('৫০ কেজি ফুড-গ্রেড এয়ারটাইট ব্যাগ', '50 kg food-grade airtight bag')],
          [t('শুষ্ক পদার্থ', 'Dry matter'), '30–35%'],
          [t('আমিষ', 'Crude protein'), '8–12%'],
          [t('আঁশ', 'Crude fibre'), '35–50%'],
          [t('টিডিএন', 'TDN'), '65–75%'],
          [t('প্রাপ্যতা', 'Availability'), t('সারাবছর', 'Year-round')],
        ],
      },
    ],
  },
]

export const getGuide = (slug) => GUIDES.find((g) => g.slug === slug)
