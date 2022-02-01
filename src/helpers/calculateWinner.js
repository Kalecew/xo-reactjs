const calculateWinner = (squares) => {
	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,5,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]
	let result = null
	lines.map((item) => {
		const [a,b,c] = item
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			result = squares[a]
		}			
	})
	return result

	// lines.map((item) => {
	// 	const [a,b,c] = item
	// 	if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
	// 		return squares[a]
	// })
	// return null
}
export default calculateWinner