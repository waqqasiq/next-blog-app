import React from "react";
import Link from "next/link";

interface PaginationProps {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

const Paginator: React.FC<PaginationProps> = ({ page, pageSize, pageCount, total }) => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-20">
            <Link
                href={`?page=${page - 1}`}
                className={`px-4 py-2 border rounded-lg ${
                    page > 1 ? "bg-white hover:bg-gray-100" : "bg-gray-200 cursor-not-allowed pointer-events-none"
                }`}
            >
                ⬅ Previous
            </Link>

            <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Page <strong>{page}</strong> of <strong>{pageCount}</strong> ({total} results)
            </span>

            <Link
                href={`?page=${page + 1}`}
                className={`px-4 py-2 border rounded-lg ${
                    page < pageCount ? "bg-white hover:bg-gray-100" : "bg-gray-200 cursor-not-allowed pointer-events-none"
                }`}
            >
                Next ➡
            </Link>
        </div>
    );
};

export default Paginator;
