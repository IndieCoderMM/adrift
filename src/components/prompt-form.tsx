const PromptForm = () => {
  const prompt = "When did I last phone a friend?";
  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-2xl capitalize">{prompt}</h2>
        <button
          type="button"
          className="text-secondary cursor-pointer text-sm italic underline"
        >
          Skip
        </button>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col py-1">
          <input
            type="datetime-local"
            className="text-2xl"
            name="calendar"
            required
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="emotion">How did you feel at this time?</label>
          <input
            type="range"
            name="emotion"
            id="emotion"
            min={0}
            max={5}
            className="accent-fg"
          />
        </div>
        <div className="flex flex-col py-1">
          <textarea
            name="note"
            rows={5}
            className="border-muted resize-y rounded border p-2 text-xl focus:outline-none"
            placeholder="Write one memorable about this time..."
            required
          ></textarea>
        </div>

        <div className="mt-8 flex w-full justify-end">
          <button
            type="submit"
            className="bg-fg text-bg cursor-pointer rounded-full px-4 py-2 hover:brightness-125"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
