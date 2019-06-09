/**
 * 碰撞检测
 * */

import Obj, { UpdateData } from "./Jsondata";

//移动碰撞/鼠标松开时检测 、拉动碰撞检测
export function collision(Id, Direction) {
  //A 源目标
  //B元素的数值
  // const Arect = A.getBoundingClientRect();
  const Property = Obj[Id].properties;
  // const Brect = B.getBoundingClientRect();
  let AL = parseInt(Property.left), //左侧距离
    AT = parseInt(Property.top), //顶部距离
    AR = parseInt(Property.left) + parseInt(Property.width), //右侧
    AB = parseInt(Property.top) + parseInt(Property.height); //底部
  //A元素的数值
  // AL = Arect.left,
  // AT = Arect.top,
  // AR = Arect.right,
  // AB = Arect.top + Arect.height;
  // console.log(AT,BT,AL,BL,BR,AR,AB,BB,88888,B);
  // if (AT > BT && AL > BL && BR > AR && AB < BB) {
  const result = [];
  Object.keys(Obj).forEach((item, index) => {
    if (Id === item) return;
    const Property = Obj[item].properties;
    let BL = parseInt(Property.left), //左侧距离
      BT = parseInt(Property.top), //顶部距离
      BR = parseInt(Property.left) + parseInt(Property.width), //右侧
      BB = parseInt(Property.top) + parseInt(Property.height); //底部
    // if (AB < BT || AL > BR || AT > BB || AR < BL) {
    // }

    if (Direction === "right" && AL < BR && AR > BL && AT < BB && AB > BT) {
      result.push({
        id: item,
        left: BL,
        top: BT,
        right: BR,
        bottom: BB
      });
    } else if (
      Direction === "left" &&
      AL < BR &&
      AT < BB &&
      AB > BT &&
      AR > BL
    ) {
      result.push({
        id: item,
        left: BL,
        top: BT,
        right: BR,
        bottom: BB
      });
    } else if (
      Direction === "bottom" &&
      AB > BT &&
      AL < BR &&
      AR > BL &&
      AT < BB
    ) {
      //判断是否碰撞
      // result.push({
      //   id: item,
      //   left: BL,
      //   top: BT,
      //   right: BR,
      //   bottom: BB
      // });
      //牵连者 获取 x < AL  整体下移动
      console.log(AB, BT, 22222222);
      Object.keys(Obj).forEach((item, index) => {
        console.log(result, 888);
        if (Id === item) return;
        const Property = Obj[item].properties;
        let BL = parseInt(Property.left), //左侧距离
          BT = parseInt(Property.top); //顶部距离
        if (AL < BR && BL < AR && BT > AT) {
          result.push({
            id: item,
            left: BL,
            top: BT
            // right: BR,
            // bottom: BB
          });
        }
      });
    }
    //确认元素
    //
    //   result.map((item, index) => {
    //     // $(`#${item}`).css("left", `${AR}px`);
    //     const Id = item.id;
    //     switch (Direction) {
    //       case "left":
    //         UpdateData(Id, { width: `${AL - item.left}px` });
    //         break;
    //       case "right":
    //         UpdateData(Id, { left: `${AR}px`, width: `${item.right - AR}px` });
    //         break;
    //       case "top":
    //         UpdateData(Id, { height: `${AT}px` });
    //         break;
    //       case "bottom":
    //         UpdateData(Id, { top: `${AB}px` });
    //         break;
    //       default:
    //         break;
    //     }
    //   });
  });
  return result;
}

export function JsonToString(json) {
  let s = [];
  for (let i in json) {
    s.push(i + ":" + json[i]);
  }
  s = s.join(";");
  return s;
}

export function MultipleCollision(Id) {
  //A 源目标
  //B元素的数值
  let AL, AT, AR, AB;
  if (typeof Id === "string") {
    const Property = Obj[Id].properties;
    AL = parseInt(Property.left); //左侧距离
    AT = parseInt(Property.top); //顶部距离
    AR = parseInt(Property.left) + parseInt(Property.width); //右侧
    AB = parseInt(Property.top) + parseInt(Property.height); //底部
  }
  if (typeof Id === "object" && Id != null) {
    AL = Id.left; //左侧距离
    AT = Id.top; //顶部距离
    AR = Id.left + Id.width; //右侧
    AB = Id.top + Id.height; //底部
  }
  const result = {};
  Object.keys(Obj).forEach((item, index) => {
    if (typeof Id === "string" && Id === item) return;
    const Property = Obj[item].properties;
    let BL = parseInt(Property.left), //左侧距离
      BT = parseInt(Property.top), //顶部距离
      BR = parseInt(Property.left) + parseInt(Property.width), //右侧
      BB = parseInt(Property.top) + parseInt(Property.height); //底部
    if (AB < BT || AL > BR || AT > BB || AR < BL) {
    }else{
      result[item] = item;
    }
  });
  return result;
}
