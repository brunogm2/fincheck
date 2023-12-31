import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
    const { sliderState, setSliderState, windowWidth } = useAccountsController();

    console.log({windowWidth});
    

    return(
        <div className="bg-teal-900 rounded-2xl h-full md:p-10 px-4 py-8 flex flex-col">
            <div>
                <span className="text-white tracking-[-0.5px] block">Saldo total</span>

                <div className="flex flex-row gap-2">
                    <strong className="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>

                    <button className="h-8 w-8 flex items-center justify-center">
                        <EyeIcon open/>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
                <div>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={windowWidth >= 500 ? 2.2 : 1.2}
                        onSlideChange={swiper => {
                            setSliderState({
                                isBeginning: swiper.isBeginning,
                                isEnd: swiper.isEnd
                            })
                        }}
                    >
                        <div className="flex items-center justify-between mb-4" slot="container-start">
                            <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

                            <SliderNavigation 
                                isBeginning={sliderState.isBeginning}
                                isEnd={sliderState.isEnd}
                            />
                        </div>

                        <SwiperSlide>
                            <AccountCard 
                                color="#7950F2"
                                name="Nubank"
                                balance={1000.23}
                                type="CHECKING"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard 
                                color="#7950F2"
                                name="XP"
                                balance={1000.23}
                                type="INVESTMENT"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard 
                                color="#0f0"
                                name="Carteira"
                                balance={1000.23}
                                type="CASH"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}