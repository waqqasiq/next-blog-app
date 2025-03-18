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

// 🔹 Format date to "March 1, 2025"
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
            {/* 🖼 Blog Cover Image (if available) */}
            {/* {blog.coverImage && (
                <img src={blog.coverImage} alt={blog.title} className="w-full h-64 object-cover" />
            )} */}

            <div className="p-8">
                {/* 📝 Blog Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                {/* 👤 Author & 📅 Date */}
                <div className="flex items-center text-gray-600 text-sm mb-6">
                    <span className="font-semibold">{blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(blog.date)}</span>
                </div>

                {/* 📖 Blog Content */}
                <div className="text-gray-700 leading-relaxed text-lg">{blog.content}</div>
            </div>
        </article>
    );
};

export default BlogPost;
