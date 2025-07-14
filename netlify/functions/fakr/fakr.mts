import { Config, Context } from "@netlify/functions";

import { isValidPathPattern, type PathPattern } from "../../../utils/validate";

import data from "../../../data/data.json";

export const config: Config = {
  path: "/fakr/:kind/:status?/:field?",
};

export default (request: Request, context: Context) => {
  const { kind, status, field } = context.params as PathPattern;

  const isValid = isValidPathPattern(context.params);
  if (Array.isArray(isValid)) {
    return new Response(JSON.stringify(isValid), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!status && !field) {
    return new Response(JSON.stringify(data[kind]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (status && field) {
    const user = data[kind];
    user[field] = data[status][field];

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
