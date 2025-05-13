import styles from "./IconButton.module.scss";

export const IconButton = ({ children, icon, label, ...rest }) => {
  return (
    <button
      className={`${icon === "trash" || icon ==="cancel" ? styles["removal"] : styles["edit"]}`}
      {...rest}
    >
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
