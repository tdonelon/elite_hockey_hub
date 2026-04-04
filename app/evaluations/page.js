import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../components/DataTable'

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState([])
  const [players, setPlayers] = useState([])
  const [form, setForm] = useState({ player_id: '', skill: '', score: '', notes: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPlayers()
    fetchEvaluations()
  }, [])

  async function fetchPlayers() {
    const { data } = await supabase.from('roster').select('*').order('name')
    setPlayers(data)
  }

  async function fetchEvaluations() {
    const { data } = await supabase.from('evaluations').select('*, roster(name)').order('score', { ascending: false })
    setEvaluations(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editingId) await supabase.from('evaluations').update(form).eq('id', editingId)
    else await supabase.from('evaluations').insert(form)
    setForm({ player_id: '', skill: '', score: '', notes: '' })
    setEditingId(null)
    fetchEvaluations()
  }

  async function handleDelete(id) {
    await supabase.from('evaluations').delete().eq('id', id)
    fetchEvaluations()
  }

  function handleEdit(ev) {
    setForm(ev)
    setEditingId(ev.id)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Player Evaluations</h1>
      <form onSubmit={handleSubmit}>
        <select value={form.player_id} onChange={(e) => setForm({ ...form, player_id: e.target.value })} required>
          <option value="">Select Player</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input placeholder="Skill" value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} required />
        <input type="number" placeholder="Score" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required />
        <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <DataTable data={evaluations.map(ev => ({...ev, name: ev.roster?.name || ''}))} columns={[
        { key: 'name', label: 'Player' },
        { key: 'skill', label: 'Skill' },
        { key: 'score', label: 'Score' },
        { key: 'notes', label: 'Notes' }
      ]} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}
