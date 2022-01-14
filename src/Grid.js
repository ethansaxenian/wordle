import Square from "./Square";
import { range } from "./utils";

export default function Grid({ attempts, completedRows }) {
	console.log(completedRows)
	return (
		<span>
			{range(0, 6).map((i) => (
				<span style={{display: 'flex'}} key={`row-${i}`}>
					{range(0, 5).map((j) => (
						<span key={`col-${j}`} style={{padding: 5}}>
							<Square val={attempts[i].word[j]} complete={i < completedRows}/>
						</span>
					))}
				</span>
			))}
		</span>
	)
}
