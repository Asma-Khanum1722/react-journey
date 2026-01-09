import { useForm } from "react-hook-form"
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      },d*1000 );
    })
  }

  const onSubmit = async(data) =>{
    await(delay(2))
    console.log(data)
  }
  
  return (
    <>
    {isSubmitting && <div>Loading...</div>}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", 
         {required: {value: true, message: "*Required!"}, 
          minLength: {value: 3, message: "*Minimum length should be 3"}, 
          maxLength: {value: 8, message: "*Maximum length should be 8"}})} type="text" placeholder="Username"/>
        {errors.username && <div className="red-error">{errors.username.message}</div>}
        <br />
        <input {...register("password", {minLength:{value: 8, message: "Password must of at least 8 lenght"}})} type="password" placeholder="Password" />
        {errors.password && <div className="red-error">{errors.password.message}</div>}
        <br />
        <input disabled={isSubmitting} type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
