import { useSwitchPhoneOrEmail } from 'hooks/useSwitchPhoneOrEmail';

import {
  Button,
  FieldInputEmail,
  FieldInputPhone,
  Formux,
  IconFlower,
  useAuthForgotPasswordRequest
} from 'market-ui';
import { getRequiredLabel } from 'utils/form';

export const Page = () => {
  const { authForgotPasswordRequest } = useAuthForgotPasswordRequest();

  const { switchField, inputMethod } = useSwitchPhoneOrEmail();

  if (authForgotPasswordRequest.data) {
    if (inputMethod === 'phone') {
      return (
        <div className="flex flex-col items-center gap-4">
          <IconFlower />

          <p className="text-xl font-semibold text-center">
            Se ha enviado un SMS con un enlace de verificación a su teléfono
          </p>
        </div>
      );
    }

    if (inputMethod === 'email') {
      return (
        <div className="flex flex-col items-center gap-4">
          <IconFlower />

          <p className="text-xl font-semibold text-center">
            Se ha enviado un correo con un enlace de verificación a su buzón de correos electrónicos
          </p>
        </div>
      );
    }
  }

  return (
    <Formux
      value={{ phone: '', email: '' }}
      validate={[
        inputMethod === 'phone' && {
          field: 'phone',
          type: 'required'
        },
        inputMethod === 'phone' && {
          field: 'phone',
          type: 'phone'
        },
        inputMethod === 'email' && {
          field: 'email',
          type: 'required'
        },
        inputMethod === 'email' && {
          field: 'email',
          type: 'email'
        }
      ]}
    >
      {({ value }) => {
        return (
          <form className="flex flex-col gap-8">
            {switchField({
              phoneElement: (
                <FieldInputPhone
                  id="phone"
                  name="phone"
                  autoFocus
                  autoFocusDelay={300}
                  placeholder={getRequiredLabel('Teléfono')}
                />
              ),
              emailElement: (
                <FieldInputEmail
                  id="email"
                  name="email"
                  autoFocus
                  autoFocusDelay={300}
                  placeholder={getRequiredLabel('Correo')}
                />
              )
            })}

            <Button
              label="Recuperar contraseña"
              stopPropagation
              isBusy={authForgotPasswordRequest.status.isBusy}
              formuxSubmit
              onClick={() => {
                const { phone, email } = value;
                authForgotPasswordRequest.fetch({
                  phone: inputMethod === 'phone' ? phone : undefined,
                  email: inputMethod === 'email' ? email : undefined
                });
              }}
              className="w-full"
            />
          </form>
        );
      }}
    </Formux>
  );
};
