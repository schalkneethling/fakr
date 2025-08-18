interface UnsplashImage {
  description: string | null;
  height: number;
  id: string;
  links: {
    html: string;
  };
  user: {
    name: string;
  };
  urls: {
    full: string;
    regular: string;
  };
  width: number;
}

interface GetImagesOptions {
  query?: string;
  perPage?: number;
}

export const getImages = async (options?: GetImagesOptions) => {
  const apiBase = "https://api.unsplash.com/";
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not set");
  }

  try {
    const url = new URL("/search/photos", apiBase);
    url.searchParams.set("query", options?.query ?? "nature");
    url.searchParams.set("per_page", options?.perPage?.toString() ?? "30");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    });

    if (response.ok) {
      const data = (await response.json()) as { results?: unknown[] };
      const results = (data.results ?? []) as UnsplashImage[];
      const images = results.map((result) => {
        const { description, height, id, links, user, urls, width } = result;
        return {
          description: description ?? "",
          height,
          id,
          link: links.html,
          username: user.name,
          urls: {
            full: urls.full,
            regular: urls.regular,
          },
          width,
        };
      });

      return images;
    }

    throw new Error("Failed to fetch images");
  } catch (error) {
    throw new Error("Failed to fetch images", { cause: error });
  }
};
