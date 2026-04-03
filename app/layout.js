import './globals.css'

export const metadata = {
  title: 'Elite Hockey Hub',
  description: 'MN Elite Hockey Hub – Practice, Roster, Calendar, Chat, Evaluations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <img src="/kernhockey-logo.png" alt="Kern Hockey Logo" className="logo"/>
          <nav>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/calendar">Calendar</a>
            <a href="/roster">Roster</a>
            <a href="/chat">Chat</a>
            <a href="/evaluations">Evaluations</a>
            <a href="/homework">Homework</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Kern Hockey
        </footer>
      </body>
    </html>
  )
}
