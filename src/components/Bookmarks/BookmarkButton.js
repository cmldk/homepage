export default function BookmarkButton({ children, className, onClick }) {
  return (
    <div
      className={`inline-block border border-gray-300 dark:border-gray-600 text-xl font-bold text-dark dark:text-gray-400 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 ${
        className ?? ''
      }`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
}
