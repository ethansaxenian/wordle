import Square from "./Square";
import { range } from "./utils";

export default function Grid({ attempts, completedRows, word}) {
	return (
		<span>
			{range(0, 6).map((i) => {
				const leftovers = word.split("").filter((c, j) => c !== attempts[i].word[j]);

				return (
					<span style={{display: 'flex'}} key={`row-${i}`}>
						{range(0, 5).map((j) => (
							<Square
								key={`col-${j}`}
								val={attempts[i].word[j]}
								isLocked={i < completedRows}
								isMisplaced={word.includes(attempts[i].word[j]) && leftovers.includes(attempts[i].word[j])}
								isCorrect={word[j] === attempts[i].word[j]}
							/>
						))}
					</span>
				);
			})}
		</span>
	)
}
