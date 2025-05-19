import styles from "./IconButton.module.scss";

interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  icon?: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

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
