import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../components/DataTable'

export default function CalendarPage() {
  const [events, setEvents] = useState([])
  const [form, setForm] = useState({ title: '', date: '', location: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => fetchEvents(), [])

  async function fetchEvents() {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
    setEvents(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editingId) await supabase.from('events').update(form).eq('id', editingId)
    else await supabase.from('events').insert(form)
    setForm({ title: '', date: '', location: '' })
    setEditingId(null)
    fetchEvents()
  }

  async function handleDelete(id) {
    await supabase.from('events').delete().eq('id', id)
    fetchEvents()
  }

  function handleEdit(ev) { setForm(ev); setEditingId(ev.id) }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Practice & Event Calendar</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <DataTable data={events} columns={[
        { key: 'title', label: 'Title' },
        { key: 'date', label: 'Date' },
        { key: 'location', label: 'Location' }
      ]} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}
