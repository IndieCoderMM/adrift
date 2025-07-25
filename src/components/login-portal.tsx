"use client";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { Portal } from "./ui/portal";

const LoginPortal = () => {
  const openLogin = useAppStore((s) => s.openLogin);
  const isLoading = usePuterStore((s) => s.isLoading);
  const auth = usePuterStore((s) => s.auth);

  if (!openLogin) return null;

  return (
    <Portal>
      <main className="fixed inset-0 flex w-full items-center justify-center bg-black/50">
        <section className="flex flex-col gap-8 rounded-2xl bg-white p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-semibold">Welcome</h1>
            <h2 className="text-2xl">Log in to continue</h2>
          </div>
          <div className="flex text-center">
            {isLoading ? (
              <span className="">Signing you in...</span>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="btn w-full" onClick={auth.signOut}>
                    Log Out
                  </button>
                ) : (
                  <button className="btn w-full" onClick={auth.signIn}>
                    Log In
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </Portal>
  );
};

export default LoginPortal;
