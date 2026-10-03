// @ts-nocheck
/* Course content. Edit lessons, vocabulary and reader texts here.
   Stress: "+" after a vowel marks it as stressed (Russian). [[text]] makes a tappable, spoken word. **text** is bold. */
const L: any = { code:"ru", name:"Russian", native:"Русский", brand:"Букварь", brandEn:"Russian primer", writeName:"Russian",
  tts:"ru-RU", voiceRe:/^ru([-_]|$)/i, bigLo:true, rtl:false,
  norm:(w: string)=>w, wordRe:"[А-Яа-яЁё+]+(?:-[А-Яа-яЁё+]+)*",
  untitled:"Без назва+ния", pastePh:"Вставьте текст сюда…", sourcePh:"e.g. BBC Russian, 3 Oct",
  sources:`News: <a href="https://www.bbc.com/russian" target="_blank" rel="noopener">BBC News Русская служба</a>. Classic poems and stories: <a href="https://ilibrary.ru" target="_blank" rel="noopener">ilibrary.ru</a>.`,
  prepMarks:`- In "ru" and in every dictionary form, mark the stressed vowel of each word of two or more syllables by writing "+" straight after that vowel, e.g. "приве+т", "молоко+", "ма+ма". Never mark ё (it is always stressed). Leave one-syllable words unmarked.`,
  formRule:'lowercase, with no "+"', explainMarks:"Mark stress with an acute accent on Russian words of two or more syllables."
};

/* ---------- course content ---------- */
const TABS: any[] = [
{ id:"alphabet", name:"Alphabet", ru:"Алфави+т",
  desc:"All 33 Cyrillic letters in four lessons. Learning to read first makes every other section easier.",
  lessons:[
  { id:"a1", title:"Familiar friends", ru:"Знако+мые бу+квы", kind:"letters",
    goal:"Read your first Russian words using five letters that look and sound like English.",
    learn:[
      "Russian is written in the Cyrillic alphabet, which has 33 letters. You will learn them in four groups, easiest first.",
      "These five look like English letters and sound almost the same: **А, К, М, О, Т**. With just these you can already read [[ма+ма]] (mum) and [[кот]] (cat).",
      "Every Russian word of two or more syllables has one stressed syllable. In this course it is marked in red: [[ма+ма]]. Normal Russian books leave the mark out, so learn the stress with each word.",
      "Stress changes the letter О. Stressed, it sounds like the ‘o’ in ‘more’. Unstressed, it sounds like ‘a’: [[молоко+]] (milk) is said ‘malako’."
    ],
    tip:"Tap any Russian word in a lesson to hear it. Turn on Slow audio in the top bar when you want to catch each sound.",
    items:[["А","а","a","as in ‘father’","там","there"],["К","к","k","as in ‘kite’, without the puff of air","кот","cat"],["М","м","m","as in ‘map’","ма+ма","mum"],["О","о","o","‘o’ in ‘more’ when stressed; ‘a’ when not","ток","electric current"],["Т","т","t","as in ‘tap’, tongue against the teeth","так","so, like this"]],
    words:[["ма+ма","mum"],["кот","cat"],["там","there"],["так","so, like this"],["как","how"],["мак","poppy"],["а+том","atom"]],
    recap:["А, К, М, О, Т look and sound much like English.","Stress is marked in red. Only one syllable in a word is stressed.","Unstressed О sounds like ‘a’: [[молоко+]] is ‘malako’."]
  },
  { id:"a2", title:"False friends", ru:"Ло+жные друзья+", kind:"letters",
    goal:"Learn the seven letters that look English but sound different. These cause the most misreadings.",
    learn:[
      "These letters look familiar, but your English instincts will mislead you. **В** is ‘v’, **Н** is ‘n’, **Р** is ‘r’, **С** is ‘s’.",
      "**У** is the ‘oo’ in ‘boot’, **Х** is the throaty ‘ch’ in Scottish ‘loch’, and **Е** is ‘ye’ as in ‘yes’.",
      "So the word that looks like ‘PECTOPAH’ is [[рестора+н]], restaurant. Read slowly and say each sound.",
      "Р is rolled: tap the tip of your tongue against the ridge behind your top teeth, as in Spanish or Scottish English."
    ],
    tip:"In [[хорошо+]] only the last О is stressed, so the first two sound like ‘a’: ‘kharasho’.",
    items:[["В","в","v","as in ‘van’","вода+","water"],["Е","е","ye","as in ‘yes’","нет","no"],["Н","н","n","as in ‘net’","нос","nose"],["Р","р","r","rolled with the tongue tip","рот","mouth"],["С","с","s","as in ‘sun’","сок","juice"],["У","у","u","‘oo’ as in ‘boot’","у+тро","morning"],["Х","х","kh","‘ch’ as in Scottish ‘loch’","хорошо+","good"]],
    words:[["рестора+н","restaurant"],["Москва+","Moscow"],["метро+","metro, underground"],["вот","here is"],["текст","text"],["нос","nose"],["у+тро","morning"],["хорошо+","good, fine"]],
    recap:["В v · Е ye · Н n · Р r · С s · У oo · Х kh.","Р is rolled with the tip of the tongue.","When a word looks like nonsense English, read it as Russian sounds: [[рестора+н]]."]
  },
  { id:"a3", title:"New shapes", ru:"Но+вые бу+квы", kind:"letters",
    goal:"Learn the fourteen letters with shapes you have not seen before.",
    learn:[
      "Most of these match a single English sound: **Б** b, **Г** g, **Д** d, **З** z, **И** ee, **Л** l, **П** p, **Ф** f.",
      "Russian has a family of ‘hissing’ sounds that English spells with two letters: **Ж** zh, **Ш** sh, **Щ** shch, **Ч** ch, **Ц** ts.",
      "**Й** is a short ‘y’. It always follows a vowel and makes a glide, as in [[чай]] (tea), said like ‘chai’.",
      "Ж, Ш and Ц are always hard. After them, И sounds closer to the Ы you will meet in the next lesson."
    ],
    tip:"Щ is a long, soft ‘sh’. Say ‘fresh sheets’ quickly and listen to the join in the middle. That is close to [[борщ]].",
    items:[["Б","б","b","as in ‘bank’","банк","bank"],["Г","г","g","as in ‘go’","го+род","city"],["Д","д","d","as in ‘dog’, tongue against the teeth","дом","house"],["Ж","ж","zh","‘s’ as in ‘measure’","жена+","wife"],["З","з","z","as in ‘zoo’","зима+","winter"],["И","и","i","‘ee’ as in ‘meet’","мир","world, peace"],["Й","й","y","‘y’ as in ‘boy’","чай","tea"],["Л","л","l","a dark ‘l’, as in ‘ball’","ла+мпа","lamp"],["П","п","p","as in ‘park’","парк","park"],["Ф","ф","f","as in ‘fun’","фо+то","photo"],["Ц","ц","ts","as in ‘cats’","центр","centre"],["Ч","ч","ch","as in ‘chair’","час","hour"],["Ш","ш","sh","as in ‘shop’, tongue pulled back","шко+ла","school"],["Щ","щ","shch","a long, soft ‘sh’","борщ","borscht"]],
    words:[["приве+т","hi"],["да","yes"],["спаси+бо","thank you"],["пи+цца","pizza"],["шокола+д","chocolate"],["до+ктор","doctor"],["журна+л","magazine"],["футбо+л","football"]],
    recap:["Ж zh · Ш sh · Щ shch · Ч ch · Ц ts: the hissing family.","Й is a short ‘y’ glide after a vowel: [[чай]].","Л is dark, with the tongue low and back."]
  },
  { id:"a4", title:"Vowels and signs", ru:"Гла+сные и зна+ки", kind:"letters",
    goal:"Finish the alphabet: the soft vowels, Ы, and the two silent signs.",
    learn:[
      "Russian vowels come in pairs. The first of each pair is ‘hard’, the second is ‘soft’: it softens the consonant in front of it, or adds a ‘y’ at the start of a word.",
      "Ы has no English match. Say ‘ee’, then pull your tongue back without moving your lips. It is the vowel in [[мы]] (we).",
      "Two letters make no sound of their own. The soft sign **Ь** softens the consonant before it, as in [[день]] (day). The hard sign **Ъ** is rare: it puts a tiny break between sounds, as in [[объе+кт]] (object).",
      "Ё is always stressed. Russians often print it as Е, so you will see [[ёлка]] written ‘елка’."
    ],
    table:{h:["Hard","Soft"],r:[["[[а]]","[[я]]"],["[[о]]","[[ё]]"],["[[у]]","[[ю]]"],["[[э]]","[[е]]"],["[[ы]]","[[и]]"]]},
    items:[["Ё","ё","yo","as in ‘yonder’; always stressed","ёлка","fir tree"],["Э","э","e","as in ‘bet’","э+то","this is"],["Ю","ю","yu","as in ‘you’","юг","south"],["Я","я","ya","as in ‘yard’","я","I"],["Ы","ы","y","‘ee’ with the tongue pulled back","мы","we"],["Ь","ь","soft sign","no sound; softens the consonant before it","день","day",""],["Ъ","ъ","hard sign","no sound; a tiny break between sounds","объе+кт","object",""]],
    words:[["я+блоко","apple"],["вы","you (formal / plural)"],["сын","son"],["ночь","night"],["мать","mother"],["семья+","family"],["подъе+зд","entrance hall"]],
    recap:["Vowel pairs: А/Я, О/Ё, У/Ю, Э/Е, Ы/И.","The second vowel of each pair softens the consonant before it.","Ь softens. Ъ separates. Neither has a sound of its own.","You now know all 33 letters."]
  }
]},
{ id:"vocab", name:"Vocabulary", ru:"Ле+ксика",
  desc:"Core words for everyday life, each with stress, pronunciation and audio.",
  lessons:[
  { id:"v1", title:"Greetings and courtesy", ru:"Приве+тствия", kind:"words",
    goal:"Greet people, thank them, apologise and say goodbye, formally and informally.",
    learn:[
      "Russian has two words for ‘you’: **ты** for friends, family and children, and **вы** for everyone else and for more than one person. Greetings follow the same split.",
      "[[Здра+вствуйте]] is the safe, polite hello. The first в is silent: say ‘zdrastvuyte’. [[Приве+т]] is for friends.",
      "With people you don't know well, Russians use the first name plus the patronymic, formed from the father's name: [[А+нна Петро+вна]], [[Ива+н Серге+евич]]."
    ],
    tip:"If you learn one word today, make it [[спаси+бо]]. The reply is [[пожа+луйста]], which also means ‘please’.",
    items:[["Здра+вствуйте","zdrastvuyte","Hello","formal"],["Приве+т","privyet","Hi","informal"],["До свида+ния","da svidaniya","Goodbye","formal"],["Пока+","paka","Bye","informal"],["Спаси+бо","spasiba","Thank you"],["Пожа+луйста","pazhalusta","Please / You're welcome"],["Извини+те","izvinitye","Excuse me / Sorry"],["Да","da","Yes"],["Нет","nyet","No"],["Как дела+?","kak dyela","How are you?"],["Хорошо+","kharasho","Good / Fine"]],
    examples:[["Приве+т! Как дела+? — Хорошо+, спаси+бо.","Hi! How are you? — Fine, thanks."],["Здра+вствуйте, А+нна Петро+вна!","Hello, Anna Petrovna!"],["Извини+те, пожа+луйста!","Excuse me, please!"],["Спаси+бо! — Пожа+луйста.","Thank you! — You're welcome."],["До свида+ния!","Goodbye!"]],
    recap:["[[Здра+вствуйте]] and [[до свида+ния]] are formal; [[приве+т]] and [[пока+]] are informal.","**вы** is polite or plural; **ты** is for people close to you.","[[Пожа+луйста]] means both ‘please’ and ‘you're welcome’."]
  },
  { id:"v2", title:"Numbers 0 to 10", ru:"Чи+сла", kind:"words",
    goal:"Count to ten and order things by number.",
    learn:[
      "One and two change with the gender of the noun: [[оди+н]] (masculine), [[одна+]] (feminine), [[одно+]] (neuter); [[два]] (masculine and neuter), [[две]] (feminine).",
      "After 2, 3 and 4 the noun takes a special ending, and after 5 and above a different one. You will meet these later. For now, learn the numbers themselves.",
      "Listen for the soft sign in [[пять]], [[шесть]] and [[де+сять]]: the final т is said with a light ‘y’ glide."
    ],
    items:[["ноль","nol","0"],["оди+н","adin","1"],["два","dva","2"],["три","tri","3"],["четы+ре","chetyrye","4"],["пять","pyat","5"],["шесть","shest","6"],["семь","syem","7"],["во+семь","vosyem","8"],["де+вять","dyevyat","9"],["де+сять","dyesyat","10"]],
    examples:[["Оди+н чай, пожа+луйста.","One tea, please."],["Два ко+фе и одна+ вода+.","Two coffees and one water."],["Ско+лько? — Пять.","How many? — Five."],["Ему+ де+сять лет.","He is ten years old."]],
    recap:["0–10: ноль, один, два, три, четыре, пять, шесть, семь, восемь, девять, десять.","One and two agree with gender: [[оди+н]] / [[одна+]] / [[одно+]], [[два]] / [[две]]."]
  },
  { id:"v3", title:"Family", ru:"Семья+", kind:"words",
    goal:"Name family members and introduce them.",
    learn:[
      "Russians usually say [[ма+ма]] and [[па+па]], even as adults. [[мать]] and [[оте+ц]] are more formal.",
      "‘My’ changes with gender: [[мой брат]] (my brother), [[моя+ сестра+]] (my sister).",
      "To say you have a family member, use [[у меня+ есть]] plus the noun: [[У меня+ есть брат]], I have a brother. Structure, lesson 4, covers this in full."
    ],
    items:[["семья+","semya","family"],["ма+ма","mama","mum"],["па+па","papa","dad"],["мать","mat","mother"],["оте+ц","atyets","father"],["сын","syn","son"],["дочь","doch","daughter"],["брат","brat","brother"],["сестра+","sestra","sister"],["муж","moosh","husband"],["жена+","zhena","wife"],["де+ти","dyeti","children"]],
    examples:[["Э+то моя+ семья+.","This is my family."],["Э+то мой брат, а э+то моя+ сестра+.","This is my brother, and this is my sister."],["У меня+ есть сын и дочь.","I have a son and a daughter."],["Мою+ ма+му зову+т О+льга.","My mum's name is Olga."]],
    recap:["[[ма+ма]], [[па+па]] are everyday; [[мать]], [[оте+ц]] are formal.","[[мой]] with masculine nouns, [[моя+]] with feminine.","[[У меня+ есть…]] means ‘I have…’."]
  },
  { id:"v4", title:"Food and drink", ru:"Еда+ и напи+тки", kind:"words",
    goal:"Order food and drink in a café and ask for the bill.",
    learn:[
      "[[Мо+жно…?]] (Can I have…? / May I…?) is the most useful word in a café. Say what you want and add [[пожа+луйста]].",
      "[[ко+фе]] is masculine and never changes its ending, although many Russians treat it as neuter in conversation.",
      "Without something is [[без]]: [[без молока+]] (without milk), [[без са+хара]] (without sugar)."
    ],
    items:[["вода+","vada","water"],["хлеб","khlyep","bread"],["чай","chai","tea"],["ко+фе","kofye","coffee"],["молоко+","malako","milk"],["сыр","syr","cheese"],["мя+со","myasa","meat"],["ры+ба","ryba","fish"],["я+блоко","yablaka","apple"],["суп","soop","soup"],["вино+","vino","wine"],["сок","sok","juice"],["Мо+жно…?","mozhna","Can I have…? / May I…?"],["Счёт","shchot","the bill"]],
    examples:[["Мо+жно ко+фе, пожа+луйста?","Can I have a coffee, please?"],["Чай без молока+.","Tea without milk."],["Я не ем мя+со.","I don't eat meat."],["Счёт, пожа+луйста.","The bill, please."]],
    recap:["[[Мо+жно…?]] + item + [[пожа+луйста]] gets you anything in a café.","[[без]] means ‘without’.","[[Счёт, пожа+луйста]] for the bill."]
  },
  { id:"v5", title:"Everyday verbs", ru:"Глаго+лы", kind:"words",
    goal:"Learn eight high-frequency verbs in the form you'll use most: ‘I …’.",
    learn:[
      "The dictionary form of a verb (the infinitive) usually ends in -ть. The ‘I’ form is the one you'll need first, so each verb shows both.",
      "There are two big families: verbs like [[чита+ть]] → [[я чита+ю]], and verbs like [[говори+ть]] → [[я говорю+]]. Grammar, lesson 3, has the full pattern.",
      "[[хоте+ть]] and [[жить]] are irregular. Learn [[я хочу+]] and [[я живу+]] as they are."
    ],
    items:[["говори+ть","gavarit","to speak","я говорю+ — I speak"],["знать","znat","to know","я зна+ю — I know"],["понима+ть","panimat","to understand","я понима+ю — I understand"],["хоте+ть","khatyet","to want","я хочу+ — I want"],["люби+ть","lyubit","to love, to like","я люблю+ — I love"],["жить","zhit","to live","я живу+ — I live"],["рабо+тать","rabotat","to work","я рабо+таю — I work"],["чита+ть","chitat","to read","я чита+ю — I read"]],
    examples:[["Я не понима+ю.","I don't understand."],["Вы говори+те по-англи+йски?","Do you speak English?"],["Я живу+ в Ло+ндоне.","I live in London."],["Я хочу+ чай.","I want tea."],["Я люблю+ чита+ть.","I love reading."]],
    recap:["Infinitives end in -ть.","Two families: -ю / -ешь and -ю / -ишь.","[[я хочу+]] and [[я живу+]] are irregular."]
  }
]},
{ id:"grammar", name:"Grammar", ru:"Грамма+тика",
  desc:"How Russian words change shape, one rule at a time.",
  lessons:[
  { id:"g1", title:"No ‘to be’, no ‘a’ or ‘the’", ru:"Без «быть»", kind:"grammar",
    goal:"Make simple ‘X is Y’ sentences the Russian way.",
    learn:[
      "In the present tense, Russian has no ‘am’, ‘is’ or ‘are’. [[Я студе+нт]] is literally ‘I student’.",
      "There is no ‘a’ or ‘the’ either. [[дом]] means ‘a house’ or ‘the house’; context tells you which.",
      "In writing, a dash often stands in for ‘is’ between two nouns: [[Москва+ — столи+ца Росси+и]], Moscow is the capital of Russia."
    ],
    tip:"[[Э+то]] does a lot of work: ‘this is’, ‘that is’, ‘these are’, ‘it is’. Point at something and say [[Э+то…]].",
    examples:[["Я студе+нт.","I am a student."],["Он врач.","He is a doctor."],["Э+то дом.","This is a house."],["Где банк? — Банк там.","Where is the bank? — The bank is over there."],["Москва+ — столи+ца Росси+и.","Moscow is the capital of Russia."],["Э+то хоро+шая иде+я.","That's a good idea."]],
    quiz:[
      {p:"How do you say ‘I am a doctor’?", o:["Я врач.","Я есть врач.","Я бу+ду врач.","Врач я есть."], a:0, ruo:true, x:"No verb ‘to be’ in the present: just ‘I doctor’."},
      {p:"What does this mean?", ru:"Э+то дом.", o:["This is a house.","Is this a house?","This is my house.","These are houses."], a:0, x:"[[Э+то]] = ‘this is’, and there is no article."},
      {p:"How do you ask ‘Where is the park?’", o:["Где парк?","Где есть парк?","Где э+то парк есть?","Парк где есть?"], a:0, ruo:true, x:"Question word, then the noun. Nothing else needed."},
      {p:"In ‘Москва́ — столи́ца Росси́и’, what does the dash stand for?", o:["‘is’","‘and’","‘not’","‘the’"], a:0, x:"Between two nouns, the dash replaces the missing ‘is’."}
    ],
    recap:["No ‘am / is / are’ in the present tense.","No articles: context decides ‘a’ or ‘the’.","[[Э+то]] means ‘this is’."]
  },
  { id:"g2", title:"Noun gender", ru:"Род существи+тельных", kind:"grammar",
    goal:"Tell whether a noun is masculine, feminine or neuter from its ending.",
    learn:[
      "Every Russian noun has a gender, and the last letter usually tells you which.",
      "**Masculine**: ends in a consonant or -й: [[дом]], [[музе+й]]. **Feminine**: ends in -а or -я: [[кни+га]], [[неде+ля]]. **Neuter**: ends in -о or -е: [[окно+]], [[мо+ре]].",
      "Nouns ending in the soft sign -ь can be either, so learn each one: [[день]] is masculine, [[ночь]] is feminine.",
      "Meaning beats spelling: [[па+па]] ends in -а but is masculine, because dads are male."
    ],
    table:{h:["Gender","Ending","‘My’"],r:[["Masculine","consonant, -й","[[мой]] [[дом]]"],["Feminine","-а, -я","[[моя+]] [[кни+га]]"],["Neuter","-о, -е","[[моё]] [[окно+]]"]]},
    tip:"Gender matters because adjectives, ‘my’ and past-tense verbs all change to match it.",
    items:[["дом","house · masculine"],["музе+й","museum · masculine"],["кни+га","book · feminine"],["неде+ля","week · feminine"],["окно+","window · neuter"],["мо+ре","sea · neuter"],["день","day · masculine"],["ночь","night · feminine"],["па+па","dad · masculine"]],
    examples:[["Э+то мой дом.","This is my house."],["Э+то моя+ кни+га.","This is my book."],["Э+то моё окно+.","This is my window."],["Где мой па+па?","Where is my dad?"]],
    quiz:[
      {p:"What gender is this noun?", ru:"кни+га", o:["Feminine","Masculine","Neuter"], a:0, x:"Ends in -а, so feminine."},
      {p:"What gender is this noun?", ru:"окно+", o:["Neuter","Masculine","Feminine"], a:0, x:"Ends in -о, so neuter."},
      {p:"What gender is this noun?", ru:"музе+й", o:["Masculine","Feminine","Neuter"], a:0, x:"Ends in -й, so masculine."},
      {p:"Which is correct for ‘my house’?", o:["мой дом","моя+ дом","моё дом"], a:0, ruo:true, x:"[[дом]] is masculine, so [[мой]]."},
      {p:"What gender is па́па?", o:["Masculine","Feminine","Neuter"], a:0, x:"Meaning wins: a dad is male, so the noun is masculine despite -а."}
    ],
    recap:["Consonant or -й: masculine. -а / -я: feminine. -о / -е: neuter.","-ь can be either; learn each one.","‘My’ agrees: [[мой]] / [[моя+]] / [[моё]]."]
  },
  { id:"g3", title:"Present tense verbs", ru:"Настоя+щее вре+мя", kind:"grammar",
    goal:"Change a verb's ending to match who is doing the action.",
    learn:[
      "Russian verbs change their ending for each person. Most follow one of two patterns.",
      "**Pattern 1**, like [[чита+ть]] (to read): drop -ть and add -ю, -ешь, -ет, -ем, -ете, -ют.",
      "**Pattern 2**, like [[говори+ть]] (to speak): drop -ить and add -ю, -ишь, -ит, -им, -ите, -ят.",
      "One present tense covers ‘I read’, ‘I am reading’ and ‘I have been reading (for an hour)’."
    ],
    table:{h:["","чита́ть · read","говори́ть · speak"],r:[["[[я]] I","[[чита+ю]]","[[говорю+]]"],["[[ты]] you","[[чита+ешь]]","[[говори+шь]]"],["[[он / она+]] he / she","[[чита+ет]]","[[говори+т]]"],["[[мы]] we","[[чита+ем]]","[[говори+м]]"],["[[вы]] you (polite / plural)","[[чита+ете]]","[[говори+те]]"],["[[они+]] they","[[чита+ют]]","[[говоря+т]]"]]},
    items:[["я чита+ю","I read"],["ты чита+ешь","you read (informal)"],["он чита+ет","he reads"],["мы чита+ем","we read"],["вы чита+ете","you read (polite / plural)"],["они+ чита+ют","they read"],["я говорю+","I speak"],["ты говори+шь","you speak (informal)"],["она+ говори+т","she speaks"],["мы говори+м","we speak"],["вы говори+те","you speak (polite / plural)"],["они+ говоря+т","they speak"]],
    examples:[["Мы чита+ем газе+ту.","We are reading a newspaper."],["Ты говори+шь по-ру+сски?","Do you speak Russian?"],["Они+ рабо+тают в Ло+ндоне.","They work in London."],["Она+ хорошо+ говори+т.","She speaks well."]],
    quiz:[
      {p:"они́ ___ (чита́ть)", o:["чита+ют","чита+ет","чита+ем","чита+ешь"], a:0, ruo:true, x:"Pattern 1, ‘they’ form: -ют."},
      {p:"ты ___ (говори́ть)", o:["говори+шь","говори+т","говорю+","говоря+т"], a:0, ruo:true, x:"Pattern 2, ‘you’ form: -ишь."},
      {p:"мы ___ (говори́ть)", o:["говори+м","говори+ем","говоря+т","говори+те"], a:0, ruo:true, x:"Pattern 2, ‘we’ form: -им."},
      {p:"Which pronoun is the polite ‘you’?", o:["вы","ты","мы","они+"], a:0, ruo:true, x:"[[вы]] is polite and plural."},
      {p:"What does ‘Я чита́ю’ mean?", o:["I read / I am reading","I will read","I have read it","I read it yesterday"], a:0, x:"The present tense covers both ‘I read’ and ‘I am reading’."}
    ],
    recap:["Pattern 1: -ю, -ешь, -ет, -ем, -ете, -ют.","Pattern 2: -ю, -ишь, -ит, -им, -ите, -ят.","One present tense for ‘I read’ and ‘I am reading’."]
  },
  { id:"g4", title:"Where? The prepositional case", ru:"Предло+жный паде+ж", kind:"grammar",
    goal:"Say where something or someone is: in London, at work, at school.",
    learn:[
      "Russian nouns change their endings to show their job in a sentence. These forms are called cases, and there are six. You will learn them one at a time.",
      "For location, use [[в]] (in) or [[на]] (on, at) and put the noun in the **prepositional** case. For most nouns, that means ending in -е.",
      "Nouns ending in -ия change to -ии: [[Росси+я]] → [[в Росси+и]].",
      "Some places take на rather than в: [[на рабо+те]] (at work), [[на по+чте]] (at the post office), [[на мо+ре]] (at the seaside). Learn them as you meet them."
    ],
    table:{h:["The place","Where? (в / на + -е)"],r:[["[[Ло+ндон]]","[[в Ло+ндоне]]"],["[[Москва+]]","[[в Москве+]]"],["[[шко+ла]]","[[в шко+ле]]"],["[[парк]]","[[в па+рке]]"],["[[рабо+та]]","[[на рабо+те]]"],["[[Росси+я]]","[[в Росси+и]]"]]},
    items:[["в Ло+ндоне","in London"],["в Москве+","in Moscow"],["в шко+ле","at school"],["в па+рке","in the park"],["на рабо+те","at work"],["в Росси+и","in Russia"],["на мо+ре","at the seaside"]],
    examples:[["Где ты живёшь? — Я живу+ в Ло+ндоне.","Where do you live? — I live in London."],["Ма+ма на рабо+те.","Mum is at work."],["Кни+га на столе+.","The book is on the table."],["Мы отдыха+ем на мо+ре.","We're on holiday at the seaside."]],
    quiz:[
      {p:"How do you say ‘I live in Moscow’?", o:["Я живу+ в Москве+.","Я живу+ в Москва+.","Я живу+ в Москву+.","Я живу+ на Москве+."], a:0, ruo:true, x:"[[в]] + prepositional: -а becomes -е."},
      {p:"в парк → ?", o:["в па+рке","в па+рка","в па+рку","в парк"], a:0, ruo:true, x:"Add -е to a consonant ending."},
      {p:"в Росси́я → ?", o:["в Росси+и","в Росси+е","в Росси+ю","в Росси+я"], a:0, ruo:true, x:"-ия becomes -ии."},
      {p:"‘Mum is at work’", o:["Ма+ма на рабо+те.","Ма+ма в рабо+те.","Ма+ма на рабо+та.","Ма+ма на рабо+ту."], a:0, ruo:true, x:"[[рабо+та]] takes на, and -а becomes -е."}
    ],
    recap:["Location = [[в]] or [[на]] + prepositional case.","Most nouns end in -е; -ия becomes -ии.","Some places take на: [[на рабо+те]], [[на мо+ре]]."]
  },
  { id:"g5", title:"Objects: the accusative case", ru:"Вини+тельный паде+ж", kind:"grammar",
    goal:"Say what you read, drink, want or love.",
    learn:[
      "The thing you see, read, love or want is the direct object. It takes the **accusative** case.",
      "Masculine things and neuter nouns don't change: [[Я люблю+ чай]]. [[Я пью вино+]].",
      "Feminine nouns change -а to -у and -я to -ю: [[кни+га]] → [[Я чита+ю кни+гу]].",
      "Watch the stress in [[вода+]] → [[во+ду]]: it jumps to the first syllable.",
      "Masculine people and animals do change ([[брат]] → [[бра+та]]), and feminine nouns in -ь stay the same. You will practise these later."
    ],
    table:{h:["Who / what","Object form"],r:[["[[кни+га]] book","[[кни+гу]]"],["[[ма+ма]] mum","[[ма+му]]"],["[[вода+]] water","[[во+ду]]"],["[[пе+сня]] song","[[пе+сню]]"],["[[чай]] tea","[[чай]]"],["[[вино+]] wine","[[вино+]]"]]},
    items:[["кни+га, кни+гу","book"],["ма+ма, ма+му","mum"],["вода+, во+ду","water"],["пе+сня, пе+сню","song"],["чай, чай","tea (no change)"],["вино+, вино+","wine (no change)"]],
    examples:[["Я чита+ю кни+гу.","I'm reading a book."],["Я люблю+ ма+му.","I love mum."],["Я пью во+ду.","I'm drinking water."],["Он слу+шает пе+сню.","He's listening to a song."],["Мы хоти+м чай.","We want tea."]],
    quiz:[
      {p:"‘I'm reading a newspaper (газе́та)’", o:["Я чита+ю газе+ту.","Я чита+ю газе+та.","Я чита+ю газе+те.","Я чита+ю газе+ты."], a:0, ruo:true, x:"Feminine -а becomes -у."},
      {p:"Я пью ___ (вода́)", o:["во+ду","вода+","воде+","воды+"], a:0, ruo:true, x:"-а becomes -у, and the stress moves forward."},
      {p:"Я хочу́ ___ (сок)", o:["сок","со+ка","со+ку","со+ке"], a:0, ruo:true, x:"Masculine things don't change."},
      {p:"Она́ лю́бит ___ (Москва́)", o:["Москву+","Москва+","Москве+","Москвы+"], a:0, ruo:true, x:"Feminine -а becomes -у."}
    ],
    recap:["Direct objects take the accusative.","Feminine -а → -у, -я → -ю.","Masculine things and neuter nouns stay the same."]
  }
]},
{ id:"structure", name:"Structure", ru:"Строй",
  desc:"How to build sentences: word order, questions, negatives and saying what you have.",
  lessons:[
  { id:"s1", title:"Word order", ru:"Поря+док слов", kind:"grammar",
    goal:"Understand why Russian word order can move, and what moving it changes.",
    learn:[
      "Russian's default order matches English: subject, verb, object. [[Ма+ма лю+бит па+пу]], mum loves dad.",
      "Because endings show who does what, words can move without changing who loves whom. [[па+пу]] has the object ending -у, so [[Па+пу лю+бит ма+ма]] still means mum loves dad.",
      "What changes is emphasis. New or important information goes at the end. [[Па+пу лю+бит ма+ма]] answers ‘Who loves dad?’, and the answer, mum, comes last.",
      "Time and place usually come first: [[Вчера+ я был в Москве+]], yesterday I was in Moscow."
    ],
    examples:[["Ма+ма лю+бит па+пу.","Mum loves dad. (neutral)"],["Па+пу лю+бит ма+ма.","It's mum who loves dad."],["Я чита+ю кни+гу.","I'm reading a book."],["Кни+гу чита+ю я.","It's me who's reading the book."],["Вчера+ я был в Москве+.","Yesterday I was in Moscow."]],
    quiz:[
      {p:"Who loves whom?", ru:"Па+пу лю+бит ма+ма.", o:["Mum loves dad","Dad loves mum","They love each other"], a:0, x:"[[па+пу]] has the object ending, so dad is the one being loved."},
      {p:"Where does the new or important information usually go?", o:["At the end","At the start","Straight after the verb","It doesn't matter"], a:0, x:"Russians save the news for last."},
      {p:"Which shows that па́пу is the object?", o:["The ending -у","Its position","The verb ending","The stress"], a:0, x:"Endings, not position, mark the object."}
    ],
    recap:["Default order: subject, verb, object.","Endings carry the meaning, so order is free.","Moving a word changes emphasis; the key information goes last."]
  },
  { id:"s2", title:"Asking questions", ru:"Вопро+сы", kind:"grammar",
    goal:"Ask yes/no questions and use the eight key question words.",
    learn:[
      "A yes/no question uses exactly the same words as a statement. Only your voice changes: it rises sharply on the word you're asking about, then drops.",
      "Question words go at the start: [[Где метро+?]] (Where's the metro?).",
      "[[что]] is pronounced ‘shto’, an exception to its spelling."
    ],
    items:[["кто","who"],["что","what"],["где","where"],["куда+","where to"],["когда+","when"],["почему+","why"],["как","how"],["ско+лько","how much / how many"]],
    examples:[["Ты говори+шь по-ру+сски.","You speak Russian."],["Ты говори+шь по-ру+сски?","Do you speak Russian?"],["Что э+то?","What is this?"],["Где метро+?","Where's the metro?"],["Ско+лько сто+ит?","How much does it cost?"],["Когда+ конце+рт?","When is the concert?"]],
    quiz:[
      {p:"How do you turn ‘Он врач’ (He's a doctor) into a question?", o:["Он врач? (raise your voice)","Есть он врач?","Врач он есть?","Ли он врач есть?"], a:0, ruo:false, x:"Same words; only the intonation changes."},
      {p:"‘How much does it cost?’", o:["Ско+лько сто+ит?","Как сто+ит?","Где сто+ит?","Что ско+лько?"], a:0, ruo:true, x:"[[ско+лько]] = how much."},
      {p:"How is что pronounced?", o:["shto","chto","kto","sho-to"], a:0, x:"An exception: written ч, said ‘sh’."},
      {p:"Which word means ‘why’?", o:["почему+","когда+","куда+","кто"], a:0, ruo:true, x:"[[почему+]] = why."}
    ],
    recap:["Yes/no questions: same words, rising voice.","Question words start the sentence.","[[что]] is said ‘shto’."]
  },
  { id:"s3", title:"Saying no", ru:"Отрица+ние", kind:"grammar",
    goal:"Make negative sentences, including Russian's double negatives.",
    learn:[
      "Put [[не]] directly before the word you want to negate: [[Я не зна+ю]], I don't know.",
      "[[нет]] means ‘no’ as an answer, and also ‘there isn't’.",
      "Russian requires double negatives. [[Я ничего+ не зна+ю]] is literally ‘I don't know nothing’, and it is correct.",
      "[[ничего+]] is said ‘nichevo’: in this ending, г sounds like в."
    ],
    examples:[["Я не зна+ю.","I don't know."],["Я не понима+ю.","I don't understand."],["Я не говорю+ по-ру+сски.","I don't speak Russian."],["Не я, а он.","Not me, him."],["Я ничего+ не зна+ю.","I don't know anything."],["Никто+ не зна+ет.","Nobody knows."],["Я никогда+ не был в Москве+.","I've never been to Moscow."]],
    quiz:[
      {p:"‘I don't understand’", o:["Я не понима+ю.","Я нет понима+ю.","Не я понима+ю.","Я понима+ю не."], a:0, ruo:true, x:"[[не]] goes right before the verb."},
      {p:"‘Nobody knows’", o:["Никто+ не зна+ет.","Никто+ зна+ет.","Нет никто+ зна+ет.","Не никто+ зна+ет."], a:0, ruo:true, x:"Double negative: [[никто+]] + [[не]]."},
      {p:"What does this mean?", ru:"Я ничего+ не зна+ю.", o:["I don't know anything.","I know nothing is wrong.","I know everything.","I don't know him."], a:0, x:"Two negatives make one stronger negative in Russian."}
    ],
    recap:["[[не]] goes straight before the negated word.","[[нет]] = no / there isn't.","Double negatives are required: [[ничего+ не]], [[никто+ не]], [[никогда+ не]]."]
  },
  { id:"s4", title:"Saying ‘I have’", ru:"У меня+ есть", kind:"grammar",
    goal:"Say what you and others have, and don't have.",
    learn:[
      "Russian rarely uses a verb ‘to have’. It says ‘by me there is’: [[у меня+ есть]].",
      "Change the pronoun to change the owner. The table shows each one.",
      "To say you don't have something, swap [[есть]] for [[нет]] and put the thing in the genitive case: [[вре+мя]] → [[У меня+ нет вре+мени]], I don't have time."
    ],
    table:{h:["Who has it","Russian"],r:[["I","[[у меня+]]"],["you (informal)","[[у тебя+]]"],["he","[[у него+]]"],["she","[[у неё]]"],["we","[[у нас]]"],["you (polite / plural)","[[у вас]]"],["they","[[у них]]"]]},
    items:[["у меня+ есть","I have"],["у тебя+ есть","you have (informal)"],["у него+ есть","he has"],["у неё есть","she has"],["у нас есть","we have"],["у вас есть","you have (polite / plural)"],["у них есть","they have"]],
    examples:[["У меня+ есть брат.","I have a brother."],["У тебя+ есть вре+мя?","Do you have time?"],["У нас есть дом.","We have a house."],["У меня+ нет вре+мени.","I don't have time."],["У неё нет маши+ны.","She doesn't have a car."]],
    quiz:[
      {p:"‘We have a dog (соба́ка)’", o:["У нас есть соба+ка.","Мы име+ем соба+ка.","У мы есть соба+ка.","Нас есть соба+ка."], a:0, ruo:true, x:"[[у нас есть]] + noun."},
      {p:"What does ‘у них’ refer to?", o:["they","we","he","you"], a:0, x:"[[у них]] = they (have)."},
      {p:"‘I don't have time’", o:["У меня+ нет вре+мени.","У меня+ не есть вре+мя.","У меня+ есть нет вре+мени.","Нет у я вре+мя."], a:0, ruo:true, x:"[[нет]] + genitive: [[вре+мени]]."}
    ],
    recap:["‘I have’ = [[у меня+ есть]].","Swap the pronoun to change the owner.","‘I don't have’ = [[у меня+ нет]] + genitive."]
  }
]},
{ id:"idioms", name:"Idioms", ru:"Идио+мы",
  desc:"Sayings Russians actually use, with literal meanings so they stick.",
  lessons:[
  { id:"i1", title:"Everyday idioms", ru:"Живы+е выраже+ния", kind:"idioms",
    goal:"Recognise and use eight idioms you'll hear in ordinary conversation.",
    learn:[
      "Idioms carry a lot of Russian humour. Learn the literal meaning first: it makes them easy to remember and fun to use.",
      "Stress can jump in fixed phrases. In [[как снег на+ голову]] it moves onto the little word на."
    ],
    tip:"When someone wishes you [[Ни пу+ха ни пера+!]] before an exam or interview, the traditional reply is [[К чёрту!]] (‘To the devil!’). Saying thank you is thought to bring bad luck.",
    items:[["Ни пу+ха ни пера+!","Neither down nor feather!","Good luck!"],["Ве+шать лапшу+ на у+ши","To hang noodles on someone's ears","To tell someone lies"],["Как ры+ба в воде+","Like a fish in water","In your element"],["Как снег на+ голову","Like snow on the head","Out of the blue"],["Когда+ рак на горе+ сви+стнет","When the crayfish whistles on the mountain","When pigs fly"],["Ру+ки не дохо+дят","My hands don't reach","I never get round to it"],["Мне всё равно+","To me it's all equal","I don't mind / I don't care"],["Не моё де+ло","Not my business","None of my business"]],
    examples:[["Не ве+шай мне лапшу+ на у+ши!","Don't feed me that nonsense!"],["На рабо+те он как ры+ба в воде+.","At work he's in his element."],["Чай и+ли ко+фе? — Мне всё равно+.","Tea or coffee? — I don't mind."]],
    recap:["Learn the literal picture; the meaning follows.","Reply to [[Ни пу+ха ни пера+!]] with [[К чёрту!]]","[[Мне всё равно+]] is the everyday ‘I don't mind’."]
  },
  { id:"i2", title:"Proverbs", ru:"Посло+вицы", kind:"idioms",
    goal:"Learn eight proverbs Russians quote often.",
    learn:[
      "Russians quote proverbs in everyday talk, sometimes only the first half, trusting you to know the rest.",
      "[[Пе+рвый блин ко+мом]] comes from Maslenitsa, the pancake week before Lent: the first pancake in the pan rarely comes out right."
    ],
    items:[["Пе+рвый блин ко+мом","The first pancake comes out lumpy","First attempts rarely go well"],["Москва+ не сра+зу стро+илась","Moscow wasn't built all at once","Rome wasn't built in a day"],["Без труда+ не вы+тащишь и ры+бку из пруда+","Without effort you can't even pull a little fish from the pond","No pain, no gain"],["Ти+ше е+дешь — да+льше бу+дешь","The quieter you ride, the further you'll get","Slow and steady wins the race"],["Не име+й сто рубле+й, а име+й сто друзе+й","Don't have a hundred roubles; have a hundred friends","Friends are worth more than money"],["У+тро ве+чера мудрене+е","Morning is wiser than evening","Sleep on it"],["Де+нег ку+ры не клю+ют","The chickens don't peck at his money","He's rolling in money"],["Уче+нье — свет, а неуче+нье — тьма","Learning is light, and ignorance is darkness","Education lights the way"]],
    recap:["Proverbs are often quoted by their first half.","[[У+тро ве+чера мудрене+е]]: sleep on a decision.","[[Уче+нье — свет]]: keep going with your lessons."]
  }
]},
{ id:"reader", name:"Reader", ru:"Чте+ние", desc:"Read real Russian: poems, stories, news. Tap any word for its meaning, reveal translations sentence by sentence, and listen as you read." },
{ id:"review", name:"Review", ru:"Повторе+ние", desc:"Flashcards drawn from your lessons. Hear each word, say it, then check the meaning." }
];

/* ---------- reader library (built in) ---------- */
const READER_TEXTS: any[] = [
{ id:"r-family", builtin:true, title:"Моя+ семья+", titleEn:"My family", level:"A1", source:"Graded reader, written for this course",
  sentences:[["Меня+ зову+т Ива+н.","My name is Ivan."],["Я живу+ в Москве+.","I live in Moscow."],["У меня+ больша+я семья+.","I have a big family."],["Мою+ жену+ зову+т Ната+ша.","My wife's name is Natasha."],["Она+ рабо+тает в шко+ле.","She works at a school."],["У нас есть сын и дочь.","We have a son and a daughter."],["Сы+на зову+т Ми+ша, а дочь зову+т А+ня.","Our son is called Misha, and our daughter is called Anya."],["Ве+чером мы вме+сте у+жинаем и разгова+риваем.","In the evening we have dinner together and talk."]],
  gloss:[["меня","меня+","me","form of я; меня зовут = my name is"],["зовут","звать","(they) call","меня зовут = ‘they call me’"],["иван","Ива+н","Ivan",""],["я","я","I",""],["живу","жить","(I) live","я живу"],["в","в","in, at",""],["москве","Москва+","Moscow","prepositional after в"],["у","у","by, at","у меня = I have"],["большая","большо+й","big","feminine, agrees with семья"],["семья","семья+","family","feminine"],["мою","мой","my","feminine object form"],["жену","жена+","wife","object form (-а → -у)"],["наташа","Ната+ша","Natasha","short for Наталья"],["она","она+","she",""],["работает","рабо+тать","works","он / она form"],["школе","шко+ла","school","prepositional after в"],["нас","мы","us","у нас = we have"],["есть","есть","there is","у нас есть = we have"],["сын","сын","son",""],["и","и","and",""],["дочь","дочь","daughter","feminine, ends in -ь"],["сына","сын","son","object form: male people add -а"],["миша","Ми+ша","Misha","short for Михаил"],["а","а","and, whereas","links two contrasting things"],["аня","А+ня","Anya","short for Анна"],["вечером","ве+чер","in the evening","instrumental of вечер used for ‘when’"],["мы","мы","we",""],["вместе","вме+сте","together",""],["ужинаем","у+жинать","(we) have dinner","мы form"],["разговариваем","разгова+ривать","(we) talk","мы form"]]
},
{ id:"r-cafe", builtin:true, title:"В кафе+", titleEn:"In the café", level:"A1", source:"Graded dialogue, written for this course",
  sentences:[["— Здра+вствуйте! Что вы бу+дете?","Hello! What will you have?"],["— Здра+вствуйте. Мо+жно ко+фе с молоко+м?","Hello. Can I have a coffee with milk?"],["— Коне+чно. Большо+й и+ли ма+ленький?","Of course. Large or small?"],["— Ма+ленький, пожа+луйста. И ещё кусо+к то+рта.","Small, please. And a piece of cake too."],["— Хорошо+. Что+-нибудь ещё?","Fine. Anything else?"],["— Нет, спаси+бо. Ско+лько с меня+?","No, thank you. How much do I owe?"],["— Две+сти пятьдеся+т рубле+й.","Two hundred and fifty roubles."],["— Вот, пожа+луйста.","Here you are."]],
  gloss:[["здравствуйте","здра+вствуйте","hello","formal; first в is silent"],["что","что","what","said ‘shto’"],["вы","вы","you","polite or plural"],["будете","быть","will (have)","вы form of the future of быть"],["можно","мо+жно","can I have / may I",""],["кофе","ко+фе","coffee","masculine, never changes"],["с","с","with; from","с + instrumental = with; с меня = from me"],["молоком","молоко+","milk","instrumental after с"],["конечно","коне+чно","of course","чн is said ‘shn’"],["большой","большо+й","big, large",""],["или","и+ли","or",""],["маленький","ма+ленький","small",""],["пожалуйста","пожа+луйста","please; here you are",""],["и","и","and",""],["ещё","ещё","also, more; else",""],["кусок","кусо+к","piece",""],["торта","торт","cake","genitive: ‘of cake’"],["хорошо","хорошо+","good, fine",""],["что-нибудь","что+-нибудь","anything",""],["нет","нет","no",""],["спасибо","спаси+бо","thank you",""],["сколько","ско+лько","how much",""],["меня","я","me","сколько с меня? = how much do I owe?"],["двести","две+сти","two hundred",""],["пятьдесят","пятьдеся+т","fifty",""],["рублей","рубль","roubles","genitive plural after numbers"],["вот","вот","here is, here you are",""]]
},
{ id:"r-pushkin", builtin:true, title:"Я вас люби+л…", titleEn:"I loved you…", level:"B1", source:"Alexander Pushkin, 1829 · poem",
  sentences:[["Я вас люби+л: любо+вь ещё, быть мо+жет,","I loved you; love, perhaps, still"],["В душе+ мое+й уга+сла не совсе+м;","has not entirely died out in my soul;"],["Но пусть она+ вас бо+льше не трево+жит;","but let it trouble you no longer;"],["Я не хочу+ печа+лить вас ниче+м.","I do not want to sadden you in any way."],["Я вас люби+л безмо+лвно, безнаде+жно,","I loved you silently, hopelessly,"],["То ро+бостью, то ре+вностью томи+м;","tormented now by shyness, now by jealousy;"],["Я вас люби+л так и+скренно, так не+жно,","I loved you so sincerely, so tenderly,"],["Как дай вам Бог люби+мой быть други+м.","as God grant you may be loved by another."]],
  gloss:[["я","я","I",""],["вас","вы","you","object form of вы"],["любил","люби+ть","loved","past tense, masculine"],["любовь","любо+вь","love","feminine"],["ещё","ещё","still, yet",""],["быть","быть","to be","быть может = perhaps"],["может","мочь","can, may","быть может = perhaps"],["в","в","in",""],["душе","душа+","soul","prepositional after в"],["моей","мой","my","feminine prepositional"],["угасла","уга+снуть","has faded, died out","past, feminine: agrees with любовь"],["не","не","not",""],["совсем","совсе+м","completely","не совсем = not entirely"],["но","но","but",""],["пусть","пусть","let","пусть она… = let it…"],["она","она+","it (she)","refers back to любовь"],["больше","бо+льше","more","больше не = no longer"],["тревожит","трево+жить","troubles, disturbs","он / она form"],["хочу","хоте+ть","(I) want","irregular"],["печалить","печа+лить","to sadden",""],["ничем","ничто+","with nothing; in any way","instrumental of ничто"],["безмолвно","безмо+лвно","silently",""],["безнадежно","безнаде+жно","hopelessly",""],["то","то… то…","now… now…","alternation"],["робостью","ро+бость","shyness, timidity","instrumental: ‘by shyness’"],["ревностью","ре+вность","jealousy","instrumental"],["томим","томи+мый","tormented","short participle"],["так","так","so",""],["искренно","и+скренно","sincerely",""],["нежно","не+жно","tenderly",""],["как","как","as",""],["дай","дать","grant, give","command form: дай Бог = God grant"],["вам","вы","to you","dative of вы"],["бог","Бог","God","said ‘Bokh’"],["любимой","люби+мый","loved, beloved","instrumental feminine after быть"],["другим","друго+й","another (person)","instrumental: ‘by another’"]]
},
{ id:"r-tyutchev", builtin:true, title:"Умо+м Росси+ю не поня+ть", titleEn:"Russia cannot be understood with the mind", level:"B1", source:"Fyodor Tyutchev, 1866 · poem",
  sentences:[["Умо+м Росси+ю не поня+ть,","Russia cannot be understood with the mind,"],["Арши+ном о+бщим не изме+рить:","nor measured with a common yardstick:"],["У ней осо+бенная стать —","she has a character all her own —"],["В Росси+ю мо+жно то+лько ве+рить.","in Russia one can only believe."]],
  gloss:[["умом","ум","mind","instrumental: ‘with the mind’"],["россию","Росси+я","Russia","object form"],["не","не","not",""],["понять","поня+ть","to understand","не понять = cannot be understood"],["аршином","арши+н","arshin","old measure of length, about 71 cm; instrumental"],["общим","о+бщий","common, general","instrumental"],["измерить","изме+рить","to measure",""],["у","у","by, at","у ней = she has"],["ней","она+","her","poetic form of неё"],["особенная","осо+бенный","special, particular",""],["стать","стать","bearing, character","an old noun, not the verb ‘to become’"],["в","в","in","верить в + object = believe in"],["можно","мо+жно","one can",""],["только","то+лько","only",""],["верить","ве+рить","to believe",""]]
},
{ id:"r-lermontov", builtin:true, title:"Па+рус", titleEn:"The Sail", level:"B2", source:"Mikhail Lermontov, 1832 · poem, first verse",
  sentences:[["Беле+ет па+рус одино+кой","A lonely sail gleams white"],["В тума+не мо+ря голубо+м!..","in the blue mist of the sea!"],["Что и+щет он в стране+ далёкой?","What is it seeking in a distant land?"],["Что ки+нул он в краю+ родно+м?..","What has it left behind in its native land?"]],
  gloss:[["белеет","беле+ть","shows white, gleams white",""],["парус","па+рус","sail",""],["одинокой","одино+кий","lonely","old spelling of одинокий"],["в","в","in",""],["тумане","тума+н","mist, fog","prepositional"],["моря","мо+ре","of the sea","genitive"],["голубом","голубо+й","light blue","prepositional"],["что","что","what","said ‘shto’"],["ищет","иска+ть","seeks, is looking for","он form"],["он","он","it (he)","refers to the sail"],["стране","страна+","country, land","prepositional"],["далёкой","далёкий","distant, far-off",""],["кинул","ки+нуть","threw; left behind","past tense"],["краю","край","land, region","в краю: special location form"],["родном","родно+й","native, home",""]]
}
].map(t=>({...t, sentences:t.sentences.map(s=>({ru:s[0],en:s[1]}))}));

export default { L, TABS, READER_TEXTS };
