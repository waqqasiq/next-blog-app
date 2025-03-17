import { GetServerSideProps } from "next";
import BlogList from "../components/BlogList";

const Home = ({ blogs }: { blogs: any[] }) => {
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);

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
