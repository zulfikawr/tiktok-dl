import { TiktokResponse } from "../types";

export const fetchTiktokData = async (url: string): Promise<TiktokResponse> => {
  const tiktokRegex =
    /^(https?:\/\/)?(www\.)?(tiktok\.com|vt\.tiktok\.com|m\.tiktok\.com)\//;
  if (!tiktokRegex.test(url)) {
    throw new Error(
      "Invalid TikTok URL. Please copy a valid link from TikTok.",
    );
  }

  try {
    // We use AllOrigins proxy with a GET request to TikWM.
    // POST requests via public proxies often get blocked (403 Forbidden) or have header issues.
    // TikWM supports GET for data retrieval.
    const targetUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

    const res = await fetch(proxyUrl);

    if (!res.ok) {
      throw new Error(`Proxy service unavailable (Status: ${res.status})`);
    }

    const wrapper = await res.json();

    // AllOrigins returns the actual response body inside the "contents" string
    const json = JSON.parse(wrapper.contents);

    if (json.code !== 0) {
      // TikWM returns code 0 for success
      const msg =
        json.msg ||
        "Could not process this video. It might be private, deleted, or region-locked.";
      throw new Error(msg);
    }

    const data = json.data;

    // Normalize data to our interface
    const isImage = !!(data.images && data.images.length > 0);

    return {
      type: isImage ? "image" : "video",
      description: data.title || "",
      creator: data.author?.nickname || data.author?.unique_id || "Unknown",
      cover: data.cover || data.origin_cover,
      images: data.images || [],
      video: data.play, // The 'play' URL from TikWM is usually the clean (no watermark) version
      videoHd: data.hdplay || data.play,
      music: data.music,
    };
  } catch (error: any) {
    console.error("Extraction error:", error);
    // Provide a user-friendly error message
    throw new Error(
      error.message ||
        "Failed to extract video data. Please try again or check the link.",
    );
  }
};
