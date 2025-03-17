import React from "react";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    content: string;
    date: string; // Published date from Strapi
    slug: string; // Slug for dynamic routing
}

interface BlogListProps {
    blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <Link key={blog.id} href={`/${blog.slug}`} passHref>
                        <div className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {blog.title}
                            </h2>
                            <p className="text-gray-500 text-sm mb-2">
                                {new Date(blog.date).toDateString()}
                            </p>
                            <p className="text-gray-600">
                                {blog.content.substring(0, 100)}...
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
