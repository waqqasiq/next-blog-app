import React from "react";

interface BlogPostProps {
    blog: {
        id: number;
        title: string;
        content: string;
        author: string;
        date: string;
        slug: string;
    };
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

            {/* Meta Info: Author & Date with Divider */}
            <div className="flex items-center text-gray-500 text-sm mb-4">
                <span className="font-semibold">{blog.author}</span>
                <span className="mx-3">|</span> {/* Divider */}
                <span>{new Date(blog.date).toDateString()}</span>
            </div>

            {/* Content */}
            <p className="text-gray-700 leading-relaxed">{blog.content}</p>
        </div>
    );
};

export default BlogPost;
