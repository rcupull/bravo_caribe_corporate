import { AuthPageContainer } from 'components/auth-page-container';
import { LayoutTemplate } from 'components/layout-template';

import { ChildrenProp } from 'market-ui';

export const Layout = ({ children }: ChildrenProp) => (
  <LayoutTemplate>
    <AuthPageContainer
      label={
        <>
          Restablecer <br /> contraseña
        </>
      }
    >
      {children}
    </AuthPageContainer>
  </LayoutTemplate>
);
