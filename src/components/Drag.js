/**
 * Jquery 进行扩展
 * 1.左键按下  鼠标按下确认组件类型  return type-> 渲染相同组件(拖动时)
 * 2.鼠标移动  监听mousemove事件 -> 重复改变组件位置
 * 3，鼠标松开  return (x,y) + type 记录坐标位置  ->  容器中存放组件
 * 4.容器坐标系的制作
 * 5.容器中组件属性操作
 * 6.数据结构的生成
 * */

//鼠标事件的封装
//组件的封装 <div id='drag-component' data-type=''></div>
/**
 * id 选择器用于绑定事件
 * data-type属性用于确认 组件类型
 *  */

import { Sitecomponent, Buildcomponent } from "./Container";
import { showRulerDash } from "./RulerDash";
import { CreateData } from './Jsondata';

export default (function($) {
  /**
   * 事件绑定
   *
   */
  var aID = 1;
  $.each($(".drag-component"), function(index, ele) {
    $(ele).on("mousedown", function(e) {
      e = e || window.event;
      //1确认组件type\鼠标位置，
      //渲染移动组件
      const type = $(e.target).attr("data-type");
      const initX = e.pageX || e.clientX + document.body.scroolLeft;
      const initY = e.pageY || e.clientY + document.body.scrollTop;

      const ele = `<div class="" style="height:34px;width:60px;background-color:red;position:absolute;"></div>`;
      $(".dragmove").html(ele);
      $(".dragmove").css({
        left: `${initX}px`,
        top: `${initY}px`,
        transform: "translate3d(0,0,0)"
      });
      //2.坐标线的展示
      showRulerDash(true);
      //3绑定mousemove事件
      let isMove = true;
      $(document).on("mousemove", function(moveEvent) {
        if (isMove) {
          isMove = false;
          //执行相关
          const moveX =
            moveEvent.pageX || moveEvent.clientX + document.body.scroolLeft;
          const moveY =
            moveEvent.pageY || moveEvent.clientY + document.body.scrollTop;
          $(".dragmove").css({
            transform: `translate3d(${moveX - initX}px,${moveY - initY}px,0)`
          });
          //坐标系线
          const { x: Sitex, y: Sitey } = Sitecomponent(moveX, moveY);
          showRulerDash(true, Sitex, Sitey);
          setTimeout(function() {
            isMove = true;
          });
        }
      });

      $(document).one("mouseup", function(e) {
        //1移除事件
        $(document).off("mousemove");
        //2移动图形隐藏
        $(".dragmove").html("");
        //3坐标线隐藏
        showRulerDash(false);
        //4记录坐标位置及组件type
        const endX = e.pageX || e.clientX + document.body.scroolLeft;
        const endY = e.pageY || e.clientY + document.body.scrollTop;
        const { x: siteX, y: siteY } = Sitecomponent(endX, endY);
        //5生成表格
        // Buildcomponent(1,siteX,siteY,`test${aID++}`);
        CreateData(1, siteX, siteY);
      });
    });
  });
})(jQuery);
