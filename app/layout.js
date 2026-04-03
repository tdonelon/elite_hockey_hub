export const metadata = {
  title: "Elite Hockey Hub"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{fontFamily:'Arial',padding:'20px'}}>
        {children}
      </body>
    </html>
  )
}
