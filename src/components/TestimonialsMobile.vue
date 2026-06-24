<template>
  <div ref="testimonialWrapperMobile" class="flex flex-col items-center justify-center min-h-screen gap-[128px]">
    <div 
      v-for="(testimonial, index) in testimonialsMobile" 
      :key="`mobile-${index}`"
      :ref="el => { if (el) cardWrapperRefsMobile[index] = el }"
      class="testimonial-card-wrapper"
    >
      <div 
        :ref="el => { if (el) cardRefsMobile[index] = el }"
        class="testimonial-card bg-[#EFF0F1] border border-[#BFBFBF] rounded-[32px] p-2 w-[335px]"
      >
        <div class="bg-white flex flex-col gap-4 items-start rounded-[24px] px-4 py-8 w-[319px]">
          <!-- Left side: Profile picture and info -->
          <div class="flex items-start flex-shrink-0 w-full">
            <div class="flex flex-col w-full justify-start items-start">
              <img 
                :src="testimonial.image" 
                :alt="testimonial.name" 
                class="w-28 h-28 rounded-xl object-cover mb-4"
              />
              <h3 class="text-[#2A2A2A] font-bold text-[20px] mb-1 text-center md:text-start font-work-sans">{{ testimonial.name }}</h3>
              <p class="text-[#B1B1B1] text-[20px] text-center md:text-start font-medium">{{ testimonial.role }}</p>
            </div>
            <div class="text-gray-300 text-9xl font-serif leading-none" style="font-family: Georgia, serif;"><img src="/undo.svg" alt="Quote" /></div>
          </div>

          <!-- Right side: Quote and testimonial text -->
          <div class="flex-1 relative">
            <div class="relative">
              <p class="text-[#707070] text-sm leading-relaxed font-normal">
                "{{ testimonial.quote }}"
              </p>
              <p class="text-[#707070] text-sm leading-relaxed font-normal">
                {{ testimonial.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const { tm } = useI18n()

const testimonialWrapperMobile = ref(null)
const cardWrapperRefsMobile = ref([])
const cardRefsMobile = ref([])

const testimonialsMobile = computed(() => {
  try {
    // Use tm() to get translation messages as objects/arrays
    const items = tm('testimonials.items')
    const images = ['/zaynab.svg', '/hasan.svg', '/sofia.svg', '/mansur.svg']
    
    // Safety check: ensure items is an array
    if (!Array.isArray(items)) {
      console.warn('testimonials.items is not an array:', items, typeof items)
      return []
    }
    
    return items.map((item, index) => ({
      ...item,
      image: images[index] || '/zaynab.svg'
    }))
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return []
  }
})

// GSAP ScrollTrigger stacking cards animation
const initStackingCards = () => {
  if (!testimonialWrapperMobile.value) return
  
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
  
  ScrollTrigger.refresh()
}

onMounted(() => {
  nextTick(() => {
    initStackingCards()
  })
})

defineExpose({
  cardWrapperRefsMobile,
  cardRefsMobile,
  testimonialsMobile
})
</script>
  
  <style scoped>
  </style>
  
  