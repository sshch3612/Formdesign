/**
 * 1.html展示
 *
 *
 *
 */

import Obj, { UpdateData } from "./Jsondata";

export function MakeProperty(Id) {
  let Ele = null;
  const { left, top, height, width } = Obj[Id].properties;
  Ele = `<div>
    <div class='property-title'></div>
    <div class='property-fields'>
    <div>
    样式
    </div>
    <div >
      位置 y
      <input type='text'  data-property='top' value=${parseInt(top)} />
    </div>
    <div >
      位置 x
      <input type='text' data-property='left'  value=${parseInt(left)} />
    </div>
    <div >
      高度 h
      <input type='text' data-property='height'  value=${parseInt(height)} />
    </div>
    <div >
      宽度 w
      <input type='text' data-property='width'  value=${parseInt(width)} />
    </div>
    </div>
    </div>
    `;
  // <script>
  //  function updateValue(e,value){
  //      var propertyname = e.target.getAttribute('data-property');
  //      UpdateData(${Id},{propertyname:value+'px'})
  //  }
  // </script>
  //注册事件之后，记得移除事件
  $("#Infomodify").off("change");
  $("#Infomodify").html(Ele);
  $("#Infomodify").on("change", "input", function(e) {
    const propertyname = $(e.target).attr("data-property");
    const value = $(e.target).val();
    UpdateData(Id, { [propertyname]: `${value}px` });
  });
}

export function MakeCommonProperty(Ids) {
  let Ele = null;
  if (typeof Ids != "object") return;
  const { left, top, height, width } = Obj[Ids[0]].properties;
  Ele = `<div>
    <div class='property-title'></div>
    <div class='property-fields'>
    <div>
    样式
    </div>
    <div >
      位置 y
      <input type='text'  data-property='top' value=${parseInt(top)} />
    </div>
    <div >
      位置 x
      <input type='text' data-property='left'  value=${parseInt(left)} />
    </div>
    <div >
      高度 h
      <input type='text' data-property='height'  value=${parseInt(height)} />
    </div>
    <div >
      宽度 w
      <input type='text' data-property='width'  value=${parseInt(width)} />
    </div>
    </div>
    </div>
    `;
  //注册事件之后，记得移除事件
  $("#Infomodify").off("change", "input");
  $("#Infomodify").off("keydown", "input");
  $("#Infomodify").html(Ele);
  $("#Infomodify").on("input", "input", function(e) {
    const propertyname = $(e.target).attr("data-property");
    const value = $(e.target).val();
    Ids.forEach(id => {
      UpdateData(id, { [propertyname]: `${value}px` }, true);
    });
  });

  $("#Infomodify").on("keydown", "input", function(event) {
    if (event.keyCode == "13") {
      const propertyname = $(event.target).attr("data-property");
      const value = $(event.target).val();
      Ids.forEach(id => {
        UpdateData(id, { [propertyname]: `${value}px` }, true);
      });
    }
  });
}
