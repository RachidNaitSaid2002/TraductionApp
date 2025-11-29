import Image from "next/image"
export default function VideoSection(){
    return(
        <section className="bg-[#e4d9ec]  mt-[-1px]">
          <div className="flex justify-center">
            <video
              className="w-full max-w-[1000px] rounded-lg shadow-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/Tal Translate.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
    )
}