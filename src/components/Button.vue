<template>
  <button :class="[colorVariants]"  class="border border-solid py-2 px-3 rounded-full" >{{name}}</button>
</template>

<script>
export  default {
  name : 'Button',
  data(){
   return {
    count : this.status
   }
  },
  computed: {
    colorVariants() {
      if (this.variantType=='outline'){
        return "border-cyan-400 m-2 text-black font-black text-xl bg-white hover:bg-cyan-300";
      }else {
        return "bg-cyan-400 m-2 text-black font-black text-xl hover:bg-cyan-300";
      }
    }
  },
  props : ['name', 'color', 'variantType']
}
</script>