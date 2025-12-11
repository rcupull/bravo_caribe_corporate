import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { Formux } from "@/components/ui/formux";
import { getRequiredLabel } from "@/utils/form";
import { FieldInput } from "@/components/ui/field-input";
import { useAuthForgotPasswordRequest } from "@/api/auth/useAuthForgotPasswordRequest";

interface State {
  email: string;
}

export let Page = () => {
  const { authForgotPasswordRequest } = useAuthForgotPasswordRequest();

  if (authForgotPasswordRequest.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Recuperar cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          Se ha enviado un correo con un enlace de verificación a su buzón de
          correos electrónicos
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Recuperar cuenta
        </CardTitle>
        <CardDescription>Escribe tu email y recupera tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <Formux<State>
          value={{
            email: "",
          }}
          validate={[
            {
              field: "email",
              type: "required",
            },
          ]}
        >
          {({ value }) => {
            return (
              <form className="space-y-4">
                <FieldInput
                  id="email"
                  name="email"
                  autoFocus
                  autoFocusDelay={300}
                  placeholder={getRequiredLabel("Correo")}
                />

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    stopPropagation
                    isLoading={authForgotPasswordRequest.isPending}
                    formuxSubmit
                    onClick={() => {
                      const { email } = value;
                      authForgotPasswordRequest.fetch({
                        email,
                      });
                    }}
                    className="w-full"
                  >
                    Recuperar cuenta
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
