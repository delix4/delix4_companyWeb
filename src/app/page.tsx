export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black font-sans">
      <main className="flex flex-col items-center gap-6 bg-white dark:bg-gray-900 p-10 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Welcome to Delix4
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-sm">
          We are building innovative solutions for your business. Edit{" "}
          <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">page.tsx</code> to get started.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://delix4.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
          >
            Visit Website
          </a>
          
        </div>
      </main>
    </div>
  );
}
