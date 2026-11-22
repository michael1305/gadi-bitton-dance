// English view of the landing pages (?lang=en or the "English" button).
// Content stays edited in Hebrew in the back office; here each Hebrew text is translated:
// first by exact match, then by known words/phrases (dance terms, hall words, names).
// A text that still has Hebrew after that (e.g. a brand-new sentence) is shown in Hebrew as-is —
// add it to EXACT below to translate it.
window.LANDING_EN = (function () {
  const DAYS = { 'ראשון': 'Sunday', 'שני': 'Monday', 'שלישי': 'Tuesday', 'רביעי': 'Wednesday', 'חמישי': 'Thursday', 'שישי': 'Friday', 'שבת': 'Saturday' };

  const UI = {
    day: d => DAYS[d] || d,
    from: d => `Starting ${d}`,
    team: 'Dance leaders: ',
    schedule: 'Schedule',
    videos: 'Watch the dances we learned',
    waGroup: 'WhatsApp group: ',
    toggle: 'עברית',
    title: { beginners: 'Israeli folk dance for beginners | Gadi Bitton', harkadot: 'Israeli folk dancing with Gadi Bitton | Sun · Tue · Thu' }
  };

  const EXACT = {
    // hero
    'גדי ביטון · מחול ישראלי': 'Gadi Bitton · Israeli Dance',
    'ריקודי עם 🕺💃': 'Israeli Folk Dance 🕺💃',
    'מהצעד הראשון': 'From the Very First Step',
    'חוג חדש למתחילים': 'New class for beginners',
    'שמחים על התעניינותך! בחרו את הקבוצה שהכי נוחה לכם — וניפגש במעגל.': "We're glad you're interested! Pick the group that suits you best — see you in the circle.",
    'בחרו את ההרקדה שלכם — ומחכים לכם במעגל!': 'Pick your dance night — we’re waiting for you in the circle!',
    // texts
    'פרטי הקבוצה': 'Class details',
    'פרטי ההרקדה': 'Dance night details',
    'כל יום {day} בשעה {time}': 'Every {day} at {time}',
    'כל יום {day}, החל מ-{time}': 'Every {day}, from {time}',
    'החוג כבר פעיל — מצטרפים בכל שבוע': 'The class is already running — join any week',
    'כל שבוע': 'Every week',
    'עלות': 'Price',
    'כניסה': 'Entry',
    'תשלום במקום באשראי או מזומן': 'Pay on site — card or cash',
    'הצטרפות לקהילת החוג בווטסאפ': 'Join the class WhatsApp group',
    'הצטרפות לקהילת ההרקדה בווטסאפ': 'Join the dance WhatsApp group',
    'לוח זמנים': 'Schedule',
    'חוג ריקודי עם למתחילים — יום {day}': 'Israeli folk dance for beginners — {day}',
    'הרקדה עם גדי ביטון — יום {day}': 'Israeli folk dancing with Gadi Bitton — {day}',
    'צפייה בריקודים שנלמדו': 'Watch the dances we learned',
    // about
    'קצת על החוג': 'About the class',
    'חוג המתחילים מהצעד הראשון מיועד למי שרוצה להתחיל לרקוד, וגם למי שרקד בעבר ורוצה לחזור.': 'The “From the First Step” beginners class is for anyone who wants to start dancing — and for those who danced in the past and want to come back.',
    'ממפגש למפגש תלמדו מגוון רחב של ריקודי עם, בלימוד יסודי וחווייתי.': 'Week by week you will learn a wide range of Israeli folk dances, taught thoroughly and with lots of fun.',
    '⭐ הנאה תרבותית משולבת עם מוזיקה ישראלית משובחת!': '⭐ A cultural experience with wonderful Israeli music!',
    // instructor
    'גדי ביטון': 'Gadi Bitton',
    'גדי ביטון הוא רקדן, מרקיד, כוריאוגרף, מנהל אמנותי ומפיק אירועי מחול.': 'Gadi Bitton is a dancer, dance leader, choreographer, artistic director and producer of dance events.',
    // perks
    'טוב לדעת': 'Good to know',
    'אין צורך ברישום מוקדם': 'No registration needed',
    'פינת קפה איכותית': 'Quality coffee corner',
    'פינת קפה וכיבוד קל, חופשי כל הערב': 'Coffee and light refreshments, free all evening',
    'מומלץ להגיע בנעלי ספורט נוחות': 'Comfortable sports shoes recommended',
    'מוזיקה ישראלית משובחת כל הערב': 'Great Israeli music all evening',
    'אפשר להגיע לבד — כולם מתחילים יחד': 'Come on your own — everyone starts together',
    // ask / footer
    'שאלות? כתבו לנו בווטסאפ': 'Questions? Message us on WhatsApp',
    'היי, יש לי שאלה לגבי חוג המתחילים ביום {day}': 'Hi, I have a question about the {day} beginners class',
    'היי, יש לי שאלה לגבי ההרקדה ביום {day}': 'Hi, I have a question about the {day} dance night',
    'מחכים לרקוד איתך יחד במעגל 🕺💃': 'Can’t wait to dance with you in the circle 🕺💃',
    'גדי ביטון וצוות מחול ישראלי': 'Gadi Bitton and the Israeli Dance team',
    // places
    'רעננה': 'Ra’anana',
    'כפר המכביה': 'Kfar Maccabiah',
    'אוניברסיטת ת״א': 'Tel Aviv University',
    'לב הפארק, יאיר שטרן 3, רעננה': 'Lev HaPark, 3 Yair Stern St., Ra’anana',
    'אולם לב הפארק, יאיר שטרן 3, רעננה': 'Lev HaPark Hall, 3 Yair Stern St., Ra’anana',
    'מרכז הספורט, כפר המכביה': 'Sports Center, Kfar Maccabiah',
    'מרכז הספורט, אוניברסיטת תל אביב': 'Sports Center, Tel Aviv University',
    // parking / price
    'חניה חינם': 'Free parking',
    'חניה בשפע': 'Plenty of parking',
    'חניה חינם בחניון מרכז הספורט ובחניון המלון · יש להביא את פתק החניה לקופה': 'Free parking at the sports center and hotel lots · bring your parking ticket to the cashier',
    'חניה חינם במלון הכפר ובחניון מרכז הספורט · יש להביא את פתק החניה לקופה': 'Free parking at the village hotel and the sports center lot · bring your parking ticket to the cashier',
    'חניה חינם · חניון חיצוני שער 9 | חניון פנימי דרך שער 4': 'Free parking · outer lot at Gate 9 | inner lot via Gate 4',
    '40 ₪': '₪40',
    '40 ₪ למפגש': '₪40 per session',
    // halls
    'אולם': 'Hall',
    'אולם מרכזי': 'Main hall',
    'סטודיו 7 א\'': 'Studio 7A',
    'סטודיו 7 ב\'': 'Studio 7B',
    'סטודיו ENERGY': 'ENERGY Studio',
    'סטודיו MOVE': 'MOVE Studio',
    'סטודיו תחתון': 'Lower studio',
    'סטודיו עליון': 'Upper studio',
    'סטודיו גב אל גב': 'Back-to-back studio',
    'אולם "אגם"': '“Agam” hall',
    'סטודיו מתחילים-משתלבים': 'Beginners & intermediate studio'
  };

  // Phrase fallback for schedules, hall notes and dance-leader lists (longest first).
  const NAMES = [['גלית שם טוב', 'Galit Shem Tov'], ['ורדית חדד', 'Vardit Hadad'], ['אלמוג בן עמי', 'Almog Ben Ami'],
    ['יעל פרקש', 'Yael Farkash'], ['גדי ביטון', 'Gadi Bitton'], ['הילה בר', 'Hila Bar'], ['גלית', 'Galit'], ['הילה', 'Hila'], ['גדי', 'Gadi']];
  const PHRASES = [
    ['מתחילים מהצעד הראשון', 'beginners, first step'], ['מתחילים מצעד ראשון', 'beginners, first step'], ['צעד ראשון', 'first step'],
    ['סדנת מעגלים', 'Circles workshop'], ['סדנת זוגות', 'Couples workshop'],
    ['גב אל גב', 'back-to-back'], ['מתחילים פלוס', 'Beginners plus'], ['מתחילים + משתלבים', 'beginners + intermediate'],
    ['זוגות עד הסוף', 'Couples till the end'], ['מעגלים בקשות', 'Circles — requests'], ['(חדר חוגים)', '(activity room)'],
    ['(גלריה)', '(gallery)'], ['גלריה', 'Gallery'],
    ['מעגלים', 'Circles'], ['זוגות', 'Couples'], ['שורות', 'Lines'], ['מתחילים', 'beginners'], ['משתלבים', 'intermediate'],
    ['למפגש', 'per session'], ['מיוחדים', 'special'], ['נוסטלגיה', 'nostalgia'], ['סיום', 'End'], ['בקשות', 'requests'], ['סטודיו', 'Studio'], ['אולם', 'Hall']
  ].concat(NAMES.map(([he, en]) => ['ו' + he, 'and ' + en]), NAMES, [['עם', 'with'], ['ו', 'and']]);

  const norm = s => String(s ?? '').replace(/\s+/g, ' ').trim();
  const HEB = /[֐-׿]/;
  const phraseRe = PHRASES.map(([he, en]) =>
    [new RegExp('(^|[^\\u0590-\\u05FF])' + he.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\u0590-\\u05FF])', 'g'), en]);

  // Translations made automatically by the back office when a page is saved (content.en).
  let AUTO = {};
  const setAuto = m => { AUTO = (m && typeof m === 'object') ? m : {}; };

  function tr(s, noAuto) {
    const n = norm(s).replace(/(\d+(?:[.,]\d+)?)\s*₪/g, '₪$1'); // 40 ₪ → ₪40
    if (!n) return s ?? '';
    if (!HEB.test(n)) return n;
    if (EXACT[n] !== undefined) return EXACT[n];
    if (!noAuto && AUTO[n]) return AUTO[n];
    let out = n;
    for (const [re, en] of phraseRe) out = out.replace(re, (m, pre) => pre + en);
    if (HEB.test(out)) return n; // unknown wording — keep the Hebrew rather than half-translate
    out = out.replace(/\s+,/g, ',').replace(/\s+/g, ' ').trim();
    return out.charAt(0).toUpperCase() + out.slice(1);
  }

  return { tr, setAuto, UI, DAYS };
})();
