import axios from "axios";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../notifications/notifications";
import type { Roles, User } from "../../../types/users";
import {
  blockUser,
  deleteUser,
  editRightsUser,
  unblockUser,
} from "../../../api/apiUsers";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { updateTokenAction } from "../../../store/auth-actions";
import { getUsersAction, usersActions } from "../../../store/users-slice";
import {
  CheckOutlined,
  CloseOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type GetProp,
  type GetProps,
  type PaginationProps,
  type TableColumnsType,
  // type TableProps,
} from "antd";
// import type { SorterResult } from "antd/es/table/interface";

const { Text } = Typography;

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const plainOptions = ["ADMIN", "MODERATOR", "USER"];

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const deletetUserErrorStatus = (status: number) => {
  switch (status) {
    case 400:
      return "Произошла ошибка при обработке данных. Попробуйте ещё раз.";
    case 401:
      return "Проверьте введенные данные или авторизирутесь снова.";
    case 403:
      return "Отсутствуют права доступа.";
    case 404:
      return "Пользователь не найден.";
    case 500:
      return "Внутренняя ошибка сервера. Попробуйте позже.";
    default:
      return "Что-то пошло не так.";
  }
};

const editRightsUserErrorStatus = (status: number) => {
  switch (status) {
    case 400:
      return "Такого поля нет, попробуйте ещё раз.";
    case 404:
      return "Пользователь не найден.";
    case 500:
      return "Внутренняя ошибка сервера. Попробуйте позже.";
    default:
      return "Что-то пошло не так.";
  }
};

export const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, meta, filters, loading, error } = useAppSelector(
    (state) => state.users
  );
  const { roles } = useAppSelector((state) => state.auth.user);
  const [isModalOpenDelete, setIsModalDelete] = useState(false);
  const [isModalOpenRole, setIsModalRole] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState(false);
  const [checkedList, setCheckedList] = useState<Roles[]>([]);
  const [selectValue, setValue] = useState<boolean | undefined>(undefined);

  const dataSource = data.users?.map((user) => ({ ...user, key: user.id }));

  const handleUpdateError = (notificatonDescription: string, error: Error) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
  };

  const handleGoToProfile = (userId: number) => {
    navigate(`/admin/user/${userId}`, { replace: true });
  };

  const showModalDelete = (userId: number) => {
    setIsModalDelete(true);
    setId(userId);
  };

  const handleDeleteUserOk = async () => {
    setIsModalDelete(false);
    const deleteUserFunction = async (userId: number) => {
      try {
        const response = await deleteUser(userId);
        if (response.status === 200) {
          openNotification("Уведомление", "Пользователь успешно удалён.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const status = error.response.status;
            openNotification("Ошибка", deletetUserErrorStatus(status));
          }
        }
      }
    };

    if (!id) {
      console.log("Id отсутствует.");
      return;
    }

    try {
      await dispatch(updateTokenAction());
      await deleteUserFunction(id);
      await dispatch(getUsersAction(filters));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorStatusLabels = {
          400: "Произошла ошибка при обработке данных.",
          401: "Проверьте введенные данные или войдите снова.",
          500: "Внутренняя ошибка сервера.",
        };
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 401:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 500:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            default:
              handleUpdateError("Неизвестная ошибка", error);
              break;
          }
        } else if (error.request) {
          handleUpdateError("Сервер не доступен.", error);
        } else {
          handleUpdateError("Неизвестная ошибка.", error);
        }
      } else {
        handleUpdateError("Неизвестная ошибка.", error as Error);
      }
    } finally {
      setId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
    setId(null);
  };

  const handleUserNameSort = () => {
    setOrderStatus(!orderStatus);
    dispatch(usersActions.sortByColumnValue("username"));
    dispatch(usersActions.sortByOrderValue(orderStatus ? "desc" : "asc"));
  };

  const handleEmailSort = () => {
    setOrderStatus(!orderStatus);
    dispatch(usersActions.sortByColumnValue("email"));
    dispatch(usersActions.sortByOrderValue(orderStatus ? "desc" : "asc"));
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    dispatch(usersActions.sortByColumnValue("id"));
    dispatch(usersActions.sortByOrderValue("asc"));
    dispatch(usersActions.searchByInputValue(value));
  };

  const handleChangePagination: PaginationProps["onChange"] = (
    page,
    pageSize
  ) => {
    dispatch(usersActions.changeLimitValue(pageSize));
    dispatch(usersActions.changeOffsetValue(page - 1));
  };

  const handleBlock = async (userId: number) => {
    try {
      await blockUser(userId);
      await dispatch(getUsersAction(filters));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          openNotification("Ошибка", deletetUserErrorStatus(status));
        } else if (error.request) {
          handleUpdateError("Сервер не доступен.", error);
        } else {
          handleUpdateError("Неизвестная ошибка.", error);
        }
      } else {
        handleUpdateError("Неизвестная ошибка.", error as Error);
      }
    }
  };

  const handleUnblock = async (userId: number) => {
    try {
      await unblockUser(userId);
      await dispatch(getUsersAction(filters));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          openNotification("Ошибка", deletetUserErrorStatus(status));
        } else if (error.request) {
          handleUpdateError("Сервер не доступен.", error);
        } else {
          handleUpdateError("Неизвестная ошибка.", error);
        }
      } else {
        handleUpdateError("Неизвестная ошибка.", error as Error);
      }
    }
  };

  const showModalRole = (userData: User) => {
    setId(userData.id);
    setCheckedList(userData.roles);
    setIsModalRole(true);
  };

  const handleChangeRoleOk = async () => {
    setIsModalRole(false);
    const updateRoleFunction = async (userId: number, roles: Roles[]) => {
      try {
        const response = await editRightsUser(userId, roles);
        if (response.status === 200) {
          console.log("Права пользователя обновлены.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const status = error.response.status;
            openNotification("Ошибка", editRightsUserErrorStatus(status));
          }
        }
      }
    };

    if (!id) {
      console.log("Id отсутсвует.");
      return;
    }
    try {
      await dispatch(updateTokenAction());
      await updateRoleFunction(id, checkedList);
      await dispatch(getUsersAction(filters));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorStatusLabels = {
          400: "Произошла ошибка при обработке данных.",
          401: "Проверьте введенные данные или войдите снова.",
          500: "Внутренняя ошибка сервера.",
        };
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 401:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 500:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            default:
              handleUpdateError("Неизвестная ошибка", error);
              break;
          }
        } else if (error.request) {
          handleUpdateError("Сервер не доступен.", error);
        } else {
          handleUpdateError("Неизвестная ошибка.", error);
        }
      } else {
        handleUpdateError("Неизвестная ошибка.", error as Error);
      }
    } finally {
      setCheckedList([]);
      setId(null);
    }
  };

  const handleCancelRole = () => {
    setIsModalRole(false);
    setCheckedList([]);
    setId(null);
  };

  const handleChangeRole: GetProp<typeof Checkbox.Group<Roles>, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
    setCheckedList(checkedValues);
  };

  const handleChangeBlockingFilter = (value: boolean | undefined) => {
    setValue(value);
    dispatch(usersActions.filterByBlockStatus(value));
  };

  const columns: TableColumnsType<User> = [
    {
      title: () => <div onClick={handleUserNameSort}>Имя</div>,
      dataIndex: "username",
      key: "username",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: () => <div onClick={handleEmailSort}>Email</div>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      render: (date) => <Text>{new Date(date).toLocaleString()}</Text>,
    },
    {
      title: "Статус блокировки",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (_, { isBlocked }) => (
        <>
          {isBlocked ? (
            <>
              <Text>
                <CloseOutlined /> Заблокирован
              </Text>
            </>
          ) : (
            <>
              <Text>
                <CheckOutlined /> Активен
              </Text>
            </>
          )}
        </>
      ),
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color;
            if (role === "USER") {
              color = "volcano";
            } else if (role === "ADMIN") {
              color = "green";
            } else if (role === "MODERATOR") {
              color = "geekblue";
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Действия",
      key: "operation",
      render: (_, dataSource) => (
        <Space>
          <Button
            onClick={() => handleGoToProfile(dataSource.id)}
            color="primary"
            variant="link"
          >
            Профиль
          </Button>

          {roles.includes("ADMIN") && (
            <>
              <>
                <Button
                  onClick={() => showModalDelete(dataSource.id)}
                  color="primary"
                  variant="link"
                >
                  Удалить
                </Button>
                <Modal
                  title="Удаление пользователя"
                  mask={false}
                  open={isModalOpenDelete}
                  onOk={handleDeleteUserOk}
                  onCancel={handleCancelDelete}
                  // closable={{ "aria-label": "Custom Close Button" }}
                  // styles={{
                  //   mask: {
                  //     backgroundColor: "rgba(0, 0, 0, 0,045)",
                  //   },
                  // }}
                >
                  <p> Вы уверены, что хотите удалить пользователя?</p>
                </Modal>
              </>

              <>
                <Button
                  color="primary"
                  variant="link"
                  onClick={() => showModalRole(dataSource)}
                >
                  Изменить роли
                </Button>
                <Modal
                  title="Управление ролями"
                  mask={false}
                  open={isModalOpenRole}
                  onOk={handleChangeRoleOk}
                  onCancel={handleCancelRole}
                >
                  <p> Добавьте или удалите роль.</p>
                  <Checkbox.Group
                    options={plainOptions}
                    value={checkedList}
                    onChange={handleChangeRole}
                  />
                </Modal>
              </>
            </>
          )}

          <Popconfirm
            title={
              dataSource.isBlocked
                ? "Вы уверены, что хотите разблокировать пользователя?"
                : "Вы уверены, что хотите заблокировать пользователя?"
            }
            onConfirm={
              dataSource.isBlocked
                ? () => handleUnblock(dataSource.id)
                : () => handleBlock(dataSource.id)
            }
            okText="Да"
            cancelText="Нет"
          >
            <Button variant="link" color="primary">
              {dataSource.isBlocked ? "Разблокировать" : "Заблокировать"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const thunkFunction = async () => {
      try {
        await dispatch(updateTokenAction());
        await dispatch(getUsersAction(filters));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorStatusLabels = {
            400: "Произошла ошибка при обработке данных.",
            401: "Проверьте введенные данные или войдите снова.",
            500: "Внутренняя ошибка сервера.",
          };
          if (error.response) {
            switch (error.response.status) {
              case 400:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 401:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 500:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              default:
                handleUpdateError("Неизвестная ошибка", error);
                break;
            }
          } else if (error.request) {
            handleUpdateError("Сервер не доступен.", error);
          } else {
            handleUpdateError("Неизвестная ошибка.", error);
          }
        } else {
          handleUpdateError("Неизвестная ошибка.", error as Error);
        }
      }
    };
    thunkFunction();
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      openNotification("Ошибка!", error);
    }
  }, [error]);

  if (loading === "pending") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    );
  }

  return (
    <Space direction="vertical">
      <Space>
        <Text>Пользователи</Text>
        <Search
          autoFocus
          allowClear
          placeholder="Поиск по имени или email"
          onSearch={onSearch}
          // style={{ width: 900 }}
        />
        {roles.includes("ADMIN") && (
          <Select
            style={{ width: 200 }}
            suffixIcon={null}
            placeholder={
              <>
                <FilterOutlined />
                <Text>Filter</Text>
              </>
            }
            onChange={handleChangeBlockingFilter}
            value={selectValue}
            options={[
              {
                value: "",
                label: "Все пользователи",
              },
              {
                value: false,
                label: "Только активные",
              },
              {
                value: true,
                label: "Только заблокированные",
              },
            ]}
          />
        )}
      </Space>

      {data.users ? (
        <Table<User>
          size="small"
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          // sticky={true}
          // onChange={handleTableSort}
        />
      ) : (
        <Text>Не найдено...</Text>
      )}

      {meta.totalAmount > 20 && (
        <Pagination
          onChange={handleChangePagination}
          align="end"
          total={meta.totalAmount}
          defaultPageSize={filters.limit}
          current={filters.offset! + 1}
          showSizeChanger
          showQuickJumper
        />
      )}
    </Space>
  );
};
