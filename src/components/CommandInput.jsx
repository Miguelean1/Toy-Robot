import { useState } from "react";

export default function CommandInput({ onCommand }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim().toUpperCase());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="PLACE_ROBOT 1,1,NORTH"
        className="flex-1 rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        Run
      </button>
    </form>
  );
}
