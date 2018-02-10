const tools = {
  steal: (url, tag) => {
    let zz = /\.\w*$/
    let hz = zz.exec(url)[0]  
    if (hz.indexOf('gif') !== -1) {
      hz = '.gif'
    }
    let newUrl = url.replace(/[^\.]\w*$/, tag) + hz
    return newUrl
  }
}

export default tools

// (/[^\.]\w*$/.exec(url))[0]  
