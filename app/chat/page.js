import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchMessages()
    const subscription = supabase.from('chat').on('INSERT', payload => {
      setMessages(prev => [...prev, payload.new])
    }).subscribe()
    return () => supabase.removeSubscription(subscription)
  }, [])

  async function fetchMessages() {
    const { data } = await supabase.from('chat').select('*').order('timestamp', { ascending: true })
    setMessages(data)
  }

  async function sendMessage() {
    if (!msg) return
    await supabase.from('chat').insert({ username: 'Player', message: msg })
    setMsg('')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Chat</h1>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'auto' }}>
        {messages.map((m) => <div key={m.id}><b>{m.username}:</b> {m.message}</div>)}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
