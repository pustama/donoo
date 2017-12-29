    var numfeed = 3;
    var startfeed = 0;
    var urlblog = "https://www.tuntas.net";
    var charac = 40;
    var urlprevious, urlnext;
function seocipsfeed(e,t){for(var n=e.split("<"),r=0;r<n.length;r++)-1!=n[r].indexOf(">")&&(n[r]=n[r].substring(n[r].indexOf(">")+1,n[r].length));return n=n.join(""),n=n.substring(0,t-1)}function showrecentpostsae(e){var t,n,r,a,i,s="";urlprevious="",urlnext="";for(var l=0;l<e.feed.link.length;l++)"previous"==e.feed.link[l].rel&&(urlprevious=e.feed.link[l].href),"next"==e.feed.link[l].rel&&(urlnext=e.feed.link[l].href);for(var d=0;d<numfeed&&d!=e.feed.entry.length;d++){t=e.feed.entry[d],n=t.title.$t;for(var l=0;l<t.link.length;l++)if("alternate"==t.link[l].rel){r=t.link[l].href;break}i="content"in t?t.content.$t:"summary"in t?t.summary.$t:"",a="media$thumbnail"in t?t.media$thumbnail.url:"http://3.bp.blogspot.com/-BHuXHny1kOk/VXrkSyxKCjI/AAAAAAAACas/pZLJAEUDtds/s1600/no-image.png",s+="<div class='recentpostel'>",s+="<a href='"+r+"' target='_blank'><img src='"+a+"' /></a>",s+="<h6><a href='"+r+"'>"+n+"</a></h6>",s+="<p>"+seocipsfeed(i,charac)+"...</p>",s+="</div>"}document.getElementById("recentpostsae").innerHTML=s,s="",s+=urlprevious?"<a href='javascript:navigasifeed(-1);' class='previous'>Previous</a>":"<span class='noactived previous'>Previous</span>",s+=urlnext?"<a href='javascript:navigasifeed(1);' class='next'>Next</a>":"<span class='noactived next'>Next</span>",s+="<a href='javascript:navigasifeed(0);' class='home'>Home</a>",document.getElementById("recentpostnavfeed").innerHTML=s}function navigasifeed(e){var t,n;-1==e?(t=urlprevious.indexOf("?"),n=urlprevious.substring(t)):1==e?(t=urlnext.indexOf("?"),n=urlnext.substring(t)):n="?start-index=1&max-results="+numfeed+"&orderby=published&alt=json-in-script",n+="&callback=showrecentpostsae",incluirscript(n)}function incluirscript(e){1==startfeed&&removerscript(),document.getElementById("recentpostsae").innerHTML="<div id='recentpostload'></div>",document.getElementById("recentpostnavfeed").innerHTML="";var t=urlblog+"/feeds/posts/default"+e,n=document.createElement("script");n.setAttribute("type","text/javascript"),n.setAttribute("src",t),n.setAttribute("id","seocipslabel"),document.getElementsByTagName("head")[0].appendChild(n),startfeed=1}function removerscript(){var e=document.getElementById("seocipslabel"),t=e.parentNode;t.removeChild(e)}onload=function(){navigasifeed(0)};


    $.each($(".post-share[data-id]"), function(a, e) {
        var l = $(e).parent().find("#postshares").addClass("share-load"),
            i = new Firebase("https://sukses-3bdcb.firebaseio.com/pages/id/" + $(e).attr("data-id"));
        i.once("value", function(a) {
            var n = a.val(),
                t = !1;
            null == n && (n = {}, n.value = 0, n.url = window.location.href, n.id = $(e).attr("data-id"), t = !0), l.removeClass("share-load").text(n.value), n.value++, "/" != window.location.pathname && (t ? i.set(n) : i.child("value").set(n.value))
        })
    });


    function loadscript(filename) {
      var scr=document.createElement('script');
      scr.setAttribute("type","text/javascript");
      scr.setAttribute("src",filename);
      document.getElementsByTagName("head")[0].appendChild(scr);
    }
    var waitElm=null;
    function urltinyfyprompt_callback(response) {
      if(waitElm) waitElm.style.display="none";
      var txt="Short URL";
      if(response.title && response.title!="") txt+=' for "'+response.title+'"';
      else if(response.longurl && response.longurl!="") txt+=" for "+response.longurl;
      if(response.tinyurl && response.tinyurl!="")
        prompt(txt+":", response.tinyurl);
      else
        alert("Could not get short URL, try again later." + ((response.error && response.error != "") ? ("nError: " + response.error) : ""));
    }
    function shortenUrl(elm, long_url, service) {
      waitElm=elm.parentNode.nextSibling;
      if(waitElm) waitElm.style.display="inline";
      loadscript("https://urltinyfy.appspot.com/"+service+"?unify=1&url="+encodeURIComponent(long_url) + "&callback=urltinyfyprompt_callback");
    }