import { Tabs } from "antd";
import type { TodoInfo } from "../../../types/types";
import "@ant-design/v5-patch-for-react-19";

interface TaskFilterAntd {
  currentStatus: string;
  changeStatus: (status: string) => void;
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

  const items = constFilter.map((filter) => ({
    label: `${filter.label} (${countTask[filter.value]})`,
    key: filter.value,
  }));

  return (
    <>
      <Tabs
        items={items}
        activeKey={currentStatus}
        onChange={changeStatus}
        centered
        size="large"
      />
    </>
  );
};
