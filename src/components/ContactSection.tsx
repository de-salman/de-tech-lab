// @flow strict

import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Contact from "./Contact";

export const personalData = {
  name: "De Tech Lab",
  email: "info@detechlab.com",
  phone: "+971 50 662 1180",
  address: "Al Karama, Dubai, UAE",
  linkedIn: "https://www.linkedin.com/in/salman-farisi-93888b1ab/",
};

function ContactSection() {
  return (
    <section
      id="contact"
      data-scroll-section
      className="relative my-12 mt-24 text-white lg:my-16"
    >
      <div className="absolute -right-8 top-24 hidden flex-col items-center lg:flex">
        <span className="w-fit rotate-90 rounded-md bg-[#1a1443] p-2 px-5 text-xl text-white">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Contact />

        <div className="lg:w-3/4">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="flex items-center gap-3 text-sm md:text-xl">
              <MdAlternateEmail
                className="cursor-pointer rounded-full bg-[#8b98a5] p-2 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-[#16f2b3]"
                size={36}
              />
              <span>{personalData.email}</span>
            </p>
            <p className="flex items-center gap-3 text-sm md:text-xl">
              <IoMdCall
                className="cursor-pointer rounded-full bg-[#8b98a5] p-2 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-[#16f2b3]"
                size={36}
              />
              <span>{personalData.phone}</span>
            </p>
            <p className="flex items-center gap-3 text-sm md:text-xl">
              <CiLocationOn
                className="cursor-pointer rounded-full bg-[#8b98a5] p-2 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-[#16f2b3]"
                size={36}
              />
              <span>{personalData.address}</span>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-5 lg:mt-16 lg:gap-10">
            <Link target="_blank" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="cursor-pointer rounded-full bg-[#8b98a5] p-3 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-[#16f2b3]"
                size={48}
              />
            </Link>
            <Link target="_blank" href={"facebook/detechlab"}>
              <FaFacebook
                className="cursor-pointer rounded-full bg-[#8b98a5] p-3 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-[#16f2b3]"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
