"use client"

import { useState } from "react"

export default function AdminLogin(){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

async function login(){

const res = await fetch("http://localhost:8000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
})

const data = await res.json()

if(data.token){

localStorage.setItem("adminToken",data.token)

window.location.href="/"

}
else{

alert("Invalid credentials")

}

}

return(

<div className="flex flex-col gap-4 w-80 mx-auto mt-40">

<h1 className="text-2xl font-semibold">
Admin Login
</h1>

<input
placeholder="Admin ID"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="border p-2"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-2"
/>

<button
onClick={login}
className="bg-black text-white p-2"
>
Login
</button>

</div>

)
}