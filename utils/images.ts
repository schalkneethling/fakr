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
  perPage?: number;
  query?: string;
  type?: "random" | "search";
}

const getImageData = (image: UnsplashImage) => {
  const { description, height, id, links, user, urls, width } = image;
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
};

export const getImages = async (options?: GetImagesOptions) => {
  const apiBase = "https://api.unsplash.com/";
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not set");
  }

  try {
    const endpoint =
      options?.type === "random" ? "/photos/random" : "/search/photos";
    const url = new URL(endpoint, apiBase);
    url.searchParams.set("query", options?.query ?? "nature");

    if (options?.type === "search") {
      url.searchParams.set("per_page", options.perPage?.toString() ?? "30");
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    });

    if (response.ok) {
      const data = (await response.json()) as { results?: unknown[] };

      if (!Array.isArray(data)) {
        return [getImageData(data as UnsplashImage)];
      }

      const results = (data.results ?? []) as UnsplashImage[];
      const images = results.map((result) => {
        return getImageData(result);
      });

      return images;
    }

    throw new Error("Failed to fetch images");
  } catch (error) {
    throw new Error("Failed to fetch images", { cause: error });
  }
};
