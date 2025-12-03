import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";
import { footerData } from "./data";

const socials = [
  {
    icon: Linkedin,
    id: "linkedin",
    href: "",
  },

  {
    icon: Github,
    id: "github",
    href: "https://github.com/Anirban-1490/career-top",
  },
];

export function Footer() {
  return (
    <footer>
      <div className=" flex flex-wrap pt-10 mx-[10rem] justify-between">
        <div className="flex min-md:flex-col min-md:items-center gap-15">
          <div className=" max-w-[20rem]">
            <h2 className=" font-bold text-md  first-letter:text-neon-red first-letter:text-5xl text-center w-full">
              CareerTOP
            </h2>
            <p className=" text-center mt-5 text-sm">
              Your Career Copilot. AI-assisted tools and resources to get hired
              at FAANG, top tech, and startup companies 10X faster.
            </p>
          </div>
          <div className=" flex gap-10">
            {socials.map((social) => {
              return (
                <Link href={social.href} key={social.id} target="_blank">
                  {
                    <social.icon className=" hover:text-neon-red transition-all duration-200" />
                  }
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-10">
          {footerData.map((data) => {
            return (
              <div key={data.id}>
                <h4 className=" mb-10 text-base font-semibold">{data.title}</h4>
                <ul className=" flex flex-col gap-4">
                  {data.links.map((link) => {
                    return (
                      <li
                        key={link.id}
                        className=" text-sm  font-light hover:text-neon-red"
                      >
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="mx-auto w-full text-center mt-[10rem] py-5 text-sm">
          Copyright © {new Date().getFullYear()} Lucide Contributors
        </p>
      </div>
    </footer>
  );
}
