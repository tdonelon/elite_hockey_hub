import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [rosterCount, setRosterCount] = useState(0)
  const [eventsCount, setEventsCount] = useState(0)
  const [homeworkCount, setHomeworkCount] = useState(0)

  useEffect(() => {
    async function fetchCounts() {
      const { count: roster } = await supabase.from('roster').select('*', { count: 'exact' })
      const { count: events } = await supabase.from('events').select('*', { count: 'exact' })
      const { count: homework } = await supabase.from('homework').select('*', { count: 'exact' })
      setRosterCount(roster)
      setEventsCount(events)
      setHomeworkCount(homework)
    }
    fetchCounts()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>Roster Players: {rosterCount}</div>
        <div>Upcoming Events: {eventsCount}</div>
        <div>Homework Assigned: {homeworkCount}</div>
      </div>
    </div>
  )
}
