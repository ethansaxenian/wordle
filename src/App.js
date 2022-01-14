import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
	const [word, setWord] = useState("");

	useEffect(() => {
		const getWord = async () => {
			const response = await fetch("https://random-word-api.herokuapp.com/all");
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const allWords = await response.json();
			const fiveLetterWords = allWords.filter((word) => word.length === 5);
			const randomWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
			setWord(randomWord);
		}
		getWord();
	}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          the word is {word}
        </p>
      </header>
    </div>
  );
}

export default App;
