const createRecord = (i) => i ? 'Move #' + i : 'Game start'
const Move = ({i,jumpTo}) => (
	<li className="moves__item" key={i}>
		<a href="#" className="moves__link" onClick={() => jumpTo(i)}>{createRecord(i)}</a>
	</li> 
)
export default Move