import { Parser } from "html-to-react";
import React, { PropsWithChildren } from "react";
import { getDate } from "../output/lib/get-date";

export interface IOutputSectionEntriesProps {
  id?: string;
  name?: string;
  startDate?: string | null;
  endDate?: string | null;
  currentlyWorking?: boolean;
  location?: string;
  org?: string;
  description?: string;
}

interface IOutputSection {
  heading: string;
  id: string;
  entries?: IOutputSectionEntriesProps[];
}

export function OutputSection({
  heading,
  id,
  entries,
  children,
}: IOutputSection & PropsWithChildren) {
  return (
    <section id={id}>
      <div className={` mb-1 text-base uppercase  text-neon-red font-semibold`}>
        {heading}
      </div>
      {!children && entries ? (
        <div className=" flex flex-col gap-4 text-xs   text-background">
          {entries.map((entry) => {
            return (
              <div className="flex flex-col gap-0.5" key={entry.id}>
                <div className=" flex justify-between">
                  <div className=" font-semibold">{entry.name}</div>
                  <div>
                    {entry.startDate ? (
                      <>
                        {getDate(entry.startDate)} -{" "}
                        {entry.endDate && !entry.currentlyWorking
                          ? getDate(entry.endDate)
                          : "Present"}
                      </>
                    ) : (
                      <></>
                    )}

                    {entry.location && (
                      <span>
                        &nbsp; | &nbsp;
                        {entry.location}
                      </span>
                    )}
                  </div>
                </div>
                {entry.org && <div className=" italic">{entry.org}</div>}
                {entry.description && (
                  <div className="list-disc">
                    {Parser().parse(entry.description)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
