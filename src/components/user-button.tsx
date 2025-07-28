"use client";

import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

const UserButton = () => {
  const init = usePuterStore((s) => s.init);
  const auth = usePuterStore((s) => s.auth);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <div className="flex items-center gap-2">
        {auth.isAuthenticated ? (
          <button
            className="hover:text-accent cursor-pointer font-medium transition"
            onClick={() => setOpenLogin(true)}
          >
            {auth.user?.username}
          </button>
        ) : (
          <button
            type="button"
            className="hover:text-accent cursor-pointer p-2 italic underline transition"
            onClick={() => setOpenLogin(true)}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default UserButton;
