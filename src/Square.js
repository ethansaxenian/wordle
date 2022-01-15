export default function Square({ val, isLocked, isMisplaced, isCorrect }) {
	let color = "gray";
	if (val) {
		if (isMisplaced) {
			color = "#E3BF00";
		}
		if (isCorrect) {
			color = "green";
		}
	}

	return (
		<span style={{padding: 5}}>
			<span
				style={{
					border: `${isLocked ? 0 : 2}px solid ${val !== undefined ? 'black' : 'lightgray'}`,
					width: 62,
					height: 62,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: 40,
					backgroundColor: isLocked ? color : "white",
					color: isLocked ? "white" : "black",
					fontWeight: "bolder"
				}}
			>
				{val ? val.toUpperCase() : val}
			</span>
		</span>
	)
}
