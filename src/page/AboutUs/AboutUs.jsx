import { Menu, Footer } from "@/components"

import building from "@/assets/img/other/modern-office-building.jpg"


const About = ({user,clearToken}) => {
    return(
        <div>
            <Menu user={user} clearToken={clearToken} />
            <div className="font-bold text-2xl w-full px-[2em] flex items-center text-white h-[100px] bg-[#2D86FF]">
                    About Us
            </div>
            <div className="w-[80%] m-auto my-[1em] rounded-2xl shadow-xl shadow-gray-400 drop-shadow-2xl">
                <div className="text-lg px-[4em] flex flex-col gap-[2em]">
                    <div className="font-bold text-[#2D86FF] text-lg mt-[2em]">Welcome to Happy Pet Hospital</div>
                    <p>Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.</p>
                    <p>Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.</p>
                    <img src={building} className="w-[1000px] m-auto mb-[2em]" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About
