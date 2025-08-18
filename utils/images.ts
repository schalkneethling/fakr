interface Image {
  description: string;
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

export const getImages = async () => {
  const apiBase = "https://api.unsplash.com/";
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not set");
  }

  try {
    const response = await fetch(
      `${apiBase}/search/photos?query=nature&per_page=30&client_id=${accessKey}`,
    );

    if (response.ok) {
      const data = (await response.json()) as { results: unknown[] };
      const images = data.results.map((result) => {
        const { description, height, id, links, user, urls, width } =
          result as Image;
        return {
          description,
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
