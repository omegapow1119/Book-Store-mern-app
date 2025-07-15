import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";

const news = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
        "image": news1
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
        "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
        "image": news4
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
        "image": news2
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
        "image": news3
    },

    {
        "id": 5,
        "title": "Innovative New Smartphone Released by Leading Tech Company",
        "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
        "image": news2
    }
];

const News = () => {
    return (
        <section className="py-6 custom-630:py-4 px-4 custom-630:px-3 sm:py-6 sm:px-4 md:py-10 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 text-center sm:text-left animate-fade-in">
                News
            </h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {news.map((item, index) => (
                    <SwiperSlide key={index} className="animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg p-4">
                            {/* content */}
                            <div className="py-4 animate-fade-in-delayed">
                                <Link to="/">
                                    <h3 className="text-lg font-medium hover:text-blue-500 mb-4 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                </Link>
                                <div className="w-12 h-[4px] bg-primary mb-5"></div>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>

                            <div className="flex-shrink-0 animate-fade-in-delayed-more">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full max-w-[150px] sm:max-w-[200px] h-auto object-cover rounded-md hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles */}
            <style>
                {`
                    /* Animations */
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    .animate-fade-in-delayed {
                        animation: fadeIn 0.5s ease-out forwards;
                        animation-delay: 0.2s;
                        opacity: 0;
                    }
                    .animate-fade-in-delayed-more {
                        animation: fadeIn 0.5s ease-out forwards;
                        animation-delay: 0.4s;
                        opacity: 0;
                    }

                    /* Swiper Navigation Buttons */
                    .swiper-button-next, .swiper-button-prev {
                        color: #fff;
                        background: linear-gradient(145deg, #14b8a6, #0d9488);
                        border-radius: 50%;
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                        transition: all 0.3s ease;
                    }
                    .swiper-button-next:hover, .swiper-button-prev:hover {
                        background: linear-gradient(145deg, #0d9488, #14b8a6);
                        transform: scale(1.15) rotate(5deg);
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
                    }
                    .swiper-button-next:after, .swiper-button-prev:after {
                        font-size: 18px;
                    }
                    @media (max-width: 640px) {
                        .swiper-button-next, .swiper-button-prev {
                            width: 32px;
                            height: 32px;
                        }
                        .swiper-button-next:after, .swiper-button-prev:after {
                            font-size: 16px;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default News;