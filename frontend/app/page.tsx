'use client'
import Image from 'next/image';
import Header from '../component/header';
import HeroSection from '@/component/HeroSection';
import VideoSection from '@/component/VideoSection';
import FeaturesSection from '@/component/FeaturesSection';
import CtaSection from '@/component/CtaSction';
import Footer from '@/component/Footer';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function TranslationPlatform() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection/>
        
        <ContainerScroll
           titleComponent={
            <>
              
            </>
          }
        >
          {/* Video Section */}
          <VideoSection/>
        </ContainerScroll>

        {/* Features Section */}
        <FeaturesSection/>

        {/* Cta Sectio */}
        <CtaSection/>

        {/* Footer */}
        <Footer/>

      </main>
    </div>
  );
}