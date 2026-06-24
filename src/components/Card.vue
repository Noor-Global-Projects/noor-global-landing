<template>
  <div class=" flex flex-col gap-6 items-center justify-center ">
    <div 
      v-for="(card, index) in cards" 
      :key="index"
      class="border border-[#DFDFDF] rounded-[24px] p-[10px]" 
      :data-aos="'fade-up'" 
      :data-aos-duration="600" 
      :data-aos-delay="900 + (index * 100)"
    >
        <div class="relative max-w-md w-full rounded-[16px] bg-gradient-to-br from-[#1ECE8340] via-[#1ECE8308] to-[#FFFFFF] border-[3px] border-[#FFFFFF]">
          
          <!-- Text content -->
          <h2 class="text-2xl font-semibold text-[#2A2A2A] mb-2 px-4 pt-6 font-work-sans">
            {{ card.title }}
          </h2>
      
          <p class="text-[#707070] text-sm mb-5 px-4 font-normal ">
            {{ card.description }}
          </p>
      
          <!-- Feature list -->
          <ul class="space-y-3 mb-6 px-4">
            <li 
              v-for="(feature, featureIndex) in card.features" 
              :key="featureIndex"
              class="flex items-center gap-3"
              :dir="locale === 'ar' ? 'rtl' : 'ltr'"
            >
              <img src="/cc.png" alt="Check" class="w-[24px] h-[24px]" />
              <span class="text-[#707070] text-base font-normal">{{ feature }}</span>
            </li>
          </ul>
      
          <!-- Phone mockup -->
          <div class="relative flex justify-center" >
            <img :src="card.image" alt="Card Phone" class="w-full h-full object-contain rounded-[16px]" />
          </div>
      
        </div>
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, locale } = useI18n()

const cards = computed(() => {
  try {
    // Use tm() to get translation messages as objects/arrays
    const items = tm('cards.items')
    
    // Safety check: ensure items is an array
    if (!Array.isArray(items)) {
      console.warn('cards.items is not an array:', items, typeof items)
      return []
    }
    
    return items
  } catch (error) {
    console.error('Error loading cards:', error)
    return []
  }
})
</script>

<style scoped>

</style>