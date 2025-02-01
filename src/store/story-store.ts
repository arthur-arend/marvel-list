import { create } from "zustand";

interface StoryState {
  storyId: number | null;
  setStoryId: (id: number) => void;
  storyTitle: string;
  setStoryTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  characters: any[];
  setCharacters: (characters: any[]) => void;
  attribution: string;
  setAttribution: (attribution: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  storyId: null,
  storyTitle: "",
  description: "",
  characters: [],
  attribution: "",
  loading: false,
  error: "",

  setStoryId: (id) => set({ storyId: id }),
  setStoryTitle: (title) => set({ storyTitle: title }),
  setDescription: (description) => set({ description }),
  setCharacters: (characters) => set({ characters }),
  setAttribution: (attribution) => set({ attribution }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
