/**
 * 1.注册点击事件
 * 2.
 * */
import { showRulerDash } from "./RulerDash";
import {
  Sitechange,
  Sitecomponent,
  moveDistance,
  Buildcomponent,
  Shapechange
} from "./Container";
import { MakeProperty } from "./Property";

import { UpdateData, BatchUpdateData } from "./Jsondata";
import { collision } from "./util";


export function ActiveMouseDown(e) {
  //1确认组件位置
  //渲染移动组件
  const top = parseInt($(this).css("top"));
  const left = parseInt($(this).css("left"));
  const _this = this;
  //鼠标初始位置
  const initX = e.pageX || e.clientX + document.body.scroolLeft;
  const initY = e.pageY || e.clientY + document.body.scrollTop;

  //2.坐标线的展示
  showRulerDash(true, left, top);
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
      //坐标系线
      const { x: distanceX, y: distanceY } = moveDistance(
        left,
        top,
        initX,
        initY,
        moveX,
        moveY
      );
      //改变组件位置
      // Sitechange($(_this), distanceX, distanceY);
      UpdateData($(_this).attr("id"), {
        left: `${left + distanceX < 0 ? 0 : left + distanceX}px`,
        top: `${top + distanceY < 0 ? 0 : top + distanceY}px`
      });
      showRulerDash(true, left + distanceX, top + distanceY);
      setTimeout(function() {
        isMove = true;
      });
    }
  });
  $(document).one("mouseup", function(e) {
    //1移除事件
    $(document).off("mousemove");
    //2坐标线隐藏
    showRulerDash(false);
    //3记录坐标位置及组件type
    const endX = e.pageX || e.clientX + document.body.scroolLeft;
    const endY = e.pageY || e.clientY + document.body.scrollTop;
    const { x: distanceX, y: distanceY } = moveDistance(
      left,
      top,
      initX,
      initY,
      endX,
      endY
    );
    //4更新表格
    UpdateData($(_this).attr("id"), {
      left: `${left + distanceX < 0 ? 0 : left + distanceX}px`,
      top: `${top + distanceY < 0 ? 0 : top + distanceY}px`
    }, true);
  });
}

export function ShapeChange(e) {
  /**
   * 事件绑定
   *
   */
  //组件水平方向拖长
  // $(".Formview-contain").on("mousedown", "i", function(e) {
  //鼠标按下时，1确定位置 2 collisionObj  用于存储碰撞对象
  e.stopPropagation();
  let collisionObj = null;
  const currentEle = $(e.target).attr("class");
  const height = parseInt(
    $(this)
      .parent()
      .css("height")
  );
  const width = parseInt(
    $(this)
      .parent()
      .css("width")
  );
  const left = parseInt(
    $(this)
      .parent()
      .css("left")
  );
  const top = parseInt(
    $(this)
      .parent()
      .css("top")
  );
  const _this = this;
  //1鼠标初始位置
  const initX = e.pageX || e.clientX + document.body.scroolLeft;
  const initY = e.pageY || e.clientY + document.body.scrollTop;
  //2显示线条,初始位置
  switch (currentEle) {
    case "right":
      showRulerDash(true, left + width, top);
      break;
    case "left":
      showRulerDash(true, left, top);
      break;
    case "top":
      showRulerDash(true, left, top);
      break;
    case "bottom":
      showRulerDash(true, left, top + height);
      break;
    default:
      break;
  }
  //3注册移动事件
  let isMove = true;
  $(document).on("mousemove", function(moveEvent) {
    if (isMove) {
      isMove = false;
      const moveX =
        moveEvent.pageX || moveEvent.clientX + document.body.scroolLeft;
      const moveY =
        moveEvent.pageY || moveEvent.clientY + document.body.scrollTop;
      //坐标系线
      const { x: distanceX, y: distanceY } = moveDistance(
        left,
        top,
        initX,
        initY,
        moveX,
        moveY
      );
      //改变线条位置
      switch (currentEle) {
        case "right":
          showRulerDash(true, left + width + distanceX, top);
          //改变组件大小
          UpdateData(
            $(_this)
              .parent()
              .attr("id"),
            {
              width: `${width + distanceX}px`
            }
          );
          if (collisionObj && collisionObj.length != 0) {
            collisionObj.forEach(item => {
              UpdateData(item.id, {
                left: `${left + width + distanceX}px`,
                width: `${item.right - left - width - distanceX}px`
              });
            });
          } else {
            collisionObj = collision(
              $(_this)
                .parent()
                .attr("id"),
              "right"
            );
          }
          break;
        case "left":
          showRulerDash(true, left + distanceX, top);
          //改变组件大小
          UpdateData(
            $(_this)
              .parent()
              .attr("id"),
            {
              left: `${left + distanceX}px`,
              width: `${width - distanceX}px`
              // height: `${distanceY}px`
            }
          );
          if (collisionObj && collisionObj.length != 0) {
            collisionObj.forEach(item => {
              UpdateData(item.id, {
                width: `${left + distanceX - item.left}px`
              });
            });
          } else {
            collisionObj = collision(
              $(_this)
                .parent()
                .attr("id"),
              "left"
            );
          }
          break;
        case "top":
          showRulerDash(true, left, top + distanceY);
          UpdateData(
            $(_this)
              .parent()
              .attr("id"),
            {
              top: `${top + distanceY}px`,
              height: `${height - distanceY}px`
            }
          );
          collision(
            $(_this)
              .parent()
              .attr("id"),
            "top"
          );
          break;
        case "bottom":
          showRulerDash(true, left, top + height + distanceY);
          //改变组件大小
          UpdateData(
            $(_this)
              .parent()
              .attr("id"),
            {
              top: `${top}px`,
              height: `${height + distanceY}px`
              // height: `${distanceY}px`
            }
          );
          if (collisionObj && collisionObj.length != 0) {
            //首先计算出 移动的距离 Abottom - Btop
            const y = top + height + distanceY - collisionObj[0].top;
            collisionObj.forEach(item => {
              UpdateData(item.id, {
                top: `${item.top + y}px`
              });
            });
          } else {
            collisionObj = collision(
              $(_this)
                .parent()
                .attr("id"),
              "bottom"
            );
          }
          break;
        default:
          break;
      }
      //检测是否于其它组件碰撞，若碰撞 则返回其它元素
      // collision(
      //   $(_this)
      //     .parent()
      //     .attr("id")
      // );
      //改变目标元素的top left  width  height
      // Shapechange($(B), distanceX, distanceY);
      // if (B) {
      //   $(B).css({
      //     left: `${Bleft}px`
      //   });
      // }

      setTimeout(function() {
        isMove = true;
      });
    }
  });
  //改变组件长度
  $(document).one("mouseup", function(e) {
    //1移除事件
    $(document).off("mousemove");
    //2坐标线隐藏
    showRulerDash(false);
    //3记录坐标位置及组件type
    const endX = e.pageX || e.clientX + document.body.scroolLeft;
    const endY = e.pageY || e.clientY + document.body.scrollTop;
    const { x: distanceX, y: distanceY } = moveDistance(
      left,
      top,
      initX,
      initY,
      endX,
      endY
    );
    //4更新表格
    switch (currentEle) {
      case "right":
        UpdateData(
          $(_this)
            .parent()
            .attr("id"),
          {
            width: `${width + distanceX}px`
          }
        );
        break;
      case "left":
        UpdateData(
          $(_this)
            .parent()
            .attr("id"),
          {
            left: `${left + distanceX}px`,
            width: `${width - distanceX}px`
            // height: `${distanceY}px`
          }
        );
        break;
      case "top":
        UpdateData(
          $(_this)
            .parent()
            .attr("id"),
          {
            top: `${top + distanceY}px`,
            height: `${height - distanceY}px`
          }
        );
        break;
      case "bottom":
        UpdateData(
          $(_this)
            .parent()
            .attr("id"),
          {
            top: `${top}px`,
            height: `${height + distanceY}px`
          }
        );
        break;
      default:
        break;
    }
  });
}
