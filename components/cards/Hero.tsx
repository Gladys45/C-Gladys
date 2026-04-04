import heroBg from '@/assets/images/career-bg.png'
import CenterContent from '@/components/layouts/CenterContent'
import Image from 'next/image'
const Hero = () => {
  return (
    <section className="relative w-full">
      <div className="absolute w-full bottom-12">
        <CenterContent>
          <div className="w-full text-white">
            <h1 className="text-4xl text-center text-white md:text-left font-poppins">
              Careers
            </h1>
            <p className="hidden max-w-2xl mt-3 md:block font-inter text-sm">
              We give our people the opportunity and support to achieve more
              than they ever thought possible.
            </p>
          </div>
        </CenterContent>
      </div>
      <Image
        src={heroBg}
        alt="Careers page hero background"
        className="w-full object-cover object-top h-[30vh] lg:h-[280px]"
      />
    </section>
  )
}
export default Hero
