
export const NavMenu = ({ constFilter, countTask, handleChangeStatus }) => {
    return (
      <nav
        style={{display: "flex", flexDirection: "row", gap: "15px"}}
      >
        {constFilter.map((filter) => (
          <button
            key={filter.nameButton}
            style={{background: "none", border: "none", cursor: "pointer", textDecorationLine: "underline"}}
            onClick={() => handleChangeStatus(filter.nameStatus)}
          >
            {`${filter.nameButton} (${countTask[filter.nameStatus]})`}
          </button>
        ))}
      </nav>
    );
}
