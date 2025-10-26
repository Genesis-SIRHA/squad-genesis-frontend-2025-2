
export const Header = () =>{

    return(
        <header className="flex flex-row justify-between items-center top-0 right-0 px-8 py-4">
            <p className="text-primary-smoke font-bold text-xl">
                Mantente Motivado
            </p>
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                    <p className="text-primary-smoke font-bold text-right">Laura Ximena Martinez Parrado</p>
                    <p className="text-primary-smoke text-right">Ingenieria de sistemas</p>
                </div>

                <img className="w-12" src="public/images/user-profile.svg" alt="basic_user_foto" />
            </div>



        </header>
    );
};
