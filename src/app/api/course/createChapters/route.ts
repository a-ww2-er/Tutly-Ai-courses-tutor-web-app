// api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { z } from "zod";
import { strict_output } from "@/lib/gpt";

export async function POST(req: Request, res: Response) {
  try {
    const body = req.json();
    const { title, units } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };

    let output_units: outputUnits = await strict_output(
      "you are an Ai capable of creating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `its your job to create a course about ${title}. The user has requested to create chapters for each of the units below. Then ,for each chapter provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube `
      ),
    {
        title: 'title of the unit',
        chapters: 'an array of chapters , each chapter should have a youtube_search_query and a chapter_title key in the JSON object',
    }
    );
    console.log(output_units);
    return NextResponse.json(output_units);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json("invalid Body", { status: 400 });
    }
  }
}
