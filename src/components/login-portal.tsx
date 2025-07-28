"use client";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { APP_FEATURES } from "@/utils/constants";
import { IconCircleCheck, IconLogin2, IconX } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { Portal } from "./ui/portal";

const LoginPortal = () => {
  const openLogin = useAppStore((s) => s.openLogin);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  const isLoading = usePuterStore((s) => s.isLoading);
  const auth = usePuterStore((s) => s.auth);

  const handleLogin = async () => {
    if (auth.isAuthenticated) {
      setOpenLogin(false);
      return;
    }
    try {
      await auth.signIn();
      setOpenLogin(false);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to log in.");
    }
  };

  if (!openLogin) return null;

  return (
    <Portal>
      <main className="fixed inset-0 flex w-full items-center justify-center bg-black/50">
        <section className="relative flex min-w-sm flex-col gap-8 rounded-2xl bg-white p-10">
          <button
            type="button"
            className="hover:text-accent absolute top-2 right-2 cursor-pointer text-3xl"
            onClick={() => setOpenLogin(false)}
          >
            <IconX className="size-6" />
          </button>

          {isLoading ? (
            <span className="">Signing you in...</span>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-3xl font-semibold">
                      {auth.user?.username}
                    </h1>
                  </div>
                  <button className="btn w-full" onClick={auth.signOut}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <div className="w-ful max-w-md">
                    <h1 className="font-body mb-2 text-center text-4xl font-extrabold tracking-tight">
                      Adrift.
                    </h1>
                    <h2 className="text-fg/90 font-head mb-2 text-center text-2xl font-semibold">
                      Smart Journal for Emotional Clarity
                    </h2>
                    <p className="text-secondary mb-6 max-w-sm text-center text-sm">
                      Let AI help you reflect, process emotions, and find
                      clarity in your daily life.
                    </p>
                    <ul className="text-fg/80 mb-6 space-y-2 text-sm">
                      {APP_FEATURES.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <IconCircleCheck className="mt-1 size-4 stroke-1 text-green-800" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn w-full !border-b-2"
                      onClick={handleLogin}
                    >
                      <IconLogin2 className="mr-2 size-8 stroke-1" />
                      <span className="font-semibold">Log In</span>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </Portal>
  );
};

export default LoginPortal;
