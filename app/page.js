import Link from 'next/link'

export default function Home(){

return(
<div style={{padding:"40px",textAlign:"center"}}>
<h1>MN Elite Kern Hockey Hub</h1>
<p>Elite Training for Elite Athletes</p>
<Link href="/dashboard">
<button style={{background:"#00BFFF",padding:"20px",border:"none",color:"white",fontSize:"20px",borderRadius:"8px",cursor:"pointer"}}>Enter Hockey Hub</button>
</Link>
</div>
)

}
