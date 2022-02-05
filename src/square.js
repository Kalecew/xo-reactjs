const Square = ({value, click}) => (
  <button className={
      value === '✘'?
        'square square--x-blur' : 
        value === '𝓞'?
          'square square--o-blur' :
          'square'
    }  
    onClick={() => click()}
  >
    {value}
  </button>
)

export default Square