import { UserProfile } from "@/action/user-profile";

import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
export async function POST(req: NextRequest) {
  //* authorize the user
  try {
    const user = await UserProfile();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeId, html } = (await req.json()) as {
    resumeId: string;
    html: string;
  };

  const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;

  //* connect to the browserless REST endpoint
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}`,
  });

  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setContent(html);

  //* generate a PDF buffer
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true, //* this will use styles/tailwaind styles
  });

  await browser.close();

  return new NextResponse(pdfBuffer as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${`resume_${resumeId}.pdf`}`,
    },
  });
}
