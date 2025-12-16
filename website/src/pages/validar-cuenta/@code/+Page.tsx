import { useAuthSignIn } from "@/api/auth/useAuthSignIn";
import { useAuthValidate } from "@/api/auth/useAuthValidate";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/hooks/useRouter";
import { wait } from "@/utils/general";
import { getHomeRoute, getSignInRoute } from "@/utils/routes";
import { useEffect, useState } from "react";

export const Page = () => {
  const { params, pushRoute } = useRouter();

  const [status, setStatus] = useState<
    "validating" | "success" | "redirect" | "error"
  >("validating");

  const { isAuthenticated } = useAuth();
  const { authSignIn } = useAuthSignIn();

  const { authValidate } = useAuthValidate();

  const { code } = params;

  const handleProcess = async (code: string) => {
    authValidate.fetch(
      { code },
      {
        onAfterSuccess: async ({ email }) => {
          setStatus("success");

          await wait(1500);

          authSignIn.fetch(
            { email, password: code },
            {
              onAfterSuccess: async () => {
                setStatus("redirect");
                await wait(1000);
                pushRoute(getHomeRoute());
              },
            }
          );
        },
        onAfterFailed: async () => {
          setStatus("error");
          await wait(2500);

          pushRoute(isAuthenticated ? getHomeRoute() : getSignInRoute());
        },
      }
    );
  };

  useEffect(() => {
    if (code) handleProcess(code);
  }, [code]);

  return (
    <div className="h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
        {status === "validating" && (
          <>
            <Spinner className="size-16" />
            <p>Activando cuenta…</p>
          </>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              ✓
            </div>
            <h2 className="text-xl font-bold text-green-700">
              Cuenta activada
            </h2>
            <p className="text-muted-foreground">
              Tu cuenta ha sido activada correctamente
            </p>
          </div>
        )}

        {status === "redirect" && (
          <>
            <Spinner className="size-12" />
            <p>Redireccionando…</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">
              ✕
            </div>
            <p className="text-muted-foreground">
              El enlace de activación no es válido o ha expirado.
              <br />
              Por favor inicia sesión o contacta con soporte.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
