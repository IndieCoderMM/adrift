const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="p-2"></div>
      <div className="flex w-full flex-col gap-2">
        <button type="button" className="btn">
          Memory Portal
        </button>
        <button type="button" className="btn">
          Emotion Analysis
        </button>
        <button type="button" className="btn">
          Mood Timeline
        </button>
        <button type="button" className="btn">
          Jump to Date
        </button>
        <button type="button" className="btn">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
