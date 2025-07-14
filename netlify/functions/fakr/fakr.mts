import { Config, Context } from "@netlify/functions";
import data from "../../../data/data.json";

interface UserData {
  id: string;
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface InvalidData {
  email: string;
}

interface DataStructure {
  user: UserData;
  invalid: InvalidData;
}

interface Params {
  kind: "user";
  status: "invalid" | undefined;
  field: "email" | undefined;
}

export const config: Config = {
  path: "/fakr/:kind/:status?/:field?",
};

export default (request: Request, context: Context) => {
  const { kind, status, field } = context.params as unknown as Params;

  if (!status && !field) {
    return new Response(JSON.stringify(data[kind]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (status && field) {
    const typedData = data as DataStructure;
    if (field in typedData[status]) {
      const user = typedData[kind];
      user[field] = typedData[status][field];

      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ error: `Invalid field: ${field}` }), {
      status: 404,
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
