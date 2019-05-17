TypeScript Cypress Modify Window Before Scripts Running Demo
============================================================

当我们调用`cy.visit`访问一个页面的时候，其中的`onBeforeLoad`方法将在html被获取、
但任何javascript都没有执行的时候执行（包括页面中嵌入的`<script>`）。

注意：这一点跟我预想的不同，因为在html中，`load`事件是在页面引用的所有资源都载入后才会触发
（所有javascript都执行后），所以应该解释为，cypress中onBeforeLoad中的`load`
并不是`window.onload`中的load，而是表示把获取到的html代码"load"到浏览器中、但还没有执行任何javascript之前的时刻。

所以在这个方法中，我们可以对window对象进行修改，方便后续使用。

但需要注意的是：在修改的时候，我们直接调用

```
win.featureToggles = {
  toggle1 : true
}
```

是不行的，因为随后`index.html`中的

```
<script>
  window.featureToggles = {
    'toggle1': false
  }
</script>
```

会执行，又把它改回原样，覆盖掉我们的修改。

所以我们需要使用`Object.defineProperty`的方式来定义`featureToggles`，
只为它提供getter，不提供setter。这样后面对`window.featureToggles`赋值的代码都会无效，
保证拿到的都是我们在`onBeforeLoad`中定义的值。

```
npm install
npm run test:open
npm run test:run
```
