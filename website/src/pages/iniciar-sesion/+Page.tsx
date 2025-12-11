import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthSignIn } from "@/api/auth/useAuthSignIn";
import { setPersistentAuthData } from "@/utils/persistent-auth";
import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { getRequiredLabel } from "@/utils/form";
import { FieldInputPassword } from "@/components/ui/field-input-password";
import { HtmlTextContainer } from "@/components/ui/html-text-container";
import { useRouter } from "@/hooks/useRouter";
import { Link } from "@/components/link";
import {
  getHomeRoute,
  getRecoveryPasswordRoute,
  getSignInRoute,
  getSignUpRoute,
} from "@/utils/routes";

interface State {
  email: string;
  password: string;
}

export const Page = () => {
  const { isAuthenticated } = useAuth();
  const { pushRoute } = useRouter();

  const { setData } = useAuth();

  const { authSignIn } = useAuthSignIn();

  if (isAuthenticated) {
    pushRoute(getHomeRoute());
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Iniciar Sesión
        </CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
      </CardHeader>
      <CardContent>
        <Formux<State>
          value={{
            email: "",
            password: "",
          }}
          validate={[
            {
              field: "email",
              type: "required",
            },
            {
              field: "email",
              type: "email",
            },
            {
              field: "password",
              type: "required",
            },
          ]}
        >
          {({ value }) => {
            return (
              <form className="space-y-4">
                <FieldInput
                  id="login-email"
                  label={getRequiredLabel("Correo Electrónico")}
                  placeholder="tu@correo.com"
                  name="email"
                />

                <FieldInputPassword
                  id="login-password"
                  label={getRequiredLabel("Contraseña")}
                  name="password"
                />

                <HtmlTextContainer className="flex justify-between mt-6">
                  <Link to={getRecoveryPasswordRoute()}>Recuperar Cuenta</Link>
                  <Link to={getSignUpRoute()}>Registrarse</Link>
                </HtmlTextContainer>

                <div className="flex gap-2 justify-end">
                  <Button
                    formuxSubmit
                    className="w-full"
                    isLoading={authSignIn.isPending}
                    onClick={async () => {
                      const { email, password } = value;

                      authSignIn.fetch(
                        {
                          email,
                          password,
                        },
                        {
                          onAfterSuccess: (response) => {
                            const { accessToken, refreshToken, steat, user } =
                              response;

                            setData(user);
                            setPersistentAuthData({
                              accessToken,
                              refreshToken,
                              steat,
                            });

                            toast.success("¡Bienvenido!");
                            pushRoute(getHomeRoute());
                          },
                          onAfterFailed: () => {
                            toast.error("Error al iniciar sesión");
                          },
                        }
                      );
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </form>
            );
          }}
        </Formux>
      </CardContent>
    </Card>
  );
};
