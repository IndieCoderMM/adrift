const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="p-2"></div>
      <div className="flex w-full flex-col gap-2">
        <button
          type="button"
          className="border-border rounded border border-b-2 p-2"
        >
          Memory Portal
        </button>
        <button
          type="button"
          className="border-border rounded border border-b-2 p-2"
        >
          Emotion Analysis
        </button>
        <button
          type="button"
          className="border-border rounded border border-b-2 p-2"
        >
          Mood Timeline
        </button>
        <button
          type="button"
          className="border-border rounded border border-b-2 p-2"
        >
          Jump to Date
        </button>
        <button
          type="button"
          className="border-border rounded border border-b-2 p-2"
        >
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
