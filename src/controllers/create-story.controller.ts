import { createMarvelAPI } from "../factory/create-marvel.factory";
import { useStoryStore } from "../store/story-store";

interface StoryController {
  getRandomStory: () => Promise<void>;
}

export function createStoryController(): StoryController {
  const marvelAPI = createMarvelAPI();

  async function getRandomStory() {
    const store = useStoryStore.getState();
    try {
      store.setLoading(true);
      store.setError("");

      const {
        storyId,
        storyTitle,
        storyDescription,
        characters,
        marvelAttribution,
      } = await marvelAPI.fetchRandomStory();

      // update zustand store
      store.setStoryId(storyId);
      store.setStoryTitle(storyTitle);
      store.setDescription(storyDescription);
      store.setCharacters(characters);
      store.setAttribution(marvelAttribution);
    } catch (err: any) {
      store.setError(err.message || "Error fetching story");
    } finally {
      store.setLoading(false);
    }
  }

  return {
    getRandomStory,
  };
}
