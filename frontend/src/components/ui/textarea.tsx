export const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 ${className}`}
  />
);