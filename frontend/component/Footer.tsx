export default function Footer() {
    return (
        <div className="w-full flex flex-col justify-start items-start">
            {/* Main Footer Content */}
            <div className="self-stretch flex flex-col md:flex-row justify-between items-stretch">
                <div className="h-auto p-4 md:p-4 flex flex-col justify-start items-start gap-8">
                    {/* Brand Section */}
                    <div className="self-stretch flex justify-start items-center gap-3">
                        <div className="text-center text-[#49423D] text-xl font-semibold leading-4 font-sans">TalTranslate</div>
                    </div>
                </div>
            </div>
        </div>
    )
}