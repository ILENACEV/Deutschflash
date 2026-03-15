"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { VocabularyWord, CustomDeck } from '@/lib/types';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit2, 
  Layers,
  BookOpen,
  X,
  Check,
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DECK_COLORS = [
  { name: 'Зелен', value: '#139443', bg: 'bg-green-500' },
  { name: 'Плав', value: '#3b82f6', bg: 'bg-blue-500' },
  { name: 'Црвен', value: '#ef4444', bg: 'bg-red-500' },
  { name: 'Жолт', value: '#eab308', bg: 'bg-yellow-500' },
  { name: 'Лилов', value: '#8b5cf6', bg: 'bg-purple-500' },
  { name: 'Розов', value: '#ec4899', bg: 'bg-pink-500' },
  { name: 'Оранџев', value: '#f97316', bg: 'bg-orange-500' },
  { name: 'Циан', value: '#06b6d4', bg: 'bg-cyan-500' },
];

export default function CustomDecksPage() {
  const { toast } = useToast();
  const [decks, setDecks] = useState<CustomDeck[]>([]);
  const [vocab, setVocab] = useState<VocabularyWord[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [selectedColor, setSelectedColor] = useState(DECK_COLORS[0]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const loadData = async () => {
    const [loadedDecks, loadedVocab] = await Promise.all([
      storage.getCustomDecks(),
      storage.getVocabulary()
    ]);
    setDecks(loadedDecks);
    setVocab(loadedVocab);
  };

  const handleCreateDeck = async () => {
    if (!newDeckName.trim()) return;

    const newDeck: CustomDeck = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDeckName,
      description: newDeckDesc,
      wordIds: selectedWords,
      color: selectedColor.value,
      createdAt: Date.now()
    };

    const updatedDecks = [...decks, newDeck];
    await storage.saveCustomDecks(updatedDecks);
    await loadData();

    setShowCreate(false);
    setNewDeckName('');
    setNewDeckDesc('');
    setSelectedWords([]);
    setSelectedColor(DECK_COLORS[0]);

    toast({
      title: "Шпилот е создаден!",
      description: ` "${newDeckName}" содржи ${selectedWords.length} зборови.`
    });
  };

  const handleDeleteDeck = async (deckId: string) => {
    if (!confirm('Дали сакаш да го избришеш овој шпил?')) return;

    const updatedDecks = decks.filter(d => d.id !== deckId);
    await storage.saveCustomDecks(updatedDecks);
    await loadData();

    toast({
      title: "Шпилот е избришан",
      description: "Шпилот е успешно отстранет."
    });
  };

  const toggleWordSelection = (wordId: string) => {
    setSelectedWords(prev => 
      prev.includes(wordId) 
        ? prev.filter(id => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleStudyDeck = (deck: CustomDeck) => {
    // Филтрирај зборови кои се во шпилот
    const deckWords = vocab.filter(w => deck.wordIds.includes(w.id));
    // тука може да го пратиш кон session со само тие зборови
    // засега само го прикажуваме
    alert(`Започнуваш учење на шпилот "${deck.name}" со ${deckWords.length} зборови!`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col pb-20">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Мои Шпилови
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Прилагодени колекции</p>
        </div>
        <Button 
          onClick={() => setShowCreate(true)}
          className="rounded-full h-10 w-10 p-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {/* Create New Deck Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Нов Шпил</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreate(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold mb-2 block">Име на шпилот</label>
                <Input 
                  placeholder="пр. Германски за патување"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-2 block">Опис</label>
                <Input 
                  placeholder="пр. Зборови за аеродром и хотел"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-2 block">Боја</label>
                <div className="flex gap-2 flex-wrap">
                  {DECK_COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full ${color.bg} ${
                        selectedColor.value === color.value 
                          ? 'ring-4 ring-offset-2 ring-gray-400' 
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold mb-2 block">
                  Избери зборови ({selectedWords.length} избрани)
                </label>
                <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
                  {vocab.map(word => (
                    <div 
                      key={word.id}
                      onClick={() => toggleWordSelection(word.id)}
                      className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        selectedWords.includes(word.id)
                          ? 'bg-primary/10 border border-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm">{word.word}</div>
                        <div className="text-xs text-muted-foreground">{word.translation}</div>
                      </div>
                      {selectedWords.includes(word.id) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateDeck} className="w-full">
                Создади Шпил
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Decks List */}
      <div className="space-y-4">
        {decks.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2">
            <Layers className="w-12 h-12 mx-auto text-muted mb-4" />
            <h3 className="font-bold mb-2">Немаш создадено шпилови</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Креирај сопствена колекција од зборови за специфична тема.
            </p>
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Создади Прв Шпил
            </Button>
          </Card>
        ) : (
          decks.map(deck => {
            const deckColor = DECK_COLORS.find(c => c.value === deck.color) || DECK_COLORS[0];
            return (
              <Card 
                key={deck.id} 
                className="p-4 border-none shadow-md overflow-hidden"
              >
                <div 
                  className="h-2 -mx-4 -mt-4 mb-4"
                  style={{ backgroundColor: deck.color }}
                />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{deck.name}</h3>
                    <p className="text-xs text-muted-foreground">{deck.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {deck.wordIds.length} зборови
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleStudyDeck(deck)}
                    >
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteDeck(deck.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
