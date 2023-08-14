import bgHeader from "@/assets/img/home/handsome-doctor-veterinarian-examining-cute-black-pug-dog-vet-clinic-standing-white-background.jpg";
import icon_1 from "@/assets/icon/pet.png"
import icon_2 from "@/assets/icon/like.png"
import icon_3 from "@/assets/icon/medical-report.png"
import icon_4 from "@/assets/icon/dog.png"

const Body = () => {
    return (
        <div className="relative">
            <div className="px-[2em] h-[600px] z-0 bg-[#FAF8F9]">
                <div className="relative">
                    <div className="w-full overflow-hidden" style={{ overflow: "hidden" }}>
                        <img className="h-[600px] w-[65%] object-cover absolute right-[-2em]" src={bgHeader} alt="" />
                    </div>
                    <div className="absolute top-[10em]">
                        <h1 className="text-6xl text-[#0C9DDD] font-bold">Happy Pet Hospital</h1>
                        <h2 className="text-2xl mt-[30px]">To your best friends</h2>
                    </div>
                </div>
            </div>
            <div className="absolute w-full z-10 top-[63%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center bg-[#0FACF1] w-[285px] h-[300px] p-[1em]">
                        <div className="my-[15px] h-[80px] w-[80px] rounded-full bg-white" style={{backgroundImage:`url(${icon_1})`, backgroundSize:"50px",backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}></div>
                        <div className="font-semibold text-white text-xl my-[10px]">EXCELLENT SERVICES</div>
                        <div className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#0C9DDD] w-[285px] h-[300px] p-[1em]">
                        <div className="my-[15px] h-[80px] w-[80px] rounded-full bg-white" style={{backgroundImage:`url(${icon_2})`, backgroundSize:"50px",backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}></div>
                        <div className="font-semibold text-white text-xl my-[10px]">GUARANTEED WORK</div>
                        <div className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#0FACF1] w-[285px] h-[300px] p-[1em]">
                        <div className="my-[15px] h-[80px] w-[80px] rounded-full bg-white" style={{backgroundImage:`url(${icon_3})`, backgroundSize:"50px",backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}></div>
                        <div className="font-semibold text-white text-xl my-[10px]">ACCURATE DIAGNOSIS</div>
                        <div className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#0C9DDD] w-[285px] h-[300px] p-[1em]">
                        <div className="my-[15px] h-[80px] w-[80px] rounded-full bg-white" style={{backgroundImage:`url(${icon_4})`, backgroundSize:"50px",backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}></div>
                        <div className="font-semibold text-white text-xl my-[10px]">ANIMAL BATH SERVICE</div>
                        <div className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</div>
                    </div>
                </div>
            </div>
            <div className="relative top-[12em] z-0 bg-[#DBD7D6] h-[500px] flex items-center mb-[12em]">
                <div className="flex flex-col text-center mx-[30%]">
                    <h2 className="text-4xl text-[#0C9DDD] font-semibold">Welcome to <span className="font-bold">Happy Pet Hospital</span></h2>
                    <div className="h-[2px] w-[4em] mt-[2em] mb-[1em] bg-[#0C9DDD] self-center"></div>
                    <p>Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet.</p>
                </div>
            </div>
        </div>
    )
}

export default Body