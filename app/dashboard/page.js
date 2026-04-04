import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [counts, setCounts] = useState({ roster: 0, events: 0, homework: 0 })

  useEffect(() => {
    async function fetchCounts() {
      const { count: roster } = await supabase.from('roster').select('*', { count: 'exact' })
      const { count: events } = await supabase.from('events').select('*', { count: 'exact' })
      const { count: homework } = await supabase.from('homework').select('*', { count: 'exact' })
      setCounts({ roster, events, homework })
    }
    fetchCounts()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>Roster Players: {counts.roster}</div>
        <div>Upcoming Events: {counts.events}</div>
        <div>Homework Assigned: {counts.homework}</div>
      </div>
    </div>
  )
}
