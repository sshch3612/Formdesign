/**
 * ctrl+左键  多选
 * 鼠标拉动  画框  多选
 *
 * 绑定事件
 * */
import { MakeProperty, MakeCommonProperty } from "./Property";
import { getView } from "./Container";
import { ActiveMouseDown, ShapeChange } from "./Component";
import Obj, { GlobalObj, RemoveData } from "./Jsondata";
import { MultipleCollision } from "./util";
import { LineMouseDown } from "./Horizontalline";

export function SingleSelected(e) {
  e.stopPropagation();
  $(".component-node").removeClass("active");
  GlobalObj.SelectedIds = {};

  const Id = $(this).attr("id");
  $(this).addClass("active");

  GlobalObj.SelectedIds[Id] = Id;
  //打开属性面板
  MakeCommonProperty(Object.keys(GlobalObj.SelectedIds));

  $("#Showform").off("click");
  $("#Showform").one("click", ReturntoZero); ////点击其它区域，选中效果消失
}

export function MultipleSelected(e) {
  const Id = $(this).attr("id");
  if ($(this).hasClass("active")) {
    delete GlobalObj.SelectedIds[Id];
  } else {
    GlobalObj.SelectedIds[Id] = Id;
  }
  $(this).toggleClass("active");
  //打开属性面板
  MakeCommonProperty(Object.keys(GlobalObj.SelectedIds));
  // console.log(GlobalObj.SelectedIds, 4444);
}

export function FrameSelected(e) {
  //根据mousedown  记录初始位置   mouseup 记录结束位置  画框
  let x, y, w, h;
  const initX = e.pageX || e.clientX + document.body.scroolLeft;
  const initY = e.pageY || e.clientY + document.body.scrollTop;
  const { x: containX, y: containY, h: containH, w: containW } = getView(
    ".Formview"
  );

  $("body").append('<div id="Frame-selected"></div>');
  //
  $(document).on("mousemove", function(moveEvent) {
    //为了画框
    const moveX =
      moveEvent.pageX || moveEvent.clientX + document.body.scroolLeft;
    const moveY =
      moveEvent.pageY || moveEvent.clientY + document.body.scrollTop;
    w = Math.abs(moveX - initX);
    h = Math.abs(moveY - initY);
    x = moveX - initX > 0 ? initX : moveX;
    y = moveY - initY > 0 ? initY : moveY;
    $("#Frame-selected").css({
      left: `${x}px`,
      top: `${y}px`,
      height: `${h}px`,
      width: `${w}px`
    });
  });
  //注册mouseup 事件
  $(document).one("mouseup", function(e) {
    $("#Frame-selected").remove();
    const endX = e.pageX || e.clientX + document.body.scroolLeft;
    const endY = e.pageY || e.clientY + document.body.scrollTop;
    w = Math.abs(endX - initX);
    h = Math.abs(endY - initY);
    x = (endX - initX > 0 ? initX : endX) - containX;
    y = (endY - initY > 0 ? initY : endY) - containY;
    //框 与 nodes  计算碰撞  得出id 列表
    const ids = MultipleCollision({ left: x, top: y, width: w, height: h });
    GlobalObj.SelectedIds = Object.assign(GlobalObj.SelectedIds, ids);

    //所有的Id  都添加classname  active
    Object.keys(GlobalObj.SelectedIds).forEach((item, index) => {
      $(`#${item}`).addClass("active");
    });

    //设置相同属性
    MakeCommonProperty(Object.keys(GlobalObj.SelectedIds));
  });
}

export function ReturntoZero(e) {
  // $(document).on("click", function() {
  //GlobalObj.SelectedIds  归零处理
  Object.keys(GlobalObj.SelectedIds).forEach((item, index) => {
    $(`#${item}`).removeClass("active");
  });
  GlobalObj.SelectedIds = {};
  // });
}

export function ComponentRemove(e) {
  e.stopPropagation();
  const Id = $(e.target)
    .parent()
    .attr("id");
  $(e.target).one("mouseup", function(mouseupEvent) {
    RemoveData(Id);
  });
}

export default (function($) {
  //1.单选
  $(".Formview-contain").on("click", ".component-node", SingleSelected);
  //2.删除
  $(".Formview-contain").on("mousedown", ".remove", ComponentRemove);
  //3内部拖拽移动
  $(".Formview-contain").on("mousedown", ".active", ActiveMouseDown);
  //4.改变高度 宽度
  $(".Formview-contain").on("mousedown", "i", ShapeChange);
  //5.水平线
  $(".Formview-contain").on("mousedown", ".horiLine", LineMouseDown);
  //ctrl+左键  多选
  //6 监听ctrl 键
  $(window).keydown(e => {
    $(document).off("click");
    if (e.keyCode === 91) {
      $(".Formview-contain").off("click", ".component-node");
      $(".Formview-contain").off("mousedown", ".active");
      $(".Formview-contain").off("mousedown", "i");

      $(".Formview-contain").on("click", ".component-node", MultipleSelected);
      $(window).keyup(e => {
        $(".Formview-contain").off("click", ".component-node");
        $(".Formview-contain").on("click", ".component-node", SingleSelected);
        $(".Formview-contain").on("mousedown", ".active", ActiveMouseDown);
        $(".Formview-contain").on("mousedown", "i", ShapeChange);
        $("#Showform").one("click", ReturntoZero);
      });
    } else if (e.keyCode === 16) {
      $(".Formview-contain").off("click", ".component-node");
      $(".Formview-contain").off("mousedown", ".active");
      $(".Formview-contain").off("mousedown", "i");

      $(".Formview-contain").on("mousedown", FrameSelected);
      $(window).keyup(e => {
        $(".Formview-contain").off("mousedown");
        $(".Formview-contain").on("click", ".component-node", SingleSelected);
        $(".Formview-contain").on("mousedown", ".active", ActiveMouseDown);
        $(".Formview-contain").on("mousedown", "i", ShapeChange);
        $("#Showform").one("click", ReturntoZero);
      });
    } else {
      return;
    }
  });

  //5
})(jQuery);
