import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../components/DataTable'

export default function RosterPage() {
  const [players, setPlayers] = useState([])
  const [form, setForm] = useState({ name: '', position: '', number: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => fetchRoster(), [])

  async function fetchRoster() {
    const { data } = await supabase.from('roster').select('*').order('number', { ascending: true })
    setPlayers(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editingId) {
      await supabase.from('roster').update(form).eq('id', editingId)
      setEditingId(null)
    } else {
      await supabase.from('roster').insert(form)
    }
    setForm({ name: '', position: '', number: '' })
    fetchRoster()
  }

  async function handleDelete(id) {
    await supabase.from('roster').delete().eq('id', id)
    fetchRoster()
  }

  function handleEdit(player) {
    setForm({ name: player.name, position: player.position, number: player.number })
    setEditingId(player.id)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Roster</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
        <input placeholder="Number" type="number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <DataTable data={players} columns={[
        { key: 'name', label: 'Name' },
        { key: 'position', label: 'Position' },
        { key: 'number', label: 'Number' }
      ]} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}
