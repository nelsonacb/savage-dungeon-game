import { PlayerEntity } from '@/shared/types/game';
import { create } from 'zustand';

interface GameState {
  player: PlayerEntity | null;
  setPlayer: (player: PlayerEntity) => void;
  isDialogueActive: boolean;
  currentDialogue: string[];
  startDialogue: (lines: string[]) => void;
  endDialogue: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
  isDialogueActive: false,
  currentDialogue: [],
  startDialogue: (lines) =>
    set({ isDialogueActive: true, currentDialogue: lines }),
  endDialogue: () => set({ isDialogueActive: false, currentDialogue: [] }),
}));
