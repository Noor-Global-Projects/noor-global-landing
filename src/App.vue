<template>
  <div class="h-full relative">

    <div class=" bg-[#F0F1F3] relative overflow-hidden h-full " >
  
        <!-- Background images -->
        <img 
          src="/left-cloud.png" 
          alt="" 
          class="absolute sm:bottom-[850px] bottom-[770px] left-6 animate-slide-in-left z-40  sm:block hidden"
        />
        <img 
          src="/right-cloud.png" 
          alt="" 
          class="absolute sm:bottom-[850px] bottom-[840px] right-6 animate-slide-in-right z-40 sm:block hidden"
        />
        <img src="/bb.svg" alt="" class="absolute bottom-[705px]  left-6 w-[88%]   animate-slide-in-left z-40 sm:hidden block">
        <img src="/bb.svg" alt="" class="absolute bottom-[735px]  right-6 w-[88%] animate-slide-in-right z-40 sm:hidden block rotate-90">

        <img src="/blu.png" alt="" class="absolute sm:bottom-[800px] bottom-[755px]  z-40">

        
        
        <div class="relative  m-4 mb-0 p-2 pb-0  rounded-t-[20px] gradient-border-top " 
          
        >
          <div class="relative    h-full    rounded-t-[12px] "
                      style="box-shadow: inset 0 22px 40px #F0F1F3;"
  
          >
            <div  class="absolute inset-0  animate-water-float blur-[40px]">
              <canvas ref="backgroundCanvas" style="height:100%;width:100%;" data-paper-shaders="true"></canvas>
            </div>
                  <!-- Navigation -->
                   <div class="max-w-[1920px] mx-auto">

                      <!-- Landing Page  -->

                         
                        <nav
                          ref="navElement"
                          class="fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-500 ease-in-out bg-transparent max-w-[1920px] mx-auto"
                          :class="{ 
                            'nav-fade-up': isNavHidden,
                            'nav-fade-down': !isNavHidden 
                          }"
                        >
                                  <div class="relative mx-auto px-[20px] sm:py-[20px] py-3 ">
                            <div class="flex justify-between items-start h-16 sm:h-20 sm:pl-6 py-6 sm:pr-16 pr-2">
                              <img v-if="locale !== 'ar'" src="/1.8.svg" alt="Noor Global" class=" ml-4 sm:mr-0 mr-4 sm:w-[110px] w-[80px]  object-contain" />
                              <img v-if="locale === 'ar'" src="/1.9.svg" alt="Noor Global" class=" ml-4 sm:mr-0 mr-4 sm:w-[110px] w-[60px]  object-contain" />


                              <div class="flex items-center sm:mt-2 gap-2">
                                <div class=" language-selector-container">
                           <!-- Language Selector -->
                           <div class="relative">
                             <!-- Language Button -->
                             <button
                               @click.stop="isLanguageDropdownOpen = !isLanguageDropdownOpen"
                               class="hidden sm:flex items-center gap-2 md:gap-3 p-1 "
                               style="
                                    border: 2px solid rgb(255, 255, 255);
                                    backdrop-filter: blur(10px);
                                    background-color: rgba(255, 255, 255, 0.5);
                                    border-radius: 167px;
                                    box-shadow: rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px;
                                    opacity: 1;
                                  "
                             >
                               <img :src="`/${selectedLanguage.flag}`" :alt="selectedLanguage.name" class="w-6 h-6 md:w-8 md:h-8 object-cover rounded-full" />
                               <span class="text-[#2A2A2A] font-medium text-sm md:text-base hidden sm:inline">{{ selectedLanguage.name }}</span>
                               <svg 
                                 class="w-3 h-3 md:w-4 md:h-4 text-[#2A2A2A] transition-transform duration-200 hidden sm:inline"
                                 :class="{ 'rotate-180': isLanguageDropdownOpen }"
                                 fill="none" 
                                 stroke="currentColor" 
                                 viewBox="0 0 24 24"
                               >
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                               </svg>
                             </button>

                             <button
                               @click.stop="isLanguageDropdownOpen = !isLanguageDropdownOpen"
                               class="flex sm:hidden items-center"
                            
                             >
                               <img :src="`/${selectedLanguage.flag}`" :alt="selectedLanguage.name" class="w-8 h-8 object-cover rounded-full" />
                               
                             </button>
   
                             <!-- Dropdown Menu -->
                             <transition
                               enter-active-class="transition ease-out duration-200"
                               enter-from-class="opacity-0 translate-y-2"
                               enter-to-class="opacity-100 translate-y-0"
                               leave-active-class="transition ease-in duration-150"
                               leave-from-class="opacity-100 translate-y-0"
                               leave-to-class="opacity-0 translate-y-2"
                             >
                               <div
                                 v-if="isLanguageDropdownOpen"
                                 class="absolute top-full end-0 mt-2 bg-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl min-w-[180px] md:min-w-[200px] z-[10000]"
                                 style="box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);"
                               >
                                 <button
                                   v-for="(lang, index) in languages"
                                   :key="lang.code"
                                   @click.stop="selectLanguage(lang)"
                                   class="w-full flex items-center gap-3 px-4 py-3 bg-[#3A3A3A] hover:bg-[#4A4A4A] transition-colors duration-150 border-l-4 border-transparent"
                                   :class="{
                                     'border-[#1ECE83]': selectedLanguage.code === lang.code && index === 0,
                                     'border-blue-500 border-dashed': selectedLanguage.code === lang.code && index === 1,
                                     'border-[#1ECE83]': selectedLanguage.code === lang.code && index > 1
                                   }"
                                 >
                                   <img :src="`/${lang.flag}`" :alt="lang.name" class="w-8 h-6 object-cover rounded flex-shrink-0" />
                                   <span class="text-white font-medium text-base text-start flex-1">{{ lang.label }}</span>
                                 </button>
                               </div>
                             </transition>
                           </div>
                                </div>
                                <div 
                                  class="hidden md:flex px-4 py-2 md:px-6 md:py-2.5 space-x-6 md:space-x-8"
                                  style="
                                    border: 2px solid rgb(255, 255, 255);
                                    backdrop-filter: blur(10px);
                                    background-color: rgba(255, 255, 255, 0.5);
                                    border-radius: 167px;
                                    box-shadow: rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px;
                                    opacity: 1;
                                  "
                                >
                                  <a href="#about" @click.prevent="smoothScrollTo('#about')" class="nav-link text-[#2A2A2A] font-medium hover:text-green-600 text-sm md:text-base font-work-sans ml-5">
                                    <span v-for="(letter, index) in $t('nav.about').split('')" :key="index" class="nav-letter" :style="{ animationDelay: `${index * 0.05}s` }">{{ letter === ' ' ? '\u00A0' : letter }}</span>
                                  </a>
                                  <a href="#features" @click.prevent="smoothScrollTo('#features')" class="nav-link text-[#2A2A2A] font-medium hover:text-green-600 text-sm md:text-base font-work-sans">
                                    <span v-for="(letter, index) in $t('nav.features').split('')" :key="index" class="nav-letter" :style="{ animationDelay: `${index * 0.05}s` }">{{ letter === ' ' ? '\u00A0' : letter }}</span>
                                  </a>
                                  <a href="#pricing" @click.prevent="smoothScrollTo('#pricing')" class="nav-link text-[#2A2A2A] font-medium hover:text-green-600 text-sm md:text-base font-work-sans">
                                    <span v-for="(letter, index) in $t('nav.pricing').split('')" :key="index" class="nav-letter" :style="{ animationDelay: `${index * 0.05}s` }">{{ letter === ' ' ? '\u00A0' : letter }}</span>
                                  </a>
                                  <a href="#contact" @click.prevent="smoothScrollTo('#contact')" class="nav-link text-[#2A2A2A] font-medium hover:text-green-600 text-sm md:text-base font-work-sans">
                                    <span v-for="(letter, index) in $t('nav.faq').split('')" :key="index" class="nav-letter" :style="{ animationDelay: `${index * 0.05}s` }">{{ letter === ' ' ? '\u00A0' : letter }}</span>
                                  </a>
                                </div>
                                <!-- Mobile menu button -->
                                <button 
                                  @click="toggleMobileMenu"
                                  class="md:hidden mr-2 sm:ml-0 ml-4 text-gray-700 hover:text-green-600 transition-colors"
                                  aria-label="Toggle mobile menu"
                                >
                                  
                                  <img src="/point.svg" alt="pooint" 
                                  :class="[
                                    'w-10 h-10',
                                    isMobileMenuOpen 
                                      ? 'rotate-90' 
                                      : 'rotate-180'
                                  ]"
                                  >
                                </button>
                              </div>
                           </div>
                           <!-- Mobile menu dropdown -->
                           <transition name="mobile-menu">
                             <div 
                               v-if="isMobileMenuOpen" 
                               class="md:hidden absolute top-full end-8 rounded-2xl z-[9998]"
                               style="
                                 background: rgba(255, 255, 255, 0.85);
                                 backdrop-filter: blur(20px) saturate(180%);
                                 -webkit-backdrop-filter: blur(20px) saturate(180%);
                                 border: 1px solid rgba(255, 255, 255, 0.3);
                                 box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.08);
                                 width: fit-content;
                               "
                             >
                               <div class="px-2 py-3 space-y-1">
                                 <a 
                                   href="#about" 
                                   @click.prevent="closeMobileMenuAndScroll('#about')" 
                                   class="block py-3 px-4 rounded-xl text-[#2A2A2A] font-medium hover:text-green-600 hover:bg-white/50 text-base font-work-sans transition-all duration-200"
                                 >
                                   {{ $t('nav.about') }}
                                 </a>
                                 <a 
                                   href="#features" 
                                   @click.prevent="closeMobileMenuAndScroll('#features')" 
                                   class="block py-3 px-4 rounded-xl text-[#2A2A2A] font-medium hover:text-green-600 hover:bg-white/50 text-base font-work-sans transition-all duration-200"
                                 >
                                   {{ $t('nav.features') }}
                                 </a>
                                 <a 
                                   href="#pricing" 
                                   @click.prevent="closeMobileMenuAndScroll('#pricing')" 
                                   class="block py-3 px-4 rounded-xl text-[#2A2A2A] font-medium hover:text-green-600 hover:bg-white/50 text-base font-work-sans transition-all duration-200"
                                 >
                                   {{ $t('nav.pricing') }}
                                 </a>
                                 <a 
                                   href="#contact" 
                                   @click.prevent="closeMobileMenuAndScroll('#contact')" 
                                   class="block py-3 px-4 rounded-xl text-[#2A2A2A] font-medium hover:text-green-600 hover:bg-white/50 text-base font-work-sans transition-all duration-200"
                                 >
                                   {{ $t('nav.faq') }}
                                 </a>
                               </div>
                             </div>
                           </transition>
                         </div>
                        </nav>
         
                     
                 
                     <!-- Main Hero Section - Three Column Layout -->
                     <section class="relative h-screen z-50 sm:pt-32 pt-24" 
                                 
             
                     >
                       <div class="sm:px-[60px] py-[20px] mx-auto">
                         <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 ">
                           
                           <!-- Left Column - Hero Content -->
                           <div class="lg:col-span-1 space-y-4 sm:space-y-6 text-center lg:text-start sm:mt-20" data-aos="fade-right" data-aos-easing="ease-out">
                             <div class="flex items-center justify-center lg:justify-start sm:mb-6 sm:gap-4" data-aos="fade-up" data-aos-delay="100">
                               <div class="sm:flex hidden">
                                 <img src="/build.png" alt="" class="sm:w-[96px] sm:h-[48px] sm:object-contain" />
                               </div>
                               <div class="sm:hidden flex mr-3">
                                 <img src="/built.svg" alt=""  />
                               </div>
                               <p class="text-xs sm:text-xl whitespace-nowrap font-normal  text-[#3B3B3B]">{{ $t('hero.builtWith') }}</p>
                             </div>
                 
                             <!-- Main Headline -->
                             <h1 
                               class="text-[28px] sm:text-[36px]   font-semibold text-[#2A2A2A] leading-tight mb-4 sm:mb-6 sm:w-full w-[295px] mx-auto"
                               data-aos="fade-up"
                               data-aos-delay="200"
                             >
                               {{ $t('hero.headline1') }}<br/>
                               <span class="text-[#2A2A2A]">{{ $t('hero.headline2') }}</span>
                             </h1>
                 
                             <!-- Description -->
                             <p 
                               class="text-sm sm:text-lg md:text-xl text-[#707070] font-medium  leading-relaxed mb-6  sm:max-w-2xl max-w-[295px] mx-auto lg:max-w-none"
                               data-aos="fade-up"
                               data-aos-delay="300"
                             >
                               {{ $t('hero.description') }}
                             </p>
                           </div>
                 
                           <!-- Middle Column - Phone Mockup -->
                           <div class="lg:col-span-1 flex justify-center items-center z-50 " data-aos="zoom-in" data-aos-delay="400" data-aos-easing="ease-out">
                             <div class="relative flex items-center justify-center w-full ">
                               <!-- Background Glow Effect -->
                               <div 
                                 class="absolute inset-0 -bottom-[500px] sm:-bottom-48 flex items-center justify-center pointer-events-none z-0"
                                 data-aos="fade-in"
                                 data-aos-delay="1600"
                                 data-aos-duration="1600"
                                 data-aos-easing="ease-out"
                               >
                                 <img
                                   src="/air-backround.png"
                                   alt=""
                                   class="w-[267px] max-w-[267px]  h-[267px] aspect-square sm:hidden block"
                                   style="transform: translateY(-10%);"
                                 />

                                 <img
                                   src="/air-backround.png"
                                   alt=""
                                   class="aspect-square sm:block hidden"
                                   style="transform: translateY(-10%);"
                                 />
                               </div>
                 
                               <!-- Phone Mockup -->
                               
                             </div>
                           </div>
                           <div ref="phoneImage" class="fixed sm:top-[12rem] top-[27rem] end-0 z-[99999] flex  items-center justify-center w-full">
                                 <div>
                                  <img
                                   ref="airPhoneImage"
                                   src="/im.png"
                                   alt="Noor Global App"
                                   class="w-full max-w-[380px] sm:h-[550px] h-[400px] object-contain z-[99999]  transform  transition-transform duration-500"
                                   style="display: block;"
                                   data-aos="zoom-out"
                                   data-aos-delay="400" data-aos-easing="ease-out"
                                 />
         
                                 <img 
                               ref="quranImage"
                               src="/quran.png" 
                               alt="Quran App" 
                               class="w-full max-w-[380px] sm:h-[550px] h-[400px] object-contain z-[99999] drop-shadow-2xl transform  transition-transform duration-500"
                               style="display: none;"
                               />
                                 </div>
                            </div>
                               
                 
                 
                           <!-- Right Column - QR Code and Download -->
                           <div class="lg:col-span-1 sm:flex hidden flex-col items-center  w-full mt-10" data-aos="fade-left" data-aos-delay="500" data-aos-easing="ease-out">
                             <h3 class="text-xl sm:text-2xl  font-semibold text-[#2A2A2A] mb-4 sm:mb-6 text-center lg:text-start px-4 lg:px-0 w-[295px] ">{{ $t('hero.scanQR') }}</h3>
                             
                             <!-- Combined QR Code and App Store Container -->
                             <div 
                               class="bg-[#FFFFFF01] rounded-[36px] border border-[#00000014] py-4 w-[280px]"
                               style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
                             >
                               <!-- QR Code -->
                               <div class="flex justify-center mx-auto p-4 mb-6 w-[252px] h-[252px] border-8 border-[#FFFFFF]  bg-[#F0F1F3] rounded-[27px]"
                               style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
         
                               >
                                 <img src="/qrr.svg" alt="QR Code" class=" w-[196px] h-[196px] " />
                               </div>
                 
                               <!-- App Store Icons - Circular -->
                               <div class="flex justify-center items-center gap-4 sm:gap-6">
                                 <a href="#" class="  cursor-pointer">
                                   <img src="/apple.svg" alt="Download on the App Store" class="w-[56px]  h-[56px] " />
                                 </a>
                                 <a href="#" class="  cursor-pointer">
                                   <img src="/playstore.svg" alt="Get it on Google Play" class="w-[56px]  h-[56px] " />
                                 </a>
                               </div>
                             </div>
                           </div>
                 
                         </div>
                       </div>
                     </section>
                   </div>
          </div>
          
        </div>
            

      

      <section ref="portraitSection" dir="ltr" class="relative z-10 py-20 sm:px-4 overflow-hidden">
        <div class="sm:max-w-7xl mx-auto relative">
          
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div class="relative w-full max-w-2xl aspect-square sm:scale-95 scale-150">

              <!-- Rotating border -->
              <div class="orbit"></div>

              <!-- Orbiting rings -->
              <div class="orbit orbit-md"></div>
              <div class="orbit orbit-sm"></div>

            </div>
          </div>



          <!-- Content Container -->
          <div class="relative z-10">
            
            
            <!-- Phone and Portrait Elements -->
            <div class="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
              
              <!-- Centered Phone -->
              <div ref="portraitPhoneImage" class="relative z-20" data-aos="zoom-in" data-aos-delay="200" style="display: none;">
                <div class="relative">
                  <div class="absolute inset-0 bg-green-400 rounded-3xl blur-3xl opacity-20 -z-10"></div>
                  <img 
                    src="/quran.png" 
                    alt="Quran App" 
                    class="w-full max-w-[380px] sm:h-[550px] h-[400px] object-contain drop-shadow-2xl transform  transition-transform duration-500"
                    />
                </div>
              </div>

              <!-- Portrait Speech Bubble - Top (inline-start) -->
              <div 
                class="absolute   z-30"
                :class="locale === 'ar' ? 'md:start-[270px] -start-0 top-40  md:top-24' : 'md:start-[270px] -start-0 top-40  md:top-24'"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                    <img 
                      :src="locale === 'ar' ? '/h-1.svg' : '/h-1.svg'" 
                      alt="Portrait" 
                      class=" object-contain sm:rotate-0 -rotate-[320deg]"
                      :class="locale === 'ar' ? 'w-[235px] h-[190px]' : 'w-[235px] h-[190px] '"
                    />
              </div>

              <!-- Penguin Avatar - Top (inline-end) -->
              <div 
                class="absolute top-28  md:top-36  z-30"
                :class="locale === 'ar' ? 'md:end-[270px] -end-0 top-28  md:top-28' : 'md:end-[270px] -end-0 top-28  md:top-28'"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                  <img 
                    :src="locale === 'ar' ? '/h-2.svg' : '/h-2.svg'" 
                    alt="Penguin Avatar" 
                    class=" object-contain"
                    :class="locale === 'ar' ? 'w-[235px] h-[190px]' : 'w-[235px] h-[190px]'"                />
              </div>

              <!-- Ice Popsicle - Bottom (inline-start) -->
              <div 
                class="absolute   z-30"
                :class="locale === 'ar' ? 'md:start-[270px] -start-0 bottom-36  md:bottom-36' : 'md:start-[270px] -start-0 bottom-36  md:bottom-36'"
                data-aos="fade-right"
                data-aos-delay="500"
              >
                  <img 
                    :src="locale === 'ar' ? '/h-3.svg' : '/h-3.svg'" 
                    alt="Ice Popsicle" 
                    class=" object-contain"
                    :class="locale === 'ar' ? 'w-[235px] h-[190px]' : 'w-[235px] h-[190px]'"                />
              </div>

              <!-- Portrait Speech Bubble - Bottom (inline-end) -->
              <div 
                class="absolute   z-30"
                :class="locale === 'ar' ? 'md:end-[270px] -end-0 bottom-36  md:bottom-36' : 'md:end-[270px] -end-0 bottom-36  md:bottom-36' "
                data-aos="fade-left"
                data-aos-delay="600"
              >
                    <img 
                      :src="locale === 'ar' ? '/h-4.svg' : '/h-4.svg'" 
                      alt="Portrait" 
                      class=" object-contain sm:rotate-0 rotate-[320deg]"
                      :class="locale === 'ar' ? 'w-[235px] h-[190px]' : 'w-[235px] h-[190px]'"                />
                  
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>


    
     <!-- About Section with Left Sticky + Right Scroll -->
     <section id="about" ref="aboutSection" class="bg-[#F0F1F3] sm:pt-20 pt-5  px-4 relative sm:min-h-screen">
      <div class="max-w-6xl mx-auto sm:flex hidden gap-20 relative items-start">
        <!-- LEFT SIDE -->
        <div ref="leftSide" class="w-[500px] max-w-full shrink-0">
          <img src="/about-line.svg" alt="" >
          <h2 class="text-[40px] font-bold text-[#2A2A2A] text-start w-full max-w-[400px] my-[28px] leading-[48px]" 
              >
            {{ $t('about.title') }}
          </h2>
          <p class="text-[#707070] text-start w-full max-w-[500px] mb-[28px] leading-[24px] text-[18px]"
            >
            {{ $t('about.description') }}
          </p>

          <button class="
            px-10 py-4 rounded-full text-white font-medium text-lg
            border-[4px] border-[#C8FFE6]
            bg-[radial-gradient(circle_at_50%_280%,_#C8FFE6_0%,_#22C37A_100%)]
            shadow-[0_4px_14px_rgba(34,195,122,0.39)]
            hover:brightness-110 active:scale-95 transition-all
          "
          >
            {{ $t('about.seeHow') }}
          </button>
        </div>

        <!-- RIGHT SIDE -->
        <div ref="rightSide" class="flex flex-col items-center justify-center gap-4">
               <Cardd />
        </div>

        

      </div>

      <div class="w-full mx-auto flex flex-col sm:hidden gap-12 relative">
        <div class="flex justify-center flex-col items-center" data-aos="fade-up-right"
          data-aos-delay="500">
          <img src="/about-line.svg" alt="" >
          <h2 class="text-[28px] font-bold text-[#2A2A2A] text-center w-[85%] my-[28px] " 
              >
            {{ $t('about.title') }}
          </h2>
          <p class="text-[#707070] text-center w-[90%] mb-[28px] leading-[24px] text-base"
            >
            {{ $t('about.description') }}
          </p>

          <button class="
            px-10 py-4 rounded-full text-white font-medium text-lg
            border-[4px] border-[#C8FFE6]
            bg-[radial-gradient(circle_at_50%_280%,_#C8FFE6_0%,_#22C37A_100%)]
            shadow-[0_4px_14px_rgba(34,195,122,0.39)]
            hover:brightness-110 active:scale-95 transition-all
          "
          >
            {{ $t('about.seeHow') }}
          </button>
        </div>

       
        <Card />

      </div>
    </section>



    <section id="features" class="bg-[#F0F1F3] px-4 sm:py-20 pt-20 sm:min-h-screen overflow-x-hidden">
  <div
    class="max-w-[1200px] sm:mt-40 mt-12 mx-auto flex flex-col items-center"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <img src="/about-line.svg" alt="" class="mb-4">
    <h2 class="sm:text-[42px] text-2xl font-bold text-center text-[#1A1A1A] sm:max-w-[600px] sm:leading-[60px] mb-6">
      {{ $t('features.title') }}
    </h2>
    <p class="text-[#707070] text-center max-w-[550px] sm:text-[18px] text-base sm:w-full w-[90%] leading-relaxed">
      {{ $t('features.description') }}
    </p>
  </div>

  <!-- dir=ltr: markazdagi SVG va chap/o‘ng ustunlar arabcha sahifada ham dizayndagi joyida -->
  <div class="relative max-w-[1200px] mx-auto min-h-[800px] features-spatial-ltr" dir="ltr">
    
    <div class="absolute inset-0 z-0 pointer-events-none sm:block hidden">
      <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
        <!-- Base solid lines -->
        <path d="M500 400 C 350 400, 350 0, 450 150" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <path d="M500 400 C 650 400, 650 0, 600 150" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <path d="M500 400 C 350 380, 350 400, 250 430" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <path d="M500 400 C 650 400, 650 400, 750 430" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <path d="M500 400 C 400 400, 350 650, 400 650" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <path d="M500 400 C 550 600, 850 650, 550 650" stroke="#E1E2E3" stroke-width="2.5" fill="none" opacity="0.7"/>
        <!-- Animated flowing highlight that moves along the lines -->
        <path d="M500 400 C 350 400, 350 0, 450 150" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-1" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 650 400, 650 0, 600 150" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-2" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 350 380, 350 400, 250 430" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-3" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 650 400, 650 400, 750 430" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-4" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 400 400, 350 650, 400 650" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-5" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 550 600, 850 650, 550 650" stroke="#22C37A" stroke-width="3" fill="none" class="animated-line line-6" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
      </svg>
    </div>

    <div class="absolute inset-0 z-0 pointer-events-none sm:hidden block ">
      <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
        <!-- Base solid lines -->
        <path d="M500 400 C 350 200, 450 100, 350 10" stroke="#E1E2E3" stroke-width="10" fill="none" opacity="0.7"/>
        <path d="M500 400 C 550 600, 1050 350, 350 1050" stroke="#E1E2E3" stroke-width="10" fill="none" opacity="0.7"/>
        <!-- Animated flowing highlight that moves along the lines -->
        <path d="M500 400 C 350 200, 450 100, 350 10" stroke="#22C37A" stroke-width="10.5" fill="none" class="animated-line line-1" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
        <path d="M500 400 C 550 600, 1050 350, 350 1050" stroke="#22C37A" stroke-width="10.5" fill="none" class="animated-line line-6" stroke-dasharray="60 300" stroke-linecap="round" opacity="0.9"/>
      </svg>
    </div>

    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 sm:block hidden">
      <img src="/islamicc.png" alt="" class="w-[194px] h-[194px]">
    </div>


    <div class="flex flex-col md:flex-row relative z-50 pt-12 pb-32">
      
      <div class="space-y-10 flex flex-col items-center md:items-end ">
        <!-- Top Left: Quran AI -->
        <div class="p-2 border border-[#DFDFDF] rounded-[32px] bg-[#F0F1F3] relative z-50">
        <div
          class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
        >
          <div class="relative mb-6">
            <img src="/1.1.png" alt="" class="sm:w-[419px] w-[286px] sm:h-[186px] h-[126px] object-cover">
          </div>
          <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2 font-work-sans">{{ $t('features.quranAI.title') }}</h3>
          <p class="text-[#707070] text-[16px] leading-relaxed font-normal">{{ $t('features.quranAI.description') }}</p>
        </div>
        </div>

        <!-- Middle Left: Qibla Compass -->
        <div class="p-2 border border-[#DFDFDF] rounded-[32px] md:me-48 bg-[#F0F1F3] relative z-50">
        <div
          class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
        >
          <div class="relative mb-6">
            <img src="/1.3.png" alt="" class="sm:w-[286px] w-[286px] sm:h-[186px] h-[126px] object-cover">
          </div>
          <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2  font-work-sans">{{ $t('features.qibla.title') }}</h3>
          <p class="text-[#707070] text-[16px] leading-relaxed font-normal">{{ $t('features.qibla.description') }}</p>
        </div>
        </div>

        <!-- Bottom Left: Education -->
        <div class="p-2 border border-[#DFDFDF] rounded-[32px] bg-[#F0F1F3] relative z-50">
        <div
          class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
        >
          <div class="relative mb-6">
            <img src="/1.4.png" alt="" class="sm:w-[573px] w-[386px] sm:h-[186px] h-[126px] object-cover">
          </div>
          <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2  font-work-sans">{{ $t('features.education.title') }}</h3>
          <p class="text-[#707070] text-[16px] leading-relaxed font-normal sm:w-[500px]">{{ $t('features.education.description') }}</p>
        </div>
        </div>
      </div>

      <div class="  z-20 sm:hidden flex my-12 w-full justify-center">
      <img src="/way.svg" alt="" class="sm:w-[194px] sm:h-[194px] w-[100px] h-[100px]">
    </div>

      <div class="space-y-10 flex flex-col items-center md:items-start md:ps-8">
        <!-- Top Right: Hadis -->
         <div class="p-2 border border-[#DFDFDF] rounded-[32px] mt-1 bg-[#F0F1F3] relative z-50">
           <div
             class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative"
             :dir="locale === 'ar' ? 'rtl' : 'ltr'"
             style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
           >
             <div class="relative mb-6">
               <img src="/1.2.png" alt="" class="sm:w-[573px] w-[386px] sm:h-[186px] h-[126px] object-cover">
             </div>
             <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2  font-work-sans">{{ $t('features.hadis.title') }}</h3>
             <p class="text-[#707070] text-[16px] leading-relaxed font-normal">{{ $t('features.hadis.description') }}</p>
           </div>
         </div>

        <!-- Middle Right: Zikr -->
         <div class="p-2 border border-[#DFDFDF] rounded-[32px] md:ms-48 mt-1 bg-[#F0F1F3] relative z-50">

        <div
          class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
        >
          <div class="relative mb-6">
            <img src="/1.5.png" alt="" class="sm:w-[286px] w-[286px] sm:h-[186px] h-[126px] object-cover">
          </div>
          <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2  font-work-sans">{{ $t('features.zikr.title') }}</h3>
          <p class="text-[#707070] text-[16px] leading-relaxed font-normal">{{ $t('features.zikr.description') }}</p>
        </div>
        </div>

        <!-- Bottom Right: Missed Prayers -->
          <div class="p-2 border border-[#DFDFDF] rounded-[32px] mt-1 bg-[#F0F1F3] relative z-50 "
          :class="locale === 'ar' ? 'sm:h-[400px] sm:!mt-[4rem]' : 'h-full'"
          >
             <div
               class="bg-gradient-to-br   from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] p-8 rounded-[32px] border-[6px] z-50 border-[#FFFFFF] relative sm:h-full"
               :dir="locale === 'ar' ? 'rtl' : 'ltr'"
               style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
        >
          <div class="relative mb-6">
            <img src="/1.6.png" alt="" class="sm:w-[419px] w-[286px] sm:h-[186px] h-[126px] object-cover">
          </div>
          <h3 class="text-[28px] font-semibold text-[#2A2A2A] mb-2  font-work-sans">{{ $t('features.missedPrayers.title') }}</h3>
          <p class="text-[#707070] text-[16px] leading-relaxed font-normal">{{ $t('features.missedPrayers.description') }}</p>
        </div>
        </div>
      </div>

    </div>
  </div>
    </section>


    <section class="relative  bg-[#F0F1F3] px-4  font-sans overflow-hidden flex flex-col items-center">
      
      <div class="relative z-10 text-center mb-16 max-w-3xl">
        <div class="flex justify-center mb-4">
          <img src="/about-line.svg" alt="" class="h-2">
        </div>
        <h2 class="sm:text-3xl text-2xl md:text-[48px] font-bold text-[#1A1A1A] sm:leading-[60px] mb-6">
          {{ $t('unified.title') }}
        </h2>
        <p class="text-[#707070] text-base md:text-lg leading-relaxed sm:max-w-2xl mx-auto w-[90%]">
          {{ $t('unified.description') }}
        </p>
      </div>

      <div class="relative  w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0  ">
        
        <div class="sm:flex hidden flex-row lg:flex-row items-center justify-center gap-4 lg:mr-8 z-10 mt-16">
            <img src="/i-1.png" alt="Compass" class="icon-compass w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-2.png" alt="Quran" class="icon-quran w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-3.png" alt="Prayer" class="icon-prayer w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
        </div>

        <div class="sm:hidden flex flex-col lg:flex-row items-center justify-center  lg:mr-8 z-10 mt-18">
          <div class="grid grid-cols-3 ">

            <img src="/i-1.png" alt="Compass" class="icon-compass w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-2.png" alt="Quran" class="icon-quran w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-3.png" alt="Prayer" class="icon-prayer w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
          </div>
          <div class="grid grid-cols-3 ">

            <img src="/i-4.png" alt="Prayer Beads" class="icon-beads w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-5.png" alt="Hourglass" class="icon-hourglass w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-6.png" alt="Open Book" class="icon-book w-full h-full md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            </div>
        </div>

        <img src="/bggg.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full ">
        <div class="relative z-20 mx-4 h-[350px]  overflow-hidden">
          <div class="relative">
            <img src="/air-phone.svg" alt="Phone App" class=" drop-shadow-2xl object-cover">
          </div>
        </div>

        <div class="sm:flex hidden flex-row lg:flex-row items-center justify-center gap-4 lg:ml-8 z-10 mt-16">
            <img src="/i-4.png" alt="Prayer Beads" class="icon-beads w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-5.png" alt="Hourglass" class="icon-hourglass w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
            <img src="/i-6.png" alt="Open Book" class="icon-book w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px] object-cover">
        </div>

        <img src="/Line.png" alt="" class="absolute bottom-0 left-0 w-full  z-50">
      </div>

    </section>


    <section
      ref="testimonialSection"
      class="relative font-sans overflow-hidden "
    >
      <div 
        class="absolute inset-0 bg-[url(/blut.png)] testimonial-parallax-bg"
      ></div>
      
      <div class="relative z-10 text-center mt-[100px] max-w-3xl mx-auto px-4">
        <div class="flex justify-center mb-4">
          <img src="/about-line.svg" alt="" class="h-2">
        </div>
        <h2 class="sm:text-3xl text-2xl md:text-[48px] font-bold text-[#1A1A1A] sm:leading-[60px] mb-6">
          {{ $t('testimonials.title') }}
        </h2>
        <p class="text-[#707070] text-base md:text-lg leading-relaxed sm:max-w-2xl mx-auto w-[90%]">
          {{ $t('testimonials.description') }}
        </p>
      </div>

      <!-- Spacer before -->
      <div class="spacer"></div>

      <!-- Wrapper Desktop -->
      <div ref="testimonialWrapper" class="testimonial-wrapper sm:block hidden">
        <div class="testimonial-cards">
          <Testimonials ref="testimonialsComponent" />
        </div>
      </div>
      <!-- Wrapper Mobile -->
      <div ref="testimonialWrapperMobile" class="testimonial-wrapper sm:hidden block">
        <TestimonialsMobile ref="testimonialsMobileComponent"/>
      </div>

      <!-- Spacer after -->
      <div class="spacer"></div>

    </section>


    <section id="pricing" class="relative  bg-[#F0F1F3] px-4 sm:py-20 pt-20 font-sans overflow-hidden flex flex-col items-center">
      
      <div class="relative z-10 text-center mb-16 max-w-3xl">
        <div class="flex justify-center mb-4">
          <img src="/about-line.svg" alt="" class="h-2">
        </div>
        <h2 class="sm:text-3xl text-[28px] md:text-[32px] font-bold text-[#1A1A1A]  mb-6 sm:w-full w-[85%] mx-auto">
          {{ $t('pricing.title') }}
        </h2>
        <p class="text-[#707070] text-sm  leading-relaxed sm:max-w-2xl mx-auto w-[90%]">
          {{ $t('pricing.description') }}    </p>
      </div>

      <!-- Billing Toggle -->
      <div class="relative z-10 flex items-center justify-center mb-12">
        <div class="relative bg-white rounded-full p-1 shadow-md flex">
          <button
            @click="isYearly = false"
            :class="[
              'px-8 py-2 rounded-full text-base font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 border-0 focus:border-0',
              !isYearly 
                ? 'bg-[#22C37A] text-white' 
                : 'text-[#707070] hover:text-[#1A1A1A]'
            ]"
          >
            {{ $t('pricing.monthly') }}
          </button>
          <button
            @click="isYearly = true"
            :class="[
              'px-8 py-2 rounded-full text-base font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 border-0 focus:border-0',
              isYearly 
                ? 'bg-[#22C37A] text-white' 
                : 'text-[#707070] hover:text-[#1A1A1A]'
            ]"
          >
            {{ $t('pricing.yearly') }}
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="relative z-10 w-full sm:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 sm:px-4">
        
        <!-- Free Plan -->
        <div class="border border-[#E5E5E5] p-2 rounded-[32px]">

          <div class="bg-white rounded-3xl p-6 shadow-lg flex flex-col justify-between  h-[780px]">
            <h3 class="text-3xl font-bold text-[#1A1A1A] mb-4">{{ $t('pricing.free.title') }}</h3>
            <p class="text-[#707070] text-base mb-6 leading-relaxed">
              {{ $t('pricing.free.description') }}
            </p>
            <div class="flex items-center justify-center gap-2  z-10">
              <div class="w-full p-[0.5px] bg-[#1ECE83] rounded-full"></div>
            </div>
            <div class="mt-0 ">
              
              <ul class="space-y-3 sm:mb-[97px] mb-10 ">
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.aiQuran') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.education') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.zikr') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.prayerTimes') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.tajweed') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.missedPrayers') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <img src="/check.svg"/>
                  <span class="text-[#2A2A2A] text-base">{{ $t('pricing.free.features.hadiths') }}</span>
                </li>
              </ul>
              <div class="text-4xl font-bold text-[#1A1A1A] sm:mb-6">
                {{ $t('pricing.free.price') }}<span class="text-xl font-normal text-[#707070]">{{ isYearly ? $t('pricing.perYear') : $t('pricing.perMonth') }}</span>
              </div>
            </div>
            <button class="
            px-10 py-4 rounded-full text-white font-medium text-lg
            border-[4px] border-[#C8FFE6]
            bg-[radial-gradient(circle_at_50%_280%,_#C8FFE6_0%,_#22C37A_100%)]
            shadow-[0_4px_14px_rgba(34,195,122,0.39)]
            hover:brightness-110 active:scale-95 transition-all
          "
          >
            {{ $t('about.seeHow') }}
          </button>
          </div>
        </div>

        <!-- Premium Plan (Highlighted) -->
        <div class="border border-[#E5E5E5] p-2 rounded-[32px]">
        <div class="bg-gradient-to-br h-[780px]    from-[#1ECE83] via-[#1ECE83] to-[#13603F]  rounded-3xl p-6 shadow-lg flex flex-col justify-between relative transform ">
          <div
      class="absolute top-6 right-6
            bg-white
            backdrop-blur-[16px]
            text-[#1A5F3F] sm:text-base text-xs font-normal
            px-4 py-2
            rounded-full
            shadow-[0_4px_16px_rgba(255,255,255,0.4)]">
      {{ $t('pricing.premium.mostPopular') }}
    </div>

            <img src="/y.svg" alt="" class=" absolute top-0 right-0">
          <h3 class="text-3xl font-bold text-white mb-4">{{ $t('pricing.premium.title') }}</h3>
          <p class="text-white/90 text-base mb-4 leading-relaxed">
            {{ $t('pricing.premium.description') }}
          </p>
          
          <div class="flex items-center justify-center gap-2  z-10">
            <div class="sm:w-10 w-5 p-[0.5px] bg-white rounded-full"></div>
            <p class="text-white text-sm  text-normal ">{{ $t('pricing.premium.includes') }}</p>
            <div class="sm:w-10 w-5 p-[0.5px] bg-white rounded-full"></div>
          </div>
          <div class=" my-6">
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.fullAI') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.unlimited') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.fullEducation') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.completeZikr') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.prayerTimes') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.quranRules') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check-2.svg" />
                <span class="text-white text-base">{{ $t('pricing.premium.features.earlyAccess') }}</span>
              </li>
            </ul>
            <div class="text-4xl font-bold text-white sm:mb-4 sm:mt-14 mt-6">
              {{ isYearly ? $t('pricing.premium.priceYearly') : $t('pricing.premium.price') }}<span class="text-xl font-normal text-white/80">{{ isYearly ? $t('pricing.perYear') : $t('pricing.perMonth') }}</span>
            </div>
          </div>
          <button class="
            px-10 py-4 rounded-full text-white font-medium text-lg
            border-[4px] border-[#C8FFE6]
            bg-[radial-gradient(circle_at_50%_280%,_#C8FFE6_0%,_#22C37A_100%)]
            shadow-[0_4px_14px_rgba(34,195,122,0.39)]
            hover:brightness-110 active:scale-95 transition-all
          "
          >
            {{ $t('about.seeHow') }}
          </button>
        </div>
        </div>
        <!-- Family Plan -->
        <div class="border border-[#E5E5E5] p-2 rounded-[32px]">
        <div class="bg-white rounded-3xl   p-6 shadow-lg flex flex-col relative h-[780px]">
          <h3 class="text-3xl font-bold text-[#1A1A1A] mb-4 z-10" >{{ $t('pricing.family.title') }}</h3>
          <p class="text-[#707070] text-base mb-4 leading-relaxed z-10">
            {{ $t('pricing.family.description') }}
          </p>
          <img src="/y-2.svg" alt="" class="absolute top-0 right-0">
          <img src="/y-3.svg" alt="" class="absolute top-0 left-0 right-0 rounded-t-3xl w-full h-full">
          <div class="flex items-center justify-center gap-2  z-10">
            <div class="sm:w-10 w-5 p-[0.5px] bg-[#1ECE83] rounded-full"></div>
            <p class="text-[#1ECE83] sm:text-sm text-xs text-normal ">{{ $t('pricing.family.includes') }}</p>
            <div class="sm:w-10 w-5 p-[0.5px] bg-[#1ECE83] rounded-full"></div>
          </div>
          <div class=" my-12 z-10">
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.members') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.fullAI') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.unlimited') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.fullEducation') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.completeZikr') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.prayerTimes') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <img src="/check.svg"/>
                <span class="text-[#2A2A2A] text-base">{{ $t('pricing.family.features.quranRules') }}</span>
              </li>
            </ul>

            <div class="text-4xl font-bold text-[#1A1A1A] sm:mb-4 sm:mt-14 mt-6">
              {{ isYearly ? $t('pricing.family.priceYearly') : $t('pricing.family.price') }}<span class="text-xl font-normal text-[#707070]">{{ isYearly ? $t('pricing.perYear') : $t('pricing.perMonth') }}</span>
            </div>
            <button class="
            px-10 py-4 mt-6 w-full rounded-full text-white font-medium text-lg
            border-[4px] border-[#C8FFE6]
            bg-[radial-gradient(circle_at_50%_280%,_#C8FFE6_0%,_#22C37A_100%)]
            shadow-[0_4px_14px_rgba(34,195,122,0.39)]
            hover:brightness-110 active:scale-95 transition-all
          "
          >
            {{ $t('about.seeHow') }}
          </button>
          </div>
        </div>
        </div>

      </div>

    </section>


    <!-- accordion Section with Left Sticky + Right Scroll -->
    <section id="contact"  class="bg-[#F0F1F3] py-20 px-4 relative ">
          <div class="max-w-7xl mx-auto sm:flex hidden justify-between gap-20 relative">

            <div  class="w-[500px] ">
              <img src="/about-line.svg" alt="" >
              <h2 class="text-[48px] font-bold text-[#2A2A2A] text-start w-[400px] my-[28px] leading-[64px]" 
                  >
                  {{ $t('faq.title') }}
              </h2>
              <p class="text-[#707070] text-start w-[500px] mb-[28px] leading-[24px] text-[18px]"
                >
                {{ $t('faq.description') }}          </p>

            </div>

            <!-- FAQ Accordion -->
            <div class="flex-1 flex flex-col gap-4 justify-center items-center">

                <div
                  v-for="(faq, index) in faqs"
                  :key="index"
                  :ref="el => { if (el) faqCardRefs[index] = el }"
                  class="border border-[#E5E5E5] p-[8px] rounded-[24px] w-[530px]"
                  style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
                  :class="{ 'faq-card-open': openFaqIndex === index }"
                  >
                  <div class="faq-card bg-gradient-to-br   from-[#8FFFCF]  to-[#EAFFF6] border-4 border-[#FFFFFF] ">

                    <button
                      @click="toggleFaq(index)"
                      class="faq-question-button"
                    >
                      <span class="faq-question-text">{{ faq.question }}</span>
                      <span class="faq-icon">
                        <svg
                          v-if="openFaqIndex === index"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <svg
                          v-else
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </button>
                    <transition name="faq-answer">
                      <div
                        v-show="openFaqIndex === index"
                        class="faq-answer"
                      >
                        <p class="faq-answer-text ">{{ faq.answer }}</p>
                      </div>
                    </transition>
                  </div>
                </div>
            </div>
          
          </div>

          <div class=" sm:hidden flex flex-col justify-between gap-20 relative">

          <div  class="w-full flex flex-col items-center justify-center" >
            <img src="/about-line.svg" alt="" >
            <h2 class=" text-2xl font-bold text-[#2A2A2A] text-center my-[28px] " 
                >
                {{ $t('faq.title') }}
            </h2>
            <p class="text-[#707070] text-center  leading-[24px] text-[18px]"
              >
              {{ $t('faq.description') }}          </p>

          </div>

          <!-- FAQ Accordion -->
          <div class="flex flex-col gap-4 justify-center items-center">

            <div
              v-for="(faq, index) in faqs"
              :key="index"
              :ref="el => { if (el) faqCardRefs[index] = el }"
              class="border border-[#E5E5E5] p-[4px] rounded-[24px] w-[90%]"
              style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
              :class="{ 'faq-card-open': openFaqIndex === index }"
              >
              <div class="faq-card bg-gradient-to-br   from-[#8FFFCF]  to-[#EAFFF6] border-4 border-[#FFFFFF] ">

                <button
                  @click="toggleFaq(index)"
                  class="faq-question-button"
                  
                >
                  <span class="faq-question-text !text-sm">{{ faq.question }}</span>
                  <span class="faq-icon">
                    <svg
                      v-if="openFaqIndex === index"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <svg
                      v-else
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <transition name="faq-answer">
                  <div
                    v-show="openFaqIndex === index"
                    class="faq-answer "
                  >
                    <p class="faq-answer-text !text-xs">{{ faq.answer }}</p>
                  </div>
                </transition>
              </div>
            </div>
            </div>



    </div>
    </section>



    <section class="relative  bg-[#F0F1F3] px-4  font-sans overflow-hidden flex flex-col items-center justify-center py-20">
      
      <div class="relative  w-full max-w-7xl flex flex-col lg:flex-row items-center justify-start sm:gap-4 lg:gap-0  ">

        <div class="relative z-20 mx-4 h-[340px]  overflow-hidden">
          <div class="relative">
            <img src="/air-phone.svg" alt="Phone App" class=" w-[285px]  object-cover">
          </div>
        </div>
        <div class="absolute top-[340px] left-2 w-[303px]  z-50 h-[1px] bg-[#BFBFBF]"></div> 


        <!-- Right Column - QR Code and Download -->
        <div class="border border-[#E5E5E5] rounded-[32px] p-2 h-[340px] sm:flex hidden">

            <div class="lg:col-span-1 flex flex-col items-center lg:items-start w-full " >
                          
                            <!-- Combined QR Code and App Store Container -->
                            <div 
                              class="bg-[#FFFFFF] rounded-[24px] border border-[#00000014] p-6 w-[826px] h-[320px] flex items-start justify-center"
                              style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
                            >
                              <!-- App Store Icons - Circular -->
                              <div class="flex flex-col items-start justify-start w-[512px]">
        
                                      <h1 class="text-[44px] font-bold text-[#2A2A2A] mb-5 text-center lg:text-start px-4 lg:px-0 w-[446px] leading-[60px] ">{{ $t('download.title') }}</h1>
                                      <p class="text-[#707070] text-base  mb-6 text-center lg:text-start px-4 lg:px-0 w-[415px] ">{{ $t('download.description') }}</p>
                                      <div class="flex justify-center items-center gap-4 sm:gap-6">
                                        <a href="#" class="  cursor-pointer">
                                          <img src="/apple.svg" alt="Download on the App Store" class="w-[56px]  h-[56px] " />
                                        </a>
                                        <a href="#" class="  cursor-pointer">
                                          <img src="/playstore.svg" alt="Get it on Google Play" class="w-[56px]  h-[56px] " />
                                        </a>
                                      </div>
                                      </div>
                              
                              <!-- QR Code -->
                                <div class="flex justify-center  ml-auto my-auto  border border-[#E5E5E5]  rounded-[24px] ">
                                
                                  <div class="flex justify-center p-4  w-[226px] h-[226px] border-8 border-[#FFFFFF]  bg-[#F0F1F3] rounded-[27px]"
                                  style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
              
                                  >
                                    <img src="/qrr.svg" alt="QR Code" class="  " />
                                  </div>
                                </div>
                
                              
                            </div>
            </div>
        </div>

        <div class="border border-[#E5E5E5] rounded-[32px] p-2  w-full mx-auto sm:hidden flex">

          <div class=" flex flex-col items-center  w-full " >
                        
                          <!-- Combined QR Code and App Store Container -->
                          <div 
                            class="bg-[#FFFFFF] rounded-[24px]  w-[98%] mx-auto border border-[#00000014] p-6 flex flex-col items-start justify-center"
                            style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
                          >
                            <!-- App Store Icons - Circular -->
                            <div class="flex flex-col items-start justify-start w-full ">

                                    <h1 class="text-2xl font-bold text-[#2A2A2A] mb-5 text-center ">{{ $t('download.title') }}</h1>
                                    <p class="text-[#707070] text-sm  mb-6 text-center ">{{ $t('download.description') }}</p>
                                    <div class="flex justify-center items-center gap-4 sm:gap-6 w-full">
                                      <a href="#" class="  cursor-pointer">
                                        <img src="/apple.svg" alt="Download on the App Store" class="w-[56px]  h-[56px] " />
                                      </a>
                                      <a href="#" class="  cursor-pointer">
                                        <img src="/playstore.svg" alt="Get it on Google Play" class="w-[56px]  h-[56px] " />
                                      </a>
                                    </div>
                                    </div>
                            
                            <!-- QR Code -->
                              <!-- <div class="flex justify-center items-center mx-auto  border border-[#E5E5E5]  rounded-[24px] mt-5 w-[126px] h-[126px]">
                              
                                <div class="flex justify-center p-4  border-8 border-[#FFFFFF]  bg-[#F0F1F3] rounded-[27px]"
                                style="box-shadow: 0px 44.62px 44.62px -4.18px rgba(0, 0, 0, 0.02), 0px 22.58px 22.58px -3.59px rgba(0, 0, 0, 0.03), 0px 12.33px 12.33px -2.99px rgba(0, 0, 0, 0.04), 0px 7.08px 7.08px -2.39px rgba(0, 0, 0, 0.04), 0px 4.06px 4.06px -1.79px rgba(0, 0, 0, 0.04), 0px 2.14px 2.14px -1.2px rgba(0, 0, 0, 0.04), 0px 0.87px 0.87px -0.6px rgba(0, 0, 0, 0.04);"
            
                                >
                                  <img src="/qrr.svg" alt="QR Code" class="  " />
                                </div>
                              </div> -->
              
                            
                          </div>
          </div>
          </div>
      </div>

    </section>


    <footer ref="footerSection" class="relative bg-black text-white overflow-hidden">
      <!-- Main Footer Content -->
      <div class="max-w-7xl mx-auto sm:px-4 py-16">
        <img v-if="locale !== 'ar'" src="/1.8.svg" alt="Noor Global"  />
        <img v-if="locale === 'ar'" src="/1.9.svg" class="mr-4 mb-4 w-[110px]" alt="Noor Global"  />
        
        <div class="border border-[#191919] rounded-3xl p-2 sm:mb-16 mb-8 sm:mt-8 sm:mx-6">

          <div class="bg-black border-[3px] border-[#191919] rounded-2xl p-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-[28px] mb-8">
              <!-- Navigation Column -->
              <div>
                <h3 class="text-white font-semibold mb-4 text-lg">{{ $t('footer.navigation') }}</h3>
                <ul class="space-y-3">
                  <li><a href="#home" @click.prevent="smoothScrollToTop()" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.home') }}</a></li>
                  <li><a href="#about" @click.prevent="smoothScrollTo('#about')" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.about') }}</a></li>
                  <li><a href="#features" @click.prevent="smoothScrollTo('#features')" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.features') }}</a></li>
                  <li><a href="#pricing" @click.prevent="smoothScrollTo('#pricing')" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.pricing') }}</a></li>
                </ul>
              </div>
      
              <!-- Social Connects Column -->
              <div>
                <h3 class="text-white font-semibold mb-4 text-lg">{{ $t('footer.socialConnects') }}</h3>
                <ul class="space-y-3">
                  <li><a href="#" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.instagram') }}</a></li>
                  <li><a href="#" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.facebook') }}</a></li>
                  <li><a href="#" class="text-[#A1A1A1] hover:text-[#1ECE83] transition-colors text-base">{{ $t('footer.linkedin') }}</a></li>
                </ul>
              </div>
      
              <!-- Contact Column -->
              <div>
                <h3 class="text-white font-semibold mb-4 text-lg">{{ $t('footer.contact') }}</h3>
                <ul class="space-y-3">
                  <li class="text-[#A1A1A1] text-base">+1 (360) 637-5525</li>
                  <li class="text-[#A1A1A1] text-base">info@noor.global</li>
                </ul>
              </div>
      
              <!-- Address Column -->
              <div>
                <h3 class="text-white font-semibold mb-4 text-lg">{{ $t('footer.address') }}</h3>
                <ul class="space-y-3">
                  <li class="text-[#A1A1A1] text-base">131 Continental Dr, Suite 305,</li>
                  <li class="text-[#A1A1A1] text-base">Newark, DE</li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>

        <div class="border border-[#191919] rounded-3xl p-2 sm:mx-6"> 

    <div class="bg-black border-[3px] border-[#191919] rounded-2xl p-8 flex justify-between items-center">

          <span class="text-[#A1A1A1] text-[18px]">{{ $t('footer.copyright') }}</span>
          <span class="text-[#A1A1A1] text-[18px]">{{ $t('footer.year') }}</span>

    </div>
        </div>
      
      </div>

      <!-- Large Background Text -->
      <div ref="footerBackgroundImage" class="max-w-7xl mx-auto " data-aos="fade-up" data-aos-duration="600" data-aos-delay="100" style="display: none;">
        <img src="/Noor-Global.svg" alt="Noor Global" class="w-full h-full object-cover" />
      </div>
    </footer>

  </div>

</template>

<script setup>
import AOS from 'aos'
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from './components/Card.vue'
import Cardd from './components/Cardd.vue'
import Testimonials from './components/Testimonials.vue'
import TestimonialsMobile from './components/TestimonialsMobile.vue'
const { t, locale } = useI18n()

const LOCALE_STORAGE_KEY = 'noor-locale'

const applyDocumentLocale = () => {
  if (typeof document === 'undefined') return
  const lang = locale.value
  const rtl = lang === 'ar'
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', lang)
}

const setAboutRightColumnMargin = (value) => {
  if (!rightSide.value) return
  const margin = typeof value === 'number' ? `${value}px` : value
  rightSide.value.style.marginLeft = ''
  rightSide.value.style.marginRight = ''
  if (margin === '0px' || margin === 0) {
    rightSide.value.style.marginInlineStart = '0px'
    rightSide.value.style.marginInlineEnd = '0px'
    return
  }
  if (document.documentElement.dir === 'rtl') {
    rightSide.value.style.marginInlineStart = '0px'
    rightSide.value.style.marginInlineEnd = margin
  } else {
    rightSide.value.style.marginInlineStart = margin
    rightSide.value.style.marginInlineEnd = '0px'
  }
}

/** Horizontal placement for sticky about text column when position is fixed (logical inset = LTR+RTL). */
const syncAboutStickyTextInset = () => {
  if (!leftSide.value) return
  const px = 16
  const maxW = 1152
  const inner = Math.min(maxW, window.innerWidth)
  const inset = Math.max(px, (window.innerWidth - inner) / 2)
  if (leftSide.value.style.position === 'fixed') {
    leftSide.value.style.left = ''
    leftSide.value.style.right = ''
    leftSide.value.style.insetInlineStart = `${inset}px`
    leftSide.value.style.insetInlineEnd = 'auto'
  } else {
    leftSide.value.style.left = ''
    leftSide.value.style.right = ''
    leftSide.value.style.insetInlineStart = ''
    leftSide.value.style.insetInlineEnd = ''
  }
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const leftSide = ref(null)
const aboutSection = ref(null)
const rightSide = ref(null)
const testimonialWrapper = ref(null)
const testimonialWrapperMobile = ref(null)
const testimonialSection = ref(null)
const testimonialsComponent = ref(null)
const testimonialsMobileComponent = ref(null)
const cardWrapperRefs = ref([])
const cardRefs = ref([])
const cardWrapperRefsMobile = ref([])
const cardRefsMobile = ref([])
const phoneImage = ref(null)
const airPhoneImage = ref(null)
const quranImage = ref(null)
const portraitSection = ref(null)
const portraitPhoneImage = ref(null)
const footerBackgroundImage = ref(null)
const footerSection = ref(null)
const faqCardRefs = ref([])
const navElement = ref(null)

const isYearly = ref(false)
const hoveredCardIndex = ref(null)
const openFaqIndex = ref(null) // Start with second FAQ open
const isNavHidden = ref(false)
const isMobileMenuOpen = ref(false)
const isLanguageDropdownOpen = ref(false)
let lastScrollY = 0

// Language selector data
const languages = [
  { code: 'en', name: 'English', label: 'English', flag: 'en.svg' },
  { code: 'ar', name: 'Arabic', label: 'العربية', flag: 'sa.svg' },
  { code: 'ru', name: 'Russian', label: 'Русский язык', flag: 'ru.svg' },
  { code: 'uz', name: 'Uzbek', label: "O'zbek tili", flag: 'uz.svg' }
]

const selectedLanguage = ref(languages[0])

// Select language function
const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  locale.value = lang.code
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang.code)
  } catch {
    /* ignore */
  }
  isLanguageDropdownOpen.value = false
  document.removeEventListener('click', handleClickOutside)
}

watch(locale, () => {
  applyDocumentLocale()
  nextTick(() => {
    handleScrolll()
    ScrollTrigger.refresh()
    if (typeof AOS !== 'undefined') AOS.refresh()
  })
})

// Handle click outside to close dropdown
const handleClickOutside = (event) => {
  const languageSelector = document.querySelector('.language-selector-container')
  if (languageSelector && !languageSelector.contains(event.target)) {
    isLanguageDropdownOpen.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

// Watch for dropdown open/close to add/remove click outside listener
watch(isLanguageDropdownOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})





// FAQ data - computed to use translations
const faqs = computed(() => [
  {
    question: t('faq.questions.q1'),
    answer: t('faq.questions.a1')
  },
  {
    question: t('faq.questions.q2'),
    answer: t('faq.questions.a2')
  },
  {
    question: t('faq.questions.q3'),
    answer: t('faq.questions.a3')
  },
  {
    question: t('faq.questions.q4'),
    answer: t('faq.questions.a4')
  },
  {
    question: t('faq.questions.q5'),
    answer: t('faq.questions.a5')
  }
])

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu and scroll to section
const closeMobileMenuAndScroll = (selector) => {
  isMobileMenuOpen.value = false
  smoothScrollTo(selector)
}

// Toggle FAQ accordion
const toggleFaq = (index) => {
  if (openFaqIndex.value === index) {
    openFaqIndex.value = null
  } else {
    const previousIndex = openFaqIndex.value
    openFaqIndex.value = index
    
    // Animate the newly opened card with fade-left effect
    nextTick(() => {
      const card = faqCardRefs.value[index]
      if (card) {
        // Reset and animate
        gsap.fromTo(card, 
          {
            opacity: 0,
            x: -30
          },
          {
            opacity:1,
            x: 0,
          }
        )
      }
    })
  }
}



// GSAP ScrollTrigger stacking cards animation
const initStackingCards = () => {
  const isDesktop = window.innerWidth >= 640
  
  // Desktop animations
  if (isDesktop && testimonialWrapper.value) {
    const cardWrappers = cardWrapperRefs.value.filter(Boolean)
    const cards = cardRefs.value.filter(Boolean)

    if (cardWrappers.length > 0 && cards.length > 0) {
      cardWrappers.forEach((wrapper, i) => {
        const card = cards[i]
        if (!card || !wrapper) return
    
        let scale = 1
        let rotation = 0
        if (i !== cards.length - 1) {
          scale = 0.9 + 0.025 * i
          rotation = -10
        }
    
        gsap.to(card, {
          scale: scale,
          rotationX: rotation,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top " + (60 + 10 * i),
            end: "bottom 550",
            endTrigger: testimonialWrapper.value,
            scrub: true,
            pin: wrapper,
            pinSpacing: false,
            invalidateOnRefresh: true
          }
        })
      })
    }
  }
  
  // Mobile animations
  if (!isDesktop && testimonialWrapperMobile.value) {
    const cardWrappersMobile = cardWrapperRefsMobile.value.filter(Boolean)
    const cardsMobile = cardRefsMobile.value.filter(Boolean)

    if (cardWrappersMobile.length > 0 && cardsMobile.length > 0) {
      cardWrappersMobile.forEach((wrapper, i) => {
        const card = cardsMobile[i]
        if (!card || !wrapper) return
    
        let scale = 1
        let rotation = 0
        if (i !== cardsMobile.length - 1) {
          scale = 0.9 + 0.025 * i
          rotation = -10
        }
    
        gsap.to(card, {
          scale: scale,
          rotationX: rotation,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top " + (60 + 10 * i),
            end: "bottom 550",
            endTrigger: testimonialWrapperMobile.value,
            scrub: true,
            pin: wrapper,
            pinSpacing: false,
            invalidateOnRefresh: true
          }
        })
      })
    }
  }
  
  ScrollTrigger.refresh()
}

// GSAP ScrollTrigger rotation animation for testimonial cards
const initTestimonialRotations = () => {
  // Kill any existing ScrollTriggers for testimonials to avoid duplicates
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && trigger.vars.trigger && 
        (trigger.vars.trigger.classList?.contains('testimonial-card-rotate') || 
         trigger.vars.trigger.dataset?.testimonialCard)) {
      trigger.kill()
    }
  })

  const isDesktop = window.innerWidth >= 640
  
  // Desktop animations
  if (isDesktop && testimonialsComponent.value) {
    const cards = testimonialsComponent.value.cardRefs?.filter(Boolean) || []

    cards.forEach((card, index) => {
      if (!card) return

      // Add data attribute for cleanup
      card.dataset.testimonialCard = 'true'
      card.classList.add('testimonial-card-rotate')

      // Different rotation directions and amounts for visual interest
      const rotations = [-5, 8, -6, 7] // Alternating rotations
      const targetRotation = rotations[index] || 0
      
      gsap.fromTo(card, 
        {
          rotation: 0
        },
        {
          rotation: targetRotation,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1.5,
            invalidateOnRefresh: true,
            markers: false // Set to true for debugging
          }
        }
      )
    })
  }
  
  // Mobile animations
  if (!isDesktop && testimonialsMobileComponent.value) {
    const cards = testimonialsMobileComponent.value.cardRefsMobile?.filter(Boolean) || []

    cards.forEach((card, index) => {
      if (!card) return

      // Add data attribute for cleanup
      card.dataset.testimonialCard = 'true'
      card.classList.add('testimonial-card-rotate')

      // Different rotation directions and amounts for visual interest
      const rotations = [-4, 6, -5, 5] // Alternating rotations
      const targetRotation = rotations[index] || 0
      
      gsap.fromTo(card, 
        {
          rotation: 0
        },
        {
          rotation: targetRotation,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1.5,
            invalidateOnRefresh: true,
            markers: false // Set to true for debugging
          }
        }
      )
    })
  }
  
  ScrollTrigger.refresh()
}

// Smooth scroll parallax for testimonial background


const handleScrolll = () => {
  const scrollY = window.scrollY || window.pageYOffset
  
  // Handle navigation hide/show on scroll
  if (navElement.value) {
    const scrollThreshold = 1 // Hide nav after scrolling 100px
    const scrollDifference = scrollY - lastScrollY
    
    if (scrollY > scrollThreshold) {
      // Scrolling down - hide nav
      if (scrollDifference > 5) {
        isNavHidden.value = true
      }
      // Scrolling up - show nav
      else if (scrollDifference < -5) {
        isNavHidden.value = false
      }
    } else {
      // Always show nav when near top
      isNavHidden.value = false
    }
    
    lastScrollY = scrollY
  }

  if (!leftSide.value || !aboutSection.value) return

  const sectionTop = aboutSection.value.offsetTop
  const sectionHeight = aboutSection.value.offsetHeight
  const leftHeight = leftSide.value.offsetHeight
  const topOffset = 10 

  const sectionBottom = sectionTop + sectionHeight
  
  if (scrollY + topOffset < sectionTop) {
    // Section boshlanishidan oldin
    leftSide.value.style.position = 'relative'
    leftSide.value.style.top = '0px'
    setAboutRightColumnMargin('0px')
    syncAboutStickyTextInset()
  }
  else if (scrollY + topOffset + leftHeight > sectionBottom) {
    // Section oxirida - stay at bottom of section
    if (document.documentElement.dir !== 'rtl') {
      
      leftSide.value.style.position = 'absolute'
      leftSide.value.style.top = (sectionHeight - leftHeight - 100) + 'px'
      setAboutRightColumnMargin('580px')
      syncAboutStickyTextInset()
    }
  } else {
    // Section ichida sticky/fixed
    if (document.documentElement.dir !== 'rtl') {
      leftSide.value.style.position = 'fixed'
      leftSide.value.style.top = topOffset + 50 + 'px'
      setAboutRightColumnMargin('580px')
      syncAboutStickyTextInset()
    }
  }

  // Switch between air-phone.svg and quran.png based on portraitTop, then hide at halfway
  // Only works on screens ≤ 640px
  if (window.innerWidth >= 640 && phoneImage.value && portraitSection.value) {
    const portraitTop = portraitSection.value.offsetTop - 400
    const portraitHeight = portraitSection.value.offsetHeight
    const halfwayPoint = portraitTop + (portraitHeight / 2.4)
    
    if (scrollY >= halfwayPoint) {
      phoneImage.value.style.display = 'none'
      // Show portrait phone image after phoneImage exits
      if (portraitPhoneImage.value) {
        portraitPhoneImage.value.style.display = 'flex'
      }
    } else {
      phoneImage.value.style.display = 'flex'
      // Hide portrait phone image when phoneImage is visible
      if (portraitPhoneImage.value) {
        portraitPhoneImage.value.style.display = 'none'
      }
      
      // Show air-phone.svg up to portraitTop, then show quran.png
      if (airPhoneImage.value && quranImage.value) {
        if (scrollY < portraitTop) {
          airPhoneImage.value.style.display = 'block'
          quranImage.value.style.display = 'none'
        } else {
          airPhoneImage.value.style.display = 'none'
          quranImage.value.style.display = 'block'
        }
      }
    }
  }else{

    const portraitTop = portraitSection.value.offsetTop - 400
    const portraitHeight = portraitSection.value.offsetHeight
    const halfwayPoint = portraitTop + (portraitHeight / 5)
    
    if (scrollY >= halfwayPoint) {
      phoneImage.value.style.display = 'none'
      // Show portrait phone image after phoneImage exits
      if (portraitPhoneImage.value) {
        portraitPhoneImage.value.style.display = 'flex'
      }
    } else {
      phoneImage.value.style.display = 'flex'
      // Hide portrait phone image when phoneImage is visible
      if (portraitPhoneImage.value) {
        portraitPhoneImage.value.style.display = 'none'
      }
      
      // Show air-phone.svg up to portraitTop, then show quran.png
      if (airPhoneImage.value && quranImage.value) {
        if (scrollY < portraitTop) {
          airPhoneImage.value.style.display = 'block'
          quranImage.value.style.display = 'none'
        } else {
          airPhoneImage.value.style.display = 'none'
          quranImage.value.style.display = 'block'
        }
      }
    }
  }

  // Show footer background image when footer section is in view
  if (footerBackgroundImage.value && footerSection.value) {
    const footerTop = footerSection.value.offsetTop
    const viewportHeight = window.innerHeight
    const triggerPoint = footerTop - viewportHeight + 200 // Show when footer is 200px from bottom of viewport
    
    if (scrollY >= triggerPoint) {
      footerBackgroundImage.value.style.display = 'flex'
    } else {
      footerBackgroundImage.value.style.display = 'none'
    }
  }
}



// Easing function for smooth animation
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Smooth scroll to section with slow animation
const smoothScrollTo = (selector) => {
  const element = document.querySelector(selector)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - 80 // Offset for fixed header
    const startPosition = window.pageYOffset
    const distance = offsetPosition - startPosition
    const duration = 1000 // 1 second for slower scroll
    let start = null

    const animation = (currentTime) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }
}

// Smooth scroll to top with slow animation
const smoothScrollToTop = () => {
  const startPosition = window.pageYOffset
  const distance = -startPosition
  const duration = 1000 // 1 second for slower scroll
  let start = null

  const animation = (currentTime) => {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const progress = Math.min(timeElapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * ease)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

// Handle card hover for interactive effects
const handleCardHover = (index) => {
  hoveredCardIndex.value = index
}

const handleCardLeave = (index) => {
  hoveredCardIndex.value = null
}



onMounted(() => {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && ['en', 'ar', 'ru', 'uz'].includes(saved)) {
      locale.value = saved
      const lang = languages.find((l) => l.code === saved)
      if (lang) selectedLanguage.value = lang
    }
  } catch {
    /* ignore */
  }
  applyDocumentLocale()

  lastScrollY = window.scrollY || window.pageYOffset
  window.addEventListener('scroll', handleScrolll)
  window.addEventListener('resize', handleScrolll)
  handleScrolll() // page load paytida ishlatish
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrolll)
  window.removeEventListener('resize', handleScrolll)
})
const backgroundCanvas = ref(null)
let animationFrame = null

// Draw canvas background with smooth organic animation
const drawBackground = () => {
  if (!backgroundCanvas.value) return
  
  const canvas = backgroundCanvas.value
  const container = canvas.parentElement
  const rect = container.getBoundingClientRect()
  
  // Set canvas size to match container with high DPI
  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = rect.width + 'px'
  canvas.style.height = rect.height + 'px'
  
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  
  const width = rect.width
  const height = rect.height
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Create organic, undulating shape with horizontal gradient
  const time = Date.now() * 0.0003
  const topPosition = height * 0.25 // Position at top of canvas
  
  // Create horizontal gradient from light mint to darker seafoam green
  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, '#A8E6CF') // Light mint green
  gradient.addColorStop(0.3, '#7FD8B0') // Medium green
  gradient.addColorStop(0.6, '#4ECB9A') // Medium-dark green
  gradient.addColorStop(1, '#1ECE83') // Darker seafoam green
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  
  // Create organic, undulating shape spanning full width
  const segments = 100
  const amplitude = height * 0.12 // Height variation for top edge
  const baseHeight = height * 0.10 // Base thickness
  
  // Draw top edge with undulating curves
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width
    const t = (i / segments) * Math.PI * 1 + time
    
    // Complex wave function for organic, irregular peaks and valleys
    const wave1 = Math.sin(t * 0.5) * amplitude * 0.6
    const wave2 = Math.sin(t * 1.3 + 1) * amplitude * 0.4
    const wave3 = Math.sin(t * 2.7 + 2) * amplitude * 0.2
    const wave4 = Math.cos(t * 0.8 + 0.5) * amplitude * 0.3
    
    // Add more variation for jagged/angular parts on the right
    let jagged = 0
    if (i > segments * 0.6) {
      jagged = Math.sin(t * 5) * amplitude * 0.15
    }
    
    const y = topPosition + wave1 + wave2 + wave3 + wave4 + jagged
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  
  // Draw bottom edge with different undulating pattern
  for (let i = segments; i >= 0; i--) {
    const x = (i / segments) * width
    const t = (i / segments) * Math.PI * 4 + time + Math.PI
    
    // Different wave pattern for bottom edge
    const wave1 = Math.cos(t * 0.6) * amplitude * 0.5
    const wave2 = Math.sin(t * 1.5 + 1.5) * amplitude * 0.35
    const wave3 = Math.cos(t * 2.3 + 3) * amplitude * 0.25
    const wave4 = Math.sin(t * 0.9 + 2) * amplitude * 0.2
    
    // Deeper indentations and sharper points towards center/right
    let angular = 0
    if (i > segments * 0.4 && i < segments * 0.8) {
      angular = Math.sin(t * 6) * amplitude * 0.2
    }
    
    const y = topPosition + baseHeight + wave1 + wave2 + wave3 + wave4 + angular
    
    ctx.lineTo(x, y)
  }
  
  ctx.closePath()
  ctx.fill()
  
  // Reset filters
  ctx.globalAlpha = 1
  ctx.filter = 'none'
}

// Animation loop with optimized frame rate
let lastTime = 0
const targetFPS = 10
const frameInterval = 10 / targetFPS

const animate = (currentTime) => {
  if (currentTime - lastTime >= frameInterval) {
    drawBackground()
    lastTime = currentTime
  }
  animationFrame = requestAnimationFrame(animate)
}

// Add parallax effect on scroll
const handleScroll = () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll('.parallax')
  
  parallaxElements.forEach((element) => {
    const speed = 0.5
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
}

onMounted(() => {
  // Refresh AOS on mount to ensure animations work
  AOS.refresh()
  
  // Refresh AOS after DOM is fully rendered
  nextTick(() => {
    setTimeout(() => {
      AOS.refresh()
    }, 100)
  })
  
  // Start canvas animation
  if (backgroundCanvas.value) {
    // Initial draw
    drawBackground()
    // Start animation loop
    animationFrame = requestAnimationFrame(animate)
  }
  
  // Add scroll listener for parallax
  window.addEventListener('scroll', handleScroll)
  
  // Handle resize with debounce
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      drawBackground()
      ScrollTrigger.refresh()
      AOS.refresh()
      // Reinitialize testimonial rotations on resize
      initStackingCards()
      initTestimonialRotations()
    }, 150)
  })

  // Initialize stacking cards animation after DOM is ready
  nextTick(() => {
    setTimeout(() => {
      initStackingCards()
      initTestimonialRotations()
    }, 100)
  })
})

onUnmounted(() => {
  // Cleanup
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', drawBackground)
  document.removeEventListener('click', handleClickOutside)
  
  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
/* Additional component-specific styles if needed */

/* Navigation hide/show on scroll */
nav {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  will-change: transform;
  backface-visibility: hidden;
}

.nav-fade-up {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.nav-fade-down {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.gradient-border-top {
  position: relative;
  background:#F0F1F3;
  border-radius: 20px 20px 0 0;
  border-bottom: none !important;
}

/* gradient border */
.gradient-border-top::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 8px;
  padding-bottom: 0;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(90deg, #ffffff, #ffffff);

  /* bottom'ni o‘chiradi */
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;

  /* faqat top + sides */
  clip-path: inset(0 0 8px 0);
  pointer-events: none;
}

/* Navigation link hover animations */
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #22c55e, #16a34a);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: #22c55e;
}

.nav-link:hover::after {
  width: 100%;
}

/* Individual letter animations */
.nav-letter {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
  animation: navLetterFloat 3s ease-in-out infinite;
}

.nav-link:hover .nav-letter {
  animation: navLetterHover 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes navLetterFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
}

@keyframes navLetterHover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(-4px);
  }
}

/* Animated flowing line - creates a moving highlight along solid lines */
.animated-line {
  filter: drop-shadow(0 0 4px rgba(74, 222, 128, 0.8));
}

.line-1 {
  animation: flowMove 2.5s linear infinite;
}

.line-2 {
  animation: flowMove 2.7s linear infinite;
  animation-delay: 0.2s;
}

.line-3 {
  animation: flowMove 2.3s linear infinite;
  animation-delay: 0.4s;
}

.line-4 {
  animation: flowMove 2.6s linear infinite;
  animation-delay: 0.1s;
}

.line-5 {
  animation: flowMove 2.4s linear infinite;
  animation-delay: 0.3s;
}

.line-6 {
  animation: flowMove 2.8s linear infinite;
  animation-delay: 0.5s;
}

@keyframes flowMove {
  0% {
    stroke-dashoffset: 330;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Icon Animations - Each with unique animation */
.icon-compass {
  animation: compassFloat 3s ease-in-out infinite;
  transform-origin: center;
}

.icon-quran {
  animation: quranPulse 2.5s ease-in-out infinite;
}

.icon-prayer {
  animation: prayerBounce 2.8s ease-in-out infinite;
}

.icon-beads {
  animation: beadsSwing 3.2s ease-in-out infinite;
  transform-origin: top center;
}

.icon-hourglass {
  animation: hourglassFlip 3.5s ease-in-out infinite;
  transform-origin: center;
}

.icon-book {
  animation: bookOpen 2.6s ease-in-out infinite;
  transform-origin: center;
}

/* Compass: Floating rotation animation */
@keyframes compassFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(5deg);
  }
  50% {
    transform: translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

/* Quran: Pulse/scale animation */
@keyframes quranPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

/* Prayer: Bounce up animation */
@keyframes prayerBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Prayer Beads: Swinging motion */
@keyframes beadsSwing {
  0%, 100% {
    transform: rotate(0deg) translateY(0);
  }
  25% {
    transform: rotate(8deg) translateY(-10px);
  }
  50% {
    transform: rotate(0deg) translateY(-15px);
  }
  75% {
    transform: rotate(-8deg) translateY(-10px);
  }
}

/* Hourglass: Flip/rotate animation */
@keyframes hourglassFlip {
  0%, 100% {
    transform: rotateY(0deg) scale(1);
  }
  25% {
    transform: rotateY(10deg) scale(1.05);
  }
  50% {
    transform: rotateY(0deg) scale(1.1);
  }
  75% {
    transform: rotateY(-10deg) scale(1.05);
  }
}

/* Open Book: Fade with scale animation */
@keyframes bookOpen {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.08) rotate(2deg);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.12) rotate(0deg);
    opacity: 0.9;
  }
  75% {
    transform: scale(1.08) rotate(-2deg);
    opacity: 0.95;
  }
}

/* Parallax Background Styles */
.parallax-bg {
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  transition: transform 0.1s ease-out;
  z-index: 0;
}

/* Stacking Cards Styles */
.spacer,
.testimonial-wrapper {
  width: 100%;
}

.testimonial-wrapper {
  padding-top: 100px;
  padding-bottom: 100px;
  position: relative;
}

.testimonial-parallax-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
}

.testimonial-card-wrapper {
  width: 100%;
  perspective: 500px;
  margin-bottom: 50px;
}


.testimonial-card-wrapper:last-child {
  margin-bottom: 0;
}

.testimonial-cards {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 50px;
}

.testimonial-card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
}

.testimonial-card-image {
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

@media (max-width: 768px) {
  .testimonial-cards {
    width: 95%;
    padding: 0 20px;
  }

  .gradient-border-top {
  position: relative;
  background:#F0F1F3;
  border-radius: 20px 20px 0 0;
  border-bottom: none !important;
}

/* gradient border */
.gradient-border-top::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 4px;
  padding-bottom: 0;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(90deg, #ffffff, #ffffff);

  /* bottom'ni o‘chiradi */
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;

  /* faqat top + sides */
  clip-path: inset(0 0 8px 0);
  pointer-events: none;
}


  
  
}

/* FAQ Accordion Styles */
.faq-card {
  border-radius: 16px;
  padding: 20px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}




.faq-question-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  gap: 16px;
}

.faq-question-text {
  font-size: 18px;
  font-weight: 400;
  color: #3B3B3B;
  line-height: 1.5;
  flex: 1;
}

.faq-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: #2A2A2A;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-card-open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  margin-top: 16px;
  padding-top: 16px;
}

.faq-answer-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #707070;
  margin: 0;
}

/* FAQ Answer Transition Animation */
.faq-answer-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
}

.faq-answer-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer-enter-from {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}

.faq-answer-enter-to {
  opacity: 1;
  max-height: 500px;
}

.faq-answer-leave-from {
  opacity: 1;
  max-height: 500px;
}

.faq-answer-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}

@media (max-width: 768px) {
  .faq-question-text {
    font-size: 16px;
  }
  
  .faq-answer-text {
    font-size: 14px;
  }
  
  .faq-card {
    padding: 16px 20px;
  }
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>

