import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function RosterPage() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    async function fetchRoster() {
      const { data, error } = await supabase.from('roster').select('*')
      if (data) setPlayers(data)
    }
    fetchRoster()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Roster</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name} - {player.position}</li>
        ))}
      </ul>
    </div>
  )
}
