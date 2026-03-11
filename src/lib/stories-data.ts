import { Story } from './types';

export const STORIES_DATA: Story[] = [
  // ═══════════════════════════════════════════
  // A1 STORIES
  // ═══════════════════════════════════════════
  {
    id: 'bello-der-hund',
    title: 'Бело и катастрофата со пицата',
    level: 'A1',
    icon: '🐶',
    description: 'Бело е куче со еден голем проблем: ја обожава пицата. Еден ден се случува нешто страшно...',
    paragraphs: [
      {
        de: "Das ist Bello. Bello ist ein kleiner, weißer Hund. Er hat eine Schwäche: Er liebt Pizza über alles!",
        mk: "Ова е Бело. Бело е мало, бело куче. Тој има една слабост: ја обожава пицата над сè!"
      },
      {
        de: "Heute ist Freitag. Familie Müller bestellt eine große Pizza. Bello riecht die Pizza. Seine Nase zittert. Seine Augen leuchten.",
        mk: "Денес е петок. Семејство Милер нарачува голема пица. Бело ја мириса пицата. Неговиот нос трепери. Неговите очи светат."
      },
      {
        de: "Die Familie geht kurz aus dem Zimmer. Bello schaut links. Bello schaut rechts. Niemand ist da. Er springt auf den Tisch!",
        mk: "Семејството излегува накратко од собата. Бело гледа лево. Бело гледа десно. Никој не е тука. Тој скокнува на масата!"
      },
      {
        de: "Papa kommt zurück. Die Pizza ist weg. Bello sitzt auf dem Sofa. Er sieht sehr unschuldig aus. Aber er hat eine Tomatensauce-Nase.",
        mk: "Тато се враќа. Пицата е исчезната. Бело седи на каучот. Тој изгледа многу невин. Но има нос со доматен сос."
      },
      {
        de: "'BELLO!' – ruft Papa. Bello wedelt mit dem Schwanz. Er ist schuldig, aber er ist glücklich. Die Pizza war wunderbar.",
        mk: "'БЕЛО!' – вика тато. Бело го витка опашот. Тој е виновен, но е среќен. Пицата беше прекрасна."
      }
    ],
    keyWords: [
      { word: "die Schwäche", translation: "слабоста" },
      { word: "riechen", translation: "мириса" },
      { word: "springen", translation: "скокнува" },
      { word: "unschuldig", translation: "невин" },
      { word: "schuldig", translation: "виновен" }
    ]
  },

  {
    id: 'max-und-der-montag',
    title: 'Макс го мрази понеделникот',
    level: 'A1',
    icon: '😩',
    description: 'Макс не сака да стане. Неговата мама има друг план. Класична утринска борба.',
    paragraphs: [
      {
        de: "Es ist Montag. Der Wecker klingelt: RING RING RING! Max öffnet ein Auge. Dann schließt er es wieder.",
        mk: "Понеделник е. Будилникот ѕвони: РИНГ РИНГ РИНГ! Макс отвора едно око. Потоа го затвора пак."
      },
      {
        de: "'Max! Aufstehen!' ruft Mama. 'Ich bin krank', sagt Max. 'Wirklich?' fragt Mama. 'Ja, sehr krank', sagt Max.",
        mk: "'Макс! Стани!' вика мама. 'Јас сум болен', вели Макс. 'Навистина?' прашува мама. 'Да, многу болен', вели Макс."
      },
      {
        de: "Mama kommt ins Zimmer. 'Oh nein! Du hast Fieber? Dann – kein Fußball heute Nachmittag!' Max sitzt sofort auf.",
        mk: "Мама влегува во собата. 'О не! Имаш температура? Тогаш – нема фудбал денес попладне!' Макс веднаш седнува право."
      },
      {
        de: "'Warte mal... ich fühle mich besser!' sagt Max. Mama lächelt. Sie weiß alles. Mamas wissen immer alles.",
        mk: "'Почекај... чувствувам се подобро!' вели Макс. Мама се насмевнува. Таа знае сè. Мамите секогаш знаат сè."
      },
      {
        de: "Zehn Minuten später ist Max in der Schule. Er schläft am Tisch. Es ist Montag. Der schlimmste Tag der Woche.",
        mk: "Десет минути подоцна Макс е во училиште. Тој спие за масата. Понеделник е. Најлошиот ден во неделата."
      }
    ],
    keyWords: [
      { word: "der Wecker", translation: "будилникот" },
      { word: "klingeln", translation: "ѕвони" },
      { word: "krank", translation: "болен" },
      { word: "das Fieber", translation: "температурата" },
      { word: "schlimm", translation: "лош / страшен" }
    ]
  },

  {
    id: 'lena-kocht',
    title: 'Лена готви (сосема погрешно)',
    level: 'A1',
    icon: '🍳',
    description: 'Лена сака да изненади нејзиниот пријател со домашно готвење. Резултатот е... интересен.',
    paragraphs: [
      {
        de: "Lena ist 20 Jahre alt. Sie kann gut tanzen, gut singen und gut Fußball spielen. Aber kochen? Nein.",
        mk: "Лена е на 20 години. Таа може добро да танцува, добро да пее и добро да игра фудбал. Но готвење? Не."
      },
      {
        de: "Heute kommt ihr Freund Tim zum Essen. Lena hat eine Idee: Spaghetti! Das ist einfach, denkt sie.",
        mk: "Денес нејзиниот пријател Тим доаѓа на вечера. Лена има идеја: Шпагети! Тоа е едноставно, мисли таа."
      },
      {
        de: "Sie kocht die Nudeln. 5 Minuten? 10 Minuten? 30 Minuten? Die Nudeln sind jetzt sehr, sehr weich. Wie Brei.",
        mk: "Таа ги вари тестенините. 5 минути? 10 минути? 30 минути? Тестенините се сега многу, многу меки. Како каша."
      },
      {
        de: "Tim kommt. 'Mmm, riecht gut!' sagt er höflich. Er isst die Nudeln. Er lächelt. Aber seine Augen sagen: Hilfe!",
        mk: "Тим доаѓа. 'Ммм, мириса убаво!' вели тој учтиво. Тој ги јаде тестенините. Тој се насмевнува. Но неговите очи велат: Помош!"
      },
      {
        de: "'Wie ist es?' fragt Lena. 'Sehr... interessant!' sagt Tim. Danach bestellen sie eine Pizza. Zusammen.",
        mk: "'Kako е?' прашува Лена. 'Многу... интересно!' вели Тим. Потоа нарачуваат пица. Заедно."
      }
    ],
    keyWords: [
      { word: "kochen", translation: "готви" },
      { word: "die Nudeln", translation: "тестенините" },
      { word: "weich", translation: "мек" },
      { word: "höflich", translation: "учтиво" },
      { word: "zusammen", translation: "заедно" }
    ]
  },

  {
    id: 'das-interview',
    title: 'Интервју со Господин Ајнштајн',
    level: 'A1',
    icon: '🎤',
    description: 'Репортерката Клара го интервјуира нај... чудниот професор во градот. Кратко. Смешно. Лесно.',
    paragraphs: [
      {
        de: "Clara ist Reporterin. Heute interviewt sie Professor Einstein. Nein, nicht DEN Einstein. Diesen Einstein.",
        mk: "Клара е репортерка. Денес го интервјуира Професор Ајнштајн. Не, не ОНА Ајнштајн. Овој Ајнштајн."
      },
      {
        de: "'Professor, was machen Sie jeden Tag?' fragt Clara. 'Ich denke', sagt der Professor. 'Nur denken?' 'Ja. Und ich esse Käse.'",
        mk: "'Професоре, што правите секој ден?' прашува Клара. 'Размислувам', вели професорот. 'Само размислувате?' 'Да. И јадам сирење.'"
      },
      {
        de: "'Was ist Ihr Lieblingsessen?' fragt Clara. 'Käse', sagt der Professor. 'Und Ihr Lieblingsfilm?' 'Ein Film über Käse.'",
        mk: "'Која е вашата омилена храна?' прашува Клара. 'Сирење', вели професорот. 'И вашиот омилен филм?' 'Еден филм за сирење.'"
      },
      {
        de: "'Haben Sie Freunde?' fragt Clara. 'Ja. Eine Kuh. Sie gibt mir Milch. Ich mache Käse.' Clara schreibt: Dieser Mann ist sehr speziell.",
        mk: "'Имате ли пријатели?' прашува Клара. 'Да. Една крава. Таа ми дава млеко. Јас правам сирење.' Клара пишува: Овој човек е многу особен."
      },
      {
        de: "Am Ende gibt der Professor ihr ein Stück Käse. 'Für den Artikel', sagt er und lächelt. Clara isst es. Es ist... sehr gut.",
        mk: "На крај професорот и дава парче сирење. 'За написот', вели тој и се насмевнува. Клара го јаде. Тоа е... многу добро."
      }
    ],
    keyWords: [
      { word: "der Reporter", translation: "репортерот" },
      { word: "interviewen", translation: "интервјуира" },
      { word: "der Käse", translation: "сирењето" },
      { word: "speziell", translation: "особен / посебен" },
      { word: "das Stück", translation: "парчето" }
    ]
  },

  {
    id: 'das-handy-problem',
    title: 'Тато и телефонот',
    level: 'A1',
    icon: '📱',
    description: 'Тато добива нов паметен телефон. Ова е приказна за страв, конфузија и голема љубов.',
    paragraphs: [
      {
        de: "Papa hat ein neues Handy. Es ist ein Smartphone. Papa ist 52 Jahre alt. Er hat Angst vor dem Smartphone.",
        mk: "Тато има нов телефон. Тоа е паметен телефон. Тато е на 52 години. Тој се плаши од паметниот телефон."
      },
      {
        de: "'Wie macht man ein Foto?' fragt Papa. Anna, seine Tochter, ist 15. 'Das ist einfach, Papa!' sagt sie.",
        mk: "'Kako се прави фотографија?' прашува тато. Ана, неговата ќерка, е на 15. 'Тоа е едноставно, тато!' вели таа."
      },
      {
        de: "Papa macht 47 Fotos. Alle Fotos zeigen seine Nase. Nur die Nase. Sehr nah. Sehr groß.",
        mk: "Тато прави 47 фотографии. Сите фотографии го покажуваат неговиот нос. Само носот. Многу близу. Многу голем."
      },
      {
        de: "'Papa! Das ist die falsche Kamera!' lacht Anna. Papa ist rot. 'In meiner Zeit hatten wir keine Handys!'",
        mk: "'Тато! Тоа е погрешната камера!' се смее Ана. Тато е црвен. 'Во мое време немавме телефони!'"
      },
      {
        de: "Am Abend schickt Papa Anna eine Nachricht: 'Ich liebe dich.' Aber er schickt auch 12 Fotos von seiner Nase.",
        mk: "Навечер тато и праќа порака на Ана: 'Те сакам.' Но тој праќа и 12 фотографии од неговиот нос."
      }
    ],
    keyWords: [
      { word: "das Handy", translation: "мобилниот телефон" },
      { word: "das Foto", translation: "фотографијата" },
      { word: "falsch", translation: "погрешен" },
      { word: "schicken", translation: "праќа" },
      { word: "die Nachricht", translation: "пораката" }
    ]
  },

  // ═══════════════════════════════════════════
  // A2 STORIES
  // ═══════════════════════════════════════════
  {
    id: 'robby-lernt-fuehlen',
    title: 'Роби пробува сладолед',
    level: 'A2',
    icon: '🤖',
    description: 'Роби е робот кој знае сè за науката, но ништо за радоста. Еден сладолед ќе го промени сè.',
    paragraphs: [
      {
        de: "Robby ist ein Roboter. Er weiß alles: Mathematik, Geschichte, Physik. Aber er hat noch nie gelacht.",
        mk: "Роби е робот. Тој знае сè: математика, историја, физика. Но тој никогаш не се насмеал."
      },
      {
        de: "Eines Tages geht er durch die Stadt. Er sieht ein kleines Mädchen. Sie isst ein Eis. Sie ist so glücklich, dass sie tanzt.",
        mk: "Еден ден тој оди низ градот. Тој гледа мало девојче. Таа јаде сладолед. Таа е толку среќна, што танцува."
      },
      {
        de: "'Warum bist du so glücklich?' fragt Robby. 'Weil das Eis kalt und süß ist!' sagt sie. Das versteht Robby nicht.",
        mk: "'Зошто си толку среќна?' прашува Роби. 'Затоа што сладоледот е ладен и сладок!' вели таа. Тоа Роби не го разбира."
      },
      {
        de: "Das Mädchen gibt ihm eine Kugel Schokoladeneis. Robby berechnet: Temperatur: -5 Grad. Zucker: 22%. Er isst es trotzdem.",
        mk: "Девојчето му дава една топка чоколадо сладолед. Роби пресметува: Температура: -5 степени. Шеќер: 22%. Тој го јаде сепак."
      },
      {
        de: "Etwas Seltsames passiert. Robbys Augen leuchten. Sein Mund formt ein Lächeln. Er versteht jetzt, warum das Mädchen tanzt.",
        mk: "Нешто чудно се случува. Очите на Роби засветуваат. Неговата уста формира насмевка. Тој сега разбира зошто девојчето танцува."
      },
      {
        de: "'Ich glaube, ich habe ein Gefühl', sagt Robby leise. 'Das nennt man Freude', sagt das Mädchen. 'Willkommen, Robby.'",
        mk: "'Мислам дека имам чувство', вели Роби тивко. 'Тоа се вика радост', вели девојчето. 'Добредојде, Роби.'"
      }
    ],
    keyWords: [
      { word: "das Gefühl", translation: "чувството" },
      { word: "berechnen", translation: "пресметува" },
      { word: "seltsam", translation: "чудно" },
      { word: "die Freude", translation: "радоста" },
      { word: "trotzdem", translation: "сепак" }
    ]
  },

  {
    id: 'abenteuer-in-berlin',
    title: 'Изгубен во Берлин',
    level: 'A2',
    icon: '🗺️',
    description: 'Марко доаѓа во Берлин за прв пат. Нема интернет. Нема карта. Има само еден стар германец и многу смелост.',
    paragraphs: [
      {
        de: "Marko ist aus Mazedonien. Er ist zum ersten Mal in Berlin. Sein Handy hat keinen Akku. Er ist verloren.",
        mk: "Марко е од Македонија. Тој е за прв пат во Берлин. Неговиот телефон нема батерија. Тој е изгубен."
      },
      {
        de: "Er sieht einen alten Mann auf einer Bank. 'Entschuldigung! Wo ist der Bahnhof?' fragt Marko auf Deutsch. Er ist nervös.",
        mk: "Тој гледа стар маж на клупа. 'Извинете! Каде е станицата?' прашува Марко на германски. Тој е нервозен."
      },
      {
        de: "Der alte Mann lächelt. 'Ah! Ein Tourist! Ich habe Zeit. Ich zeige dir die Stadt!' Er steht auf. Er geht sehr langsam.",
        mk: "Старецот се насмевнува. 'А! Турист! Имам време. Ти ја покажувам градот!' Тој станува. Тој оди многу бавно."
      },
      {
        de: "Sie gehen zwei Stunden durch Berlin. Der Mann erklärt alles: 'Das ist das Brandenburger Tor. 1791 gebaut. Sehr schön, ja?'",
        mk: "Тие одат два часа низ Берлин. Старецот објаснува сè: 'Ова е Бранденбуршката порта. Изградена 1791. Многу убаво, нели?'"
      },
      {
        de: "Um 18 Uhr sind sie endlich am Bahnhof. 'Danke!' sagt Marko. 'Kein Problem', sagt der Mann. 'Berlin ist für alle da.'",
        mk: "Во 18 часот, конечно се кај станицата. 'Благодарам!' вели Марко. 'Нема проблем', вели старецот. 'Берлин е за сите.'"
      },
      {
        de: "Im Zug denkt Marko: Ich habe den Bahnhof gesucht und eine Stadt gefunden. Und einen Freund.",
        mk: "Во возот Марко мисли: Ја барав станицата и нашов еден град. И еден пријател."
      }
    ],
    keyWords: [
      { word: "verloren", translation: "изгубен" },
      { word: "der Akku", translation: "батеријата" },
      { word: "zeigen", translation: "покажува" },
      { word: "endlich", translation: "конечно" },
      { word: "erklären", translation: "објаснува" }
    ]
  },

  {
    id: 'das-vorstellungsgespraech',
    title: 'Најчудното интервју за работа',
    level: 'A2',
    icon: '💼',
    description: 'Сара оди на интервју за работа. Шефот е малку... другачев. Но работата е совршена.',
    paragraphs: [
      {
        de: "Sara hat ein Vorstellungsgespräch. Sie ist aufgeregt. Sie trägt ihre beste Kleidung. Sie übt ihre Antworten.",
        mk: "Сара има интервју за работа. Таа е возбудена. Таа ја носи нејзината најдобра облека. Таа ги вежба одговорите."
      },
      {
        de: "Sie kommt ins Büro. Der Chef, Herr Braun, sitzt hinter einem riesigen Schreibtisch. Er hat einen Papagei auf der Schulter.",
        mk: "Таа влегува во канцеларијата. Шефот, Господин Браун, седи зад огромна биро. Тој има папагај на рамото."
      },
      {
        de: "'Guten Tag', sagt Sara. 'Guten Tag', sagt der Papagei. Herr Braun sagt nichts. Er schreibt etwas auf. Dann fragt er: 'Mögen Sie Kaffee?'",
        mk: "'Добар ден', вели Сара. 'Добар ден', вели папагајот. Господин Браун не вели ништо. Тој запишува нешто. Потоа прашува: 'Сакате ли кафе?'"
      },
      {
        de: "'Ja, gerne', sagt Sara. 'Gut. Sie sind eingestellt', sagt Herr Braun. Sara ist verwirrt. 'Nur wegen des Kaffees?'",
        mk: "'Да, со задоволство', вели Сара. 'Добро. Вие сте примени', вели Господин Браун. Сара е збунета. 'Само поради кафето?'"
      },
      {
        de: "'Wer keinen Kaffee mag, arbeitet nicht gut. Wer Kaffee mag, ist ein guter Mensch. Willkommen im Team!'",
        mk: "'Кој не сака кафе, не работи добро. Кој сака кафе, е добар човек. Добредојдовте во тимот!'"
      },
      {
        de: "Sara arbeitet jetzt seit drei Jahren bei Herrn Braun. Der Papagei heißt Karl. Karl sagt täglich: 'Guten Morgen, Sara!'",
        mk: "Сара работи веќе три години кај Господин Браун. Папагајот се вика Карл. Карл секој ден вели: 'Добро утро, Сара!'"
      }
    ],
    keyWords: [
      { word: "das Vorstellungsgespräch", translation: "интервјуто за работа" },
      { word: "aufgeregt", translation: "возбуден" },
      { word: "eingestellt", translation: "примен на работа" },
      { word: "verwirrt", translation: "збунет" },
      { word: "der Papagei", translation: "папагајот" }
    ]
  },

  {
    id: 'die-wg',
    title: 'Четири луѓе, еден стан, еден фрижидер',
    level: 'A2',
    icon: '🏠',
    description: 'Стан со четири совсем различни цимери. Секој има свои правила. Хаосот е загарантиран.',
    paragraphs: [
      {
        de: "In der Wohnung leben vier Menschen: Jonas, Maria, Felix und Yuki. Sie teilen eine Küche, ein Bad und einen Kühlschrank.",
        mk: "Во станот живеат четири луѓе: Јонас, Марија, Феликс и Јуки. Тие делат кујна, бања и еден фрижидер."
      },
      {
        de: "Jonas kocht jeden Tag. Alles riecht nach Knoblauch. 'Knoblauch ist gesund!', sagt er. Die anderen sagen nichts. Sie öffnen das Fenster.",
        mk: "Јонас готви секој ден. Сè мириса на лук. 'Лукот е здрав!', вели тој. Другите не велат ништо. Тие го отвораат прозорецот."
      },
      {
        de: "Maria übt Gitarre. Jeden Abend. Sehr laut. Felix trägt Kopfhörer. Yuki schläft mit Ohrstöpseln. Jonas kocht Knoblauchsuppe.",
        mk: "Марија вежба гитара. Секоја вечер. Многу гласно. Феликс носи слушалки. Јуки спие со чепови за уши. Јонас вари лук чорба."
      },
      {
        de: "Im Kühlschrank hat jeder ein Regal. Felix schreibt seinen Namen auf alles: 'FELIX' auf den Käse, 'FELIX' auf die Milch, 'FELIX' auf... das Wasser?",
        mk: "Во фрижидерот секој има полица. Феликс го запишува своето име на сè: 'ФЕЛИКС' на сирењето, 'ФЕЛИКС' на млекото, 'ФЕЛИКС' на... водата?"
      },
      {
        de: "Aber am Wochenende kochen sie zusammen. Jonas macht Knoblauchpasta. Maria singt dazu. Felix isst von fremden Tellern. Yuki lacht.",
        mk: "Но во викенд готват заедно. Јонас прави тестенини со лук. Марија пее при тоа. Феликс јаде од туѓи чинии. Јуки се смее."
      },
      {
        de: "Alle vier sagen: 'Diese WG ist verrückt.' Aber keiner will ausziehen. Das ist ihr Zuhause. Mit Knoblauch und Gitarrenmusik.",
        mk: "Сите четворица велат: 'Овој стан е луд.' Но никој не сака да се исели. Тоа е нивниот дом. Со лук и гитарска музика."
      }
    ],
    keyWords: [
      { word: "die WG (Wohngemeinschaft)", translation: "заеднички стан / совсем" },
      { word: "teilen", translation: "дели" },
      { word: "der Knoblauch", translation: "лукот" },
      { word: "verrückt", translation: "луд / чуден" },
      { word: "ausziehen", translation: "се иселува" }
    ]
  },

  {
    id: 'der-erste-skitag',
    title: 'Прв ден на скии (и последен?)',
    level: 'A2',
    icon: '⛷️',
    description: 'Нико никогаш не скијал. Неговите пријатели се „мали шампиони". Планината има свои планови.',
    paragraphs: [
      {
        de: "Niko hat noch nie Ski gefahren. Seine Freunde fahren seit Jahren. 'Das ist einfach!' sagen sie. Niko glaubt ihnen nicht.",
        mk: "Нико никогаш не скијал. Неговите пријатели скијаат со години. 'Тоа е едноставно!' велат тие. Нико не им верува."
      },
      {
        de: "Am Berg zieht er die Skier an. Seine Beine zittern. 'Ich warte hier', sagt er. 'Nein, nein! Komm!', rufen die Freunde.",
        mk: "На планината ги облекува скиите. Неговите нозе трепераат. 'Ќе почекам тука', вели тој. 'Не, не! Дојди!', викаат пријателите."
      },
      {
        de: "Niko fährt los. Er fährt schnell. Sehr schnell. Zu schnell. Er sieht einen Baum. Er sieht noch einen Baum. Er sieht viele Bäume.",
        mk: "Нико тргнува. Тој оди брзо. Многу брзо. Премногу брзо. Гледа едно дрво. Гледа уште едно дрво. Гледа многу дрвја."
      },
      {
        de: "Fünf Minuten später sitzt er im Schnee. Ein kleines Kind fährt an ihm vorbei. Das Kind ist vielleicht 5 Jahre alt.",
        mk: "Пет минути подоцна тој седи во снегот. Мало дете минува покрај него. Детето е можеби на 5 години."
      },
      {
        de: "'Bist du okay?' fragt das Kind. 'Ja', lügt Niko. Das Kind hilft ihm aufzustehen. Niko dankt einem Fünfjährigen.",
        mk: "'Си добро?' прашува детето. 'Да', лаже Нико. Детето му помага да стане. Нико му благодари на пет-годишно дете."
      },
      {
        de: "Am Abend hat Niko Muskelkater überall. Aber er lacht. 'Nächstes Jahr fahre ich wieder Ski!', sagt er. Die Freunde glauben ihm nicht.",
        mk: "Навечер Нико има болки во мускулите насекаде. Но тој се смее. 'Следната година пак ќе скијам!', вели тој. Пријателите не му веруваат."
      }
    ],
    keyWords: [
      { word: "Ski fahren", translation: "скија" },
      { word: "zittern", translation: "трепери" },
      { word: "der Schnee", translation: "снегот" },
      { word: "vorbeifahren", translation: "минува покрај" },
      { word: "der Muskelkater", translation: "болки во мускулите" }
    ]
  },

  {
    id: 'die-ueberraschungsparty',
    title: 'Изненадувачката забава (кој е изненаден?)',
    level: 'A2',
    icon: '🎉',
    description: 'Семејството планира изненадувачка забава за тато. Само не знаат дека тато... веќе знае.',
    paragraphs: [
      {
        de: "Papa wird 50. Die Familie plant eine Überraschungsparty. Mama, Anna und Ben flüstern den ganzen Tag. Papa tut so, als ob er nichts hört.",
        mk: "Тато станува 50. Семејството планира изненадувачка забава. Мама, Ана и Бен шапотат цел ден. Тато прави како да не слуша ништо."
      },
      {
        de: "Ben schreibt eine Einkaufsliste: 50 Luftballons, Torte, Dekorationen. Er lässt die Liste auf dem Tisch. Papa findet sie. Er liest sie. Er legt sie zurück.",
        mk: "Бен пишува листа за купување: 50 балони, торта, декорации. Ја оставя листата на масата. Тато ја наоѓа. Ја чита. Ја враќа назад."
      },
      {
        de: "'Papa, geh heute Abend bitte aus dem Haus!' sagt Anna. 'Warum?' fragt Papa unschuldig. 'Wir... wir putzen!' Anna ist rot.",
        mk: "'Тато, излези вечерва те молам од куќата!' вели Ана. 'Зошто?' прашува тато невино. 'Ние... ние чистиме!' Ана е сета црвена."
      },
      {
        de: "Papa geht spazieren. Er kommt nach zwei Stunden zurück. Alle verstecken sich. 'ÜBERRASCHUNG!', rufen sie alle.",
        mk: "Тато оди на прошетка. Тој се враќа по два часа. Сите се кријат. 'ИЗНЕНАДУВАЊЕ!', викаат сите."
      },
      {
        de: "Papa macht große Augen. Er ist sehr 'überrascht'. Er schreit, er lacht, er umarmt alle. Er spielt perfekt.",
        mk: "Тато прави големи очи. Тој е многу 'изненаден'. Тој вика, се смее, ги прегрнува сите. Тој игра совршено."
      },
      {
        de: "Später, beim Essen, sagt er: 'Ich habe die Liste gelesen.' Alle lachen. 'Wir wissen es, Papa', sagt Ben. 'Wir wollten dich trotzdem überraschen.'",
        mk: "Подоцна, при вечерата, вели: 'Ја прочитав листата.' Сите се смеат. 'Знаеме, тато', вели Бен. 'Сакавме сепак да те изненадиме.'"
      }
    ],
    keyWords: [
      { word: "die Überraschungsparty", translation: "изненадувачката забава" },
      { word: "flüstern", translation: "шапоти" },
      { word: "sich verstecken", translation: "се крие" },
      { word: "umarmen", translation: "прегрнува" },
      { word: "trotzdem", translation: "сепак" }
    ]
  }
];