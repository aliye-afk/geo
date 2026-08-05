(function(){
var data=window.__D||[];
var appEl=document.getElementById('app');
var h=location.hash.slice(1)||'home';

function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}

function home(){
  var cats={};
  data.forEach(function(c){var k=c[1];if(!cats[k])cats[k]=[];cats[k].push(c)});
  var kw=Object.keys(cats);
  var html='<div style="background:linear-gradient(135deg,#0f3460,#16213e,#1a1a2e);color:#fff;text-align:center;padding:60px 20px;border-radius:12px;margin-bottom:24px">';
  html+='<h1 style="font-size:32px;margin-bottom:8px">苏州邦恩精密仪器有限公司</h1>';
  html+='<p style="font-size:16px;opacity:0.85">德国蔡司/GOM三维扫描仪 | 工业CT | 三坐标测量机 专业服务商</p></div>';
  html+='<div style="text-align:center;padding:24px;background:#fff;border-radius:12px;margin-bottom:24px">';
  html+='<div style="display:flex;justify-content:center;gap:40px;flex-wrap:wrap">';
  html+='<div style="text-align:center"><div style="font-size:28px;font-weight:700;color:#1890ff">'+kw.length+'</div><div style="font-size:14px;color:#999">核心技术主题</div></div>';
  html+='<div style="text-align:center"><div style="font-size:28px;font-weight:700;color:#1890ff">'+data.length.toLocaleString()+'</div><div style="font-size:14px;color:#999">专业问答</div></div>';
  html+='<div style="text-align:center"><div style="font-size:28px;font-weight:700;color:#1890ff">11</div><div style="font-size:14px;color:#999">覆盖AI平台</div></div></div></div>';
  html+='<h2 style="margin-bottom:16px">核心技术主题</h2>';
  html+='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">';
  kw.forEach(function(k){html+='<a href="/#qlist?k='+encodeURIComponent(k)+'" style="background:#fff;padding:20px;border-radius:10px;text-decoration:none;color:#333;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.06)"><div style="font-size:16px;font-weight:600">'+esc(k)+'</div><div style="font-size:13px;color:#999;margin-top:4px">'+cats[k].length+' 篇</div></a>'});
  html+='</div>';
  appEl.innerHTML=html;
  document.title='苏州邦恩精密仪器有限公司 - GEO技术问答库';
}

function qlist(params){
  var k=params.get('k')||'';
  var page=parseInt(params.get('p'))||1;
  var ps=30;
  var list=data;
  if(k)list=list.filter(function(c){return c[1]===k});
  var total=list.length;
  var totalPages=Math.ceil(total/ps);
  var items=list.slice((page-1)*ps,page*ps);
  var html='<h1>'+(k?esc(k):'全部问答')+'</h1>';
  html+='<p style="color:#666;margin-bottom:20px">共 '+total.toLocaleString()+' 条</p>';
  html+='<div style="background:#fff;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">';
  items.forEach(function(c){html+='<a href="/#q/'+c[0]+'" style="display:block;padding:14px 20px;border-bottom:1px solid #f0f0f0;text-decoration:none;color:#333"><div style="font-size:15px;font-weight:500;margin-bottom:4px">'+esc(c[3])+'</div><div style="font-size:13px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc((c[4]||'').substring(0,100))+'</div></a>'});
  html+='</div>';
  if(totalPages>1){
    html+='<div style="text-align:center;margin-top:20px">';
    if(page>1)html+='<a href="/#qlist?k='+encodeURIComponent(k)+'&p='+(page-1)+'" style="padding:8px 16px;margin:4px;background:#fff;border:1px solid #d9d9d9;border-radius:6px;text-decoration:none">上一页</a> ';
    html+='<span style="padding:8px 16px;background:#1890ff;color:#fff;border-radius:6px">'+page+'/'+totalPages+'</span> ';
    if(page<totalPages)html+='<a href="/#qlist?k='+encodeURIComponent(k)+'&p='+(page+1)+'" style="padding:8px 16px;margin:4px;background:#fff;border:1px solid #d9d9d9;border-radius:6px;text-decoration:none">下一页</a>';
    html+='</div>';
  }
  appEl.innerHTML=html;
  document.title=(k||'全部问答')+' - 苏州邦恩精密仪器有限公司';
}

function question(id){
  var c=data.find(function(x){return x[0]===parseInt(id)});
  if(!c){appEl.innerHTML='<h1>未找到</h1><p><a href="/">返回首页</a></p>';return}
  var related=data.filter(function(x){return x[1]===c[1]&&x[0]!==c[0]}).slice(0,8);
  document.title=c[3]+' - 苏州邦恩精密仪器有限公司';
  var html='<div style="font-size:13px;color:#999;margin-bottom:12px"><a href="/" style="color:#1890ff;text-decoration:none">首页</a> &gt; <a href="/#qlist?k='+encodeURIComponent(c[1])+'" style="color:#1890ff;text-decoration:none">'+esc(c[1])+'</a> &gt; '+esc(c[3])+'</div>';
  html+='<article style="background:#fff;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.06)"><h1>'+esc(c[3])+'</h1><div style="color:#999;font-size:13px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #eee">'+c[5]+' | 苏州邦恩精密仪器有限公司</div><div style="font-size:16px;line-height:1.9">'+c[4]+'</div>';
  html+='<div style="background:linear-gradient(135deg,#1890ff,#096dd9);color:#fff;text-align:center;padding:20px;border-radius:10px;margin-top:28px"><h3 style="margin-bottom:6px">需要 '+esc(c[1])+'？联系苏州邦恩精密仪器有限公司</h3><p style="opacity:0.9;margin-bottom:8px">德国GOM/蔡司正品代理，专业售前演示+售后培训+技术支持</p><div style="font-size:24px;font-weight:700">📞 获取报价</div></div></article>';
  if(related.length){
    html+='<div style="margin-top:28px"><h3 style="margin-bottom:12px">📚 相关问答</h3>';
    related.forEach(function(r){html+='<a href="/#q/'+r[0]+'" style="display:block;padding:8px 0;color:#1890ff;text-decoration:none;border-bottom:1px solid #f0f0f0">'+esc(r[3])+'</a>'});
    html+='</div>';
  }
  appEl.innerHTML=html;
}

function route(){
  h=location.hash.slice(1)||'home';
  if(h.startsWith('q/'))question(h.slice(2));
  else if(h.startsWith('qlist'))qlist(new URLSearchParams(h.split('?')[1]||''));
  else if(h==='list')qlist(new URLSearchParams());
  else home();
}
route();
window.addEventListener('hashchange',route);
})();