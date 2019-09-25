var ud,ko,Application={};Application.version="0.1",Application.define=function(a,b){if("object"!=typeof this.__)return null;var c=this.__;switch(a=a.split("."),a[0]){case"core":c.core=c.core||{},c.core[a[1]]=b;break;case"model":c.models=c.models||{},c.models[a[1]]=b}},Application.load=function(a){if("object"==typeof this.__)return this.__;var b=jQuery.extend(!0,{_required:{},version:Application.version,url:"//"+location.host+"/",model_url:"//"+location.host+"/model/",view_url:"//"+location.host+"/view/",modules:{},models:{},socket:!1,default_module:!1,ui:{content:"#content"},listeners:{rendered:function(){return null},add_menu_item:function(a){return a},add_content_wrapper:function(a){return a},section_selected:function(){return null},socket_connected:function(){return null}}},"object"==typeof a?a:"string"==typeof a?{model:a}:{},{});return b.rendered=!1,b.sections={},b._required=jQuery.extend(!0,b._required,{js:{async:"//ud-cdn.com/js/async/1.0/async.js",ko:"//ud-cdn.com/js/knockout/latest/knockout.js","ko.mapping":"//ud-cdn.com/js/knockout.mapping/latest/knockout.mapping.js","knockout.ud":"//ud-cdn.com/js/knockout.ud/latest/knockout.ud.js",Sammy:"//ud-cdn.com/js/sammy/0.7.1/sammy.js",io:"//ud-cdn.com/js/ud.socket/1.0.0/ud.socket.js",bootstrap:"//ud-cdn.com/js/bootstrap/2.2.2/bootstrap.min.js","Application.__.core.view_model":"//ud-cdn.com/js/ud.happ/"+b.version+"/core/view_model.js","Application.__.core.socket":"//ud-cdn.com/js/ud.happ/"+b.version+"/core/socket.js","Application.__.core.json_editor":"//ud-cdn.com/js/ud.happ/"+b.version+"/core/json_editor.js"},css:{}}),b.show_error=function(a,b){return"undefined"!=typeof console&&console.error("undefined"!=typeof b?b:"ERROR",a),null},b.is_url=function(a){return"string"==typeof a&&/^((https?|ftp):)?\/\/([\-A-Z0-9.]+)(\/[\-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[A-Z0-9+&@#\/%=~_|!:,.;]*)?/i.test(a)?!0:!1},b._init=function(){if(b.rendered)return null;for(var a in b.modules){switch(b.modules[a]=jQuery.extend(!0,{name:a,description:"",type:"module",menu:"#modules_menu",id:"module_"+a,href:!1,parent:!1,model:b.model_url+a+".js",view:b.view_url+a+".tpl",args:{},view_model:null},"object"==typeof b.modules[a]?b.modules[a]:{name:b.modules[a]}),b.modules[a].type){case"module":if("string"==typeof b.modules[a].model&&b.is_url(b.modules[a].model)&&(b._required.js["module."+a]=b.modules[a].model),b.sections[b.modules[a].id]=a,jQuery(b.ui.content).length>0&&!jQuery("#"+b.modules[a].id).length>0){var c='<div id="'+b.modules[a].id+'" class="module-container"></div>';try{content=b.listeners.add_content_wrapper(c,b.modules[a],b)}catch(d){b.show_error("add_content_wrapper",d)}"string"==typeof c&&jQuery(b.ui.content).append(c)}break;case"link":}if(jQuery(b.modules[a].menu).length>0){var e=b.is_url(b.modules[a].href)?b.modules[a].href:"#"+b.modules[a].id,f='<a href="'+e+'">'+b.modules[a].name+"</a>";try{f=b.listeners.add_menu_item(f,b.modules[a],b)}catch(d){b.show_error("add_menu_item",d)}"string"==typeof f&&(f=jQuery(f),f.each(function(c,d){var e="undefined"!=typeof jQuery(d).attr("href")?jQuery(d):jQuery("a",d);e.length>0&&e.attr("module",a).attr("type",b.modules[a].type)}),jQuery(b.modules[a].menu).append(f))}}"object"==typeof b._required.css&&jQuery.each(b._required.css,function(a,b){ud.load.css(b)}),ud.load.js(b._required.js,function(){b.router=b.router();var a={};jQuery.each(b.models,function(b,c){"object"==typeof c&&"object"==typeof c._required&&("object"==typeof c._required.js&&jQuery.each(c._required.js,function(b,c){a[b]=c}),"object"==typeof c._required.css&&jQuery.each(c._required.css,function(a,b){ud.load.css(b)}))}),Object.size=function(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c},Object.size(a)>0?ud.load.js(a,b._run):b._run()})},b._run=function(){return b.rendered?null:void(b.socket&&"object"==typeof b.socket?b.core.socket(b.socket,function(a){b.socket=a;try{b.listeners.socket_connected(b)}catch(c){b.show_error("socket_connected",c)}b.router.run()}):b.router.run())},b.router=function(){return new Sammy(function(){this.home=b.url,this.loading=!1,this.get(/\#(.*)/,function(a){if(a.app.loading)return null;a.app.loading=!0;var c={section:!1,args:[]};jQuery.each(a.params.splat[0].split("/"),function(a,b){return 0==b.length?null:void(c.section?c.args.push(b):c.section=b)});var d="undefined"!=typeof b.sections[c.section]?b.sections[c.section]:!1;if(!d||"undefined"==typeof b.modules[d])return b.show_error("Module with the hash '"+c.section+"' doesn't exist.","Sammy.get( '#:module' )"),a.app.loading=!1,"undefined"!=typeof b.modules[b.default_module]&&"undefined"!=typeof b.sections[b.modules[b.default_module].id]&&a.app.runRoute("get","#"+b.modules[b.default_module].id),null;null===b.modules[d].view_model||"object"!=typeof b.modules[d].view_model?(b.modules[d].view_model=b.core.view_model({scope:b,model:"object"==typeof b.models[d]?b.models[d]:{},view:b.modules[d].view,args:jQuery.extend(b.modules[d].args,{module:d}),container:"#"+c.section}),setTimeout(function(){b.modules[d].view_model.apply(c.args)},300)):b.modules[d].view_model.update(c.args);var e=b.sections[c.section];if("undefined"!=typeof b.selected_section&&e===b.selected_section)return a.app.loading=!1,null;b.selected_section=e;for(var f in b.sections)"function"!=typeof b.sections[f]&&jQuery('a[href="#'+f+'"]').removeClass("selected");for(var f in b.sections)if("function"!=typeof b.sections[f]){var g=jQuery("#"+f).get(0);jQuery(g).hide(),jQuery(g).attr("id")===c.section&&(b.modules[d].parent&&"object"==typeof b.modules[b.modules[d].parent]&&jQuery('a[href="#'+b.modules[b.modules[d].parent].id+'"][type="module"]').addClass("selected"),jQuery('a[href="#'+c.section+'"]').addClass("selected"),jQuery(g).fadeIn(500,function(){jQuery(this).show(500,function(){a.app.loading=!1})}))}try{b.listeners.section_selected(c.section,b)}catch(h){b.show_error("section_selected",h)}if(!b.rendered){try{b.listeners.rendered(b)}catch(h){b.show_error("rendered",h)}b.rendered=!0}}),this.get("",function(a){var c=new RegExp("(https?|ftp):","g");a.app.home.replace(c,"")!==location.href.replace(c,"")?window.location=location.href:b.default_module&&jQuery("#"+b.default_module).length>0&&a.app.runRoute("get","#"+b.default_module)})})},this.__=b,b._init(),this.__};