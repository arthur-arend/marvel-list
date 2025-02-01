import axios from "axios";
import md5 from "md5";

export interface MarvelStory {
  storyId: number;
  storyTitle: string;
  storyDescription: string;
  characters: { id: number; name: string; description: string }[];
  marvelAttribution: string;
}

export async function fetchRandomHulkStory(): Promise<MarvelStory> {
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const hulkID = import.meta.env.VITE_HULK_ID;

  const timeStamp = new Date().getTime();
  const hash = md5(timeStamp + privateKey + publicKey);

  const totalUrl = `${baseUrl}/characters/${hulkID}/stories?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=1`;
  const totalRes = await axios.get(totalUrl);
  const totalStories = totalRes.data?.data?.total || 0;
  if (totalStories === 0) {
    throw new Error("No Hulk stories found.");
  }

  const randomOffset = Math.floor(Math.random() * totalStories);

  const randomStoryUrl = `${baseUrl}/characters/${hulkID}/stories?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=1&offset=${randomOffset}`;
  const randomStoryRes = await axios.get(randomStoryUrl);
  const randomStory = randomStoryRes.data?.data?.results?.[0];
  if (!randomStory) {
    throw new Error("Could not fetch a random story");
  }

  const storyId = randomStory.id;
  const storyTitle = randomStory.title;
  const storyDescription =
    randomStory.description || "No description available.";

  const marvelAttribution =
    randomStoryRes.data?.attributionText ||
    "Data provided by Marvel. © 2025 MARVEL";

  const charUrl = `${baseUrl}/stories/${storyId}/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
  const charRes = await axios.get(charUrl);
  const characters = charRes.data?.data?.results || [];

  return {
    storyId,
    storyTitle,
    storyDescription,
    characters,
    marvelAttribution,
  };
}
