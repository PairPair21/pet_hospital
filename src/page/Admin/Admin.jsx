import { Form, Header,LoginAdmin } from "@/components"


const Admin = ({setToken,setUser,user ,setRole,saveToken}) => {

    if(!user){
        return(
            <div className="bg-[#7DC5E5] h-[100vh] ">
                <Header user={user} />
                <LoginAdmin setToken={setToken} setRole={setRole} setUser={setUser} user={user} />
            </div>
        )
    }
    if(user.role == 'admin'){
    return (
        <div className="bg-[#7DC5E5] h-full ">
            <Header />
            <Form user={user} saveToken={saveToken} />
        </div>
    )}
    else{
        return(
            <div className="bg-[#7DC5E5] h-full flex justify-center items-center p-auto">
                <p className="text-red-500 text-xl">You do not have permission to access this section</p>
            </div>
        )
    }
}

export default Admin