const Loading = () => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="mb-2 h-6 w-[120px] rounded bg-gray-50" />
          <ul className="relative flex flex-col gap-2 border-l border-gray-50 pl-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <div className="h-24 w-full max-w-4xl rounded bg-gray-100" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Loading;
