/* jce - 2.6.33 | 2018-10-10 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(tinymce,tinyMCEPopup,$){function convertRGBToHex(col){var re=new RegExp("rgb\\s*\\(\\s*([0-9]+).*,\\s*([0-9]+).*,\\s*([0-9]+).*\\)","gi"),rgb=col.replace(re,"$1,$2,$3").split(",");return 3==rgb.length?(r=parseInt(rgb[0]).toString(16),g=parseInt(rgb[1]).toString(16),b=parseInt(rgb[2]).toString(16),r=1==r.length?"0"+r:r,g=1==g.length?"0"+g:g,b=1==b.length?"0"+b:b,"#"+r+g+b):col}function trimSize(size){return size=size.replace(/([0-9\.]+)(px|%|in|cm|mm|em|ex|pt|pc)/i,"$1$2"),size?size.replace(/px$/,""):""}Wf.setStyles=function(){var ed=tinyMCEPopup.editor,$proxy=$("<div />"),proxy=$proxy.get(0);$proxy.attr("style",$("#style").val());var map={"background-image":"backgroundimage","border-spacing":"cellspacing","border-collapse":"cellspacing","vertical-align":"valign","background-color":"bgcolor",float:"align","text-align":"align"},legacy=["align","valign"];$.each(["background-image","width","height","border-spacing","border-collapse","vertical-align","background-color","text-align","float"],function(i,k){var v=ed.dom.getStyle(proxy,k);return $proxy.css(k,""),!("width"!==k&&"height"!==k||(v=trimSize(v)))||("background-image"===k&&(v=v.replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)","gi"),"$1")),"background-color"===k&&(v=convertRGBToHex(v)),"border-spacing"===k&&(v=trimSize(v)),"border-collapse"===k&&"collapse"===v&&(v=0),"float"===k&&""!==$("#align").val()||(k=map[k]||k,!(!isHTML4||$.inArray(k,legacy)===-1)||void $("#"+k).val(v).change()))}),"auto"===proxy.style.marginLeft&&"auto"===proxy.style.marginRight&&""===$("#align").val()&&($("#align").val("center"),$proxy.css({"margin-left":"","margin-right":""}));var border=!1;$.each(["width","color","style"],function(i,k){var v=ed.dom.getStyle($proxy.get(0),"border-"+k);""===v?$.each(["top","right","bottom","left"],function(i,n){var sv=ed.dom.getStyle($proxy.get(0),"border-"+n+"-"+k);(""!==sv||sv!=v&&""!==v)&&(v=""),sv&&(v=sv)}):(border=!0,$proxy.css("border-"+k,"")),"width"==k&&(v=/[0-9][a-z]/.test(v)?parseInt(v):v),"color"==k&&v&&(v=Wf.String.toHex(v),"#"===v.charAt(0)&&(v=v.substr(1))),border&&($("#border").attr("checked","checked").change(),"width"===k&&0==$('option[value="'+v+'"]',"#border_width").length&&$("#border_width").append(new Option(v,v)),$("#border_"+k).val(v).change())});var styles=ed.dom.parseStyle($proxy.attr("style"));for(k in styles)(k.indexOf("-moz-")>=0||k.indexOf("-webkit-")>=0)&&delete styles[k];$("#style").val(ed.dom.serializeStyle(styles))};var isHTML4="html4"===tinyMCEPopup.editor.settings.schema,isHTML5="html5-strict"===tinyMCEPopup.editor.settings.schema,TableDialog={settings:{},init:function(){var layout=(tinyMCEPopup.editor,tinyMCEPopup.getWindowArg("layout","table"));if(this.settings.file_browser||$("input.browser").removeClass("browser"),Wf.init(),"merge"==layout)return this.initMerge();switch(isHTML5&&$("#axis, #abbr, #scope, #summary, #char, #charoff, #tframe, #nowrap, #rules, #cellpadding, #cellspacing").each(function(){$(this).add('label[for="'+this.id+'"]').hide()}),layout){case"table":this.initTable();break;case"cell":this.initCell();break;case"row":this.initRow()}},insert:function(){var layout=tinyMCEPopup.getWindowArg("layout","table");switch(layout){case"table":this.insertTable();break;case"cell":this.updateCells();break;case"row":this.updateRows();break;case"merge":this.merge()}},initMerge:function(){$("#numcols").val(tinyMCEPopup.getWindowArg("cols",1)),$("#numrows").val(tinyMCEPopup.getWindowArg("rows",1)),$("#insert").button("option","label",tinyMCEPopup.getLang("update","Update",!0))},updateClassList:function(cls){cls&&$("#classlist").val(function(){var n=this,a=cls.split(" "),r=[];return $.each(a,function(i,v){v.indexOf("mce-item")==-1&&(0==$('option[value="'+v+'"]',n).length&&$(n).append(new Option(v,v)),r.push(v))}),r}).change()},initTable:function(){var self=this,ed=tinyMCEPopup.editor,elm=ed.dom.getParent(ed.selection.getNode(),"table"),action=tinyMCEPopup.getWindowArg("action");if(action||(action=elm?"update":"insert"),isHTML4&&($("#table_border").replaceWith('<input type="checkbox" id="table_border" value="" />'),$("#table_border").click(function(){this.value=this.checked?1:""})),elm&&"insert"!=action){for(var rowsAr=elm.rows,cols=0,i=0;i<rowsAr.length;i++)rowsAr[i].cells.length>cols&&(cols=rowsAr[i].cells.length);$("#cols").val(cols),$("#rows").val(rowsAr.length),$("#caption").prop("checked",elm.getElementsByTagName("caption").length>0),$.each(["align","width","height","cellpadding","cellspacing","id","summary","dir","lang","bgcolor","background","frame","rules","border"],function(i,k){var v=ed.dom.getAttrib(elm,k);return"background"===k&&""!==v&&(v=v.replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)","gi"),"$1")),"border"===k&&""!==v?($("#table_border").val(function(){return v=parseInt(v),"checkbox"===this.type&&(this.checked=!!v),v}),!0):void $("#"+k).val(v)}),$("#classes").val(function(){var cls=ed.dom.getAttrib(elm,"class");return cls=cls.replace(/(?:^|\s)mce-item-(\w+)(?!\S)/g,""),self.updateClassList(cls),cls}).change(),$("#style").val(ed.dom.getAttrib(elm,"style")).change(),this.orgTableWidth=$("#width").val(),this.orgTableHeight=$("#height").val(),$("#insert .uk-button-text").text(tinyMCEPopup.getLang("update","Update",!0))}else Wf.setDefaults(this.settings.defaults);"update"==action&&$("#cols, #rows").prop("disabled",!0)},initRow:function(){var self=this,ed=tinyMCEPopup.editor,dom=tinyMCEPopup.dom,elm=dom.getParent(ed.selection.getStart(),"tr"),selected=dom.select("td.mceSelected,th.mceSelected",elm),rowtype=elm.parentNode.nodeName.toLowerCase();$("#style").val(ed.dom.getAttrib(elm,"style")).change(),$.each(["align","width","height","cellpadding","cellspacing","id","summary","dir","lang","bgcolor","background"],function(i,k){var v=ed.dom.getAttrib(elm,k),dv=$("#"+k).val();"background"===k&&""!==v&&(v=v.replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)","gi"),"$1")),""!==dv&&(v=dv),selected.length&&$.inArray(k,["bgcolor","background","height","id","lang","align"])!==-1&&(v=isHTML4?v:""),$("#"+k).val(v)}),$("#classes").val(function(){var cls=ed.dom.getAttrib(elm,"class");return cls=cls.replace(/(?:^|\s)mce-item-(\w+)(?!\S)/g,""),self.updateClassList(cls),cls}).change(),$("#rowtype").change(function(){self.setActionforRowType()}).val(rowtype).change(),0===selected.length?$("#insert .uk-button-text").text(tinyMCEPopup.getLang("update","Update",!0)):$("#action").hide()},initCell:function(){var self=this,ed=tinyMCEPopup.editor,dom=ed.dom,elm=dom.getParent(ed.selection.getStart(),"td,th");dom.hasClass(elm,"mceSelected")?$("#action").hide():($("#style").val(ed.dom.getAttrib(elm,"style")).change(),$.each(["align","valign","width","height","cellpadding","cellspacing","id","summary","dir","lang","bgcolor","background","scope"],function(i,k){var v=ed.dom.getAttrib(elm,k),dv=$("#"+k).val();"background"===k&&""!==v&&(v=v.replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)","gi"),"$1")),""!==dv&&(v=dv),$("#"+k).val(v)}),$("#classes").val(function(){var cls=ed.dom.getAttrib(elm,"class");return cls=cls.replace(/(?:^|\s)mce-item-(\w+)(?!\S)/g,""),self.updateClassList(cls),cls}).change(),$("#celltype").val(elm.nodeName.toLowerCase()),$("#insert .uk-button-text").text(tinyMCEPopup.getLang("update","Update",!0)))},merge:function(){var func;tinyMCEPopup.restoreSelection(),func=tinyMCEPopup.getWindowArg("onaction"),func({cols:$("#numcols").val(),rows:$("#numrows").val()}),tinyMCEPopup.close()},getStyles:function(){var dom=tinyMCEPopup.editor.dom,style=$("#style").val();if(isHTML4)return style;var styles={"vertical-align":"",float:""};return $.each(["width","height","backgroundimage","border","bgcolor"],function(i,k){var v=$("#"+k).val();return"backgroundimage"===k&&(""!==v&&(v='url("'+v+'")'),k="background-image"),"bgcolor"===k&&v&&(""!==v&&(v="#"===v.charAt(0)?v:"#"+v),k="background-color"),"width"!==k&&"height"!==k||v&&!/\D/.test(v)&&(v=parseInt(v)+"px"),"border"===k?($("#border").is(":checked")&&$.each(["width","style","color"],function(i,n){var s=$("#border_"+n).val();"width"!==n||""===s||/\D/.test(s)||(s=parseInt(s)+"px"),"color"===n&&"#"!==s.charAt(0)&&(s="#"+s),styles["border-"+n]=s}),!0):void(styles[k]=v)}),style=dom.serializeStyle($.extend(dom.parseStyle(style),styles)),style=dom.serializeStyle(dom.parseStyle(style))},insertTable:function(){var ed=tinyMCEPopup.editor,dom=ed.dom;tinyMCEPopup.restoreSelection();var elm=ed.dom.getParent(ed.selection.getNode(),"table"),action=tinyMCEPopup.getWindowArg("action");action||(action=elm?"update":"insert");var align,width,height,className,caption,frame,rules,capEl,elm,cols=2,rows=2,border=0,cellpadding=-1,cellspacing=-1,html="";if(!AutoValidator.validate($("form").get(0)))return tinyMCEPopup.alert(ed.getLang("invalid_data")),!1;if(width=$("#width").val(),height=$("#height").val(),align=$("#align").val(),cols=$("#cols").val(),rows=$("#rows").val(),cellpadding=$("#cellpadding").val(),cellspacing=$("#cellspacing").val(),frame=$("#tframe").val(),rules=$("#rules").val(),className=$("#classes").val(),id=$("#id").val(),summary=$("#summary").val(),dir=$("#dir").val(),lang=$("#lang").val(),caption=$("#caption").is(":checked"),borderColor=$("#border_color").val(),bgColor=$("#bgcolor").val(),background=$("#backgroundimage").val(),style=this.getStyles(),border=$("#table_border").val(),$("#table_border").is(":checkbox")&&(border=$("#table_border").is(":checked")?"1":""),isHTML4||(align="",width="",height="",bgColor=""),"update"==action)return ed.execCommand("mceBeginUndoLevel"),isHTML5||(dom.setAttrib(elm,"cellPadding",cellpadding,!0),dom.setAttrib(elm,"cellSpacing",cellspacing,!0)),dom.setAttribs(elm,{width:width,height:height,align:align,border:border,bgColor:bgColor}),dom.setAttrib(elm,"frame",frame),dom.setAttrib(elm,"rules",rules),dom.setAttrib(elm,"class",className),dom.setAttrib(elm,"style",style),dom.setAttrib(elm,"id",id),dom.setAttrib(elm,"summary",summary),dom.setAttrib(elm,"dir",dir),dom.setAttrib(elm,"lang",lang),capEl=ed.dom.select("caption",elm)[0],capEl&&!caption&&capEl.parentNode.removeChild(capEl),!capEl&&caption&&(capEl=elm.ownerDocument.createElement("caption"),tinymce.isIE&&!tinymce.isIE11||(capEl.innerHTML='<br data-mce-bogus="1"/>'),elm.insertBefore(capEl,elm.firstChild)),isHTML4||$("#align").val()&&ed.formatter.apply("align"+$("#align").val(),{},elm),ed.addVisual(),ed.nodeChanged(),ed.execCommand("mceEndUndoLevel",!1,{},{skip_undo:!0}),ed.execCommand("mceRepaint"),tinyMCEPopup.close(),!0;html+="<table",html+=this.makeAttrib("id",id),border&&(html+=this.makeAttrib("border",border)),html+=this.makeAttrib("cellpadding",cellpadding),html+=this.makeAttrib("cellspacing",cellspacing),html+=this.makeAttrib("data-mce-new","1"),html+=this.makeAttrib("width",width),html+=this.makeAttrib("height",height),html+=this.makeAttrib("align",align),html+=this.makeAttrib("frame",frame),html+=this.makeAttrib("rules",rules),html+=this.makeAttrib("class",className),html+=this.makeAttrib("style",style),html+=this.makeAttrib("summary",summary),html+=this.makeAttrib("dir",dir),html+=this.makeAttrib("lang",lang),html+=this.makeAttrib("bgcolor",bgColor),html+=">",caption&&(html+=!tinymce.isIE||tinymce.isIE11?'<caption><br data-mce-bogus="1" /></caption>':"<caption></caption>");for(var y=0;y<rows;y++){html+="<tr>";for(var x=0;x<cols;x++)html+=!tinymce.isIE||tinymce.isIE11?'<td><br data-mce-bogus="1" /></td>':"<td></td>";html+="</tr>"}if(html+="</table>",ed.execCommand("mceBeginUndoLevel"),ed.settings.fix_table_elements){var patt="";ed.focus(),ed.selection.setContent('<br class="_mce_marker" />'),tinymce.each("h1,h2,h3,h4,h5,h6,p".split(","),function(n){patt&&(patt+=","),patt+=n+" ._mce_marker"}),tinymce.each(ed.dom.select(patt),function(n){ed.dom.split(ed.dom.getParent(n,"h1,h2,h3,h4,h5,h6,p"),n)}),dom.setOuterHTML(dom.select("br._mce_marker")[0],html)}else ed.execCommand("mceInsertContent",!1,html);tinymce.each(dom.select("table[data-mce-new]"),function(node){var tdorth=dom.select("td,th",node);tinymce.isIE&&!tinymce.isIE11&&null==node.nextSibling&&(ed.settings.forced_root_block?dom.insertAfter(dom.create(ed.settings.forced_root_block),node):dom.insertAfter(dom.create("br",{"data-mce-bogus":"1"}),node));try{ed.selection.setCursorLocation(tdorth[0],0)}catch(ex){}dom.setAttrib(node,"data-mce-new","")}),ed.addVisual(),ed.execCommand("mceEndUndoLevel",!1,{},{skip_undo:!0}),tinyMCEPopup.close()},updateCell:function(td,skip_id){function setAttrib(elm,name,value){(1===cells.length||value)&&dom.setAttrib(elm,name,value)}var v,self=this,ed=tinyMCEPopup.editor,dom=ed.dom,doc=ed.getDoc(),curCellType=td.nodeName.toLowerCase(),celltype=$("#celltype").val(),cells=ed.dom.select("td.mceSelected,th.mceSelected");if(cells.length||cells.push(td),width=$("#width").val(),height=$("#height").val(),align=$("#align").val(),valign=$("#valign").val(),bgColor=$("#bgcolor").val(),isHTML4||(align="",valign="",width="",height="",bgColor=""),dom.setAttribs(td,{width:width,height:height,bgColor:bgColor,align:align,valign:valign}),$.each(["id","lang","dir","classes","scope","style"],function(i,k){return v=$("#"+k).val(),!("id"!==k||!skip_id)||("style"===k&&(v=self.getStyles()),"classes"===k&&(k="class"),void setAttrib(td,k,v))}),isHTML4||($("#align").val()&&ed.formatter.apply("align"+$("#align").val(),{},td),$("#valign").val()&&ed.formatter.apply("valign"+$("#valign").val(),{},td)),curCellType!=celltype){for(var newCell=doc.createElement(celltype),c=0;c<td.childNodes.length;c++)newCell.appendChild(td.childNodes[c].cloneNode(1));for(var a=0;a<td.attributes.length;a++)ed.dom.setAttrib(newCell,td.attributes[a].name,ed.dom.getAttrib(td,td.attributes[a].name));td.parentNode.replaceChild(newCell,td),td=newCell}return td},updateCells:function(){function doUpdate(s){s&&(self.updateCell(tdElm),ed.addVisual(),ed.nodeChanged(),inst.execCommand("mceEndUndoLevel"),tinyMCEPopup.close())}var el,tdElm,trElm,tableElm,self=this,ed=tinyMCEPopup.editor,inst=ed;if(tinyMCEPopup.restoreSelection(),el=ed.selection.getStart(),tdElm=ed.dom.getParent(el,"td,th"),trElm=ed.dom.getParent(el,"tr"),tableElm=ed.dom.getParent(el,"table"),ed.dom.hasClass(tdElm,"mceSelected"))return tinymce.each(ed.dom.select("td.mceSelected,th.mceSelected"),function(td){self.updateCell(td)}),ed.addVisual(),ed.nodeChanged(),inst.execCommand("mceEndUndoLevel"),void tinyMCEPopup.close();switch(ed.execCommand("mceBeginUndoLevel"),$("#action").val()){case"cell":var celltype=$("#celltype").val(),scope=$("#scope").val();if(ed.getParam("accessibility_warnings",1))return void("th"==celltype&&""==scope?tinyMCEPopup.confirm(ed.getLang("table_dlg.missing_scope","Missing Scope",!0),doUpdate):doUpdate(1));this.updateCell(tdElm);break;case"row":var cell=trElm.firstChild;"TD"!=cell.nodeName&&"TH"!=cell.nodeName&&(cell=this.nextCell(cell));do cell=this.updateCell(cell,!0);while(null!=(cell=this.nextCell(cell)));break;case"all":for(var rows=tableElm.getElementsByTagName("tr"),i=0;i<rows.length;i++){var cell=rows[i].firstChild;"TD"!=cell.nodeName&&"TH"!=cell.nodeName&&(cell=this.nextCell(cell));do cell=this.updateCell(cell,!0);while(null!=(cell=this.nextCell(cell)))}}ed.addVisual(),ed.nodeChanged(),inst.execCommand("mceEndUndoLevel"),tinyMCEPopup.close()},updateRow:function(tr,skip_id,skip_parent){function setAttrib(elm,name,value){(1===rows.length||value)&&dom.setAttrib(elm,name,value)}var v,self=this,ed=tinyMCEPopup.editor,dom=ed.dom,doc=ed.getDoc(),curRowType=tr.parentNode.nodeName.toLowerCase(),rowtype=$("#rowtype").val(),tableElm=dom.getParent(ed.selection.getStart(),"table"),rows=tableElm.rows;if(rows.length||rows.push(tr),height=$("#height").val(),align=$("#align").val(),valign=$("#valign").val(),bgColor=$("#bgcolor").val(),isHTML4||(height="",bgColor="",align="",valign=""),dom.setAttribs(tr,{height:"",align:"",valign:"",bgColor:""}),$.each(["id","lang","dir","classes","scope","style"],function(i,k){return v=$("#"+k).val(),!("id"!==k||!skip_id)||("style"===k&&(v=self.getStyles()),"classes"===k&&(k="class"),void setAttrib(tr,k,v))}),isHTML4||$("#align").val()&&ed.formatter.apply("align"+$("#align").val(),{},tr),curRowType!=rowtype&&!skip_parent){for(var newRow=tr.cloneNode(1),theTable=dom.getParent(tr,"table"),dest=rowtype,newParent=null,i=0;i<theTable.childNodes.length;i++)theTable.childNodes[i].nodeName.toLowerCase()==dest&&(newParent=theTable.childNodes[i]);null==newParent&&(newParent=doc.createElement(dest),"thead"==dest?"CAPTION"==theTable.firstChild.nodeName?ed.dom.insertAfter(newParent,theTable.firstChild):theTable.insertBefore(newParent,theTable.firstChild):theTable.appendChild(newParent)),newParent.appendChild(newRow),tr.parentNode.removeChild(tr),tr=newRow}},updateRows:function(){var trElm,tableElm,self=this,ed=tinyMCEPopup.editor,dom=ed.dom,action=$("#action").val();if(tinyMCEPopup.restoreSelection(),trElm=dom.getParent(ed.selection.getStart(),"tr"),tableElm=dom.getParent(ed.selection.getStart(),"table"),dom.select("td.mceSelected,th.mceSelected",trElm).length>0)return tinymce.each(tableElm.rows,function(tr){var i;for(i=0;i<tr.cells.length;i++)if(dom.hasClass(tr.cells[i],"mceSelected"))return void self.updateRow(tr,!0)}),ed.addVisual(),ed.nodeChanged(),ed.execCommand("mceEndUndoLevel"),void tinyMCEPopup.close();switch(ed.execCommand("mceBeginUndoLevel"),action){case"row":this.updateRow(trElm);break;case"all":for(var rows=tableElm.getElementsByTagName("tr"),i=0;i<rows.length;i++)this.updateRow(rows[i],!0);break;case"odd":case"even":for(var rows=tableElm.getElementsByTagName("tr"),i=0;i<rows.length;i++)(i%2==0&&"odd"==action||i%2!=0&&"even"==action)&&this.updateRow(rows[i],!0,!0)}ed.addVisual(),ed.nodeChanged(),ed.execCommand("mceEndUndoLevel"),tinyMCEPopup.close()},makeAttrib:function(attrib,value){return"undefined"!=typeof value&&null!=value||(value=$("#"+attrib).val()),""==value?"":(value=value.replace(/&/g,"&amp;"),value=value.replace(/\"/g,"&quot;"),value=value.replace(/</g,"&lt;"),value=value.replace(/>/g,"&gt;")," "+attrib+'="'+value+'"')},nextCell:function(elm){for(;null!=(elm=elm.nextSibling);)if("TD"==elm.nodeName||"TH"==elm.nodeName)return elm;return null},isCssSize:function(value){return/^[0-9.]+(%|in|cm|mm|em|ex|pt|pc|px)$/.test(value)},cssSize:function(value,def){return value=tinymce.trim(value||def),this.isCssSize(value)?value:parseInt(value,10)+"px"},setActionforRowType:function(){var rowtype=$("#rowtype").val();"tbody"===rowtype?$("#action").prop("disabled",!1):$("#action").val("row").prop("disabled",!0)}};tinyMCEPopup.onInit.add(TableDialog.init,TableDialog),window.TableDialog=TableDialog}(tinymce,tinyMCEPopup,jQuery);