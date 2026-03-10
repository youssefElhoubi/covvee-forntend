import { Navbar } from '../components/ui/home/navBar';
import { Hero } from '../components/ui/home/hero';
import { TechStack } from '../components/ui/home/TechStack';
import { CTA } from '../components/ui/home/CTA';
import { Features } from '../components/ui/home/Features';
import { Footer } from '../components/ui/home/Footer';
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 font-sans">


            <Navbar />

            <main>
                <Hero />
                <TechStack />
                <Features />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}