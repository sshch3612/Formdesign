/**
 * 1.容器属性 x y height width
 * 2.坐标系 线  1触发时机
 * 3.位置线
 */
/**
 *
 *
 *  */
import text from "./Tags/text";

export function getView(selector) {
  const rect = $(selector)[0].getBoundingClientRect();

  const top = document.documentElement.clientTop;
  const left = document.documentElement.clientLeft;
  const scrollTop = $(document).scrollTop();
  const scrollLeft = $(document).scrollLeft();
  return {
    x: rect.left - left + scrollLeft,
    y: rect.top - top + scrollTop,
    h: rect.height,
    w: rect.width
  };
}

export function Sitecomponent(mouseX, mouseY) {
  const { x: containX, y: containY, h: containH, w: containW } = getView(
    ".Formview"
  );
  const x =
    mouseX - containX >= 0 && mouseX - containX <= containW
      ? mouseX - containX
      : 0;

  const y =
    mouseY - containY >= 0 && mouseY - containY <= containH
      ? mouseY - containY
      : 0;
  return {
    x: x,
    y: y
  };
}

export function Buildcomponent(type, x, y, id) {
  //渲染组件
  let Ele = null;
  switch (type) {
    case "text":
      Ele = text.template;
      break;

    default:
      break;
  }

  Ele = `<div id='${id}' class="component-node" style="width:200px;background:red;height:100px;position:absolute;left:${x}px;top:${y}px">
  <i class="right"></i>
  </div>`;
  $(".Formview-contain").append(Ele);
  return Ele;
}

//更新组件位置
export function Sitechange(ele, x, y) {
  ele.css({
    left: `${x}px`,
    top: `${y}px`
  });
  return;
}

export function Shapechange(ele, w, h) {
  ele.css({
    width: `${w}px`,
    height: `${h}px`
  });
  return;
}

export function moveDistance(left, top, startX, startY, endX, endY) {

  const x = endX - startX + left < 0 ?  - left : endX - startX;
  const y = endY - startY + top < 0 ?  - top : endY - startY;

  return {
    x: x,
    y: y
  };
}

export default (function($) {
  //创建容器
  const containerEle = `<div class="Formview">
    <div class="Formview-contain"></div>
  </div>`;
  $("#Showform").append(containerEle);
})(jQuery);
