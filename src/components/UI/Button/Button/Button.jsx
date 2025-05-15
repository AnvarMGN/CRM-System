import styles from "./Button.module.scss";

export const Button = ({ children, icon, label, ...rest }) => {
  return (
    <button className={`${styles.primary}`} {...rest}>
      {children && <span>{children}</span>}
      {icon && (
        <img
          className={`${styles.img}`}
          src={`icons/${icon}.svg`}
          alt={label}
        />
      )}
    </button>
  );
};
