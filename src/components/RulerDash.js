/**
 * 2.坐标系 线
 * 3.位置线
 */

export function showRulerDash(isShow, x = 0, y = 0) {
  //1是否显示   当鼠标按下时显示 松开时隐藏
  if (isShow) {
    $(".topRulerDash").css("display", "block");
    $(".leftRulerDash").css("display", "block");
    $(".topRulerDash").css("top", `${y}px`);
    $(".leftRulerDash").css("left", `${x}px`);
  } else {
    $(".topRulerDash").css("display", "none");
    $(".leftRulerDash").css("display", "none");
  }

  //2具体位置    只在显示view 中显示
  //当鼠标 mouseX > 容器x  lineX mouseX-X
  return;
}

export default (function($) {
  //创建容器
  const RulerDash = `<div class="topRulerDash" ></div><div class="leftRulerDash"></div>`;

  $(".Formview").append(RulerDash);
})(jQuery);
