/**
 * 1.根据数据生成线 id  top位置
 * 2.绑定事件
 * 3.动态修改数据
 *
 *
 * */

 import {UpdateObj } from './Jsondata';
export const lineSets = {};

Object.defineProperties(lineSets, {
  watchId: {
    set: function(val) {
      console.error(lineSets, "------", val);
      return val;
    }
  }
});
export function makeData() {
  const height = 34;
  const number = 20;
  const name = "Line";
  let firstLetter = 65; //charCodeAt()  String.fromCharCode();
  for (let i = 0; i < number; i++) {
    lineSets[`${String.fromCharCode(firstLetter)}`] = {
      top: height * i,
      height: height,
      member: {}
    };
    firstLetter++;
  }
}

//线条初始化
export function buildLines() {
  let Ele = null;
  Ele = Object.keys(lineSets).map((id, index) => {
    return `<i class='horiLine' data-lineid = ${id} style='top:${
      lineSets[id].top
    }px'></i>`;
  });
  $(".linesSet").html(`${Ele.join("")}`);
  return;
}

export function updateLines(id, property) {
  //1根据id 递归更新数据
  //当前节点更新
  lineSets[id] = Object.assign(lineSets[id], property);
  let currentLetter = id; //charCodeAt()  String.fromCharCode();
  let preventLetter = String.fromCharCode(currentLetter.charCodeAt() - 1);
  let nextLetter = String.fromCharCode(currentLetter.charCodeAt() + 1);
  let top = null;
  let height = null;
  //pre节点更新高度
  lineSets[preventLetter] = Object.assign(lineSets[preventLetter], {
    height:
      parseInt(lineSets[currentLetter].top) -
      parseInt(lineSets[preventLetter].top)
  });
  //next节点更新
  while (lineSets.hasOwnProperty(nextLetter)) {
    // letter = String.fromCharCode(firstLetter);
    top = parseInt(lineSets[currentLetter].top);
    height = parseInt(lineSets[currentLetter].height);
    lineSets[nextLetter] = Object.assign(lineSets[nextLetter], {
      top: top + height
    }); //根据上一节点。确定当前节点
    currentLetter = nextLetter;
    nextLetter = String.fromCharCode(currentLetter.charCodeAt() + 1);
  }
  //2更新视图
  buildLines();

  lineSets.watchId = `${new Date().toLocaleString()}:您更新了线条${id}`;
  return;
}

export function LineMouseDown(e) {
  //1确认组件位置
  //渲染移动组件
  const top = parseInt($(this).css("top"));
  const Id = $(e.target).attr("data-lineid");
  const _this = this;
  //2 记录鼠标初始位置
  const initX = e.pageX || e.clientX + document.body.scroolLeft;
  const initY = e.pageY || e.clientY + document.body.scrollTop;

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
      //改变线条位置
      const distanceY = moveY - initY;
      updateLines(Id, { top: `${top + distanceY}` });
      UpdateObj();
      setTimeout(function() {
        isMove = true;
      });
    }
  });
  $(document).one("mouseup", function(e) {
    //1移除事件
    $(document).off("mousemove");

    //动态更新Obj数据

    //3记录坐标位置及组件type
    const endX = e.pageX || e.clientX + document.body.scroolLeft;
    const endY = e.pageY || e.clientY + document.body.scrollTop;
  });
}

export default (function($) {
  $(".Formview-contain").append(`<div class='linesSet'></div>`);
  makeData();
  buildLines();
  //事件绑定
})(jQuery);
