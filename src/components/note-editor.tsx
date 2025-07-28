import { usePuterStore } from "@/lib/puter";
import { getEntryKey } from "@/utils/storage";
import { cn } from "@/utils/tailwind";
import { useState } from "react";
import { toast } from "react-toastify";

const PersonalNoteEditor = ({ entry }: { entry: TimeEntry }) => {
  const [editing, setEditing] = useState(false);
  const kv = usePuterStore((s) => s.kv);

  const updateEntry = async (note: string) => {
    if (!entry.id) return;
    try {
      setEditing(true);
      const updatedEntry = { ...entry, note };
      await kv.set(getEntryKey(entry.id), JSON.stringify(updatedEntry));
    } catch (err) {
      console.error("Failed to update entry:", err);
    } finally {
      setEditing(false);
    }
  };

  const toastedUpdate = (note: string) =>
    toast.promise(() => updateEntry(note), {
      pending: "Saving your note...",
      success: "Note updated successfully!",
      error: "Failed to update note. Please try again.",
    });

  const handleEdit = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }
    const noteElement = document.getElementById("note") as HTMLTextAreaElement;
    if (noteElement) {
      await toastedUpdate(noteElement.value);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="note"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Personal Note
        </label>
        <button
          onClick={handleEdit}
          className={cn(
            "cursor-pointer px-2 text-sm text-indigo-600 hover:underline",
            editing && "text-accent",
          )}
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>
      <textarea
        id="note"
        className={cn(
          "min-h-[120px] w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:outline-none",
          editing && "border-accent shadow-sm",
        )}
        defaultValue={entry.note}
        readOnly={!editing}
      />
    </div>
  );
};

export default PersonalNoteEditor;
