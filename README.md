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

### 跑马灯设置自动轮播失效（需要手动滑一下才能正常自动轮播）

如果是写死的数据不会出现这种情况，但通常我们的数据都是通过ajax请求来的，这就导致组件加载的时候还没有数据，这也是不能轮播的原因，所以只要判断一下就好了：

```
{
  this.state.banners.length ? <Carousel ...> ... </Carousel> : ''
}
```

有数据的时候再加载轮播组件，否则什么都不显示，当然也可显示你自定义的内容
