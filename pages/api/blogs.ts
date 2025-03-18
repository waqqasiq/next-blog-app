import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// 🔹 Function to construct filtering query for Strapi API
const getFilteredQuery = (query: any) => {
    let queryString = "populate=*"; // Always populate related data

    if (query.author) {
        queryString += `&filters[author][$eq]=${encodeURIComponent(query.author)}`;
    }
    if (query.startDate) {
        queryString += `&filters[date][$gte]=${encodeURIComponent(query.startDate)}`;
    }
    if (query.endDate) {
        queryString += `&filters[date][$lte]=${encodeURIComponent(query.endDate)}`;
    }

    return queryString;
};

// 🔹 Function to fetch blogs from Strapi API
const fetchBlogsFromStrapi = async (queryString: string) => {
    const response = await fetch(`${STRAPI_URL}/api/blogs?${queryString}`);
    if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    const data = await response.json();
    return data.data; // Strapi returns data inside `.data`
};

// 🔹 Function to handle API responses
const handleResponse = (res: NextApiResponse, data: any) => {
    return res.status(200).json(data);
};

// 🔹 Main API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // 🔒 Authenticate request
        if (!authMiddleware(req, res)) return;

        // 🛠 Construct query string
        const queryString = getFilteredQuery(req.query);

        // 🌍 Fetch filtered blogs
        const blogs = await fetchBlogsFromStrapi(queryString);

        // ✅ Send response
        return handleResponse(res, blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
};

export default handler;