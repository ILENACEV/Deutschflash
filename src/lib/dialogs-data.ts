export interface DialogLine {
  speaker: 'A' | 'B';
  speakerName: string;
  de: string;
  mk: string;
  isUserTurn: boolean;
}

export interface DialogChoice {
  lineIndex: number;
  options: { de: string; mk: string; isCorrect: boolean }[];
}

export interface Dialog {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1';
  situation: string;
  icon: string;
  lines: DialogLine[];
  choices: DialogChoice[];
  vocabulary: { word: string; translation: string }[];
}

export const DIALOGS_DATA: Dialog[] = [
  // ─────────────────────────────────────────────
  // A1 DIALOGS
  // ─────────────────────────────────────────────
  {
    id: 'restaurant',
    title: 'Во ресторан',
    level: 'A1',
    situation: 'Влегуваш во германски ресторан за да нарачаш ручек. Келнерот доаѓа при тебе.',
    icon: '🍽️',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Келнер',
        de: 'Guten Tag! Was darf ich Ihnen bringen?',
        mk: 'Добар ден! Што можам да ви донесам?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ich hätte gerne die Suppe und ein Schnitzel, bitte.',
        mk: 'Би сакал супа и шницел, те молам.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Келнер',
        de: 'Sehr gerne! Und was möchten Sie trinken?',
        mk: 'Со задоволство! А што би сакале да пиете?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ein Glas Wasser, bitte.',
        mk: 'Чаша вода, те молам.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Келнер',
        de: 'Haben Sie eine Lebensmittelallergie?',
        mk: 'Дали имате алергија на храна?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Nein, ich bin nicht allergisch.',
        mk: 'Не, не сум алергичен/а.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Келнер',
        de: 'Perfekt! Das Essen kommt gleich.',
        mk: 'Одлично! Храната доаѓа набрзо.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Entschuldigung, ich möchte bitte zahlen.',
        mk: 'Извинете, би сакал/а да платам.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Келнер',
        de: 'Das macht 18 Euro, bitte.',
        mk: 'Тоа е 18 евра, те молам.',
        isUserTurn: false,
      },
    ],
    choices: [
      {
        lineIndex: 1,
        options: [
          { de: 'Ich hätte gerne die Suppe und ein Schnitzel, bitte.', mk: 'Супа и шницел, те молам.', isCorrect: true },
          { de: 'Guten Morgen! Ja, bitte!', mk: 'Добро утро! Да, те молам!', isCorrect: false },
          { de: 'Ich bin allergisch.', mk: 'Алергичен/а сум.', isCorrect: false },
        ],
      },
      {
        lineIndex: 5,
        options: [
          { de: 'Ja, ich möchte Suppe.', mk: 'Да, сакам супа.', isCorrect: false },
          { de: 'Nein, ich bin nicht allergisch.', mk: 'Не, не сум алергичен/а.', isCorrect: true },
          { de: 'Ich zahle bar.', mk: 'Плаќам готовинско.', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'das Schnitzel', translation: 'шницелот' },
      { word: 'die Suppe', translation: 'супата' },
      { word: 'zahlen', translation: 'плаќа' },
      { word: 'allergisch', translation: 'алергичен' },
      { word: 'bringen', translation: 'донесува' },
    ],
  },

  {
    id: 'doctor',
    title: 'Кај доктор',
    level: 'A1',
    situation: 'Не се чувствуваш добро и одиш кај доктор. Доктарката прашува за симптомите.',
    icon: '🏥',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Докторка',
        de: 'Guten Tag! Was fehlt Ihnen?',
        mk: 'Добар ден! Што ви недостасува / Каде ве боли?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ich habe Kopfschmerzen und Fieber.',
        mk: 'Имам главоболка и температура.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Докторка',
        de: 'Seit wann haben Sie diese Beschwerden?',
        mk: 'Од кога имате овие тегоби?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Seit zwei Tagen.',
        mk: 'Од два дена.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Докторка',
        de: 'Haben Sie auch Halsschmerzen?',
        mk: 'Дали имате и болки во грлото?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ja, mein Hals tut auch weh.',
        mk: 'Да, грлото ме боли исто.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Докторка',
        de: 'Das ist eine Erkältung. Ich schreibe Ihnen ein Rezept.',
        mk: 'Toa е настинка. Ќе ви напишам рецепт.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Danke, Frau Doktor. Wann kann ich arbeiten?',
        mk: 'Благодарам, господа докторка. Кога можам да работам?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Докторка',
        de: 'In drei bis fünf Tagen. Viel Gute Besserung!',
        mk: 'За три до пет дена. Брзо закрепнување!',
        isUserTurn: false,
      },
    ],
    choices: [
      {
        lineIndex: 1,
        options: [
          { de: 'Ich habe Kopfschmerzen und Fieber.', mk: 'Имам главоболка и температура.', isCorrect: true },
          { de: 'Ich bin Arzt.', mk: 'Јас сум лекар.', isCorrect: false },
          { de: 'Guten Morgen!', mk: 'Добро утро!', isCorrect: false },
        ],
      },
      {
        lineIndex: 5,
        options: [
          { de: 'Nein, ich habe kein Fieber.', mk: 'Не, немам температура.', isCorrect: false },
          { de: 'Ich brauche ein Rezept.', mk: 'Треба ми рецепт.', isCorrect: false },
          { de: 'Ja, mein Hals tut auch weh.', mk: 'Да, грлото ме боли исто.', isCorrect: true },
        ],
      },
    ],
    vocabulary: [
      { word: 'die Kopfschmerzen', translation: 'главоболката' },
      { word: 'das Fieber', translation: 'температурата' },
      { word: 'die Erkältung', translation: 'настинката' },
      { word: 'das Rezept', translation: 'рецептот' },
      { word: 'der Hals', translation: 'грлото' },
    ],
  },

  {
    id: 'airport',
    title: 'На аеродром / воз',
    level: 'A1',
    situation: 'Си на аеродромот и бараш информации за твојот лет. Работникот на инфо-пулт ти помага.',
    icon: '✈️',
    lines: [
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Entschuldigung, wo ist der Gate B7?',
        mk: 'Извинете, каде е портата B7?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Службеник',
        de: 'Gate B7 ist im zweiten Stock, links vom Fahrstuhl.',
        mk: 'Порта B7 е на вториот кат, лево од лифтот.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Wann geht mein Flug ab?',
        mk: 'Кога заминува мојот лет?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Службеник',
        de: 'Ihr Flug StarAlliance 342 geht um 14:30 Uhr ab.',
        mk: 'Вашиот лет StarAlliance 342 заминува во 14:30 часот.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ist der Flug pünktlich?',
        mk: 'Дали летот е навреме?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Службеник',
        de: 'Leider hat der Flug 30 Minuten Verspätung.',
        mk: 'За жал, летот има 30 минути задоцнување.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Oh nein! Danke für die Information.',
        mk: 'О не! Благодарам за информацијата.',
        isUserTurn: true,
      },
    ],
    choices: [
      {
        lineIndex: 2,
        options: [
          { de: 'Ich heiße Max.', mk: 'Се викам Макс.', isCorrect: false },
          { de: 'Wann geht mein Flug ab?', mk: 'Кога заминува мојот лет?', isCorrect: true },
          { de: 'Wo ist die Toilette?', mk: 'Каде е тоалетот?', isCorrect: false },
        ],
      },
      {
        lineIndex: 4,
        options: [
          { de: 'Wo ist mein Koffer?', mk: 'Каде е мојот куфер?', isCorrect: false },
          { de: 'Ich möchte einen Kaffee.', mk: 'Би сакал кафе.', isCorrect: false },
          { de: 'Ist der Flug pünktlich?', mk: 'Дали летот е навреме?', isCorrect: true },
        ],
      },
    ],
    vocabulary: [
      { word: 'der Flug', translation: 'летот' },
      { word: 'die Verspätung', translation: 'задоцнувањето' },
      { word: 'pünktlich', translation: 'навреме / точен' },
      { word: 'der Fahrstuhl', translation: 'лифтот' },
      { word: 'abgehen', translation: 'заминува (лет/воз)' },
    ],
  },

  {
    id: 'supermarket',
    title: 'Во супермаркет',
    level: 'A1',
    situation: 'Во супермаркет не можеш да го најдеш производот. Прашуваш вработен.',
    icon: '🛒',
    lines: [
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Entschuldigung, wo finde ich die Milch?',
        mk: 'Извинете, каде можам да го најдам млекото?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Вработен',
        de: 'Die Milch ist in Gang drei, neben dem Joghurt.',
        mk: 'Млекото е во ред три, до јогуртот.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Und haben Sie Brot ohne Gluten?',
        mk: 'А дали имате леб без глутен?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Вработен',
        de: 'Ja, glutenfreie Produkte sind im Biobereich, Gang fünf.',
        mk: 'Да, производите без глутен се во био делот, ред пет.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Was kostet dieser Käse hier?',
        mk: 'Колку чини ова сирење тука?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Вработен',
        de: 'Der kostet 3,50 Euro pro 100 Gramm.',
        mk: 'Тоа чини 3,50 евра за 100 грама.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ich nehme 200 Gramm, bitte.',
        mk: 'Земам 200 грама, те молам.',
        isUserTurn: true,
      },
    ],
    choices: [
      {
        lineIndex: 2,
        options: [
          { de: 'Wie viel kostet die Milch?', mk: 'Колку чини млекото?', isCorrect: false },
          { de: 'Und haben Sie Brot ohne Gluten?', mk: 'А дали имате леб без глутен?', isCorrect: true },
          { de: 'Ich möchte zahlen.', mk: 'Сакам да платам.', isCorrect: false },
        ],
      },
      {
        lineIndex: 6,
        options: [
          { de: 'Nein danke, das ist zu teuer.', mk: 'Не благодарам, тоа е премногу скапо.', isCorrect: false },
          { de: 'Ich nehme 200 Gramm, bitte.', mk: 'Земам 200 грама, те молам.', isCorrect: true },
          { de: 'Was ist das?', mk: 'Што е тоа?', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'der Gang', translation: 'редот / патеката' },
      { word: 'glutenfrei', translation: 'без глутен' },
      { word: 'kosten', translation: 'чини' },
      { word: 'das Gramm', translation: 'грамот' },
      { word: 'der Joghurt', translation: 'јогуртот' },
    ],
  },

  {
    id: 'directions',
    title: 'Барање правци',
    level: 'A1',
    situation: 'Си изгубен/а во германски град и прашуваш за правец до станицата.',
    icon: '🗺️',
    lines: [
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Entschuldigung, wie komme ich zum Bahnhof?',
        mk: 'Извинете, kako да стигнам до станицата?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Минувач',
        de: 'Gehen Sie geradeaus, dann links an der Ampel.',
        mk: 'Одете право, потоа лево кај семафорот.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ist es weit von hier?',
        mk: 'Дали е далеку оттука?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Минувач',
        de: 'Nein, ungefähr fünf Minuten zu Fuß.',
        mk: 'Не, приближно пет минути пешки.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Gibt es dort auch eine Bushaltestelle?',
        mk: 'Дали има и автобуска постојка таму?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Минувач',
        de: 'Ja, die Haltestelle ist direkt vor dem Bahnhof.',
        mk: 'Да, постојката е директно пред станицата.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Vielen Dank, das war sehr hilfreich!',
        mk: 'Многу благодарам, тоа беше многу корисно!',
        isUserTurn: true,
      },
    ],
    choices: [
      {
        lineIndex: 2,
        options: [
          { de: 'Ich bin Tourist.', mk: 'Јас сум турист.', isCorrect: false },
          { de: 'Ist es weit von hier?', mk: 'Дали е далеку оттука?', isCorrect: true },
          { de: 'Sprechen Sie Mazedonisch?', mk: 'Зборувате ли македонски?', isCorrect: false },
        ],
      },
      {
        lineIndex: 4,
        options: [
          { de: 'Wie heißt die Straße?', mk: 'Kako се вика улицата?', isCorrect: false },
          { de: 'Gibt es dort auch eine Bushaltestelle?', mk: 'Дали има и автобуска постојка таму?', isCorrect: true },
          { de: 'Ich gehe nach Hause.', mk: 'Одам дома.', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'geradeaus', translation: 'право / директно' },
      { word: 'die Ampel', translation: 'семафорот' },
      { word: 'zu Fuß', translation: 'пешки' },
      { word: 'die Haltestelle', translation: 'постојката' },
      { word: 'hilfreich', translation: 'корисно' },
    ],
  },

  // ─────────────────────────────────────────────
  // A2 DIALOGS
  // ─────────────────────────────────────────────
  {
    id: 'hotel',
    title: 'Во хотел',
    level: 'A2',
    situation: 'Пристигнуваш во германски хотел за чекирање but постои проблем со резервацијата.',
    icon: '🏨',
    lines: [
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Guten Abend! Ich habe eine Reservierung auf den Namen Stojanović.',
        mk: 'Добровечер! Имам резервација на името Стојановиќ.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Рецепционер',
        de: 'Einen Moment bitte... Ich finde leider keine Reservierung unter diesem Namen.',
        mk: 'Момент те молам... За жал, не наоѓам резервација под тоа име.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Das kann nicht sein! Hier ist meine Bestätigung per E-Mail.',
        mk: 'Тоа не може да биде! Еве ми потврдата по е-пошта.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Рецепционер',
        de: 'Ah, verstehe! Die Buchung läuft unter "Stojanovic" ohne Akzent. Entschuldigung!',
        mk: 'А, разбирам! Резервацијата е под „Stojanovic" без акцент. Извинете!',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Kein Problem. Gibt es WLAN im Zimmer?',
        mk: 'Нема проблем. Дали има WLAN во собата?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Рецепционер',
        de: 'Ja, natürlich. Das Passwort steht auf dieser Karte.',
        mk: 'Да, се разбира. Лозинката е напишана на оваа картичка.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Wann ist das Frühstück?',
        mk: 'Кога е појадокот?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Рецепционер',
        de: 'Von 7:00 bis 10:30 Uhr im Erdgeschoss. Gute Nacht!',
        mk: 'Од 7:00 до 10:30 часот на приземјето. Лека ноќ!',
        isUserTurn: false,
      },
    ],
    choices: [
      {
        lineIndex: 2,
        options: [
          { de: 'Ich brauche ein anderes Zimmer.', mk: 'Треба ми друга соба.', isCorrect: false },
          { de: 'Das kann nicht sein! Hier ist meine Bestätigung per E-Mail.', mk: 'Тоа не може да биде! Еве ми потврдата по е-пошта.', isCorrect: true },
          { de: 'Auf Wiedersehen!', mk: 'Довидување!', isCorrect: false },
        ],
      },
      {
        lineIndex: 6,
        options: [
          { de: 'Wann ist das Frühstück?', mk: 'Кога е појадокот?', isCorrect: true },
          { de: 'Haben Sie ein Taxi?', mk: 'Дали имате такси?', isCorrect: false },
          { de: 'Die Dusche funktioniert nicht.', mk: 'Тушот не работи.', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'die Reservierung', translation: 'резервацијата' },
      { word: 'die Bestätigung', translation: 'потврдата' },
      { word: 'das Frühstück', translation: 'појадокот' },
      { word: 'das Erdgeschoss', translation: 'приземјето' },
      { word: 'laufen unter', translation: 'се води под (систем)' },
    ],
  },

  {
    id: 'roommate',
    title: 'Разговор со цимер',
    level: 'A2',
    situation: 'Штотуку се вселил/а во заеднички стан. Го среќаваш твојот нов цимер и разговарате за правилата.',
    icon: '🏠',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Цимер (Тим)',
        de: 'Hallo! Du musst der neue Mitbewohner sein. Ich bin Tim.',
        mk: 'Здраво! Ти мора да си новиот сосед. Јас сум Тим.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Hallo Tim, ich bin Marko. Freut mich, dich kennenzulernen!',
        mk: 'Здраво Тим, јас сум Марко. Драго ми е да те запознам!',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Тим',
        de: 'Lass mich die Hausregeln erklären. Die Küche putzen wir abwechselnd.',
        mk: 'Дозволи ми да ги објаснам правилата. Кујната ја чистиме наизменично.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Klar, kein Problem. Wer kauft das Toilettenpapier?',
        mk: 'Јасно, нема проблем. Кој купува тоалетна хартија?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Тим',
        de: 'Wir teilen die Kosten. Jeden Monat zahlt einer von uns.',
        mk: 'Ги делиме трошоците. Секој месец плаќа еден од нас.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Gut. Und darf ich manchmal Freunde einladen?',
        mk: 'Добро. А смеам ли понекогаш да поканувам пријатели?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Тим',
        de: 'Natürlich! Nur nach 23 Uhr bitte leise, wegen der Nachbarn.',
        mk: 'Се разбира! Само по 23 часот те молам тивко, поради соседите.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Verstanden! Ich glaube, wir werden gute Mitbewohner sein.',
        mk: 'Разбрав! Мислам дека ќе бидеме добри соседи.',
        isUserTurn: true,
      },
    ],
    choices: [
      {
        lineIndex: 3,
        options: [
          { de: 'Ich koche nicht gerne.', mk: 'Не сакам да готвам.', isCorrect: false },
          { de: 'Klar, kein Problem. Wer kauft das Toilettenpapier?', mk: 'Јасно, нема проблем. Кој купува тоалетна хартија?', isCorrect: true },
          { de: 'Ich habe schon eine WG.', mk: 'Јас веќе имам стан.', isCorrect: false },
        ],
      },
      {
        lineIndex: 5,
        options: [
          { de: 'Wann schauen wir fern?', mk: 'Кога гледаме телевизија?', isCorrect: false },
          { de: 'Gut. Und darf ich manchmal Freunde einladen?', mk: 'Добро. А смеам ли понекогаш да поканувам пријатели?', isCorrect: true },
          { de: 'Ich schlafe früh.', mk: 'Рано спијам.', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'der Mitbewohner', translation: 'соседот (во стан)' },
      { word: 'abwechselnd', translation: 'наизменично' },
      { word: 'die Kosten', translation: 'трошоците' },
      { word: 'einladen', translation: 'поканува' },
      { word: 'leise', translation: 'тивко' },
    ],
  },

  {
    id: 'job-interview',
    title: 'Интервју за работа',
    level: 'A2',
    situation: 'Имаш интервју за работа во германска компанија. Се среќаваш со менаџерката за ресурси.',
    icon: '💼',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Менаџерка',
        de: 'Guten Morgen! Bitte nehmen Sie Platz. Erzählen Sie uns etwas über sich.',
        mk: 'Добро утро! Ве молам седнете. Раскажете ни нешто за себе.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Guten Morgen! Ich heiße Ana Petrovska und ich komme aus Mazedonien. Ich habe drei Jahre Erfahrung im Marketing.',
        mk: 'Добро утро! Се викам Ана Петровска и доаѓам од Македонија. Имам три години искуство во маркетингот.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Менаџерка',
        de: 'Sehr gut. Warum möchten Sie bei uns arbeiten?',
        mk: 'Многу добро. Зошто сакате да работите кај нас?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ihre Firma ist sehr innovativ und ich möchte in einem internationalen Team arbeiten.',
        mk: 'Вашата компанија е многу иновативна и сакам да работам во меѓународен тим.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Менаџерка',
        de: 'Welche Sprachkenntnisse haben Sie?',
        mk: 'Кои јазични вештини имате?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ich spreche Mazedonisch, Englisch und Deutsch auf B2-Niveau.',
        mk: 'Зборувам македонски, англиски и германски на ниво Б2.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Менаџерка',
        de: 'Wann könnten Sie anfangen?',
        mk: 'Кога би можеле да почнете?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ab dem ersten Mai wäre ich verfügbar.',
        mk: 'Од прв мај би бил/а на располагање.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Менаџерка',
        de: 'Ausgezeichnet! Wir melden uns bis Ende der Woche.',
        mk: 'Одлично! Ќе ве контактираме до крај на неделата.',
        isUserTurn: false,
      },
    ],
    choices: [
      {
        lineIndex: 3,
        options: [
          { de: 'Ich brauche Geld.', mk: 'Ми требаат пари.', isCorrect: false },
          { de: 'Ihre Firma ist sehr innovativ und ich möchte in einem internationalen Team arbeiten.', mk: 'Вашата компанија е иновативна и сакам меѓународен тим.', isCorrect: true },
          { de: 'Ich weiß nicht.', mk: 'Не знам.', isCorrect: false },
        ],
      },
      {
        lineIndex: 7,
        options: [
          { de: 'Sofort, wenn Sie wollen.', mk: 'Веднаш, ако сакате.', isCorrect: false },
          { de: 'Ab dem ersten Mai wäre ich verfügbar.', mk: 'Од прв мај би бил/а на располагање.', isCorrect: true },
          { de: 'Ich muss noch nachdenken.', mk: 'Треба уште да размислам.', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'die Erfahrung', translation: 'искуството' },
      { word: 'innovativ', translation: 'иновативен' },
      { word: 'die Sprachkenntnisse', translation: 'јазичните знаења' },
      { word: 'verfügbar', translation: 'на располагање' },
      { word: 'sich melden', translation: 'се јавува / контактира' },
    ],
  },

  {
    id: 'bank',
    title: 'На банка / пошта',
    level: 'A2',
    situation: 'Одиш на банка за да отвориш сметка. Банкарот/банкарката ти ги објаснува условите.',
    icon: '🏦',
    lines: [
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Guten Tag! Ich möchte ein Bankkonto eröffnen.',
        mk: 'Добар ден! Би сакал/а да отворам банкарска сметка.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Банкар',
        de: 'Gerne! Haben Sie Ihren Ausweis und eine Meldebestätigung dabei?',
        mk: 'Со задоволство! Дали имате личен документ и потврда за пријава?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ja, hier ist mein Pass und die Anmeldebestätigung.',
        mk: 'Да, еве мојот пасош и потврдата за пријава.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Банкар',
        de: 'Perfekt. Möchten Sie ein Girokonto oder ein Sparkonto?',
        mk: 'Одлично. Дали сакате тековна или штедна сметка?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ein Girokonto, bitte. Was sind die monatlichen Gebühren?',
        mk: 'Тековна сметка, те молам. Кои се месечните надоместоци?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Банкар',
        de: 'Das Konto ist kostenlos, wenn Sie monatlich mindestens 700 Euro einzahlen.',
        mk: 'Сметката е бесплатна ако уплатувате минимум 700 евра месечно.',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Sehr gut! Wann bekomme ich die Karte?',
        mk: 'Многу добро! Кога ќе ја добијам картичката?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Банкар',
        de: 'Die Karte kommt in 7 Werktagen per Post.',
        mk: 'Картичката доаѓа за 7 работни дена по пошта.',
        isUserTurn: false,
      },
    ],
    choices: [
      {
        lineIndex: 4,
        options: [
          { de: 'Ich brauche kein Konto.', mk: 'Не ми треба сметка.', isCorrect: false },
          { de: 'Ein Girokonto, bitte. Was sind die monatlichen Gebühren?', mk: 'Тековна сметка. Кои се месечните надоместоци?', isCorrect: true },
          { de: 'Ich habe kein Geld.', mk: 'Немам пари.', isCorrect: false },
        ],
      },
      {
        lineIndex: 6,
        options: [
          { de: 'Ich möchte das Konto schließen.', mk: 'Сакам да ја затворам сметката.', isCorrect: false },
          { de: 'Sehr gut! Wann bekomme ich die Karte?', mk: 'Многу добро! Кога ќе ја добијам картичката?', isCorrect: true },
          { de: 'Kann ich bar bezahlen?', mk: 'Можам ли да платам готовинско?', isCorrect: false },
        ],
      },
    ],
    vocabulary: [
      { word: 'das Bankkonto', translation: 'банкарската сметка' },
      { word: 'eröffnen', translation: 'отвора (сметка)' },
      { word: 'der Ausweis', translation: 'личниот документ' },
      { word: 'die Gebühr', translation: 'надоместокот' },
      { word: 'der Werktag', translation: 'работниот ден' },
    ],
  },

  {
    id: 'meeting-people',
    title: 'Среќавање нови луѓе',
    level: 'A2',
    situation: 'На студентска забава среќаваш нов студент кој исто така учи германски.',
    icon: '🎉',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Студент (Лукас)',
        de: 'Hey, ich habe dich noch nie hier gesehen. Bist du neu?',
        mk: 'Хеј, никогаш досега не сум те видел. Дали си нов/а?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Ja, ich bin erst seit einem Monat hier. Ich studiere Germanistik.',
        mk: 'Да, сум тука само еден месец. Студирам германистика.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Лукас',
        de: 'Cool! Ich auch! Wie findest du Deutschland bis jetzt?',
        mk: 'Кул! И јас! Kako ти се допаѓа Германија досега?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Es ist schön, aber ich vermisse meine Familie sehr.',
        mk: 'Убаво е, но многу ми недостасува моето семејство.',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Лукас',
        de: 'Das kenne ich! Am Anfang ist es schwer. Woher kommst du eigentlich?',
        mk: 'Тоа го знам! На почетокот е тешко. Всушност, однаде си?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Aus Mazedonien. Hast du schon mal von Skopje gehört?',
        mk: 'Од Македонија. Дали веќе си слушал за Скопје?',
        isUserTurn: true,
      },
      {
        speaker: 'A',
        speakerName: 'Лукас',
        de: 'Natürlich! Ich würde gerne mal hinreisen. Können wir uns öfter treffen?',
        mk: 'Се разбира! Би сакал да патувам таму. Можеме ли почесто да се среќаваме?',
        isUserTurn: false,
      },
      {
        speaker: 'B',
        speakerName: 'Вие',
        de: 'Sehr gerne! Hier ist meine Nummer.',
        mk: 'Многу со задоволство! Еве ти мојот број.',
        isUserTurn: true,
      },
    ],
    choices: [
      {
        lineIndex: 3,
        options: [
          { de: 'Deutschland ist langweilig.', mk: 'Германија е досадна.', isCorrect: false },
          { de: 'Es ist schön, aber ich vermisse meine Familie sehr.', mk: 'Убаво е, но многу ми недостасува семејството.', isCorrect: true },
          { de: 'Ich kenne niemanden.', mk: 'Не познавам никого.', isCorrect: false },
        ],
      },
      {
        lineIndex: 7,
        options: [
          { de: 'Nein, ich bin beschäftigt.', mk: 'Не, зафатена/зафатен сум.', isCorrect: false },
          { de: 'Vielleicht später.', mk: 'Можеби подоцна.', isCorrect: false },
          { de: 'Sehr gerne! Hier ist meine Nummer.', mk: 'Со задоволство! Еве ти мојот број.', isCorrect: true },
        ],
      },
    ],
    vocabulary: [
      { word: 'die Germanistik', translation: 'германистиката' },
      { word: 'vermissen', translation: 'му/и недостасува' },
      { word: 'eigentlich', translation: 'всушност' },
      { word: 'hinreisen', translation: 'патува таму' },
      { word: 'sich treffen', translation: 'се среќаваат' },
    ],
  },
];
