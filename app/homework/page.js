import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../components/DataTable'

export default function HomeworkPage() {
  const [homework, setHomework] = useState([])
  const [form, setForm] = useState({ title: '', description: '', due_date: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => fetchHomework(), [])

  async function fetchHomework() {
    const { data } = await supabase.from('homework').select
