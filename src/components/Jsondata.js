"use strict";

//新建数据 拖拽新生成
//删除数据
//更新数据   属性值的update

import text from "./Tags/text";
import { lineSets } from "./Horizontalline";
import { JsonToString, collision } from "./util";

export const GlobalObj = {
  SelectedIds: {}
  // Obj: {}
};
const Obj = {};

Object.defineProperties(Obj, {
  watchId: {
    set: function(val) {
      console.error(Obj, "------", val);
      return val;
    }
  }
});

export function CreateData(type, x, y) {
  //1生成唯一id  生成数据时进行碰撞检测
  //确定可变数据   和不可变数据

  const Id = Date.now().toString(36);

  const Data = {
    type: type,
    linetype: null,
    properties: {
      //样式
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      // right:0,
      height: "40px",
      width: "200px",
      "background-color": getRandomColor(),
      "z-index": 100
    },
    template: `<div>${text.template}</div>`
  };

  Obj[Id] = Data;
  updateProperty(Id, lineSets, true);
  Buildcomponent(Id);
  //目的是为了模拟打印log日志
  Obj.watchId = `${new Date().toLocaleString()}:您添加了组件${Id}`;
  return;
}

export function updateProperty(Id, lineSets, isExist) {
  //isExist  为了区分组件是否为第一次初始化
  //根据y坐标，更新Obj
  Object.keys(lineSets).some((id, index) => {
    const top = parseInt(Obj[Id].properties.top);
    const height = parseInt(Obj[Id].properties.height);
    const Btop = parseInt(lineSets[id].top);
    const Bheight = parseInt(lineSets[id].height);
    // console.log(top, height, Btop, Bheight, 33333);
    if (Btop < top && Btop + Bheight > top) {
      //先删除之前的member记录
      if (!isExist) {
        //首次不删除
        const linetype = Obj[Id].linetype;
        delete lineSets[linetype].member[Id];
      }
      //lineSets 中记录Obj Id，
      lineSets[id].member = {
        ...lineSets[id].member,
        [Id]: Id
      };

      //更新Obj  linetype 属性,
      Obj[Id].linetype = id;

      UpdateData(Id, {
        top: `${Btop}px`,
        height: `${isExist ? Bheight : height}px`
      });
      return true;
    }
  });
}

export function RemoveData(Id) {
  //先删除linesets 值 member里的Id
  const linetype = Obj[Id].linetype;
  delete lineSets[linetype].member[Id];

  delete Obj[Id];
  $(`#${Id}`).remove();

  //目的是为了模拟打印log日志
  Obj.watchId = `${new Date().toLocaleString()}:您删除了组件${Id}`;
  return;
}

export function UpdateData(Id, property, mark = false) {
  //单个更新
  let tempData = Obj[Id];
  // console.log(tempData,44444);
  tempData.properties = { ...tempData.properties, ...property };
  Obj[Id] = tempData;

  mark && updateProperty(Id, lineSets, false); //是否同步更新数据
  Buildcomponent(Id);

  //目的是为了模拟打印log日志
  Obj.watchId = `${new Date().toLocaleString()}:您更新了组件${Id}`;
  return;
}

export function BatchUpdateData(Data) {
  //批量更新[{id:id,properties:{}}]
  //单个更新
  let tempData = null;
  Data.forEach(item => {
    tempData = Obj[item.id];
    tempData.properties = { ...tempData.properties, ...item.property };
    Obj[item.id] = tempData;
    Buildcomponent(item.id);
  });
  return;
}

export function Buildcomponent(Id) {
  //根据Id 生成html
  let Ele = null;
  Ele = `<div id='${Id}' class="component-node" style='${JsonToString(
    Obj[Id].properties
  )}'>
  <i class="left"></i>
  <i class="right"></i>
  <i class="top"></i>
  <i class="bottom"></i>
  <span class='remove'></span>
  </div>`;
  // console.log($(`#${Id}`).length, 44444);
  if ($(`#${Id}`).length) {
    //更新
    $(`#${Id}`).prop("outerHTML", Ele);
  } else {
    //创建
    $(".Formview-contain").append(Ele);
  }
  return Ele;
}

//整体更新

// export function OverallUpdate(Obj){

// }
//根据 lineSets 数据 更新Obj数据
export function UpdateObj() {
  //
  Object.values(lineSets).forEach((value, index) => {
    const member = Object.keys(value.member);
    if (member.length != 0) {
      member.map((id, index) => {
        // console.log(33333,Obj,id,444444);
        Obj[id].properties = {
          ...Obj[id].properties,
          top: `${value.top}px`,
          height: `${value.height}px`
        };
        //更新视图
        Buildcomponent(id);
      });
    }
  });
}

export default Obj;

function getRandomColor() {
  return (
    "rgb(" +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 10) +
    ")"
  );
}
