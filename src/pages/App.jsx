import { TaskListPage } from "./TaskListPage";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={`${styles.container}`}>
      <TaskListPage />
    </div>
  );
}

export default App;
