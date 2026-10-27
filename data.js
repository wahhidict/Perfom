// data.js — كل البيانات + وصفات التجهيز
const CONFIG = {
  phone: '963945333924',
  packages: {
    basic:    { name: 'الباقة الأساسية', size: 30,  price: '150,000 ل.س' },
    signature:{ name: 'باقة التوقيع',    size: 50,  price: '250,000 ل.س' },
    special:  { name: 'الإصدار الخاص',   size: 100, price: '450,000 ل.س' }
  }
};

const FAMILIES = {
  oud:'عود', amber:'عنبر', wood:'خشبي', musk:'مسك', fresh:'منعش',
  floral:'زهري', spicy:'توابل', sweet:'حلو', leather:'جلد', chypre:'شيبر'
};

const TIE_ORDER = ['oud','amber','wood','musk','fresh','floral','spicy','sweet','leather','chypre'];

const Q = (id, text, choices, weights) => ({id, text, choices, weights});

const QUESTION_BANK = {
  first_impression: [
    Q('fi_1','أول ما تدخل مكان، شو بتحب يلاحظوه فيك؟',
      ['حضوري القوي','أناقتي الهادية','هدوئي العميق','ريحتي المميزة'],
      {'حضوري القوي':{oud:3,amber:2,spicy:1},'أناقتي الهادية':{wood:3,musk:2,fresh:1},'هدوئي العميق':{musk:3,wood:2,floral:1},'ريحتي المميزة':{fresh:3,floral:2,amber:1}}),
    Q('fi_2','لما تكون بمجلس، وين بتقعد؟',
      ['بالصدر، الكل بيشوفني','بجنب، براقب الجو','بالنص، بربط الناس','قريب من الباب'],
      {'بالصدر، الكل بيشوفني':{oud:3,spicy:2,amber:1},'بجنب، براقب الجو':{wood:3,leather:2,musk:1},'بالنص، بربط الناس':{amber:3,floral:2,sweet:1},'قريب من الباب':{fresh:3,musk:2,wood:1}}),
    Q('fi_3','شو بيلفتك أول مرة بشخص؟',
      ['وقفته وثقته','أناقته وتفاصيله','صوته وهدوءه','ريحته'],
      {'وقفته وثقته':{oud:3,leather:2,spicy:1},'أناقته وتفاصيله':{wood:3,chypre:2,musk:1},'صوته وهدوءه':{musk:3,wood:2,floral:1},'ريحته':{fresh:3,amber:2,floral:1}}),
    Q('fi_4','كيف بتدخل غرفة فيها ناس ما بتعرفهن؟',
      ['بسلم على الكل','بسكت لحدا يحكي','بختار شخص واحد','بمرق بهدوء'],
      {'بسلم على الكل':{amber:3,sweet:2,floral:1},'بسكت لحدا يحكي':{wood:3,musk:2,leather:1},'بختار شخص واحد':{musk:3,wood:2,fresh:1},'بمرق بهدوء':{oud:3,wood:2,leather:1}}),
    Q('fi_5','لو وصفت حضورك بكلمة؟',
      ['هيبة','أناقة','دفء','غموض'],
      {'هيبة':{oud:3,leather:2,spicy:1},'أناقة':{wood:3,chypre:2,musk:1},'دفء':{amber:3,sweet:2,musk:1},'غموض':{oud:2,leather:3,wood:2}}),
    Q('fi_6','شو بتحب الناس تتذكره فيك؟',
      ['كلمتك','ابتسامتك','إحساسك','ريحتك'],
      {'كلمتك':{wood:3,leather:2,spicy:1},'ابتسامتك':{floral:3,sweet:2,amber:1},'إحساسك':{amber:3,musk:2,wood:1},'ريحتك':{fresh:3,oud:2,floral:1}})
  ],
  memory: [
    Q('mem_1','أي رائحة بتعيدك لأحلى ذكرى؟',
      ['بخور وبيت الجدة','بحر وهوا','ورد وحديقة','مطر وتراب'],
      {'بخور وبيت الجدة':{amber:3,oud:2,spicy:1},'بحر وهوا':{fresh:3,musk:2,wood:1},'ورد وحديقة':{floral:3,sweet:2,musk:1},'مطر وتراب':{wood:3,chypre:2,musk:1}}),
    Q('mem_2','وين بتحس حالك "أنت"؟',
      ['بيت قديم وحجارة','شاطئ ومساحة','غرفة هادية','سوق وزحمة'],
      {'بيت قديم وحجارة':{oud:3,amber:2,wood:1},'شاطئ ومساحة':{fresh:3,musk:2,wood:1},'غرفة هادية':{wood:3,musk:2,chypre:1},'سوق وزحمة':{spicy:3,amber:2,leather:1}}),
    Q('mem_3','أي موسم بيشبهك؟',
      ['شتا ودفء','ربيع وانتعاش','صيف وحرية','خريف وهدوء'],
      {'شتا ودفء':{amber:3,oud:2,sweet:1},'ربيع وانتعاش':{floral:3,fresh:2,musk:1},'صيف وحرية':{fresh:3,musk:2,floral:1},'خريف وهدوء':{wood:3,chypre:2,leather:1}}),
    Q('mem_4','أي وقت بتحب تنعيش فيه؟',
      ['الفجر','الضحى','المغرب','الليل'],
      {'الفجر':{fresh:3,floral:2,musk:1},'الضحى':{fresh:2,floral:2,sweet:1,amber:1},'المغرب':{amber:3,wood:2,floral:1},'الليل':{oud:3,leather:2,amber:1}}),
    Q('mem_5','شو ما بتنساه من طفولتك؟',
      ['ريحة مطبخ أمي','صوت المطر','لعب بالتراب','بحر بالصيف'],
      {'ريحة مطبخ أمي':{amber:3,sweet:2,spicy:1},'صوت المطر':{wood:3,chypre:2,musk:1},'لعب بالتراب':{wood:2,fresh:2,musk:2},'بحر بالصيف':{fresh:3,musk:2,floral:1}}),
    Q('mem_6','أي ذكرى بتحب ترجع إلها؟',
      ['حضن دافي','ضحكة مع صحاب','سكون لحالك','لحظة نجاح'],
      {'حضن دافي':{amber:3,musk:2,sweet:1},'ضحكة مع صحاب':{floral:3,sweet:2,fresh:1},'سكون لحالك':{wood:3,musk:2,chypre:1},'لحظة نجاح':{oud:3,leather:2,spicy:1}})
  ],
  energy: [
    Q('en_1','طاقتك أقرب لوين؟',
      ['نار','هوا','ماء','تراب'],
      {'نار':{amber:3,spicy:2,oud:1},'هوا':{fresh:3,musk:2,floral:1},'ماء':{musk:3,wood:2,fresh:1},'تراب':{wood:3,oud:2,leather:1}}),
    Q('en_2','كيف بتتعامل مع الضغط؟',
      ['بواجه بصراحة','بسكت وبفكر','بحكي مع حدا قريب','بمشي لحالي'],
      {'بواجه بصراحة':{leather:3,spicy:2,oud:1},'بسكت وبفكر':{wood:3,musk:2,chypre:1},'بحكي مع حدا قريب':{amber:3,musk:2,sweet:1},'بمشي لحالي':{fresh:3,wood:2,musk:1}}),
    Q('en_3','شو بيعبيك طاقة؟',
      ['نجاح وطموح','حب وناس','سكون وطبيعة','حرية وسفر'],
      {'نجاح وطموح':{oud:3,leather:2,spicy:1},'حب وناس':{amber:3,floral:2,sweet:1},'سكون وطبيعة':{wood:3,musk:2,chypre:1},'حرية وسفر':{fresh:3,musk:2,wood:1}}),
    Q('en_4','لو تكون حيوان؟',
      ['أسد','حصان','قط','طير'],
      {'أسد':{oud:3,leather:2,spicy:1},'حصان':{fresh:3,wood:2,musk:1},'قط':{musk:3,oud:2,wood:1},'طير':{fresh:2,floral:2,musk:2}}),
    Q('en_5','أي لون بيشبهك؟',
      ['أسود عميق','أبيض نقي','بني دافي','أحمر غامق'],
      {'أسود عميق':{oud:3,leather:2,wood:1},'أبيض نقي':{musk:3,fresh:2,floral:1},'بني دافي':{amber:3,wood:2,sweet:1},'أحمر غامق':{spicy:3,floral:2,amber:1}}),
    Q('en_6','شو بيخليك تحس حالك حي؟',
      ['إنجاز صعب','لحظة حب','سكون بعد تعب','مغامرة'],
      {'إنجاز صعب':{oud:3,spicy:2,leather:1},'لحظة حب':{amber:3,floral:2,musk:1},'سكون بعد تعب':{wood:3,musk:2,chypre:1},'مغامرة':{fresh:3,spicy:2,musk:1}})
  ],
  hidden: [
    Q('hid_1','شو ما بيبين عليك أول لقاء؟',
      ['جرأة','حنين','طموح','رومانسية'],
      {'جرأة':{leather:3,spicy:2,oud:1},'حنين':{amber:3,sweet:2,musk:1},'طموح':{oud:3,wood:2,leather:1},'رومانسية':{floral:3,sweet:2,musk:1}}),
    Q('hid_2','شو بتخبيه عن الناس؟',
      ['ضعفي','حبي','خوفي','طموحي'],
      {'ضعفي':{musk:3,wood:2,amber:1},'حبي':{floral:3,amber:2,sweet:1},'خوفي':{wood:3,oud:2,musk:1},'طموحي':{oud:3,leather:2,spicy:1}}),
    Q('hid_3','لو حدا شافك منيح، شو بيكتشف؟',
      ['قلب كبير','عقل حاد','روح حرة','إرادة قوية'],
      {'قلب كبير':{amber:3,floral:2,musk:1},'عقل حاد':{wood:3,chypre:2,leather:1},'روح حرة':{fresh:3,musk:2,wood:1},'إرادة قوية':{oud:3,leather:2,spicy:1}}),
    Q('hid_4','شو أكتر شي بتخاف منه؟',
      ['الخيانة','الفشل','الوحدة','الروتين'],
      {'الخيانة':{leather:3,oud:2,wood:1},'الفشل':{oud:2,wood:3,spicy:1},'الوحدة':{amber:3,musk:2,floral:1},'الروتين':{fresh:3,spicy:2,floral:1}}),
    Q('hid_5','شو ما بتسمح لحدا يلمسه فيك؟',
      ['كرامتي','أهلي','مبادئي','حريتي'],
      {'كرامتي':{oud:3,leather:2,wood:1},'أهلي':{amber:3,musk:2,leather:1},'مبادئي':{wood:3,leather:2,chypre:1},'حريتي':{fresh:3,musk:2,wood:1}}),
    Q('hid_6','لو تعرف حالك بكلمة؟',
      ['قوي','حساس','غامض','طيب'],
      {'قوي':{oud:3,leather:2,wood:1},'حساس':{floral:3,musk:2,amber:1},'غامض':{oud:2,leather:2,musk:2},'طيب':{amber:3,musk:2,sweet:1}})
  ],
  style: [
    Q('sty_1','كيف بتحب تُكتشف؟',
      ['فوراً','على مراحل','غامض','واضح ومريح'],
      {'فوراً':{fresh:3,spicy:2,oud:1},'على مراحل':{wood:3,amber:2,musk:1},'غامض':{oud:3,leather:2,wood:1},'واضح ومريح':{musk:3,fresh:2,floral:1}}),
    Q('sty_2','أسلوبك باللبس؟',
      ['كلاسيكي أنيق','رياضي مريح','غريب ومميز','بسيط ونظيف'],
      {'كلاسيكي أنيق':{wood:3,chypre:2,oud:1},'رياضي مريح':{fresh:3,musk:2,wood:1},'غريب ومميز':{spicy:3,leather:2,floral:1},'بسيط ونظيف':{musk:3,fresh:2,wood:1}}),
    Q('sty_3','أكسسوار واحد بس؟',
      ['ساعة فخمة','خاتم بسيط','سلسلة','عطر'],
      {'ساعة فخمة':{oud:3,wood:2,leather:1},'خاتم بسيط':{musk:3,wood:2,chypre:1},'سلسلة':{spicy:2,floral:2,fresh:2},'عطر':{oud:2,amber:2,fresh:2,floral:2}}),
    Q('sty_4','كيف بتختار عطرك؟',
      ['بسمع اسم الماركة','بشم وبختار','حدا بختارلي','بجرب شي جديد'],
      {'بسمع اسم الماركة':{oud:3,wood:2,leather:1},'بشم وبختار':{musk:3,amber:2,floral:1},'حدا بختارلي':{amber:3,sweet:2,floral:1},'بجرب شي جديد':{fresh:3,spicy:2,floral:1}}),
    Q('sty_5','شو بيهمك بالعطر؟',
      ['قوته وثباته','تميزه','راحته','قصته'],
      {'قوته وثباته':{oud:3,amber:2,spicy:1},'تميزه':{spicy:3,leather:2,floral:1},'راحته':{musk:3,fresh:2,wood:1},'قصته':{floral:3,amber:2,wood:1}}),
    Q('sty_6','لو تسمي عطرك؟',
      ['أثر','غموض','دفء','حياة'],
      {'أثر':{oud:3,leather:2,wood:1},'غموض':{oud:2,musk:2,leather:2},'دفء':{amber:3,sweet:2,musk:1},'حياة':{fresh:3,floral:2,sweet:1}})
  ],
  occasion: [
    Q('occ_1','وين بتشوف عطرك أكتر؟',
      ['نهار وشغل','ليل وسهر','مناسبات','كل يوم'],
      {'نهار وشغل':{fresh:3,musk:2,wood:1},'ليل وسهر':{oud:3,amber:2,spicy:1},'مناسبات':{floral:3,oud:2,sweet:1},'كل يوم':{musk:3,fresh:2,wood:1}}),
    Q('occ_2','أي مناسبة بتحبها؟',
      ['عرس واحتفال','سهرة هادية','قهوة مع صحاب','لحظة لحالك'],
      {'عرس واحتفال':{floral:3,sweet:2,amber:1},'سهرة هادية':{oud:3,leather:2,amber:1},'قهوة مع صحاب':{amber:3,sweet:2,musk:1},'لحظة لحالك':{wood:3,musk:2,chypre:1}}),
    Q('occ_3','أي جو بتحس فيه حالك أحلى؟',
      ['مطر وبرد','شمس ودفء','هوا ونسيم','سكون وليل'],
      {'مطر وبرد':{wood:3,amber:2,chypre:1},'شمس ودفء':{floral:3,sweet:2,fresh:1},'هوا ونسيم':{fresh:3,musk:2,floral:1},'سكون وليل':{oud:3,musk:2,wood:1}}),
    Q('occ_4','شو بتحب تشرب؟',
      ['قهوة سادة','شاي بالنعنع','عصير فواكه','ماء بارد'],
      {'قهوة سادة':{oud:3,sweet:2,wood:1},'شاي بالنعنع':{fresh:3,musk:2,spicy:1},'عصير فواكه':{floral:3,sweet:2,fresh:1},'ماء بارد':{fresh:3,musk:2,wood:1}}),
    Q('occ_5','لو تعزم حدا؟',
      ['قهوة عربية وتمر','شاي وحلويات','عصير وفواكه','شي مميز'],
      {'قهوة عربية وتمر':{amber:3,oud:2,spicy:1},'شاي وحلويات':{sweet:3,floral:2,musk:1},'عصير وفواكه':{fresh:3,floral:2,musk:1},'شي مميز':{spicy:3,leather:2,floral:1}}),
    Q('occ_6','وقت الفراغ؟',
      ['قراءة وهدوء','رياضة وحركة','طلعات وناس','أفلام وبيت'],
      {'قراءة وهدوء':{wood:3,musk:2,chypre:1},'رياضة وحركة':{fresh:3,spicy:2,wood:1},'طلعات وناس':{amber:3,floral:2,sweet:1},'أفلام وبيت':{sweet:3,musk:2,amber:1}})
  ]
};

// ═══ 10 خلطات + وصفة التجهيز (للتاجر فقط) ═══
const BLENDS = {
  oud: {
    name:'خلطة الأثر', key:'OUD',
    notes:['عود','عنبر','مسك أبيض'],
    message:`في ناس بيدخلوا المكان بيضجّوا، وناس بيدخلوا بيسكتوا المكان. أنت من النوع التاني. عودك ما هو صراخ — هو ذاك الهدوء اللي بيخلي الناس تلتفت وتسأل: مين هاد؟ لأن فيك أصالة ما بتنشرى، وحضور ما بينطلب. اللي بيعرفك بيعرف إنك أصل، والباقي بيكتشفوا متأخر.`,
    recipe50: [{n:'Tom Ford Oud Wood',ml:20},{n:'Swiss Arabian Shaghaf Oud',ml:15},{n:'Al Haramain Amber Oud',ml:10},{n:'White Musk (dupe)',ml:5}]
  },
  amber: {
    name:'خلطة الدفء', key:'AMBER',
    notes:['عنبر','فانيلا','مسك ناعم'],
    message:`أنت من الناس اللي بيرجعوا إلهم لما الدنيا تتعب. مش لأنك بتعطي وعود، بل لأنك بتعطي دفء. عنبرك هو هالحضن اللي ما بيتغير — دافي، ثابت، موجود بلا شروط. يمكن ما بتحكي كثير عن حبك، بس كل اللي حواليك بيعرفوه من إحساسهم معك. وهاد، صدقني، أندر من أي كلمة حلوة.`,
    recipe50: [{n:'Tom Ford Tobacco Vanille',ml:20},{n:'Lattafa Khamrah',ml:15},{n:'Ajmal Amber Wood',ml:10},{n:'Soft Musk',ml:5}]
  },
  wood: {
    name:'خلطة الجذور', key:'WOOD',
    notes:['صندل','أرز','فيتيفر'],
    message:`فيك شي نادر بهاد الزمن: إنك بتعرف كثير، وما بتحتاج تحكي. خشبك هو هالهدوء — دفء ما بيعلي صوته، بس كل اللي حواليك بيحسوا فيه. أنت الشخص اللي الناس بترتاح جنبه بلا ما تعرف ليش. هاد مو ضعف — هاد عمق. والعمق ما بينشاف، بينحس.`,
    recipe50: [{n:'Bleu de Chanel',ml:20},{n:'Terre d\'Hermès',ml:15},{n:'Armaf Club de Nuit Intense',ml:10},{n:'Guerlain Vetiver',ml:5}]
  },
  musk: {
    name:'خلطة النقاء', key:'MUSK',
    notes:['مسك أبيض','نيرولي','صندل'],
    message:`فيك طيبة ما بتحتاج تثبت حالها. من النوع اللي بيعمل الخير وبيمشي، بلا ما ينتظر شكر. مسكك الأبيض هو هالنقاء — نظيف، هادي، بيلمس الروح قبل الحواس. أنت من الناس اللي بيثقوا فيهم من أول لحظة، لأن فيك صفاء ما بيتصنّع.`,
    recipe50: [{n:'White Musk (Body Shop)',ml:25},{n:'Lattafa Fakhar',ml:15},{n:'Tom Ford Neroli Portofino',ml:10}]
  },
  fresh: {
    name:'خلطة النسمة', key:'FRESH',
    notes:['برغموت','ملح بحري','نعنع'],
    message:`فيك طاقة بدايات. كأنك كل صباح بتولد من جديد، بقلب خفيف ونية صافية. نسمتك هي هالحيوية — حمضية مشرقة، بتفتح المزاج وبتقول للحياة: يلا. أنت الشخص اللي بيصحّي اللي حواليه، مش بوعظ، بل بإحساسه إنه كل يوم فرصة.`,
    recipe50: [{n:'Dior Sauvage',ml:20},{n:'Rasasi Hawas',ml:15},{n:'Xerjoff Erba Pura',ml:10},{n:'Mint/Aqua accord',ml:5}]
  },
  floral: {
    name:'خلطة الرقة', key:'FLORAL',
    notes:['ورد طائفي','ياسمين','فريزيا'],
    message:`رقتك أقوى مما بيظن الناس. كتير ناس بتشوف الهدوء ضعف، بس أنت بتعرف إنه الهدوء قوة بتتعب أقل. وردك هو هالرقة — دافية، فيها وفاء ما بيتغير. أنت الشخص اللي بيضل جنب اللي بيحبهم، بهدوء، بلا ضجّة، بلا شروط.`,
    recipe50: [{n:'Lattafa Yara',ml:20},{n:'Miss Dior',ml:15},{n:'Carolina Herrera Good Girl',ml:10},{n:'Jasmine oil',ml:5}]
  },
  spicy: {
    name:'خلطة الجرأة', key:'SPICY',
    notes:['زعفران','فلفل','قرفة'],
    message:`فيك شي ما بينلقى بسهولة. إجاباتك حكيت عن جرأة هادية، عن شخص بيعرف قيمته بلا ما يحتاج يثبتها لحدا. زعفرانك هو هالندرة — غالي، مميز، وما بيتشبه بحدا. أنت من الناس اللي بيمرقوا بالحياة وبيتركوا أثر.`,
    recipe50: [{n:'PDM Layton',ml:20},{n:'Lattafa Khamrah',ml:15},{n:'Lattafa Asad',ml:10},{n:'Saffron oil',ml:5}]
  },
  sweet: {
    name:'خلطة الحلاوة', key:'SWEET',
    notes:['فانيلا','عسل','تونكا'],
    message:`أنت بتعطي بلا ما تحسب. حبك، وقتك، اهتمامك — كله بيجي من قلب مفتوح. حلاوتك هي هالعطاء — طبيعية، دافية، بلا تصنّع. إجاباتك حكيت عن شخص بيهمه يسعد اللي حواليه، وأحياناً بينسى حالو. بس اسمح لي قلك: أنت كمان بتستاهل حدا يعطيك.`,
    recipe50: [{n:'MFK Baccarat Rouge 540',ml:20},{n:'Tom Ford Tobacco Vanille',ml:15},{n:'Lattafa Khamrah',ml:10},{n:'Vanilla oil',ml:5}]
  },
  leather: {
    name:'خلطة الدرع', key:'LEATHER',
    notes:['جلد','عود','باتشولي'],
    message:`أنت درع للي بتحبهم. ما بتحكي كثير عن مشاعرك، بس أفعالك بتحكي. جلدك هو هالحماية — قوي، دافي، فيه نبض حياة. إجاباتك حكيت عن شخص بيحمي اللي حواليه بلا ما يطلب مقابل. في ناس بتحب بالكلام، وأنت من الناس اللي بتحب بالأفعال.`,
    recipe50: [{n:'Tom Ford Tuscan Leather',ml:20},{n:'Tom Ford Ombre Leather',ml:15},{n:'Oud accord',ml:10},{n:'Patchouli oil',ml:5}]
  },
  chypre: {
    name:'خلطة الحكمة', key:'CHYPRE',
    notes:['برغموت','باتشولي','طحلب بلوط'],
    message:`فيك شي قديم… مش بالعمر، بالروح. كأنك جاي من زمن كان فيه عمق أكثر، وسكوت أدفى. حكمتك هي هالغموض اللي حواليك — أرضي، عميق، فيه سر ما بتحكي عنه. الناس بتقرب منك وهي حاسة إنها لسا ما اكتشفتك كلياً.`,
    recipe50: [{n:'Creed Aventus',ml:20},{n:'Terre d\'Hermès',ml:15},{n:'Patchouli oil',ml:10},{n:'Bergamot oil',ml:5}]
  }
};

// ═══ منطق حتمي ═══
function selectQuestions(answers){
  const q = [
    QUESTION_BANK.first_impression[0],
    QUESTION_BANK.memory[0],
    QUESTION_BANK.energy[0],
    QUESTION_BANK.hidden[0],
    QUESTION_BANK.style[0],
    QUESTION_BANK.occasion[0]
  ];
  const fi1 = answers['fi_1']||'';
  q.push((fi1.includes('حضوري')||fi1.includes('ريحتي')) ? QUESTION_BANK.first_impression[4] : QUESTION_BANK.first_impression[2]);
  const mem1 = answers['mem_1']||'';
  q.push((mem1.includes('بخور')||mem1.includes('ورد')) ? QUESTION_BANK.memory[3] : QUESTION_BANK.memory[5]);
  const en1 = answers['en_1']||'';
  q.push((en1.includes('نار')||en1.includes('تراب')) ? QUESTION_BANK.energy[5] : QUESTION_BANK.energy[3]);
  return q;
}

function calculateBlend(answers){
  const scores = {};
  for (const qid in answers){
    const q = Object.values(QUESTION_BANK).flat().find(x=>x.id===qid);
    if(!q) continue;
    const w = q.weights[answers[qid]];
    if(!w) continue;
    for(const fam in w) scores[fam] = (scores[fam]||0) + w[fam];
  }
  return TIE_ORDER.filter(f=>scores[f]).sort((a,b)=>(scores[b]||0)-(scores[a]||0));
}

// بناء رسالة الواتساب (ما فيها وصفة — بس كود)
function buildWhatsAppMessage(o){
  return [
    '🛒 *طلب جديد*',
    '━━━━━━━━━━━━━━━',
    `👤 الاسم: ${o.name}`,
    `📱 الموبايل: ${o.phone}`,
    `📍 العنوان: ${o.address}`,
    '━━━━━━━━━━━━━━━',
    `🎯 الخلطة: ${o.blendName}`,
    `🧪 النوتات: ${o.notes}`,
    `📦 الباقة: ${o.packageName} (${o.size}ml)`,
    `💰 السعر: ${o.price}`,
    `🎁 النوع: ${o.gender}`,
    '━━━━━━━━━━━━━━━',
    `🔖 كود الطلب: *${o.code}*`,
    '━━━━━━━━━━━━━━━',
    '💵 الدفع: عند الاستلام',
    `🕐 ${new Date().toLocaleString('ar-SY')}`
  ].join('\n');
}
