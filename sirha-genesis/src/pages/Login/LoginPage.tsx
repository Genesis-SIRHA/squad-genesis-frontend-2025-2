import type {FC} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className="h-screen bg-pattern bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col items-center justify-center h-full">
                {/* Contenedor principal */}
                <div className=" flex flex-row w-full max-w-md border rounded-md p-md shadow-md">
                    <div className="w-1/2 p-md bg-white">
                        <LoginForm />
                    </div>
                    <div className="w-1/2 p-md">
                        <img src = "/login-image.svg"> </img>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginPage
