export default function SearchInput({ className, onChange, placeholder }) {
  return (
    <div className={`flex ${className ?? ''}`}>
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm select-none text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-portakal focus:border-portakal dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-light dark:focus:border-portakal"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
