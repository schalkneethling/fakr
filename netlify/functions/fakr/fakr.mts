import { Config, Context } from "@netlify/functions";

import { isValidPathPattern, type PathPattern } from "../../../utils/validate";
import { getImages } from "../../../utils/images";

import data from "../../../data/data.json";

export const config: Config = {
  path: "/fakr/:kind/:status?/:field?",
};

export default async (request: Request, context: Context) => {
  const { kind, status, field } = context.params as PathPattern;

  const allowedOrigins: string[] = [
    "https://verdant-puffpuff-d076f3.netlify.app",
    "http://localhost:5500",
    "http://localhost:3000",
    "http://localhost:8080",
  ];

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET",
  } as Record<string, string>;

  const origin = request.headers.get("Origin");
  if (origin && allowedOrigins.includes(origin)) {
    defaultHeaders["Access-Control-Allow-Origin"] = origin;
  }

  if (kind === "images") {
    try {
      const url = new URL(request.url);

      const options: { perPage: number } = {
        perPage: 30,
      };

      const rawPerPage = url.searchParams.get("perPage");
      if (rawPerPage) {
        const perPage = parseInt(rawPerPage);

        if (!isNaN(perPage)) {
          options.perPage = Math.max(1, Math.min(perPage, 100));
        }
      }

      const images = await getImages(options);
      return new Response(JSON.stringify(images), {
        status: 200,
        headers: defaultHeaders,
      });
    } catch {
      return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
        status: 500,
        headers: defaultHeaders,
      });
    }
  }

  const isValid = isValidPathPattern(context.params);
  if (Array.isArray(isValid)) {
    return new Response(JSON.stringify(isValid), {
      status: 400,
      headers: defaultHeaders,
    });
  }

  if (!status && !field) {
    return new Response(JSON.stringify(data[kind]), {
      status: 200,
      headers: defaultHeaders,
    });
  }

  if (status && field) {
    const user = data[kind];
    user[field] = data[status][field];

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: defaultHeaders,
    });
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: defaultHeaders,
  });
};
