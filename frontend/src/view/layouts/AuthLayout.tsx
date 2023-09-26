import ilustration from '../../assets/ilustration.png';

export function AuthLayout() {
    return(
        <div className="flex w-full h-full">
            <div className="w-1/2 h-full"></div>

            <div className="w-1/2 h-ful flex justify-center items-center p-8 relative">
                <img
                    src={ilustration}
                    className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none
                    rounded-[32px]"
                    alt=""
                />

                <div className="max-w-[656px] bg-white bottom-8 p-10 absolute rounded-b-[32px]">
                    <p className="text-gray-700 font-medium text-">
                        Gerencie suas finanças pessoais de uma forma simples
                        com o fincheck, e o melhor, totalmente de graça!
                    </p>
                </div>
            </div>
        </div>
    );
}
