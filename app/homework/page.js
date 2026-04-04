import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../components/DataTable'

export default function HomeworkPage() {
  const [homework, setHomework] = useState([])
  const [form, setForm] = useState({ title: '', description: '', due_date: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => fetchHomework(), [])

  async function fetchHomework() {
    const { data } = await supabase.from('homework').select('*').order('due_date', { ascending: true })
    setHomework(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editingId) await supabase.from('homework').update(form).eq('id', editingId)
    else await supabase.from('homework').insert(form)
    setForm({ title: '', description: '', due_date: '' })
    setEditingId(null)
    fetchHomework()
  }

  async function handleDelete(id) {
    await supabase.from('homework').delete().eq('id', id)
    fetchHomework()
  }

  function handleEdit(hw) { setForm(hw); setEditingId(hw.id) }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Homework</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <DataTable data={homework} columns={[
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'due_date', label: 'Due Date' }
      ]} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}
