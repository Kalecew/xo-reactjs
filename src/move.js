const createRecord = (i) => i ? 'Move #' + i : 'Game start'
const Move = ({i,jumpTo}) => (
	<li key={i}>
		<a href="#" onClick={() => jumpTo(i)}>{createRecord(i)}</a>
	</li> 
)
export default Move