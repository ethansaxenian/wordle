import { useState, useEffect } from "react";
import Grid from "./Grid";
import { addLetter, ALPHABET, deleteLetter, sample } from "./utils";

export default function App() {
	const [allWords, setAllWords] = useState();
	const [word, setWord] = useState("");
	const [row, setRow] = useState(0);
	const [r0, setR0] = useState([]);
	const [r1, setR1] = useState([]);
	const [r2, setR2] = useState([]);
	const [r3, setR3] = useState([]);
	const [r4, setR4] = useState([]);
	const [r5, setR5] = useState([]);
	const [completedRows, setCompletedRows] = useState(0);
	const [win, setWin] = useState(false);

	useEffect(() => {
		const getWord = async () => {
			const response = await fetch("https://random-word-api.herokuapp.com/all");
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const fetchedWords = await response.json();
			const fiveLetterWords = fetchedWords.filter((word) => word.length === 5);
			setAllWords(new Set(fiveLetterWords));
			const randomWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
			setWord(randomWord);
		}
		getWord();
	}, []);

	useEffect(() => {
		if (completedRows > 0 && completedRows < 6) {
			setRow(row + 1);
		}
		if (word) {
			[r0, r1, r2, r3, r4, r5].forEach((w) => {
				if (w.join("") === word) {
					setWin(true);
				}
			});
		}
	}, [completedRows]);

	useEffect(() => {
		setRow(0);
		setCompletedRows(0);
		[setR0, setR1, setR2, setR3, setR4, setR5].forEach((fn) => { fn([]) });
		setWin(false);
	}, [word]);

	const attempts = {
		0: { word: r0, fn: setR0 },
		1: { word: r1, fn: setR1 },
		2: { word: r2, fn: setR2 },
		3: { word: r3, fn: setR3 },
		4: { word: r4, fn: setR4 },
		5: { word: r5, fn: setR5 }
	}

	const [currAttempt, setCurrAttempt] = [attempts[row].word, attempts[row].fn];

	const handleKeyDown = (e) => {
		if (!win && completedRows < 6) {
			const key = e.key.toLowerCase();
			if (ALPHABET.includes(key)) {
				if (currAttempt.length < 5) {
					setCurrAttempt(addLetter(currAttempt, key));
				}
			} else if (key === "backspace") {
				if (currAttempt.length > 0) {
					setCurrAttempt(deleteLetter(currAttempt));
				}
			} else if (key === "enter") {
				if (currAttempt.length === 5) {
					setCompletedRows(completedRows + 1);
				}
			}
		}
	}

	const getNewWord = () => {
		const newWord = sample(Array.from(allWords));
		setWord(newWord);
	}

  return (
    <div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				width: "100%",
				height: "100vh"
			}}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<h1 style={{paddingBottom: 50, paddingTop: 25}}>WORDLE</h1>
			<Grid handleKeyDown={handleKeyDown} attempts={attempts} completedRows={completedRows} word={word}/>
			{win && (
				<>
					<h1>YOU WIN!!!! - the word was {word}</h1>
					<button onClick={getNewWord}>Get new word</button>
				</>
			)}
			{!win && completedRows === 6 && (
				<>
					<h1>YOU LOSE - the word was {word}</h1>
					<button onClick={getNewWord}>Get new word</button>
				</>
			)}
    </div>
  );
}
