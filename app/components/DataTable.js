export default function DataTable({ data, columns, onDelete, onEdit }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{col.label}</th>
          ))}
          {(onDelete || onEdit) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => <td key={col.key} style={{ padding: '8px' }}>{row[col.key]}</td>)}
            {(onDelete || onEdit) && (
              <td>
                {onEdit && <button onClick={() => onEdit(row)}>Edit</button>}
                {onDelete && <button onClick={() => onDelete(row.id)}>Delete</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
