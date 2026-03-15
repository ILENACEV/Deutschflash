// Local Grammar Checker - Rule-based German Grammar Validation
// 100% Offline - No AI required

export interface GrammarRule {
  id: string;
  name: string;
  description: string;
  check: (sentence: string) => GrammarIssue[];
}

export interface GrammarIssue {
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  position: { start: number; end: number };
  suggestion?: string;
  rule: string;
}

// German grammar rules
export const grammarRules: GrammarRule[] = [
  {
    id: 'verb-position-v2',
    name: 'V2 Regel',
    description: 'Глаголот треба да биде на второ место во главната реченица',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const words = sentence.trim().split(/\s+/);
      const conjugatedVerb = words.find(w => /\w+(en|st|t|te|test|tet|ten|tet)$/i.test(w) && !w.endsWith('en'));
      
      if (words.length > 3 && conjugatedVerb) {
        const verbIndex = words.indexOf(conjugatedVerb);
        if (verbIndex !== 1 && !sentence.includes(',') && !sentence.includes('weil') && !sentence.includes('dass')) {
          issues.push({
            type: 'error',
            message: `Глаголот "${conjugatedVerb}" не е на второ место`,
            position: { start: 0, end: sentence.length },
            suggestion: 'Преуреди ја реченицата: Subject + Verb + ...',
            rule: 'V2'
          });
        }
      }
      return issues;
    }
  },
  {
    id: 'verb-positionnebensatz',
    name: 'Nebensatz Verb Position',
    description: 'Во подредената реченица, глаголот е на крајот',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const conjunctions = ['weil', 'dass', 'obwohl', 'wenn', 'als', 'bevor', 'damit', 'um', 'nachdem', 'während'];
      const hasConjunction = conjunctions.some(c => sentence.toLowerCase().includes(c));
      
      if (hasConjunction) {
        const parts = sentence.split(/,\s*/);
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          const verbs = lastPart.split(/\s+/).filter(w => 
            /\w+(en|st|t|te|test|tet|ten|tet)$/i.test(w) && !w.endsWith('en')
          );
          if (verbs.length > 1) {
            issues.push({
              type: 'warning',
              message: 'Во Nebensatz, глаголот треба да биде на крајот',
              position: { start: sentence.lastIndexOf(parts[parts.length - 1]), end: sentence.length },
              rule: 'Nebensatz'
            });
          }
        }
      }
      return issues;
    }
  },
  {
    id: 'article-gender',
    name: 'Член - Род',
    description: 'Проверува дали членот одговара на родот на именката',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      
      const nounArticlePatterns = [
        { pattern: /der\s+(\w+in)\b/i, correct: 'die' },
        { pattern: /das\s+(\w+chen)\b/i, correct: 'das' },
        { pattern: /die\s+(\w+ung)\b/i, correct: 'die' },
      ];
      
      for (const { pattern, correct } of nounArticlePatterns) {
        const match = sentence.match(pattern);
        if (match) {
          issues.push({
            type: 'warning',
            message: `Именката "${match[1]}" веројатно бара член "${correct}"`,
            position: { start: match.index || 0, end: (match.index || 0) + match[0].length },
            suggestion: correct,
            rule: 'Artikel-Gender'
          });
        }
      }
      return issues;
    }
  },
  {
    id: 'akkusativ-prepositions',
    name: 'Akkusativ Предлози',
    description: 'Овие предлози секогаш бараат Akkusativ',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const akkusativPreps = ['durch', 'für', 'gegen', 'ohne', 'um', 'bis', 'entlang'];
      const wrongPattern = /(durch|für|gegen|ohne|um|bis|entlang)\s+(der|die|das)\b/i;
      
      const match = sentence.match(wrongPattern);
      if (match) {
        issues.push({
          type: 'error',
          message: `Предлогот "${match[1]}" бара Akkusativ, не "${match[2]}"`,
          position: { start: match.index || 0, end: (match.index || 0) + match[0].length },
          suggestion: match[1] + ' ' + (match[2] === 'der' ? 'den' : match[2] === 'das' ? 'das' : 'die'),
          rule: 'Akkusativ-Präpositionen'
        });
      }
      return issues;
    }
  },
  {
    id: 'dativ-prepositions',
    name: 'Dativ Предлози',
    description: 'Овие предлози секогаш бараат Dativ',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const dativPreps = ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'außer', 'statt', 'trotz'];
      const wrongPattern = /(aus|bei|mit|nach|seit|von|zu|außer|statt|trotz)\s+(den|dem)\b/i;
      
      const match = sentence.match(wrongPattern);
      if (match) {
        const correction = match[1] === 'zu' ? 'zum' : 
                         match[1] === 'nach' ? 'nach dem' :
                         match[1] === 'aus' ? 'aus dem' :
                         match[1] === 'bei' ? 'bei dem' :
                         match[1] === 'von' ? 'vom' :
                         match[1] === 'mit' ? 'mit dem' : match[0];
        
        issues.push({
          type: 'warning',
          message: `Предлогот "${match[1]}" бара Dativ`,
          position: { start: match.index || 0, end: (match.index || 0) + match[0].length },
          suggestion: correction,
          rule: 'Dativ-Präpositionen'
        });
      }
      return issues;
    }
  },
  {
    id: 'wechselpreposition',
    name: 'Wechselpräpositionen',
    description: 'Wo/Wohin/Woher - проверува правилен падеж',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      
      const wechselPatterns = [
        { prep: 'in', wohin: 'in den/die/das', wo: 'in dem/der', wrong: 'in den' },
        { prep: 'auf', wohin: 'auf den/die/das', wo: 'auf dem/der', wrong: 'auf den' },
        { prep: 'an', wohin: 'an den/die/das', wo: 'an dem/der', wrong: 'an den' },
        { prep: 'vor', wohin: 'vor den/die/das', wo: 'vor dem/der', wrong: 'vor den' },
      ];
      
      for (const { prep, wrong } of wechselPatterns) {
        const pattern = new RegExp(`${prep}\\s+(den|die|das)\\b`, 'gi');
        let match;
        while ((match = pattern.exec(sentence)) !== null) {
          if (match[1] === 'den') {
            issues.push({
              type: 'warning',
              message: `"${prep} + den" може да биде погрешно ( зависи од значењето: "wo" vs "wohin")`,
              position: { start: match.index, end: match.index + match[0].length },
              rule: 'Wechselpräpositionen'
            });
          }
        }
      }
      return issues;
    }
  },
  {
    id: 'modalverb-position',
    name: 'Позиција на модалните глаголи',
    description: 'Модалните глаголи имаат специфична позиција',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const modals = ['kann', 'kannst', 'kann', 'können', 'könnt', 'muss', 'musst', 'müssen', 'müsst', 'will', 'willst', 'wollen', 'wollt', 'soll', 'sollst', 'sollen', 'sollt', 'darf', 'darfst', 'dürfen', 'dürft'];
      const words = sentence.toLowerCase().split(/\s+/);
      const modalIndex = words.findIndex(w => modals.includes(w));
      
      if (modalIndex > -1 && modalIndex < words.length - 2) {
        const nextWord = words[modalIndex + 1];
        if (!nextWord.endsWith('en') && !nextWord.endsWith('t') && !nextWord.endsWith('st')) {
          issues.push({
            type: 'warning',
            message: 'Провери го редоследот: Modalverb + глагол',
            position: { start: 0, end: sentence.length },
            rule: 'Modalverb-Position'
          });
        }
      }
      return issues;
    }
  },
  {
    id: 'reflexive-verbs',
    name: 'Рефлексивни глаголи',
    description: 'Проверува дали рефлексивното место е правилно',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      const reflexiveVerbs = ['sich freuen', 'sich erinnern', 'sich interessieren', 'sich entscheiden', 'sich bewerben', 'sich beschweren', 'sich verlieben'];
      
      for (const verb of reflexiveVerbs) {
        if (sentence.toLowerCase().includes(verb)) {
          const parts = verb.split(' ');
          if (!sentence.toLowerCase().includes(parts[0])) {
            const match = sentence.toLowerCase().match(new RegExp(parts[1], 'i'));
            if (match && match.index !== undefined) {
              const before = sentence.substring(Math.max(0, match.index - 5), match.index);
              if (!before.includes('sich')) {
                issues.push({
                  type: 'error',
                  message: `Глаголот "${parts[1]}" е рефлексивен - треба "sich" пред него`,
                  position: { start: match.index, end: match.index + parts[1].length },
                  suggestion: 'sich ' + parts[1],
                  rule: 'Reflexive Verben'
                });
              }
            }
          }
        }
      }
      return issues;
    }
  },
  {
    id: 'konjunktiv',
    name: 'Konjunktiv II (Conditional)',
    description: 'Проверува употреба на Konjunktiv II',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      
      const würdePatterns = [
        { wrong: /ich würde\s+\w+en\b/i, suggestion: 'Konjunktiv II форма' },
      ];
      
      if (sentence.toLowerCase().includes('würde') && sentence.toLowerCase().includes('wenn')) {
        const hasExtra = sentence.match(/wenn\s+ich\s+würde/i);
        if (hasExtra) {
          issues.push({
            type: 'warning',
            message: 'Ако има "wenn", не треба "würde" (или обратно)',
            position: { start: hasExtra.index || 0, end: (hasExtra.index || 0) + hasExtra[0].length },
            suggestion: 'Entweder "wenn" ODER "würde", nicht beides',
            rule: 'Konjunktiv II'
          });
        }
      }
      return issues;
    }
  },
  {
    id: 'passiv',
    name: 'Passiv (Страдателен залог)',
    description: 'Проверува формирање на Passiv',
    check: (sentence) => {
      const issues: GrammarIssue[] = [];
      
      const passivePatterns = [
        { pattern: /wird\s+(\w+en)\b/i, correct: 'worden' },
        { pattern: /wurden\s+(\w+t)\b/i, correct: 'te' },
      ];
      
      for (const { pattern, correct } of passivePatterns) {
        const match = sentence.match(pattern);
        if (match && match[1] !== correct.toLowerCase()) {
          issues.push({
            type: 'error',
            message: 'Грешка во Passiv формирањето',
            position: { start: match.index || 0, end: (match.index || 0) + match[0].length },
            suggestion: correct,
            rule: 'Passiv'
          });
        }
      }
      return issues;
    }
  }
];

export function checkGrammar(sentence: string): GrammarIssue[] {
  if (!sentence || sentence.trim().length < 3) return [];
  
  let allIssues: GrammarIssue[] = [];
  
  for (const rule of grammarRules) {
    const issues = rule.check(sentence);
    allIssues = [...allIssues, ...issues];
  }
  
  return allIssues;
}

export function getGrammarSuggestions(sentence: string): string {
  const issues = checkGrammar(sentence);
  
  if (issues.length === 0) {
    return 'Граматички изгледа добро! ✅';
  }
  
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');
  
  let result = '';
  if (errors.length > 0) {
    result += `❌ Грешки (${errors.length}):\n`;
    errors.forEach(e => {
      result += `• ${e.message}`;
      if (e.suggestion) result += ` → Предлог: ${e.suggestion}`;
      result += '\n';
    });
  }
  if (warnings.length > 0) {
    result += `\n⚠️ Предупредувања (${warnings.length}):\n`;
    warnings.forEach(w => {
      result += `• ${w.message}`;
      if (w.suggestion) result += ` → Предлог: ${w.suggestion}`;
      result += '\n';
    });
  }
  
  return result;
}
