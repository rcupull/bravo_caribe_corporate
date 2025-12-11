import { useAuthForgotPasswordValidate } from "@/api/auth/useAuthForgotPasswordValidate";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldInputPassword } from "@/components/ui/field-input-password";
import { Formux } from "@/components/ui/formux";
import { HtmlTextContainer } from "@/components/ui/html-text-container";
import { useRouter } from "@/hooks/useRouter";
import { getRequiredLabel } from "@/utils/form";
import { UserCircle } from "lucide-react";

export let Page = () => {
  const { params } = useRouter();
  const { code } = params;

  const { authForgotPasswordValidate } = useAuthForgotPasswordValidate();

  const { email } = authForgotPasswordValidate.data || {};

  if (authForgotPasswordValidate.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Contraseña restablecida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HtmlTextContainer>
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
          </HtmlTextContainer>
          <Button
            stopPropagation
            // onClick={() =>
            //   // pushRoute(getSignInRoute(), getFlattenJson({ phone, email }), {
            //   //   replace: true,
            //   // })
            // }
            className="w-full"
          >
            Iniciar sesión(TODO)
          </Button>
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
        <CardDescription>
          Escribe tu nueva contraseña para recuperar tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formux
          value={{ newPassword: "", newPasswordAgain: "" }}
          validate={[
            {
              field: "newPassword",
              type: "required",
            },
            {
              field: "newPassword",
              type: "custom",
              customCb: (value) => value?.length > 6,
              message: "La contraseña debe tener mas de 6 letras o números",
            },
            {
              field: "newPasswordAgain",
              type: "required",
            },
            {
              field: "newPasswordAgain",
              type: "equal",
              equalField: "newPassword",
              message: "Las dos contraseña deben ser iguales",
            },
          ]}
        >
          {({ value }) => {
            return (
              <form className="flex flex-col gap-8">
                <FieldInputPassword
                  name="newPassword"
                  autoFocus
                  autoFocusDelay={300}
                  placeholder={getRequiredLabel("Nueva contraseña")}
                />

                <FieldInputPassword
                  name="newPasswordAgain"
                  placeholder={getRequiredLabel("Confirmar contraseña")}
                />

                <Button
                  isLoading={authForgotPasswordValidate.isPending}
                  stopPropagation
                  formuxSubmit
                  onClick={() => {
                    if (!code) return;

                    const { newPassword } = value;

                    authForgotPasswordValidate.fetch({ code, newPassword });
                  }}
                  className="w-full"
                >
                  Restablecer
                </Button>
              </form>
            );
          }}
        </Formux>
      </CardContent>
    </Card>
  );
};
