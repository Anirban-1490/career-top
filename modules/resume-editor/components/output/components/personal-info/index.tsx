import Link from "next/link";
import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";
import { Github, Mail, MapPin, Phone } from "lucide-react";

import { PropsWithChildren } from "react";

export function OutputPersonalInfo({ control }: IControlProps) {
  const personalInformation = useWatch({
    control,
    name: "personalInformation",
  });

  if (!personalInformation) return null;

  const { firstName, lastName, location, email, phone, ...socialLinks } =
    personalInformation;

  return (
    <section id="personal-info">
      {firstName && (
        <h1 className=" text-4xl text-neon-red text-center uppercase font-bold">
          {firstName} &nbsp;
          {lastName}
        </h1>
      )}
      <div className="flex gap-3 justify-center text-secondary text-sm font-normal mt-2">
        {email && (
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href={`mailto:${email}`}
            className="flex items-center gap-1"
          >
            <Mail size={14} className=" text-background" /> <span>{email}</span>
          </Link>
        )}
        {location && (
          <div className="flex items-center gap-1">
            <MapPin size={14} className=" text-background" />

            <span>{location}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-1">
            <Phone size={14} className=" text-background" />

            <span>{phone}</span>
          </div>
        )}
        {Object.entries(socialLinks).map(([key, value]) => {
          if (value) {
            return (
              <Link
                key={key}
                target="_blank"
                referrerPolicy="no-referrer"
                href={value}
                className="flex items-center gap-1"
              >
                <Github size={14} className=" text-background" />{" "}
                <span className=" capitalize">{key}</span>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}
