import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import analytics from "./analytics";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import { addLetter, ALPHABET, deleteLetter, sample, showToast } from "./utils";
import words from "./words.json";

export default function App() {
	const [allWords] = useState(new Set(words));
	const [word, setWord] = useState(sample(Array.from(words)));
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
		analytics();
	}, []);

	useEffect(() => {
		if (completedRows > 0 && completedRows < 6) {
			setRow(row + 1);
		} else if (completedRows === -1) {
			setWord(sample(Array.from(allWords)));
		} else if (completedRows === 6 && !win) {
			showToast(<span>The word was <span style={{color: "red"}}>{word}</span></span>);
		}
	}, [completedRows]);

	useEffect(() => {
		setCompletedRows(0);
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
			} else if (key === "backspace" || key === "delete") {
				if (currAttempt.length > 0) {
					setCurrAttempt(deleteLetter(currAttempt));
				}
			} else if (key === "enter") {
				if (currAttempt.length === 5) {
					if (allWords.has(currAttempt.join(""))) {
						setHistory([...history, ...currAttempt]);
						setCompletedRows(completedRows + 1);
						if (currAttempt.join("") === word) {
							setWin(true);
						}
					} else {
						showToast("Not a valid 5-letter word!", "error");
					}
				} else {
					showToast("Not enough letters!", "error");
				}
			}
		}
	}

  return (
		<div
			style={{width: "100%", height: "100%"}}
			onKeyDown={(e) => {
				e.preventDefault();
				handleKeyDown(e.key.toLowerCase());
			}}
			tabIndex={0}
		>
			<ToastContainer/>
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
				{word !== "" && (
					<button style={{marginBottom: 10}} onClick={() => setCompletedRows((!win && completedRows < 6) ? 6 : -1)}>
						{(!win && completedRows < 6) ? "Give Up" : "Get new Word"}
					</button>
				)}
				<Grid attempts={attempts} completedRows={completedRows} word={word}/>
				<span style={{padding: 15}}>
					<Keyboard handleKeyDown={handleKeyDown} history={history} word={word}/>
				</span>
			</div>
		</div>
  );
}
