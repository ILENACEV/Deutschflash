export interface Lesson {
  id: string;
  title: string;
  excerpt: string;
  icon: string;
  content: string;
  category: 'basics' | 'grammar' | 'tips';
}

export const LESSONS_DATA: Lesson[] = [

  // ============================================================
  // TIPS
  // ============================================================

  {
    id: 'start-here',
    title: 'Како да почнеш? (Стратегија за успех)',
    excerpt: 'Твојот прв ден на DeutschFlash. Како да учиш паметно, а не напорно.',
    icon: '🚀',
    category: 'tips',
    content: `
      <h2>Добредојде во твојата нова авантура!</h2>
      <p>Учењето нов јазик не е спринт, туку маратон. Најважната работа не е колку саати ќе учиш денес, туку дали ќе ја отвориш апликацијата и утре.</p>

      <h3>⚡ 3 Златни правила за почеток</h3>
      <ul>
        <li><strong>Конзистентност над интензитет:</strong> Подобро 10 минути секој ден, отколку 2 часа еднаш неделно. Мозокот учи преку повторување, не преку маратони.</li>
        <li><strong>Не се плаши од грешки:</strong> Секоја грешка е лекција. Германците знаат дека учиш и ќе те разберат дури и ако кажеш „Ich bin 25 Jahr alt" наместо „Jahre".</li>
        <li><strong>Користи аудио:</strong> Секој збор во DeutschFlash има изговор. Слушај и повторувај гласно — ова е единствениот начин да го „впиеш" ритамот на јазикот.</li>
      </ul>

      <h3>📅 Идеален план за почетник</h3>
      <ul>
        <li><strong>Недела 1–2:</strong> 5 нови зборови на ден + повторување на стари.</li>
        <li><strong>Недела 3–4:</strong> 10 нови зборови на ден. Почни да читаш примерите реченици гласно.</li>
        <li><strong>Месец 2:</strong> Обиди се да составиш своја реченица со секој нов збор.</li>
      </ul>

      <h3>🧠 Зошто германскиот е полесен отколку мислиш</h3>
      <p>Македонскиот и германскиот имаат нешто заедничко — и двата јазика имаат падежи! Иако германскиот има само 4 (Nominativ, Akkusativ, Dativ, Genitiv), македонскиот всушност ги покрива истите концепти. Ти веќе ги знаеш идеите — само треба да ги научиш новите форми.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Колку минути на ден е оптимално за почетник?</p>
        <ul>
          <li>A) 2 часа еднаш неделно</li>
          <li>B) ✅ 10–15 минути секој ден</li>
          <li>C) 30 минути секој петок</li>
        </ul>
        <p><em>Објаснување: Мозокот ги консолидира информациите преку сон. Учи малку, но секој ден.</em></p>

        <p><strong>Прашање 2:</strong> Кој е најдобриот начин да го запомниш изговорот?</p>
        <ul>
          <li>A) Само да го читаш зборот</li>
          <li>B) Да го препишуваш 10 пати</li>
          <li>C) ✅ Да го слушаш и повторуваш гласно</li>
        </ul>
        <p><em>Објаснување: Активното повторување (output) е многу поефикасно од пасивното читање (input).</em></p>

        <p><strong>Прашање 3:</strong> Što правиш кога ќе направиш грешка?</p>
        <ul>
          <li>A) Се откажуваш</li>
          <li>B) Ја игнорираш</li>
          <li>C) ✅ Ја анализираш и продолжуваш</li>
        </ul>
        <p><em>Објаснување: Грешките се дел од процесот. Секоја грешка значи дека мозокот учи нешто ново.</em></p>
      </div>
    `
  },

  {
    id: 'sm2-logic',
    title: 'Зошто DeutschFlash работи? (Науката зад апликацијата)',
    excerpt: 'Науката зад SM-2 алгоритмот и зошто никогаш нема да ги заборавиш зборовите.',
    icon: '🧠',
    category: 'tips',
    content: `
      <h2>Математика за твојата меморија</h2>
      <p>DeutschFlash го користи <strong>SM-2 алгоритмот</strong> (Spaced Repetition System). Наместо да ги повторуваш истите зборови секој ден, системот ти ги покажува само тогаш кога си на пат да ги заборавиш.</p>

      <h3>📉 Кривата на заборавање (Ebbinghaus)</h3>
      <p>Германскиот научник Херман Ебингхаус во 1885 година открил дека:</p>
      <ul>
        <li>По <strong>20 минути</strong> — заборавуваш 42% од новото.</li>
        <li>По <strong>1 ден</strong> — заборавуваш 67%.</li>
        <li>По <strong>1 недела</strong> — заборавуваш 77%.</li>
      </ul>
      <p>Но ако повторуваш точно пред да заборавиш, кривата се рамни. Секое повторување го зголемува интервалот.</p>

      <h3>🔄 Како функционира SM-2 во DeutschFlash</h3>
      <ul>
        <li><strong>Нов збор:</strong> Го гледаш денес → утре → по 3 дена → по 7 дена.</li>
        <li><strong>Тежок збор (swipe left):</strong> Системот го враќа по 1 ден. Повторувај додека не стане лесен.</li>
        <li><strong>Лесен збор (swipe right):</strong> Интервалот се зголемува — по 14, па 30, па 60 дена.</li>
      </ul>

      <h3>🏆 Стрикот — твое тајно оружје</h3>
      <p>Дури и 5 минути на ден е доволно да го задржиш стрикот. Не е важно колку научил денес — важно е дека си отворил апликацијата. Конзистентноста гради навика, а навиката гради јазик.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> По колку време заборавуваш 67% од новото, ако не повторуваш?</p>
        <ul>
          <li>A) По 1 недела</li>
          <li>B) ✅ По 1 ден</li>
          <li>C) По 1 месец</li>
        </ul>
        <p><em>Објаснување: Ебингхаус покажа дека меморијата опаѓа многу брзо без повторување — 67% се губи само по еден ден.</em></p>

        <p><strong>Прашање 2:</strong> Ако еден збор ти е тежок и го swipe-аш лево, кога ќе се врати?</p>
        <ul>
          <li>A) По 7 дена</li>
          <li>B) По 30 дена</li>
          <li>C) ✅ По 1 ден</li>
        </ul>
        <p><em>Објаснување: Тешките зборови се враќаат почесто за да ти дадат повеќе шанси да ги запомниш.</em></p>

        <p><strong>Прашање 3:</strong> Што е поважно за учење јазик?</p>
        <ul>
          <li>A) Учење 5 часа во недела петок</li>
          <li>B) ✅ Учење 10 минути секој ден</li>
          <li>C) Учење само кога имаш расположение</li>
        </ul>
        <p><em>Објаснување: SM-2 работи само со редовно повторување. Конзистентноста е клучот.</em></p>
      </div>
    `
  },

  {
    id: 'pronunciation',
    title: 'Германски изговор: Нема изненадувања!',
    excerpt: 'Германскиот се чита онака kako što се пишува. Научи ги правилата еднаш — и нема исклучоци.',
    icon: '🔊',
    category: 'basics',
    content: `
      <h2>Најдобрата вест за почетниците</h2>
      <p>За разлика од англискиот (зошто „through" не се чита „tru"?), германскиот е <strong>фонетски јазик</strong>. Ова значи: секоја буква се чита и секогаш се чита исто.</p>

      <h3>🔤 Специјални германски букви</h3>
      <ul>
        <li><strong>ä</strong> — слично на македонско „е", но поотворено. <em>Пример: Mädchen (девојче)</em></li>
        <li><strong>ö</strong> — изговори „е", но заокружи ги усните како за „о". <em>Пример: schön (убав)</em></li>
        <li><strong>ü</strong> — изговори „и", но заокружи ги усните. <em>Пример: über (над)</em></li>
        <li><strong>ß</strong> — ова е двојно „ss". <em>Пример: Straße = Strasse (улица)</em></li>
      </ul>

      <h3>🧩 Комбинации на букви</h3>
      <ul>
        <li><strong>ei</strong> = „ај" — <em>Beispiel (пример) = „Бај-шпил"</em></li>
        <li><strong>ie</strong> = „и" — <em>Liebe (љубов) = „Либе"</em></li>
        <li><strong>eu / äu</strong> = „ој" — <em>neu (нов) = „ној"</em></li>
        <li><strong>ch</strong> после а/о/у = „х" — <em>Bach = „Бах"</em></li>
        <li><strong>ch</strong> после е/и = нема македонски еквивалент, слично на „ш" но помеко — <em>ich = „их"</em></li>
        <li><strong>sch</strong> = „ш" — <em>Schule (училиште) = „Шуле"</em></li>
        <li><strong>sp / st</strong> на почеток = „шп / шт" — <em>Sprache = „Шпрахе"</em></li>
        <li><strong>v</strong> = „ф" — <em>Vater (татко) = „Фатер"</em></li>
        <li><strong>w</strong> = „в" — <em>Wasser (вода) = „Васер"</em></li>
        <li><strong>z</strong> = „цв" — <em>Zeit (време) = „Цвајт"</em></li>
      </ul>

      <h3>💡 Практичен совет</h3>
      <p>Кога учиш нов збор, секогаш го слушај изговорот во DeutschFlash и повтори гласно 3 пати. Мозокот памети и преку „мускулна меморија" на устата.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Како се изговара буквата „w" во германски?</p>
        <ul>
          <li>A) Како македонско „в"</li>
          <li>B) ✅ Исто — „в"</li>
          <li>C) Како англиско „w" = „у"</li>
        </ul>
        <p><em>Објаснување: „w" во германски = „в". Wasser = „Васер".</em></p>

        <p><strong>Прашање 2:</strong> Комбинацијата „ei" во германски се чита како:</p>
        <ul>
          <li>A) „еи"</li>
          <li>B) „и"</li>
          <li>C) ✅ „ај"</li>
        </ul>
        <p><em>Објаснување: „ei" = „ај". Beispiel = „Бај-шпил", mein = „мајн".</em></p>

        <p><strong>Прашање 3:</strong> Зборот „Schule" (училиште) се изговара:</p>
        <ul>
          <li>A) „Скуле"</li>
          <li>B) ✅ „Шуле"</li>
          <li>C) „Цхуле"</li>
        </ul>
        <p><em>Објаснување: „sch" секогаш = „ш". Schule = „Шуле".</em></p>
      </div>
    `
  },

  {
    id: 'articles-gender',
    title: 'Der, Die, Das — Родовите (Најважната лекција!)',
    excerpt: 'Зошто постојат три члена и паметните трикови за да ги запомниш.',
    icon: '🏷️',
    category: 'basics',
    content: `
      <h2>Трите члена на германскиот јазик</h2>
      <p>Ова е можеби <strong>најважната лекција</strong> за сите почетници. Во германскиот, секоја именка има род — машки, женски или среден — и треба да го научиш заедно со зборот.</p>
      <ul>
        <li><strong>der</strong> — машки род (der Mann, der Hund, der Tag)</li>
        <li><strong>die</strong> — женски род (die Frau, die Katze, die Stadt)</li>
        <li><strong>das</strong> — среден род (das Kind, das Auto, das Haus)</li>
      </ul>

      <h3>🧠 Паметни правила (не се секогаш точни, но помагаат!)</h3>
      <ul>
        <li><strong>der</strong> — машки: денови, месеци, сезони: <em>der Montag, der Januar, der Sommer</em></li>
        <li><strong>der</strong> — наставки <strong>-er, -ling, -ig, -or</strong>: <em>der Lehrer, der Frühling</em></li>
        <li><strong>die</strong> — женски: наставки <strong>-ung, -heit, -keit, -schaft, -ion, -ie</strong>: <em>die Zeitung, die Gesundheit, die Nation</em></li>
        <li><strong>die</strong> — повеќето цвеќиња и дрвја: <em>die Rose, die Tulpe</em></li>
        <li><strong>das</strong> — среден: наставки <strong>-chen, -lein, -ment, -um</strong>: <em>das Mädchen, das Datum</em></li>
        <li><strong>das</strong> — средниот род ги „крши" сите правила — детето е среден род: <em>das Kind, das Baby</em></li>
      </ul>

      <h3>⚠️ Важна напомена</h3>
      <p>Нема совршен начин да ги погодиш родовите — мора да ги учиш напамет. <strong>Секогаш учи „der/die/das + зборот"</strong> заедно, никогаш само зборот. На пример: не учи „Hund", учи „der Hund".</p>

      <h3>🔄 Членот во множина</h3>
      <p>Добрата вест: Во множина, <strong>сите родови стануваат „die"</strong>!</p>
      <ul>
        <li>der Hund → <strong>die</strong> Hunde</li>
        <li>die Frau → <strong>die</strong> Frauen</li>
        <li>das Kind → <strong>die</strong> Kinder</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Кој член го носи зборот „Zeitung" (весник)?</p>
        <ul>
          <li>A) der Zeitung</li>
          <li>B) das Zeitung</li>
          <li>C) ✅ die Zeitung</li>
        </ul>
        <p><em>Објаснување: Наставката „-ung" секогаш е женски род → die.</em></p>

        <p><strong>Прашање 2:</strong> Зборот „Mädchen" (девојче) има кој член?</p>
        <ul>
          <li>A) die Mädchen</li>
          <li>B) ✅ das Mädchen</li>
          <li>C) der Mädchen</li>
        </ul>
        <p><em>Објаснување: Наставката „-chen" секогаш е среден род → das. Иако е девојче, родот е среден!</em></p>

        <p><strong>Прашање 3:</strong> Кој член го носат сите именки во множина?</p>
        <ul>
          <li>A) der</li>
          <li>B) das</li>
          <li>C) ✅ die</li>
        </ul>
        <p><em>Објаснување: Во множина, сите именки — без исклучок — добиваат „die".</em></p>
      </div>
    `
  },

  // ============================================================
  // GRAMMAR
  // ============================================================

  {
    id: 'word-order',
    title: 'Редослед на зборови: Глаголот е Крал!',
    excerpt: 'Златните правила за V2 и зошто во зависните реченици глаголот оди на крај.',
    icon: '🧩',
    category: 'grammar',
    content: `
      <h2>Правило 1: Позиција 2 (V2 Rule)</h2>
      <p>Во обична германска изјавна реченица, <strong>конјугираниот глагол е СЕКОГАШ на втора позиција</strong>. Не е важно дали прв е подметот или некој прилог за место или време.</p>

      <h3>📌 Примери со глагол на позиција 2</h3>
      <ul>
        <li><em>Ich <strong>lerne</strong> heute Deutsch.</em> — Прво е „јас", глаголот е на место 2. ✅</li>
        <li><em>Heute <strong>lerne</strong> ich Deutsch.</em> — Прво е „денес", глаголот пак е на место 2. ✅</li>
        <li><em>In Berlin <strong>wohnt</strong> mein Bruder.</em> — Прво е „во Берлин", глаголот пак е на место 2. ✅</li>
      </ul>
      <p><strong>Грешка:</strong> <em>Heute ich lerne Deutsch.</em> ❌ — глаголот е на место 3!</p>

      <h3>Правило 2: Зависни реченици — глаголот на КРАЈ</h3>
      <p>Кога користиме сврзници <strong>weil</strong> (затоа што), <strong>dass</strong> (дека), <strong>wenn</strong> (ако/кога), <strong>ob</strong> (дали), <strong>weil</strong>, <strong>obwohl</strong> (иако) — глаголот оди на самиот КРАЈ.</p>
      <ul>
        <li><em>Ich lerne Deutsch, weil es mir <strong>gefällt</strong>.</em> ✅</li>
        <li><em>Er sagt, dass er morgen <strong>kommt</strong>.</em> ✅</li>
        <li><em>Ich weiß nicht, ob sie <strong>kommt</strong>.</em> ✅</li>
      </ul>
      <p><strong>Грешка:</strong> <em>Ich lerne Deutsch, weil es gefällt mir.</em> ❌</p>

      <h3>Правило 3: Прашални реченици — глаголот прв</h3>
      <p>Кога прашуваме директно (ja/nein прашања), глаголот е на ПРВО место.</p>
      <ul>
        <li><em><strong>Kommst</strong> du morgen?</em> — Доаѓаш ли утре?</li>
        <li><em><strong>Hast</strong> du Zeit?</em> — Имаш ли време?</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Која реченица е точна?</p>
        <ul>
          <li>A) Heute ich gehe ins Kino.</li>
          <li>B) ✅ Heute gehe ich ins Kino.</li>
          <li>C) Heute ins Kino ich gehe.</li>
        </ul>
        <p><em>Објаснување: „Heute" е на прво место, па глаголот „gehe" мора да е на второ.</em></p>

        <p><strong>Прашање 2:</strong> Каде оди глаголот во зависна реченица со „weil"?</p>
        <ul>
          <li>A) На второ место</li>
          <li>B) На прво место</li>
          <li>C) ✅ На крај</li>
        </ul>
        <p><em>Објаснување: По weil, dass, wenn, ob — глаголот секогаш оди на крај.</em></p>

        <p><strong>Прашање 3:</strong> Која реченица е точна?</p>
        <ul>
          <li>A) Ich weiß, dass er kommt morgen.</li>
          <li>B) ✅ Ich weiß, dass er morgen kommt.</li>
          <li>C) Ich weiß, dass kommt er morgen.</li>
        </ul>
        <p><em>Објаснување: По „dass" глаголот „kommt" оди на самиот крај.</em></p>
      </div>
    `
  },

  {
    id: 'modal-verbs',
    title: 'Модални глаголи (Моќта на изразување)',
    excerpt: 'Sollen, müssen, können... Kako да кажеш што сакаш, мораш или смееш.',
    icon: '🔋',
    category: 'grammar',
    content: `
      <h2>Што се модални глаголи?</h2>
      <p>Модалните глаголи го менуваат значењето на главниот глагол. Тие стојат на втора позиција (конјугирани), а главниот глагол оди на КРАЈ во инфинитив.</p>

      <h3>📋 6-те модални глаголи</h3>
      <ul>
        <li><strong>können</strong> — може (способност): <em>Ich kann schwimmen.</em> (Можам да пливам.)</li>
        <li><strong>müssen</strong> — мора (обврска): <em>Ich muss arbeiten.</em> (Морам да работам.)</li>
        <li><strong>wollen</strong> — сака / планира: <em>Ich will Deutsch lernen.</em> (Сакам да учам германски.)</li>
        <li><strong>sollen</strong> — треба (наредба/совет од друг): <em>Du sollst mehr schlafen.</em> (Треба да спиеш повеќе.)</li>
        <li><strong>dürfen</strong> — смее (дозвола): <em>Hier darf man nicht rauchen.</em> (Тука не смее да се пуши.)</li>
        <li><strong>mögen / möchten</strong> — сака / би сакал: <em>Ich möchte einen Kaffee.</em> (Би сакал кафе.)</li>
      </ul>

      <h3>🔧 Конјугација — können (може)</h3>
      <ul>
        <li>ich <strong>kann</strong> — er/sie/es <strong>kann</strong></li>
        <li>du <strong>kannst</strong></li>
        <li>wir <strong>können</strong> — sie/Sie <strong>können</strong></li>
        <li>ihr <strong>könnt</strong></li>
      </ul>
      <p>⚠️ <strong>Трик:</strong> Кај сите модални глаголи, 1-во и 3-то лице еднина се ИДЕНТИЧНИ и немаат наставка: <em>ich kann = er kann</em>.</p>

      <h3>📌 Структура на реченица</h3>
      <p>Модален глагол (позиција 2) + ... + главен глагол (КРАЈ, инфинитив)</p>
      <ul>
        <li><em>Ich <strong>muss</strong> heute viel <strong>lernen</strong>.</em></li>
        <li><em>Er <strong>kann</strong> gut <strong>kochen</strong>.</em></li>
        <li><em>Wir <strong>wollen</strong> nach Berlin <strong>fahren</strong>.</em></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Која реченица е точна?</p>
        <ul>
          <li>A) Ich kann nicht schlafen jetzt.</li>
          <li>B) ✅ Ich kann jetzt nicht schlafen.</li>
          <li>C) Ich jetzt kann nicht schlafen.</li>
        </ul>
        <p><em>Објаснување: Модалниот глагол е на позиција 2, инфинитивот „schlafen" е на крај.</em></p>

        <p><strong>Прашање 2:</strong> „Er ___ Deutsch sprechen." — Кој е точниот облик на „können" за „er"?</p>
        <ul>
          <li>A) können</li>
          <li>B) kannst</li>
          <li>C) ✅ kann</li>
        </ul>
        <p><em>Објаснување: За er/sie/es, „können" → „kann". Нема наставка за 3-то лице!</em></p>

        <p><strong>Прашање 3:</strong> Кој модален глагол го искажува значењето „не смее"?</p>
        <ul>
          <li>A) müssen</li>
          <li>B) ✅ dürfen (nicht dürfen)</li>
          <li>C) sollen</li>
        </ul>
        <p><em>Објаснување: „nicht dürfen" = не смее. „nicht müssen" = не мора (нема обврска).</em></p>
      </div>
    `
  },

  {
    id: 'separable-verbs',
    title: 'Разделни глаголи (Trennbare Verben)',
    excerpt: 'Зошто глаголот се распаѓа на два дела и каде оди префиксот?',
    icon: '✂️',
    category: 'grammar',
    content: `
      <h2>Глаголи што се „кршат"</h2>
      <p>Во германскиот, многу глаголи имаат префикс кој во реченицата се одвојува: конјугираниот дел оди на позиција 2, а префиксот оди на самиот КРАЈ.</p>

      <h3>📌 Примери со разделни глаголи</h3>
      <ul>
        <li><strong>aufstehen</strong> (станува) → <em>Ich <strong>stehe</strong> um 7 Uhr <strong>auf</strong>.</em></li>
        <li><strong>anrufen</strong> (јавува) → <em>Er <strong>ruft</strong> seine Mutter <strong>an</strong>.</em></li>
        <li><strong>einkaufen</strong> (купува) → <em>Wir <strong>kaufen</strong> im Supermarkt <strong>ein</strong>.</em></li>
        <li><strong>fernsehen</strong> (гледа ТВ) → <em>Sie <strong>sieht</strong> abends <strong>fern</strong>.</em></li>
        <li><strong>mitkommen</strong> (доаѓа со) → <em>Kommst du <strong>mit</strong>?</em></li>
      </ul>

      <h3>🔍 Најчести разделни префикси</h3>
      <ul>
        <li><strong>auf-</strong> — aufmachen, aufstehen, aufwachen</li>
        <li><strong>an-</strong> — anrufen, ankommen, anziehen</li>
        <li><strong>aus-</strong> — ausgehen, ausziehen, aussehen</li>
        <li><strong>ein-</strong> — einkaufen, einladen, einschlafen</li>
        <li><strong>mit-</strong> — mitkommen, mitbringen, mitnehmen</li>
        <li><strong>vor-</strong> — vorstellen, vorbereiten</li>
        <li><strong>zurück-</strong> — zurückkommen, zurückgeben</li>
      </ul>

      <h3>⚠️ Неразделни префикси (не се одвојуваат!)</h3>
      <p>Префиксите <strong>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</strong> НЕ се одвојуваат:</p>
      <ul>
        <li><strong>verstehen</strong> → <em>Ich <strong>verstehe</strong> dich.</em> (не: „Ich stehe dich ver")</li>
        <li><strong>besuchen</strong> → <em>Er <strong>besucht</strong> seine Oma.</em></li>
      </ul>

      <h3>💡 Трик за препознавање</h3>
      <p>Ако нагласот е на <strong>ПРЕФИКСОТ</strong> → разделен. Ако нагласот е на <strong>ГЛАГОЛОТ</strong> → неразделен.</p>
      <ul>
        <li><strong>AUF</strong>-stehen → разделен ✂️</li>
        <li>ver-<strong>STEHEN</strong> → неразделен ✅</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Која реченица со „aufstehen" е точна?</p>
        <ul>
          <li>A) Ich aufstehe um 7 Uhr.</li>
          <li>B) ✅ Ich stehe um 7 Uhr auf.</li>
          <li>C) Ich stehe auf um 7 Uhr.</li>
        </ul>
        <p><em>Објаснување: Префиксот „auf-" оди на КРАЈ, по сите останати делови на реченицата.</em></p>

        <p><strong>Прашање 2:</strong> „anrufen" (јавува се) — каде оди „an" во реченицата?</p>
        <ul>
          <li>A) Остана прилепен за глаголот</li>
          <li>B) ✅ Оди на крај на реченицата</li>
          <li>C) Не се користи во реченица</li>
        </ul>
        <p><em>Објаснување: Er ruft mich morgen an. — „an" е на крај.</em></p>

        <p><strong>Прашање 3:</strong> „verstehen" — дали е разделен глагол?</p>
        <ul>
          <li>A) ✅ Не, „ver-" е неразделен префикс</li>
          <li>B) Да, „ver" оди на крај</li>
          <li>C) Зависи од реченицата</li>
        </ul>
        <p><em>Објаснување: „ver-" е неразделен префикс — никогаш не се одвојува.</em></p>
      </div>
    `
  },

  {
    id: 'wechselpraepositionen',
    title: 'Двојни предлози (Wo vs. Wohin)',
    excerpt: 'Најголемата дилема: Кога е Akkusativ, а кога Dativ со предлозите за место?',
    icon: '↕️',
    category: 'grammar',
    content: `
      <h2>9-те предлози со две лица</h2>
      <p>Постојат 9 предлози кои можат да бидат и во Akkusativ и во Dativ: <strong>an, auf, hinter, in, neben, über, unter, vor, zwischen</strong>.</p>

      <h3>🗝️ Главното правило</h3>
      <ul>
        <li><strong>Wo? (Каде?) → Dativ</strong> — Локација, мирување, нешто си стои.</li>
        <li><strong>Wohin? (Накаде?) → Akkusativ</strong> — Насока, движење кон цел.</li>
      </ul>

      <h3>📌 Споредба — исто место, различен падеж</h3>
      <ul>
        <li><em>Ich bin <strong>in der</strong> Schule.</em> (Wo? — Сум во училиште, локација → Dativ)</li>
        <li><em>Ich gehe <strong>in die</strong> Schule.</em> (Wohin? — Одам во училиште, насока → Akkusativ)</li>
        <li><em>Das Buch liegt <strong>auf dem</strong> Tisch.</em> (Wo? → Dativ)</li>
        <li><em>Er legt das Buch <strong>auf den</strong> Tisch.</em> (Wohin? → Akkusativ)</li>
      </ul>

      <h3>💡 Трик за памтење</h3>
      <p>Прашај се: <strong>Постои ли движење кон нова локација?</strong></p>
      <ul>
        <li>„Legen, stellen, hängen, setzen" → движење → <strong>Akkusativ</strong></li>
        <li>„Liegen, stehen, hängen, sitzen" → мирување → <strong>Dativ</strong></li>
      </ul>

      <h3>📊 Промена на членот во Dativ</h3>
      <ul>
        <li>der Tisch → <strong>dem</strong> Tisch</li>
        <li>die Schule → <strong>der</strong> Schule</li>
        <li>das Büro → <strong>dem</strong> Büro</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Der Hund liegt ___ Bett." — Dativ или Akkusativ?</p>
        <ul>
          <li>A) unter das Bett (Akkusativ)</li>
          <li>B) ✅ unter dem Bett (Dativ)</li>
          <li>C) unter den Bett</li>
        </ul>
        <p><em>Објаснување: „Liegt" = мирување, Wo? → Dativ. „das Bett" → „dem Bett".</em></p>

        <p><strong>Прашање 2:</strong> „Er hängt das Bild ___ Wand." — Dativ или Akkusativ?</p>
        <ul>
          <li>A) an der Wand (Dativ)</li>
          <li>B) ✅ an die Wand (Akkusativ)</li>
          <li>C) an den Wand</li>
        </ul>
        <p><em>Објаснување: „Hängt" (акција на ставање) = движење, Wohin? → Akkusativ. „die Wand" останува „die Wand".</em></p>

        <p><strong>Прашање 3:</strong> „Ich gehe ___ Supermarkt." — Кој е точниот облик?</p>
        <ul>
          <li>A) in dem Supermarkt</li>
          <li>B) ✅ in den Supermarkt</li>
          <li>C) in der Supermarkt</li>
        </ul>
        <p><em>Објаснување: „Gehe" = движење, Wohin? → Akkusativ. „der Supermarkt" → „den Supermarkt".</em></p>
      </div>
    `
  },

  {
    id: 'cases-overview',
    title: 'Четирите падежи — Целосен преглед',
    excerpt: 'Nominativ, Akkusativ, Dativ, Genitiv — кога и зошто се користи секој.',
    icon: '🗂️',
    category: 'grammar',
    content: `
      <h2>Зошто постојат падежи?</h2>
      <p>Падежите покажуваат <strong>улогата на именката во реченицата</strong> — дали е субјект, директен или индиректен објект, или показува припадност. Македонскиот ги нема формално, но ги покрива преку редоследот на зборови и предлозите.</p>

      <h3>1️⃣ Nominativ — Кој дејствува?</h3>
      <p>Субјектот на реченицата. Секогаш основна форма на членот.</p>
      <ul>
        <li><em><strong>Der</strong> Mann schläft.</em> (Човекот спие.)</li>
        <li><em><strong>Die</strong> Frau arbeitet.</em></li>
        <li><em><strong>Das</strong> Kind lacht.</em></li>
      </ul>

      <h3>2️⃣ Akkusativ — Кого/Што?</h3>
      <p>Директниот објект. Само машкиот род се менува: <strong>der → den</strong>.</p>
      <ul>
        <li><em>Ich sehe <strong>den</strong> Mann.</em> (Го гледам човекот.)</li>
        <li><em>Ich kaufe <strong>die</strong> Jacke.</em> (Ја купувам јакната.)</li>
        <li><em>Ich lese <strong>das</strong> Buch.</em> (Ја читам книгата.)</li>
      </ul>

      <h3>3️⃣ Dativ — Кому?</h3>
      <p>Индиректниот објект. <strong>der/das → dem, die → der</strong>.</p>
      <ul>
        <li><em>Ich helfe <strong>dem</strong> Mann.</em> (Му помагам на човекот.)</li>
        <li><em>Ich gebe <strong>der</strong> Frau das Buch.</em> (Ѝ ја давам книгата на жената.)</li>
        <li><em>Er dankt <strong>dem</strong> Kind.</em> (Му благодари на детето.)</li>
      </ul>

      <h3>4️⃣ Genitiv — Чие?</h3>
      <p>Покажува припадност. <strong>des + наставка -s/-es (м/ср), der (ж)</strong>.</p>
      <ul>
        <li><em>Das Auto <strong>des</strong> Mannes.</em> (Автомобилот на човекот.)</li>
        <li><em>Die Tasche <strong>der</strong> Frau.</em> (Чантата на жената.)</li>
      </ul>

      <h3>📊 Табела на членови по падеж</h3>
      <ul>
        <li><strong>Nominativ:</strong> der — die — das — die (мн.)</li>
        <li><strong>Akkusativ:</strong> den — die — das — die (мн.)</li>
        <li><strong>Dativ:</strong> dem — der — dem — den (мн.)</li>
        <li><strong>Genitiv:</strong> des — der — des — der (мн.)</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Ich sehe ___ Hund." — Кој е точниот член?</p>
        <ul>
          <li>A) der Hund</li>
          <li>B) ✅ den Hund</li>
          <li>C) dem Hund</li>
        </ul>
        <p><em>Објаснување: „Sehen" бара Akkusativ (Кого/Што гледам?). Машки род → den.</em></p>

        <p><strong>Прашање 2:</strong> „Ich helfe ___ Frau." — Кој е точниот член?</p>
        <ul>
          <li>A) die Frau</li>
          <li>B) den Frau</li>
          <li>C) ✅ der Frau</li>
        </ul>
        <p><em>Објаснување: „Helfen" бара Dativ (Кому помагам?). Женски Dativ → der.</em></p>

        <p><strong>Прашање 3:</strong> „Das ist das Auto ___ Vaters." — Кој е точниот член?</p>
        <ul>
          <li>A) der Vaters</li>
          <li>B) dem Vaters</li>
          <li>C) ✅ des Vaters</li>
        </ul>
        <p><em>Објаснување: Геnitiv покажува припадност. Машки/среден род → des + наставка -s.</em></p>
      </div>
    `
  },

  {
    id: 'present-tense',
    title: 'Сегашно време (Präsens) — Конјугација',
    excerpt: 'Како се менуваат глаголите за секое лице и кои се неправилните?',
    icon: '⏱️',
    category: 'grammar',
    content: `
      <h2>Сегашното време во германски</h2>
      <p>Германскиот Präsens се користи и за сегашни дејства и за блиска иднина — слично на македонскиот. „Ich komme morgen" = „Доаѓам утре".</p>

      <h3>🔧 Правилна конјугација — spielen (игра)</h3>
      <ul>
        <li>ich spiel<strong>e</strong></li>
        <li>du spiel<strong>st</strong></li>
        <li>er/sie/es spiel<strong>t</strong></li>
        <li>wir spiel<strong>en</strong></li>
        <li>ihr spiel<strong>t</strong></li>
        <li>sie/Sie spiel<strong>en</strong></li>
      </ul>

      <h3>⚠️ Неправилни глаголи — најважните</h3>
      <ul>
        <li><strong>sein</strong> (сум): ich bin, du bist, er ist, wir sind, ihr seid, sie sind</li>
        <li><strong>haben</strong> (имам): ich habe, du hast, er hat, wir haben, ihr habt, sie haben</li>
        <li><strong>werden</strong> (ставам/ќе): ich werde, du wirst, er wird, wir werden</li>
        <li><strong>fahren</strong> (возам): ich fahre, du <strong>fährst</strong>, er <strong>fährt</strong></li>
        <li><strong>lesen</strong> (читам): ich lese, du <strong>liest</strong>, er <strong>liest</strong></li>
        <li><strong>sprechen</strong> (зборувам): ich spreche, du <strong>sprichst</strong>, er <strong>spricht</strong></li>
        <li><strong>sehen</strong> (гледам): ich sehe, du <strong>siehst</strong>, er <strong>sieht</strong></li>
      </ul>

      <h3>💡 Трик за промена на самогласка</h3>
      <p>Многу неправилни глаголи ја менуваат самогласката само кај <strong>du и er/sie/es</strong>:</p>
      <ul>
        <li>a → ä: fahren → du fährst</li>
        <li>e → i: sprechen → du sprichst</li>
        <li>e → ie: sehen → du siehst</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Er ___ nach Berlin." (fahren)</p>
        <ul>
          <li>A) fahrt</li>
          <li>B) ✅ fährt</li>
          <li>C) fahren</li>
        </ul>
        <p><em>Објаснување: „fahren" е неправилен — а→ä за er/sie/es: er fährt.</em></p>

        <p><strong>Прашање 2:</strong> „Du ___ Deutsch." (sprechen)</p>
        <ul>
          <li>A) sprechst</li>
          <li>B) sprechen</li>
          <li>C) ✅ sprichst</li>
        </ul>
        <p><em>Објаснување: „sprechen" е неправилен — e→i за du: du sprichst.</em></p>

        <p><strong>Прашање 3:</strong> „Wir ___ Zeit." (haben)</p>
        <ul>
          <li>A) hat</li>
          <li>B) hast</li>
          <li>C) ✅ haben</li>
        </ul>
        <p><em>Објаснување: За wir, „haben" останува „haben". Само er/sie/es → hat.</em></p>
      </div>
    `
  },

  {
    id: 'past-tense-haben-sein',
    title: 'Минато време: haben или sein?',
    excerpt: 'Зошто некои глаголи бараат „haben", а други „sein" во Perfekt?',
    icon: '⏪',
    category: 'grammar',
    content: `
      <h2>Perfekt — Минатото во разговорниот германски</h2>
      <p>Во секојдневниот разговор, Германците го користат <strong>Perfekt</strong> (не Präteritum) за да зборуваат за минатото: „Ich habe gegessen" = „Јадев / Јадов".</p>

      <h3>🔧 Структура на Perfekt</h3>
      <p><strong>haben/sein (конјугиран) + Partizip II (на крај)</strong></p>
      <ul>
        <li><em>Ich <strong>habe</strong> Deutsch <strong>gelernt</strong>.</em> (Учев германски.)</li>
        <li><em>Er <strong>ist</strong> nach Berlin <strong>gefahren</strong>.</em> (Отишол во Берлин.)</li>
      </ul>

      <h3>🗝️ Правилото: haben vs. sein</h3>
      <ul>
        <li><strong>sein</strong> → глаголи за <strong>движење од А до Б</strong>: gehen, fahren, fliegen, kommen, laufen</li>
        <li><strong>sein</strong> → глаголи за <strong>промена на состојба</strong>: werden (станува), wachsen (расте), einschlafen (заспива), sterben (умира)</li>
        <li><strong>sein</strong> → секогаш: sein, bleiben, passieren</li>
        <li><strong>haben</strong> → сите останати глаголи (транзитивни: essen, kaufen, sehen, lernen...)</li>
      </ul>

      <h3>📌 Partizip II — Правила за формирање</h3>
      <ul>
        <li>Правилни: <strong>ge- + основа + -t</strong>: lernen → <strong>ge</strong>lern<strong>t</strong>, kaufen → <strong>ge</strong>kauf<strong>t</strong></li>
        <li>Неправилни: треба да се учат напамет: gehen → <strong>gegangen</strong>, kommen → <strong>gekommen</strong>, essen → <strong>gegessen</strong></li>
        <li>Со неразделни префикси: без „ge-": verstehen → <strong>verstanden</strong>, besuchen → <strong>besucht</strong></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Ich ___ nach Hause gegangen." — haben или sein?</p>
        <ul>
          <li>A) habe</li>
          <li>B) ✅ bin</li>
          <li>C) war</li>
        </ul>
        <p><em>Објаснување: „gehen" е движење А→Б → sein. „Ich bin nach Hause gegangen."</em></p>

        <p><strong>Прашање 2:</strong> „Er ___ ein Buch gelesen." — haben или sein?</p>
        <ul>
          <li>A) ist</li>
          <li>B) war</li>
          <li>C) ✅ hat</li>
        </ul>
        <p><em>Објаснување: „lesen" е транзитивен глагол (бара директен објект) → haben.</em></p>

        <p><strong>Прашање 3:</strong> Partizip II на „kaufen" (купувам) е:</p>
        <ul>
          <li>A) gekauff</li>
          <li>B) ✅ gekauft</li>
          <li>C) kauft</li>
        </ul>
        <p><em>Објаснување: Правилни глаголи: ge- + основа + -t. kaufen → ge-kauf-t.</em></p>
      </div>
    `
  },

  {
    id: 'adjective-endings',
    title: 'Наставки на придавки — Der/Ein/Без член',
    excerpt: 'Зошто „gut" станува „guter", „gute" или „gutes" — и кога.',
    icon: '📝',
    category: 'grammar',
    content: `
      <h2>Зошто придавките се менуваат?</h2>
      <p>Во германскиот, придавките пред именката добиваат наставка која зависи од: <strong>родот, падежот и типот на членот</strong> (одреден, неодреден или без член).</p>

      <h3>📌 По ОДРЕДЕН член (der/die/das)</h3>
      <p>Одреденот член веќе ни ја кажа информацијата за родот → придавката добива само <strong>-e или -en</strong>.</p>
      <ul>
        <li>Nominativ: der alt<strong>e</strong> Mann, die alt<strong>e</strong> Frau, das alt<strong>e</strong> Kind</li>
        <li>Akkusativ (само машки се менува): den alt<strong>en</strong> Mann</li>
        <li>Dativ (сите): dem alt<strong>en</strong> Mann, der alt<strong>en</strong> Frau, dem alt<strong>en</strong> Kind</li>
      </ul>

      <h3>📌 По НЕОДРЕДЕН член (ein/eine)</h3>
      <p>Неодреденот член не ни ја дава целата информација → придавката мора да „пополни" со посилна наставка.</p>
      <ul>
        <li>Nominativ: ein alt<strong>er</strong> Mann, eine alt<strong>e</strong> Frau, ein alt<strong>es</strong> Kind</li>
        <li>Akkusativ: einen alt<strong>en</strong> Mann, eine alt<strong>e</strong> Frau, ein alt<strong>es</strong> Kind</li>
        <li>Dativ (сите): einem alt<strong>en</strong> Mann/Kind, einer alt<strong>en</strong> Frau</li>
      </ul>

      <h3>💡 Брза логика</h3>
      <ul>
        <li>По <strong>der/die/das</strong> → речиси секогаш <strong>-e</strong> (Nominativ/Akk ж/ср) или <strong>-en</strong></li>
        <li>По <strong>ein/eine</strong> → Nominativ маш. = <strong>-er</strong>, ср. = <strong>-es</strong>, ж. = <strong>-e</strong></li>
        <li>Dativ → СЕКОГАШ <strong>-en</strong>, без исклучок</li>
        <li>Множина → СЕКОГАШ <strong>-en</strong></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Das ist ein gut___ Mann." — Номинатив, машки, неодреден член.</p>
        <ul>
          <li>A) gute</li>
          <li>B) ✅ guter</li>
          <li>C) guten</li>
        </ul>
        <p><em>Објаснување: Неодреден член + Nominativ + машки род → наставка -er.</em></p>

        <p><strong>Прашање 2:</strong> „Ich sehe den alt___ Mann." — Akkusativ, машки, одреден член.</p>
        <ul>
          <li>A) alte</li>
          <li>B) altes</li>
          <li>C) ✅ alten</li>
        </ul>
        <p><em>Објаснување: По den (Akkusativ машки) → секогаш -en.</em></p>

        <p><strong>Прашање 3:</strong> „Mit einem gut___ Freund." — Dativ, машки, неодреден член.</p>
        <ul>
          <li>A) guter</li>
          <li>B) gutes</li>
          <li>C) ✅ guten</li>
        </ul>
        <p><em>Објаснување: Dativ → СЕКОГАШ -en, без исклучок.</em></p>
      </div>
    `
  },

  {
    id: 'negation',
    title: 'Негација: nicht vs. kein',
    excerpt: 'Кога велиш „не" со „nicht" и кога со „kein"? Едноставното правило.',
    icon: '🚫',
    category: 'grammar',
    content: `
      <h2>Две начини за кажување „не"</h2>
      <p>Германскиот има два начини за негација и изборот зависи од тоа <strong>што негираш</strong>.</p>

      <h3>📌 kein / keine / kein — Негација на ИМЕНКИ</h3>
      <p>Користи <strong>kein</strong> кога негираш именка која би имала <strong>неодреден член (ein/eine)</strong> или <strong>без член</strong>.</p>
      <ul>
        <li>Ich habe <strong>ein</strong> Auto. → Ich habe <strong>kein</strong> Auto. (Немам автомобил.)</li>
        <li>Ich trinke <strong>Wasser</strong>. → Ich trinke <strong>kein</strong> Wasser. (Не пијам вода.)</li>
        <li>Das ist <strong>eine</strong> gute Idee. → Das ist <strong>keine</strong> gute Idee. (Тоа не е добра идеја.)</li>
      </ul>
      <p><strong>kein</strong> се конјугира исто како <strong>ein</strong>: kein/keine/kein → Akkusativ машки: <strong>keinen</strong></p>

      <h3>📌 nicht — Негација на сè друго</h3>
      <p>Користи <strong>nicht</strong> за:</p>
      <ul>
        <li>Глаголи: <em>Ich <strong>lerne nicht</strong>.</em> (Не учам.)</li>
        <li>Придавки: <em>Das ist <strong>nicht</strong> gut.</em> (Тоа не е добро.)</li>
        <li>Прилози: <em>Er kommt <strong>nicht</strong> heute.</em> (Не доаѓа денес.)</li>
        <li>Одредена именка (со den/die/das): <em>Ich sehe <strong>nicht</strong> den Mann.</em></li>
      </ul>

      <h3>📍 Каде оди „nicht" во реченицата?</h3>
      <ul>
        <li>Обично <strong>пред придавката или прилогот</strong> кој го негира: <em>Das ist nicht <strong>gut</strong>.</em></li>
        <li>На <strong>крај</strong> кога ја негира целата реченица: <em>Ich lerne <strong>nicht</strong>.</em></li>
        <li>Пред префиксот кај разделни глаголи: <em>Er steht heute <strong>nicht auf</strong>.</em></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Ich habe ___ Zeit." — nicht или kein?</p>
        <ul>
          <li>A) nicht</li>
          <li>B) ✅ keine</li>
          <li>C) nirgends</li>
        </ul>
        <p><em>Објаснување: „Zeit" е именка без член (die Zeit) → користиме kein. Женски → keine Zeit.</em></p>

        <p><strong>Прашање 2:</strong> „Das ist ___ gut." — nicht или kein?</p>
        <ul>
          <li>A) kein</li>
          <li>B) ✅ nicht</li>
          <li>C) keine</li>
        </ul>
        <p><em>Објаснување: „gut" е придавка, не именка → nicht.</em></p>

        <p><strong>Прашање 3:</strong> „Er hat ___ Auto." — nicht или kein?</p>
        <ul>
          <li>A) nicht</li>
          <li>B) kein Auto. ✅</li>
          <li>C) keine</li>
        </ul>
        <p><em>Објаснување: „Auto" е именка со неодреден член (ein Auto) → kein. Среден род → kein Auto.</em></p>
      </div>
    `
  },

  {
    id: 'question-words',
    title: 'Прашални зборови (W-Fragen)',
    excerpt: 'Wer, was, wo, wohin, wann, warum, wie... Научи ги сите W-прашања.',
    icon: '❓',
    category: 'basics',
    content: `
      <h2>W-прашањата — основата на секој разговор</h2>
      <p>Во германскиот, речиси сите прашални зборови почнуваат со <strong>W</strong>. Откако ќе ги научиш, можеш да поставиш прашање за скоро сè.</p>

      <h3>📋 Сите W-прашања</h3>
      <ul>
        <li><strong>Wer?</strong> — Кој? (за лица, Nominativ): <em>Wer ist das?</em></li>
        <li><strong>Was?</strong> — Што?: <em>Was machst du?</em></li>
        <li><strong>Wo?</strong> — Каде? (локација): <em>Wo wohnst du?</em></li>
        <li><strong>Wohin?</strong> — Накаде? (насока): <em>Wohin gehst du?</em></li>
        <li><strong>Woher?</strong> — Од каде?: <em>Woher kommst du?</em></li>
        <li><strong>Wann?</strong> — Кога?: <em>Wann kommst du?</em></li>
        <li><strong>Warum?</strong> — Зошто?: <em>Warum lernst du Deutsch?</em></li>
        <li><strong>Wie?</strong> — Како?: <em>Wie heißt du?</em></li>
        <li><strong>Wie viel?</strong> — Колку? (количина): <em>Wie viel kostet das?</em></li>
        <li><strong>Wie viele?</strong> — Колку? (броење): <em>Wie viele Kinder hast du?</em></li>
        <li><strong>Welcher/Welche/Welches?</strong> — Кој/Која/Кое? (избор): <em>Welches Buch liest du?</em></li>
        <li><strong>Wen?</strong> — Кого? (Akkusativ): <em>Wen siehst du?</em></li>
        <li><strong>Wem?</strong> — Кому? (Dativ): <em>Wem hilfst du?</em></li>
        <li><strong>Wessen?</strong> — Чие? (Genitiv): <em>Wessen Buch ist das?</em></li>
      </ul>

      <h3>💡 Wer vs. Wen vs. Wem</h3>
      <p>Истото „кој" добива различна форма во зависност од падежот:</p>
      <ul>
        <li><strong>Wer</strong> kommt? (Nominativ — субјект)</li>
        <li><strong>Wen</strong> siehst du? (Akkusativ — директен објект)</li>
        <li><strong>Wem</strong> hilfst du? (Dativ — индиректен објект)</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „___ wohnst du?" — Прашуваме за место.</p>
        <ul>
          <li>A) Wohin</li>
          <li>B) ✅ Wo</li>
          <li>C) Woher</li>
        </ul>
        <p><em>Објаснување: „Wo?" = каде (локација). „Wohin?" = накаде (движење).</em></p>

        <p><strong>Прашање 2:</strong> „___ kommst du?" — Прашуваме за потекло.</p>
        <ul>
          <li>A) Wo</li>
          <li>B) Wohin</li>
          <li>C) ✅ Woher</li>
        </ul>
        <p><em>Објаснување: „Woher?" = од каде? За потекло или почетна точка.</em></p>

        <p><strong>Прашање 3:</strong> „___ hilfst du?" — Прашуваме кому помагаш (Dativ).</p>
        <ul>
          <li>A) Wer</li>
          <li>B) Wen</li>
          <li>C) ✅ Wem</li>
        </ul>
        <p><em>Објаснување: „helfen" бара Dativ → прашуваме „Wem?" (Кому?).</em></p>
      </div>
    `
  },

  {
    id: 'common-phrases',
    title: 'Најважните фрази за преживување',
    excerpt: 'Со овие 20 фрази можеш да се снајдеш во Германија од ден 1.',
    icon: '💬',
    category: 'basics',
    content: `
      <h2>Фрази кои ти ги отвораат вратите</h2>
      <p>Пред да научиш граматика, научи ги овие фрази напамет. Тие покриваат 80% од секојдневните ситуации.</p>

      <h3>👋 Поздравување</h3>
      <ul>
        <li><strong>Guten Morgen!</strong> — Добро утро! (до ~10h)</li>
        <li><strong>Guten Tag!</strong> — Добар ден! (10h–18h)</li>
        <li><strong>Guten Abend!</strong> — Добровечер! (по 18h)</li>
        <li><strong>Hallo!</strong> — Здраво! (неформално)</li>
        <li><strong>Tschüss! / Auf Wiedersehen!</strong> — Пај-пај! / Довидување!</li>
      </ul>

      <h3>🙋 Претставување</h3>
      <ul>
        <li><strong>Wie heißt du? / Wie heißen Sie?</strong> — Kako се викаш? / Как се викате?</li>
        <li><strong>Ich heiße Anna.</strong> — Се викам Ана.</li>
        <li><strong>Woher kommst du?</strong> — Од каде си?</li>
        <li><strong>Ich komme aus Mazedonien.</strong> — Јас сум од Македонија.</li>
        <li><strong>Wie alt bist du?</strong> — Колку години имаш?</li>
        <li><strong>Ich bin 25 Jahre alt.</strong> — Имам 25 години.</li>
      </ul>

      <h3>🙏 Учтивост</h3>
      <ul>
        <li><strong>Bitte!</strong> — Те молам! / Заповедај!</li>
        <li><strong>Danke (schön)!</strong> — Благодарам (многу)!</li>
        <li><strong>Bitte sehr!</strong> — Нема на што!</li>
        <li><strong>Entschuldigung!</strong> — Извинете!</li>
        <li><strong>Es tut mir leid.</strong> — Жалам. / Извини ме.</li>
      </ul>

      <h3>❓ Кога не разбираш</h3>
      <ul>
        <li><strong>Wie bitte?</strong> — Молам? (не разбрав)</li>
        <li><strong>Können Sie langsamer sprechen?</strong> — Можете ли побавно?</li>
        <li><strong>Ich verstehe nicht.</strong> — Не разбирам.</li>
        <li><strong>Sprechen Sie Englisch?</strong> — Зборувате ли англиски?</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Некој ти вели „Danke!" — Што одговараш?</p>
        <ul>
          <li>A) Guten Morgen!</li>
          <li>B) ✅ Bitte sehr! / Gern geschehen!</li>
          <li>C) Entschuldigung!</li>
        </ul>
        <p><em>Објаснување: „Bitte sehr" или „Gern geschehen" = нема на што, стандарден одговор на благодарност.</em></p>

        <p><strong>Прашање 2:</strong> Сакаш да кажеш „Се викам Марко." — Кое е точното?</p>
        <ul>
          <li>A) Ich bin Marko. ✅ (прифатливо)</li>
          <li>B) ✅ Ich heiße Marko.</li>
          <li>C) Mein Marko.</li>
        </ul>
        <p><em>Објаснување: И двата облика се точни, но „Ich heiße..." е почесто при претставување.</em></p>

        <p><strong>Прашање 3:</strong> Не разбираш — Что кажуваш?</p>
        <ul>
          <li>A) Ich weiß nicht.</li>
          <li>B) ✅ Ich verstehe nicht. / Wie bitte?</li>
          <li>C) Nein, danke.</li>
        </ul>
        <p><em>Објаснување: „Ich verstehe nicht" = не разбирам. „Wie bitte?" = молам, повтори.</em></p>
      </div>
    `
  },

  {
    id: 'numbers-time',
    title: 'Броеви и Времето (Uhrzeit)',
    excerpt: 'Од 1 до 1000 и kako да прашаш и кажеш колку е часот.',
    icon: '🕐',
    category: 'basics',
    content: `
      <h2>Броевите — основа на секојдневниот живот</h2>

      <h3>🔢 Основни броеви 1–20</h3>
      <ul>
        <li>1–10: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn</li>
        <li>11–12: elf, zwölf (неправилни!)</li>
        <li>13–19: dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn</li>
        <li>20: zwanzig</li>
      </ul>

      <h3>🔢 Десетки</h3>
      <ul>
        <li>30: dreißig (⚠️ не dreißig!)</li>
        <li>40–90: vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig</li>
        <li>100: hundert | 1000: tausend</li>
      </ul>

      <h3>💡 Составени броеви (21–99)</h3>
      <p>Единицата доаѓа ПРВА, па десетката: <strong>einundzwanzig</strong> (21), <strong>fünfundachtzig</strong> (85)</p>
      <p>Буквално: „еден-и-дваесет", „пет-и-осумдесет".</p>

      <h3>⏰ Времето — Wie spät ist es?</h3>
      <p><strong>Официјален начин (24 часа):</strong></p>
      <ul>
        <li>Es ist 14:30 → Es ist vierzehn Uhr dreißig.</li>
        <li>Es ist 9:15 → Es ist neun Uhr fünfzehn.</li>
      </ul>
      <p><strong>Разговорен начин (12 часа):</strong></p>
      <ul>
        <li>Es ist <strong>halb drei</strong> = 2:30 (половина ДО три, не половина ПО два!)</li>
        <li>Es ist <strong>Viertel nach zwei</strong> = 2:15</li>
        <li>Es ist <strong>Viertel vor drei</strong> = 2:45</li>
      </ul>
      <p>⚠️ <strong>„halb"</strong> е најголемата замка — „halb drei" = 2:30, не 3:30!</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Бројот 25 на германски е:</p>
        <ul>
          <li>A) zwanzigfünf</li>
          <li>B) ✅ fünfundzwanzig</li>
          <li>C) fünfzwanzig</li>
        </ul>
        <p><em>Објаснување: Единицата прва + „und" + десетката: fünf-und-zwanzig.</em></p>

        <p><strong>Прашање 2:</strong> „Halb vier" значи:</p>
        <ul>
          <li>A) 4:30</li>
          <li>B) ✅ 3:30</li>
          <li>C) 4:00</li>
        </ul>
        <p><em>Објаснување: „halb" + следниот час = половина час ПРЕД тој час. halb vier = 3:30!</em></p>

        <p><strong>Прашање 3:</strong> Како прашуваш „Колку е часот?"</p>
        <ul>
          <li>A) Was ist die Uhr?</li>
          <li>B) ✅ Wie spät ist es? / Wie viel Uhr ist es?</li>
          <li>C) Wann ist die Zeit?</li>
        </ul>
        <p><em>Објаснување: „Wie spät ist es?" е најчестото прашање за времето во разговорниот германски.</em></p>
      </div>
    `
  },

  // ============================================================
  // NEW GRAMMAR LESSONS
  // ============================================================

  {
    id: 'komparativ-superlativ',
    title: 'Komparativ & Superlativ (Поубав, Најубав)',
    excerpt: 'Kako да кажеш „поубав", „побрз" и „најдобар" на германски.',
    icon: '📊',
    category: 'grammar',
    content: `
      <h2>Споредување во германски</h2>
      <p>Германскиот има три степени: <strong>основен (Positiv)</strong>, <strong>споредбен (Komparativ)</strong> и <strong>надмоќен (Superlativ)</strong>.</p>

      <h3>📌 Правила за формирање</h3>
      <ul>
        <li><strong>Komparativ:</strong> придавка + <strong>-er</strong> → <em>schnell → schneller</em></li>
        <li><strong>Superlativ (атрибутивен):</strong> придавка + <strong>-st-</strong> + наставка → <em>der schnellste</em></li>
        <li><strong>Superlativ (предикативен):</strong> <strong>am + придавка + -sten</strong> → <em>am schnellsten</em></li>
      </ul>

      <h3>⚠️ Неправилни форми (мора да се учат!)</h3>
      <ul>
        <li><em>gut</em> → <strong>besser</strong> → <strong>am besten</strong> (добро → подобро → најдобро)</li>
        <li><em>viel</em> → <strong>mehr</strong> → <strong>am meisten</strong> (многу → повеќе → највеќе)</li>
        <li><em>gern</em> → <strong>lieber</strong> → <strong>am liebsten</strong> (радо → поради → најрадо)</li>
      </ul>

      <h3>📌 Умлаути во компаративот</h3>
      <p>Многу еднословни придавки добиваат умлаут: <em>alt → älter → am ältesten, jung → jünger → am jüngsten, groß → größer → am größten.</em></p>

      <h3>💡 Трик за памтење</h3>
      <p>ЛЕСНО + -er = СПОРЕДБА. „Mein Hund ist schnell<strong>er</strong> als dein Hund." — As + Komparativ за споредба.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Berlin ist ___ als München." (groß)</p>
        <ul>
          <li>A) großer</li>
          <li>B) ✅ größer</li>
          <li>C) am größten</li>
        </ul>
        <p><em>Објаснување: Komparativ + умлаут: groß → größer. Plus „als" за споредба.</em></p>

        <p><strong>Прашање 2:</strong> „Das ist das ___ Auto der Welt." (schnell)</p>
        <ul>
          <li>A) schneller</li>
          <li>B) am schnellsten</li>
          <li>C) ✅ schnellste</li>
        </ul>
        <p><em>Објаснување: Пред именка → атрибутивен Superlativ: das schnellste Auto.</em></p>

        <p><strong>Прашање 3:</strong> Komparativ на „gut" е:</p>
        <ul>
          <li>A) guter</li>
          <li>B) ✅ besser</li>
          <li>C) am besten</li>
        </ul>
        <p><em>Објаснување: „gut/besser/am besten" — неправилна форма. Мора да се научи напамет!</em></p>
      </div>
    `
  },

  {
    id: 'relativsätze',
    title: 'Релативни клаузи (der Mann, der...)',
    excerpt: 'Как да опишеш именка со дополнителна реченица: „Човекот кој..."',
    icon: '🔗',
    category: 'grammar',
    content: `
      <h2>Релативни клаузи — опис на именките</h2>
      <p>Релативната клауза го опишува или прецизира антецедентот (именката). Релативната заменка (<strong>der, die, das</strong>) се совпаѓа со родот на именката.</p>

      <h3>📌 Главно правило</h3>
      <ul>
        <li>Глаголот оди на <strong>КРАЈ</strong> во релативната клауза.</li>
        <li>Релативната заменка се совпаѓа со <strong>родот</strong> на антецедентот, но падежот зависи од улогата во клаузата.</li>
      </ul>

      <h3>📋 Табела на релативни заменки</h3>
      <ul>
        <li>Nominativ: <strong>der</strong> (м) / <strong>die</strong> (ж, мн) / <strong>das</strong> (ср)</li>
        <li>Akkusativ: <strong>den</strong> (м) / <strong>die</strong> (ж, мн) / <strong>das</strong> (ср)</li>
        <li>Dativ: <strong>dem</strong> (м, ср) / <strong>der</strong> (ж) / <strong>denen</strong> (мн)</li>
      </ul>

      <h3>📌 Примери</h3>
      <ul>
        <li><em>Das ist der Mann, <strong>der</strong> Deutsch spricht.</em> (Nominativ — тој зборува)</li>
        <li><em>Das ist der Mann, <strong>den</strong> ich kenne.</em> (Akkusativ — го познавам)</li>
        <li><em>Das ist die Frau, <strong>der</strong> ich helfe.</em> (Dativ — Помагам и)</li>
        <li><em>Das ist das Kind, <strong>das</strong> wir sehen.</em> (Akkusativ среден)</li>
      </ul>

      <h3>💡 Трик за памтење</h3>
      <p>Прашај се: <strong>Каква улога има именката во клаузата?</strong> — Субјект (Nom), директен объект (Akk) или индиректен (Dat)?</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Das ist die Frau, ___ ich liebe." (Akkusativ, женски)</p>
        <ul>
          <li>A) der</li>
          <li>B) ✅ die</li>
          <li>C) das</li>
        </ul>
        <p><em>Објаснување: „lieben" бара Akkusativ. Женски Akk = die. „die ich liebe".</em></p>

        <p><strong>Прашање 2:</strong> „Das ist das Buch, ___ ich lese." (Akkusativ, среден)</p>
        <ul>
          <li>A) der</li>
          <li>B) den</li>
          <li>C) ✅ das</li>
        </ul>
        <p><em>Објаснување: Среден род Akkusativ = das. „das Buch, das ich lese."</em></p>

        <p><strong>Прашање 3:</strong> Каде оди глаголот во релативна клауза?</p>
        <ul>
          <li>A) На второ место</li>
          <li>B) На прво место</li>
          <li>C) ✅ На крај</li>
        </ul>
        <p><em>Објаснување: Релативните клаузи се зависни — глаголот е секогаш на крај.</em></p>
      </div>
    `
  },

  {
    id: 'konjunktiv-ii',
    title: 'Konjunktiv II (Би сакал / Ако би...)',
    excerpt: 'Изразувај желби, претпоставки и учтиви барања со Konjunktiv II.',
    icon: '✨',
    category: 'grammar',
    content: `
      <h2>Konjunktiv II — нереална стварност</h2>
      <p>Konjunktiv II се користи за <strong>желби, хипотези, учтиви барања</strong> и <strong>нереални услови</strong>. Еквивалент на македонскиот „би + глагол".</p>

      <h3>📌 Главни форми</h3>
      <ul>
        <li><strong>würde + Infinitiv</strong> (универзален): <em>Ich würde gerne Kaffee trinken.</em> (Би пил кафе.)</li>
        <li><strong>hätte</strong> (haben во Konj. II): <em>Ich hätte gerne mehr Zeit.</em> (Би имал повеќе време.)</li>
        <li><strong>wäre</strong> (sein во Konj. II): <em>Ich wäre glücklicher.</em> (Би бил посреќен.)</li>
        <li><strong>könnte, müsste, dürfte</strong> — модали во Konj. II.</li>
      </ul>

      <h3>📌 Употреба</h3>
      <ul>
        <li>Учтиво барање: <em>Könnten Sie mir helfen, bitte?</em> (Би можеле ли да ми помогнете?)</li>
        <li>Желба: <em>Ich würde gern in Berlin wohnen.</em> (Би сакал да живеам во Берлин.)</li>
        <li>Нереален услов: <em>Wenn ich Geld hätte, würde ich reisen.</em> (Ако имав пари, би патувал.)</li>
      </ul>

      <h3>💡 Трик за памтење</h3>
      <p>„<strong>Würde</strong>" е универзален помошник. Само <strong>sein → wäre</strong> и <strong>haben → hätte</strong> имаат свои форми кои треба да се памтат.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Wenn ich reich ___, ___ ich eine Villa kaufen."</p>
        <ul>
          <li>A) bin / werde</li>
          <li>B) war / wird</li>
          <li>C) ✅ wäre / würde</li>
        </ul>
        <p><em>Објаснување: Нереален услов: sein → wäre, werden → würde.</em></p>

        <p><strong>Прашање 2:</strong> Учтиво прашање: „___ Sie mir bitte helfen?"</p>
        <ul>
          <li>A) Können</li>
          <li>B) ✅ Könnten</li>
          <li>C) Würden können</li>
        </ul>
        <p><em>Објаснување: Konj. II на „können" → „könnten". Поучтиво од обичното „können".</em></p>

        <p><strong>Прашање 3:</strong> „Ich ___ gern mehr schlafen." — Би спиел повеќе.</p>
        <ul>
          <li>A) wäre</li>
          <li>B) hätte</li>
          <li>C) ✅ würde</li>
        </ul>
        <p><em>Објаснување: „würde + Infinitiv" = универзалниот облик на Konj. II.</em></p>
      </div>
    `
  },

  {
    id: 'passiv',
    title: 'Пасив (Das wird gemacht)',
    excerpt: 'Kdy нешто „се прави" без да кажеш кој го прави.',
    icon: '🔄',
    category: 'grammar',
    content: `
      <h2>Пасивот во германски</h2>
      <p>Пасивот се користи кога <strong>дејството е важно, не вршителот</strong>. Формиран со помош на „werden" + Partizip II.</p>

      <h3>📌 Структура на Vorgangspassiv (процес)</h3>
      <p><strong>werden (конјугиран) + Partizip II</strong></p>
      <ul>
        <li>Präsens: <em>Das Haus <strong>wird</strong> gebaut.</em> (Куќата се гради.)</li>
        <li>Präteritum: <em>Das Haus <strong>wurde</strong> gebaut.</em> (Куќата беше изградена.)</li>
        <li>Perfekt: <em>Das Haus <strong>ist</strong> gebaut <strong>worden</strong>.</em></li>
      </ul>

      <h3>📌 Zustandspassiv (состојба) — со sein</h3>
      <p><strong>sein + Partizip II</strong> — резултатот, не процесот:</p>
      <ul>
        <li><em>Die Tür <strong>ist</strong> geschlossen.</em> (Вратата е затворена — состојба)</li>
        <li><em>Die Tür <strong>wird</strong> geschlossen.</em> (Вратата се затвора — процес)</li>
      </ul>

      <h3>📌 Вршителот: von + Dativ</h3>
      <ul>
        <li><em>Das Buch wurde <strong>von</strong> Goethe geschrieben.</em> (Книгата е напишана <strong>од</strong> Гете.)</li>
      </ul>

      <h3>💡 Трик за памтење</h3>
      <p>Пасив = <strong>W</strong>ird/<strong>W</strong>urde + <strong>P</strong>artizipII. Замисли „WP" — <strong>W</strong>as is done? <strong>P</strong>artizipII tells you!</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Das Auto ___ repariert." (пасив, сегашно)</p>
        <ul>
          <li>A) hat</li>
          <li>B) ✅ wird</li>
          <li>C) ist</li>
        </ul>
        <p><em>Објаснување: Vorgangspassiv Präsens = wird + Partizip II. Das Auto WIRD repariert.</em></p>

        <p><strong>Прашање 2:</strong> „Das Fenster ___ geschlossen." — Прозорецот е затворен (состојба).</p>
        <ul>
          <li>A) wird</li>
          <li>B) wurde</li>
          <li>C) ✅ ist</li>
        </ul>
        <p><em>Објаснување: Zustandspassiv = sein + Partizip II. Тоа е состојба, не процес.</em></p>

        <p><strong>Прашање 3:</strong> „Das Lied wurde ___ Beethoven geschrieben."</p>
        <ul>
          <li>A) mit</li>
          <li>B) ✅ von</li>
          <li>C) durch</li>
        </ul>
        <p><em>Објаснување: Вршителот кај пасив се воведува со „von + Dativ".</em></p>
      </div>
    `
  },

  {
    id: 'infinitiv-zu',
    title: 'Инфинитив со zu (ich versuche zu...)',
    excerpt: 'Кога се користи „zu" пред инфинитивот и кога не.',
    icon: '🔤',
    category: 'grammar',
    content: `
      <h2>Инфинитив со „zu"</h2>
      <p>Во германскиот, многу конструкции бараат <strong>zu + Infinitiv</strong> наместо само инфинитив.</p>

      <h3>📌 Кога се користи zu + Infinitiv</h3>
      <ul>
        <li>По одредени глаголи: <strong>versuchen, vergessen, anfangen, aufhören, hoffen, planen, versprechen...</strong></li>
        <li><em>Ich versuche, Deutsch <strong>zu lernen</strong>.</em> (Се обидувам да учам германски.)</li>
        <li><em>Er hofft, bald <strong>zu kommen</strong>.</em> (Се надева дека ускоро ќе дојде.)</li>
        <li><em>Sie vergisst, die Tür <strong>zu schließen</strong>.</em> (Заборава да ја затвори вратата.)</li>
      </ul>

      <h3>📌 um...zu — за цел</h3>
      <p><em>Ich lerne Deutsch, <strong>um</strong> in Deutschland <strong>zu arbeiten</strong>.</em> (Учам германски за да работам во Германија.)</p>

      <h3>⚠️ Кога НЕ се користи zu</h3>
      <ul>
        <li>По модали: <em>Ich <strong>kann</strong> schwimmen.</em> (не: zu schwimmen)</li>
        <li>По werden (иднина): <em>Ich <strong>werde</strong> lernen.</em></li>
        <li>По lassen, sehen, hören: <em>Ich sehe ihn kommen.</em></li>
      </ul>

      <h3>📌 Разделни глаголи: zu се вметнува во средина</h3>
      <ul>
        <li>aufstehen → <strong>auf<u>zu</u>stehen</strong>: <em>Ich versuche früh auf<u>zu</u>stehen.</em></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Er versucht, mehr ___ schlafen."</p>
        <ul>
          <li>A) schlafen</li>
          <li>B) ✅ zu schlafen</li>
          <li>C) schläft</li>
        </ul>
        <p><em>Објаснување: „versuchen" бара zu + Infinitiv.</em></p>

        <p><strong>Прашање 2:</strong> „Ich lerne, ___ Deutschland ___ arbeiten."</p>
        <ul>
          <li>A) für / zu</li>
          <li>B) ✅ um / zu</li>
          <li>C) weil / zu</li>
        </ul>
        <p><em>Објаснување: Цел = „um...zu": Ich lerne, UM in Deutschland ZU arbeiten.</em></p>

        <p><strong>Прашање 3:</strong> „anrufen" со zu: „Er vergisst, seine Mutter ___."</p>
        <ul>
          <li>A) zu anrufen</li>
          <li>B) anrufen</li>
          <li>C) ✅ anzurufen</li>
        </ul>
        <p><em>Објаснување: Разделни глаголи: an-zu-rufen. „zu" се вметнува меѓу префиксот и основата.</em></p>
      </div>
    `
  },

  {
    id: 'temporalsaetze',
    title: 'Временски клаузи (als, wenn, bevor, nachdem)',
    excerpt: 'Опиши временски односи меѓу дејствата: пред, по, кога...',
    icon: '⏳',
    category: 'grammar',
    content: `
      <h2>Временски сврзници</h2>
      <p>Временските клаузи покажуваат <strong>кога</strong> се случило нешто во однос на главната реченица. Глаголот секогаш оди на <strong>крај</strong> во зависната клауза.</p>

      <h3>📌 als vs. wenn</h3>
      <ul>
        <li><strong>als</strong> — еднократен настан во минатото: <em>Als ich 10 Jahre alt war, lebte ich in Skopje.</em> (Кога имав 10 год., живеев во Скопје.)</li>
        <li><strong>wenn</strong> — повторлив или идн./сег. настан: <em>Wenn ich in Berlin bin, besuche ich das Museum.</em> (Кога сум во Берлин, го посетувам музејот.)</li>
      </ul>

      <h3>📌 bevor — пред</h3>
      <ul>
        <li><em><strong>Bevor</strong> ich schlafe, lese ich immer.</em> (Пред да заспијам, секогаш читам.)</li>
      </ul>

      <h3>📌 nachdem — откако (различни времиња!)</h3>
      <ul>
        <li><em><strong>Nachdem</strong> ich gegessen hatte, machte ich Sport.</em> (Откако јадов, спортував.) — Plusquamperfekt</li>
        <li><em><strong>Nachdem</strong> ich gegessen habe, mache ich Sport.</em> — Perfekt (за поблиска иднина)</li>
      </ul>

      <h3>📌 während, sobald, seit(dem)</h3>
      <ul>
        <li><strong>während</strong> — додека: <em>Während sie schläft, koche ich.</em></li>
        <li><strong>sobald</strong> — штом: <em>Sobald du kommst, essen wir.</em></li>
        <li><strong>seitdem</strong> — откако (трајно): <em>Seitdem ich Deutsch lerne, mag ich es.</em></li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Единствен настан во минатото → als или wenn?</p>
        <ul>
          <li>A) ✅ als</li>
          <li>B) wenn</li>
          <li>C) nachdem</li>
        </ul>
        <p><em>Објаснување: „als" = еднократен, минат настан. „Wenn" = повторлив или сегашно/идно.</em></p>

        <p><strong>Прашање 2:</strong> „___ du aufwächst, wirst du es verstehen." — Кога ќе пораснеш...</p>
        <ul>
          <li>A) als</li>
          <li>B) ✅ wenn</li>
          <li>C) bevor</li>
        </ul>
        <p><em>Објаснување: Идна ситуација → „wenn".</em></p>

        <p><strong>Прашање 3:</strong> „Bevor er kommt, ___ ich auf."</p>
        <ul>
          <li>A) räume ich</li>
          <li>B) ✅ räume ich</li>
          <li>C) ich räume</li>
        </ul>
        <p><em>Објаснување: После зависна клауза со „bevor", главната клауза почнува со глагол (инверзија).</em></p>
      </div>
    `
  },

  // ============================================================
  // NEW BASICS LESSONS
  // ============================================================

  {
    id: 'colors-genders',
    title: 'Боите и нивните родови',
    excerpt: 'Сите бои на германски со правилни членови и примери.',
    icon: '🎨',
    category: 'basics',
    content: `
      <h2>Боите на германски</h2>
      <p>Боите се придавки — тие немаат фиксен член сами по себе, но кога стојат пред именка, добиваат наставки. Прво научи ги основните бои!</p>

      <h3>🌈 Основни бои</h3>
      <ul>
        <li>🔴 <strong>rot</strong> — црвена</li>
        <li>🟠 <strong>orange</strong> — портокалова</li>
        <li>🟡 <strong>gelb</strong> — жолта</li>
        <li>🟢 <strong>grün</strong> — зелена</li>
        <li>🔵 <strong>blau</strong> — сина</li>
        <li>🟣 <strong>violett / lila</strong> — виолетова / лила</li>
        <li>⚫ <strong>schwarz</strong> — црна</li>
        <li>⚪ <strong>weiß</strong> — бела</li>
        <li>🟤 <strong>braun</strong> — кафена</li>
        <li>🩶 <strong>grau</strong> — сива</li>
        <li>🩷 <strong>rosa / pink</strong> — розова</li>
      </ul>

      <h3>📌 Боите во реченица (придавски наставки)</h3>
      <ul>
        <li><em>Das <strong>rote</strong> Auto fährt schnell.</em> (Црвениот автомобил брзо вози.)</li>
        <li><em>Ich trage ein <strong>blaues</strong> Hemd.</em> (Носам сина кошула.)</li>
        <li><em>Sie hat <strong>grüne</strong> Augen.</em> (Таа има зелени очи.)</li>
      </ul>

      <h3>💡 Трик за родовите бои</h3>
      <p>Когда прашуваш <strong>„Welche Farbe?"</strong> (Која боја?): „Das Auto ist <strong>rot</strong>." — Бојата по „ist" нема наставка!</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Der Himmel ist ___." (blue)</p>
        <ul>
          <li>A) ✅ blau</li>
          <li>B) blaue</li>
          <li>C) blauen</li>
        </ul>
        <p><em>Објаснување: По „ist" (предикативна позиција) — бојата нема наставка.</em></p>

        <p><strong>Прашање 2:</strong> „Ich mag ___ Tee." (зелен)</p>
        <ul>
          <li>A) grün</li>
          <li>B) ✅ grünen</li>
          <li>C) grüne</li>
        </ul>
        <p><em>Објаснување: „Tee" = der (машки), Akkusativ без член → силна деклинација: grünEN.</em></p>

        <p><strong>Прашање 3:</strong> Која боја е „schwarz"?</p>
        <ul>
          <li>A) сина</li>
          <li>B) ✅ црна</li>
          <li>C) бела</li>
        </ul>
        <p><em>Објаснување: schwarz = црна. weiß = бела. blau = сина.</em></p>
      </div>
    `
  },

  {
    id: 'days-months-seasons',
    title: 'Денови, Месеци и Сезони',
    excerpt: 'Дните на неделата, месеците и сезоните — сите со родот der!',
    icon: '📅',
    category: 'basics',
    content: `
      <h2>Временски единици — сите машки!</h2>
      <p>Добрата вест: сите денови, месеци и сезони se <strong>машки род (der)</strong>.</p>

      <h3>📅 Денови на неделата</h3>
      <ul>
        <li><strong>der Montag</strong> — понеделник</li>
        <li><strong>der Dienstag</strong> — вторник</li>
        <li><strong>der Mittwoch</strong> — среда</li>
        <li><strong>der Donnerstag</strong> — четврток</li>
        <li><strong>der Freitag</strong> — петок</li>
        <li><strong>der Samstag</strong> — сабота</li>
        <li><strong>der Sonntag</strong> — недела</li>
      </ul>

      <h3>📆 Месеци</h3>
      <ul>
        <li>Januar / Februar / März / April / Mai / Juni</li>
        <li>Juli / August / September / Oktober / November / Dezember</li>
      </ul>
      <p><strong>Всите: der Januar, der Februar</strong> итн.</p>

      <h3>🌸 Сезони</h3>
      <ul>
        <li><strong>der Frühling</strong> — пролет</li>
        <li><strong>der Sommer</strong> — лето</li>
        <li><strong>der Herbst</strong> — есен</li>
        <li><strong>der Winter</strong> — зима</li>
      </ul>

      <h3>📌 Употреба</h3>
      <ul>
        <li><em>Am <strong>Montag</strong> habe ich Schule.</em> — Во понеделник имам училиште. (am + Dativ)</li>
        <li><em>Im <strong>Januar</strong> ist es kalt.</em> — Во јануари е студено. (im + Dativ)</li>
        <li><em>Im <strong>Sommer</strong> fahren wir nach Italien.</em> — Лето патуваме во Италија.</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Кој е клучниот предлог за денови: „___ Montag"?</p>
        <ul>
          <li>A) In</li>
          <li>B) ✅ Am</li>
          <li>C) Auf</li>
        </ul>
        <p><em>Објаснување: Денови + am (am Montag, am Freitag). Месеци и сезони + im (im Juli).</em></p>

        <p><strong>Прашање 2:</strong> Кој месец доаѓа по „März"?</p>
        <ul>
          <li>A) Mai</li>
          <li>B) Februar</li>
          <li>C) ✅ April</li>
        </ul>
        <p><em>Објаснување: јануари→февруари→март→APRIL. März = март.</em></p>

        <p><strong>Прашање 3:</strong> „Der Frühling" значи:</p>
        <ul>
          <li>A) Лето</li>
          <li>B) ✅ Пролет</li>
          <li>C) Есен</li>
        </ul>
        <p><em>Објаснување: Frühling = пролет (frühling = рано, почеток). Herbst = есен, Sommer = лето.</em></p>
      </div>
    `
  },

  {
    id: 'family-descriptions',
    title: 'Семејство и Описи',
    excerpt: 'Зборувај за семејството и опишувај луѓе на германски.',
    icon: '👨‍👩‍👧‍👦',
    category: 'basics',
    content: `
      <h2>Семејството на германски</h2>
      <p>Учи ги семејните термини заедно со членовите — секогаш!</p>

      <h3>👨‍👩‍👧 Членови на семејството</h3>
      <ul>
        <li><strong>der Vater / der Papa</strong> — таткото / татошот</li>
        <li><strong>die Mutter / die Mama</strong> — мајката / мамата</li>
        <li><strong>der Bruder</strong> — братот (pl: die Brüder)</li>
        <li><strong>die Schwester</strong> — сестрата (pl: die Schwestern)</li>
        <li><strong>der Großvater / der Opa</strong> — дедото</li>
        <li><strong>die Großmutter / die Oma</strong> — бабата</li>
        <li><strong>der Sohn</strong> — синот (pl: die Söhne)</li>
        <li><strong>die Tochter</strong> — ќерката (pl: die Töchter)</li>
        <li><strong>der Onkel</strong> — вујкото/стрикото</li>
        <li><strong>die Tante</strong> — тетката</li>
        <li><strong>der Cousin / die Cousine</strong> — братучедот / братучетката</li>
      </ul>

      <h3>📌 Зборување за семејството</h3>
      <ul>
        <li><em>Ich <strong>habe</strong> einen Bruder und zwei Schwestern.</em></li>
        <li><em>Mein Vater <strong>heißt</strong> Stefan und er <strong>ist</strong> 50 Jahre alt.</em></li>
        <li><em>Meine Schwester <strong>wohnt</strong> in Wien.</em></li>
      </ul>

      <h3>👤 Описи на луѓе</h3>
      <ul>
        <li>Изглед: <em>Er ist <strong>groß und schlank</strong>.</em> — Тој е висок и витак.</li>
        <li>Коса: <em>Sie hat <strong>lange blonde Haare</strong>.</em> — Таа има долга плава коса.</li>
        <li>Карактер: <em>Er ist <strong>freundlich und lustig</strong>.</em> — Тој е пријателски и смешен.</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Die Tochter" значи:</p>
        <ul>
          <li>A) синот</li>
          <li>B) ✅ ќерката</li>
          <li>C) мајката</li>
        </ul>
        <p><em>Објаснување: die Tochter = ќерката. der Sohn = синот.</em></p>

        <p><strong>Прашање 2:</strong> Татиниот татко е:</p>
        <ul>
          <li>A) der Vater</li>
          <li>B) der Onkel</li>
          <li>C) ✅ der Großvater</li>
        </ul>
        <p><em>Објаснување: Großvater = дедо (буквално: голем татко).</em></p>

        <p><strong>Прашање 3:</strong> „Er ist freundlich." значи:</p>
        <ul>
          <li>A) Тој е висок.</li>
          <li>B) ✅ Тој е пријателски.</li>
          <li>C) Тој е интелигентен.</li>
        </ul>
        <p><em>Објаснување: freundlich = пријателски. groß = висок/голем. klug = паметен.</em></p>
      </div>
    `
  },

  // ============================================================
  // NEW CULTURE / TIPS LESSONS
  // ============================================================

  {
    id: 'german-culture',
    title: 'Германска Култура: Она Што Треба Да Го Знаеш',
    excerpt: 'Pünktlichkeit, Brot-Kultur, Karneval — разбери ги Германците!',
    icon: '🇩🇪',
    category: 'tips',
    content: `
      <h2>Германија — повеќе од јазик</h2>
      <p>Јазикот е само половина. Ако ја разбереш германската култура, ќе се снајдеш многу полесно!</p>

      <h3>⏰ Pünktlichkeit — Точноста е култ</h3>
      <p>Германците се <strong>познати по точноста</strong>. Ако имаш состанок во 10:00, пристигни во 9:55. „Пет минути доцна" не е прифатливо во работна ситуација. Ако доцниш, задолжително пријави го тоа однапред!</p>
      <ul>
        <li>✅ „Ich werde leider 5 Minuten zu spät kommen." (За жал ќе задоцнам 5 мин.)</li>
        <li>❌ Доаѓаш 15 минути доцна без да кажеш ништо.</li>
      </ul>

      <h3>🍞 Brot-Kultur — Хлебот е религија</h3>
      <p>Германија има <strong>над 3.000 видови леб</strong>. Вечерата (das Abendbrot) буквално значи „вечерен леб" — традиционално е леб со сирење или ладна храна, не топло јадење. Не се изненади!</p>

      <h3>🎭 Karneval / Fasching</h3>
      <p>Пред Великден, Германија лудее — маски, паради и партии. Особено во Köln и Düsseldorf. Ако некој ти рече „Alaaf!" во Кeln — одговори „Alaaf!"</p>

      <h3>♻️ Müll trennen — Сортирање отпад</h3>
      <p>Ова е <strong>задолжително</strong> и сериозно! Различни канти за: жолта (пластика/метал), сина (хартија), кафена (биоотпад), сива/черна (остаток). Погрешното сортирање може да доведе до казна!</p>

      <h3>💡 Совет за секојдневниот живот</h3>
      <p>Германците ценат <strong>директна комуникација</strong>. Ако нешто не ти одговара, кажи — тоа не е грубо, туку почитување. „Das gefällt mir nicht" (Тоа не ми се допаѓа) е сасвим нормално.</p>
    `
  },

  {
    id: 'real-life-german',
    title: 'Германски во Реалниот Живот (Behörden и Arzt)',
    excerpt: 'Практичен германски за пријава во општини, кај доктор и во секојдневниот живот.',
    icon: '🏛️',
    category: 'tips',
    content: `
      <h2>Германски бирократски живот</h2>
      <p>Ако живееш или планираш да живееш во Германија, овие ситуации ќе ти се случат!</p>

      <h3>🏢 Anmeldung — Пријава на адреса</h3>
      <p>Во рок од 14 дена по преселувањето, МОРА да се <strong>пријавиш</strong> во Einwohnermeldeamt (Gemeente). Потребни документи: Reisepass + Wohnungsgeberbestätigung (потврда од домашниот сопственик).</p>
      <ul>
        <li><em>Ich möchte mich anmelden.</em> — Сакам да се пријавам.</li>
        <li><em>Ich brauche einen Termin.</em> — Треба ми термин.</li>
      </ul>

      <h3>💊 Beim Arzt — Кај доктор</h3>
      <p>Во Германија, прво одиш кај <strong>Hausarzt</strong> (матичен лекар) — тој те упатува кај специјалист. Потребна е <strong>Krankenversicherungskarte</strong> (картичката за здравствено осигурување).</p>
      <ul>
        <li><em>Ich habe einen Termin bei Dr. Müller.</em> — Имам термин кај Д-р Милер.</li>
        <li><em>Mir ist schlecht / Ich habe Schmerzen.</em> — Ми е лошо / Ме боли.</li>
        <li><em>Ich nehme folgende Medikamente...</em> — Земам следни лекови...</li>
      </ul>

      <h3>🚉 Öffentliche Verkehrsmittel — Јавен транспорт</h3>
      <p>Купи <strong>Deutschlandticket</strong> (49€/месец за сите возови и метрои во Германија). Никогаш не возувај ohne Ticket — контрола може да биде секогаш!</p>
      <ul>
        <li><em>Einmal nach München, bitte.</em> — Еднаш до Минхен, те молам.</li>
        <li><em>Ist dieser Platz noch frei?</em> — Дали ова место е слободно?</li>
      </ul>

      <h3>🛒 Im Supermarkt</h3>
      <p>Германци очекуваат тивко и брзо плаќање. Секогаш имај готовинска — не секое место прима картичка! Кеси плашташ посебно.</p>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> Каде одиш за пријава на нова адреса во Германија?</p>
        <ul>
          <li>A) Krankenhaus</li>
          <li>B) ✅ Einwohnermeldeamt</li>
          <li>C) Supermarkt</li>
        </ul>
        <p><em>Објаснување: Anmeldung = пријава во Einwohnermeldeamt (Gemeente/Municipality office).</em></p>

        <p><strong>Прашање 2:</strong> „Ich habe Schmerzen" значи:</p>
        <ul>
          <li>A) Јас сум гладен.</li>
          <li>B) ✅ Ме боли.</li>
          <li>C) Јас сум болен.</li>
        </ul>
        <p><em>Објаснување: Schmerzen = болки. Ich bin krank = Јас сум болен.</em></p>
      </div>
    `
  },

  {
    id: 'directions-location',
    title: 'Насоки и Локација (links, rechts, geradeaus)',
    excerpt: 'Прашај и дај насоки на германски — во града и во зградата.',
    icon: '🧭',
    category: 'basics',
    content: `
      <h2>Насоки на германски</h2>
      <p>Знаеш да прашаш каде е нешто — сега е важно и да разбереш одговорот!</p>

      <h3>📍 Основни насоки</h3>
      <ul>
        <li><strong>geradeaus</strong> — право</li>
        <li><strong>links</strong> — лево</li>
        <li><strong>rechts</strong> — десно</li>
        <li><strong>zurück</strong> — назад</li>
        <li><strong>die erste Straße links</strong> — прва улица налево</li>
        <li><strong>an der Ampel rechts</strong> — кај семафорот надесно</li>
        <li><strong>gegenüber</strong> — наспроти</li>
        <li><strong>neben</strong> — до (страна)</li>
        <li><strong>zwischen</strong> — помеѓу</li>
        <li><strong>hinter</strong> — зад</li>
        <li><strong>vor</strong> — пред</li>
      </ul>

      <h3>📌 Прашување за насоки</h3>
      <ul>
        <li><em>Wie komme ich zum Bahnhof?</em> — Kako да стигнам до станицата?</li>
        <li><em>Wo ist die nächste Apotheke?</em> — Каде е најблиската аптека?</li>
        <li><em>Ist es weit von hier?</em> — Дали е далеку оттука?</li>
        <li><em>Kann ich zu Fuß gehen?</em> — Можам ли пешки?</li>
      </ul>

      <h3>📌 Давање насоки</h3>
      <ul>
        <li><em>Gehen Sie geradeaus bis zur Kreuzung.</em> — Одете право до раскрсницата.</li>
        <li><em>Dann biegen Sie links ab.</em> — Потоа свртете налево.</li>
        <li><em>Das Geschäft ist auf der rechten Seite.</em> — Продавницата е на десната страна.</li>
        <li><em>Es ist etwa 10 Minuten zu Fuß.</em> — Е приближно 10 минути пешки.</li>
      </ul>

      <div class="exercise-block">
        <h3>🎯 Мини вежба</h3>
        <p><strong>Прашање 1:</strong> „Biegen Sie links ab" значи:</p>
        <ul>
          <li>A) Одете право.</li>
          <li>B) ✅ Свртете налево.</li>
          <li>C) Вратете се назад.</li>
        </ul>
        <p><em>Објаснување: „abbiegen" = свртува. Links = лево.</em></p>

        <p><strong>Прашање 2:</strong> „Die Apotheke ist gegenüber dem Bahnhof." значи:</p>
        <ul>
          <li>A) Аптеката е до станицата.</li>
          <li>B) Аптеката е зад станицата.</li>
          <li>C) ✅ Аптеката е наспроти станицата.</li>
        </ul>
        <p><em>Објаснување: gegenüber = наспроти, спроти.</em></p>

        <p><strong>Прашање 3:</strong> Kako прашуваш „Дали е далеку?"</p>
        <ul>
          <li>A) Wie weit ist das?</li>
          <li>B) ✅ Ist es weit von hier?</li>
          <li>C) Wo ist das?</li>
        </ul>
        <p><em>Објаснување: „Ist es weit von hier?" е стандардното прашање за оддалеченост.</em></p>
      </div>
    `
  },
];