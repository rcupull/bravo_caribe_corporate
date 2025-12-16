import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { useAuthSignUp } from "@/api/auth/useAuthSignUp";
import { useAuth } from "@/hooks/useAuth";
import { Formux } from "@/components/ui/formux";
import { HtmlTextContainer } from "@/components/ui/html-text-container";
import { FieldInputPassword } from "@/components/ui/field-input-password";
import { getRequiredLabel } from "@/utils/form";
import { FieldInput } from "@/components/ui/field-input";
import { useRouter } from "@/hooks/useRouter";
import { Link } from "@/components/link";
import { getHomeRoute, getSignInRoute } from "@/utils/routes";

interface State {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Page = () => {
  const { pushRoute } = useRouter();
  const { isAuthenticated } = useAuth();

  const { authSignUp } = useAuthSignUp();

  // Redirect if already authenticated
  if (isAuthenticated) {
    pushRoute(getHomeRoute());
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Regístrate
        </CardTitle>
        <CardDescription>
          Completa el formulario para registrarte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formux<State>
          value={{
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
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
            {
              field: "password",
              type: "custom",
              customCb: (value) => value?.length > 6,
              message: "La Contraseña debe tener mas de 6 letras o números",
            },
            {
              field: "confirmPassword",
              type: "equal",
              equalField: "password",
              message: "Las contraseñas no coinciden",
            },
            {
              field: "name",
              type: "required",
            },
          ]}
        >
          {({ value }) => {
            return (
              <form className="space-y-4">
                <FieldInput
                  label={getRequiredLabel("Nombre")}
                  placeholder="tu@correo.com"
                  name="name"
                />

                <FieldInput
                  label={getRequiredLabel("Correo Electrónico")}
                  placeholder="tu@correo.com"
                  name="email"
                />

                <FieldInputPassword
                  label={getRequiredLabel("Contraseña")}
                  name="password"
                />

                <FieldInputPassword
                  label={getRequiredLabel("Contraseña")}
                  name="confirmPassword"
                />

                <HtmlTextContainer className="flex justify-end mt-6">
                  <Link to={getSignInRoute()}>Iniciar Sesión</Link>
                </HtmlTextContainer>

                <div className="flex gap-2 justify-end">
                  <Button
                    formuxSubmit
                    className="w-full"
                    isLoading={authSignUp.isPending}
                    onClick={async () => {
                      const { email, password, name } = value;

                      authSignUp.fetch(
                        {
                          email,
                          password,
                          name,
                        },
                        {
                          onAfterSuccess: () => {
                            toast.success(
                              "¡Cuenta creada exitosamente!. Le enviamos un correo de validación a su buzón"
                            );
                            pushRoute(getHomeRoute(), {}, { timeout: 200 });
                          },
                          onAfterFailed: () => {
                            toast.error("Error al crear la cuenta");
                          },
                        }
                      );
                    }}
                  >
                    Registrarse
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
