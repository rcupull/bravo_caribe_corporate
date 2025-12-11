import {
  Button,
  FieldInputPassword,
  Formux,
  getFlattenJson,
  getStrongPasswordTracking,
  GreenMessage,
  IconFlower,
  useAuthForgotPasswordValidate,
  useRouterVike
} from 'market-ui';
import { getSignInRoute } from 'utils/business';
import { getRequiredLabel } from 'utils/form';

export const Page = () => {
  const { params, pushRoute } = useRouterVike();

  const { authForgotPasswordValidate } = useAuthForgotPasswordValidate();
  const { code } = params;

  const { phone, email } = authForgotPasswordValidate.data || {};

  if (phone || email) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <GreenMessage
            svg={IconFlower}
            label="Contraseña restablecida"
            message="Su contraseña ha sido restablecida exitosamente"
          />

          <Button
            stopPropagation
            label="Iniciar sesión"
            onClick={() =>
              pushRoute(getSignInRoute(), getFlattenJson({ phone, email }), { replace: true })
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <Formux
      value={{ newPassword: '', newPasswordAgain: '' }}
      validate={[
        {
          field: 'newPassword',
          type: 'required'
        },
        {
          field: 'newPassword',
          type: 'custom',
          customCb: (value) => getStrongPasswordTracking(value).valid,
          message: 'Contraseña inválida'
        },
        {
          field: 'newPasswordAgain',
          type: 'required'
        },
        {
          field: 'newPasswordAgain',
          type: 'equal',
          equalField: 'newPassword',
          message: 'Las dos contraseña deben ser iguales'
        }
      ]}
    >
      {({ value }) => {
        return (
          <form className="flex flex-col gap-8">
            <FieldInputPassword
              showPasswordRequirements
              name="newPassword"
              autoFocus
              autoFocusDelay={300}
              placeholder={getRequiredLabel('Nueva contraseña')}
            />

            <FieldInputPassword
              name="newPasswordAgain"
              placeholder={getRequiredLabel('Confirmar contraseña')}
            />

            <Button
              label="Restablecer"
              isBusy={authForgotPasswordValidate.status.isBusy}
              stopPropagation
              formuxSubmit
              onClick={() => {
                if (!code) return;

                const { newPassword } = value;

                authForgotPasswordValidate.fetch({ code, newPassword });
              }}
              className="w-full"
            />
          </form>
        );
      }}
    </Formux>
  );
};
