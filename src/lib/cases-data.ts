import { CaseQuestion } from './types';

export const CASES_DATA: CaseQuestion[] = [

  // ===== MIT + DATIV (со) =====
  { sentence: "Ich fahre mit ___ Bus.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Bus)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Bus' -> 'dem Bus'." },
  { sentence: "Sie kommt mit ___ Zug.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Zug)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Zug' -> 'dem Zug'." },
  { sentence: "Er spielt mit ___ Hund.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Hund)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Hund' -> 'dem Hund'." },
  { sentence: "Ich schreibe mit ___ Stift.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Stift)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Stift' -> 'dem Stift'." },
  { sentence: "Wir fahren mit ___ Auto.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (das Auto)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'das Auto' -> 'dem Auto'." },
  { sentence: "Sie spricht mit ___ Lehrerin.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "mit + Dativ (die Lehrerin)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'die Lehrerin' -> 'der Lehrerin'." },
  { sentence: "Er redet mit ___ Frau.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "mit + Dativ (die Frau)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'die Frau' -> 'der Frau'." },
  { sentence: "Ich gehe mit ___ Freund.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Freund)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Freund' -> 'dem Freund'." },
  { sentence: "Sie kommt mit ___ Schwester.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "mit + Dativ (die Schwester)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'die Schwester' -> 'der Schwester'." },
  { sentence: "Er fährt mit ___ Fahrrad.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "mit + Dativ (das Fahrrad)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'das Fahrrad' -> 'dem Fahrrad'." },

  // ===== IN + DATIV (локација - Wo?) =====
  { sentence: "Ich bin in ___ Schule.", options: ["der", "die", "das", "den"], correct: "der", case: "Dativ", hint: "Wo? Локација -> Dativ (die Schule)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'die Schule' -> 'der Schule'." },
  { sentence: "Er arbeitet in ___ Büro.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "Wo? Локација -> Dativ (das Büro)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'das Büro' -> 'dem Büro'." },
  { sentence: "Wir wohnen in ___ Stadt.", options: ["der", "die", "das", "den"], correct: "der", case: "Dativ", hint: "Wo? Локација -> Dativ (die Stadt)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'die Stadt' -> 'der Stadt'." },
  { sentence: "Das Buch liegt in ___ Tasche.", options: ["der", "die", "das", "dem"], correct: "der", case: "Dativ", hint: "Wo? Локација -> Dativ (die Tasche)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'die Tasche' -> 'der Tasche'." },
  { sentence: "Sie wohnt in ___ Haus.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "Wo? Локација -> Dativ (das Haus)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'das Haus' -> 'dem Haus'." },
  { sentence: "Das Kind spielt in ___ Garten.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "Wo? Локација -> Dativ (der Garten)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'der Garten' -> 'dem Garten'." },
  { sentence: "Er sitzt in ___ Zimmer.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "Wo? Локација -> Dativ (das Zimmer)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'das Zimmer' -> 'dem Zimmer'." },
  { sentence: "Wir sind in ___ Küche.", options: ["der", "die", "das", "dem"], correct: "der", case: "Dativ", hint: "Wo? Локација -> Dativ (die Küche)", explanation: "Прашање 'Wo?' (каде?) -> Dativ. 'die Küche' -> 'der Küche'." },

  // ===== IN + AKKUSATIV (насока - Wohin?) =====
  { sentence: "Ich gehe in ___ Schule.", options: ["die", "der", "das", "den"], correct: "die", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (die Schule)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'die Schule' останува 'die'." },
  { sentence: "Er geht in ___ Büro.", options: ["das", "dem", "der", "den"], correct: "das", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (das Büro)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'das Büro' останува 'das'." },
  { sentence: "Wir fahren in ___ Stadt.", options: ["die", "der", "das", "dem"], correct: "die", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (die Stadt)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'die Stadt' останува 'die'." },
  { sentence: "Sie geht in ___ Supermarkt.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (der Supermarkt)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'der Supermarkt' -> 'den Supermarkt'." },
  { sentence: "Das Kind läuft in ___ Garten.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (der Garten)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'der Garten' -> 'den Garten'." },
  { sentence: "Er geht in ___ Zimmer.", options: ["das", "dem", "der", "den"], correct: "das", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (das Zimmer)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'das Zimmer' останува 'das'." },
  { sentence: "Ich gehe in ___ Küche.", options: ["die", "der", "das", "dem"], correct: "die", case: "Akkusativ", hint: "Wohin? Насока -> Akkusativ (die Küche)", explanation: "Прашање 'Wohin?' (накаде?) -> Akkusativ. 'die Küche' останува 'die'." },

  // ===== FÜR + AKKUSATIV (за) =====
  { sentence: "Das ist für ___ Kind.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "für + Akkusativ (das Kind)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'das Kind' останува 'das'." },
  { sentence: "Ich kaufe es für ___ Mutter.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "für + Akkusativ (die Mutter)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'die Mutter' останува 'die'." },
  { sentence: "Er arbeitet für ___ Chef.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "für + Akkusativ (der Chef)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'der Chef' -> 'den Chef'." },
  { sentence: "Das Geschenk ist für ___ Vater.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "für + Akkusativ (der Vater)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'der Vater' -> 'den Vater'." },
  { sentence: "Wir kaufen etwas für ___ Lehrerin.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "für + Akkusativ (die Lehrerin)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'die Lehrerin' останува 'die'." },
  { sentence: "Ich lerne das für ___ Prüfung.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "für + Akkusativ (die Prüfung)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'die Prüfung' останува 'die'." },
  { sentence: "Das Medikament ist für ___ Hund.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "für + Akkusativ (der Hund)", explanation: "Предлогот 'für' секогаш бара Akkusativ. 'der Hund' -> 'den Hund'." },

  // ===== HELFEN + DATIV (помагам) =====
  { sentence: "Ich helfe ___ Mann.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "helfen + Dativ (der Mann)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'der Mann' -> 'dem Mann'." },
  { sentence: "Er hilft ___ Frau.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "helfen + Dativ (die Frau)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'die Frau' -> 'der Frau'." },
  { sentence: "Wir helfen ___ Kind.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "helfen + Dativ (das Kind)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'das Kind' -> 'dem Kind'." },
  { sentence: "Sie hilft ___ Schüler.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "helfen + Dativ (der Schüler)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'der Schüler' -> 'dem Schüler'." },
  { sentence: "Ich helfe ___ Mutter.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "helfen + Dativ (die Mutter)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'die Mutter' -> 'der Mutter'." },
  { sentence: "Er hilft ___ alten Nachbarn.", options: ["dem", "den", "der", "das"], correct: "dem", case: "Dativ", hint: "helfen + Dativ (der Nachbar)", explanation: "Глаголот 'helfen' секогаш бара Dativ. 'der Nachbar' -> 'dem Nachbar'." },

  // ===== SEHEN / KAUFEN / NEHMEN + AKKUSATIV =====
  { sentence: "Ich sehe ___ Hund.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "sehen + Akkusativ (der Hund)", explanation: "Глаголот 'sehen' бара директен објект во Akkusativ. 'der Hund' -> 'den Hund'." },
  { sentence: "Er sieht ___ Film.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "sehen + Akkusativ (der Film)", explanation: "Глаголот 'sehen' бара директен објект во Akkusativ. 'der Film' -> 'den Film'." },
  { sentence: "Wir kaufen ___ Brot.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "kaufen + Akkusativ (das Brot)", explanation: "Глаголот 'kaufen' бара Akkusativ. 'das Brot' останува 'das'." },
  { sentence: "Sie kauft ___ Jacke.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "kaufen + Akkusativ (die Jacke)", explanation: "Глаголот 'kaufen' бара Akkusativ. 'die Jacke' останува 'die'." },
  { sentence: "Ich kaufe ___ Apfel.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "kaufen + Akkusativ (der Apfel)", explanation: "Глаголот 'kaufen' бара Akkusativ. 'der Apfel' -> 'den Apfel'." },
  { sentence: "Er nimmt ___ Bus.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "nehmen + Akkusativ (der Bus)", explanation: "Глаголот 'nehmen' бара Akkusativ. 'der Bus' -> 'den Bus'." },
  { sentence: "Ich nehme ___ Buch.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "nehmen + Akkusativ (das Buch)", explanation: "Глаголот 'nehmen' бара Akkusativ. 'das Buch' останува 'das'." },
  { sentence: "Sie isst ___ Apfel.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "essen + Akkusativ (der Apfel)", explanation: "Глаголот 'essen' бара Akkusativ. 'der Apfel' -> 'den Apfel'." },
  { sentence: "Er trinkt ___ Kaffee.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "trinken + Akkusativ (der Kaffee)", explanation: "Глаголот 'trinken' бара Akkusativ. 'der Kaffee' -> 'den Kaffee'." },
  { sentence: "Ich lese ___ Zeitung.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "lesen + Akkusativ (die Zeitung)", explanation: "Глаголот 'lesen' бара Akkusativ. 'die Zeitung' останува 'die'." },
  { sentence: "Wir brauchen ___ Arzt.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "brauchen + Akkusativ (der Arzt)", explanation: "Глаголот 'brauchen' бара Akkusativ. 'der Arzt' -> 'den Arzt'." },
  { sentence: "Sie liebt ___ Hund.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "lieben + Akkusativ (der Hund)", explanation: "Глаголот 'lieben' бара Akkusativ. 'der Hund' -> 'den Hund'." },

  // ===== AUF + DATIV (локација) =====
  { sentence: "Das Buch liegt auf ___ Tisch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "auf + Dativ, Wo? (der Tisch)", explanation: "Прашање 'Wo?' -> Dativ. 'der Tisch' -> 'dem Tisch'." },
  { sentence: "Die Katze sitzt auf ___ Sofa.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "auf + Dativ, Wo? (das Sofa)", explanation: "Прашање 'Wo?' -> Dativ. 'das Sofa' -> 'dem Sofa'." },
  { sentence: "Er steht auf ___ Straße.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "auf + Dativ, Wo? (die Straße)", explanation: "Прашање 'Wo?' -> Dativ. 'die Straße' -> 'der Straße'." },
  { sentence: "Das Glas steht auf ___ Tisch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "auf + Dativ, Wo? (der Tisch)", explanation: "Прашање 'Wo?' -> Dativ. 'der Tisch' -> 'dem Tisch'." },
  { sentence: "Sie arbeitet auf ___ Bauernhof.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "auf + Dativ, Wo? (der Bauernhof)", explanation: "Прашање 'Wo?' -> Dativ. 'der Bauernhof' -> 'dem Bauernhof'." },

  // ===== AUF + AKKUSATIV (насока) =====
  { sentence: "Er legt das Buch auf ___ Tisch.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "auf + Akkusativ, Wohin? (der Tisch)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'der Tisch' -> 'den Tisch'." },
  { sentence: "Sie stellt das Glas auf ___ Tisch.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "auf + Akkusativ, Wohin? (der Tisch)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'der Tisch' -> 'den Tisch'." },
  { sentence: "Das Kind läuft auf ___ Straße.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "auf + Akkusativ, Wohin? (die Straße)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'die Straße' останува 'die'." },

  // ===== NACH + DATIV (по, после) =====
  { sentence: "Nach ___ Schule gehe ich nach Hause.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "nach + Dativ (die Schule)", explanation: "Предлогот 'nach' (по/после) секогаш бара Dativ. 'die Schule' -> 'der Schule'." },
  { sentence: "Wir essen nach ___ Film.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "nach + Dativ (der Film)", explanation: "Предлогот 'nach' секогаш бара Dativ. 'der Film' -> 'dem Film'." },
  { sentence: "Nach ___ Arbeit bin ich müde.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "nach + Dativ (die Arbeit)", explanation: "Предлогот 'nach' секогаш бара Dativ. 'die Arbeit' -> 'der Arbeit'." },
  { sentence: "Nach ___ Essen trinken wir Kaffee.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "nach + Dativ (das Essen)", explanation: "Предлогот 'nach' секогаш бара Dativ. 'das Essen' -> 'dem Essen'." },
  { sentence: "Er kommt nach ___ Unterricht.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "nach + Dativ (der Unterricht)", explanation: "Предлогот 'nach' секогаш бара Dativ. 'der Unterricht' -> 'dem Unterricht'." },

  // ===== VON + DATIV (од) =====
  { sentence: "Ich komme von ___ Arzt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "von + Dativ (der Arzt)", explanation: "Предлогот 'von' (од) секогаш бара Dativ. 'der Arzt' -> 'dem Arzt'." },
  { sentence: "Das ist ein Geschenk von ___ Mutter.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "von + Dativ (die Mutter)", explanation: "Предлогот 'von' секогаш бара Dativ. 'die Mutter' -> 'der Mutter'." },
  { sentence: "Er kommt von ___ Schule.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "von + Dativ (die Schule)", explanation: "Предлогот 'von' секогаш бара Dativ. 'die Schule' -> 'der Schule'." },
  { sentence: "Wir kommen von ___ Markt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "von + Dativ (der Markt)", explanation: "Предлогот 'von' секогаш бара Dativ. 'der Markt' -> 'dem Markt'." },
  { sentence: "Das ist eine Idee von ___ Chef.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "von + Dativ (der Chef)", explanation: "Предлогот 'von' секогаш бара Dativ. 'der Chef' -> 'dem Chef'." },
  { sentence: "Sie hört Musik von ___ Band.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "von + Dativ (die Band)", explanation: "Предлогот 'von' секогаш бара Dativ. 'die Band' -> 'der Band'." },

  // ===== ZU + DATIV (кај, кон) =====
  { sentence: "Ich gehe zu ___ Arzt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zu + Dativ (der Arzt)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'der Arzt' -> 'dem Arzt'." },
  { sentence: "Er fährt zu ___ Bahnhof.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zu + Dativ (der Bahnhof)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'der Bahnhof' -> 'dem Bahnhof'." },
  { sentence: "Wir gehen zu ___ Party.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "zu + Dativ (die Party)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'die Party' -> 'der Party'." },
  { sentence: "Sie geht zu ___ Schule.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "zu + Dativ (die Schule)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'die Schule' -> 'der Schule'." },
  { sentence: "Er kommt zu ___ Fest.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zu + Dativ (das Fest)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'das Fest' -> 'dem Fest'." },
  { sentence: "Ich gehe zu ___ Bank.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "zu + Dativ (die Bank)", explanation: "Предлогот 'zu' секогаш бара Dativ. 'die Bank' -> 'der Bank'." },

  // ===== BEI + DATIV (кај, при) =====
  { sentence: "Ich bin beim (bei + dem) ___ Arzt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "bei + Dativ (der Arzt)", explanation: "Предлогот 'bei' секогаш бара Dativ. 'bei + dem' = 'beim'." },
  { sentence: "Er wohnt bei ___ Familie.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "bei + Dativ (die Familie)", explanation: "Предлогот 'bei' секогаш бара Dativ. 'die Familie' -> 'der Familie'." },
  { sentence: "Sie arbeitet bei ___ Supermarkt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "bei + Dativ (der Supermarkt)", explanation: "Предлогот 'bei' секогаш бара Dativ. 'der Supermarkt' -> 'dem Supermarkt'." },
  { sentence: "Ich sitze bei ___ Fenster.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "bei + Dativ (das Fenster)", explanation: "Предлогот 'bei' секогаш бара Dativ. 'das Fenster' -> 'dem Fenster'." },

  // ===== AUS + DATIV (од, потекло) =====
  { sentence: "Ich komme aus ___ Türkei.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "aus + Dativ (die Türkei)", explanation: "Предлогот 'aus' секогаш бара Dativ. 'die Türkei' -> 'der Türkei'." },
  { sentence: "Er trinkt Wasser aus ___ Glas.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "aus + Dativ (das Glas)", explanation: "Предлогот 'aus' секогаш бара Dativ. 'das Glas' -> 'dem Glas'." },
  { sentence: "Das Hemd ist aus ___ Schweiz.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "aus + Dativ (die Schweiz)", explanation: "Предлогот 'aus' секогаш бара Dativ. 'die Schweiz' -> 'der Schweiz'." },
  { sentence: "Sie kommt aus ___ Küche.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "aus + Dativ (die Küche)", explanation: "Предлогот 'aus' секогаш бара Dativ. 'die Küche' -> 'der Küche'." },

  // ===== OHNE + AKKUSATIV (без) =====
  { sentence: "Ich gehe ohne ___ Regenschirm.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "ohne + Akkusativ (der Regenschirm)", explanation: "Предлогот 'ohne' секогаш бара Akkusativ. 'der Regenschirm' -> 'den Regenschirm'." },
  { sentence: "Er trinkt Kaffee ohne ___ Milch.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "ohne + Akkusativ (die Milch)", explanation: "Предлогот 'ohne' секогаш бара Akkusativ. 'die Milch' останува 'die'." },
  { sentence: "Sie kommt ohne ___ Freund.", options: ["den", "dem", "der", "das"], correct: "den", case: "Akkusativ", hint: "ohne + Akkusativ (der Freund)", explanation: "Предлогот 'ohne' секогаш бара Akkusativ. 'der Freund' -> 'den Freund'." },
  { sentence: "Wir reisen ohne ___ Auto.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "ohne + Akkusativ (das Auto)", explanation: "Предлогот 'ohne' секогаш бара Akkusativ. 'das Auto' останува 'das'." },
  { sentence: "Er geht ohne ___ Tasche.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "ohne + Akkusativ (die Tasche)", explanation: "Предлогот 'ohne' секогаш бара Akkusativ. 'die Tasche' останува 'die'." },

  // ===== DURCH + AKKUSATIV (низ) =====
  { sentence: "Wir gehen durch ___ Park.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "durch + Akkusativ (der Park)", explanation: "Предлогот 'durch' секогаш бара Akkusativ. 'der Park' -> 'den Park'." },
  { sentence: "Er fährt durch ___ Tunnel.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "durch + Akkusativ (der Tunnel)", explanation: "Предлогот 'durch' секогаш бара Akkusativ. 'der Tunnel' -> 'den Tunnel'." },
  { sentence: "Sie läuft durch ___ Wald.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "durch + Akkusativ (der Wald)", explanation: "Предлогот 'durch' секогаш бара Akkusativ. 'der Wald' -> 'den Wald'." },
  { sentence: "Wir fahren durch ___ Stadt.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "durch + Akkusativ (die Stadt)", explanation: "Предлогот 'durch' секогаш бара Akkusativ. 'die Stadt' останува 'die'." },

  // ===== GEGEN + AKKUSATIV (против) =====
  { sentence: "Das Auto fährt gegen ___ Baum.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "gegen + Akkusativ (der Baum)", explanation: "Предлогот 'gegen' секогаш бара Akkusativ. 'der Baum' -> 'den Baum'." },
  { sentence: "Ich bin gegen ___ Plan.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "gegen + Akkusativ (der Plan)", explanation: "Предлогот 'gegen' секогаш бара Akkusativ. 'der Plan' -> 'den Plan'." },
  { sentence: "Er kämpft gegen ___ Kälte.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "gegen + Akkusativ (die Kälte)", explanation: "Предлогот 'gegen' секогаш бара Akkusativ. 'die Kälte' останува 'die'." },

  // ===== UM + AKKUSATIV (околу) =====
  { sentence: "Wir gehen um ___ See.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "um + Akkusativ (der See)", explanation: "Предлогот 'um' секогаш бара Akkusativ. 'der See' -> 'den See'." },
  { sentence: "Sie läuft um ___ Haus.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "um + Akkusativ (das Haus)", explanation: "Предлогот 'um' секогаш бара Akkusativ. 'das Haus' останува 'das'." },
  { sentence: "Er fährt um ___ Block.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "um + Akkusativ (der Block)", explanation: "Предлогот 'um' секогаш бара Akkusativ. 'der Block' -> 'den Block'." },

  // ===== GENITIV - СОПСТВЕНОСТ =====
  { sentence: "Das ist das Auto ___ Vaters.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "Сопственост -> Genitiv (der Vater)", explanation: "Genitiv искажува сопственост. Машки/среден род: 'des + наставка -s'." },
  { sentence: "Das ist die Tasche ___ Mutter.", options: ["der", "die", "dem", "den"], correct: "der", case: "Genitiv", hint: "Сопственост -> Genitiv (die Mutter)", explanation: "Genitiv искажува сопственост. Женски род: 'die' -> 'der'." },
  { sentence: "Das Zimmer ___ Kindes ist klein.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "Сопственост -> Genitiv (das Kind)", explanation: "Genitiv искажува сопственост. Среден род: 'das' -> 'des + -s'." },
  { sentence: "Der Name ___ Stadt ist Berlin.", options: ["der", "die", "dem", "den"], correct: "der", case: "Genitiv", hint: "Сопственост -> Genitiv (die Stadt)", explanation: "Genitiv искажува сопственост. Женски род: 'die' -> 'der'." },
  { sentence: "Das Ende ___ Films war toll.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "Сопственост -> Genitiv (der Film)", explanation: "Genitiv искажува сопственост. Машки род: 'der' -> 'des + -s'." },
  { sentence: "Die Farbe ___ Autos ist blau.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "Сопственост -> Genitiv (das Auto)", explanation: "Genitiv искажува сопственост. Среден род: 'das' -> 'des + -s'." },
  { sentence: "Der Chef ___ Firma ist freundlich.", options: ["der", "die", "dem", "den"], correct: "der", case: "Genitiv", hint: "Сопственост -> Genitiv (die Firma)", explanation: "Genitiv искажува сопственост. Женски род: 'die' -> 'der'." },
  { sentence: "Das Haus ___ Bruders ist groß.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "Сопственост -> Genitiv (der Bruder)", explanation: "Genitiv искажува сопственост. Машки род: 'der' -> 'des + -s'." },

  // ===== AN + DATIV / AKKUSATIV =====
  { sentence: "Das Bild hängt an ___ Wand.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "an + Dativ, Wo? (die Wand)", explanation: "Прашање 'Wo?' -> Dativ. 'die Wand' -> 'der Wand'." },
  { sentence: "Er hängt das Bild an ___ Wand.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "an + Akkusativ, Wohin? (die Wand)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'die Wand' останува 'die'." },
  { sentence: "Ich sitze an ___ Tisch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "an + Dativ, Wo? (der Tisch)", explanation: "Прашање 'Wo?' -> Dativ. 'der Tisch' -> 'dem Tisch'." },
  { sentence: "Er setzt sich an ___ Tisch.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "an + Akkusativ, Wohin? (der Tisch)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'der Tisch' -> 'den Tisch'." },
  { sentence: "Wir arbeiten an ___ Projekt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "an + Dativ (das Projekt)", explanation: "Прашање 'Wo/Woran?' -> Dativ. 'das Projekt' -> 'dem Projekt'." },
  { sentence: "Sie steht an ___ Fenster.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "an + Dativ, Wo? (das Fenster)", explanation: "Прашање 'Wo?' -> Dativ. 'das Fenster' -> 'dem Fenster'." },

  // ===== ÜBER + DATIV / AKKUSATIV =====
  { sentence: "Die Lampe hängt über ___ Tisch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "über + Dativ, Wo? (der Tisch)", explanation: "Прашање 'Wo?' -> Dativ. 'der Tisch' -> 'dem Tisch'." },
  { sentence: "Er hängt die Lampe über ___ Tisch.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "über + Akkusativ, Wohin? (der Tisch)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'der Tisch' -> 'den Tisch'." },
  { sentence: "Wir reden über ___ Film.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "reden über + Akkusativ (der Film)", explanation: "'reden über' бара Akkusativ. 'der Film' -> 'den Film'." },
  { sentence: "Er denkt über ___ Problem nach.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "denken über + Akkusativ (das Problem)", explanation: "'nachdenken über' бара Akkusativ. 'das Problem' останува 'das'." },

  // ===== UNTER + DATIV / AKKUSATIV =====
  { sentence: "Der Hund liegt unter ___ Tisch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "unter + Dativ, Wo? (der Tisch)", explanation: "Прашање 'Wo?' -> Dativ. 'der Tisch' -> 'dem Tisch'." },
  { sentence: "Die Katze läuft unter ___ Bett.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "unter + Akkusativ, Wohin? (das Bett)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'das Bett' останува 'das'." },
  { sentence: "Er versteckt das Geld unter ___ Matratze.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "unter + Dativ, Wo? (die Matratze)", explanation: "Прашање 'Wo?' -> Dativ. 'die Matratze' -> 'der Matratze'." },

  // ===== VOR + DATIV / AKKUSATIV =====
  { sentence: "Er steht vor ___ Haus.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "vor + Dativ, Wo? (das Haus)", explanation: "Прашање 'Wo?' -> Dativ. 'das Haus' -> 'dem Haus'." },
  { sentence: "Sie stellt das Auto vor ___ Haus.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "vor + Akkusativ, Wohin? (das Haus)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'das Haus' останува 'das'." },
  { sentence: "Ich warte vor ___ Schule.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "vor + Dativ, Wo? (die Schule)", explanation: "Прашање 'Wo?' -> Dativ. 'die Schule' -> 'der Schule'." },
  { sentence: "Angst vor ___ Hund ist normal.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "Angst vor + Dativ (der Hund)", explanation: "Изразот 'Angst vor' бара Dativ. 'der Hund' -> 'dem Hund'." },

  // ===== HINTER + DATIV / AKKUSATIV =====
  { sentence: "Das Auto steht hinter ___ Haus.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "hinter + Dativ, Wo? (das Haus)", explanation: "Прашање 'Wo?' -> Dativ. 'das Haus' -> 'dem Haus'." },
  { sentence: "Er geht hinter ___ Schule.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "hinter + Akkusativ, Wohin? (die Schule)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'die Schule' останува 'die'." },

  // ===== NEBEN + DATIV / AKKUSATIV =====
  { sentence: "Die Bank ist neben ___ Supermarkt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "neben + Dativ, Wo? (der Supermarkt)", explanation: "Прашање 'Wo?' -> Dativ. 'der Supermarkt' -> 'dem Supermarkt'." },
  { sentence: "Er setzt sich neben ___ Frau.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "neben + Akkusativ, Wohin? (die Frau)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'die Frau' останува 'die'." },
  { sentence: "Ich sitze neben ___ Freund.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "neben + Dativ, Wo? (der Freund)", explanation: "Прашање 'Wo?' -> Dativ. 'der Freund' -> 'dem Freund'." },

  // ===== ZWISCHEN + DATIV / AKKUSATIV =====
  { sentence: "Das Café ist zwischen ___ Bäckerei und ___ Bank.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "zwischen + Dativ, Wo? (die Bäckerei)", explanation: "Прашање 'Wo?' -> Dativ. 'die Bäckerei' -> 'der Bäckerei'." },
  { sentence: "Er stellt sich zwischen ___ Stühle.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "zwischen + Akkusativ, Wohin? (die Stühle)", explanation: "Прашање 'Wohin?' -> Akkusativ. Множина 'die Stühle' останува 'die'." },

  // ===== SEIT + DATIV (од, откога) =====
  { sentence: "Ich lerne Deutsch seit ___ Jahr.", options: ["einem", "ein", "einen", "eine"], correct: "einem", case: "Dativ", hint: "seit + Dativ (ein Jahr)", explanation: "Предлогот 'seit' секогаш бара Dativ. 'ein Jahr' -> 'einem Jahr'." },
  { sentence: "Er wohnt hier seit ___ Woche.", options: ["einer", "eine", "einen", "einem"], correct: "einer", case: "Dativ", hint: "seit + Dativ (eine Woche)", explanation: "Предлогот 'seit' секогаш бара Dativ. 'eine Woche' -> 'einer Woche'." },
  { sentence: "Wir kennen uns seit ___ Monat.", options: ["einem", "ein", "einen", "eine"], correct: "einem", case: "Dativ", hint: "seit + Dativ (ein Monat)", explanation: "Предлогот 'seit' секогаш бара Dativ. 'ein Monat' -> 'einem Monat'." },

  // ===== WEGEN + GENITIV (поради) =====
  { sentence: "Er bleibt wegen ___ Regens zu Hause.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "wegen + Genitiv (der Regen)", explanation: "Предлогот 'wegen' бара Genitiv. 'der Regen' -> 'des Regens'." },
  { sentence: "Sie kommt nicht wegen ___ Prüfung.", options: ["der", "die", "dem", "den"], correct: "der", case: "Genitiv", hint: "wegen + Genitiv (die Prüfung)", explanation: "Предлогот 'wegen' бара Genitiv. 'die Prüfung' -> 'der Prüfung'." },
  { sentence: "Ich schlafe schlecht wegen ___ Lärms.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "wegen + Genitiv (der Lärm)", explanation: "Предлогот 'wegen' бара Genitiv. 'der Lärm' -> 'des Lärms'." },

  // ===== WÄHREND + GENITIV (за време на) =====
  { sentence: "Während ___ Unterrichts schläft er.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "während + Genitiv (der Unterricht)", explanation: "Предлогот 'während' бара Genitiv. 'der Unterricht' -> 'des Unterrichts'." },
  { sentence: "Während ___ Reise liest sie.", options: ["der", "die", "dem", "den"], correct: "der", case: "Genitiv", hint: "während + Genitiv (die Reise)", explanation: "Предлогот 'während' бара Genitiv. 'die Reise' -> 'der Reise'." },
  { sentence: "Während ___ Konzerts ist es ruhig.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "während + Genitiv (das Konzert)", explanation: "Предлогот 'während' бара Genitiv. 'das Konzert' -> 'des Konzerts'." },

  // ===== ГЛАГОЛИ КОИ БАРААТ DATIV =====
  { sentence: "Das Lied gefällt ___ Mutter.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "gefallen + Dativ (die Mutter)", explanation: "Глаголот 'gefallen' (се допаѓа) бара Dativ. 'die Mutter' -> 'der Mutter'." },
  { sentence: "Das Essen schmeckt ___ Kind.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "schmecken + Dativ (das Kind)", explanation: "Глаголот 'schmecken' бара Dativ. 'das Kind' -> 'dem Kind'." },
  { sentence: "Der Film gefällt ___ Mann.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "gefallen + Dativ (der Mann)", explanation: "Глаголот 'gefallen' бара Dativ. 'der Mann' -> 'dem Mann'." },
  { sentence: "Ich danke ___ Lehrerin.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "danken + Dativ (die Lehrerin)", explanation: "Глаголот 'danken' (благодарам) бара Dativ. 'die Lehrerin' -> 'der Lehrerin'." },
  { sentence: "Er antwortet ___ Chef.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "antworten + Dativ (der Chef)", explanation: "Глаголот 'antworten' (одговарам) бара Dativ. 'der Chef' -> 'dem Chef'." },
  { sentence: "Das Kleid passt ___ Frau gut.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "passen + Dativ (die Frau)", explanation: "Глаголот 'passen' бара Dativ. 'die Frau' -> 'der Frau'." },
  { sentence: "Es gehört ___ Kind.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "gehören + Dativ (das Kind)", explanation: "Глаголот 'gehören' (припаѓа) бара Dativ. 'das Kind' -> 'dem Kind'." },
  { sentence: "Er folgt ___ Frau.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "folgen + Dativ (die Frau)", explanation: "Глаголот 'folgen' (следам) бара Dativ. 'die Frau' -> 'der Frau'." },
  { sentence: "Ich vertraue ___ Arzt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "vertrauen + Dativ (der Arzt)", explanation: "Глаголот 'vertrauen' (верувам) бара Dativ. 'der Arzt' -> 'dem Arzt'." },
  { sentence: "Das schadet ___ Gesundheit.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "schaden + Dativ (die Gesundheit)", explanation: "Глаголот 'schaden' (штети) бара Dativ. 'die Gesundheit' -> 'der Gesundheit'." },

  // ===== ДВООБЈЕКТНИ РЕЧЕНИЦИ (Dativ + Akkusativ) =====
  { sentence: "Ich gebe ___ Kind das Buch.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "geben + Dativ (indirect object) (das Kind)", explanation: "Индиректниот објект (кому?) е во Dativ. 'das Kind' -> 'dem Kind'." },
  { sentence: "Er schickt ___ Mutter eine Karte.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "schicken + Dativ (die Mutter)", explanation: "Индиректниот објект (кому?) е во Dativ. 'die Mutter' -> 'der Mutter'." },
  { sentence: "Ich zeige ___ Freund das Foto.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zeigen + Dativ (der Freund)", explanation: "Индиректниот објект (кому?) е во Dativ. 'der Freund' -> 'dem Freund'." },
  { sentence: "Sie bringt ___ Vater Kaffee.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "bringen + Dativ (der Vater)", explanation: "Индиректниот објект (кому?) е во Dativ. 'der Vater' -> 'dem Vater'." },
  { sentence: "Er erklärt ___ Schüler die Aufgabe.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "erklären + Dativ (der Schüler)", explanation: "Индиректниот објект (кому?) е во Dativ. 'der Schüler' -> 'dem Schüler'." },
  { sentence: "Ich kaufe ___ Bruder ein Geschenk.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "kaufen + Dativ (der Bruder)", explanation: "Индиректниот објект (кому?) е во Dativ. 'der Bruder' -> 'dem Bruder'." },
  { sentence: "Er sagt ___ Lehrerin die Wahrheit.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "sagen + Dativ (die Lehrerin)", explanation: "Индиректниот објект (кому?) е во Dativ. 'die Lehrerin' -> 'der Lehrerin'." },

  // ===== МЕШАНИ ПРАШАЊА - ПОВТОРУВАЊЕ =====
  { sentence: "Ich gehe mit ___ Hund spazieren.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "mit + Dativ (der Hund)", explanation: "Предлогот 'mit' секогаш бара Dativ. 'der Hund' -> 'dem Hund'." },
  { sentence: "Er kauft ___ Jacke für seine Mutter.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "kaufen + Akkusativ (die Jacke)", explanation: "Директниот објект е во Akkusativ. 'die Jacke' останува 'die'." },
  { sentence: "Wir kommen von ___ Arbeit.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "von + Dativ (die Arbeit)", explanation: "Предлогот 'von' бара Dativ. 'die Arbeit' -> 'der Arbeit'." },
  { sentence: "Das Buch liegt neben ___ Lampe.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "neben + Dativ, Wo? (die Lampe)", explanation: "Прашање 'Wo?' -> Dativ. 'die Lampe' -> 'der Lampe'." },
  { sentence: "Er stellt die Lampe neben ___ Bett.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "neben + Akkusativ, Wohin? (das Bett)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'das Bett' останува 'das'." },
  { sentence: "Ich warte auf ___ Bus.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "warten auf + Akkusativ (der Bus)", explanation: "Изразот 'warten auf' бара Akkusativ. 'der Bus' -> 'den Bus'." },
  { sentence: "Sie freut sich auf ___ Urlaub.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "sich freuen auf + Akkusativ (der Urlaub)", explanation: "Изразот 'sich freuen auf' бара Akkusativ. 'der Urlaub' -> 'den Urlaub'." },
  { sentence: "Er denkt an ___ Mutter.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "denken an + Akkusativ (die Mutter)", explanation: "Изразот 'denken an' бара Akkusativ. 'die Mutter' останува 'die'." },
  { sentence: "Wir sprechen über ___ Problem.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "sprechen über + Akkusativ (das Problem)", explanation: "Изразот 'sprechen über' бара Akkusativ. 'das Problem' останува 'das'." },
  { sentence: "Er interessiert sich für ___ Sport.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "sich interessieren für + Akkusativ (der Sport)", explanation: "Изразот 'sich interessieren für' бара Akkusativ. 'der Sport' -> 'den Sport'." },
  { sentence: "Sie ärgert sich über ___ Fehler.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "sich ärgern über + Akkusativ (der Fehler)", explanation: "Изразот 'sich ärgern über' бара Akkusativ. 'der Fehler' -> 'den Fehler'." },
  { sentence: "Ich fahre zu ___ Supermarkt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zu + Dativ (der Supermarkt)", explanation: "Предлогот 'zu' бара Dativ. 'der Supermarkt' -> 'dem Supermarkt'." },
  { sentence: "Das Bild hängt über ___ Sofa.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "über + Dativ, Wo? (das Sofa)", explanation: "Прашање 'Wo?' -> Dativ. 'das Sofa' -> 'dem Sofa'." },
  { sentence: "Er setzt das Bild über ___ Sofa.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "über + Akkusativ, Wohin? (das Sofa)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'das Sofa' останува 'das'." },
  { sentence: "Ich lerne seit ___ Monat Deutsch.", options: ["einem", "ein", "einen", "eine"], correct: "einem", case: "Dativ", hint: "seit + Dativ (ein Monat)", explanation: "Предлогот 'seit' бара Dativ. 'ein Monat' -> 'einem Monat'." },
  { sentence: "Er kommt aus ___ Deutschland.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "aus + Dativ (das Land)", explanation: "Предлогот 'aus' бара Dativ. За имиња на земји без член, се користи 'dem'." },
  { sentence: "Ich gehe ohne ___ Schlüssel.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "ohne + Akkusativ (der Schlüssel)", explanation: "Предлогот 'ohne' бара Akkusativ. 'der Schlüssel' -> 'den Schlüssel'." },
  { sentence: "Das Essen ist für ___ Gäste.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "für + Akkusativ (die Gäste - Plural)", explanation: "Предлогот 'für' бара Akkusativ. Множина 'die Gäste' останува 'die'." },
  { sentence: "Sie fährt durch ___ Dorf.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "durch + Akkusativ (das Dorf)", explanation: "Предлогот 'durch' бара Akkusativ. 'das Dorf' останува 'das'." },
  { sentence: "Er wartet bei ___ Eingang.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "bei + Dativ (der Eingang)", explanation: "Предлогот 'bei' бара Dativ. 'der Eingang' -> 'dem Eingang'." },
  { sentence: "Das Taxi hält vor ___ Hotel.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "vor + Dativ, Wo? (das Hotel)", explanation: "Прашање 'Wo?' -> Dativ. 'das Hotel' -> 'dem Hotel'." },
  { sentence: "Er parkt das Auto vor ___ Haus.", options: ["das", "dem", "den", "der"], correct: "das", case: "Akkusativ", hint: "vor + Akkusativ, Wohin? (das Haus)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'das Haus' останува 'das'." },
  { sentence: "Wir gehen gegen ___ Wind.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "gegen + Akkusativ (der Wind)", explanation: "Предлогот 'gegen' бара Akkusativ. 'der Wind' -> 'den Wind'." },
  { sentence: "Nach ___ Prüfung gehen wir feiern.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "nach + Dativ (die Prüfung)", explanation: "Предлогот 'nach' бара Dativ. 'die Prüfung' -> 'der Prüfung'." },
  { sentence: "Das Geschenk ist für ___ Schwester.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "für + Akkusativ (die Schwester)", explanation: "Предлогот 'für' бара Akkusativ. 'die Schwester' останува 'die'." },
  { sentence: "Ich gehe zu ___ Zahnarzt.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "zu + Dativ (der Zahnarzt)", explanation: "Предлогот 'zu' бара Dativ. 'der Zahnarzt' -> 'dem Zahnarzt'." },
  { sentence: "Er hört auf ___ Mutter.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "hören auf + Akkusativ (die Mutter)", explanation: "Изразот 'hören auf' бара Akkusativ. 'die Mutter' останува 'die'." },
  { sentence: "Die Kinder schlafen während ___ Films.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "während + Genitiv (der Film)", explanation: "Предлогот 'während' бара Genitiv. 'der Film' -> 'des Films'." },
  { sentence: "Wir wohnen neben ___ Bäckerei.", options: ["der", "die", "dem", "den"], correct: "der", case: "Dativ", hint: "neben + Dativ, Wo? (die Bäckerei)", explanation: "Прашање 'Wo?' -> Dativ. 'die Bäckerei' -> 'der Bäckerei'." },
  { sentence: "Er bittet um ___ Hilfe.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "bitten um + Akkusativ (die Hilfe)", explanation: "Изразот 'bitten um' бара Akkusativ. 'die Hilfe' останува 'die'." },
  { sentence: "Ich bin stolz auf ___ Sohn.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "stolz auf + Akkusativ (der Sohn)", explanation: "Изразот 'stolz auf' бара Akkusativ. 'der Sohn' -> 'den Sohn'." },
  { sentence: "Das Café ist gegenüber ___ Bahnhof.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "gegenüber + Dativ (der Bahnhof)", explanation: "Предлогот 'gegenüber' бара Dativ. 'der Bahnhof' -> 'dem Bahnhof'." },
  { sentence: "Er geht trotz ___ Regens spazieren.", options: ["des", "dem", "den", "der"], correct: "des", case: "Genitiv", hint: "trotz + Genitiv (der Regen)", explanation: "Предлогот 'trotz' (и покрај) бара Genitiv. 'der Regen' -> 'des Regens'." },
  { sentence: "Wir treffen uns um ___ Ecke.", options: ["die", "der", "dem", "den"], correct: "die", case: "Akkusativ", hint: "um + Akkusativ (die Ecke)", explanation: "Предлогот 'um' бара Akkusativ. 'die Ecke' останува 'die'." },
  { sentence: "Das Kind versteckt sich hinter ___ Sofa.", options: ["dem", "den", "der", "die"], correct: "dem", case: "Dativ", hint: "hinter + Dativ, Wo? (das Sofa)", explanation: "Прашање 'Wo?' -> Dativ. 'das Sofa' -> 'dem Sofa'." },
  { sentence: "Sie legt das Kind hinter ___ Vorhang.", options: ["den", "dem", "der", "die"], correct: "den", case: "Akkusativ", hint: "hinter + Akkusativ, Wohin? (der Vorhang)", explanation: "Прашање 'Wohin?' -> Akkusativ. 'der Vorhang' -> 'den Vorhang'." },
  { sentence: "Das Essen riecht gut. Es gehört ___ Gästen.", options: ["den", "dem", "der", "die"], correct: "den", case: "Dativ", hint: "gehören + Dativ (die Gäste - Plural)", explanation: "Глаголот 'gehören' бара Dativ. Множина Dativ -> 'den Gästen'." },
  { sentence: "Er schläft zwischen ___ Kissen.", options: ["den", "dem", "der", "die"], correct: "den", case: "Dativ", hint: "zwischen + Dativ, Wo? (die Kissen - Plural)", explanation: "Прашање 'Wo?' -> Dativ. Множина Dativ добива наставка -en -> 'den Kissen'." },
];