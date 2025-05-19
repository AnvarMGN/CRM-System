import type { ButtonProps } from "../../../../types/todo";
import styles from "./IconButton.module.scss";

export const IconButton: React.FC<ButtonProps> = ({
  className,
  icon,
  label,
  ...rest
}) => {
  return (
    <button className={`${styles[className]}`} {...rest}>
      <img className={`${styles.img}`} src={`icons/${icon}.svg`} alt={label} />
    </button>
  );
};
