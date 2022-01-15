export default function Key({ val, inWord, inHistory, handleKeyDown }) {
	return (
		<span
			style={{
				width: val.length === 1 ? "min(43px, 5vw)" : "fit-content",
				height: 58,
				padding: 15,
				backgroundColor: (inWord && inHistory) ? "green" : (inHistory ? "gray" : "lightgray"),
				color: (inWord && inHistory) ? "white" : (inHistory ? "white" : "black"),
				borderRadius: 4,
				fontWeight: "bold",
				margin: 3,
				cursor: "pointer",
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
			onClick={() => handleKeyDown(val)}
		>
			{val.toUpperCase()}
		</span>
	)
}
