import { Tabs } from "antd";
import type { FilterStatus, TodoInfo } from "../../../types/types";
import "@ant-design/v5-patch-for-react-19";
import styles from "./TaskFilterAntd.module.scss";
// import { useEffect } from "react";

interface TaskFilterAntd {
  currentStatus: FilterStatus;
  changeStatus: (status: FilterStatus) => void;
  countTask: TodoInfo;
}

type ConstFilterTypes = {
  value: "all" | "inWork" | "completed";
  label: string;
};

export const TaskFilterAntd: React.FC<TaskFilterAntd> = ({
  currentStatus,
  changeStatus,
  countTask,
}) => {
  const constFilter: ConstFilterTypes[] = [
    { value: "all", label: "Все" },
    { value: "inWork", label: "в работе" },
    { value: "completed", label: "сделано" },
  ];

  // useEffect(() => {
  //   console.log("Компонент фильров.");
  // }, []);

  const items = constFilter.map((filter) => ({
    label: `${filter.label} (${countTask[filter.value]})`,
    key: filter.value,
  }));

  return (
    <>
      <Tabs
        className={`${styles.tabs}`}
        items={items}
        activeKey={currentStatus}
        onChange={(activeKey) => changeStatus(activeKey as FilterStatus)}
        centered
        size="large"
      />
    </>
  );
};
