import Link from 'next/link'

export default function Page(){

return(

<div style={{

background:"#0B0F1A",
color:"white",
height:"100vh",
padding:"40px"

}}>

<h1>MN Elite Kern Hockey Hub</h1>

<p>Elite Training for Elite Athletes</p>

<Link href="/dashboard">

<button style={{

padding:"15px",
background:"#00BFFF",
border:"none",
color:"white",
fontSize:"18px"

}}>

Enter App

</button>

</Link>

</div>

)

}
