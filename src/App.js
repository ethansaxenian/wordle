import React, { useState, useEffect, Fragment } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
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
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const getWord = async () => {
			const response = await fetch("https://random-word-api.herokuapp.com/all");
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const fetchedWords = await response.json();
			const fiveLetterWords = fetchedWords.filter((word) => word.length === 5);
			setAllWords(new Set(fiveLetterWords));
			setWord(sample(fiveLetterWords));
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
		if (completedRows === -1) {
			setCompletedRows(0);
			setWord(sample(Array.from(allWords)));
		}
	}, [completedRows]);

	useEffect(() => {
		setRow(0);
		[setR0, setR1, setR2, setR3, setR4, setR5].forEach((fn) => { fn([]) });
		setWin(false);
		setHistory([]);
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

	const handleKeyDown = (key) => {
		if (!win && completedRows < 6) {
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
					if (allWords.has(currAttempt.join(""))) {
						setCompletedRows(completedRows + 1);
						setHistory([...history, ...currAttempt]);
					}
				}
			}
		}
	}

  return (
		<div
			style={{width: "100%", height: "100%"}}
			onKeyDown={(e) => handleKeyDown(e.key.toLowerCase())}
			tabIndex={0}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					width: "max-content",
					margin: "auto",
					height: "100%",
					overflow: "scroll"
				}}
			>
				<h1>WORDLE</h1>
				{win && (
					<button onClick={() => setCompletedRows(-1)} style={{marginBottom: 10}}>Get new word</button>
				)}
				{(!win && completedRows < 6) && (
					<button style={{marginBottom: 10}} onClick={() => setCompletedRows(6)}>Give Up</button>
				)}
				{!win && completedRows === 6 && (
					<>
						<p>the word was <span style={{color: "red"}}>{word}</span></p>
						<button style={{margin: 10}} onClick={() => setCompletedRows(-1)}>Get new word</button>
					</>
				)}
				<Grid attempts={attempts} completedRows={completedRows} word={word}/>
				<span style={{padding: 15}}>
					<Keyboard handleKeyDown={handleKeyDown} history={history} word={word}/>
				</span>
			</div>
		</div>
  );
}
