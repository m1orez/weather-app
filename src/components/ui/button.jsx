export function Button({ children, ...props }) {
  return (
    <button
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition"
      {...props}
    >
      {children}
    </button>
  );
}