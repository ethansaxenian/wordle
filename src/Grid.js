import Square from "./Square";
import { range } from "./utils";

export default function Grid({ attempts, completedRows, word}) {
	return (
		<span>
			{range(0, 6).map((i) => (
				<span style={{display: 'flex'}} key={`row-${i}`}>
					{range(0, 5).map((j) => {
						const val = attempts[i].word[j];
						let color = "gray";
						if (val) {
							if (word.includes(val)) {
								color = "#E3BF00";
							}
							if (word[j] === val) {
								color = "green";
							}
						}
						return (
							<span key={`col-${j}`} style={{padding: 5}}>
								<Square val={val} complete={i < completedRows} color={color}/>
							</span>
						)
					})}
				</span>
			))}
		</span>
	)
}
