(function(){"use strict";var a=typeof window!="undefined"?window:global;if(typeof a.require=="function")return;var b={},c={},d=function(a,b){return hasOwnProperty.call(a,b)},e=function(a,b){var c=[],d,e;/^\.\.?(\/|$)/.test(b)?d=[a,b].join("/").split("/"):d=b.split("/");for(var f=0,g=d.length;f<g;f++)e=d[f],e===".."?c.pop():e!=="."&&e!==""&&c.push(e);return c.join("/")},f=function(a){return a.split("/").slice(0,-1).join("/")},g=function(a){return function(b){var c=f(a),d=e(c,b);return i(d)}},h=function(a,b){var d={id:a,exports:{}};b(d.exports,g(a),d);var e=c[a]=d.exports;return e},i=function(a){var f=e(a,".");if(d(c,f))return c[f];if(d(b,f))return h(f,b[f]);var g=e(f,"./index");if(d(c,g))return c[g];if(d(b,g))return h(g,b[g]);throw new Error('Cannot find module "'+a+'"')},j=function(a){for(var c in a)d(a,c)&&(b[c]=a[c])};a.require=i,a.require.define=j,a.require.brunch=!0})(),window.require.define({application:function(a,b,c){((function(){var a,b=Object.prototype.hasOwnProperty,d=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};a=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.log("Well, hello there.")}return d(b,a),b}(Spine.Controller),c.exports=a})).call(this)}}),window.require.define({"views/explore":function(a,b,c){var d=d||{};(function(a){a.getById=function(a){a||(a=d.strip.order[d.strip.order.length-1]),d.strip.goTo(a,d.media.ready)}})(d.explore=d.explore||{})}}),window.require.define({"views/media":function(a,b,c){var d=d||{};(function(a){var b=200,c=25e3,d=600,e,f='<span class="media-next"><b></b>Next</span>',g='<span class="media-prev"><b></b>Prev</span>',h='<span class="media-position-dot">&bull;</span>',i='<div class="media-position" />',j,k,l,m,n=!0,o,p,q=function(a){typeof a!="number"&&(a=$(a.target).index()),k.eq(m).removeClass("active"),j.eq(m).fadeOut(b,"linear",function(){j.eq(a).fadeIn(b,"linear",function(){k.eq(a).addClass("active"),m=a})})},r=function(){var a;n?m<l-1?a=m+1:a=0:m>0?a=m-1:a=l-1,q(a)},s=function(){var a="";for(var b=0;b<l;b++)a+=h;return k=$(a),k.eq(0).addClass("active"),k},t=function(a){window.clearInterval(o),window.clearTimeout(p),j=a.find("li"),l=j.length;if(l<=1)return!1;j&&j.show(),m=0,n=!0,a.unbind("mousenter mouseleave"),j.show().slice(1).hide(),o=window.setInterval(r,c);if(!e){e=$('<div style="display:none;"/>');var h=$(f).bind("click",function(){n=!0,r(),window.clearInterval(o)});e.bind("mouseenter",function(a){window.clearTimeout(p)});var k=$(g).bind("click",function(){n=!1,r(),window.clearInterval(o)});e.data("pageContainer",$(i)),e.append(k).append(h).append(e.data("pageContainer")).delegate(".media-position-dot","click",q)}else e.detach().hide();e.data("pageContainer").html(s()),a.append(e).bind("mouseenter",function(){e.fadeIn(b),window.clearTimeout(p)}).bind("mouseleave",function(){p=window.setTimeout(function(){e.fadeOut(b)},d)})};a.ready=function(a){t(a.el.find(".media-showcase"))}})(d.media=d.media||{})}}),window.require.define({"views/route":function(a,b,c){var d=d||{};(function(a){var b,c,e=[];a.defaultUrl="explore/";var f=function(e){var f,g=!1;e?f=e.fragment:f=$.param.fragment(),f=f.toLowerCase().replace(/^\//,"");if(b!==f){c=b,b=f?f:a.defaultUrl;var h=b.split("/"),i=h.shift(),j=h.shift();i==="explore"&&j!=="all"&&(h.push(j),j="getById");var k=d[i];if(k){var l=k[j];l&&(d.strip.isAnimating?d.strip.reset(function(){l.apply(k,h)}):l.apply(k,h),g=!0)}}!g&&d.msgPanel&&d.msgPanel.show()};a.getCurrentUrl=function(){return b},a.getPreviousUrl=function(){return c},a.next=function(){e.length&&(e[0].call(),e.pop(0))},$(window).bind("hashchange",f),$(document).ready(function(){f()})})(d.route=d.route||{})}}),window.require.define({"views/splash":function(a,b,c){var d=d||{};(function(a){var b=200,c=4e3,d,e,f,g,h=function(a){d.eq(f).fadeOut(b,"linear",function(){d.eq(a).fadeIn(b,"linear",function(){f=a})})},i=function(){var a;f<e-1?a=f+1:a=0,h(a)},j=function(a){d=a.find("li"),e=d.length;if(e<=1)return!1;f=0,d.show().slice(1).hide(),g=window.setInterval(i,c)},k=function(){j($(".work"))};$(document).ready(k)})(d.splash=d.splash||{})}}),window.require.define({"views/strip":function(a,b,c){var d=d||{};(function(a){var b=$("#strip"),c=$("#slide-viewport"),e=b.find(".slide"),f=e.length*window.innerWidth,g=f/e.length,h=$(".prev"),i=$(".next"),j=$(".random"),k=90,l=400,m=800,n={};a.isAnimating=!1,a.order=[],a.goTo=function(c,d,e){a.isAnimating=!0;var f=n[c];f&&(p(h),p(i),e||d(f),b.show(),b.animate({left:-f.left+"px"},m,"easeInOutQuad",function(){a.isAnimating&&(f.prevUrl&&o(h,f.prevUrl),f.nextUrl&&o(i,f.nextUrl)),o(j,q(c)),a.isAnimating=!1,e&&d(f)}))},a.reset=function(b){a.isAnimating=!1,$(":animated").stop(!0,!0),b()};var o=function(a,b,c){a.attr("href","#/explore/"+b).fadeIn(c||l)},p=function(a,b){a.fadeOut(b||k)},q=function(b){var c=a.order.length,d=Math.floor(Math.random()*c),e=a.order[d];return e==b&&(e=a.order[d+1],e||(e=a.order[d-1])),e},r=function(){c.css("width",g+"px"),b.css("width",f+"px"),b.css("left",-f+"px"),e.css("width",g+"px"),e.each(function(b,c){var d=null,f=null;e[b-1]&&(d=e[b-1].id),e[b+1]&&(f=e[b+1].id),n[c.id]={el:$(c),left:b*g,prevUrl:d,nextUrl:f},a.order.push(c.id)});var h=d.strip.order.length,i=Math.floor(Math.random()*h),j=d.strip.order[i];b.show()};r()})(d.strip=d.strip||{})}}),window.require.define({"views/tray":function(a,b,c){var d=d||{};(function(a){var b=200,c=200,d=600,e,f,g=$('<div class="target">&nbsp;</div>'),h=$('<div class="tooltip" id="active-project"><div class="bd" /><b class="tail" /></div>'),i,j=!1,k,l=function(a){j&&(f.delay(d).slideUp(b,"linear",function(){e.bind("mouseenter",m)}),e.unbind("mouseenter"))},m=function(a){f.delay(d).slideDown(b,"linear",function(){e.bind("mouseleave",l)}),e.unbind("mouseleave")},n=function(a){var b=$(this),d=a.type=="mouseenter";window.clearTimeout(k),k=window.setTimeout(function(){if(d){var a=b.position(),c="",e;$.each(b.data("roles").split(","),function(a,b){c+=b?"<li>"+b+"</li>":""}),e="<h5>"+b.attr("title")+"</h5>"+"<small>"+b.data("summary")+"</small>"+"<ul>"+c+"</ul>"+'<small class="ft">'+b.data("year")+"</small>",i.html(e),h.css("left",a.left).show()}else h.hide()},c)},o=function(){e=$("#tray").append(g).append(h),i=h.find(".bd"),f=e.find("nav"),e.bind("click",function(a){j=!0}).bind("mouseleave",l).bind("mouseenter",m),e.find("a").bind("mouseenter mouseleave",n),m()};$(document).ready(o)})(d.tray=d.tray||{})}}),window.require.define({"views/work":function(a,b,c){(function(a){var b=$("#mainContent"),c=$(".mediaList"),d=$("#mediaCard"),e=[],f,g;a.lastIssue="";var h=function(){brightcove&&brightcove.createExperiences()},i=function(){$(this).attr("target","_blank")},j=function(){$("#mediaCard").find(".content a").each(i),$("#mediaCard").find(".sparq-prompt a").each(i)},k=function(a){f=document.createDocumentFragment(),g=document.createDocumentFragment(),e=[];if(a.Heros&&a.Heros.length>0){var b=$.tmpl("HeroBox",{heroes:a.Heros})[0];f.appendChild(b),e.push(b)}if(a.WhatIsShoshin){var c=$.tmpl("MarketingBox",a.WhatIsShoshin);g.appendChild(c[0]),e.push(c[0])}if(a.RightRail&&a.RightRail.length>0){var d=$.tmpl("IssueItemRail",a.RightRail);for(var h=0;h<d.length;h++)g.appendChild(d[h]),e.push(d[h])}if(a.Items&&a.Items.length>0){var i=$.tmpl("IssueItem",a.Items);for(var h=0;h<i.length;h++)f.appendChild(i[h]),e.push(i[h])}return e},l=function(a){dstar.dataCache.get(dstar.route.getUrl(),function(b){var f=a.templateName?a.templateName:m(b),g=$.tmpl(f,b);document.title=dstar.baseTitle+b.Title,dstar.transition.toCard(g,{issueItems:e,$mediaCard:d,$mediaLists:c},function(){a.callback&&a.callback.call(),j(),dstar.route.next()})})},m=function(a){var b;switch(a.ContentType){case"Video":b="VideoCard";break;case"Article":b="ArticleCard";break;case"RequiredReading":b="RequiredReadingCard";break;default:b="VideoCard"}return b},n=function(){b.delegate("li","click",function(){a.activeElement=$(this)})};$(document).ready(n),a.issue=function(b){b&&(a.lastIssue="archive/"+b),dstar.dataCache.get(dstar.route.getUrl(),function(a){k(a),document.title=dstar.baseTitle+a.Title,dstar.transition.toIssue(e,{issuesLeft:f,issuesRight:g,$mediaCard:d,$mediaLists:c},function(){a.Heros&&a.Heros.length>1?$("#loopedSlider").loopedSlider({autoStart:15e3}):$(".slides div").show(),dstar.route.next()})})},a.archive=function(){document.title=dstar.baseTitle+"Issue Archive";var b=$("#issueArchive");$("#LastIssue").attr("href","#!/"+a.lastIssue),dstar.transition.toCard(b.clone(),{issueItems:e,$mediaCard:d,$mediaLists:c},dstar.route.next)},a.detail=function(){l({callback:h})},a.faqs=function(){l({templateName:"MarketingCard"})},a.privacypolicy=function(){l({templateName:"MarketingCard"})},a.termsofuse=function(){l({templateName:"MarketingCard"})},a.aboutus=function(){l({templateName:"MarketingCard"})},a.links=function(){l({templateName:"MarketingCard"})},a.sparq=function(){l({templateName:"SparqCard"})}})(cb.work=cb.work||{})}})