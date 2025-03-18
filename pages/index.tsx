import { useState } from "react";
import { GetServerSideProps } from "next";
import BlogList from "../components/BlogList";

const Home = ({ blogs }: { blogs: any[] }) => {
    const [search, setSearch] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    const handleSearch = async () => {
        try {
            const res = await fetch(`/api/blogs?search=${search}`, {
                headers: {
                    "x-api-key": process.env.API_KEY || "my-hardcoded-key-2025",
                },
            });
            if (!res.ok) throw new Error("Failed to fetch blogs");

            const data = await res.json();
            setFilteredBlogs(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setFilteredBlogs([]); // Empty results if error occurs
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* 🔍 Search Bar */}
            <div className="flex justify-center my-6">
                <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Press Enter to search
                    className="p-3 w-80 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="ml-3 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                >
                    Search
                </button>
            </div>

            {/* 📝 Blog List */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Latest Blogs</h2>
            <BlogList blogs={filteredBlogs} />
        </div>
    );
};

// 🌍 Fetch blogs server-side
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
            headers: {
                "x-api-key": process.env.API_KEY || "my-hardcoded-key-2025",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const blogs = await res.json();

        return {
            props: { blogs },
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: { blogs: [] }, // Return empty array on failure
        };
    }
};

export default Home;
