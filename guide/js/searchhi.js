/*
 Created by Stuart Langridge :: http://www.kryogenix.org/code/browser/searchhi/
 Licenced under the MIT licence http://www.kryogenix.org/code/browser/licence.html
 Modified 20021006 to fix query string parsing and add case insensitivity
 Modified 20070316 to stop highlighting inside nosearchhi nodes
 Modified 20081217 to do in-page searching and wrap up in an object
 Modified 20081218 to scroll to first hit like http://www.woolyss.free.fr/js/searchhi_Woolyss.js and say when not found
*/
searchhi={highlightWord:function(node,word){if(node.hasChildNodes){for(var hi_cn=0;hi_cn<node.childNodes.length;hi_cn++){searchhi.highlightWord(node.childNodes[hi_cn],word);}}
if(node.nodeType==3){tempNodeVal=node.nodeValue.toLowerCase();tempWordVal=word.toLowerCase();if(tempNodeVal.indexOf(tempWordVal)!=-1){var pn=node.parentNode;var checkn=pn;while(checkn.nodeType!=9&&checkn.nodeName.toLowerCase()!='body'){if(checkn.className.match(/\bnosearchhi\b/)){return;}
checkn=checkn.parentNode;}
if(pn.className!="searchword"){var nv=node.nodeValue;var ni=tempNodeVal.indexOf(tempWordVal);var before=document.createTextNode(nv.substr(0,ni));var docWordVal=nv.substr(ni,word.length);var after=document.createTextNode(nv.substr(ni+word.length));var hiwordtext=document.createTextNode(docWordVal);var hiword=document.createElement("span");hiword.className="searchword";hiword.appendChild(hiwordtext);pn.insertBefore(before,node);pn.insertBefore(hiword,node);pn.insertBefore(after,node);pn.removeChild(node);searchhi.found+=1;if(searchhi.found==1)pn.scrollIntoView();}}}},googleSearchHighlight:function(){var ref=document.referrer;if(ref.indexOf('?')==-1)return;var qs=ref.substr(ref.indexOf('?')+1);var qsa=qs.split('&');for(var i=0;i<qsa.length;i++){var qsip=qsa[i].split('=');if(qsip.length==1)continue;if(qsip[0]=='q'||qsip[0]=='p'){var wordstring=unescape(qsip[1].replace(/\+/g,' '));searchhi.process(wordstring);}}},process:function(wordstring){searchhi.found=0;var words=wordstring.split(/\s+/);for(w=0;w<words.length;w++){searchhi.highlightWord(document.getElementsByTagName("body")[0],words[w]);}
if(searchhi.found===0){searchhi.nohits();}},nohits:function(){},init:function(){if(!document.createElement||!document.getElementsByTagName)return;var frms=document.getElementsByTagName("form");for(var i=0;i<frms.length;i++){if(frms[i].className.match(/\bsearchhi\b/)){frms[i].onsubmit=function(){var inps=this.getElementsByTagName("input");for(var j=0;j<inps.length;j++){if(inps[j].type=="text"){searchhi.process(inps[j].value);return false;}}};}}
searchhi.googleSearchHighlight();}};(function(i){var u=navigator.userAgent;var e=/*@cc_on!@*/false;var st=setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u))||(/opera/i.test(u))){document.addEventListener("DOMContentLoaded",i,false);}else if(e){(function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(searchhi.init);