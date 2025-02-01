import "./App.scss";
import { createStoryController } from "./controllers/create-story.controller";
import { useStoryStore } from "./store/story-store";

function App() {
  const {
    storyId,
    storyTitle,
    description,
    characters,
    attribution,
    loading,
    error,
  } = useStoryStore();

  const hulkStoryController = createStoryController();

  async function handleRandomStoryClick() {
    await hulkStoryController.getRandomStory();
  }

  return (
    <div className="container">
      <div className="container__header">
        <h1>Hulk Stories</h1>

        <button
          className="container__fetch-button"
          onClick={handleRandomStoryClick}
        >
          Get Random Story
        </button>
      </div>

      {loading && (
        <div className="overlay">
          <div className="spinner" />
        </div>
      )}

      {error && <p className="container__error-message">{error}</p>}

      {storyId && (
        <div className="container__story">
          <h2 className="container__story-title">
            <strong>Title: </strong>
            {storyTitle}
          </h2>
          <p className="container____story-description">
            <strong>Description:</strong> {description}
          </p>

          <h3 className="container__characters-heading">Characters</h3>
          {characters.length === 0 && <p>No characters found.</p>}
          <ul className="container__characters-list">
            {characters.map((char) => (
              <li key={char.id} className="container__characters-list--item">
                <strong>{char.name}</strong>
                {char.thumbnail && (
                  <div>
                    <img
                      src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                      alt={char.name}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />
      {attribution && (
        <p>
          <em>{attribution}</em>
        </p>
      )}
    </div>
  );
}

export default App;
