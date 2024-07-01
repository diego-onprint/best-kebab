const Hero = () => {
    return (
        <div className="relative w-full h-44 overflow-hidden">
            <picture className="w-full h-full object-cover">
                <source media="(min-width: 1024px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/hero-large-e1718890498941.jpg" />
                <source media="(max-width: 1023px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/hero-small-e1718890431426.jpg" />
                <img className="w-full h-full object-cover" src="https://resto-demo.ch/wp-content/uploads/2024/06/hero-large-e1718890498941.jpg" alt="" />
            </picture>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto p-2">
                <div className="rounded-full p-2 w-24 h-24 overflow-hidden flex items-center justify-center">
                    <picture>
                        <source type="image/webp" srcSet="/logo.webp" />
                        <source type="image/png" srcSet="/logo.png" />
                        <img className="w-full h-full object-contain" src="/logo.jpg" alt="" />
                    </picture>
                </div>
            </div>
        </div>
    )
}

export default Hero