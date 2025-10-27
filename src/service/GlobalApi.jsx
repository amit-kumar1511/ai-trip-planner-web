import axios from "axios";

const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export const GetPlaceDetails = async (placeName) => {
  if (!placeName) return null;
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: placeName,
        key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        limit: 1
      }
    });
    return res.data.results[0]; // contains coordinates, formatted address, etc.
  } catch (error) {
    console.error("OpenCage API error:", error.message);
    return null;
  }
};

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

export const GetPlaceImage = async (placeName) => {
  if (!placeName) return null;
  try {
    const res = await axios.get(UNSPLASH_URL, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      },
      params: {
        query: placeName,
        per_page: 1
      }
    });
    // Returns first image URL
    return res.data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Unsplash API error:", error.message);
    return null;
  }
};
