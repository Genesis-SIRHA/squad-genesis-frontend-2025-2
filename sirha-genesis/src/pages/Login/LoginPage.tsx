import { FC } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export const LoginPage: FC = () => {
  return (
      <div className="min-h-screen bg-pattern bg-cover bg-center bg-no-repeat">
          <LoginForm/>
      </div>
  );
};
