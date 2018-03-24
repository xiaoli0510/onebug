// 添加类名
export function addClass(el,className){
    if(hasClass(el,className)){
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className=newClass.join(' ')
}

// 判断是否有这个类名的
export function hasClass(el,className){
    const reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
    return reg.test(el.className)
}

// 设置获取属性
export function getData(el,name,val){
    const prefix = 'data-'
    name=prefix+name
    if(val){
       return el.setAttribute(name,val)
    }else{
        return el.getAttribute(name)
    }
}

let elementStyle=document.createElement('div').style

let vendor=(()=>{
    let transformNames={
        webkit:'webkitTransform',
        Moz:'MozTransform',
        O:'Otransform',
        ms:'msTransform',
        standard:'transform'
    }

    for(let key in transformNames){
      if(elementStyle[transformNames[key]]!==undefined){
          return key
      }
    }
    return false
})()

// 添加前缀以兼容浏览器的
export function prefixStyle(style){
    if(vendor===false){
       return false
    }
    if(vendor==='standard'){
       return style
    }
    // 拼接 eg:webkitTransform
    return vendor + style.charAt(0).toUpperCase()+style.substr(1)
}