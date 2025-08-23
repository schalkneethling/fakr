import { Config, Context } from "@netlify/functions";

import { isValidPathPattern, type PathPattern } from "../../../utils/validate";

import data from "../../../data/data.json";

export const config: Config = {
  path: "/fakr/:kind/:status?/:field?",
};

export default (request: Request, context: Context) => {
  const { kind, status, field } = context.params as PathPattern;

  const allowedOrigins: string[] = [
    "https://verdant-puffpuff-d076f3.netlify.app/",
    "http://localhost:5500",
    "http://localhost:3000",
    "http://localhost:8080",
  ];
  const origin = request.url;

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET",
  } as Record<string, string>;

  if (allowedOrigins.includes(origin)) {
    defaultHeaders["Access-Control-Allow-Origin"] = origin;
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
