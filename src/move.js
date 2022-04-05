const createRecord = (i) => {
	const currentPlayer = i%2 !== 0 ? '✘' : '𝓞'
	return i ? `Move #${i} - ${currentPlayer}` : 'Game start'
}
const Move = ({i,jumpTo,currentStep}) => (
	<li className="moves__item"	key={i}>
		<a href="#" className={ i === currentStep ? 
		"moves__link moves__link--active" :
		"moves__link" 
		} 
		onClick={(e) => jumpTo(i,e)}>{createRecord(i)}</a>
	</li> 
)
export default Move