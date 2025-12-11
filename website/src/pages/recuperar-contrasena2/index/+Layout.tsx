import { AuthPageContainer } from 'components/auth-page-container';
import { LayoutTemplate } from 'components/layout-template';

import { ChildrenProp } from 'market-ui';

export const Layout = ({ children }: ChildrenProp) => (
  <LayoutTemplate>
    <AuthPageContainer
      label={
        <>
          ¿Olvidaste <br /> tu contraseña?
        </>
      }
      topMessage="Se le enviará un enlace de recuperación a su teléfono"
    >
      {children}
    </AuthPageContainer>
  </LayoutTemplate>
);
