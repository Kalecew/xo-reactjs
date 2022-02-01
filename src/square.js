const Square = ({value, click}) => (
  <button className="square"  onClick={() => click()}>
    {value}
  </button>
)

export default Square