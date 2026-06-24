<template>
  <div ref="testimonialWrapper" class="flex flex-col items-center justify-center min-h-screen gap-[128px]">
    <div 
      v-for="(testimonial, index) in testimonials" 
      :key="`desktop-${index}`"
      :ref="el => { if (el) cardWrapperRefs[index] = el }"
      class="testimonial-card-wrapper"
    >
      <div 
        :ref="el => { if (el) cardRefs[index] = el }"
        class="testimonial-card bg-[#EFF0F1] border border-[#BFBFBF] rounded-[32px] p-2 w-[804px]"
      >
        <div class="bg-white flex flex-col md:flex-row gap-8 items-start rounded-[24px] p-8 w-[788px]">
          <!-- Left side: Profile picture and info -->
          <div class="flex flex-col items-center md:items-start flex-shrink-0">
            <img 
              :src="testimonial.image" 
              :alt="testimonial.name" 
              class="w-28 h-28 rounded-xl object-cover mb-4"
            />
            <h3 class="text-[#2A2A2A] font-bold text-[20px] mb-1 text-center md:text-start font-work-sans">{{ testimonial.name }}</h3>
            <p class="text-[#B1B1B1] text-[20px] text-center md:text-start font-medium">{{ testimonial.role }}</p>
          </div>

          <!-- Right side: Quote and testimonial text -->
          <div class="text-gray-300 text-9xl font-serif leading-none" style="font-family: Georgia, serif;"><img src="/undo.svg" alt="Quote" /></div>
          <div class="flex-1 relative">
            <div class="relative pl-6 pt-2 w-[393px]">
              <p class="text-[#707070] text-[18px] leading-relaxed font-normal">
                "{{ testimonial.quote }}"
              </p>
              <p class="text-[#707070] text-[18px] leading-relaxed font-normal">
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

const testimonialWrapper = ref(null)
const cardWrapperRefs = ref([])
const cardRefs = ref([])

const testimonials = computed(() => {
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
  if (!testimonialWrapper.value) return
  
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
  
  ScrollTrigger.refresh()
}

onMounted(() => {
  nextTick(() => {
    initStackingCards()
  })
})

defineExpose({
  cardWrapperRefs,
  cardRefs,
  testimonials
})
</script>

<style scoped>
</style>

