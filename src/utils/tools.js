const tools = {
  steal: (url, tag) => {
    
    let hz = /[^\.]\w*$/.exec(url)
    let newUrl = url.replace(/[^\.]\w*$/, tag) + hz
    return newUrl
  }
}

export default tools
