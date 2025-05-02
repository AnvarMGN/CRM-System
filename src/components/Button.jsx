
export const Button = ({ children, icon, label, ...rest}) => {
  
  return (
    <button {...rest}>
        {children}
        <img src={`icons/${icon}.svg`} alt={label} />
    </button>
  )
}