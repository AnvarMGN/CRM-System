
export const List = ({ fetchlist }) => {
  return (
    <ul>
      {fetchlist.map((item) => (
        <li key={item.id}>
          <input type='checkbox' />
          {item.title}
          <button>Edit</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  )
}

