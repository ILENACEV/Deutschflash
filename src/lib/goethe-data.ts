export interface GoetheQuestion {
  id: number;
  type: 'reading' | 'listening';
  question: string;
  context?: string;
  text?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const GOETHE_A1: GoetheQuestion[] = [
  // READING (15 questions)
  {
    id: 1,
    type: 'reading',
    question: 'Прочитајте го текстот: „Café Mozart ist von 8:00 bis 20:00 Uhr geöffnet."',
    text: 'Café Mozart ist von 8:00 bis 20:00 Uhr geöffnet.',
    options: ['Кафичето е отворено до 20:00', 'Кафичето е затворено', 'Кафичето е отворено само наутро'],
    correct: 0,
    explanation: '„Geöffnet" значи отворено, а „bis 20:00" значи до 20:00.'
  },
  {
    id: 2,
    type: 'reading',
    question: 'Прочитајте: „Wohnung zu vermieten. 2 Zimmer, Küche, Bad. Tel: 030-12345"',
    context: 'Огласувачот нуди:',
    options: ['Стан на продажба', 'Стан под кирија', 'Стан за споделување'],
    correct: 1,
    explanation: '„Zu vermieten" значи „под кирија".'
  },
  {
    id: 3,
    type: 'reading',
    question: 'Што значи: „Eintritt frei"?',
    options: ['Влез забранет', 'Влез бесплатен', 'Влез ограничен'],
    correct: 1,
    explanation: '„Frei" значи бесплатен во овој контекст.'
  },
  {
    id: 4,
    type: 'reading',
    question: 'Прочитајте: „Der Zug fährt um 14:30 von Gleis 3 ab."',
    context: 'Од каде трга возот?',
    options: ['Од колосек 3', 'Од колосек 2', 'Од колосек 1'],
    correct: 0,
    explanation: '„Gleis" значи колосек, а „ab" значи заминува.'
  },
  {
    id: 5,
    type: 'reading',
    question: 'Што значи: „Ausverkauft"?',
    options: ['На попуст', 'Распродадено', 'Ново'],
    correct: 1,
    explanation: '„Ausverkauft" значи распродадено.'
  },
  {
    id: 6,
    type: 'reading',
    question: 'Прочитајте: „Öffnungszeit: Mo-Fr 9-18 Uhr, Sa 9-13 Uhr"',
    context: 'Кога е затворено?',
    options: ['Недела', 'Сабота', 'Петок'],
    correct: 0,
    explanation: 'Недеља не е наведена, значи затворено.'
  },
  {
    id: 7,
    type: 'reading',
    question: 'Што значи: „Bitte um Rückruf"?',
    options: ['Ве молиме да се јавите', 'Ве молиме да почекате', 'Ве молиме да дојдете'],
    correct: 0,
    explanation: '„Rückruf" значи повторен повик, односно јавување.'
  },
  {
    id: 8,
    type: 'reading',
    question: 'Прочитајте: „Zimmerpreis: 80 € pro Nacht inkl. Frühstück"',
    context: 'Што е вклучено во цената?',
    options: ['Ручек', 'Предлог', 'Доручек'],
    correct: 2,
    explanation: '„Frühstück" значи доручек.'
  },
  {
    id: 9,
    type: 'reading',
    question: 'Што значи: „Dringend gesucht"?',
    options: ['Не е итно', 'Тертуално барано', 'Забранато'],
    correct: 1,
    explanation: '„Dringend" значи итно/ургентно.'
  },
  {
    id: 10,
    type: 'reading',
    question: 'Прочитајте: „Fahrkarte nur gültig am Sonntag"',
    context: 'Картата е валидна:',
    options: ['Секој ден', 'Само во недела', 'Само викенд'],
    correct: 1,
    explanation: '„Nur" значи само, а „am Sonntag" значи во недела.'
  },
  {
    id: 11,
    type: 'reading',
    question: 'Што значи: „An der Rezeption fragen"?',
    options: ['Прашајте на рецепција', 'Одете на рецепција', 'Телефонирајте на рецепција'],
    correct: 0,
    explanation: '„An ... fragen" значи „прашајте некого".'
  },
  {
    id: 12,
    type: 'reading',
    question: 'Прочитајте: „Bitte nicht stören!"',
    context: 'Ова значи:',
    options: ['Ве молиме влезете', 'Ве молиме не прече', 'Ве молиме дојдете подоцна'],
    correct: 1,
    explanation: '„Nicht stören" значи „не прече/не вознемирувај".'
  },
  {
    id: 13,
    type: 'reading',
    question: 'Што значи: „Keine Rückgabe möglich"?',
    options: ['Можно враќање', 'Неможно враќање', 'Распродажба'],
    correct: 1,
    explanation: '„Keine" значи негација, „Rückgabe" значи враќање.'
  },
  {
    id: 14,
    type: 'reading',
    question: 'Прочитајте: „Nur für Mitglieder"',
    context: 'Ова е за:',
    options: ['Сите', 'Само членови', 'Само вработени'],
    correct: 1,
    explanation: '„Nur für" значи „само за".'
  },
  {
    id: 15,
    type: 'reading',
    question: 'Што значи: „Glascontainer"?',
    options: ['Контејнер за хартија', 'Контејнер за стакло', 'Контејнер за пластика'],
    correct: 1,
    explanation: '„Glas" значи стакло.'
  },
  // LISTENING (15 questions) - presented as text-based listening
  {
    id: 16,
    type: 'listening',
    question: 'Слушнете (читајте): „Können Sie mir sagen, wo der Bahnhof ist?"',
    context: 'Прашањето е:',
    options: ['Каде е станицата?', 'Кога заминува возот?', 'Каде е аеродромот?'],
    correct: 0,
    explanation: '„Bahnhof" значи железничка станица.'
  },
  {
    id: 17,
    type: 'listening',
    question: 'Слушнете: „Entschuldigung, haben Sie einen Moment Zeit für mich?"',
    context: 'Ова е:',
    options: ['Прашање за време', 'Извинување + барање за помош', 'Комплимент'],
    correct: 1,
    explanation: '„Entschuldigung" е извинување, а бара нечие време.'
  },
  {
    id: 18,
    type: 'listening',
    question: 'Слушнете: „Ich möchte bitte einen Kaffee und ein Stück Kuchen."',
    context: 'Говорникот нарачува:',
    options: ['Кафе и кола', 'Кафе и парче колаче', 'Чај и колаче'],
    correct: 1,
    explanation: '„Ein Stück Kuchen" значи парче колаче.'
  },
  {
    id: 19,
    type: 'listening',
    question: 'Слушнете: „Der Termin ist am Freitag um zehn Uhr."',
    context: 'Кога е состанокот?',
    options: ['Петок во 10:00', 'Петок во 12:00', 'Петок во 14:00'],
    correct: 0,
    explanation: '„Zehn Uhr" значи 10 часо.'
  },
  {
    id: 20,
    type: 'listening',
    question: 'Слушнете: „Könnten Sie das bitte wiederholen?"',
    context: 'Ова значи:',
    options: ['Можете ли да помогнете?', 'Можете ли да повторите?', 'Можете ли да почекате?'],
    correct: 1,
    explanation: '„Wiederholen" значи повторување.'
  },
  {
    id: 21,
    type: 'listening',
    question: 'Слушнете: „Ich wohne in Berlin, aber ich arbeite in München."',
    context: 'Каде работи говорникот?',
    options: ['Берлин', 'Минхен', 'Берлин и Минхен'],
    correct: 1,
    explanation: '„Arbeite" значи работи, а „in München" е Минхен.'
  },
  {
    id: 22,
    type: 'listening',
    question: 'Слушнете: „Was kostet das together?"',
    context: 'Прашањето е за:',
    options: ['Цената', 'Тежината', 'Големината'],
    correct: 0,
    explanation: '„Kostet" значи чини/цена.'
  },
  {
    id: 23,
    type: 'listening',
    question: 'Слушнете: „Um wie viel Uhr kommt der Zug aus Hamburg?"',
    context: 'Од каде доаѓа возот?',
    options: ['Берлин', 'Минхен', 'Хамбург'],
    correct: 2,
    explanation: '„Aus Hamburg" значи од Хамбург.'
  },
  {
    id: 24,
    type: 'listening',
    question: 'Слушнете: „Ich bin müde. Ich möchte schlafen."',
    context: 'Што сака говорникот?',
    options: ['Да јаде', 'Да спие', 'Да излезе'],
    correct: 1,
    explanation: '„Schlafen" значи спие.'
  },
  {
    id: 25,
    type: 'listening',
    question: 'Слушнете: „Gehen wir ins Kino oder ins Theater?"',
    context: 'Предлозите се за:',
    options: ['Кино или театар', 'Ресторан или кафич', 'Музеј или галерија'],
    correct: 0,
    explanation: '„Kino" е кино, „Theater" е театар.'
  },
  {
    id: 26,
    type: 'listening',
    question: 'Слушнете: „Fahren Sie bitte geradeaus, dann links."',
    context: 'Упатството е:',
    options: ['Направете десен', 'Одете право', 'Вратете се назад'],
    correct: 1,
    explanation: '„Geradeaus" значи право напред.'
  },
  {
    id: 27,
    type: 'listening',
    question: 'Слушнете: „Haben Sie noch mehr davon?"',
    context: 'Прашањето е:',
    options: ['Дали го сакате ова?', 'Дали имате повеќе од ова?', 'Дали сакате нешто друго?'],
    correct: 1,
    explanation: '„Noch mehr davon" значи „повеќе од ова".'
  },
  {
    id: 28,
    type: 'listening',
    question: 'Слушнете: „Das Wetter ist heute sehr schön."',
    context: 'Времето денес е:',
    options: ['Лошо', 'Добро', 'Многу добро'],
    correct: 2,
    explanation: '„Sehr schön" значи многу убаво/добро.'
  },
  {
    id: 29,
    type: 'listening',
    question: 'Слушнете: „Ich brauche einen Arzt. Es geht mir nicht gut."',
    context: 'Говорникот е:',
    options: ['Болен', 'Гладен', 'Многу уморен'],
    correct: 0,
    explanation: '„Es geht mir nicht gut" значи „не ми е добро/сум болен".'
  },
  {
    id: 30,
    type: 'listening',
    question: 'Слушнете: „Wo ist der Ausgang, bitte?"',
    context: 'Прашањето е за:',
    options: ['Влез', 'Излез', 'Toalet'],
    correct: 1,
    explanation: '„Ausgang" значи излез.'
  }
];

export const GOETHE_A2: GoetheQuestion[] = [
  // READING (15 questions)
  {
    id: 1,
    type: 'reading',
    question: 'Прочитајте: „Das Museum ist von Dienstag bis Sonntag geöffnet. Montag ist geschlossen."',
    context: 'Кога можете да го посетите музејот?',
    options: ['Понеделник', 'Среда', 'Понеделник и вторник'],
    correct: 1,
    explanation: '„Geschlossen" значи затворено.'
  },
  {
    id: 2,
    type: 'reading',
    question: 'Прочитајте огласот: „Suche Wohnung, mindestens 2 Zimmer, mit Küche und Balkon. Budget bis 800 €."',
    context: 'Што БАРА огласот?',
    options: ['Стан под кирија', 'Стан за продажба', 'Споделена соба'],
    correct: 0,
    explanation: '„Suche" значи бара/потребна ми е.'
  },
  {
    id: 3,
    type: 'reading',
    question: 'Што значи: „Bei Regen fällt der Ausflug aus"?',
    options: ['Излетот е одложен', 'Излетот се откажува ако врне', 'Излетот продолжува'],
    correct: 1,
    explanation: '„Ausfallen" значи се откажува, „bei Regen" значи кога врне.'
  },
  {
    id: 4,
    type: 'reading',
    question: 'Прочитајте: „Bitte turning links abstellen! Handys nicht erlaubt!"',
    context: 'Што е забрането?',
    options: ['Пушење', 'Користење телефон', 'Фотографирање'],
    correct: 1,
    explanation: '„Nicht erlaubt" значи забрането.'
  },
  {
    id: 5,
    type: 'reading',
    question: 'Што значи: „Ich bin damit einverstanden"?',
    options: ['Не се согласувам', 'Се согласувам', 'Треба да размислам'],
    correct: 1,
    explanation: '„Einverstanden" значи согласување.'
  },
  {
    id: 6,
    type: 'reading',
    question: 'Прочитајте: „Die Party fängt um 20 Uhr an. Dauer: ca. 3 Stunden."',
    context: 'Кога завршува партијата?',
    options: ['Околу 22:00', 'Околу 23:00', 'Околу полуноќ'],
    correct: 1,
    explanation: '20:00 + 3 часа = 23:00.'
  },
  {
    id: 7,
    type: 'reading',
    question: 'Што значи: „sich anmelden"?',
    options: ['Одјави', 'Пријави/Запиши се', 'Избриши'],
    correct: 1,
    explanation: '„Anmelden" значи пријавување/запишување.'
  },
  {
    id: 8,
    type: 'reading',
    question: 'Прочитајте: „Achtung: Baustelle! Umleitung über die Hauptstraße."',
    context: 'Треба да:',
    options: ['Одите право', 'Одите по алтернативен пат', 'Запрете'],
    correct: 1,
    explanation: '„Umleitung" значи пренасочување/алтернативен пат.'
  },
  {
    id: 9,
    type: 'reading',
    question: 'Што значи: „sich erkundigen"?',
    options: ['Одмавнува', 'Прашува/Информира се', 'Заборава'],
    correct: 1,
    explanation: '„Erkundigen" значи распитување/информирање.'
  },
  {
    id: 10,
    type: 'reading',
    question: 'Прочитајте: „Der Kurs kostet 150 €, ermäßigt 100 € für Studenten und Arbeitssuchende."',
    context: 'Колку плаќаат студентите?',
    options: ['150 €', '100 €', '50 €'],
    correct: 1,
    explanation: '„Ermäßigt" значи попуст/намалена цена.'
  },
  {
    id: 11,
    type: 'reading',
    question: 'Што значи: „Ich habe mich verlaufen"?',
    options: ['Изгубив пат', 'Заборавив пат', 'Најдов пат'],
    correct: 0,
    explanation: '„Verlaufen" (си refl) значи залута/изгуби пат.'
  },
  {
    id: 12,
    type: 'reading',
    question: 'Прочитајте: „Vorsicht: Stufe! Nicht freibleibend."',
    context: 'Внимавајте на:',
    options: ['Скршена столица', 'Степен', 'Влаж под'],
    correct: 1,
    explanation: '„Stufe" значи степен/скала.'
  },
  {
    id: 13,
    type: 'reading',
    question: 'Што значи: „beschweren"?',
    options: ['Да се пожали', 'Да се радува', 'Да се сомнева'],
    correct: 0,
    explanation: '„Beschweren" значи жалење/поднесување поплака.'
  },
  {
    id: 14,
    type: 'reading',
    question: 'Прочитајте: „Die Lieferung erfolgt innerhalb von 3-5 Werktagen."',
    context: 'Испораката трае:',
    options: ['1-2 дена', '3-5 работни дена', 'Една недела'],
    correct: 1,
    explanation: '„Werktage" значи работни дена.'
  },
  {
    id: 15,
    type: 'reading',
    question: 'Што значи: „sich vorstellen"?',
    options: ['Да претстави', 'Да замисли', 'Да се сомнева'],
    correct: 0,
    explanation: '„Vorstellen" (си refl) значи претстави се.'
  },
  // LISTENING (15 questions)
  {
    id: 16,
    type: 'listening',
    question: 'Слушнете: „Könnten Sie mir bitte helfen? Ich suche den Ausgang."',
    context: 'Говорникот:',
    options: ['Бара излез', 'Бања тоалет', 'Баара помош за багаж'],
    correct: 0,
    explanation: '„Ausgang" значи излез.'
  },
  {
    id: 17,
    type: 'listening',
    question: 'Слушнете: „Wenn du Zeit hast, können wir ins Kino gehen. Ich lade dich ein."',
    context: 'Говорникот:',
    options: ['Плаќа за двајца', 'Само планира излет', 'Бара помош'],
    correct: 0,
    explanation: '„Ich lade dich ein" значи „те поканувам/јас плаќам".'
  },
  {
    id: 18,
    type: 'listening',
    question: 'Слушнете: „Ich bin gestern zum Arzt gegangen, weil ich Kopfschmerzen hatte."',
    context: 'Зошто отишол кај доктор?',
    options: ['Преглед', 'Главоболка', 'Вакцина'],
    correct: 1,
    explanation: '„Kopfschmerzen" значи главоболка.'
  },
  {
    id: 19,
    type: 'listening',
    question: 'Слушнете: „Man sollte vorher reservieren, sonst gibt es keinen Platz mehr."',
    context: 'Советот е:',
    options: ['Не резервирај', 'Резервирај однапред', 'Дојди подоцна'],
    correct: 1,
    explanation: '„Sonst" значи инаку/во спротивно.'
  },
  {
    id: 20,
    type: 'listening',
    question: 'Слушнете: „Das ist mir zu teuer. Gibt es einen Rabatt?"',
    context: 'Говорникот:',
    options: ['Прашува за попуст', 'Се согласува со цената', 'Прашува за квалитет'],
    correct: 0,
    explanation: '„Rabatt" значи попуст.'
  },
  {
    id: 21,
    type: 'listening',
    question: 'Слушнете: „Ich habe das Paket noch nicht bekommen. Könnten Sie den Status prüfen?"',
    context: 'Прашањето е за:',
    options: ['Испорака', 'Резервација', 'Нарачка'],
    correct: 0,
    explanation: '„Paket" значи пратка/пакет.'
  },
  {
    id: 22,
    type: 'listening',
    question: 'Слушнете: „Seit wann arbeiten Sie hier? Und wie gefällt Ihnen die Arbeit?"',
    context: 'Ова се прашања за:',
    options: ['Работно искуство', 'Плата', 'Образование'],
    correct: 0,
    explanation: '„Arbeiten" и „gefällt" се однесуваат на работата.'
  },
  {
    id: 23,
    type: 'listening',
    question: 'Слушнете: „Leider muss ich den Termin absagen. Geht es auch einen Tag später?"',
    context: 'Говорникот:',
    options: ['Потврдува', 'Откажува и предлага алтернатива', 'Бара одмор'],
    correct: 1,
    explanation: '„Absagen" значи откажување.'
  },
  {
    id: 24,
    type: 'listening',
    question: 'Слушнете: „Was meinen Sie damit? Könnten Sie das erklären?"',
    context: 'Говорникот:',
    options: ['Се согласува', 'Не разбира/бара објаснување', 'Се лути'],
    correct: 1,
    explanation: '„Erklären" значи објаснува.'
  },
  {
    id: 25,
    type: 'listening',
    question: 'Слушнете: „Ich ziehe nächste Woche um. Kannst du mir helfen?"',
    context: 'Говорникот:',
    options: ['Се преселува', 'Прашува за стан', 'Бара совет'],
    correct: 0,
    explanation: '„Umziehen" значи преселување.'
  },
  {
    id: 26,
    type: 'listening',
    question: 'Слушнете: „Die Suppe ist kalt. Könnte ich eine warme bekommen?"',
    context: 'Барането е:',
    options: ['Нова супа', 'Топла супа', 'Поголема порција'],
    correct: 1,
    explanation: '„Warm" значи топол.'
  },
  {
    id: 27,
    type: 'listening',
    question: 'Слушнете: „Ich bin allergisch gegen Nüsse. Ist das Gericht vegetarisch?"',
    context: 'Говорникот:',
    options: ['Има алергија', 'Е вегетаријанец', 'Не сака месо'],
    correct: 0,
    explanation: '„Allergisch" значи алергичен.'
  },
  {
    id: 28,
    type: 'listening',
    question: 'Слушнете: „Könnten Sie mir zeigen, wo der Zug nach Hamburg abfährt?"',
    context: 'Прашањето е за:',
    options: ['Перонот за Хамбург', 'Времето на воз', 'Цената на билет'],
    correct: 0,
    explanation: '„Abfahren" значи заминува.'
  },
  {
    id: 29,
    type: 'listening',
    question: 'Слушнете: „Das WLAN funktioniert nicht. Können Sie sich darum kümmern?"',
    context: 'Проблемот е:',
    options: ['Телефон', 'Интернет', 'Телевизор'],
    correct: 1,
    explanation: '„WLAN" значи безжичен интернет.'
  },
  {
    id: 30,
    type: 'listening',
    question: 'Слушнете: „Ich habe mich verfahren. Können Sie mir den Weg zeigen?"',
    context: 'Говорникот:',
    options: ['Се залутал', 'Изгубил карта', 'Нема бензин'],
    correct: 0,
    explanation: '„Verfahren" (си refl) значи залута со воз.'
  }
];

export const GOETHE_B1: GoetheQuestion[] = [
  // READING (15 questions)
  {
    id: 1,
    type: 'reading',
    question: 'Прочитајте: „Obwohl es regnete, ging er spazieren."',
    context: 'Значењето е:',
    options: ['Затоа што врне, излезе на прошетка', 'Иако врнеше, излезе на прошетка', 'Ако врне, ќе излезе'],
    correct: 1,
    explanation: '„Obwohl" значи иако - воведува спротивност.'
  },
  {
    id: 2,
    type: 'reading',
    question: 'Прочитајте: „Wäre es möglich, das Treffen zu verschieben?"',
    context: 'Ова е:',
    options: ['Тврдење', 'Баранье за презакажување', 'Извинување'],
    correct: 1,
    explanation: '„Wäre es möglich" е учтива конструкција за барање.'
  },
  {
    id: 3,
    type: 'reading',
    question: 'Што значи: „sich etw. antun"?',
    options: ['Да направи нешто', 'Да направи нешто на себе', 'Да спречи нешто'],
    correct: 1,
    explanation: '„Sich dat. etw. antun" значи да направиш нешто лошо на себе.'
  },
  {
    id: 4,
    type: 'reading',
    question: 'Прочитајте: „Je mehr ich übe, desto besser werde ich."',
    context: 'Значењето е:',
    options: ['Вежбањето е важно', 'Повеќе вежбаш - подобар си', 'Треба да вежбаш'],
    correct: 1,
    explanation: '„Je...desto" е компаративна конструкција.'
  },
  {
    id: 5,
    type: 'reading',
    question: 'Што значи: „etw. in Betracht ziehen"?',
    options: ['Да разгледаш', 'Да размислиш за', 'Да одбиеш'],
    correct: 1,
    explanation: '„In Betracht ziehen" значи разгледува/земе предвид.'
  },
  {
    id: 6,
    type: 'reading',
    question: 'Прочитајте: „Er behauptet, das sei nicht wahr."',
    context: 'Тој:',
    options: ['Докажува дека е точно', 'Тврди дека не е точно', 'Не знае'],
    correct: 1,
    explanation: '„Behaupten" значи тврди, а „sei" е Konjunktiv.'
  },
  {
    id: 7,
    type: 'reading',
    question: 'Што значи: „etw. in Kauf nehmen"?',
    options: ['Да купиш', 'Да прифатиш', 'Да одбиеш'],
    correct: 1,
    explanation: '„In Kauf nehmen" значи прифати/толерира.'
  },
  {
    id: 8,
    type: 'reading',
    question: 'Прочитајте: „Darüber hinaus hat er auch andere Erfahrungen."',
    context: 'Покрај тоа:',
    options: ['Има и други искуства', 'Нема други искуства', 'Само едно искуство'],
    correct: 0,
    explanation: '„Darüber hinaus" значи покрај тоа/освен тоа.'
  },
  {
    id: 9,
    type: 'reading',
    question: 'Што значи: „jmdm. etw. unterstellen"?',
    options: ['Да помогнеш', 'Да припишеш', 'Да разбереш'],
    correct: 1,
    explanation: '„Unterstellen" значи припишува (често негативно).'
  },
  {
    id: 10,
    type: 'reading',
    question: 'Прочитајте: „Es ist ratsam, vorher anzurufen."',
    context: 'Советот е:',
    options: ['Не треба да се јавувате', 'Добро е да се јавите однапред', 'Треба да одите лично'],
    correct: 1,
    explanation: '„Ratsam" значи препорачливо/разумно.'
  },
  {
    id: 11,
    type: 'reading',
    question: 'Што значи: „etw. zur Folge haben"?',
    options: ['Да бараш', 'Да предизвикаш', 'Да избегнеш'],
    correct: 1,
    explanation: '„Zur Folge haben" значи има за последица.'
  },
  {
    id: 12,
    type: 'reading',
    question: 'Прочитајте: „Nicht nur ..., sondern auch ..."',
    context: 'Ова е конструкција за:',
    options: ['Негација', 'Дополнување', 'Спротивност'],
    correct: 1,
    explanation: '„Nicht nur...sondern auch" значи „не само...туку и".'
  },
  {
    id: 13,
    type: 'reading',
    question: 'Што значи: „im Nachhinein"?',
    options: [' однапред', 'подоцна/после', 'во исто време'],
    correct: 1,
    explanation: '„Im Nachhinein" значи после настанот/подоцна.'
  },
  {
    id: 14,
    type: 'reading',
    question: 'Прочитајте: „Das muss nicht unbedingt so sein."',
    context: 'Значењето е:',
    options: ['Мора така', 'Не мора така', 'Секогаш е така'],
    correct: 1,
    explanation: '„Nicht unbedeated" значи не е неопходно.'
  },
  {
    id: 15,
    type: 'reading',
    question: 'Што значи: „jmdn. auf etw. aufmerksam machen"?',
    options: ['Да внимаваш', 'Да привлечеш внимание', 'Да спречиш'],
    correct: 1,
    explanation: 'Значи да укажеш на нешто/привлечеш внимание.'
  },
  // LISTENING (15 questions)
  {
    id: 16,
    type: 'listening',
    question: 'Слушнете: „Wenn ich gewonnen hätte, wäre ich glücklich gewesen."',
    context: 'Ова е:',
    options: ['Реална ситуација', 'Нереална/хипотетична ситуација', 'Планирана ситуација'],
    correct: 1,
    explanation: 'Konjunktiv II (gewonnen hätte, wäre gewesen) значи хипотетично.'
  },
  {
    id: 17,
    type: 'listening',
    question: 'Слушнете: „Man sollte mehr für die Umwelt tun."',
    context: 'Ова е:',
    options: ['Констатација', 'Совет/препорака', 'Факт'],
    correct: 1,
    explanation: '„Man sollte" значи треба/би требало.'
  },
  {
    id: 18,
    type: 'listening',
    question: 'Слушнете: „Ich könnte mir vorstellen, dort zu arbeiten."',
    context: 'Говорникот:',
    options: ['Работи таму', 'Би можел да работи таму', 'Не сака да работи таму'],
    correct: 1,
    explanation: '„Könnte mir vorstellen" значи би можел да замисли/би сакал.'
  },
  {
    id: 19,
    type: 'listening',
    question: 'Слушнете: „Es ist wichtig, dass wir uns darum kümmern."',
    context: 'Тоа е:',
    options: ['Без значење', 'Важно', 'Едноставно'],
    correct: 1,
    explanation: '„Es ist wichtig" значи важно е.'
  },
  {
    id: 20,
    type: 'listening',
    question: 'Слушнете: „Abgesehen davon war alles in Ordnung."',
    context: 'Значењето е:',
    options: ['Сè беше во ред', 'Сè беше лошо', 'Освен тоа, сè беше во ред'],
    correct: 2,
    explanation: '„Abgesehen davon" значи освен тоа.'
  },
  {
    id: 21,
    type: 'listening',
    question: 'Слушнете: „Er tut so, als ob er alles wüsste."',
    context: 'Тој:',
    options: ['Знае сè', 'Се преправа дека знае сè', 'Не знае ништо'],
    correct: 1,
    explanation: '„Tun als ob" значи прави/преправа се.'
  },
  {
    id: 22,
    type: 'listening',
    question: 'Слушнете: „Das ist zwar teuer, aber es lohnt sich."',
    context: 'Иако е скапо:',
    options: ['Не вреди', 'Вреди', 'Не знам'],
    correct: 1,
    explanation: '„Es lohnt sich" значи вреди/исплати се.'
  },
  {
    id: 23,
    type: 'listening',
    question: 'Слушнете: „Ich bin dabei, das Problem zu lösen."',
    context: 'Говорникот:',
    options: ['Реши го проблемот', 'Решава проблем', 'Ќе реши проблем'],
    correct: 1,
    explanation: '„Dabei sein zu" значи во тек сум да.'
  },
  {
    id: 24,
    type: 'listening',
    question: 'Слушнете: „Um ehrlich zu sein, gefällt mir das nicht."',
    context: 'Искрено:',
    options: ['Му се допаѓа', 'Не му се допаѓа', 'Не знае'],
    correct: 1,
    explanation: '„Um ehrlich zu sein" значи искрено.'
  },
  {
    id: 25,
    type: 'listening',
    question: 'Слушнете: „Das wird sich ändern müssen."',
    context: 'Тоа:',
    options: ['Ќе остане исто', 'Ќе мора да се промени', 'Не може да се промени'],
    correct: 1,
    explanation: '„Sich ändern müssen" значи мора да се промени.'
  },
  {
    id: 26,
    type: 'listening',
    question: 'Слушнете: „Ich habe nichts dagegen."',
    context: 'Говорникот:',
    options: ['Против сум', 'Немам ништо против', 'Не сакам'],
    correct: 1,
    explanation: '„Nichts dagegen haben" значи немам против.'
  },
  {
    id: 27,
    type: 'listening',
    question: 'Слушнете: „Darauf kommt es an."',
    context: 'Тоа:',
    options: ['Не е важно', 'Е важно', 'Не знам'],
    correct: 1,
    explanation: '„Darauf kommt es an" значи тоа е важно.'
  },
  {
    id: 28,
    type: 'listening',
    question: 'Слушнете: „Ich mache mir Sorgen um ihn."',
    context: 'Говорникот:',
    options: ['Се грижи за него', 'Не го познава', 'Му е заедно'],
    correct: 0,
    explanation: '„Sorgen machen" значи се грижи/благени.'
  },
  {
    id: 29,
    type: 'listening',
    question: 'Слушнете: „Das lässt sich nicht ändern."',
    context: 'Тоа:',
    options: ['Може да се промени', 'Не може да се промени', 'Ќе се промени'],
    correct: 1,
    explanation: '„Sich nicht lassen" значи не може.'
  },
  {
    id: 30,
    type: 'listening',
    question: 'Слушнете: „Er hat sich durchgesetzt."',
    context: 'Тој:',
    options: ['Се повлече', 'Се наметна/успеа', 'Изгуби'],
    correct: 1,
    explanation: '„Durchsetzen" значи успева/се наметнува.'
  }
];

export const LEVEL_INFO = {
  a1: {
    title: 'Goethe-Zertifikat A1',
    subtitle: 'Start Deutsch 1',
    description: 'Најосновно ниво. Докажува дека можете да се претставите и да комуницирате на едноставен начин.',
    emoji: '📗',
    color: 'from-green-500 to-emerald-700',
    passingScore: 18,
    totalQuestions: 30
  },
  a2: {
    title: 'Goethe-Zertifikat A2', 
    subtitle: 'Start Deutsch 2',
    description: 'Основно ниво. Докажува дека можете да комуницирате во едноставни и рутински ситуации.',
    emoji: '📙',
    color: 'from-blue-500 to-indigo-700',
    passingScore: 18,
    totalQuestions: 30
  },
  b1: {
    title: 'Goethe-Zertifikat B1',
    subtitle: 'Zertifikat Deutsch',
    description: 'Средно ниво. Докажува дека можете да се изразувате јасно и да се снаоѓате во повечето ситуации.',
    emoji: '📕',
    color: 'from-purple-500 to-pink-700',
    passingScore: 18,
    totalQuestions: 30
  }
};
