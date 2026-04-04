import RosterPage from '../roster/page'
import CalendarPage from '../calendar/page'
import HomeworkPage from '../homework/page'

export default function AdminPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Panel</h1>
      <p>Manage all team data in one place.</p>
      <RosterPage />
      <CalendarPage />
      <HomeworkPage />
    </div>
  )
}
