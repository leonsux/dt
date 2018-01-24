### 关于antd-mobile跑马灯默认图片问题

当图片的地址有误导致图片加载失败时，我们需要显示一张error默认图片

在原生标签中可以给img标签添加`onerror`标签：

`<img src="/image/a.png" alt="" onerror="this.src='/image/error.png;'">`

这样当src的url地址失效了，会执行onerror里的代码

但是在antd-mobile中的img标签中，onerror是不能用的，用的话控制台会提示让你使用`onError`，onError是一个函数：

`<img src="/image/a.png" alt="" onError="() => { console.log(this) }">`

这里的this就是AppBanner组件，如果不用箭头函数的this就是undefined，所以我们无法直接获取到当前的img标签，也就没办法给他设置src

但是这样想，既然能拿到AppBanner，我们也就可以通过refs拿到他下面的所有元素，给每一个img添加一个唯一的ref标识，onError时直接通过AppBanner的refs就能找到路径出错的图片，下面是代码：

```
<Carousel
  autoplay={false}
  infinite
  selectedIndex={0}
  beforeChange={(from, to) => {}}
  afterChange={index => {}}
>
  {
    this.state.banners.map(val => (
      <a
        key={val.album_id}
        href="http://leonsux.top"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, position: 'relative' }}
      >
        <span style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', background: '#000', opacity: '0.2'}}></span>
        <img
          {/* 用ref标识该img */}
          ref={val.album_id}
          src={val.image.slice(0, 70)+'thumb.600_0_c.'+val.image.slice(70)}
          alt=""
          style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            {/*this.setState({ imgHeight: 'auto' });*/}
          }}
          {/* here~ */}
          onError={() => { this.refs[val.album_id].src='https://upload.jianshu.io/users/upload_avatars/3629578/d80d6cf5-d91b-4409-8561-f1dd2b95f1ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120' }}
        />
        <span style={{ position: 'absolute', zIndex: '999', left: '12',bottom: '25',color: '#fff' }}>
          <span style={{ display: 'block', fontSize: '12'}}>{val.timestamp}</span>
          <span style={{ display: 'block', fontSize: '20'}}>{val.title}</span>
        </span>
      </a>
    ))
  }
</Carousel>
```

--- 1.24补坑

`onError`里设置的图片路径一定要确保可用，不然会陷入死循环，道理跟在数据更新的钩子函数里更改数据一样

### 跑马灯设置自动轮播失效（需要手动滑一下才能正常自动轮播）

如果是写死的数据不会出现这种情况，但通常我们的数据都是通过ajax请求来的，这就导致组件加载的时候还没有数据，这也是不能轮播的原因，所以只要判断一下就好了：

```
{
  this.state.banners.length ? <Carousel ...> ... </Carousel> : ''
}
```

有数据的时候再加载轮播组件，否则什么都不显示，当然也可显示你自定义的内容

### 避免滚动事件执行多次

做下拉无限的时候，会出现滑到底部后，数据还没获取到，获取到之后还要渲染到页面上，在这个时间里，滚动事件会一直被触发，且由于没有添加元素，高度没变，符合获取数据的条件，会一直向后端请求数据

解决思路是添加标识`isLoading`，当不获取数据的时候isLoading为false，滚动事件正常监听，当要获取数据时把isLoading设置为true，这样滚动事件就不会执行（准确的说是执行了，但是什么也不干，直接return），当数据获取完毕再将isLoading改为false

伪代码：

```
isLoading = false

getData () {
  // 开始获取数据，暂时废了滚动事件
  isLoading = true
  axios.().then(res => {
    // 获取完数据，滚动事件继续
    isLoading = false
  })
}

window.onscroll = (e) => {
  // 判断要不要滚
  if (isLoading) { return }
  // 滚到底部，或者其他触发条件
  if (ok) {
    getData()
  }
}

```

### 完善了转换图片路径的方法，并封装到工具库里

由于需要用到转换图片路径的地方很多，之前写的方法经项目深入发现不能适用于所有情况，于是决定好好封装一波

`/utils/tools.js`

```
const tools = {
  // 原图片地址，需要添加的标识
  steal: (url, tag) => {
    // 取出图片后缀名先
    let hz = /[^\.]\w*$/.exec(url)[0]
    // 移花接木
    let newUrl = url.replace(/[^\.]\w*$/, tag) + hz
    // 返回新路径
    return newUrl
  }
}

export default tools

```

### 关于组件复用

项目中很多模块结构类似，基本上只有细小的差别，不能做到直接拿来就用

项目中瀑布流的每个item就是个例子，在主页列表有，详情页也有

区别是：

主页的有用户头像等信息

详情页由于已经定位了用户信息，所以不会再显示头像等信息，只会显示标题信息

解决的办法是：在不同地方使用组件时传过去一个标识，组件根据这个标识来确认该怎样显示内容

```
{
  this.props.showInfo ? <div>信息</div> : ''
}
```
