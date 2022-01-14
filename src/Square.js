export default function Square({ val, complete }) {

	return (
		<span
			style={{
				border: `2px solid ${val !== undefined ? 'black' : 'lightgray'}`,
				width: 62,
				height: 62,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 40,
				backgroundColor: complete ? "red" : "white"
			}}
		>
			{val}
		</span>
	)
}
