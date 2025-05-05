
export const NavMenu = ({ constFilter, countTask, changeStatus }) => {
  return (
    <nav style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
      <ul style={{ listStyleType: "none" }}>
        {constFilter.map((filter) => (
          <li key={filter.nameButton}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecorationLine: "underline",
              }}
              onClick={() => changeStatus(filter.nameStatus)}
            >
              {`${filter.nameButton} (${countTask[filter.nameStatus]})`}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
