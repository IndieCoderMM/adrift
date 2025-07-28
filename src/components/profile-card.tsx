import { usePuterStore } from "@/lib/puter";
import { MODELS } from "@/utils/constants";
import { useEffect, useRef } from "react";

type UserProfileCardProps = {
  userName?: string;
  onLogout: () => void;
};

const UserProfileCard = ({ userName, onLogout }: UserProfileCardProps) => {
  const ref = useRef<HTMLSelectElement>(null);
  const kv = usePuterStore((s) => s.kv);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const model = await kv.get("settings:model");
        if (model && ref.current) {
          ref.current.value = model;
        }
      } catch (error) {
        console.error("Failed to fetch model:", error);
      }
    };

    fetchModel();
  }, [kv]);

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value;
    try {
      await kv.set("settings:model", selectedModel);
      console.log(`Model changed to: ${selectedModel}`);
    } catch (error) {
      console.error("Failed to change model:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h2 className="text-fg text-xl font-semibold">
          {userName ? `Hello, ${userName}` : "Welcome"}
        </h2>
        <p className="text-sm text-gray-500">
          Manage your preferences and account
        </p>
      </div>

      <div className="border-border space-y-2 border-t-1 py-2">
        <label className="text-secondary block text-sm font-medium">
          Select Model:
        </label>
        <div className="border-border rounded-md border p-2">
          <select ref={ref} onChange={handleModelChange} className="w-full">
            {MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="mt-6 flex w-full cursor-pointer items-center justify-center text-lg text-red-500 underline"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserProfileCard;
