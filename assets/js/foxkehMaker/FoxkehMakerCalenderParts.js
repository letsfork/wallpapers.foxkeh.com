
function FoxkehMakerCalenderParts(){}
FoxkehMakerCalenderParts.prototype=new FoxkehMakerParts();FoxkehMakerCalenderParts.prototype.superInit=FoxkehMakerParts.prototype.init;FoxkehMakerCalenderParts.prototype.init=function(type,profile,parentElement){this.superInit(type,profile,parentElement);var that=this;this.calenderElement=document.createElementNS("http://www.w3.org/2000/svg","g");this.calenderElement.setAttribute("id","calenderElement");this.calender=new FoxkehCalender(this.calenderElement);var url=this.profile.calFont;$.get(url,function(xml){that.calFont=xml;that.calender.calFont=xml;var defs=document.importNode(that.calFont.getElementsByTagName("defs")[0],true);while(defs.childNodes.length){that.parentElement.ownerSVGElement.getElementsByTagName("defs")[0].appendChild(defs.childNodes[0]);}},"xml");$.get(this.profile.holidayFile,function(json){that.holiday=json;},"json");}
FoxkehMakerCalenderParts.prototype.clear=function(){if(typeof this.svgSprite=="object"){var svgElement=this.svgSprite.svgElement;if(svgElement.parentNode)svgElement.parentNode.removeChild(svgElement);}
if(typeof this.bgSVGSprite=="object"){var svgElement=this.bgSVGSprite.svgElement;if(svgElement.parentNode)svgElement.parentNode.removeChild(svgElement);}
if(typeof this.calenderSpriteElement=="object"){var svgElement=this.calenderSpriteElement.svgElement;if(svgElement.parentNode)svgElement.parentNode.removeChild(svgElement);}}
FoxkehMakerCalenderParts.prototype.superInitParts=FoxkehMakerParts.prototype.initParts;FoxkehMakerCalenderParts.prototype.initParts=function(preset){this.superInitParts(preset);}
FoxkehMakerCalenderParts.prototype.__defineSetter__("calType",function(calType){this._calType=calType;if(calType=="square"){this.superSetSVGDocument(this.squareElement);if(typeof this.svgSprite=="object"){this.svgSprite.alpha=1;}}else if(calType=="horizon"){this.superSetSVGDocument(this.horizonElement);if(typeof this.svgSprite=="object"){this.svgSprite.alpha=1;}}else{if(typeof this.svgSprite=="object"){this.svgSprite.svgElement.setAttribute("opacity","0");this.svgSprite.buttonMode=false;}}
this.calender.type=calType;this.calLang=this.calLang;});FoxkehMakerCalenderParts.prototype.__defineGetter__("calType",function(){return this._calType;});FoxkehMakerCalenderParts.prototype.__defineSetter__("calLang",function(calLang){this._calLang=calLang;if(calLang=="japan"){this.calender.monStart=false;}else{this.calender.monStart=true;}});FoxkehMakerCalenderParts.prototype.__defineGetter__("calLang",function(){return this._calLang;});FoxkehMakerCalenderParts.prototype.superSetSVGDocument=FoxkehMakerParts.prototype.setSVGDocument;FoxkehMakerCalenderParts.prototype.setSVGDocument=function(svgDocument){var square=svgDocument.getElementById("square");var horizon=svgDocument.getElementById("horizon");this.squareElement=square;this.horizonElement=horizon;this.calType=(typeof this.calType=="string")?this.calType:"square";}
FoxkehMakerCalenderParts.prototype.__defineSetter__("svgSprite",function(svgSprite){if(typeof svgSprite=="object"&&svgSprite instanceof SVGSprite.Sprite){this.bgSVGSprite=svgSprite;var g=document.createElementNS("http://www.w3.org/2000/svg","g");g.appendChild(this.bgSVGSprite.svgElement);g.appendChild(this.calenderElement);this.parentElement.appendChild(g);this.calenderSpriteElement=new SVGSprite.Sprite(this.calenderElement);this._svgSprite=new SVGSprite.Sprite(g);this.initCalender();}else{this._svgSprite="";}});FoxkehMakerCalenderParts.prototype.__defineGetter__("svgSprite",function(){return this._svgSprite;});FoxkehMakerCalenderParts.prototype.__defineSetter__("alpha",function(alpha){this._alpha=Number(alpha);if(typeof this.bgSVGSprite=="object"){this.bgSVGSprite.alpha=this._alpha;}});FoxkehMakerCalenderParts.prototype.__defineGetter__("alpha",function(){return this._alpha;});FoxkehMakerCalenderParts.prototype.initCalender=function(){var that=this;this.calLang=this.calLang;while(this.calenderElement.childNodes.length){this.calenderElement.removeChild(this.calenderElement.childNodes[0]);}
if(this.calType=="square"){this.calenderSpriteElement.x=this.bgSVGSprite.x+20;this.calenderSpriteElement.y=this.bgSVGSprite.y+20;}else{this.calenderSpriteElement.x=this.bgSVGSprite.x;this.calenderSpriteElement.y=this.bgSVGSprite.y;}
var _year=new Date().getFullYear();var _month=new Date().getMonth()+1;if(typeof this.calender=="object"){_year=this.calender.year;_month=this.calender.month;}
if(typeof this.holiday=="undefined"){$.get(this.profile.holidayFile,function(json){that.holiday=json;that.initCalender();},"json");}else{this.calender.year=_year;this.calender.month=_month;this.calender.holiday=this.holiday;this.calender.type=this.calType;this.calender.display();}}
function FoxkehCalender(parentElement){this.parentElement=parentElement;this.shadowElement=document.createElementNS("http://www.w3.org/2000/svg","g");this.shadowElement.id="shadowElement";this._date=new Date();this._date.setDate(1);this.type="square";}
FoxkehCalender.ON_YEAR_CHANGED="on_year_changed";FoxkehCalender.ON_MONTH_CHANGED="on_month_changed";FoxkehCalender.ON_MONSTART_CHANGED="on_monstart_changed";FoxkehCalender.monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];FoxkehCalender.dayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];FoxkehCalender.getMonthName=function(date){return this.monthName[date.getMonth()];}
FoxkehCalender.getDayName=function(date){return this.dayName[date.getDay()];}
FoxkehCalender.getEndDay=function(year,month){var _month=(month-1==11)?0:month+1;var _year=(_month==0)?year+1:year;var date=new Date(_year,_month,0);return date.getDate();}
FoxkehCalender.prototype.__defineSetter__("year",function(year){this._date.setFullYear(year);this.display();$(this).trigger(FoxkehCalender.ON_YEAR_CHANGED);});FoxkehCalender.prototype.__defineGetter__("year",function(){return this._date.getFullYear();});FoxkehCalender.prototype.__defineSetter__("month",function(month){this._date.setMonth(month-1);this.display();$(this).trigger(FoxkehCalender.ON_MONTH_CHANGED);});FoxkehCalender.prototype.__defineGetter__("month",function(){return this._date.getMonth()+1;});FoxkehCalender.prototype.__defineSetter__("monStart",function(monStart){this._monStart=(monStart)?true:false;this.display();$(this).trigger(FoxkehCalender.ON_MONSTART_CHANGED);});FoxkehCalender.prototype.__defineGetter__("monStart",function(){return this._monStart;});FoxkehCalender.prototype.appendFontElement=function(svgElement,position,scale){var font=svgElement;this.shadowElement.appendChild(font);var svgSprite=new SVGSprite.Sprite(font);var _scale=(typeof scale=="number")?scale:1;svgSprite.scaleX=svgSprite.scaleY=_scale;var _x=(typeof position.x=="number")?position.x:(typeof position.cx=="number")?position.cx-(svgSprite.width/2):0;var _y=(typeof position.y=="number")?position.y:(typeof position.cy=="number")?position.cy-(svgSprite.height/2):0;svgSprite.x=_x;svgSprite.y=_y;return svgSprite;}
FoxkehCalender.prototype.getFontElement=function(id){var svg=this.calFont.getElementById(id);if(typeof svg=="object"){return document.importNode(svg,true);}else{return;}}
FoxkehCalender.prototype.clear=function(){while(this.parentElement.childNodes.length){this.parentElement.removeChild(this.parentElement.childNodes[0]);}
while(this.shadowElement.childNodes.length){this.shadowElement.removeChild(this.shadowElement.childNodes[0]);}
this.parentElement.appendChild(this.shadowElement);}
FoxkehCalender.prototype.display=function(){this.clear();var _date=new Date(this.year,this.month-1,1);var yPosition,yScale;if(this.type=="square"){yPosition={cx:63,cy:36};yScale=1;}else{yPosition={x:13,y:12};yScale=.5;}
this.appendFontElement(this.getFontElement("year_"+this.year),yPosition,yScale);var mPosition,mScale;if(this.type=="square"){mPosition={cx:145,cy:35};mScale=1;}else{mPosition={x:13,y:23};mScale=.5;}
this.appendFontElement(this.getFontElement(FoxkehCalender.getMonthName(this._date)),mPosition,mScale);if(this.type=="square"){var dayX=26;var dayY=73;for(var i=0;i<7;i++){var dayName=(this.monStart)?FoxkehCalender.dayName[i+1]:FoxkehCalender.dayName[i];var _cx=dayX+(i*34)+(34/2);var _y=dayY;var color=(dayName=="Sun")?"#FF8100":(dayName=="Sat")?"#FFFF3E":"#FFFFFF";var dayElement=this.getFontElement(dayName);dayElement.setAttribute("style","fill: "+color+"; fill-opacity: 1;");this.appendFontElement(dayElement,{cx:_cx,y:_y});}}
var days=new Array();var dates=new Array();var _offset=(this.type!="square")?0:(this.monStart)?(_date.getDay()==0)?6:_date.getDay()-1:_date.getDay();var daymsec=60*60*24*1000;_date.setTime(_date.getTime()-(daymsec*_offset));var _prevMonth=(this.month-1==0)?11:this.month-1-1;var _nextMonth=(this.month-1==11)?0:this.month;var numDays=(this.type!="square")?FoxkehCalender.getEndDay(this.year,this.month-1):6*7;for(var i=0;i<numDays;i++){var _month=(_date.getMonth()==_prevMonth)?"prevMonth":(_date.getMonth()==_nextMonth)?"nextMonth":"thisMonth";var _day=FoxkehCalender.getDayName(_date);var color=(_day=="Sun")?"#FF8100":(_day=="Sat")?"#FFFF3E":"#FFFFFF";try{if(this.monStart==false&&typeof this.holiday!='undefined'&&typeof this.holiday[_date.getFullYear()][_date.getMonth()+1][_date.getDate()]!='undefined'){color="#FF8100";}}catch(e){}
var alpha=1;if(_month!="thisMonth"){color="#FFFFFF";alpha=.4;}
var dayElement=this.getFontElement("horizon_"+_day);dayElement.setAttribute("style","fill: "+color+"; fill-opacity: "+alpha+";");days.push(dayElement);var dateElement=this.getFontElement("date_"+_date.getDate());dateElement.setAttribute("style","fill: "+color+"; fill-opacity: "+alpha+";");dates.push(dateElement);_date.setTime(_date.getTime()+daymsec);}
if(this.type=="square"){var dateX=26;var dateY=97;var dateWidth=34;var dateHeight=24;count=0;for(var i=0;i<6;i++){var _y=dateY+(dateHeight*i);for(var j=0;j<7;j++){var _cx=dateX+(j*dateWidth)+(dateWidth/2);this.appendFontElement(dates[count],{cx:_cx,y:_y});count++;}}}else{var dayY=12;var dateX=53;var dateY=26;var dateWidth=21.8;for(var i=0,l=dates.length;i<l;i++){var _cx=dateX+(i*dateWidth)+(dateWidth/2);this.appendFontElement(days[i],{cx:_cx,y:dayY},1);this.appendFontElement(dates[i],{cx:_cx,y:dateY},0.6);}}
var frontElement=this.shadowElement.cloneNode(true);frontElement.id="frontElement";this.shadowElement.parentNode.appendChild(frontElement);this.shadowElement.setAttribute("filter","url(#calBlur)");this.shadowElement.setAttribute("opacity","0.2");frontElement.setAttribute("filter","");frontElement.setAttribute("opacity","1");}
function FoxkehMakerCalenderView(){}
FoxkehMakerCalenderView.prototype=new FoxkehMakerView();FoxkehMakerCalenderView.prototype.superInitUI=FoxkehMakerView.prototype.initUI;FoxkehMakerCalenderView.prototype.initUI=function(){var that=this;this.superInitUI();$(this.foxkehMaker.parts.cal).bind(FoxkehMakerParts.ON_INIT,function(e){that.initForm();that.initListen();});}
FoxkehMakerCalenderView.prototype.initForm=function(){var that=this;var calType=this.foxkehMaker.parts.cal.calType;$('input[name="calType"]').val([calType]);if(this.foxkehMaker.parts.cal.calLang!=$('input[name="calLang"]:checked').val()){this.foxkehMaker.parts.cal.calLang=$('input[name="calLang"]:checked').val();}
var year=this.foxkehMaker.parts.cal.calender.year;$('select[name="year"]').val(year);var month=this.foxkehMaker.parts.cal.calender.month;$('select[name="month"]').val(month);}
FoxkehMakerCalenderView.prototype.initListen=function(){var that=this;$('input[name="calType"]:radio').change(function(e){var type=$('input[name="calType"]:checked').val();if(that.foxkehMaker.parts.cal.calType!=type){that.foxkehMaker.parts.cal.calType=type;}});$('input[name="calLang"]:radio').change(function(e){var lang=$('input[name="calLang"]:checked').val();that.foxkehMaker.parts.cal.calLang=lang;});$('select[name="year"]').change(function(e){var year=$('select[name="year"]').val();that.foxkehMaker.parts.cal.calender.year=year;});$('select[name="month"]').change(function(e){var month=$('select[name="month"]').val();that.foxkehMaker.parts.cal.calender.month=month;});$(this.foxkehMaker.parts.cal.calender).bind(FoxkehCalender.ON_YEAR_CHANGED,function(e){that.initForm();});$(this.foxkehMaker.parts.cal.calender).bind(FoxkehCalender.ON_MONTH_CHANGED,function(e){that.initForm();});$(this.foxkehMaker.parts.cal.calender).bind(FoxkehCalender.ON_MONSTART_CHANGED,function(e){that.initForm();});}