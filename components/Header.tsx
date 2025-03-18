import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">DevLog</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
