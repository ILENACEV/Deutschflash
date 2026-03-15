import { VerbData } from './types';

export const VERBS_DATA: VerbData[] = [

  // ═══════════════════════════════════════════════════════
  // ОСНОВНИ / НЕПРАВИЛНИ — задолжителни за A1-A2
  // ═══════════════════════════════════════════════════════

  { infinitiv: "sein", translation: "сум", praesens: "ist", praeteritum: "war", perfekt: "ist gewesen", type: "irregular" },
  { infinitiv: "haben", translation: "има", praesens: "hat", praeteritum: "hatte", perfekt: "hat gehabt", type: "irregular" },
  { infinitiv: "werden", translation: "станува", praesens: "wird", praeteritum: "wurde", perfekt: "ist geworden", type: "irregular" },
  { infinitiv: "gehen", translation: "оди", praesens: "geht", praeteritum: "ging", perfekt: "ist gegangen", rektion: "nach / zu + Dat", type: "irregular" },
  { infinitiv: "kommen", translation: "доаѓа", praesens: "kommt", praeteritum: "kam", perfekt: "ist gekommen", rektion: "aus / von + Dat", type: "irregular" },
  { infinitiv: "fahren", translation: "вози / патува", praesens: "fährt", praeteritum: "fuhr", perfekt: "ist gefahren", rektion: "mit + Dat / nach", type: "irregular" },
  { infinitiv: "laufen", translation: "трча / оди пешки", praesens: "läuft", praeteritum: "lief", perfekt: "ist gelaufen", type: "irregular" },
  { infinitiv: "fliegen", translation: "лета", praesens: "fliegt", praeteritum: "flog", perfekt: "ist geflogen", rektion: "nach / von", type: "irregular" },
  { infinitiv: "bleiben", translation: "останува", praesens: "bleibt", praeteritum: "blieb", perfekt: "ist geblieben", type: "irregular" },
  { infinitiv: "sterben", translation: "умира", praesens: "stirbt", praeteritum: "starb", perfekt: "ist gestorben", type: "irregular" },
  { infinitiv: "fallen", translation: "паѓа", praesens: "fällt", praeteritum: "fiel", perfekt: "ist gefallen", type: "irregular" },
  { infinitiv: "wachsen", translation: "расте", praesens: "wächst", praeteritum: "wuchs", perfekt: "ist gewachsen", type: "irregular" },
  { infinitiv: "einschlafen", translation: "заспива", praesens: "schläft ein", praeteritum: "schlief ein", perfekt: "ist eingeschlafen", type: "irregular" },
  { infinitiv: "aufwachen", translation: "се буди", praesens: "wacht auf", praeteritum: "wachte auf", perfekt: "ist aufgewacht", type: "regular" },
  { infinitiv: "passieren", translation: "се случува", praesens: "passiert", praeteritum: "passierte", perfekt: "ist passiert", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // ГЛАГОЛИ СО haben — ТРАНЗИТИВНИ И ВООБИЧАЕНИ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "machen", translation: "прави", praesens: "macht", praeteritum: "machte", perfekt: "hat gemacht", type: "regular" },
  { infinitiv: "sprechen", translation: "зборува", praesens: "spricht", praeteritum: "sprach", perfekt: "hat gesprochen", rektion: "mit + Dat / über + Akk", type: "irregular" },
  { infinitiv: "essen", translation: "јаде", praesens: "isst", praeteritum: "aß", perfekt: "hat gegessen", type: "irregular" },
  { infinitiv: "trinken", translation: "пие", praesens: "trinkt", praeteritum: "trank", perfekt: "hat getrunken", type: "irregular" },
  { infinitiv: "schreiben", translation: "пишува", praesens: "schreibt", praeteritum: "schrieb", perfekt: "hat geschrieben", rektion: "an + Akk", type: "irregular" },
  { infinitiv: "lesen", translation: "чита", praesens: "liest", praeteritum: "las", perfekt: "hat gelesen", type: "irregular" },
  { infinitiv: "sehen", translation: "гледа", praesens: "sieht", praeteritum: "sah", perfekt: "hat gesehen", type: "irregular" },
  { infinitiv: "hören", translation: "слуша", praesens: "hört", praeteritum: "hörte", perfekt: "hat gehört", rektion: "auf + Akk", type: "regular" },
  { infinitiv: "helfen", translation: "помага", praesens: "hilft", praeteritum: "half", perfekt: "hat geholfen", rektion: "Dat (bei + Dat)", type: "irregular" },
  { infinitiv: "warten", translation: "чека", praesens: "wartet", praeteritum: "wartete", perfekt: "hat gewartet", rektion: "auf + Akk", type: "regular" },
  { infinitiv: "denken", translation: "мисли", praesens: "denkt", praeteritum: "dachte", perfekt: "hat gedacht", rektion: "an + Akk", type: "irregular" },
  { infinitiv: "arbeiten", translation: "работи", praesens: "arbeitet", praeteritum: "arbeitete", perfekt: "hat gearbeitet", rektion: "bei + Dat / an + Dat", type: "regular" },
  { infinitiv: "lernen", translation: "учи", praesens: "lernt", praeteritum: "lernte", perfekt: "hat gelernt", type: "regular" },
  { infinitiv: "spielen", translation: "игра", praesens: "spielt", praeteritum: "spielte", perfekt: "hat gespielt", rektion: "mit + Dat", type: "regular" },
  { infinitiv: "verstehen", translation: "разбира", praesens: "versteht", praeteritum: "verstand", perfekt: "hat verstanden", type: "irregular" },
  { infinitiv: "kaufen", translation: "купува", praesens: "kauft", praeteritum: "kaufte", perfekt: "hat gekauft", type: "regular" },
  { infinitiv: "verkaufen", translation: "продава", praesens: "verkauft", praeteritum: "verkaufte", perfekt: "hat verkauft", type: "regular" },
  { infinitiv: "suchen", translation: "бара", praesens: "sucht", praeteritum: "suchte", perfekt: "hat gesucht", rektion: "nach + Dat", type: "regular" },
  { infinitiv: "finden", translation: "наоѓа", praesens: "findet", praeteritum: "fand", perfekt: "hat gefunden", type: "irregular" },
  { infinitiv: "bringen", translation: "носи / донесува", praesens: "bringt", praeteritum: "brachte", perfekt: "hat gebracht", type: "irregular" },
  { infinitiv: "geben", translation: "дава", praesens: "gibt", praeteritum: "gab", perfekt: "hat gegeben", rektion: "Dat + Akk", type: "irregular" },
  { infinitiv: "nehmen", translation: "зема", praesens: "nimmt", praeteritum: "nahm", perfekt: "hat genommen", type: "irregular" },
  { infinitiv: "wissen", translation: "знае (факт)", praesens: "weiß", praeteritum: "wusste", perfekt: "hat gewusst", type: "irregular" },
  { infinitiv: "glauben", translation: "верува / мисли", praesens: "glaubt", praeteritum: "glaubte", perfekt: "hat geglaubt", rektion: "an + Akk", type: "regular" },
  { infinitiv: "kennen", translation: "познава (лице/место)", praesens: "kennt", praeteritum: "kannte", perfekt: "hat gekannt", type: "irregular" },
  { infinitiv: "mögen", translation: "сака / му се допаѓа", praesens: "mag", praeteritum: "mochte", perfekt: "hat gemocht", type: "irregular" },
  { infinitiv: "möchten", translation: "би сакал", praesens: "möchte", praeteritum: "—", perfekt: "—", type: "irregular" },
  { infinitiv: "wollen", translation: "сака / планира", praesens: "will", praeteritum: "wollte", perfekt: "hat gewollt", type: "irregular" },
  { infinitiv: "müssen", translation: "мора", praesens: "muss", praeteritum: "musste", perfekt: "hat gemusst", type: "irregular" },
  { infinitiv: "können", translation: "може / знае", praesens: "kann", praeteritum: "konnte", perfekt: "hat gekonnt", type: "irregular" },
  { infinitiv: "dürfen", translation: "смее", praesens: "darf", praeteritum: "durfte", perfekt: "hat gedurft", type: "irregular" },
  { infinitiv: "sollen", translation: "треба (наредба)", praesens: "soll", praeteritum: "sollte", perfekt: "hat gesollt", type: "irregular" },

  // ═══════════════════════════════════════════════════════
  // СЕКОЈДНЕВНИ ГЛАГОЛИ — A1
  // ═══════════════════════════════════════════════════════

  { infinitiv: "heißen", translation: "се вика", praesens: "heißt", praeteritum: "hieß", perfekt: "hat geheißen", type: "irregular" },
  { infinitiv: "wohnen", translation: "живее", praesens: "wohnt", praeteritum: "wohnte", perfekt: "hat gewohnt", rektion: "in + Dat", type: "regular" },
  { infinitiv: "schlafen", translation: "спие", praesens: "schläft", praeteritum: "schlief", perfekt: "hat geschlafen", type: "irregular" },
  { infinitiv: "aufstehen", translation: "станува (од кревет)", praesens: "steht auf", praeteritum: "stand auf", perfekt: "ist aufgestanden", type: "irregular" },
  { infinitiv: "kochen", translation: "готви", praesens: "kocht", praeteritum: "kochte", perfekt: "hat gekocht", type: "regular" },
  { infinitiv: "trinken", translation: "пие", praesens: "trinkt", praeteritum: "trank", perfekt: "hat getrunken", type: "irregular" },
  { infinitiv: "frühstücken", translation: "доручкува", praesens: "frühstückt", praeteritum: "frühstückte", perfekt: "hat gefrühstückt", type: "regular" },
  { infinitiv: "putzen", translation: "чисти / мие", praesens: "putzt", praeteritum: "putzte", perfekt: "hat geputzt", type: "regular" },
  { infinitiv: "waschen", translation: "мие / пере", praesens: "wäscht", praeteritum: "wusch", perfekt: "hat gewaschen", type: "irregular" },
  { infinitiv: "anziehen", translation: "облекува (некого)", praesens: "zieht an", praeteritum: "zog an", perfekt: "hat angezogen", type: "irregular" },
  { infinitiv: "ausziehen", translation: "соблекува / се иселува", praesens: "zieht aus", praeteritum: "zog aus", perfekt: "hat ausgezogen / ist ausgezogen", type: "irregular" },
  { infinitiv: "einschlafen", translation: "заспива", praesens: "schläft ein", praeteritum: "schlief ein", perfekt: "ist eingeschlafen", type: "irregular" },
  { infinitiv: "duschen", translation: "се туширá", praesens: "duscht", praeteritum: "duschte", perfekt: "hat geduscht", type: "regular" },
  { infinitiv: "spazieren gehen", translation: "шета", praesens: "geht spazieren", praeteritum: "ging spazieren", perfekt: "ist spazieren gegangen", type: "irregular" },
  { infinitiv: "einkaufen", translation: "купува (прехрамбено)", praesens: "kauft ein", praeteritum: "kaufte ein", perfekt: "hat eingekauft", type: "regular" },
  { infinitiv: "fernsehen", translation: "гледа ТВ", praesens: "sieht fern", praeteritum: "sah fern", perfekt: "hat ferngesehen", type: "irregular" },
  { infinitiv: "anrufen", translation: "се јавува (телефон)", praesens: "ruft an", praeteritum: "rief an", perfekt: "hat angerufen", rektion: "Akk", type: "irregular" },
  { infinitiv: "besuchen", translation: "посетува", praesens: "besucht", praeteritum: "besuchte", perfekt: "hat besucht", rektion: "Akk", type: "regular" },
  { infinitiv: "treffen", translation: "се сретнува", praesens: "trifft", praeteritum: "traf", perfekt: "hat getroffen", rektion: "Akk / mit + Dat", type: "irregular" },
  { infinitiv: "feiern", translation: "слави / прославува", praesens: "feiert", praeteritum: "feierte", perfekt: "hat gefeiert", type: "regular" },
  { infinitiv: "tanzen", translation: "танцува", praesens: "tanzt", praeteritum: "tanzte", perfekt: "hat getanzt", type: "regular" },
  { infinitiv: "singen", translation: "пее", praesens: "singt", praeteritum: "sang", perfekt: "hat gesungen", type: "irregular" },
  { infinitiv: "fotografieren", translation: "фотографира", praesens: "fotografiert", praeteritum: "fotografierte", perfekt: "hat fotografiert", type: "regular" },
  { infinitiv: "reisen", translation: "патува", praesens: "reist", praeteritum: "reiste", perfekt: "ist gereist", rektion: "nach / in + Akk", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // КОМУНИКАЦИЈА И МИСЛЕЊЕ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "sagen", translation: "кажува", praesens: "sagt", praeteritum: "sagte", perfekt: "hat gesagt", rektion: "Dat + Akk / zu + Dat", type: "regular" },
  { infinitiv: "fragen", translation: "прашува", praesens: "fragt", praeteritum: "fragte", perfekt: "hat gefragt", rektion: "Akk / nach + Dat", type: "regular" },
  { infinitiv: "antworten", translation: "одговара", praesens: "antwortet", praeteritum: "antwortete", perfekt: "hat geantwortet", rektion: "Dat / auf + Akk", type: "regular" },
  { infinitiv: "erklären", translation: "објаснува", praesens: "erklärt", praeteritum: "erklärte", perfekt: "hat erklärt", rektion: "Dat + Akk", type: "regular" },
  { infinitiv: "erzählen", translation: "раскажува", praesens: "erzählt", praeteritum: "erzählte", perfekt: "hat erzählt", rektion: "Dat + Akk / von + Dat", type: "regular" },
  { infinitiv: "beschreiben", translation: "опишува", praesens: "beschreibt", praeteritum: "beschrieb", perfekt: "hat beschrieben", rektion: "Akk", type: "irregular" },
  { infinitiv: "vorstellen", translation: "претставува / замислува", praesens: "stellt vor", praeteritum: "stellte vor", perfekt: "hat vorgestellt", rektion: "Akk / sich + Akk", type: "regular" },
  { infinitiv: "bitten", translation: "моли", praesens: "bittet", praeteritum: "bat", perfekt: "hat gebeten", rektion: "Akk um + Akk", type: "irregular" },
  { infinitiv: "danken", translation: "благодари", praesens: "dankt", praeteritum: "dankte", perfekt: "hat gedankt", rektion: "Dat für + Akk", type: "regular" },
  { infinitiv: "entschuldigen", translation: "извинува", praesens: "entschuldigt", praeteritum: "entschuldigte", perfekt: "hat entschuldigt", rektion: "sich bei + Dat für + Akk", type: "regular" },
  { infinitiv: "versprechen", translation: "ветува", praesens: "verspricht", praeteritum: "versprach", perfekt: "hat versprochen", rektion: "Dat + Akk", type: "irregular" },
  { infinitiv: "empfehlen", translation: "препорачува", praesens: "empfiehlt", praeteritum: "empfahl", perfekt: "hat empfohlen", rektion: "Dat + Akk", type: "irregular" },

  // ═══════════════════════════════════════════════════════
  // ЧУВСТВА И СОСТОЈБИ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "freuen", translation: "се радува", praesens: "freut", praeteritum: "freute", perfekt: "hat gefreut", rektion: "sich über + Akk / auf + Akk", type: "regular" },
  { infinitiv: "ärgern", translation: "се лути / лути некого", praesens: "ärgert", praeteritum: "ärgerte", perfekt: "hat geärgert", rektion: "sich über + Akk", type: "regular" },
  { infinitiv: "fürchten", translation: "се плаши", praesens: "fürchtet", praeteritum: "fürchtete", perfekt: "hat gefürchtet", rektion: "sich vor + Dat", type: "regular" },
  { infinitiv: "lieben", translation: "сака (љуби)", praesens: "liebt", praeteritum: "liebte", perfekt: "hat geliebt", rektion: "Akk", type: "regular" },
  { infinitiv: "hassen", translation: "мрази", praesens: "hasst", praeteritum: "hasste", perfekt: "hat gehasst", rektion: "Akk", type: "regular" },
  { infinitiv: "hoffen", translation: "се надева", praesens: "hofft", praeteritum: "hoffte", perfekt: "hat gehofft", rektion: "auf + Akk", type: "regular" },
  { infinitiv: "wünschen", translation: "посакува / честита", praesens: "wünscht", praeteritum: "wünschte", perfekt: "hat gewünscht", rektion: "Dat + Akk", type: "regular" },
  { infinitiv: "gefallen", translation: "се допаѓа", praesens: "gefällt", praeteritum: "gefiel", perfekt: "hat gefallen", rektion: "Dat", type: "irregular" },
  { infinitiv: "interessieren", translation: "го интересира", praesens: "interessiert", praeteritum: "interessierte", perfekt: "hat interessiert", rektion: "sich für + Akk", type: "regular" },
  { infinitiv: "überraschen", translation: "изненадува", praesens: "überrascht", praeteritum: "überraschte", perfekt: "hat überrascht", rektion: "Akk", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // ДВИЖЕЊЕ И ЛОКАЦИЈА
  // ═══════════════════════════════════════════════════════

  { infinitiv: "stehen", translation: "стои", praesens: "steht", praeteritum: "stand", perfekt: "hat gestanden", rektion: "in/an/auf + Dat", type: "irregular" },
  { infinitiv: "liegen", translation: "лежи / се наоѓа", praesens: "liegt", praeteritum: "lag", perfekt: "hat gelegen", rektion: "in/an/auf + Dat", type: "irregular" },
  { infinitiv: "sitzen", translation: "седи", praesens: "sitzt", praeteritum: "saß", perfekt: "hat gesessen", rektion: "auf/in + Dat", type: "irregular" },
  { infinitiv: "hängen", translation: "виси / окачува", praesens: "hängt", praeteritum: "hing / hängte", perfekt: "hat gehangen / gehängt", rektion: "an + Dat/Akk", type: "irregular" },
  { infinitiv: "stellen", translation: "поставува (стоечки)", praesens: "stellt", praeteritum: "stellte", perfekt: "hat gestellt", rektion: "in/auf/an + Akk", type: "regular" },
  { infinitiv: "legen", translation: "поставува (лежечки)", praesens: "legt", praeteritum: "legte", perfekt: "hat gelegt", rektion: "auf/in + Akk", type: "regular" },
  { infinitiv: "setzen", translation: "посадува / седнува", praesens: "setzt", praeteritum: "setzte", perfekt: "hat gesetzt", rektion: "sich auf + Akk", type: "regular" },
  { infinitiv: "zumachen", translation: "затвора", praesens: "macht zu", praeteritum: "machte zu", perfekt: "hat zugemacht", rektion: "Akk", type: "regular" },
  { infinitiv: "aufmachen", translation: "отвора", praesens: "macht auf", praeteritum: "machte auf", perfekt: "hat aufgemacht", rektion: "Akk", type: "regular" },
  { infinitiv: "umziehen", translation: "се преселува / се преоблекува", praesens: "zieht um", praeteritum: "zog um", perfekt: "ist umgezogen", type: "irregular" },

  // ═══════════════════════════════════════════════════════
  // УЧЕЊЕ, РАБОТА И ШКОЛО
  // ═══════════════════════════════════════════════════════

  { infinitiv: "studieren", translation: "студира", praesens: "studiert", praeteritum: "studierte", perfekt: "hat studiert", rektion: "Akk (предмет)", type: "regular" },
  { infinitiv: "unterrichten", translation: "предава / учи (некого)", praesens: "unterrichtet", praeteritum: "unterrichtete", perfekt: "hat unterrichtet", rektion: "Akk", type: "regular" },
  { infinitiv: "wiederholen", translation: "повторува", praesens: "wiederholt", praeteritum: "wiederholte", perfekt: "hat wiederholt", rektion: "Akk", type: "regular" },
  { infinitiv: "üben", translation: "вежба", praesens: "übt", praeteritum: "übte", perfekt: "hat geübt", rektion: "Akk", type: "regular" },
  { infinitiv: "prüfen", translation: "проверува / испитува", praesens: "prüft", praeteritum: "prüfte", perfekt: "hat geprüft", rektion: "Akk", type: "regular" },
  { infinitiv: "vorbereiten", translation: "подготвува", praesens: "bereitet vor", praeteritum: "bereitete vor", perfekt: "hat vorbereitet", rektion: "sich auf + Akk", type: "regular" },
  { infinitiv: "aufschreiben", translation: "запишува", praesens: "schreibt auf", praeteritum: "schrieb auf", perfekt: "hat aufgeschrieben", rektion: "Akk", type: "irregular" },
  { infinitiv: "nachschlagen", translation: "бара (во речник/книга)", praesens: "schlägt nach", praeteritum: "schlug nach", perfekt: "hat nachgeschlagen", rektion: "Akk in + Dat", type: "irregular" },
  { infinitiv: "übersetzen", translation: "преведува", praesens: "übersetzt", praeteritum: "übersetzte", perfekt: "hat übersetzt", rektion: "Akk aus + Dat in + Akk", type: "regular" },
  { infinitiv: "rechnen", translation: "смета / пресметува", praesens: "rechnet", praeteritum: "rechnete", perfekt: "hat gerechnet", rektion: "mit + Dat", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // ЗДРАВЈЕ И ТЕЛО
  // ═══════════════════════════════════════════════════════

  { infinitiv: "schmerzen", translation: "боли", praesens: "schmerzt", praeteritum: "schmerzte", perfekt: "hat geschmerzt", rektion: "Akk", type: "regular" },
  { infinitiv: "husten", translation: "кашла", praesens: "hustet", praeteritum: "hustete", perfekt: "hat gehustet", type: "regular" },
  { infinitiv: "niesen", translation: "кивка", praesens: "niest", praeteritum: "nieste", perfekt: "hat geniest", type: "regular" },
  { infinitiv: "erholen", translation: "се одмара / заздравува", praesens: "erholt", praeteritum: "erholte", perfekt: "hat erholt", rektion: "sich von + Dat", type: "regular" },
  { infinitiv: "trainieren", translation: "тренира", praesens: "trainiert", praeteritum: "trainierte", perfekt: "hat trainiert", type: "regular" },
  { infinitiv: "abnehmen", translation: "слабее / губи тежина", praesens: "nimmt ab", praeteritum: "nahm ab", perfekt: "hat abgenommen", type: "irregular" },
  { infinitiv: "zunehmen", translation: "се дебели / добива тежина", praesens: "nimmt zu", praeteritum: "nahm zu", perfekt: "hat zugenommen", type: "irregular" },
  { infinitiv: "operieren", translation: "оперира", praesens: "operiert", praeteritum: "operierte", perfekt: "hat operiert", rektion: "Akk", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // КУПУВАЊЕ И ПАРИ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "bezahlen", translation: "плаќа", praesens: "bezahlt", praeteritum: "bezahlte", perfekt: "hat bezahlt", rektion: "Akk / für + Akk", type: "regular" },
  { infinitiv: "kosten", translation: "чини (цена)", praesens: "kostet", praeteritum: "kostete", perfekt: "hat gekostet", rektion: "Akk", type: "regular" },
  { infinitiv: "sparen", translation: "штеди", praesens: "spart", praeteritum: "sparte", perfekt: "hat gespart", rektion: "Akk / für + Akk", type: "regular" },
  { infinitiv: "ausgeben", translation: "трошит (пари)", praesens: "gibt aus", praeteritum: "gab aus", perfekt: "hat ausgegeben", rektion: "Akk für + Akk", type: "irregular" },
  { infinitiv: "verdienen", translation: "заработува", praesens: "verdient", praeteritum: "verdiente", perfekt: "hat verdient", rektion: "Akk", type: "regular" },
  { infinitiv: "leihen", translation: "позајмува / дава под закуп", praesens: "leiht", praeteritum: "lieh", perfekt: "hat geliehen", rektion: "Dat + Akk", type: "irregular" },
  { infinitiv: "zurückgeben", translation: "враќа", praesens: "gibt zurück", praeteritum: "gab zurück", perfekt: "hat zurückgegeben", rektion: "Dat + Akk", type: "irregular" },

  // ═══════════════════════════════════════════════════════
  // ПРИРОДА И ВРЕМЕНСКИ УСЛОВИ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "regnen", translation: "врне (дожд)", praesens: "regnet", praeteritum: "regnete", perfekt: "hat geregnet", type: "regular" },
  { infinitiv: "schneien", translation: "врне снег", praesens: "schneit", praeteritum: "schneite", perfekt: "hat geschneit", type: "regular" },
  { infinitiv: "scheinen", translation: "свети / изгледа", praesens: "scheint", praeteritum: "schien", perfekt: "hat geschienen", type: "irregular" },
  { infinitiv: "blitzen", translation: "светкавица / молња", praesens: "blitzt", praeteritum: "blitzte", perfekt: "hat geblitzt", type: "regular" },
  { infinitiv: "donnern", translation: "грми", praesens: "donnert", praeteritum: "donnerte", perfekt: "hat gedonnert", type: "regular" },

  // ═══════════════════════════════════════════════════════
  // ВАЖНИ ГЛАГОЛИ ЗА A2 — РЕАКЦИИ И ОДНОСИ
  // ═══════════════════════════════════════════════════════

  { infinitiv: "einladen", translation: "поканува", praesens: "lädt ein", praeteritum: "lud ein", perfekt: "hat eingeladen", rektion: "Akk zu + Dat", type: "irregular" },
  { infinitiv: "absagen", translation: "откажува (настан)", praesens: "sagt ab", praeteritum: "sagte ab", perfekt: "hat abgesagt", rektion: "Dat + Akk", type: "regular" },
  { infinitiv: "zustimmen", translation: "се согласува", praesens: "stimmt zu", praeteritum: "stimmte zu", perfekt: "hat zugestimmt", rektion: "Dat", type: "regular" },
  { infinitiv: "ablehnen", translation: "одбива", praesens: "lehnt ab", praeteritum: "lehnte ab", perfekt: "hat abgelehnt", rektion: "Akk", type: "regular" },
  { infinitiv: "erlauben", translation: "дозволува", praesens: "erlaubt", praeteritum: "erlaubte", perfekt: "hat erlaubt", rektion: "Dat + Akk", type: "regular" },
  { infinitiv: "verbieten", translation: "забранува", praesens: "verbietet", praeteritum: "verbot", perfekt: "hat verboten", rektion: "Dat + Akk", type: "irregular" },
  { infinitiv: "vergessen", translation: "заборава", praesens: "vergisst", praeteritum: "vergaß", perfekt: "hat vergessen", rektion: "Akk", type: "irregular" },
  { infinitiv: "erinnern", translation: "потсетува / се сеќава", praesens: "erinnert", praeteritum: "erinnerte", perfekt: "hat erinnert", rektion: "sich an + Akk / Akk an + Akk", type: "regular" },
  { infinitiv: "aufhören", translation: "запира / престанува", praesens: "hört auf", praeteritum: "hörte auf", perfekt: "hat aufgehört", rektion: "mit + Dat", type: "regular" },
  { infinitiv: "anfangen", translation: "почнува", praesens: "fängt an", praeteritum: "fing an", perfekt: "hat angefangen", rektion: "mit + Dat", type: "irregular" },
  { infinitiv: "beginnen", translation: "почнува (пишано)", praesens: "beginnt", praeteritum: "begann", perfekt: "hat begonnen", rektion: "mit + Dat", type: "irregular" },
  { infinitiv: "aufgeben", translation: "се откажува / предава", praesens: "gibt auf", praeteritum: "gab auf", perfekt: "hat aufgegeben", rektion: "Akk", type: "irregular" },
  { infinitiv: "versuchen", translation: "се обидува", praesens: "versucht", praeteritum: "versuchte", perfekt: "hat versucht", rektion: "Akk / zu + Inf", type: "regular" },
  { infinitiv: "gelingen", translation: "успева (нешто)", praesens: "gelingt", praeteritum: "gelang", perfekt: "ist gelungen", rektion: "Dat", type: "irregular" },
  { infinitiv: "scheitern", translation: "не успева / пропаѓа", praesens: "scheitert", praeteritum: "scheiterte", perfekt: "ist gescheitert", rektion: "an + Dat", type: "regular" },
  { infinitiv: "entscheiden", translation: "одлучува", praesens: "entscheidet", praeteritum: "entschied", perfekt: "hat entschieden", rektion: "sich für + Akk / gegen + Akk", type: "irregular" },
  { infinitiv: "planen", translation: "планира", praesens: "plant", praeteritum: "plante", perfekt: "hat geplant", rektion: "Akk", type: "regular" },
  { infinitiv: "organisieren", translation: "организира", praesens: "organisiert", praeteritum: "organisierte", perfekt: "hat organisiert", rektion: "Akk", type: "regular" },
  { infinitiv: "ändern", translation: "менува", praesens: "ändert", praeteritum: "änderte", perfekt: "hat geändert", rektion: "Akk", type: "regular" },
  { infinitiv: "passieren", translation: "се случува / минува", praesens: "passiert", praeteritum: "passierte", perfekt: "ist passiert", type: "regular" },
  { infinitiv: "gebrauchen", translation: "употребува", praesens: "gebraucht", praeteritum: "gebrauchte", perfekt: "hat gebraucht", rektion: "Akk", type: "regular" },
  { infinitiv: "benutzen", translation: "користи", praesens: "benutzt", praeteritum: "benutzte", perfekt: "hat benutzt", rektion: "Akk", type: "regular" },
  { infinitiv: "funktionieren", translation: "функционира / работи", praesens: "funktioniert", praeteritum: "funktionierte", perfekt: "hat funktioniert", type: "regular" },
  { infinitiv: "reparieren", translation: "поправа", praesens: "repariert", praeteritum: "reparierte", perfekt: "hat repariert", rektion: "Akk", type: "regular" },
];