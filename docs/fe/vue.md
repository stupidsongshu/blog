# Vue

```js
// vue2
export default {
  name: 'TempVar',
  functional: true,
  render(h, ctx) {
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {})
  }
}
```

```vue
<template>
  <div>
    <TempVar
      :var1="`Hello ${name}`"
      :var2="version"
    >
      <!-- 作用域插槽 -->
      <template v-slot="{ var1, var2 }">
        <span>{{var1}}</span>
        <span>{{var2}}</span>
      </template>
    </TempVar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vue',
      version: 2
    }
  }
}
</script>
```

## ant-design-vue-pro
- [vueComponent/ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro/tree/geektime)
- [machenjie/ant-design-vue-pro](https://github.com/machenjie/ant-design-vue-pro)
