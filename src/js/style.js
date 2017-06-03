/*存储为空，一开始获取数据*/
function  postInfo(){
	var info = document.getElementById('info');
	if(info.value==''){
		alert('请输入数据');
	} else {
		var data = loadData();
		var todo = {"title":info.value,"done": false};
		data.push(todo);
		saveData(data);
		var form=document.getElementById("form");
		form.reset(); 
		load();
	}
}

function loadData (){
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		return JSON.parse(collection);
	} else {
		return [];
	}
}

function saveData(data){
	localStorage.setItem('todo',JSON.stringify(data));
}

function load(){
	var todolist=document.getElementById("todolist");
	var complist=document.getElementById("complist");
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		var data=JSON.parse(collection);
		var todoCon=0;
		var doneCon=0;
		var todoString="";
		var doneString="";
		for (var i = data.length-1; i >=0; i--) {
			if(data[i].done){
				doneString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'></a></li>";
				doneCon++;
			}
			else{
				todoString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'></a></li>";
				todoCon++;
			}
		};
		acount.innerHTML=todoCon;
		todolist.innerHTML=todoString;
		compount.innerHTML=doneCon;
		complist.innerHTML=doneString;
	}
	else{
		acount.innerHTML=0;
		todolist.innerHTML="";
		compount.innerHTML=0;
		complist.innerHTML="";
	}
}

function saveSort(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var ts=todolist.getElementsByTagName("p");
	var ds=donelist.getElementsByTagName("p");
	var data=[];
	for(i=0;i<ts.length; i++){
		var todo={"title":ts[i].innerHTML,"done":false};
		data.unshift(todo);
	}
	for(i=0;i<ds.length; i++){
		var todo={"title":ds[i].innerHTML,"done":true};
		data.unshift(todo);
	}                                                        
	saveData(data);
}

function remove(i){
	var data=loadData();
	data.splice(i,1)[0];
	saveData(data);
	load();
}
 
function edit(i){
	load();
	var p = document.getElementById("p-"+i);
	title = p.innerHTML;
	p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
			alert("请输入内容");
		}
		else{
			update(i,"title",input.value);
		}
	};
}

function update(i,field,value){
	var data = loadData();
	var todo = data.splice(i,1)[0];
	todo[field] = value;
	data.splice(i,0,todo);
	saveData(data);
	load();
}

window.onload=load;

window.addEventListener("storage",load,false);