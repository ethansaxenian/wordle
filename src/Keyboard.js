import Key from "./Key"

export default function Keyboard({ handleKeyDown, history, word }) {
	const keyboard = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]
	]

	return (
		<div>
			{keyboard.map((row) => (
				<div style={{display: "flex", width: "fit-content", margin: "auto"}} key={row.join("")}>
					{row.map((l) => (
						<Key
							key={l}
							val={l.toLowerCase()}
							inWord={word.split("").includes(l.toLowerCase())}
							inHistory={history.includes(l.toLowerCase())}
							handleKeyDown={handleKeyDown}
						/>
					))}
				</div>
			))}
		</div>
	)
}
