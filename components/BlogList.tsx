import React from "react";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    content: string;
    date: string;
    slug: string;
}

interface BlogListProps {
    blogs: Blog[];
}

const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateString));
};

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Link key={blog.id} href={`/${blog.slug}`} passHref>
                    <div className="bg-white shadow-md rounded-lg p-5 transition-all hover:shadow-xl cursor-pointer border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h2>
                        <p className="text-gray-500 text-sm">{formatDate(blog.date)}</p>
                        <p className="text-gray-700 mt-2">{blog.content.substring(0, 120)}...</p>
                        <button className="mt-3 text-blue-600 font-semibold hover:underline">Read More →</button>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogList;
