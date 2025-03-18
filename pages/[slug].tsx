import { GetServerSideProps } from "next";
import BlogPost from "../components/BlogPost"; // Import BlogPost component

interface Blog {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    slug: string;
}

const BlogDetailsPage = ({ blog }: { blog: Blog | null }) => {
    if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

    return <BlogPost blog={blog} />; // Use the BlogPost component
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const slug = params?.slug as string;

    // 🚨 Ignore query parameters meant for filtering and return 404
    if (!slug || query?.author || query?.startDate || query?.endDate) {
        return { notFound: true };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
            headers: {
                "x-api-key": process.env.API_KEY || "my-hardcoded-key-2025",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch blog details");

        const blog = await res.json();

        return {
            props: { blog },
        };
    } catch (error) {
        console.error("Error fetching blog:", error.message);
        return {
            notFound: true, // Return 404 for any fetch errors
        };
    }
};

export default BlogDetailsPage;
