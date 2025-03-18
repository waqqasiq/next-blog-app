import React from "react";

interface BlogPostProps {
    blog: {
        id: number;
        title: string;
        content: string;
        author: string;
        date: string;
        slug: string;
        coverImage?: string; // Optional cover image
    };
}

const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateString));
};

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
    return (
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">

            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                <div className="flex items-center text-gray-600 text-sm mb-6">
                    <span className="font-semibold">{blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(blog.date)}</span>
                </div>

                <div className="text-gray-700 leading-relaxed text-lg">{blog.content}</div>
            </div>
        </article>
    );
};

export default BlogPost;
