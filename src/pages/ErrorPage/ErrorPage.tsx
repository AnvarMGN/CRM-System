import styles from "./ErrorPage.module.scss";
import { Typography } from "antd";
const { Title, Text } = Typography;

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <Title>An error occurred!</Title>
      <Text>Could not find this page!</Text>
    </div>
  );
};
