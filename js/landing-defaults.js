// Built-in content for the landing pages (beginners.html, harkadot.html).
// Used until the page is saved from the back office (club.gadibitton.co.il/site-admin.html);
// after that the saved copy in Firestore (sitePages/<id>) wins. The back office also starts from these.
window.LANDING_DEFAULTS = {
  beginners: {
    hero: {
      brand: 'גדי ביטון · מחול ישראלי',
      l1: 'ריקודי עם 🕺💃',
      l2: 'מהצעד הראשון',
      tag: 'חוג חדש למתחילים',
      lead: 'שמחים על התעניינותך! בחרו את הקבוצה שהכי נוחה לכם — וניפגש במעגל.'
    },
    texts: {
      detailsTitle: 'פרטי הקבוצה',
      whenTemplate: 'כל יום {day} בשעה {time}',
      activeNote: 'החוג כבר פעיל — מצטרפים בכל שבוע',
      priceLabel: 'עלות',
      priceNote: 'תשלום במקום באשראי או מזומן',
      joinText: 'הצטרפות לקהילת החוג בווטסאפ',
      scheduleTitle: 'לוח זמנים',
      calendarTitle: 'חוג ריקודי עם למתחילים — יום {day}'
    },
    groups: [
      {
        day: 'ראשון', place: 'רעננה', start: '2026-11-15', time: '20:00', durationMin: 120,
        where: 'לב הפארק, יאיר שטרן 3, רעננה',
        parking: 'חניה חינם',
        price: '40 ₪ למפגש',
        waze: 'https://waze.com/ul?ll=32.19350049,34.84822512&navigate=yes',
        whatsapp: 'https://chat.whatsapp.com/IefeSq7Fv2jA0nJXpXyS4p',
        image: 'images/site/class-sunday-raanana-tall.jpg',
        team: '', halls: []
      },
      {
        day: 'שלישי', place: 'כפר המכביה', start: '2026-11-17', time: '19:30', durationMin: 120,
        where: 'מרכז הספורט, כפר המכביה',
        parking: 'חניה חינם בחניון מרכז הספורט ובחניון המלון · יש להביא את פתק החניה לקופה',
        price: '40 ₪ למפגש',
        waze: 'https://waze.com/ul/hsv8y2e8ku',
        whatsapp: 'https://chat.whatsapp.com/JaqRFRweupeDl6DxsIDOIM',
        image: 'images/site/class-tuesday-maccabiah.jpg',
        team: '', halls: []
      },
      {
        day: 'חמישי', place: 'אוניברסיטת ת״א', start: '2026-11-19', time: '20:00', durationMin: 120,
        where: 'מרכז הספורט, אוניברסיטת תל אביב',
        parking: 'חניה חינם · חניון חיצוני שער 9 | חניון פנימי דרך שער 4',
        price: '40 ₪ למפגש',
        waze: 'https://ul.waze.com/ul?ll=32.11526595%2C34.80205446&navigate=yes&zoom=17&utm_campaign=waze_website&utm_source=waze_website&utm_medium=lm_share_location',
        whatsapp: 'https://chat.whatsapp.com/HavD03JZoxA72E73dVvhkr',
        image: 'images/site/class-thursday-tau.jpg',
        team: '', halls: []
      }
    ],
    about: {
      title: 'קצת על החוג',
      paragraphs: [
        'חוג המתחילים מהצעד הראשון מיועד למי שרוצה להתחיל לרקוד, וגם למי שרקד בעבר ורוצה לחזור.',
        'ממפגש למפגש תלמדו מגוון רחב של ריקודי עם, בלימוד יסודי וחווייתי.',
        '⭐ הנאה תרבותית משולבת עם מוזיקה ישראלית משובחת!'
      ]
    },
    instructor: {
      name: 'גדי ביטון',
      bio: 'גדי ביטון הוא רקדן, מרקיד, כוריאוגרף, מנהל אמנותי ומפיק אירועי מחול.',
      photo: 'images/site/gadi-portrait.jpg'
    },
    perks: {
      title: 'טוב לדעת',
      items: [
        { icon: '📝', text: 'אין צורך ברישום מוקדם' },
        { icon: '☕', text: 'פינת קפה וכיבוד קל, חופשי כל הערב' },
        { icon: '👟', text: 'מומלץ להגיע בנעלי ספורט נוחות' },
        { icon: '🤝', text: 'אפשר להגיע לבד — כולם מתחילים יחד' }
      ]
    },
    ask: {
      text: 'שאלות? כתבו לנו בווטסאפ',
      phone: '972524444700',
      message: 'היי, יש לי שאלה לגבי חוג המתחילים ביום {day}'
    },
    footer: { line1: 'מחכים לרקוד איתך יחד במעגל 🕺💃', line2: 'גדי ביטון וצוות מחול ישראלי' }
  },

  harkadot: {
    hero: {
      brand: 'גדי ביטון · מחול ישראלי',
      l1: 'הרקדות 🕺💃',
      l2: 'ריקודי עם',
      tag: 'שלוש פעמים בשבוע',
      lead: 'בחרו את ההרקדה שלכם — ומחכים לכם במעגל!'
    },
    texts: {
      detailsTitle: 'פרטי ההרקדה',
      whenTemplate: 'כל יום {day}, החל מ-{time}',
      activeNote: 'כל שבוע',
      priceLabel: 'כניסה',
      priceNote: 'תשלום במקום באשראי או מזומן',
      joinText: 'הצטרפות לקהילת ההרקדה בווטסאפ',
      scheduleTitle: 'לוח זמנים',
      calendarTitle: 'הרקדה עם גדי ביטון — יום {day}'
    },
    groups: [
      {
        day: 'ראשון', place: 'רעננה', start: '', time: '19:15', durationMin: 225,
        where: 'אולם לב הפארק, יאיר שטרן 3, רעננה',
        parking: 'חניה בשפע',
        price: '40 ₪',
        waze: 'https://waze.com/ul?ll=32.19350049,34.84822512&navigate=yes',
        whatsapp: 'https://chat.whatsapp.com/BCYU5z8vwCcL4H38ai8HNM',
        image: 'images/site/class-sunday-raanana-tall.jpg',
        team: 'גדי ביטון · ורדית חדד · הילה בר · גלית שם טוב',
        halls: [
          { name: 'אולם מרכזי', who: '', slots: [
            { time: '19:15', what: 'סדנת מעגלים' }, { time: '20:15', what: 'סדנת זוגות' }, { time: '21:00', what: 'מעגלים' },
            { time: '21:30', what: 'זוגות' }, { time: '22:00', what: 'מעגלים' }, { time: '22:30', what: 'זוגות' }] },
          { name: 'סטודיו גב אל גב', who: '', slots: [
            { time: '19:15', what: '' }, { time: '20:15', what: 'מעגלים גב אל גב' }, { time: '21:00', what: 'זוגות גב אל גב' },
            { time: '21:30', what: 'מעגלים גב אל גב' }, { time: '22:00', what: 'זוגות גב אל גב' }, { time: '22:30', what: 'מעגלים גב אל גב' }] },
          { name: 'אולם "אגם"', who: '', slots: [
            { time: '19:15', what: 'מעגלים צעד ראשון' }, { time: '20:30', what: 'זוגות צעד ראשון' }, { time: '21:00', what: 'זוגות משתלבים' }] }
        ]
      },
      {
        day: 'שלישי', place: 'כפר המכביה', start: '', time: '19:30', durationMin: 225,
        where: 'מרכז הספורט, כפר המכביה',
        parking: 'חניה חינם במלון הכפר ובחניון מרכז הספורט · יש להביא את פתק החניה לקופה',
        price: '40 ₪',
        waze: 'https://waze.com/ul/hsv8y2e8ku',
        whatsapp: 'https://chat.whatsapp.com/BCYU5z8vwCcL4H38ai8HNM',
        image: 'images/site/class-tuesday-maccabiah.jpg',
        team: '',
        halls: [
          { name: 'אולם', who: 'עם גדי ביטון ואלמוג בן עמי', slots: [
            { time: '19:30', what: 'מעגלים' }, { time: '20:15', what: 'זוגות' }, { time: '21:00', what: 'מעגלים' },
            { time: '21:30', what: 'זוגות' }, { time: '22:00', what: 'מעגלים' }, { time: '22:45', what: 'זוגות עד הסוף' }] },
          { name: 'סטודיו גב אל גב', who: 'עם הילה בר', slots: [
            { time: '19:30', what: '' }, { time: '20:15', what: '' }, { time: '21:00', what: 'זוגות' },
            { time: '21:30', what: 'מעגלים' }, { time: '22:00', what: 'זוגות' }, { time: '22:45', what: 'מעגלים בקשות' }] },
          { name: 'סטודיו מתחילים-משתלבים', who: 'עם יעל פרקש', slots: [
            { time: '19:30', what: 'מעגלים מתחילים' }, { time: '20:15', what: 'מעגלים מתחילים + משתלבים' }, { time: '21:00', what: 'זוגות' },
            { time: '21:30', what: 'מעגלים משתלבים' }, { time: '22:00', what: 'סיום' }] }
        ]
      },
      {
        day: 'חמישי', place: 'אוניברסיטת ת״א', start: '', time: '20:00', durationMin: 315,
        where: 'מרכז הספורט, אוניברסיטת תל אביב',
        parking: 'חניה חינם · חניון חיצוני שער 9 | חניון פנימי דרך שער 4',
        price: '40 ₪',
        waze: 'https://ul.waze.com/ul?ll=32.11526595%2C34.80205446&navigate=yes&zoom=17',
        whatsapp: 'https://chat.whatsapp.com/BCYU5z8vwCcL4H38ai8HNM',
        image: 'images/site/class-thursday-tau.jpg',
        team: '',
        halls: [
          { name: 'אולם', who: '', slots: [
            { time: '20:00', what: 'מעגלים' }, { time: '20:30', what: 'זוגות' }, { time: '21:00', what: 'מעגלים' }, { time: '21:30', what: 'זוגות' },
            { time: '22:00', what: 'מעגלים' }, { time: '22:30', what: 'זוגות' }, { time: '23:00', what: 'שורות' }, { time: '23:15', what: 'מעגלים' },
            { time: '23:45', what: 'זוגות' }, { time: '00:15', what: 'מעגלים' }, { time: '00:45', what: 'זוגות' }] },
          { name: 'סטודיו תחתון', who: '', slots: [
            { time: '20:00', what: 'מעגלים מיוחדים' }, { time: '20:30', what: 'מעגלים' }, { time: '21:00', what: 'זוגות' }, { time: '21:30', what: 'מעגלים' },
            { time: '22:00', what: 'זוגות' }, { time: '22:30', what: 'מעגלים' }, { time: '23:00', what: 'זוגות נוסטלגיה' }, { time: '23:45', what: 'סיום' }] },
          { name: 'סטודיו עליון', who: '', slots: [
            { time: '20:00', what: 'מעגלים מתחילים' }, { time: '21:00', what: 'זוגות מתחילים' }] }
        ]
      }
    ],
    about: { title: '', paragraphs: [] },
    instructor: {
      name: 'גדי ביטון',
      bio: 'גדי ביטון הוא רקדן, מרקיד, כוריאוגרף, מנהל אמנותי ומפיק אירועי מחול.',
      photo: 'images/site/gadi-portrait.jpg'
    },
    perks: {
      title: 'טוב לדעת',
      items: [
        { icon: '📝', text: 'אין צורך ברישום מוקדם' },
        { icon: '☕', text: 'פינת קפה איכותית' },
        { icon: '👟', text: 'מומלץ להגיע בנעלי ספורט נוחות' },
        { icon: '🎶', text: 'מוזיקה ישראלית משובחת כל הערב' }
      ]
    },
    ask: {
      text: 'שאלות? כתבו לנו בווטסאפ',
      phone: '972524444700',
      message: 'היי, יש לי שאלה לגבי ההרקדה ביום {day}'
    },
    footer: { line1: 'מחכים לרקוד איתך יחד במעגל 🕺💃', line2: 'גדי ביטון וצוות מחול ישראלי' }
  }
};
