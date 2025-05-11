export const Button = ({ children, icon, label, ...rest }) => {
  return (
    <button {...rest}>
      {children}
      <img className="imagesvg" src={`icons/${icon}.svg`} alt={label} />
    </button>
  );
};
