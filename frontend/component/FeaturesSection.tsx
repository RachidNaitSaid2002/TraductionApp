import Link from 'next/link';
import Image from 'next/image';

export default function FeaturesSection() {
    return (
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#e4d9ec]">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 lg:px-5">
                {/* Header */}
                <div className="mx-auto text-center max-w-2xl mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                    <h1 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black">
                        <span className='text-[#7201a8]'>Tal </span>
                        <span className='hidden sm:inline'>Translate Features</span>
                        <span className='sm:hidden'>Translate</span>
                    </h1>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 lg:items-start">
                    
                    {/* Left Column - Content */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6">
                        <h2 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-[#7201a8] text-center lg:text-left">
                            Start-up Marocaine spécialisée dans l'e-commerce
                        </h2>

                        <div className="text-black space-y-2 sm:space-y-3 text-sm sm:text-base text-center lg:text-left">
                            <p>
                                TalTranslate prépare son expansion aux États-Unis avec une solution de traduction adaptée aux besoins spécifiques de vos équipes.
                            </p>
                            <p>
                                Deux équipes sont directement concernées : le marketing pour les fiches produits FR→EN, et le service client pour les tickets EN→FR.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <Link 
                                href="/signup" 
                                className="px-6 h-10 sm:h-11 flex items-center rounded-lg bg-[#7201a8] text-white text-sm font-medium transition ease-linear hover:bg-[#5a0080] active:bg-gray-900"
                            >
                                S'inscrire
                            </Link>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                            <div className="text-center lg:text-left">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-[#7201a8]">
                                    Rapide
                                </h3>
                                <span className="text-xs sm:text-sm text-gray-600">Traduction</span>
                            </div>
                            <div className="text-center lg:text-left">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-[#7201a8]">
                                    +500
                                </h3>
                                <span className="text-xs sm:text-sm text-gray-600">Produits/Jour</span>
                            </div>
                            <div className="text-center lg:text-left">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-[#7201a8]">
                                    24/7
                                </h3>
                                <span className="text-xs sm:text-sm text-gray-600">Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Image */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 flex justify-center items-center order-first md:order-none lg:order-none">
                        <div className="w-full max-w-sm md:max-w-md lg:max-w-full">
                            <Image 
                                src="/images/translate (1).png" 
                                width={1240} 
                                height={1376} 
                                alt="Traduction IA pour e-commerce" 
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column - Feature Cards */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                        {[
                            {
                                icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
                                title: "Traduction Marketing",
                                description: "Traduction rapide et précise des fiches produits du français vers l'anglais pour le marché américain."
                            },
                            {
                                icon: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z",
                                title: "Support Client Bilingue",
                                description: "Traitement efficace des tickets de support client de l'anglais vers le français pour une communication fluide."
                            },
                            {
                                icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
                                title: "Expansion Simplifiée",
                                description: "Outils intégrés pour faciliter votre expansion sur le marché américain sans barrière linguistique."
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <span className="min-w-max text-[#7201a8] p-2 sm:p-3 rounded-lg bg-gray-200 border border-gray-100/70 flex-shrink-0">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                    </svg>
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#7201a8] text-base sm:text-lg">
                                        {feature.title}
                                    </h3>
                                    <p className="text-black text-xs sm:text-sm text-justify">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}