import styles from './ErrorPage.module.scss'

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>An error occurred!</h1>
      <p>Could not find this page!</p>
    </div>
  );
};
