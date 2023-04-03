import { NextPage } from "next"
import { ChangeEvent, FormEvent, useState } from "react"



export default function Home() {
  const [file , setFile] = useState<File|null>(null)

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    const selectedFile = e.target.files?.[0]

    if(selectedFile){
      setFile(selectedFile)
      console.log(selectedFile)
    }
  }

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    console.log(file);
    

    if(file){
      const formData = new FormData;
      formData.append('file' , file)
   
      await fetch("upload", {
          method:"POST",
          body:formData
      }).then(data=>{
        console.log(data)
        console.log(data.json());
        
      })
  
    }
  
}

  return (
      <>
        <form className="flex justify-center " method="POST" onSubmit={handleSubmit}>
          <input type="file" name="file"  onChange={handleChange} />
          <button className="px-5 py-2 rounded-md bg-blue-600 text-white" type="submit" >push</button>
        </form>
      
      </>
    )
}

