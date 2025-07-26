"use client";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { Portal } from "./ui/portal";

const LoginPortal = () => {
  const openLogin = useAppStore((s) => s.openLogin);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  const isLoading = usePuterStore((s) => s.isLoading);
  const auth = usePuterStore((s) => s.auth);

  if (!openLogin) return null;

  return (
    <Portal>
      <main className="fixed inset-0 flex w-full items-center justify-center bg-black/50">
        <section className="relative flex min-w-sm flex-col gap-8 rounded-2xl bg-white p-10">
          <button
            type="button"
            className="absolute top-2 right-2 cursor-pointer text-3xl"
            onClick={() => setOpenLogin(false)}
          >
            &times;
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
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-3xl font-semibold">Welcome</h1>
                    <h2 className="text-2xl">Log in to continue</h2>
                  </div>
                  <button className="btn w-full" onClick={auth.signIn}>
                    Log In
                  </button>
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
