import { useState } from "react";
import pet_1 from "@/assets/img/home/close-up-veterinarian-taking-care-dog.jpg"
import pet_2 from "@/assets/img/home/cute-dog-during-consultation.jpg"
import pet_3 from "@/assets/img/home/veterinarian-taking-care-pet.jpg"
import pet_4 from "@/assets/img/home/washing-process-small-dog-bathroom-dog-washed-by-professional.jpg"

const TabCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textCaption, setTextCaption] = useState('')

  const images = [pet_1, pet_2, pet_3, pet_4];

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div className="relative m-auto max-w-[800px] ">
        {images.map((image, index) => (
          <div key={index} className={`fade ${index === currentIndex ? "" : "hidden"}`}>
            <img src={image} className="h-[500px] mx-auto" />
            <div className="text-base text-black/60 px-[8px] py-[12px] absolute bottom-[8px] w-[100%] text-center">{index + 1} / {images.length}</div>
            <a className="cursor-pointer bg-[#DBD7D6]/30 text-black/60 absolute top-[50%] left-[1.3em] w-auto mt-[-22px] p-[10px] font-bold text-lg select-none" onClick={handlePrevSlide}>&#10094;</a>
            <a className="cursor-pointer bg-[#DBD7D6]/30 text-black/60 absolute top-[50%] right-[1.3em] w-auto mt-[-22px] p-[10px] font-bold text-lg select-none" onClick={handleNextSlide}>&#10095;</a>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        {images.map(( index) => (
          <span key={index} className={`cursor-pointer h-[15px] w-[15px] bg-[#bbb] rounded-xl ${index === currentIndex ? "bg-red-500" : ""}`}></span>
        ))}
      </div>
    </div>
  )
}

export default TabCarousel;
