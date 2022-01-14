export default function Square({ val, complete, color }) {

	return (
		<span
			style={{
				border: `${complete ? 0 : 2}px solid ${val !== undefined ? 'black' : 'lightgray'}`,
				width: 62,
				height: 62,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 40,
				backgroundColor: complete ? color : "white"
			}}
		>
			{val}
		</span>
	)
}
