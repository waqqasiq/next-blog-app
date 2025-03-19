import { GetServerSideProps } from "next";
import Head from "next/head";
import BlogPost from "../components/BlogPost";

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

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Head>
                <title>{blog.title} - DevLog</title>
                <meta name="description" content={blog.content.substring(0, 160)} />
                <meta name="author" content={blog.author} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.content.substring(0, 160)} />
                <meta property="og:type" content="article" />
            </Head>
            
            <BlogPost blog={blog} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;

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
        console.error("Error fetching blog:", error);
        return {
            notFound: true, // Return 404 if blog not found
        };
    }
};

export default BlogDetailsPage;
