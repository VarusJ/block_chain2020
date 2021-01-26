<template>
  <a-layout-footer class="layout-footer">
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />
      2021
      <span>18342040 景致</span>
    </div>
  </a-layout-footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="scss" scoped>
  .layout-footer {
    text-align: center;
    user-select: none;
    background-color: transparent;
  }
  
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
</style>
