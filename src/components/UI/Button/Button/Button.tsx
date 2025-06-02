import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  label: string;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  icon,
  label,
  ...rest
}) => {
  return (
    <button className={styles[className]} {...rest}>
      {children && <span>{children}</span>}
      {icon && (
        <img className={styles.img} src={`icons/${icon}.svg`} alt={label} />
      )}
    </button>
  );
};
