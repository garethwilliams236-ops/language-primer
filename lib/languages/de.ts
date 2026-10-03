// @ts-nocheck
/* Course content. Edit lessons, vocabulary and reader texts here.
   Stress: "+" after a vowel marks it as stressed (Russian). [[text]] makes a tappable, spoken word. **text** is bold. */
const L: any = { code:"de", native:"Deutsch", brand:"Fibel", brandEn:"German primer", name:"German", writeName:"German", tts:"de-DE", voiceRe:/^de([-_]|$)/i, key:"de-primer-v1", bigLo:true, rtl:false,
  norm:(w: string)=>w, wordRe:"[A-Za-zÄÖÜäöüßẞ]+(?:-[A-Za-zÄÖÜäöüßẞ]+)*",
  untitled:"Ohne Titel", pastePh:"Text hier einfügen…", sourcePh:"e.g. nachrichtenleicht.de, 3 Oct",
  sources:`Easy news: <a href="https://www.nachrichtenleicht.de" target="_blank" rel="noopener">nachrichtenleicht.de</a>. News: <a href="https://www.dw.com/de" target="_blank" rel="noopener">Deutsche Welle</a>. Classic poems and stories: <a href="https://www.projekt-gutenberg.org" target="_blank" rel="noopener">Projekt Gutenberg-DE</a>.`,
  prepMarks:`- The "ru" field holds the German sentence, unchanged. Add no marks to it.
- Dictionary forms: for nouns give the article and plural, e.g. "der Tisch, -e"; for verbs the infinitive; for adjectives the base form.`,
  formRule:"lowercase", explainMarks:"Give the article (der, die, das) with every noun you mention."
};

/* ---------- course content ---------- */
const TABS: any[] = [
{ id:"alphabet", name:"Sounds", ru:"Das Alphabet",
  desc:"German spelling is very regular: learn the rules once and you can read almost any word aloud. Four lessons cover every sound that differs from English.",
  lessons:[
  { id:"a1", title:"Vowels, long and short", ru:"Die Vokale", kind:"letters",
    goal:"Say the five German vowels and know when each one is long or short.",
    learn:[
      "German uses the same 26 letters as English, plus **Ä, Ö, Ü** and **ß**. The difference is in the sounds, and German is far more consistent than English.",
      "Each vowel has one clear sound, said without the glide English adds. German ‘o’ is a pure ‘o’, never ‘oh-oo’.",
      "Every vowel can be **long** or **short**. It is usually long before a single consonant or an h: [[Name]], [[Sohn]]. It is short before two consonants: [[Mann]], [[Sonne]].",
      "All nouns start with a capital letter: [[der Hund]], [[die Stadt]]. That helps you spot them in a sentence."
    ],
    tip:"Tap any German word in a lesson to hear it. Turn on Slow audio in the top bar when you want to catch each sound.",
    items:[["A","a","a","‘a’ in ‘father’","Vater","father"],["E","e","e","long: ‘ay’ in ‘day’, without the glide; short: ‘e’ in ‘bed’","See","lake"],["I","i","i","long: ‘ee’ in ‘see’; short: ‘i’ in ‘bit’","Kino","cinema"],["O","o","o","long: a pure ‘o’; short: ‘o’ in ‘pot’","Rose","rose"],["U","u","u","long: ‘oo’ in ‘food’; short: ‘u’ in ‘put’","gut","good"]],
    words:[["Hallo","hello"],["Tag","day"],["Name","name"],["gut","good"],["Mann","man"],["Sonne","sun"],["Kino","cinema"],["Hand","hand"]],
    recap:["Five pure vowels: a, e, i, o, u.","Long before one consonant or h ([[Name]]); short before two ([[Mann]]).","Nouns always start with a capital letter."]
  },
  { id:"a2", title:"Consonants that change", ru:"Die Konsonanten", kind:"letters",
    goal:"Read the seven consonants that German says differently from English.",
    learn:[
      "These letters look familiar but sound different. **W** is ‘v’, **V** is usually ‘f’, **Z** is ‘ts’, and **J** is ‘y’.",
      "**S** before a vowel sounds like ‘z’: [[Sonne]] is ‘ZON-neh’. At the end of a word it stays ‘s’.",
      "German **R** is made at the back of the throat, a little like gargling. At the end of a word it softens almost into a vowel: [[Vater]] ends in ‘-tah’.",
      "**ß** (called ‘Eszett’) is simply ‘ss’. It appears after long vowels: [[Straße]]."
    ],
    tip:"Volkswagen is said ‘FOLKS-vah-gen’: the V is ‘f’ and the W is ‘v’. If you remember that one word, you have two of these rules.",
    items:[["W","w","v","‘v’ in ‘van’","Wasser","water"],["V","v","f","usually ‘f’ in ‘fun’","Vogel","bird"],["Z","z","ts","‘ts’ in ‘cats’","Zeit","time"],["J","j","y","‘y’ in ‘yes’","ja","yes"],["S","s","z / s","‘z’ before a vowel; ‘s’ at the end","Sonne","sun"],["R","r","r","made at the back of the throat","rot","red"],["ß","","ss","‘ss’ in ‘kiss’","Straße","street"]],
    words:[["Wasser","water"],["Vater","father"],["Zeit","time"],["ja","yes"],["Zug","train"],["Wort","word"],["Straße","street"],["sieben","seven"]],
    recap:["W = v · V = f · Z = ts · J = y.","S before a vowel = z.","ß = ss."]
  },
  { id:"a3", title:"Umlauts and vowel pairs", ru:"Umlaute", kind:"letters",
    goal:"Pronounce ä, ö and ü, and the four common vowel pairs.",
    learn:[
      "The two dots are an **Umlaut**. They change the vowel's sound, and often its meaning: [[schon]] (already) and [[schön]] (beautiful) are different words.",
      "**Ö**: say ‘ay’ and round your lips as if to whistle. **Ü**: say ‘ee’ and round your lips the same way. **Ä** is close to the ‘e’ in ‘bed’.",
      "Vowel pairs have fixed sounds. **ei** is ‘eye’ and **ie** is ‘ee’: say the second letter in English. **au** is ‘ow’, and **eu** and **äu** are ‘oy’.",
      "If you can't type an umlaut, write e after the vowel: Muenchen for [[München]]."
    ],
    tip:"[[Wein]] (wine) and [[Wien]] (Vienna) only differ in the order of e and i. Say the second letter: wine, veen.",
    items:[["Ä","ä","ä","‘e’ in ‘bed’, or ‘ai’ in ‘fair’ when long","Mädchen","girl"],["Ö","ö","ö","say ‘ay’ with rounded lips","schön","beautiful"],["Ü","ü","ü","say ‘ee’ with rounded lips","Tür","door"],["Ei","ei","eye","‘eye’","Wein","wine"],["Ie","ie","ee","‘ee’ in ‘see’","Bier","beer"],["Au","au","ow","‘ow’ in ‘how’","Haus","house"],["Eu","eu","oy","‘oy’ in ‘boy’; äu sounds the same","neu","new"]],
    words:[["schön","beautiful"],["Tür","door"],["Käse","cheese"],["fünf","five"],["Wein","wine"],["Bier","beer"],["Haus","house"],["Deutschland","Germany"]],
    recap:["Ö = ‘ay’ with rounded lips; Ü = ‘ee’ with rounded lips.","ei = ‘eye’, ie = ‘ee’: say the second letter.","au = ‘ow’; eu and äu = ‘oy’."]
  },
  { id:"a4", title:"Letter combinations", ru:"Buchstabengruppen", kind:"letters",
    goal:"Read ch, sch, sp, st, pf and the hard final consonants.",
    learn:[
      "**ch** has two sounds. After a, o and u it is throaty, like Scottish ‘loch’: [[Buch]]. After other vowels and consonants it is a soft hiss, like the ‘h’ in ‘huge’: [[ich]].",
      "**sch** is ‘sh’. At the start of a word, **sp** and **st** become ‘shp’ and ‘sht’: [[Sport]], [[Stadt]].",
      "**pf** sounds both letters together: [[Apfel]].",
      "At the end of a word, **b**, **d** and **g** harden to p, t and k: [[Hund]] sounds like ‘hoont’. The ending **-ig** sounds like ‘ich’: [[richtig]]."
    ],
    items:[["ch","","ch (hard)","after a, o, u: throaty, like Scottish ‘loch’","Buch","book",""],["ch","","ch (soft)","after e, i, ä, ö, ü: a soft hiss, like ‘h’ in ‘huge’","ich","I",""],["sch","","sh","‘sh’ in ‘shop’","Schule","school",""],["st","","sht","at the start of a word: ‘sht’","Stadt","city",""],["sp","","shp","at the start of a word: ‘shp’","Sport","sport",""],["pf","","pf","both letters together","Apfel","apple",""],["-d -b -g","","t p k","hard at the end of a word","Hund","dog",""]],
    words:[["ich","I"],["Buch","book"],["Nacht","night"],["Schule","school"],["Stadt","city"],["sprechen","to speak"],["Apfel","apple"],["Deutsch","German"]],
    recap:["ch is throaty after a, o, u, and soft after other sounds.","sch = sh; st and sp at the start = sht, shp.","Final b, d, g sound like p, t, k."]
  }
]},
{ id:"vocab", name:"Vocabulary", ru:"Wortschatz",
  desc:"Core words for everyday life, with pronunciation and audio.",
  lessons:[
  { id:"v1", title:"Greetings and courtesy", ru:"Begrüßungen", kind:"words",
    goal:"Greet people, thank them, apologise and say goodbye, formally and informally.",
    learn:[
      "German has two words for ‘you’: **du** for friends, family and children, and **Sie** (always with a capital S) for adults you don't know well. Use Sie until someone offers du.",
      "Greetings change through the day: [[Guten Morgen]] until about 11, [[Guten Tag]] in the day, [[Guten Abend]] from about 6pm.",
      "[[Bitte]] is a busy word: please, you're welcome, and ‘here you are’."
    ],
    tip:"[[Tschüss]] is the everyday goodbye. [[Auf Wiedersehen]] is for shops, offices and people you call Sie.",
    items:[["Hallo","HAH-loh","Hello","informal"],["Guten Morgen","GOO-ten MOR-gen","Good morning"],["Guten Tag","GOO-ten tahk","Good day / Hello","formal"],["Guten Abend","GOO-ten AH-bent","Good evening"],["Tschüss","chüss","Bye","informal"],["Auf Wiedersehen","owf VEE-der-zayn","Goodbye","formal"],["Danke","DAHN-keh","Thank you"],["Bitte","BIT-teh","Please / You're welcome"],["Entschuldigung","ent-SHOOL-di-goong","Excuse me / Sorry"],["Ja","yah","Yes"],["Nein","nine","No"],["Wie geht's?","vee gayts","How are you?","informal"],["Gut, danke.","goot, DAHN-keh","Fine, thanks."]],
    examples:[["Guten Tag, Frau Müller! Wie geht es Ihnen?","Hello, Mrs Müller! How are you? (formal)"],["Hallo, Tom! Wie geht's? — Gut, danke.","Hi, Tom! How are you? — Fine, thanks."],["Entschuldigung, wo ist der Bahnhof?","Excuse me, where is the station?"],["Danke! — Bitte.","Thanks! — You're welcome."],["Tschüss, bis morgen!","Bye, see you tomorrow!"]],
    recap:["**Sie** is polite; **du** is for friends and family.","[[Guten Morgen]], [[Guten Tag]], [[Guten Abend]] follow the time of day.","[[Bitte]] means please, you're welcome, and here you are."]
  },
  { id:"v2", title:"Numbers 0 to 10", ru:"Zahlen", kind:"words",
    goal:"Count to ten and use numbers for prices and orders.",
    learn:[
      "On the phone and in announcements, Germans often say [[zwo]] instead of [[zwei]] so it can't be confused with [[drei]].",
      "From 21, German puts the units first: [[einundzwanzig]] is ‘one-and-twenty’. It feels backwards at first, so practise it early.",
      "Prices are said as euros then cents: [[sechs Euro fünfzig]] is €6.50."
    ],
    items:[["null","nool","0"],["eins","ines","1"],["zwei","tsvy","2"],["drei","dry","3"],["vier","feer","4"],["fünf","fünf","5"],["sechs","zeks","6"],["sieben","ZEE-ben","7"],["acht","akht","8"],["neun","noyn","9"],["zehn","tsayn","10"]],
    examples:[["Ein Kaffee, bitte.","One coffee, please."],["Zwei Bier, bitte.","Two beers, please."],["Wie viel kostet das? — Fünf Euro.","How much is that? — Five euros."],["Ich habe drei Kinder.","I have three children."]],
    recap:["0–10: null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn.","From 21 the units come first: [[einundzwanzig]].","[[zwo]] is a clear-speech form of [[zwei]]."]
  },
  { id:"v3", title:"Family", ru:"Die Familie", kind:"words",
    goal:"Name family members and introduce them.",
    learn:[
      "Always learn a noun together with its article: [[der]] (masculine), [[die]] (feminine) or [[das]] (neuter). Grammar, lesson 1, explains why.",
      "[[der Mann]] means both ‘man’ and ‘husband’; [[die Frau]] means both ‘woman’ and ‘wife’. Context makes it clear.",
      "‘My’ changes with gender: [[mein Bruder]], [[meine Schwester]]."
    ],
    items:[["die Familie","dee fa-MEE-lee-eh","family"],["die Mutter","dee MUT-ter","mother"],["der Vater","dair FAH-ter","father"],["die Mama","dee MAH-mah","mum"],["der Papa","dair PAH-pah","dad"],["der Sohn","dair zohn","son"],["die Tochter","dee TOKH-ter","daughter"],["der Bruder","dair BROO-der","brother"],["die Schwester","dee SHVES-ter","sister"],["der Mann","dair mahn","husband / man"],["die Frau","dee frow","wife / woman"],["die Kinder","dee KIN-der","children"],["die Eltern","dee EL-tern","parents"]],
    examples:[["Das ist meine Familie.","This is my family."],["Das ist mein Bruder und das ist meine Schwester.","This is my brother and this is my sister."],["Ich habe einen Sohn und eine Tochter.","I have a son and a daughter."],["Meine Mutter heißt Anna.","My mother's name is Anna."]],
    recap:["Learn every noun with der, die or das.","[[der Mann]] = man or husband; [[die Frau]] = woman or wife.","[[mein]] with der and das nouns, [[meine]] with die nouns."]
  },
  { id:"v4", title:"Food and drink", ru:"Essen und Trinken", kind:"words",
    goal:"Order in a café or restaurant and pay the bill.",
    learn:[
      "[[Ich hätte gern…]] (I'd like…) is the polite way to order. [[Ich möchte…]] works too.",
      "Water in Germany usually comes sparkling. For still water ask for [[ohne Kohlensäure]].",
      "When you ask for the bill, staff often ask [[Zusammen oder getrennt?]]: are you paying together or separately?"
    ],
    items:[["das Wasser","das VAS-ser","water"],["das Brot","das broht","bread"],["der Tee","dair tay","tea"],["der Kaffee","dair KAF-fay","coffee"],["die Milch","dee milkh","milk"],["der Käse","dair KAY-zeh","cheese"],["das Fleisch","das flysh","meat"],["der Fisch","dair fish","fish"],["der Apfel","dair AP-fel","apple"],["die Suppe","dee ZUP-peh","soup"],["der Wein","dair vine","wine"],["das Bier","das beer","beer"],["Ich hätte gern…","ikh HET-teh gairn","I'd like…"],["die Rechnung","dee REKH-noong","the bill"]],
    examples:[["Ich hätte gern einen Kaffee, bitte.","I'd like a coffee, please."],["Ein Wasser ohne Kohlensäure, bitte.","A still water, please."],["Ich esse kein Fleisch.","I don't eat meat."],["Die Rechnung, bitte. — Zusammen oder getrennt?","The bill, please. — Together or separately?"]],
    recap:["Order with [[Ich hätte gern…]] + [[bitte]].","Ask for [[ohne Kohlensäure]] if you want still water.","[[Die Rechnung, bitte]] for the bill."]
  },
  { id:"v5", title:"Everyday verbs", ru:"Verben", kind:"words",
    goal:"Learn ten high-frequency verbs in the form you'll use most: ‘I …’.",
    learn:[
      "The dictionary form (the infinitive) almost always ends in -en. For the ‘I’ form, swap -en for -e: [[wohnen]] → [[ich wohne]].",
      "[[sein]] (to be) and [[haben]] (to have) are irregular, and you'll use them constantly. Learn [[ich bin]] and [[ich habe]] as they are.",
      "[[gern]] after a verb means you like doing it: [[Ich lese gern]], I like reading."
    ],
    items:[["sein","zine","to be","ich bin — I am"],["haben","HAH-ben","to have","ich habe — I have"],["sprechen","SHPREKH-en","to speak","ich spreche — I speak"],["wissen","VIS-sen","to know (a fact)","ich weiß — I know"],["verstehen","fer-SHTAY-en","to understand","ich verstehe — I understand"],["möchten","MERKH-ten","would like","ich möchte — I'd like"],["lieben","LEE-ben","to love","ich liebe — I love"],["wohnen","VOH-nen","to live (somewhere)","ich wohne — I live"],["arbeiten","AR-by-ten","to work","ich arbeite — I work"],["lesen","LAY-zen","to read","ich lese — I read"]],
    examples:[["Ich verstehe nicht.","I don't understand."],["Sprechen Sie Englisch?","Do you speak English?"],["Ich wohne in London.","I live in London."],["Ich möchte einen Tee.","I'd like a tea."],["Ich lese gern.","I like reading."]],
    recap:["Infinitives end in -en; ‘I’ forms usually end in -e.","[[ich bin]] and [[ich habe]] are irregular.","Verb + [[gern]] = you like doing it."]
  }
]},
{ id:"grammar", name:"Grammar", ru:"Grammatik",
  desc:"How German words fit together, one rule at a time.",
  lessons:[
  { id:"g1", title:"Der, die, das", ru:"Die Artikel", kind:"grammar",
    goal:"Use the three words for ‘the’ and the two for ‘a’.",
    learn:[
      "Every German noun is masculine, feminine or neuter, and the word for ‘the’ shows which: [[der Tisch]] (m), [[die Lampe]] (f), [[das Buch]] (n). In the plural it is always [[die]].",
      "‘A’ is [[ein]] for masculine and neuter nouns and [[eine]] for feminine ones.",
      "Gender often has nothing to do with meaning: [[das Mädchen]] (the girl) is neuter, because every noun ending in -chen is neuter.",
      "Some endings are reliable. **-ung, -heit, -keit, -schaft** are always feminine. **-chen, -lein** are always neuter. Days, months and seasons are masculine."
    ],
    table:{h:["Gender","the","a"],r:[["Masculine","[[der Tisch]]","[[ein Tisch]]"],["Feminine","[[die Lampe]]","[[eine Lampe]]"],["Neuter","[[das Buch]]","[[ein Buch]]"],["Plural","[[die Bücher]]","—"]]},
    tip:"Colour-code your notes: blue for der, red for die, green for das. Many learners find the colour sticks better than the word.",
    items:[["der Mann","the man · masculine"],["die Frau","the woman · feminine"],["das Kind","the child · neuter"],["der Tisch","the table · masculine"],["die Lampe","the lamp · feminine"],["das Buch","the book · neuter"],["das Mädchen","the girl · neuter (-chen)"],["die Zeitung","the newspaper · feminine (-ung)"]],
    examples:[["Der Mann trinkt Kaffee.","The man is drinking coffee."],["Die Lampe ist neu.","The lamp is new."],["Das Buch ist gut.","The book is good."],["Ein Kind und eine Frau.","A child and a woman."]],
    quiz:[
      {p:"Which article goes with Zeitung (newspaper)?", o:["die","der","das"], a:0, ruo:true, x:"Nouns ending in -ung are always feminine."},
      {p:"Which article goes with Mädchen (girl)?", o:["das","die","der"], a:0, ruo:true, x:"Every noun ending in -chen is neuter."},
      {p:"How do you say ‘a book’?", o:["ein Buch","eine Buch","einen Buch"], a:0, ruo:true, x:"[[Buch]] is neuter, so [[ein]]."},
      {p:"What is ‘the’ in front of every plural noun?", o:["die","der","das"], a:0, ruo:true, x:"All plurals take [[die]]."},
      {p:"Which article goes with Montag (Monday)?", o:["der","die","das"], a:0, ruo:true, x:"Days, months and seasons are masculine."}
    ],
    recap:["[[der]] masculine, [[die]] feminine, [[das]] neuter; [[die]] for all plurals.","[[ein]] / [[eine]] for ‘a’.","-ung, -heit, -keit are feminine; -chen is neuter."]
  },
  { id:"g2", title:"Present tense verbs", ru:"Das Präsens", kind:"grammar",
    goal:"Change a verb's ending to match who is doing it, and learn sein.",
    learn:[
      "Take the infinitive, drop -en, and add the ending for each person: -e, -st, -t, -en, -t, -en.",
      "[[Sie]] with a capital S (polite ‘you’) uses the same form as [[sie]] (they).",
      "One present tense covers ‘I live’, ‘I am living’, and often ‘I will live’: [[Morgen fahre ich nach Berlin]], tomorrow I'm going to Berlin.",
      "[[sein]] (to be) is irregular in every form. Learn it by heart."
    ],
    table:{h:["","wohnen · live","sein · be"],r:[["[[ich]] I","[[wohne]]","[[bin]]"],["[[du]] you","[[wohnst]]","[[bist]]"],["[[er / sie / es]] he / she / it","[[wohnt]]","[[ist]]"],["[[wir]] we","[[wohnen]]","[[sind]]"],["[[ihr]] you (plural)","[[wohnt]]","[[seid]]"],["[[sie / Sie]] they / you (polite)","[[wohnen]]","[[sind]]"]]},
    items:[["ich wohne","I live"],["du wohnst","you live (informal)"],["er wohnt","he lives"],["wir wohnen","we live"],["ihr wohnt","you live (plural)"],["Sie wohnen","you live (polite) / they live"],["ich bin","I am"],["du bist","you are"],["sie ist","she is"],["wir sind","we are"],["ihr seid","you are (plural)"],["sie sind","they are"]],
    examples:[["Wir wohnen in Berlin.","We live in Berlin."],["Wo wohnst du?","Where do you live?"],["Sie ist Lehrerin.","She is a teacher."],["Morgen fahre ich nach München.","Tomorrow I'm going to Munich."]],
    quiz:[
      {p:"wir ___ (wohnen)", o:["wohnen","wohnt","wohne","wohnst"], a:0, ruo:true, x:"‘We’ uses the infinitive form: -en."},
      {p:"du ___ (sein)", o:["bist","bin","ist","seid"], a:0, ruo:true, x:"[[du bist]]: sein is irregular."},
      {p:"er ___ (spielen)", o:["spielt","spiele","spielst","spielen"], a:0, ruo:true, x:"he / she / it: -t."},
      {p:"What does Sie with a capital S mean?", o:["you (polite)","she","they","we"], a:0, x:"Capital [[Sie]] is the polite ‘you’; it takes the same verb form as ‘they’."}
    ],
    recap:["Endings: -e, -st, -t, -en, -t, -en.","Polite [[Sie]] takes the ‘they’ form.","[[sein]]: bin, bist, ist, sind, seid, sind."]
  },
  { id:"g3", title:"Objects: the accusative", ru:"Der Akkusativ", kind:"grammar",
    goal:"Say what you have, see, want or buy.",
    learn:[
      "German nouns have four cases, which show a word's job in the sentence. The **accusative** marks the direct object: the thing you have, see, want or buy.",
      "Good news: only masculine nouns change. [[der]] becomes [[den]] and [[ein]] becomes [[einen]].",
      "Feminine, neuter and plural stay the same: [[Ich lese die Zeitung]], [[Ich lese das Buch]].",
      "[[haben]] (to have) always takes the accusative, so you'll use it every day: [[Ich habe einen Bruder]]."
    ],
    table:{h:["Gender","Subject","Object"],r:[["Masculine","[[der / ein]]","[[den / einen]]"],["Feminine","[[die / eine]]","[[die / eine]]"],["Neuter","[[das / ein]]","[[das / ein]]"],["Plural","[[die]]","[[die]]"]]},
    items:[["Ich sehe den Mann.","I see the man."],["Ich habe einen Bruder.","I have a brother."],["Ich kaufe die Zeitung.","I'm buying the newspaper."],["Ich lese das Buch.","I'm reading the book."],["Ich möchte einen Kaffee.","I'd like a coffee."]],
    examples:[["Der Hund sieht den Mann.","The dog sees the man."],["Den Mann sieht der Hund.","It's the man that the dog sees."],["Hast du einen Stift?","Do you have a pen?"],["Wir brauchen eine Lampe.","We need a lamp."]],
    quiz:[
      {p:"Ich habe ___ Bruder.", o:["einen","ein","eine","einem"], a:0, ruo:true, x:"[[Bruder]] is masculine, so the object form is [[einen]]."},
      {p:"Ich kaufe ___ Zeitung.", o:["die","den","der","das"], a:0, ruo:true, x:"Feminine nouns don't change."},
      {p:"Ich möchte ___ Kaffee.", o:["einen","ein","eine","einer"], a:0, ruo:true, x:"[[der Kaffee]] is masculine: [[einen]]."},
      {p:"Which nouns change in the accusative?", o:["Only masculine","Only feminine","All of them","Only plurals"], a:0, x:"Only der → den and ein → einen."}
    ],
    recap:["The accusative marks the direct object.","Only masculine changes: der → den, ein → einen.","[[haben]] and [[möchten]] take the accusative."]
  },
  { id:"g4", title:"Where? The dative", ru:"Der Dativ", kind:"grammar",
    goal:"Say where something is and travel ‘with’ something.",
    learn:[
      "The **dative** case follows certain little words. The most useful: [[mit]] (with), [[bei]] (at someone's), [[von]] (from), [[zu]] (to), [[aus]] (out of), [[nach]] (after, to a city).",
      "[[in]] takes the dative when it means ‘where?’: [[in der Stadt]] (in the town).",
      "The dative changes all genders: [[dem]] (m and n), [[der]] (f), and [[den]] + -n in the plural.",
      "Some combine: [[in dem]] → [[im]], [[zu dem]] → [[zum]], [[zu der]] → [[zur]]."
    ],
    table:{h:["Gender","Subject","Dative"],r:[["Masculine","[[der Park]]","[[im Park]]"],["Feminine","[[die Stadt]]","[[in der Stadt]]"],["Neuter","[[das Haus]]","[[im Haus]]"],["Plural","[[die Kinder]]","[[mit den Kindern]]"]]},
    items:[["mit dem Bus","by bus"],["mit der Bahn","by train"],["im Park","in the park"],["in der Stadt","in town"],["zum Bahnhof","to the station"],["zur Arbeit","to work"],["bei meiner Mutter","at my mother's"]],
    examples:[["Ich fahre mit dem Bus zur Arbeit.","I go to work by bus."],["Die Kinder spielen im Park.","The children are playing in the park."],["Wir wohnen in der Stadt.","We live in town."],["Ich komme aus England.","I come from England."]],
    quiz:[
      {p:"‘by bus’", o:["mit dem Bus","mit den Bus","mit der Bus","mit Bus"], a:0, ruo:true, x:"[[mit]] takes the dative: der → dem."},
      {p:"‘in the town’ (die Stadt)", o:["in der Stadt","in die Stadt","im Stadt","in den Stadt"], a:0, ruo:true, x:"Feminine dative: die → der."},
      {p:"in dem Park → ?", o:["im Park","in Park","ins Park","am Park"], a:0, ruo:true, x:"[[in dem]] shortens to [[im]]."},
      {p:"‘to the station’ (der Bahnhof)", o:["zum Bahnhof","zur Bahnhof","zu den Bahnhof","zu Bahnhof"], a:0, ruo:true, x:"[[zu dem]] → [[zum]]."}
    ],
    recap:["mit, bei, von, zu, aus, nach take the dative.","[[in]] + dative answers ‘where?’.","im, zum, zur are short forms."]
  },
  { id:"g5", title:"Modal verbs", ru:"Modalverben", kind:"grammar",
    goal:"Say what you can, must, want and may do.",
    learn:[
      "Modal verbs add ‘can’, ‘must’, ‘want’ and so on to another verb. The main verb goes to the **end** of the sentence in its infinitive form: [[Ich kann Deutsch sprechen]].",
      "The ‘I’ and ‘he / she’ forms are the same and have no ending: [[ich kann]], [[er kann]].",
      "[[müssen nicht]] means ‘don't have to’, not ‘must not’: [[Du musst nicht kommen]], you don't have to come. For ‘must not’ use [[nicht dürfen]]."
    ],
    table:{h:["","können · can","müssen · must","wollen · want"],r:[["[[ich]]","[[kann]]","[[muss]]","[[will]]"],["[[du]]","[[kannst]]","[[musst]]","[[willst]]"],["[[er / sie]]","[[kann]]","[[muss]]","[[will]]"],["[[wir / sie / Sie]]","[[können]]","[[müssen]]","[[wollen]]"]]},
    items:[["ich kann","I can"],["ich muss","I must"],["ich will","I want"],["ich möchte","I would like"],["ich darf","I'm allowed to"],["ich soll","I'm supposed to"]],
    examples:[["Ich kann Deutsch sprechen.","I can speak German."],["Wir müssen heute arbeiten.","We have to work today."],["Willst du ins Kino gehen?","Do you want to go to the cinema?"],["Hier darf man nicht rauchen.","You're not allowed to smoke here."]],
    quiz:[
      {p:"Where does the main verb go after a modal?", o:["At the end","Straight after the modal","At the start","Before the subject"], a:0, x:"[[Ich kann Deutsch sprechen]]: the infinitive goes last."},
      {p:"er ___ (können)", o:["kann","kannt","können","kannst"], a:0, ruo:true, x:"I and he/she forms of modals have no ending."},
      {p:"What does ‘Du musst nicht kommen’ mean?", o:["You don't have to come.","You must not come.","You can't come.","You won't come."], a:0, x:"[[müssen nicht]] = don't have to."}
    ],
    recap:["Modal + … + infinitive at the end.","[[ich kann]], [[er kann]]: no ending.","[[nicht müssen]] = don't have to; [[nicht dürfen]] = must not."]
  }
]},
{ id:"structure", name:"Structure", ru:"Satzbau",
  desc:"How to build German sentences: verb position, questions, negatives and the verb at the end.",
  lessons:[
  { id:"s1", title:"The verb comes second", ru:"Verb an Position zwei", kind:"grammar",
    goal:"Put the verb in the right place in any statement.",
    learn:[
      "In a German statement the verb is always the **second** element. Usually the subject comes first: [[Ich gehe heute ins Kino]].",
      "If you start with something else, like a time or place, the verb stays second and the subject moves after it: [[Heute gehe ich ins Kino]].",
      "English sometimes allows ‘Today I go’. German never does: it must be ‘Today go I’.",
      "Time, then manner, then place is the usual order for the rest: [[Ich fahre morgen mit dem Zug nach Berlin]]."
    ],
    examples:[["Ich gehe heute ins Kino.","I'm going to the cinema today."],["Heute gehe ich ins Kino.","Today I'm going to the cinema."],["Am Montag arbeite ich zu Hause.","On Monday I work from home."],["In Berlin wohnt meine Schwester.","My sister lives in Berlin."],["Ich fahre morgen mit dem Zug nach Berlin.","I'm going to Berlin by train tomorrow."]],
    quiz:[
      {p:"Which is correct for ‘Today I'm working’?", o:["Heute arbeite ich.","Heute ich arbeite.","Ich heute arbeite.","Arbeite heute ich."], a:0, ruo:true, x:"The verb stays in second place, so the subject moves after it."},
      {p:"In a statement, where does the verb go?", o:["Second","First","Last","Anywhere"], a:0, x:"Verb second is the core rule."},
      {p:"Which order sounds natural?", o:["Ich fahre morgen mit dem Zug nach Berlin.","Ich fahre nach Berlin mit dem Zug morgen.","Ich fahre mit dem Zug nach Berlin morgen."], a:0, ruo:true, x:"Time, manner, place."}
    ],
    recap:["The verb is always the second element.","Start with time or place, then verb, then subject.","Time, manner, place."]
  },
  { id:"s2", title:"Asking questions", ru:"Fragen", kind:"grammar",
    goal:"Ask yes/no questions and use the main question words.",
    learn:[
      "For a yes/no question, put the verb first: [[Sprichst du Deutsch?]] (Do you speak German?).",
      "With a question word, the question word comes first and the verb second: [[Wo wohnst du?]].",
      "Most question words start with W, which is said like ‘v’: [[wer]] (who), [[was]] (what), [[wo]] (where). [[wer]] means who, not where."
    ],
    items:[["wer","who"],["was","what"],["wo","where"],["wohin","where to"],["woher","where from"],["wann","when"],["warum","why"],["wie","how"],["wie viel","how much"]],
    examples:[["Sprichst du Deutsch?","Do you speak German?"],["Wo wohnst du?","Where do you live?"],["Woher kommen Sie?","Where are you from?"],["Wie viel kostet das?","How much does that cost?"],["Wann beginnt der Film?","When does the film start?"]],
    quiz:[
      {p:"Turn ‘Du sprichst Deutsch’ into a question.", o:["Sprichst du Deutsch?","Du sprichst Deutsch, ja?","Was du sprichst Deutsch?","Du Deutsch sprichst?"], a:0, ruo:true, x:"Yes/no questions start with the verb."},
      {p:"What does ‘wer’ mean?", o:["who","where","what","when"], a:0, x:"[[wer]] = who. [[wo]] = where."},
      {p:"‘Where are you from?’ (polite)", o:["Woher kommen Sie?","Wohin kommen Sie?","Wo kommen Sie?","Wer kommen Sie?"], a:0, ruo:true, x:"[[woher]] = where from."}
    ],
    recap:["Yes/no: verb first.","Question word first, verb second.","[[wer]] = who, [[wo]] = where."]
  },
  { id:"s3", title:"Saying no: nicht and kein", ru:"Verneinung", kind:"grammar",
    goal:"Choose between nicht and kein, and answer with doch.",
    learn:[
      "Use [[kein]] to negate a noun that would have ‘a’ or no article: [[Ich habe kein Auto]] (I don't have a car). It takes the same endings as [[ein]]: [[keinen Kaffee]], [[keine Zeit]].",
      "Use [[nicht]] for everything else: verbs, adjectives, and nouns with ‘the’: [[Ich verstehe das nicht]].",
      "[[nicht]] usually goes near the end of the sentence, or just before the word it negates.",
      "[[doch]] answers ‘yes’ to a negative question: [[Kommst du nicht? — Doch!]] (Aren't you coming? — Yes, I am!)."
    ],
    examples:[["Ich verstehe das nicht.","I don't understand that."],["Ich habe keine Zeit.","I don't have time."],["Ich trinke keinen Kaffee.","I don't drink coffee."],["Das ist nicht teuer.","That's not expensive."],["Hast du keinen Hunger? — Doch!","Aren't you hungry? — Yes, I am!"]],
    quiz:[
      {p:"‘I don't have a car.’", o:["Ich habe kein Auto.","Ich habe nicht Auto.","Ich habe nicht ein Auto.","Ich nicht habe Auto."], a:0, ruo:true, x:"‘Not a’ + noun = [[kein]]."},
      {p:"‘I don't understand.’", o:["Ich verstehe nicht.","Ich verstehe kein.","Ich kein verstehe.","Ich nicht verstehe."], a:0, ruo:true, x:"Negating a verb: [[nicht]]."},
      {p:"Aren't you tired? — Yes, I am!", o:["Doch!","Ja!","Nein!","Nicht!"], a:0, ruo:true, x:"[[doch]] contradicts a negative question."}
    ],
    recap:["[[kein]] negates nouns (with ein-endings).","[[nicht]] negates verbs, adjectives and ‘the’ nouns.","[[doch]] = yes, contradicting a negative."]
  },
  { id:"s4", title:"The verb at the end", ru:"Verb am Ende", kind:"grammar",
    goal:"Build sentences with because, that and if, where the verb moves to the end.",
    learn:[
      "Words like [[weil]] (because), [[dass]] (that), [[wenn]] (if, when) and [[ob]] (whether) start a side clause. In that clause the verb goes to the **end**.",
      "[[Ich lerne Deutsch, weil ich in Berlin arbeite.]] Compare the main clause: [[Ich arbeite in Berlin.]]",
      "A comma always separates the side clause.",
      "If the side clause comes first, the main clause starts with its verb: [[Wenn es regnet, bleibe ich zu Hause.]]"
    ],
    examples:[["Ich lerne Deutsch, weil ich in Berlin arbeite.","I'm learning German because I work in Berlin."],["Ich glaube, dass er krank ist.","I think that he's ill."],["Wenn es regnet, bleibe ich zu Hause.","If it rains, I stay at home."],["Weißt du, ob der Zug pünktlich ist?","Do you know whether the train is on time?"]],
    quiz:[
      {p:"Complete: Ich bleibe zu Hause, weil ich müde ___.", o:["bin","ist","sein","bist"], a:0, ruo:true, x:"After [[weil]] the verb goes to the end: [[weil ich müde bin]]."},
      {p:"Which is correct?", o:["Ich weiß, dass du recht hast.","Ich weiß, dass du hast recht.","Ich weiß, dass hast du recht."], a:0, ruo:true, x:"[[dass]] sends the verb to the end."},
      {p:"Wenn es regnet, ___", o:["bleibe ich zu Hause.","ich bleibe zu Hause.","ich zu Hause bleibe."], a:0, ruo:true, x:"The side clause fills position one, so the verb comes next."}
    ],
    recap:["weil, dass, wenn, ob send the verb to the end.","Always a comma before the side clause.","Side clause first → main clause starts with its verb."]
  }
]},
{ id:"idioms", name:"Idioms", ru:"Redewendungen",
  desc:"Sayings Germans actually use, with literal meanings so they stick.",
  lessons:[
  { id:"i1", title:"Everyday idioms", ru:"Alltägliche Redewendungen", kind:"idioms",
    goal:"Recognise and use idioms you'll hear in ordinary conversation.",
    learn:[
      "German idioms are often about food, especially sausage. Learn the literal picture first: it makes the meaning easy to remember.",
      "[[Ich drücke dir die Daumen]] is how Germans say ‘fingers crossed’: they press their thumbs instead."
    ],
    tip:"Say [[Ich verstehe nur Bahnhof]] when a conversation goes over your head. Germans will laugh, and usually slow down.",
    items:[["Ich verstehe nur Bahnhof","I only understand ‘train station’","It's all Greek to me"],["Das ist mir Wurst","That's sausage to me","I don't care"],["Ich drücke dir die Daumen","I'm pressing my thumbs for you","Fingers crossed for you"],["Schwein haben","To have pig","To be lucky"],["Tomaten auf den Augen haben","To have tomatoes on your eyes","To miss something obvious"],["Da steppt der Bär","The bear is tap-dancing there","It's a great party"],["Jetzt geht's um die Wurst","Now it's about the sausage","It's now or never"],["Alles in Butter","Everything's in butter","Everything's fine"]],
    examples:[["Ich habe den Zug noch erwischt. Schwein gehabt!","I just caught the train. Lucky!"],["Morgen ist meine Prüfung. — Ich drücke dir die Daumen!","My exam is tomorrow. — Fingers crossed for you!"],["Pizza oder Pasta? — Das ist mir Wurst.","Pizza or pasta? — I don't mind."]],
    recap:["Learn the literal picture; the meaning follows.","[[Ich drücke dir die Daumen]] = fingers crossed.","[[Schwein haben]] = to be lucky."]
  },
  { id:"i2", title:"Proverbs", ru:"Sprichwörter", kind:"idioms",
    goal:"Learn proverbs Germans quote often.",
    learn:[
      "German proverbs often rhyme, which makes them easy to remember: [[Wer rastet, der rostet]].",
      "[[Übung macht den Meister]] is the German ‘practice makes perfect’, and a good motto for this course."
    ],
    items:[["Übung macht den Meister","Practice makes the master","Practice makes perfect"],["Aller Anfang ist schwer","Every beginning is hard","The first steps are always the hardest"],["Ende gut, alles gut","End good, all good","All's well that ends well"],["Morgenstund hat Gold im Mund","The morning hour has gold in its mouth","The early bird catches the worm"],["Wer rastet, der rostet","Whoever rests, rusts","Use it or lose it"],["Ohne Fleiß kein Preis","No prize without effort","No pain, no gain"],["Lügen haben kurze Beine","Lies have short legs","Lies don't get you far"],["Was Hänschen nicht lernt, lernt Hans nimmermehr","What little Hans doesn't learn, Hans never learns","Learn things while you're young"]],
    recap:["Many proverbs rhyme: [[Wer rastet, der rostet]].","[[Aller Anfang ist schwer]]: keep going.","[[Übung macht den Meister]]."]
  }
]},
{ id:"reader", name:"Reader", ru:"Lesen", desc:"Read real German: poems, stories, news. Tap any word for its meaning, reveal translations sentence by sentence, and listen as you read." },
{ id:"review", name:"Review", ru:"Wiederholung", desc:"Flashcards drawn from your lessons. Hear each word, say it, then check the meaning." }
];

/* ---------- reader library (built in) ---------- */
const READER_TEXTS: any[] = [
{ id:"r-family", builtin:true, title:"Meine Familie", titleEn:"My family", level:"A1", source:"Graded reader, written for this course",
  sentences:[["Ich heiße Anna.","My name is Anna."],["Ich wohne in Hamburg.","I live in Hamburg."],["Ich habe eine große Familie.","I have a big family."],["Mein Mann heißt Peter.","My husband's name is Peter."],["Er arbeitet in einer Bank.","He works in a bank."],["Wir haben einen Sohn und eine Tochter.","We have a son and a daughter."],["Am Abend essen wir zusammen.","In the evening we eat together."]],
  gloss:[["ich","ich","I",""],["heiße","heißen","am called","ich heiße = my name is"],["anna","Anna","Anna",""],["wohne","wohnen","live","ich form"],["in","in","in","with dative for ‘where?’"],["hamburg","Hamburg","Hamburg",""],["habe","haben","have","ich form"],["eine","ein","a","feminine"],["große","groß","big","ending -e after eine"],["familie","die Familie, -n","family",""],["mein","mein","my","masculine"],["mann","der Mann, die Männer","husband, man",""],["heißt","heißen","is called","er form"],["peter","Peter","Peter",""],["er","er","he",""],["arbeitet","arbeiten","works","er form; adds -e- before -t"],["einer","ein","a","feminine dative after in"],["bank","die Bank, -en","bank",""],["wir","wir","we",""],["haben","haben","have","wir form"],["einen","ein","a","masculine object form"],["sohn","der Sohn, die Söhne","son",""],["und","und","and",""],["tochter","die Tochter, die Töchter","daughter",""],["am","an dem","on the, in the","am Abend = in the evening"],["abend","der Abend, -e","evening",""],["essen","essen","eat","wir form; verb second, so it comes before wir"],["zusammen","zusammen","together",""]]
},
{ id:"r-cafe", builtin:true, title:"Im Café", titleEn:"In the café", level:"A1", source:"Graded dialogue, written for this course",
  sentences:[["— Guten Tag! Was möchten Sie?","Hello! What would you like?"],["— Ich hätte gern einen Kaffee mit Milch.","I'd like a coffee with milk."],["— Groß oder klein?","Large or small?"],["— Klein, bitte. Und ein Stück Kuchen.","Small, please. And a piece of cake."],["— Gern. Sonst noch etwas?","Certainly. Anything else?"],["— Nein, danke. Was macht das?","No, thanks. How much is that?"],["— Sechs Euro fünfzig.","Six euros fifty."],["— Stimmt so.","Keep the change."]],
  gloss:[["guten","gut","good","Guten Tag = hello"],["tag","der Tag, -e","day",""],["was","was","what",""],["möchten","möchten","would like","Sie form"],["sie","Sie","you","polite; capital S"],["ich","ich","I",""],["hätte","haben","would have","ich hätte gern = I'd like"],["gern","gern","gladly; certainly","on its own: with pleasure"],["einen","ein","a","masculine object form"],["kaffee","der Kaffee","coffee",""],["mit","mit","with","takes the dative"],["milch","die Milch","milk",""],["groß","groß","big, large",""],["oder","oder","or",""],["klein","klein","small",""],["bitte","bitte","please",""],["und","und","and",""],["ein","ein","a",""],["stück","das Stück, -e","piece",""],["kuchen","der Kuchen, -","cake",""],["sonst","sonst","else, otherwise","Sonst noch etwas? = anything else?"],["noch","noch","still, more",""],["etwas","etwas","something",""],["nein","nein","no",""],["danke","danke","thanks",""],["macht","machen","makes","Was macht das? = how much is that?"],["das","das","that",""],["sechs","sechs","six",""],["euro","der Euro","euro",""],["fünfzig","fünfzig","fifty",""],["stimmt","stimmen","is right","Stimmt so = keep the change"],["so","so","so, like that",""]]
},
{ id:"r-goethe", builtin:true, title:"Wandrers Nachtlied", titleEn:"Wanderer's Night Song", level:"B1", source:"Johann Wolfgang von Goethe, 1780 · poem",
  sentences:[["Über allen Gipfeln","Over all the mountain tops"],["Ist Ruh,","is peace,"],["In allen Wipfeln","in all the treetops"],["Spürest du","you feel"],["Kaum einen Hauch;","hardly a breath;"],["Die Vögelein schweigen im Walde.","the little birds fall silent in the wood."],["Warte nur, balde","Just wait, soon"],["Ruhest du auch.","you too will rest."]],
  gloss:[["über","über","over, above",""],["allen","all","all","dative plural"],["gipfeln","der Gipfel, -","peak, summit","dative plural"],["ist","sein","is",""],["ruh","die Ruhe","peace, rest","poetic short form"],["in","in","in",""],["wipfeln","der Wipfel, -","treetop","dative plural"],["spürest","spüren","feel","old form of spürst"],["du","du","you",""],["kaum","kaum","hardly",""],["einen","ein","a","masculine object form"],["hauch","der Hauch, -e","breath, breeze",""],["die","die","the","plural"],["vögelein","das Vöglein, -","little bird","poetic; -lein makes things small"],["schweigen","schweigen","fall silent",""],["im","in dem","in the",""],["walde","der Wald, die Wälder","wood, forest","old dative ending -e"],["warte","warten","wait","command form"],["nur","nur","just, only",""],["balde","bald","soon","poetic -e for the rhyme"],["ruhest","ruhen","rest","old form of ruhst; present used for future"],["auch","auch","too, also",""]]
},
{ id:"r-heine", builtin:true, title:"Die Lorelei", titleEn:"The Lorelei", level:"B2", source:"Heinrich Heine, 1824 · poem, first verse",
  sentences:[["Ich weiß nicht, was soll es bedeuten,","I do not know what it should mean"],["Dass ich so traurig bin;","that I am so sad;"],["Ein Märchen aus alten Zeiten,","a tale from olden times"],["Das kommt mir nicht aus dem Sinn.","will not leave my mind."]],
  gloss:[["ich","ich","I",""],["weiß","wissen","know","irregular: ich weiß"],["nicht","nicht","not",""],["was","was","what",""],["soll","sollen","should, is supposed to",""],["es","es","it",""],["bedeuten","bedeuten","to mean","infinitive at the end after soll"],["dass","dass","that","sends the verb to the end"],["so","so","so",""],["traurig","traurig","sad",""],["bin","sein","am","at the end because of dass"],["ein","ein","a",""],["märchen","das Märchen, -","fairy tale",""],["aus","aus","out of, from","takes the dative"],["alten","alt","old","dative plural ending"],["zeiten","die Zeit, -en","time","plural"],["das","das","that (one)","refers back to the tale"],["kommt","kommen","comes",""],["mir","ich","me, to me","dative: kommt mir nicht aus dem Sinn = I can't stop thinking of it"],["dem","der","the","dative"],["sinn","der Sinn, -e","mind, sense",""]]
}
].map(t=>({...t, sentences:t.sentences.map(s=>({ru:s[0],en:s[1]}))}));

export default { L, TABS, READER_TEXTS };
