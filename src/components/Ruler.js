/**
 * 1.容器属性 x y height width
 * 2.坐标系 线
 * 3.位置线
 */

export default (function($) {
  //创建容器
  let topRuler = [];
  let leftRuler = [];
  for(let i=0;i<30;i++){
    const topCell = `<li><ul class="dot"><span>${i*100}</span><li></li><li></li><li></li><li></li></ul></li>`
    topRuler.push(topCell)
  }
  topRuler = `<div class="topRuler"><ul>${topRuler.join('')}</ul></div>`

  for(let i=0;i<30;i++){
    const leftCell = `<li><ul class="dot"><span>${i*100}</span><li></li><li></li><li></li><li></li></ul></li>`
    leftRuler.push(leftCell)
  }
  leftRuler = `<div class="leftRuler"><ul>${leftRuler.join('')}</ul></div>`
  

  $('#Showform').append(topRuler);
  $('#Showform').append(leftRuler);
})(jQuery)