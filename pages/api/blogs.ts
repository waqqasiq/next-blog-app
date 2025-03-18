import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const getFilteredQuery = (query: any) => {
    let queryString = "populate=*";

    if (query.author) {
        queryString += `&filters[author][$eq]=${encodeURIComponent(query.author)}`;
    }
    if (query.startDate) {
        queryString += `&filters[date][$gte]=${encodeURIComponent(query.startDate)}`;
    }
    if (query.endDate) {
        queryString += `&filters[date][$lte]=${encodeURIComponent(query.endDate)}`;
    }

    queryString += '&pagination[pageSize]=3';

    if (query.page) {
        queryString += `&pagination[page]=${encodeURIComponent(query.page)}`;
    }

    if (query.search) {
        queryString += `&filters[content][$containsi]=${encodeURIComponent(query.search)}`;
    }

    return queryString;
};

const fetchBlogsFromStrapi = async (queryString: string) => {
    const response = await fetch(`${STRAPI_URL}/api/blogs?${queryString}`);
    if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    const data = await response.json();
    return data;
};



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!authMiddleware(req, res)) return;

        const queryString = getFilteredQuery(req.query);

        let blogs = await fetchBlogsFromStrapi(queryString);

        return res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
};

export default handler;
