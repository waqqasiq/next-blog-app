import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import BlogList from "../components/BlogList";
import { Blog } from "../components/BlogList";

const Home = ({ blogs }: {
    blogs: {
        data: Blog[],
        meta?: {
            pagination: {
                page: number,
                pageSize: number,
                pageCount: number,
                total: number
            }
        }
    };
}) => {
    const [search, setSearch] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const router = useRouter();
    const page = parseInt(router.query.page as string) || 1;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`/api/blogs?page=${page}&search=${search}`, {
                    headers: {
                        "x-api-key": process.env.API_KEY || "my-hardcoded-key-2025",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch blogs");

                const data = await res.json();
                setFilteredBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setFilteredBlogs({ data: [] });
            }
        };

        fetchBlogs();
    }, [page]);

    const handleSearch = async () => {
        try {
            const res = await fetch(`/api/blogs?search=${search}&page=${page}`, {
                headers: {
                    "x-api-key": process.env.API_KEY || "my-hardcoded-key-2025",
                },
            });
            if (!res.ok) throw new Error("Failed to fetch blogs");

            const data = await res.json();
            setFilteredBlogs(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setFilteredBlogs({ data: [] }); 
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-center my-6">
                <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
                    className="p-3 w-80 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="ml-3 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                >
                    Search
                </button>
            </div>

            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Latest Blogs</h2>
            <BlogList blogs={filteredBlogs} />

        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const page = query.page ? parseInt(query.page as string, 10) : 1;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?page=${page}`, {
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
            props: { blogs: { data: [] } }, // Return empty array on failure
        };
    }
};

export default Home;
