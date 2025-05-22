import { config } from "dotenv";


config();


export const makeLinkdRequest = async (url: string, options: RequestInit): Promise<any> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${process.env.LINKD_API_KEY}`,
    },
  });
  return res;
};


export const logWithTimestamp = ({
  level = "info",
  name = "linkd",
  data,
}: {
  level?: "info" | "warning" | "error" | "debug";
  name?: string;
  data?: any;
}) => {
  const timestamp = new Date().toISOString();

  const consoleData = [`${timestamp} [${name}] [${level}]`];
  if (Array.isArray(data)) {
    consoleData.push(...data);
  } else {
    consoleData.push(data);
  }

  if (level === "error") {
    console.error(...consoleData);
  } else if (level === "warning") {
    console.warn(...consoleData);
  } else {
    console.log(...consoleData);
  }
};
