// @ts-nocheck
/* Course content. Edit lessons, vocabulary and reader texts here.
   Stress: "+" after a vowel marks it as stressed (Russian). [[text]] makes a tappable, spoken word. **text** is bold. */
const L: any = { code:"ar", native:"العربية", brand:"أبجد", brandEn:"Arabic primer", name:"Arabic", writeName:"Modern Standard Arabic", tts:"ar-SA", voiceRe:/^ar([-_]|$)/i, key:"ar-primer-v1", bigLo:false, rtl:true,
  norm:(w: string)=>w.replace(/[ً-ٰٟـ]/g,"").replace(/[أإآٱ]/g,"ا"), wordRe:"[\\u0621-\\u065F\\u0670-\\u06D3]+",
  untitled:"بِلَا عُنْوَانٍ", pastePh:"الصق النص هنا…", sourcePh:"e.g. BBC Arabic, 3 Oct",
  sources:`News: <a href="https://www.bbc.com/arabic" target="_blank" rel="noopener">BBC News عربي</a>. Free books: <a href="https://www.hindawi.org" target="_blank" rel="noopener">Hindawi</a>.`,
  prepMarks:`- The "ru" field holds the Arabic sentence. Write it with full vowel marks (harakat) on every word so a learner can read it aloud; keep the wording itself unchanged.
- Dictionary forms carry vowel marks too: for verbs give the past-tense ‘he’ form (e.g. كَتَبَ); for nouns and adjectives the singular without al-.`,
  formRule:"without vowel marks", explainMarks:"Write Arabic words with full vowel marks and add a transliteration in brackets after each."
};

/* ---------- course content ---------- */
const TABS: any[] = [
{ id:"alphabet", name:"Alphabet", ru:"الْحُرُوفُ",
  desc:"All 28 letters in four lessons, grouped by shape. Arabic reads right to left, and most letters join, so each card shows the letter's connected forms.",
  lessons:[
  { id:"a1", title:"One shape, many dots", ru:"ب ت ث ن ي", kind:"letters",
    goal:"Read your first Arabic words with six letters that share one basic shape.",
    learn:[
      "Arabic is written from **right to left**. It has 28 letters, and all of them are consonants or long vowels.",
      "Letters join inside a word, so most have up to four shapes: on their own, at the start, in the middle and at the end. Each card shows the joined forms.",
      "Short vowels are small marks above or below a letter: **fatha** is ‘a’, **kasra** is ‘i’, **damma** is ‘u’, and **sukun** (a small circle) means no vowel. Beginners' texts show them; newspapers mostly don't.",
      "This first group shares one shape and is told apart only by dots: [[ب]] has one dot below, [[ت]] two above, [[ث]] three above, [[ن]] one above, [[ي]] two below."
    ],
    tip:"Long vowels are written as letters: [[ا]] for ‘aa’, [[ي]] for ‘ee’ and [[و]] for ‘oo’. So [[بَاب]] (door) is b-aa-b.",
    items:[["ا","ـا","ā","a long ‘aa’; also a seat for other sounds","بَاب","door","ا"],["ب","بـ ـبـ ـب","b","‘b’ in ‘bat’","بَيْت","house","ب"],["ت","تـ ـتـ ـت","t","‘t’ in ‘tap’","تِين","figs","ت"],["ث","ثـ ـثـ ـث","th","‘th’ in ‘think’","ثَلَاثَة","three","ث"],["ن","نـ ـنـ ـن","n","‘n’ in ‘net’","نُور","light","ن"],["ي","يـ ـيـ ـي","y / ī","‘y’ in ‘yes’, or a long ‘ee’","يَد","hand","ي"]],
    words:[["بَاب","door"],["بَيْت","house"],["بِنْت","girl"],["بَنَات","girls"],["تِين","figs"],["بَيْن","between"],["نَبَات","plant"]],
    recap:["Arabic runs right to left, and letters join.","ب ت ث ن ي share one shape; the dots tell them apart.","Short vowels are marks; long vowels are the letters ا ي و."]
  },
  { id:"a2", title:"Joiners and non-joiners", ru:"ج ح خ د ذ ر ز و", kind:"letters",
    goal:"Learn eight more letters, including the six that never join forwards.",
    learn:[
      "[[ج]], [[ح]] and [[خ]] share a shape and differ only by a dot: one below, none, one above.",
      "Six letters never join to the letter after them: [[ا]], [[د]], [[ذ]], [[ر]], [[ز]] and [[و]]. After one of these the next letter starts fresh, which is why you see small gaps inside words like [[وَلَد]].",
      "[[ح]] has no English match. Breathe out hard from the back of your throat, as if fogging up a pair of glasses. It is a different letter from the ordinary ‘h’, [[ه]]."
    ],
    items:[["ج","جـ ـجـ ـج","j","‘j’ in ‘jam’","جَمَل","camel","ج"],["ح","حـ ـحـ ـح","ḥ","a breathy ‘h’ from deep in the throat","حُبّ","love","ح"],["خ","خـ ـخـ ـخ","kh","‘ch’ in Scottish ‘loch’","خُبْز","bread","خ"],["د","ـد","d","‘d’ in ‘dog’, tongue against the teeth","دَرْس","lesson","د"],["ذ","ـذ","dh","‘th’ in ‘this’","ذَهَب","gold","ذ"],["ر","ـر","r","a tapped or rolled ‘r’","رَجُل","man","ر"],["ز","ـز","z","‘z’ in ‘zoo’","زَيْت","oil","ز"],["و","ـو","w / ū","‘w’ in ‘wet’, or a long ‘oo’","وَلَد","boy","و"]],
    words:[["وَلَد","boy"],["دَرْس","lesson"],["خُبْز","bread"],["حُبّ","love"],["رَجُل","man"],["جَدِيد","new"],["زَوْج","husband"]],
    recap:["ج ح خ: dot below, no dot, dot above.","ا د ذ ر ز و never join to the next letter.","ح is a breathy throat ‘h’, different from ه."]
  },
  { id:"a3", title:"Heavy letters and the throat", ru:"س ش ص ض ط ظ ع غ", kind:"letters",
    goal:"Learn the four ‘emphatic’ letters and the two throat sounds Arabic is known for.",
    learn:[
      "Arabic has four **emphatic** letters: [[ص]], [[ض]], [[ط]] and [[ظ]]. They are heavy versions of s, d, t and th, said with the back of the tongue raised. They also darken the vowels next to them.",
      "[[ع]] (ʿayn) is the sound learners find hardest. Tighten your throat as if about to gag, and let a vowel squeeze through. Listen to [[عَيْن]] several times.",
      "[[غ]] is like the French ‘r’ in ‘Paris’, a gargle at the back of the throat."
    ],
    tip:"Compare [[سَيْف]] (sword) with [[صَيْف]] (summer). The only difference is ordinary س against heavy ص.",
    items:[["س","سـ ـسـ ـس","s","‘s’ in ‘sun’","سَلَام","peace","س"],["ش","شـ ـشـ ـش","sh","‘sh’ in ‘shop’","شَمْس","sun","ش"],["ص","صـ ـصـ ـص","ṣ","a heavy ‘s’, tongue low and back","صَدِيق","friend","ص"],["ض","ضـ ـضـ ـض","ḍ","a heavy ‘d’","ضَيْف","guest","ض"],["ط","طـ ـطـ ـط","ṭ","a heavy ‘t’","طَالِب","student","ط"],["ظ","ظـ ـظـ ـظ","ẓ","a heavy ‘th’ as in ‘this’","ظُهْر","noon","ظ"],["ع","عـ ـعـ ـع","ʿ","a squeeze in the throat; no English match","عَيْن","eye","ع"],["غ","غـ ـغـ ـغ","gh","a gargled ‘r’, like French ‘r’","غَدًا","tomorrow","غ"]],
    words:[["سَلَام","peace"],["شُكْرًا","thank you"],["صَبَاح","morning"],["طَعَام","food"],["عَرَبِيّ","Arabic"],["سَعِيد","happy"],["شَمْس","sun"]],
    recap:["ص ض ط ظ are heavy versions of s, d, t, th.","ع is a squeeze in the throat; غ is a gargled r.","Listen often: these sounds come with practice."]
  },
  { id:"a4", title:"The last letters", ru:"ف ق ك ل م ه", kind:"letters",
    goal:"Finish the alphabet, plus three special forms you'll see everywhere.",
    learn:[
      "[[ق]] is said far back in the throat, deeper than [[ك]]. [[قَلْب]] (heart) and [[كَلْب]] (dog) differ only in this sound.",
      "[[ة]] (tāʾ marbūṭa) marks most feminine nouns. At the end of a phrase it sounds ‘a’: [[مَدِينَة]] is madīna.",
      "[[ء]] (hamza) is a glottal stop, the catch in ‘uh-oh’. It often sits on a carrier letter: [[أ]], [[إ]], [[ؤ]] or [[ئ]].",
      "[[ل]] followed by [[ا]] always joins into one special shape: [[لا]]."
    ],
    items:[["ف","فـ ـفـ ـف","f","‘f’ in ‘fun’","فَم","mouth","ف"],["ق","قـ ـقـ ـق","q","a ‘k’ from far back in the throat","قَلْب","heart","ق"],["ك","كـ ـكـ ـك","k","‘k’ in ‘kite’","كِتَاب","book","ك"],["ل","لـ ـلـ ـل","l","‘l’ in ‘let’","لَيْل","night","ل"],["م","مـ ـمـ ـم","m","‘m’ in ‘map’","مَاء","water","م"],["ه","هـ ـهـ ـه","h","‘h’ in ‘hat’","هُنَا","here","ه"],["ة","ـة","-a / -at","the feminine ending","مَدِينَة","city","ة"],["ء","أ إ ؤ ئ","ʾ","a catch in the throat, as in ‘uh-oh’","أَنَا","I","ء"],["لا","ـلا","lā","lām + alif joined as one shape","لَا","no","لا"]],
    words:[["كِتَاب","book"],["قَلَم","pen"],["مَاء","water"],["مَكْتَب","office"],["مَدِينَة","city"],["أَنَا","I"],["لَا","no"],["مَدْرَسَة","school"]],
    recap:["ق is a deep k; ك is the ordinary k.","ة marks feminine nouns; ء is a glottal stop.","ل + ا = لا. You now know all 28 letters."]
  }
]},
{ id:"vocab", name:"Vocabulary", ru:"الْمُفْرَدَاتُ",
  desc:"Core words for everyday life, fully vowelled, with transliteration and audio.",
  lessons:[
  { id:"v1", title:"Greetings and courtesy", ru:"التَّحِيَّاتُ", kind:"words",
    goal:"Greet people, answer greetings, thank them and say goodbye.",
    learn:[
      "Arabic changes some words depending on whether you're talking to a man or a woman. [[كَيْفَ حَالُكَ؟]] asks a man how he is; [[كَيْفَ حَالُكِ؟]] asks a woman. Only the last vowel changes.",
      "Many greetings come in pairs with a fixed reply. [[السَّلَامُ عَلَيْكُمْ]] is answered [[وَعَلَيْكُمُ السَّلَامُ]]; [[صَبَاحُ الْخَيْرِ]] (morning of goodness) is answered [[صَبَاحُ النُّورِ]] (morning of light).",
      "This course teaches Modern Standard Arabic, used in news, books and formal speech across the Arab world. Everyday speech varies by country, but these greetings are understood everywhere."
    ],
    tip:"[[شُكْرًا]] and [[عَفْوًا]] will get you a long way. [[عَفْوًا]] also works as ‘excuse me’ or ‘pardon?’.",
    items:[["مَرْحَبًا","marḥaban","Hello"],["السَّلَامُ عَلَيْكُمْ","as-salāmu ʿalaykum","Peace be upon you (hello)","the most common greeting"],["وَعَلَيْكُمُ السَّلَامُ","wa-ʿalaykumu s-salām","And upon you be peace","the reply"],["صَبَاحُ الْخَيْرِ","ṣabāḥu l-khayr","Good morning"],["صَبَاحُ النُّورِ","ṣabāḥu n-nūr","Good morning (reply)"],["مَسَاءُ الْخَيْرِ","masāʾu l-khayr","Good evening"],["مَعَ السَّلَامَةِ","maʿa s-salāma","Goodbye"],["شُكْرًا","shukran","Thank you"],["عَفْوًا","ʿafwan","You're welcome / Excuse me"],["مِنْ فَضْلِكَ","min faḍlika","Please","to a man; to a woman: مِنْ فَضْلِكِ"],["نَعَمْ","naʿam","Yes"],["لَا","lā","No"],["كَيْفَ حَالُكَ؟","kayfa ḥāluka","How are you?","to a man; to a woman: كَيْفَ حَالُكِ؟"],["بِخَيْرٍ، شُكْرًا","bi-khayrin, shukran","Fine, thanks"]],
    examples:[["السَّلَامُ عَلَيْكُمْ! — وَعَلَيْكُمُ السَّلَامُ.","Hello! — Hello to you."],["صَبَاحُ الْخَيْرِ يَا أَحْمَدُ، كَيْفَ حَالُكَ؟","Good morning, Ahmad, how are you?"],["بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟","Fine, thanks. And you?"],["شُكْرًا جَزِيلًا! — عَفْوًا.","Thank you very much! — You're welcome."],["مَعَ السَّلَامَةِ!","Goodbye!"]],
    recap:["Greetings come in pairs: learn the reply with each one.","Words for ‘you’ change for a man (-ka) or a woman (-ki).","[[شُكْرًا]] thank you; [[عَفْوًا]] you're welcome."]
  },
  { id:"v2", title:"Numbers 0 to 10", ru:"الْأَرْقَامُ", kind:"words",
    goal:"Count to ten and read both kinds of digits.",
    learn:[
      "Many Arab countries write numbers with these digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩. Others use the 0–9 you know. Either way, numbers are written left to right, even inside right-to-left text.",
      "Numbers 3 to 10 take the opposite gender to the noun they count: a masculine noun gets the form ending in [[ة]]. You'll see this in examples; don't worry about it yet.",
      "English ‘zero’ comes from Arabic [[صِفْر]], by way of Latin."
    ],
    items:[["صِفْر","ṣifr","0","٠"],["وَاحِد","wāḥid","1","١"],["اِثْنَان","ithnān","2","٢"],["ثَلَاثَة","thalātha","3","٣"],["أَرْبَعَة","arbaʿa","4","٤"],["خَمْسَة","khamsa","5","٥"],["سِتَّة","sitta","6","٦"],["سَبْعَة","sabʿa","7","٧"],["ثَمَانِيَة","thamāniya","8","٨"],["تِسْعَة","tisʿa","9","٩"],["عَشَرَة","ʿashara","10","١٠"]],
    examples:[["قَهْوَةٌ وَاحِدَةٌ، مِنْ فَضْلِكَ.","One coffee, please."],["عِنْدِي ثَلَاثَةُ أَوْلَادٍ.","I have three children."],["بِكَمْ هٰذَا؟ — بِخَمْسَةِ دَرَاهِمَ.","How much is this? — Five dirhams."],["رَقْمُ الْغُرْفَةِ عَشَرَةٌ.","The room number is ten."]],
    recap:["0–10: صفر، واحد، اثنان، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة.","Arabic digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩, written left to right.","3–10 take the opposite gender to the noun."]
  },
  { id:"v3", title:"Family", ru:"الْعَائِلَةُ", kind:"words",
    goal:"Name family members and say ‘my’.",
    learn:[
      "‘My’ is an ending, [[ـي]] (-ī), added to the noun: [[أُمِّي]] (my mother), [[بِنْتِي]] (my daughter).",
      "A few words lengthen before the ending: [[أَبِي]] (my father), [[أَخِي]] (my brother).",
      "When a word ends in [[ة]], it turns into [[ت]] before an ending: [[زَوْجَة]] → [[زَوْجَتِي]] (my wife)."
    ],
    items:[["عَائِلَة","ʿāʾila","family"],["أُمّ","umm","mother"],["أَب","ab","father"],["اِبْن","ibn","son"],["بِنْت","bint","daughter, girl"],["أَخ","akh","brother"],["أُخْت","ukht","sister"],["زَوْج","zawj","husband"],["زَوْجَة","zawja","wife"],["أَوْلَاد","awlād","children"],["جَدّ","jadd","grandfather"],["جَدَّة","jadda","grandmother"]],
    examples:[["هٰذِهِ عَائِلَتِي.","This is my family."],["هٰذَا أَخِي، وَهٰذِهِ أُخْتِي.","This is my brother, and this is my sister."],["عِنْدِي اِبْنٌ وَبِنْتٌ.","I have a son and a daughter."],["اِسْمُ أُمِّي فَاطِمَةُ.","My mother's name is Fatima."]],
    recap:["‘My’ = ending ـي: [[أُمِّي]].","[[أَبِي]], [[أَخِي]] lengthen before the ending.","ة becomes ت before an ending: [[زَوْجَتِي]]."]
  },
  { id:"v4", title:"Food and drink", ru:"الطَّعَامُ وَالشَّرَابُ", kind:"words",
    goal:"Order food and drink and ask for the bill.",
    learn:[
      "[[أُرِيدُ]] (I want) plus the item is the simplest way to order. Add [[مِنْ فَضْلِكَ]] or [[لَوْ سَمَحْتَ]] (if you allow) to be polite.",
      "‘The’ is [[الْ]] (al-), joined to the front of the word: [[قَهْوَة]] → [[الْقَهْوَة]] (the coffee).",
      "‘Without’ is [[بِدُونِ]]: [[شَايٌ بِدُونِ سُكَّرٍ]] (tea without sugar)."
    ],
    items:[["مَاء","māʾ","water"],["خُبْز","khubz","bread"],["شَاي","shāy","tea"],["قَهْوَة","qahwa","coffee"],["حَلِيب","ḥalīb","milk"],["جُبْن","jubn","cheese"],["لَحْم","laḥm","meat"],["سَمَك","samak","fish"],["تُفَّاح","tuffāḥ","apples"],["أَرُزّ","aruzz","rice"],["عَصِير","ʿaṣīr","juice"],["أُرِيدُ…","urīdu","I'd like… / I want…"],["الْحِسَابُ","al-ḥisāb","the bill"]],
    examples:[["أُرِيدُ قَهْوَةً، مِنْ فَضْلِكَ.","I'd like a coffee, please."],["شَايٌ بِدُونِ سُكَّرٍ.","Tea without sugar."],["أَنَا لَا آكُلُ اللَّحْمَ.","I don't eat meat."],["الْحِسَابُ، لَوْ سَمَحْتَ.","The bill, please."]],
    recap:["Order with [[أُرِيدُ]] + item + [[مِنْ فَضْلِكَ]].","‘The’ = [[الْ]] joined to the word.","[[الْحِسَابُ، لَوْ سَمَحْتَ]] for the bill."]
  },
  { id:"v5", title:"Everyday verbs", ru:"الْأَفْعَالُ", kind:"words",
    goal:"Learn eight high-frequency verbs in the ‘he’ and ‘I’ forms.",
    learn:[
      "Arabic dictionaries list verbs in the past tense ‘he’ form: [[كَتَبَ]] (he wrote). For everyday use you need the present, so this lesson gives the present ‘he’ and ‘I’ forms.",
      "The present tense uses a prefix to show who: [[أَ]] for I, [[يَ]] for he, [[تَ]] for you or she, [[نَ]] for we. [[يَعْمَلُ]] he works, [[أَعْمَلُ]] I work.",
      "In speech the final vowel is often dropped: [[أَعْمَلُ]] is usually said aʿmal."
    ],
    items:[["يَتَكَلَّمُ","yatakallamu","he speaks","أَتَكَلَّمُ — I speak"],["يَعْرِفُ","yaʿrifu","he knows","أَعْرِفُ — I know"],["يَفْهَمُ","yafhamu","he understands","أَفْهَمُ — I understand"],["يُرِيدُ","yurīdu","he wants","أُرِيدُ — I want"],["يُحِبُّ","yuḥibbu","he loves, likes","أُحِبُّ — I love"],["يَسْكُنُ","yaskunu","he lives (somewhere)","أَسْكُنُ — I live"],["يَعْمَلُ","yaʿmalu","he works","أَعْمَلُ — I work"],["يَقْرَأُ","yaqraʾu","he reads","أَقْرَأُ — I read"]],
    examples:[["أَنَا لَا أَفْهَمُ.","I don't understand."],["هَلْ تَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ؟","Do you speak English?"],["أَسْكُنُ فِي لَنْدَن.","I live in London."],["أُحِبُّ الْقِرَاءَةَ.","I love reading."],["أُرِيدُ شَايًا.","I'd like some tea."]],
    recap:["Dictionaries list the past ‘he’ form.","Present prefixes: أَ I, يَ he, تَ you / she, نَ we.","[[أُرِيدُ]] and [[أُحِبُّ]] are worth learning first."]
  }
]},
{ id:"grammar", name:"Grammar", ru:"الْقَوَاعِدُ",
  desc:"How Arabic words fit together, one rule at a time.",
  lessons:[
  { id:"g1", title:"No ‘is’, and ‘the’ is al-", ru:"الْجُمْلَةُ الِاسْمِيَّةُ", kind:"grammar",
    goal:"Make simple ‘X is Y’ sentences and use the word for ‘the’.",
    learn:[
      "Arabic has no word for ‘is’ in the present. [[أَنَا طَالِبٌ]] is ‘I student’. [[الْبَيْتُ كَبِيرٌ]] is ‘the house big’.",
      "‘The’ is [[الْ]] (al-), joined to the word. There is no word for ‘a’: [[بَيْتٌ]] means ‘a house’, and the -un ending (a doubled vowel mark) often signals it.",
      "Before 14 ‘sun letters’ (t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n) the l of al- is silent and the next letter doubles: [[الشَّمْس]] is ash-shams. Before the other ‘moon letters’ you say it: [[الْقَمَر]] is al-qamar."
    ],
    table:{h:["Arabic","Literally","Meaning"],r:[["[[أَنَا طَالِبٌ]]","I student","I am a student"],["[[الْبَيْتُ كَبِيرٌ]]","the house big","The house is big"],["[[هٰذَا كِتَابٌ]]","this book","This is a book"]]},
    tip:"[[هٰذَا]] (this, masculine) and [[هٰذِهِ]] (this, feminine) are the quickest way into a sentence: point and say [[هٰذَا كِتَابٌ]], this is a book.",
    examples:[["أَنَا طَالِبٌ.","I am a student."],["هُوَ طَبِيبٌ.","He is a doctor."],["الْبَيْتُ كَبِيرٌ.","The house is big."],["أَيْنَ الْبَنْكُ؟ — الْبَنْكُ هُنَاكَ.","Where is the bank? — The bank is over there."],["هٰذَا كِتَابٌ.","This is a book."]],
    quiz:[
      {p:"How do you say ‘I am a doctor’?", o:["أَنَا طَبِيبٌ.","أَنَا هُوَ طَبِيبٌ.","طَبِيبٌ يَكُونُ أَنَا.","أَنَا الطَّبِيبُ يَكُونُ."], a:0, ruo:true, x:"No verb ‘to be’ in the present: just ‘I doctor’."},
      {p:"What does this mean?", ru:"الْبَيْتُ كَبِيرٌ.", o:["The house is big.","A big house.","The big house.","Is the house big?"], a:0, x:"‘The house’ + ‘big’, with no ‘is’ needed."},
      {p:"How is الشَّمْس (the sun) said?", o:["ash-shams","al-shams","a-shams","el-shams"], a:0, x:"ش is a sun letter: the l of al- is silent and the ش doubles."},
      {p:"Which word means ‘this’ for a feminine noun?", o:["هٰذِهِ","هٰذَا","هُوَ","هُنَا"], a:0, ruo:true, x:"[[هٰذِهِ]] for feminine, [[هٰذَا]] for masculine."}
    ],
    recap:["No ‘is’ in the present: [[أَنَا طَالِبٌ]].","‘The’ = [[الْ]]; there is no ‘a’.","Sun letters swallow the l: ash-shams."]
  },
  { id:"g2", title:"Masculine and feminine", ru:"الْمُذَكَّرُ وَالْمُؤَنَّثُ", kind:"grammar",
    goal:"Recognise feminine nouns and make adjectives agree.",
    learn:[
      "Arabic has two genders. Most feminine nouns end in [[ة]]: [[مَدِينَة]] (city), [[سَيَّارَة]] (car). Most others are masculine: [[بَيْت]] (house), [[كِتَاب]] (book).",
      "Some feminine nouns have no ة: [[أُمّ]] (mother), [[شَمْس]] (sun), and most country names.",
      "Adjectives come **after** the noun and agree with it: add [[ة]] for feminine. [[بَيْتٌ كَبِيرٌ]] (a big house), [[مَدِينَةٌ كَبِيرَةٌ]] (a big city).",
      "Plurals of things (not people) count as feminine singular: [[الْكُتُبُ جَدِيدَةٌ]] (the books are new)."
    ],
    table:{h:["","Masculine","Feminine"],r:[["a big …","[[بَيْتٌ كَبِيرٌ]]","[[مَدِينَةٌ كَبِيرَةٌ]]"],["a new …","[[كِتَابٌ جَدِيدٌ]]","[[سَيَّارَةٌ جَدِيدَةٌ]]"],["this …","[[هٰذَا بَيْتٌ]]","[[هٰذِهِ مَدِينَةٌ]]"]]},
    items:[["بَيْت","house · masculine"],["كِتَاب","book · masculine"],["مَدِينَة","city · feminine"],["سَيَّارَة","car · feminine"],["أُمّ","mother · feminine, no ة"],["شَمْس","sun · feminine, no ة"],["كَبِير، كَبِيرَة","big · masculine, feminine"],["جَدِيد، جَدِيدَة","new · masculine, feminine"]],
    examples:[["هٰذَا بَيْتٌ كَبِيرٌ.","This is a big house."],["هٰذِهِ سَيَّارَةٌ جَدِيدَةٌ.","This is a new car."],["الْمَدِينَةُ جَمِيلَةٌ.","The city is beautiful."],["الشَّمْسُ حَارَّةٌ.","The sun is hot."]],
    quiz:[
      {p:"What gender is this noun?", ru:"مَدِينَة", o:["Feminine","Masculine"], a:0, x:"It ends in ة."},
      {p:"What gender is this noun?", ru:"كِتَاب", o:["Masculine","Feminine"], a:0, x:"No ة, and not one of the exceptions."},
      {p:"‘a big city’", o:["مَدِينَةٌ كَبِيرَةٌ","مَدِينَةٌ كَبِيرٌ","كَبِيرَةٌ مَدِينَةٌ","كَبِيرٌ مَدِينَةٌ"], a:0, ruo:true, x:"Adjective after the noun, with ة to agree."},
      {p:"What gender is شَمْس (sun)?", o:["Feminine","Masculine"], a:0, x:"Feminine, even without ة."}
    ],
    recap:["ة usually means feminine.","Adjectives follow the noun and agree.","Non-human plurals take feminine singular adjectives."]
  },
  { id:"g3", title:"Present tense verbs", ru:"الْفِعْلُ الْمُضَارِعُ", kind:"grammar",
    goal:"Use the present tense with every pronoun.",
    learn:[
      "The present tense adds prefixes, and sometimes endings, to a stem. Here is [[يَكْتُبُ]] (he writes).",
      "Arabic has separate words for ‘you’ to a man, [[أَنْتَ]], and to a woman, [[أَنْتِ]]. The verb changes too: [[تَكْتُبُ]] and [[تَكْتُبِينَ]].",
      "‘You’ (to a man) and ‘she’ share a form: [[تَكْتُبُ]]. Context tells them apart.",
      "There are also forms for exactly two people. You'll recognise them later; this table shows the everyday ones."
    ],
    table:{h:["Person","Pronoun","writes"],r:[["I","[[أَنَا]]","[[أَكْتُبُ]]"],["you (m)","[[أَنْتَ]]","[[تَكْتُبُ]]"],["you (f)","[[أَنْتِ]]","[[تَكْتُبِينَ]]"],["he","[[هُوَ]]","[[يَكْتُبُ]]"],["she","[[هِيَ]]","[[تَكْتُبُ]]"],["we","[[نَحْنُ]]","[[نَكْتُبُ]]"],["you (plural)","[[أَنْتُمْ]]","[[تَكْتُبُونَ]]"],["they","[[هُمْ]]","[[يَكْتُبُونَ]]"]]},
    items:[["أَنَا أَكْتُبُ","I write"],["أَنْتَ تَكْتُبُ","you write (to a man)"],["أَنْتِ تَكْتُبِينَ","you write (to a woman)"],["هُوَ يَكْتُبُ","he writes"],["هِيَ تَكْتُبُ","she writes"],["نَحْنُ نَكْتُبُ","we write"],["أَنْتُمْ تَكْتُبُونَ","you write (plural)"],["هُمْ يَكْتُبُونَ","they write"]],
    examples:[["أَنَا أَكْتُبُ رِسَالَةً.","I'm writing a letter."],["هَلْ تَتَكَلَّمِينَ الْعَرَبِيَّةَ؟","Do you speak Arabic? (to a woman)"],["هُمْ يَعْمَلُونَ فِي لَنْدَن.","They work in London."],["نَحْنُ نَدْرُسُ الْعَرَبِيَّةَ.","We are studying Arabic."]],
    quiz:[
      {p:"هُمْ ___ (they write)", o:["يَكْتُبُونَ","يَكْتُبُ","تَكْتُبُونَ","نَكْتُبُ"], a:0, ruo:true, x:"‘They’: prefix يَـ and ending ـونَ."},
      {p:"أَنَا ___ (I work)", o:["أَعْمَلُ","يَعْمَلُ","تَعْمَلُ","نَعْمَلُ"], a:0, ruo:true, x:"‘I’ takes the prefix أَ."},
      {p:"Which pronoun is ‘you’ to a woman?", o:["أَنْتِ","أَنْتَ","أَنْتُمْ","هِيَ"], a:0, ruo:true, x:"[[أَنْتِ]] ends in kasra (-ti)."},
      {p:"Which prefix marks ‘we’?", o:["نَـ","أَ","يَـ","تَـ"], a:0, ruo:true, x:"[[نَحْنُ نَكْتُبُ]]: we write."}
    ],
    recap:["Prefixes: أَ I, تَ you / she, يَ he, نَ we.","‘You’ differs for a man and a woman.","Plural ‘you’ and ‘they’ add ـونَ."]
  },
  { id:"g4", title:"My, your, his: possessive endings", ru:"الضَّمَائِرُ الْمُتَّصِلَةُ", kind:"grammar",
    goal:"Say whose something is with endings on the noun.",
    learn:[
      "Arabic says ‘my’, ‘your’ and ‘his’ with endings joined to the noun: [[كِتَابِي]] (my book), [[كِتَابُهُ]] (his book).",
      "A noun with one of these endings is already definite, so it never takes [[الْ]] as well.",
      "[[ة]] becomes [[ت]] before an ending: [[سَيَّارَة]] → [[سَيَّارَتِي]] (my car).",
      "The same endings join [[عِنْدَ]] (at) to say ‘I have’. See Structure, lesson 4."
    ],
    table:{h:["Owner","Ending","Example"],r:[["my","[[ـِي]]","[[كِتَابِي]]"],["your (m)","[[ـكَ]]","[[كِتَابُكَ]]"],["your (f)","[[ـكِ]]","[[كِتَابُكِ]]"],["his","[[ـهُ]]","[[كِتَابُهُ]]"],["her","[[ـهَا]]","[[كِتَابُهَا]]"],["our","[[ـنَا]]","[[كِتَابُنَا]]"],["your (pl)","[[ـكُمْ]]","[[كِتَابُكُمْ]]"],["their","[[ـهُمْ]]","[[كِتَابُهُمْ]]"]]},
    items:[["كِتَابِي","my book"],["كِتَابُكَ","your book (to a man)"],["كِتَابُكِ","your book (to a woman)"],["كِتَابُهُ","his book"],["كِتَابُهَا","her book"],["كِتَابُنَا","our book"],["كِتَابُكُمْ","your book (plural)"],["كِتَابُهُمْ","their book"]],
    examples:[["هٰذَا بَيْتِي.","This is my house."],["مَا اسْمُكَ؟","What's your name? (to a man)"],["مَا اسْمُكِ؟","What's your name? (to a woman)"],["سَيَّارَتُهَا جَدِيدَةٌ.","Her car is new."]],
    quiz:[
      {p:"‘my book’", o:["كِتَابِي","الْكِتَابِي","كِتَابُهُ","كِتَابُكَ"], a:0, ruo:true, x:"Add ـي, and no الْ."},
      {p:"‘his house’", o:["بَيْتُهُ","بَيْتُهَا","بَيْتِي","بَيْتُنَا"], a:0, ruo:true, x:"ـهُ = his; ـهَا = her."},
      {p:"‘my car’ (سَيَّارَة)", o:["سَيَّارَتِي","سَيَّارَةِي","سَيَّارِي","السَّيَّارَتِي"], a:0, ruo:true, x:"ة becomes ت before the ending."},
      {p:"Who is مَا اسْمُكِ؟ asked to?", o:["A woman","A man","A group","Nobody: it means ‘my name’"], a:0, x:"ـكِ (-ki) is ‘your’ to a woman."}
    ],
    recap:["Possessive endings join the noun: ـي ـكَ ـكِ ـهُ ـهَا ـنَا ـكُمْ ـهُمْ.","No الْ with a possessive ending.","ة → ت before an ending."]
  },
  { id:"g5", title:"Three-letter roots", ru:"الْجُذُورُ", kind:"grammar",
    goal:"Spot the root inside a word and use it to guess related words.",
    learn:[
      "Most Arabic words are built on a **root** of three consonants that carries a core meaning. Vowels and extra letters around the root make related words.",
      "The root ك ت ب (k-t-b) is about writing: [[كَتَبَ]] he wrote, [[كِتَاب]] book, [[كَاتِب]] writer, [[مَكْتَب]] office or desk, [[مَكْتَبَة]] library.",
      "The prefix [[مَـ]] often marks a place: [[مَكْتَب]] (place of writing), [[مَدْرَسَة]] (place of studying: school), [[مَطْبَخ]] (place of cooking: kitchen).",
      "Once you spot roots, every word you learn helps you guess others."
    ],
    items:[["كَتَبَ","he wrote · k-t-b"],["كِتَاب","book · k-t-b"],["كَاتِب","writer · k-t-b"],["مَكْتَب","office, desk · k-t-b"],["مَكْتَبَة","library, bookshop · k-t-b"],["دَرَسَ","he studied · d-r-s"],["دَرْس","lesson · d-r-s"],["مَدْرَسَة","school · d-r-s"],["مُدَرِّس","teacher · d-r-s"]],
    examples:[["الْكَاتِبُ فِي الْمَكْتَبَةِ.","The writer is in the library."],["الْمُدَرِّسُ فِي الْمَدْرَسَةِ.","The teacher is at school."],["كَتَبْتُ رِسَالَةً.","I wrote a letter."]],
    quiz:[
      {p:"Which word shares the root of كِتَاب (book)?", o:["مَكْتَب","مَدْرَسَة","قَلَم","بَيْت"], a:0, ruo:true, x:"[[مَكْتَب]] has ك ت ب."},
      {p:"مَدْرَسَة is a place of…", o:["studying","writing","cooking","sleeping"], a:0, x:"مَـ (place) + د ر س (study)."},
      {p:"What does the prefix مَـ often mean?", o:["a place","a person","the past","a plural"], a:0, x:"[[مَكْتَب]], [[مَدْرَسَة]], [[مَطْبَخ]] are all places."}
    ],
    recap:["Three consonants carry the core meaning.","ك ت ب = writing; د ر س = studying.","مَـ often marks a place."]
  }
]},
{ id:"structure", name:"Structure", ru:"تَرْكِيبُ الْجُمْلَةِ",
  desc:"How to build Arabic sentences: word order, questions, negatives and saying what you have.",
  lessons:[
  { id:"s1", title:"Two kinds of sentence", ru:"الْاسْمِيَّةُ وَالْفِعْلِيَّةُ", kind:"grammar",
    goal:"Read sentences that start with a noun and sentences that start with a verb.",
    learn:[
      "Arabic sentences come in two shapes. A **nominal** sentence starts with a noun: [[الْوَلَدُ يَقْرَأُ]] (the boy is reading).",
      "A **verbal** sentence starts with the verb: [[يَقْرَأُ الْوَلَدُ]]. Both mean the same. News and books use verb-first a lot, so expect it when you read.",
      "When the verb comes first it stays singular, even with a plural subject: [[يَعْمَلُ الْمُهَنْدِسُونَ]] (the engineers work). It still matches gender: [[تَعْمَلُ الْمُهَنْدِسَةُ]].",
      "Adjectives always follow their noun: [[بَيْتٌ كَبِيرٌ]]."
    ],
    examples:[["الْوَلَدُ يَقْرَأُ كِتَابًا.","The boy is reading a book."],["يَقْرَأُ الْوَلَدُ كِتَابًا.","The boy is reading a book. (verb first)"],["ذَهَبَ الرَّئِيسُ إِلَى الْقَاهِرَةِ.","The president went to Cairo."],["تَعْمَلُ أُخْتِي فِي مُسْتَشْفًى.","My sister works in a hospital."]],
    quiz:[
      {p:"Which is a verbal (verb-first) sentence?", o:["يَقْرَأُ الْوَلَدُ.","الْوَلَدُ يَقْرَأُ."], a:0, ruo:true, x:"It starts with the verb [[يَقْرَأُ]]."},
      {p:"Where do adjectives go?", o:["After the noun","Before the noun","At the end of the sentence"], a:0, x:"[[بَيْتٌ كَبِيرٌ]]: house, then big."},
      {p:"In ‘يَعْمَلُ الْمُهَنْدِسُونَ’, why is the verb singular?", o:["It comes before its subject","It's a mistake","‘Engineers’ is singular","It's in the past"], a:0, x:"A verb before its subject stays singular."}
    ],
    recap:["Nominal: noun first. Verbal: verb first.","Verb-first is common in news and books.","A verb before its subject stays singular."]
  },
  { id:"s2", title:"Asking questions", ru:"الْأَسْئِلَةُ", kind:"grammar",
    goal:"Ask yes/no questions and use the main question words.",
    learn:[
      "For a yes/no question, put [[هَلْ]] at the start of a normal sentence: [[هَلْ أَنْتَ طَالِبٌ؟]] (are you a student?).",
      "Question words also go first. [[مَا]] (what) is used before nouns, [[مَاذَا]] before verbs: [[مَا هٰذَا؟]], [[مَاذَا تُرِيدُ؟]].",
      "Arabic uses a reversed question mark: ؟"
    ],
    items:[["هَلْ","yes/no question marker"],["مَنْ","who"],["مَا","what (before a noun)"],["مَاذَا","what (before a verb)"],["أَيْنَ","where"],["مَتَى","when"],["لِمَاذَا","why"],["كَيْفَ","how"],["كَمْ","how many, how much"]],
    examples:[["هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟","Do you speak Arabic?"],["مَا هٰذَا؟","What is this?"],["مَاذَا تُرِيدُ؟","What do you want?"],["أَيْنَ الْمَحَطَّةُ؟","Where is the station?"],["كَمْ عُمْرُكَ؟","How old are you?"]],
    quiz:[
      {p:"Turn ‘أَنْتَ طَالِبٌ’ (you're a student) into a question.", o:["هَلْ أَنْتَ طَالِبٌ؟","مَا أَنْتَ طَالِبٌ؟","أَنْتَ هَلْ طَالِبٌ؟","طَالِبٌ أَنْتَ هَلْ؟"], a:0, ruo:true, x:"Put [[هَلْ]] at the start."},
      {p:"‘What do you want?’", o:["مَاذَا تُرِيدُ؟","مَنْ تُرِيدُ؟","أَيْنَ تُرِيدُ؟","كَمْ تُرِيدُ؟"], a:0, ruo:true, x:"[[مَاذَا]] before a verb."},
      {p:"What does أَيْنَ mean?", o:["where","when","why","who"], a:0, x:"[[أَيْنَ]] = where."}
    ],
    recap:["[[هَلْ]] turns a statement into a yes/no question.","[[مَا]] before nouns, [[مَاذَا]] before verbs.","Arabic question mark: ؟"]
  },
  { id:"s3", title:"Saying no", ru:"النَّفْيُ", kind:"grammar",
    goal:"Negate verbs and verbless sentences.",
    learn:[
      "To negate a present-tense verb, put [[لَا]] in front: [[لَا أَعْرِفُ]] (I don't know).",
      "For sentences without a verb (‘X is Y’), use [[لَيْسَ]] (is not). It changes with the person: [[لَسْتُ طَالِبًا]] (I'm not a student), [[لَيْسَ هُنَا]] (he isn't here), [[لَيْسَتْ هُنَا]] (she isn't here).",
      "After [[لَيْسَ]] the noun or adjective takes an -an ending: [[طَالِبٌ]] → [[لَسْتُ طَالِبًا]].",
      "For the past, newspapers use [[لَمْ]] + a present form: [[لَمْ يَذْهَبْ]] (he didn't go). You'll meet it in the Reader."
    ],
    examples:[["لَا أَعْرِفُ.","I don't know."],["لَا أَفْهَمُ.","I don't understand."],["لَسْتُ طَالِبًا.","I'm not a student."],["هُوَ لَيْسَ هُنَا.","He isn't here."],["لَمْ يَذْهَبْ إِلَى الْعَمَلِ.","He didn't go to work."]],
    quiz:[
      {p:"‘I don't know’", o:["لَا أَعْرِفُ.","لَيْسَ أَعْرِفُ.","أَعْرِفُ لَا.","لَا أَنَا أَعْرِفُ."], a:0, ruo:true, x:"[[لَا]] before a present verb."},
      {p:"‘I'm not a student’", o:["لَسْتُ طَالِبًا.","لَا أَنَا طَالِبٌ.","أَنَا لَا طَالِبٌ.","طَالِبٌ لَيْسَ أَنَا."], a:0, ruo:true, x:"[[لَيْسَ]] in its ‘I’ form, [[لَسْتُ]], for verbless sentences."},
      {p:"Which word negates sentences without a verb?", o:["لَيْسَ","لَا","لَمْ","هَلْ"], a:0, ruo:true, x:"[[لَيْسَ]] = is not."}
    ],
    recap:["[[لَا]] + present verb.","[[لَيْسَ]] for ‘is not’; it changes with the person.","[[لَمْ]] + present form = didn't."]
  },
  { id:"s4", title:"Saying ‘I have’", ru:"عِنْدِي", kind:"grammar",
    goal:"Say what you and others have, and don't have.",
    learn:[
      "Arabic has no everyday verb ‘to have’. It says ‘at me’: [[عِنْدِي]] (I have).",
      "Add the possessive endings to [[عِنْدَ]] to change the owner. The table shows each one.",
      "For ‘I don't have’, put [[لَيْسَ]] in front: [[لَيْسَ عِنْدِي وَقْتٌ]] (I don't have time)."
    ],
    table:{h:["Who has it","Arabic"],r:[["I","[[عِنْدِي]]"],["you (m)","[[عِنْدَكَ]]"],["you (f)","[[عِنْدَكِ]]"],["he","[[عِنْدَهُ]]"],["she","[[عِنْدَهَا]]"],["we","[[عِنْدَنَا]]"],["you (plural)","[[عِنْدَكُمْ]]"],["they","[[عِنْدَهُمْ]]"]]},
    items:[["عِنْدِي","I have"],["عِنْدَكَ","you have (to a man)"],["عِنْدَكِ","you have (to a woman)"],["عِنْدَهُ","he has"],["عِنْدَهَا","she has"],["عِنْدَنَا","we have"],["عِنْدَكُمْ","you have (plural)"],["عِنْدَهُمْ","they have"]],
    examples:[["عِنْدِي أَخٌ.","I have a brother."],["هَلْ عِنْدَكَ وَقْتٌ؟","Do you have time? (to a man)"],["عِنْدَنَا بَيْتٌ كَبِيرٌ.","We have a big house."],["لَيْسَ عِنْدِي وَقْتٌ.","I don't have time."],["لَيْسَ عِنْدَهَا سَيَّارَةٌ.","She doesn't have a car."]],
    quiz:[
      {p:"‘We have a car’", o:["عِنْدَنَا سَيَّارَةٌ.","نَحْنُ عِنْدَ سَيَّارَةٌ.","عِنْدِي سَيَّارَةٌ.","سَيَّارَةٌ نَحْنُ عِنْدَ."], a:0, ruo:true, x:"[[عِنْدَ]] + ـنَا (our)."},
      {p:"What does عِنْدَهَا mean?", o:["she has","he has","they have","I have"], a:0, x:"ـهَا = her."},
      {p:"‘I don't have time’", o:["لَيْسَ عِنْدِي وَقْتٌ.","عِنْدِي لَيْسَ وَقْتٌ.","لَا أَنَا عِنْدِي وَقْتٌ.","عِنْدِي وَقْتٌ لَا."], a:0, ruo:true, x:"[[لَيْسَ]] before [[عِنْدِي]]."}
    ],
    recap:["‘I have’ = [[عِنْدِي]], literally ‘at me’.","Swap the ending to change the owner.","‘I don't have’ = [[لَيْسَ عِنْدِي]]."]
  }
]},
{ id:"idioms", name:"Expressions", ru:"تَعَابِيرُ",
  desc:"Everyday expressions and proverbs, with literal meanings so they stick.",
  lessons:[
  { id:"i1", title:"Everyday expressions", ru:"تَعَابِيرُ يَوْمِيَّةٌ", kind:"idioms",
    goal:"Recognise and use the expressions you'll hear in almost every conversation.",
    learn:[
      "Many everyday expressions mention God, [[اللّٰه]]. Arabic speakers of every faith use them, much as English speakers say ‘goodbye’ (originally ‘God be with you’).",
      "Learn the replies too: [[كَيْفَ حَالُكَ؟]] is very often answered [[الْحَمْدُ لِلّٰهِ]]."
    ],
    tip:"[[إِنْ شَاءَ اللّٰهُ]] follows almost any future plan: [[أَرَاكَ غَدًا، إِنْ شَاءَ اللّٰهُ]] (see you tomorrow, God willing).",
    items:[["إِنْ شَاءَ اللّٰهُ","If God wills","Hopefully; said about any future plan"],["مَا شَاءَ اللّٰهُ","What God has willed","Wonderful! Said in admiration"],["الْحَمْدُ لِلّٰهِ","Praise be to God","Thank God; also ‘I'm fine’"],["يَعْنِي","It means","I mean…; a filler word, like ‘well’"],["عَلَى رَأْسِي","On my head","With pleasure; I'll gladly do it"],["بِالْهَنَاءِ وَالشِّفَاءِ","With happiness and health","Enjoy your meal"],["اللّٰهُ يُعْطِيكَ الْعَافِيَةَ","May God give you strength","Well done; said to someone working"],["كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ","Every year may you be well","Happy holidays; many happy returns"]],
    examples:[["أَرَاكَ غَدًا، إِنْ شَاءَ اللّٰهُ.","See you tomorrow, hopefully."],["كَيْفَ حَالُكَ؟ — الْحَمْدُ لِلّٰهِ.","How are you? — Fine, thank God."],["بَيْتُكَ جَمِيلٌ، مَا شَاءَ اللّٰهُ!","Your house is beautiful, wonderful!"]],
    recap:["[[إِنْ شَاءَ اللّٰهُ]] with future plans.","[[الْحَمْدُ لِلّٰهِ]] answers ‘how are you?’.","[[مَا شَاءَ اللّٰهُ]] to admire something."]
  },
  { id:"i2", title:"Proverbs", ru:"أَمْثَالٌ", kind:"idioms",
    goal:"Learn proverbs you'll meet in speeches, columns and conversation.",
    learn:[
      "Arabic proverbs are often short and balanced, with a rhyme or echo: [[مَنْ جَدَّ وَجَدَ]] (whoever strives, finds).",
      "You'll hear them in speeches, newspaper columns and family conversation."
    ],
    items:[["الصَّبْرُ مِفْتَاحُ الْفَرَجِ","Patience is the key to relief","Good things come to those who wait"],["الْوَقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ","Time is like a sword: if you don't cut it, it cuts you","Use your time well, or it uses you"],["مَنْ جَدَّ وَجَدَ","Whoever strives, finds","Hard work pays off"],["الْجَارُ قَبْلَ الدَّارِ","The neighbour before the house","Choose your neighbours before your home"],["لِكُلِّ جَوَادٍ كَبْوَةٌ","Every fine horse stumbles","Everyone makes mistakes"],["يَدٌ وَاحِدَةٌ لَا تُصَفِّقُ","One hand can't clap","It takes teamwork"],["الْعَقْلُ السَّلِيمُ فِي الْجِسْمِ السَّلِيمِ","A sound mind in a sound body","Look after body and mind"],["مَنْ طَلَبَ الْعُلَا سَهِرَ اللَّيَالِي","Whoever seeks the heights stays up at night","Success takes effort"]],
    recap:["Proverbs are short and balanced: [[مَنْ جَدَّ وَجَدَ]].","[[الصَّبْرُ مِفْتَاحُ الْفَرَجِ]]: patience pays.","[[لِكُلِّ جَوَادٍ كَبْوَةٌ]]: everyone slips."]
  }
]},
{ id:"reader", name:"Reader", ru:"الْقِرَاءَةُ", desc:"Read real Arabic: poems, stories, news. Tap any word for its meaning, reveal translations sentence by sentence, and listen as you read." },
{ id:"review", name:"Review", ru:"الْمُرَاجَعَةُ", desc:"Flashcards drawn from your lessons. Hear each word, say it, then check the meaning." }
];

/* ---------- reader library (built in) ---------- */
const READER_TEXTS: any[] = [
{ id:"r-family", builtin:true, title:"عَائِلَتِي", titleEn:"My family", level:"A1", source:"Graded reader, written for this course",
  sentences:[["اِسْمِي أَحْمَدُ.","My name is Ahmad."],["أَسْكُنُ فِي الْقَاهِرَةِ.","I live in Cairo."],["عِنْدِي عَائِلَةٌ كَبِيرَةٌ.","I have a big family."],["اِسْمُ زَوْجَتِي مَرْيَمُ.","My wife's name is Maryam."],["هِيَ تَعْمَلُ فِي مَدْرَسَةٍ.","She works in a school."],["عِنْدَنَا اِبْنٌ وَبِنْتٌ.","We have a son and a daughter."],["فِي الْمَسَاءِ نَأْكُلُ مَعًا.","In the evening we eat together."]],
  gloss:[["اِسْمِي","اِسْم","my name","اسم + ـي (my)"],["أَحْمَدُ","أَحْمَد","Ahmad",""],["أَسْكُنُ","سَكَنَ","I live","present, I form"],["فِي","فِي","in",""],["الْقَاهِرَةِ","الْقَاهِرَة","Cairo",""],["عِنْدِي","عِنْدَ","I have","literally ‘at me’"],["عَائِلَةٌ","عَائِلَة","family","feminine"],["كَبِيرَةٌ","كَبِير","big","feminine, agrees with عائلة"],["اِسْمُ","اِسْم","name","‘the name of’"],["زَوْجَتِي","زَوْجَة","my wife","ة becomes ت before ـي"],["مَرْيَمُ","مَرْيَم","Maryam",""],["هِيَ","هِيَ","she",""],["تَعْمَلُ","عَمِلَ","works","present, she form"],["مَدْرَسَةٍ","مَدْرَسَة","school","after فِي"],["عِنْدَنَا","عِنْدَ","we have","‘at us’"],["اِبْنٌ","اِبْن","son",""],["وَبِنْتٌ","بِنْت","and a daughter","وَ (and) joins the next word"],["الْمَسَاءِ","مَسَاء","evening","فِي الْمَسَاءِ = in the evening"],["نَأْكُلُ","أَكَلَ","we eat","present, we form"],["مَعًا","مَعًا","together",""]]
},
{ id:"r-cafe", builtin:true, title:"فِي الْمَقْهَى", titleEn:"At the café", level:"A1", source:"Graded dialogue, written for this course",
  sentences:[["— مَرْحَبًا! مَاذَا تُرِيدُ؟","Hello! What would you like?"],["— أُرِيدُ قَهْوَةً بِالْحَلِيبِ، مِنْ فَضْلِكَ.","I'd like a coffee with milk, please."],["— كَبِيرَةٌ أَمْ صَغِيرَةٌ؟","Large or small?"],["— صَغِيرَةٌ، شُكْرًا. وَقِطْعَةَ كَعْكٍ أَيْضًا.","Small, thanks. And a piece of cake too."],["— حَاضِرٌ. هَلْ تُرِيدُ شَيْئًا آخَرَ؟","Certainly. Would you like anything else?"],["— لَا، شُكْرًا. كَمِ الْحِسَابُ؟","No, thank you. How much is the bill?"],["— عِشْرُونَ دِرْهَمًا.","Twenty dirhams."],["— تَفَضَّلْ.","Here you are."]],
  gloss:[["مَرْحَبًا","مَرْحَبًا","hello",""],["مَاذَا","مَاذَا","what","before a verb"],["تُرِيدُ","أَرَادَ","you want","present, you (m) form"],["أُرِيدُ","أَرَادَ","I want","present, I form"],["قَهْوَةً","قَهْوَة","coffee","object ending -an"],["بِالْحَلِيبِ","حَلِيب","with milk","بِـ (with) + الْ (the)"],["مِنْ","مِنْ","from","مِنْ فَضْلِكَ = please"],["فَضْلِكَ","فَضْل","your kindness","مِنْ فَضْلِكَ = please (to a man)"],["كَبِيرَةٌ","كَبِير","big","feminine, agrees with قهوة"],["أَمْ","أَمْ","or","in questions"],["صَغِيرَةٌ","صَغِير","small","feminine"],["شُكْرًا","شُكْرًا","thank you",""],["وَقِطْعَةَ","قِطْعَة","and a piece","وَ (and) joins the word"],["كَعْكٍ","كَعْك","cake",""],["أَيْضًا","أَيْضًا","too, also",""],["حَاضِرٌ","حَاضِر","certainly","literally ‘present, ready’"],["هَلْ","هَلْ","(question marker)","starts a yes/no question"],["شَيْئًا","شَيْء","something, anything","object ending -an"],["آخَرَ","آخَر","other, else",""],["لَا","لَا","no",""],["كَمِ","كَمْ","how much",""],["الْحِسَابُ","حِسَاب","the bill",""],["عِشْرُونَ","عِشْرُونَ","twenty",""],["دِرْهَمًا","دِرْهَم","dirham","singular after numbers 11–99"],["تَفَضَّلْ","تَفَضَّلَ","here you are","to a man; also ‘please, go ahead’"]]
},
{ id:"r-weather", builtin:true, title:"الطَّقْسُ الْيَوْمَ", titleEn:"Today's weather", level:"A2", source:"News-style reader, written for this course",
  sentences:[["الطَّقْسُ الْيَوْمَ مُشْمِسٌ وَحَارٌّ.","The weather today is sunny and hot."],["دَرَجَةُ الْحَرَارَةِ ثَلَاثُونَ دَرَجَةً.","The temperature is thirty degrees."],["فِي الْمَسَاءِ يَكُونُ الْجَوُّ لَطِيفًا.","In the evening the weather will be pleasant."],["غَدًا قَدْ يَسْقُطُ الْمَطَرُ فِي الشَّمَالِ.","Tomorrow there may be rain in the north."]],
  gloss:[["الطَّقْسُ","طَقْس","the weather",""],["الْيَوْمَ","يَوْم","today","literally ‘the day’"],["مُشْمِسٌ","مُشْمِس","sunny","from شَمْس (sun)"],["وَحَارٌّ","حَارّ","and hot",""],["دَرَجَةُ","دَرَجَة","degree","دَرَجَةُ الْحَرَارَةِ = temperature"],["الْحَرَارَةِ","حَرَارَة","heat",""],["ثَلَاثُونَ","ثَلَاثُونَ","thirty",""],["دَرَجَةً","دَرَجَة","degrees","singular after numbers 11–99"],["فِي","فِي","in",""],["الْمَسَاءِ","مَسَاء","evening",""],["يَكُونُ","كَانَ","will be","present of كَانَ (to be), here for the future"],["الْجَوُّ","جَوّ","the weather, the air",""],["لَطِيفًا","لَطِيف","pleasant","-an ending after يَكُونُ"],["غَدًا","غَدًا","tomorrow",""],["قَدْ","قَدْ","may, might","with a present verb"],["يَسْقُطُ","سَقَطَ","falls",""],["الْمَطَرُ","مَطَر","the rain",""],["الشَّمَالِ","شَمَال","the north",""]]
},
{ id:"r-mutanabbi", builtin:true, title:"الْخَيْلُ وَاللَّيْلُ", titleEn:"The horses and the night", level:"B2", source:"Al-Mutanabbi, 10th century · poem, one line",
  sentences:[["الْخَيْلُ وَاللَّيْلُ وَالْبَيْدَاءُ تَعْرِفُنِي","The horses, the night and the desert know me,"],["وَالسَّيْفُ وَالرُّمْحُ وَالْقِرْطَاسُ وَالْقَلَمُ","and the sword, the spear, the paper and the pen."]],
  gloss:[["الْخَيْلُ","خَيْل","horses","a collective noun"],["وَاللَّيْلُ","لَيْل","and the night",""],["وَالْبَيْدَاءُ","بَيْدَاء","and the desert","a literary word"],["تَعْرِفُنِي","عَرَفَ","know me","present + ـنِي (me); feminine singular because the subjects are not people"],["وَالسَّيْفُ","سَيْف","and the sword",""],["وَالرُّمْحُ","رُمْح","and the spear",""],["وَالْقِرْطَاسُ","قِرْطَاس","and the paper","a classical word for paper"],["وَالْقَلَمُ","قَلَم","and the pen",""]]
}
].map(t=>({...t, sentences:t.sentences.map(s=>({ru:s[0],en:s[1]}))}));

export default { L, TABS, READER_TEXTS };
