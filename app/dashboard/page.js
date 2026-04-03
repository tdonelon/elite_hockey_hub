"use client";

import Link from 'next/link'

export default function Dashboard(){

return(
<div style={{padding:"20px"}}>
<h1>Program Dashboard</h1>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginTop:"20px"}}>
<Link href="/calendar"><button className="card">Calendar</button></Link>
<Link href="/roster"><button className="card">Roster</button></Link>
<Link href="/chat"><button className="card">Team Chat</button></Link>
<Link href="/evaluations"><button className="card">Evaluations</button></Link>
<Link href="/homework"><button className="card">Homework</button></Link>
<Link href="/admin"><button className="card">Admin</button></Link>
</div>

<style jsx>{`
.card{
background:#111827;
border:1px solid #1e293b;
padding:30px;
color:white;
font-size:18px;
border-radius:10px;
cursor:pointer;
}
.card:hover{
border:1px solid #00BFFF;
}
`}</style>
</div>
)

}
