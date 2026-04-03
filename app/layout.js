export const metadata = {

title:"MN Elite Kern Hockey Hub"

}

export default function RootLayout({children}){

return(

<html>

<body style={{

margin:0,
fontFamily:"Arial",
background:"#0B0F1A",
color:"white"

}}>

<div style={{

padding:"15px",
borderBottom:"1px solid #1e293b",
display:"flex",
justifyContent:"space-between"

}}>

<div>

<h2>MN Elite Kern Hockey</h2>

<p style={{color:"#00BFFF"}}>

ORGANIC. UNIQUE. MODERN.

</p>

</div>

</div>

{children}

</body>

</html>

)

}
