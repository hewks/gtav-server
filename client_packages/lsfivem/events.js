/*================================*/
/* LSFIVEM.COM / vk.com/tellarion */
/*================================*/

exports = function(auth_data, forms_data, voice_data) {

  var timer_id = {};
  var timer_id_reconnect = {};
  var actual_blip_point = {};
  var actual_checkpoint = {};
  let actual_checkpoint_data = {};
  let voicer_distance = {};

  const maxDistance = 25*25;
  const width = 0.03;
  const height = 0.0065;
  const border = 0.001;
  const color = [255,255,255,255];

  mp.events.add("aLogin", () => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.2(\'$("#6").3(4);\');1.c.7.8(9);0.2(\'1.a("b", 5);\');',13,13,'forms_data|mp|execute|fadeIn|1000|true|alogin_form|chat|show|false|invoke|focus|gui'.split('|'),0,{}))
  });

  mp.events.add("playerEnterCheckpoint", (checkpoint) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7(a[0]==5){6 2=8 9(3);2[0]="4";2[1]=b[\'c\'];2=d.e(2);f.g.h(\'i\',2)}',19,19,'||gen_array||send_checkpoint_get|checkpoint|var|if|new|Array|actual_checkpoint|actual_checkpoint_data|type|JSON|stringify|mp|events|callRemote|clientData'.split('|'),0,{}))
  });

  mp.events.add('delCheckPoint', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1[0].2();',3,3,'|actual_checkpoint|destroy'.split('|'),0,{}))
  });

  mp.events.add('addCheckPoint', (type, position, num) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('g(e(3)==0){a[0]=5.9.6(4,c,7,{d:6 5.8(0,0,0),f:[2,2,2,2],h:i,j:0});b[\'3\']=0}k g(e(3)==1){a[0]=5.9.6(l,c,7,{d:6 5.8(0,0,0),f:[2,2,2,2],h:i,j:0});b[\'3\']=1}k g(e(3)==m){a[0]=5.9.6(l,c,7,{d:6 5.8(0,0,0),f:[2,2,2,2],h:i,j:0});b[\'3\']=m}k g(e(3)==n){a[0]=5.9.6(l,c,7,{d:6 5.8(0,0,0),f:[2,2,2,2],h:i,j:0});b[\'3\']=n}',24,24,'||255|type||mp|new||Vector3|checkpoints|actual_checkpoint|actual_checkpoint_data|position|direction|parseInt|color|if|visible|true|dimension|else|num|10|11'.split('|'),0,{}))
  });

  mp.events.add('delMapPoint', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1[0].2();',3,3,'|actual_blip_point|destroy'.split('|'),0,{}))
  });

  mp.events.add('addMapPoint', (type, position) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(c(6)==1){5[0]=7.8.9(1,a,{b:\'Чекпоинт\',2:1.4,d:0,e:f,g:h,i:j,k:l,m:0,})}',23,23,'||scale|if||actual_blip_point|type|mp|blips|new|position|name|parseInt|color|alpha|255|drawDistance|100|shortRange|true|rotation|false|dimension'.split('|'),0,{}))
  });

  mp.events.add('render', (nametags) => {
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('u 7=o.t.7;u s=7.w(0,0);G.H(r=>{i[h,x,y,m]=r;l(m<=q){i j=(m/q);l(j<0.6)j=0.6;p 9=h.M();9=9<g?9/g:((9-g)/g);p k=h.D()/g;y-=j*(0.E*(s.y/F));i n=h.T;o.t.7.J(`${h.K}[${n}]`,[x,y],{L:4,v:[5,5,5,5],j:[0.4,0.4],z:A});i 8=y+0.C;l(k>0){i c=x-3/2-d/2;7.a(c,8,3+d*2,0.I,0,0,0,f);7.a(c,8,3,b,e,e,e,5);7.a(c-3/2*(1-9),8,3*9,b,5,5,5,f);c=x+3/2+d/2;7.a(c,8,3+d*2,b+d*2,0,0,0,f);7.a(c,8,3,b,N,O,P,5);7.a(c-3/2*(1-k),8,3*k,b,Q,R,S,f)}B{7.a(x,8,3+d*2,b+d*2,0,0,0,f);7.a(x,8,3,b,e,e,e,5);7.a(x-3/2*(1-9),8,3*9,b,5,5,5,f)}}});',56,56,'|||width||255||graphics|y2|health|drawRect|height|x2|border|150|200|100|player|let|scale|armour|if|distance|serverid|mp|var|maxDistance|nametag|screenRes|game|const|color|getScreenResolution|||outline|true|else|042|getArmour|005|1080|nametags|forEach|0085|drawText|name|font|getHealth|41|66|78|48|108|135|remoteId'.split('|'),0,{}))
  });

  mp.events.add('setMark', (fraction) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4(8(5)==1){0.3(\'$("#b").6(7);\')}a 4(8(5)==2){0.3(\'$("#c").6(7);\')}0.3(\'9.e("f", g);\');9.h.i.j(d);',20,20,'forms_data|||execute|if|fraction|fadeIn|1000|parseInt|mp|else|gun_panel_army|gun_panel_police|false|invoke|focus|true|gui|chat|show'.split('|'),0,{}))
  });

  mp.events.add('gFractionWarehouse', (fraction) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4(8(5)==1){0.3(\'$("#b").6(7);\')}a 4(8(5)==2){0.3(\'$("#c").6(7);\')}0.3(\'9.e("f", g);\');9.h.i.j(d);',20,20,'forms_data|||execute|if|fraction|fadeIn|1000|parseInt|mp|else|gun_panel_army|gun_panel_police|false|invoke|focus|true|gui|chat|show'.split('|'),0,{}))
  });

  mp.events.add('setWantedLevel', (wanted) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1.2.3(4(5));',6,6,'mp|game|gameplay|setFakeWantedLevel|parseInt|wanted'.split('|'),0,{}))
  });

  mp.events.add('voiceChatLoader', (id, username) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\');`);',5,5,'voice_data|execute|voice_loader|id|username'.split('|'),0,{}))
  });

  mp.events.add('voiceActive_passive', (id, username) => {
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('p.q(`H(\'${h}\',\'${r}\');`);g o=()=>{g m=``;l.n.G((k,h)=>{d(k.F==r){m=k}});E m};g j=o();g i=l.n.D;g c=C;B[h]=A(w(){a=v.u(l.t.s.K(j.f.x,j.f.y,j.f.z,i.f.x,i.f.y,i.f.z)/3);d(b(a)>=0&&b(a)<=4){c=1}e d(b(a)>=0&&b(a)<=4){c=0.9}e d(b(a)>=5&&b(a)<=9){c=0.8}e d(b(a)>=I&&b(a)<=J){c=0.7}e d(b(a)>=L&&b(a)<=M){c=0.6}e d(b(a)>=N&&b(a)<=O){c=0.5}e d(b(a)>=P&&b(a)<=Q){c=0.4}e d(b(a)>=R&&b(a)<=S){c=0.3}e d(b(a)>=T&&b(a)<=U){c=0.2}e d(b(a)>=V&&b(a)<=W){c=0.1}e{c=0}p.q(`X(\'${h}\',\'${c}\',\'${a}\');`)},Y);',61,61,'||||||||||distance|parseInt|volume|if|else|position|let|id|get_my_position|get_player_voice|player|mp|get_player|players|getPlayer|voice_data|execute|username|system|game|round|Math|function||||setInterval|voicer_distance|100|local|return|name|forEach|voice_set1|10|14|vdist2|15|19|20|24|29|34|35|39|40|44|45|49|voice_noise|1000'.split('|'),0,{}))
  });

  mp.events.add('voiceActive_caller', (id, username) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\');`);',5,5,'voice_data|execute|voice_set2|id|username'.split('|'),0,{}))
  });

  mp.events.add('voiceCancel', (id) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1.2(`3(\'${0}\');`);4(5[0]);',6,6,'id|voice_data|execute|voice_cancel|clearInterval|voicer_distance'.split('|'),0,{}))
  });

  mp.events.add('rentDialog', (coast) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\');`);',4,4,'forms_data|execute|rentTransForm|coast'.split('|'),0,{}))
  });

  mp.events.add('updateSpeedometr_1', (car_name) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.2(`$("#3").4(5);`);0.2(`6(\'${7}\');`);0.2(`8(1);`);',9,9,'forms_data||execute|speedometr_form|fadeIn|1000|updateVehicleName|car_name|updateVehicleSpeed'.split('|'),0,{}))
  });

  mp.events.add('updateSpeedometr_2', () => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 0=3.4.5.6();0=1.8(0*2.9);a.b(`c(\'${0}\');`);',13,13,'speed|Math||mp|players|local|getSpeed|let|floor|236936|forms_data|execute|updateVehicleSpeedAction2'.split('|'),0,{}))
  });

  mp.events.add('disabledSpeedometr', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`$("#3").4(5);`);0.1(`6(2);`);',7,7,'forms_data|execute||speedometr_form|fadeOut|1000|updateVehicleSpeed'.split('|'),0,{}))
  });

  mp.events.add('showWrongForm', (formid, wrong) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\');`);',5,5,'forms_data|execute|show_wrong_form|formid|wrong'.split('|'),0,{}))
  });

  mp.events.add('showSuccessForm', (formid, success) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\');`);',5,5,'forms_data|execute|show_success_form|formid|success'.split('|'),0,{}))
  });

  mp.events.add('registrationTest', (count_questions, questions) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\');`);',5,5,'forms_data|execute|registerTesting|count_questions|questions'.split('|'),0,{}))
  });

  mp.events.add('registrationTestComplete', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'\')`);',3,3,'forms_data|execute|registerTestingEnd'.split('|'),0,{}))
  });

  mp.events.add('createPerson', (sex) => {
    forms_data.execute(`show_create_person('${sex}');`);
  });

  mp.events.add('endPerson', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2();`);',3,3,'forms_data|execute|show_end_person'.split('|'),0,{}))
  });

  mp.events.add('captureGangStop', (blip, winner_color) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.3.1(\'5\',2,a);0.3.1(\'6\',2,7);8.9(`4();`);',11,11,'mp|invoke|blip|game|close_gang_war|0xA8FD2D5529E1737|0xC71C8E276E3EC54|winner_color|auth_data|execute|false'.split('|'),0,{}))
  });

  mp.events.add('captureGangStart', (blip, counter1, counter2, timerx) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.3.1(\'7\',2,5);0.3.1(\'6\',2,d);8.9(`a(\'${b}\',\'${c}\',\'${4}\');`);',14,14,'mp|invoke|blip|game|timerx|true|0xC71C8E276E3EC54|0xA8FD2D5529E1737|auth_data|execute|show_gang_war|counter1|counter2|62'.split('|'),0,{}))
  });

  mp.events.add('shakeDrugs', (aptute) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1.5.2(\'3\',"4",a(7));8(9(){1.5.2(\'3\',"4",0)},6);',11,11,'|mp|invoke|0x2269709BAFC7A1E5|FAMILY5_DRUG_TRIP_SHAKE|game|30000|aptute|setTimeout|function|parseFloat'.split('|'),0,{}))
  });

  mp.events.add('buyDrugs', () => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.2(\'$("#6").3(4);\');1.c.7.8(9);0.2(\'1.a("b", 5);\');',13,13,'forms_data|mp|execute|fadeIn|1000|true|drugs_form|chat|show|false|invoke|focus|gui'.split('|'),0,{}))
  });

  mp.events.add('webPlayer', (type) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(9(6)==0){1.2(\'$("#7").8(4);\');3.a.b.c(d);1.2(\'3.e("f", g);\')}',17,17,'|forms_data|execute|mp|1000|if|type|webplayer_form|fadeIn|parseInt|gui|chat|show|false|invoke|focus|true'.split('|'),0,{}))
  });

  mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2=0.1;3.4.5(\'6\',"7",8(2));',9,9,'||aptute|mp|game|invoke|0x2269709BAFC7A1E5|MEDIUM_EXPLOSION_SHAKE|parseFloat'.split('|'),0,{}))
  });

  mp.events.add('hiddenGangZone', (blip) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1.2.3(\'4\',5,0);',6,6,'|mp|game|invoke|0xF20857E4CB32A2B7|blip'.split('|'),0,{}))
  });

  mp.events.add('setGangZone', (hashes, blip, x, y, z, dist) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3.6.4(`${5[1]}`,7,2(8));3.6.4(`${5[0]}`,7,2(9),2(a),2(b));',12,12,'||parseFloat|mp|invoke|hashes|game|blip|dist|x|y|z'.split('|'),0,{}))
  });

  mp.events.add('addGangZone', (zoneid, hashes, x, y, z, radius, color) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6=7.8.j.o(d(f),d(h),d(i),c(l));7.8.a(`${b[0]}`,6,g);7.8.a(`${b[1]}`,6,5);7.8.a(`${b[2]}`,6,c(k));7.8.a(`${b[3]}`,6,3);7.8.a(`${b[4]}`,6,m);n 9=p q(2);9[0]=\'r\';9[1]=6;9[2]=c(s);7.t.u(\'v\',w.e(9));',33,33,'||||||blip|mp|game|array_gen|invoke|hashes|parseInt|parseFloat|stringify|x|100|y|z|ui|color|radius|true|let|addBlipForRadius|new|Array|sendGangZone|zoneid|events|callRemote|clientData|JSON'.split('|'),0,{}))
  });

  mp.events.add('clearTask', (time) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1 0(){2.3.4.5()}6(0,7(8));',9,9,'clear_sex_my_body|function|mp|players|local|clearTasks|setTimeout|parseInt|time'.split('|'),0,{}))
  });

  mp.events.add('drawGameTextChat', (username, message) => {
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 8,a;2 5;2 e=()=>{2 6=``;d.g.h((7,l)=>{o(7.q==s){6=7}});v 6};2 f=e();b c(){5=f.j;d.k.E.m(n,[5.x,5.y,5.z+1.4],{p:0,r:[9,9,9,t],u:[0.3,0.3],w:A})}8=B(c,1);a=C(b(){D(8)},i);',41,41,'||let|||posx|get_player|player|timer1|204|timer2|function|chat_head|mp|getPlayer|getter_pos|players|forEach|5000|position|game|id|drawText|message|if|font|name|color|username|255|scale|return|outline||||false|setInterval|setTimeout|clearInterval|graphics'.split('|'),0,{}))
  });

  mp.events.add('storeView', (type) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('e(f(g)==1){0.7.9.a(5);0.d.8.6(5);2.3(\'0.b("c", 4);\');2.3(`h();`)}i{0.7.9.a(4);0.d.8.6(4);2.3(\'0.b("c", 5);\');2.3(\'$("#j").k(l);\')}',22,22,'mp||forms_data|execute|true|false|displayRadar|gui|ui|chat|show|invoke|focus|game|if|parseInt|type|store_view|else|store_form_clothes|fadeOut|1000'.split('|'),0,{}))
  });

  mp.events.add('controlObject', (type) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(9(c)==1){2.0(\'4.5("3", a);\');b.0(\'$("#6").d(7);\')}e{2.0(\'$("#6").f(7);\');2.0(\'4.5("3", g);\')}',17,17,'execute||forms_data|focus|mp|invoke|control_object|1000|if|parseInt|true|auth_data|type|fadeIn|else|fadeOut|false'.split('|'),0,{}))
  });

  mp.events.add('updateTab', (text, online) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 0=4.1(/\\5/2,\'\').1(/"/2,\'"\');6.7(`8(\'${0}\',\'${9}\');`);',10,10,'get_dat|replace|g|let|text|n|auth_data|execute|addTab|online'.split('|'),0,{}))
  });

  mp.events.add('clearTab', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2();`);',3,3,'auth_data|execute|clearTab'.split('|'),0,{}))
  });

  mp.events.add('showHouseMenu', (house_number, house_info1, house_info2) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(`2(\'${3}\',\'${4}\',\'${5}\');`);',6,6,'forms_data|execute|showHouseForm|house_number|house_info1|house_info2'.split('|'),0,{}))
  });

  mp.events.add('freezePlayer', (type) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(6=="1"){0.2.3.4(7)}8{0.2.3.4(9)}',10,10,'mp||players|local|freezePosition|if|type|true|else|false'.split('|'),0,{}))
  });

  mp.events.add('taskScenario', (scenarioName, unkDelay) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1.2.3(4,5(6),7);',8,8,'mp|players|local|taskStartScenarioInPlace|scenarioName|parseInt|unkDelay|true'.split('|'),0,{}))
  });

  mp.events.add("doorControl", (doorHash,x,y,z,locked,p5, p6, p7) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5.6.2.3(4,0(1),0(7),0(8),9,0(a),0(b),0(c));',13,13,'parseFloat|x|object|doorControl|doorHash|mp|game|y|z|locked|p5|p6|p7'.split('|'),0,{}))
  });

  mp.events.add("setHeadBlendData", (shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4.8.b.3(0(5),0(6),0(7),0(2),0(9),0(a),1(c),1(d),1(e),f);',16,16,'parseInt|parseFloat|skinFirstID|setHeadBlendData|mp|shapeFirstID|shapeSecondID|shapeThirdID|players|skinSecondID|skinThirdID|local|shapeMix|skinMix|thirdMix|true'.split('|'),0,{}))
  });

  mp.events.add("changePlayerCameraPosition", (x,y,z,rx,ry,rz) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('k 4=2.h.3(\'c\',3 2.6(1(9),1(a),1(b)),3 2.6(1(8),1(d),1(e)),f.0);4.g(5);2.i.4.j(5,7,l,5,7);',22,22,'|parseFloat|mp|new|cam|true|Vector3|false|rx|x|y|z|default|ry|rz|90|setActive|cameras|game|renderScriptCams|var|15000'.split('|'),0,{}))
  });

  mp.events.add("returnPlayerCamera", function (time = 0) {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2.3.4.5(0,1,6,1,0);',7,7,'false|true|mp|game|cam|renderScriptCams|time'.split('|'),0,{}))
  });

  mp.events.add("gameChat", function (state) {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(9===1){0.6.7.8(3);0.a.b.4(3)}d 5(9===2){0.6.7.8(c);0.a.b.4(c)}',14,14,'mp|||false|displayRadar|if|gui|chat|show|state|game|ui|true|else'.split('|'),0,{}))
  });

  mp.events.add("showMainMenu", function (state) {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6(9(7)==1){8.d.g.h(i);0.3(\'8.m("e", f);\');0.3(\'$("#a").b(4);\')}j 6(9(7)==2){0.3(\'$("#a").b(4);\');0.3(\'$("#k").5(4);\');0.3(\'$("#l").5(4);\');0.3(\'$("#c").5(4);\')}',23,23,'forms_data|||execute|1000|fadeOut|if|state|mp|parseInt|mainmenu_form|fadeIn|mainmenu_form_stats_1|gui|focus|true|chat|show|false|else|mainmenu_form_settings|mainmenu_form_helper|invoke'.split('|'),0,{}))
  });

  mp.events.add("showMainMenu_click", function (state, player) {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b(c(a)==1){0.6(\'$("#9").8(7);\');0.6(\'$("#h").e(7);\')}d b(c(a)==2){0.6(\'$("#9").8(7);\');0.6(\'$("#q").e(7);\')}d b(c(a)==3){0.6(\'$("#9").8(7);\');0.6(\'$("#i").e(7);\')}d b(c(a)==4){0.6(\'$("#9").8(7);\');0.6(\'$("#j").e(7);\')}d b(c(a)==5){f.k.l.m(n);0.6(\'f.o("p", g);\');0.6(\'$("#9").8(7);\')}d{}',27,27,'forms_data||||||execute|1000|fadeOut|mainmenu_form|state|if|parseInt|else|fadeIn|mp|false|mainmenu_form_stats_1|mainmenu_form_helper|mainmenu_form_donate|gui|chat|show|true|invoke|focus|mainmenu_form_settings'.split('|'),0,{}))
  });

  mp.events.add('callerMenu', () => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(\'$("#2").3(4);\');0.1(\'5.6("7", 8);\');',9,9,'forms_data|execute|calls_form|fadeIn|1000|mp|invoke|focus|true'.split('|'),0,{}))
  });

  mp.events.add("showNPanel_click", function (state, player) {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(8(6)==1){0.4(\'$("#9").a(7);\');0.4(\'$("#g").e(7);\')}b 5(8(6)==2){}b 5(8(6)==3){c.f.d.h(i);0.4(\'c.j("k", l);\');0.4(\'$("#9").a(7);\')}',22,22,'forms_data||||execute|if|state|1000|parseInt|npanel_form|fadeOut|else|mp|chat|fadeIn|gui|npanel_form_ads|show|true|invoke|focus|false'.split('|'),0,{}))
  });

  mp.events.add('NPanel_data', (type, result) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(7(4)==0){6.2(`5(\'8\')`)}9 3(7(4)==1){6.2(`5(\'${a}\')`)}',11,11,'||execute|if|type|showAdsUpdate|forms_data|parseInt|UNKNOWN|else|result'.split('|'),0,{}))
  });

  mp.events.add('nMenu', () => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.2(\'$("#6").3(4);\');0.2(\'1.c("7", 8);\');1.9.a.b(5);',13,13,'forms_data|mp|execute|fadeIn|1000|false|npanel_form|focus|true|gui|chat|show|invoke'.split('|'),0,{}))
  });

  mp.events.add("showCallMenu_click", function (state, player) {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6(c(9)==1){0.4(\'$("#7").8(5);\');0.4(\'$("#f").d(5);\')}b 6(c(9)==2){0.4(\'$("#7").8(5);\');0.4(\'$("#p").d(5);\')}b 6(c(9)==3){a.g.h.i(e);a.k.l.m(e);0.4(\'a.n("o", j);\');0.4(\'$("#7").8(5);\')}b{}',26,26,'forms_data||||execute|1000|if|calls_form|fadeOut|state|mp|else|parseInt|fadeIn|true|calls_form_about_taxi|gui|chat|show|false|game|ui|displayRadar|invoke|focus|calls_form_about_police'.split('|'),0,{}))
  });

  mp.events.add('playerGUIStats', (person) => {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0=1.2(0);3.4(`5(\'${0.6}\',\'${0.7}\');`);',8,8,'person|JSON|parse|forms_data|execute|updateStatsMain|g_money|g_hungry'.split('|'),0,{}))
  });

  mp.events.add('playerGUIStatsUpdate_1', (person, g_job_name, g_fraction_name, g_fraction_name_rang, g_gang_name, g_gang_name_rang) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=b.3(1);1.2=(1.2==0)?"Мужской":"Женский";5.6(`7(\'${1.8}\',\'${1.2}\',\'${1.9}\',\'${1.a}\',\'${1.l}\',\'${1.c}\',\'${1.d}\',\'${1.e}\',\'${1.f}\',\'${1.g}\',\'${h}\',\'${i}\',\'${j}\',\'${k}\',\'${4}\');`);',22,22,'|person|g_sex|parse|g_gang_name_rang|forms_data|execute|updateStats_1|g_name|g_level|g_exp|JSON|g_victims|g_respect|g_zavisim|g_drugs|g_materials|g_job_name|g_fraction_name|g_fraction_name_rang|g_gang_name|g_money'.split('|'),0,{}))
  });

  mp.events.add('playerShowIDCard', (person, fraction, rang) => {
    eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=c.g(1);1.2=(1.2==0)?"Мужской":"Женский";3(1.a){4 0:1.a="-";5}3(1.9){4 0:1.9="-";5}3(1.6){4 0:1.6="-";5}8.7(`d(\'${1.e}\',\'${1.2}\',\'${1.f}\',\'${1.b}\',\'${h}\',\'${i}\',\'${1.6}\');`);8.7(\'$("#j").k(l);\');',22,22,'|person|g_sex|switch|case|break|g_job|execute|forms_data|g_rang|g_fraction|g_respect|JSON|updateStats_10|g_name|g_victims|parse|fraction|rang|idcard_form_stats_1|fadeIn|1000'.split('|'),0,{}))
  });

  mp.events.add('cefData', function() {
    eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1.2(\'3\',4.5(6));',7,7,'mp|events|callRemote|clientData|JSON|stringify|arguments'.split('|'),0,{}))
  });

}
