import { GetServerSideProps } from "next";
import BlogPost from "@/components/BlogPost"; // Import BlogPost component

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`);

        if (!res.ok) throw new Error("Failed to fetch blog details");

        const blog = await res.json();

        return {
            props: { blog },
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return {
            props: { blog: null }, // Return null if fetching fails
        };
    }
};

export default BlogDetailsPage;
