import { Body,Menu,Footer, TabCarousel} from "@/components"
import { useToken } from "@/utils"

const Home = ({user ,clearToken , setToken,setRole,setUser}) => {

    return(
        <div>
            <Menu user={user} clearToken={clearToken} setToken={setToken} setUser={setUser} setRole={setRole}/>
            <Body />
            <TabCarousel />
            <Footer />
        </div>
    )
}

export default Home