import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";
import CommentCard from "../components/CommentCard";

interface Blog {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    slug: string;
}

interface Comment {
    id: number;
    text: string;
    author: string;
    createdAt: string;
}

const BlogDetailsPage = ({ blog }: { blog: Blog | null }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllComments, setShowAllComments] = useState(false);


    useEffect(() => {
        if (blog?.id) {
            fetchComments(blog.id.toString());
        }
    }, [blog?.id]);

    const fetchComments = async (blogId: string) => {
        try {
            const res = await fetch(`/api/comments?blogId=${blogId}`, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "my-hardcoded-key-2025",
                },
            });
            const data = await res.json();
            setComments(data);
        } catch (err) {
            console.error("Failed to fetch comments", err);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

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

            {/* 🔽 Comments Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                {loading ? (
                    <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                    <>
                        <ul className="space-y-4">
                            {(showAllComments ? comments : comments.slice(0, 3)).map((comment) => (
                                <CommentCard
                                    key={comment.id}
                                    author={comment.author}
                                    text={comment.text}
                                    createdAt={comment.createdAt}
                                />
                            ))}

                        </ul>
                        {comments.length > 3 && (
                            <button
                                onClick={() => setShowAllComments(!showAllComments)}
                                className="mt-4 text-blue-600 font-semibold hover:underline"
                            >
                                {showAllComments ? "Show less" : "See all comments"}
                            </button>
                        )}
                    </>


                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
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
            notFound: true,
        };
    }
};

export default BlogDetailsPage;
