import { fetchRandomHulkStory, MarvelStory } from "../services/marvel.service";

export function createMarvelAPI() {
  async function fetchRandomStory(): Promise<MarvelStory> {
    const marvelStory = await fetchRandomHulkStory();

    return marvelStory;
  }

  return {
    fetchRandomStory,
  };
}
