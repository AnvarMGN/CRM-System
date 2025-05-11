export const NavMenu = ({ countTask, changeStatus, status }) => {
  const constFilter = [
    { nameStatus: "all", nameButton: "Все" },
    { nameStatus: "inWork", nameButton: "в работе" },
    { nameStatus: "completed", nameButton: "сделано" },
  ];

  return (
    <li>
      <nav className="navmenu">
        <ul className="navmenu__list">
          {constFilter.map((filter) => (
            <li className="navmenu__item" key={filter.nameButton}>
              <button
                className={`navmenu__button ${
                  filter.nameStatus === status ? "navmenu__button--active" : ""
                }`}
                onClick={() => changeStatus(filter.nameStatus)}
              >
                <h2>{`${filter.nameButton} (${
                  countTask[filter.nameStatus]
                })`}</h2>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </li>
  );
};
