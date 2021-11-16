$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	var umtable = document.getElementById("umtable");
	
	//alert("This is a WIP site. Please come back later.");
	
	getUMData().then((um) => {
		for(let replay of um[0].values){
			let row = umtable.insertRow();
			
			for(let data = 0; data < replay.length - 1; data++){
				let cell = row.insertCell(-1);
				
				if(replay[data] == null) continue;
				
				if(data == 5) cell.innerHTML = replay[data].toFixed(2) + "%";
				else if(data == 6) cell.innerHTML = replay[data];
				else if(data == 10) cell.innerHTML = "<a href=\"" + replay[data] + "\">Resource</a>" + (replay[28] == 1 ? "<span data-tip=\"This replay had to be repaired due to desyncs.\nIts current host differs from its source.\"><img src=\"help.png\" class=\"help\"></span>":"");
				else if(data > 19 && data < 28) cell.innerHTML = "<img src=\"cards/" + replay[data] + ".png\" alt=\"" + replay[data] + "\" title=\"" + replay[data] + "\" class=\"card\">";
				else cell.innerHTML = isNaN(replay[data]) ? replay[data] : Number(replay[data]).toLocaleString();
			}
		}
		
		sorttable.makeSortable(umtable);
		
		updateDiff($(".select-selected")[0].innerHTML);
		updateChar($(".select-selected")[1].innerHTML);
		updateSort($(".select-selected")[2].innerHTML);
	});
});

async function getDatabase(){
	const SQL = await initSqlJs();
    const fetched = await fetch("truescore.db");
    const buf = await fetched.arrayBuffer();
	const db = new SQL.Database(new Uint8Array(buf));
    return db;
}

async function getUMData(){
	db = await getDatabase();
	return db.exec("SELECT * from um ORDER BY TrueScore DESC;");
}

function updateDiff(diff){
	if(diff == "Hard"){
		$("#data-selectors td:nth-child(2) .select-items").children()[3].click();
		//let chars = $("#data-selectors td:nth-child(2) .select-items").children();
		////chars[3].click();
		//for(let c = 1; c < chars.length; c++) if(c == 3) continue; else chars[c].classList.add("select-disabled");
	} //else $(".select-disabled").removeClass("select-disabled");
	
	if(diff == "Any Difficulty") {
		$('#umtable td:first-child').show();
		$('#umtable th:first-child').show();
		$(".filter-0").removeClass("filter-0");
	} else {
		$('#umtable td:first-child').hide();
		$('#umtable th:first-child').hide();
		filter(diff, 0);
	}
}

function updateChar(crct){
	if(crct == "Reimu" || crct == "Marisa" || crct == "Sanae"){
		$("#data-selectors td:first-child .select-items").children()[1].click();
		//$("#data-selectors td:first-child .select-items").children()[2].classList.add("select-disabled");
	} //else $(".select-disabled").removeClass("select-disabled");
	
	if(crct == "Any Character") {
		$('#umtable td:nth-child(2)').show();
		$('#umtable th:nth-child(2)').show();
		$(".filter-1").removeClass("filter-1");
	} else {
		$('#umtable td:nth-child(2)').hide();
		$('#umtable th:nth-child(2)').hide();
		filter(crct, 1);
	}
}

function filter(f, column) {
	let rows = $("#umboard tbody tr");
	
	for(let row of rows){
		if(row.children[column].innerHTML == f) row.classList.remove("filter-" + column);
		else row.classList.add("filter-" + column);
	}
}

function updateSort(sort) { 
    let opt = $(".select-items div:contains('"+sort+"')");
	if(opt.hasClass("selected-desc")) opt.removeClass("selected-desc");
	else {
		$(".selected-desc").removeClass("selected-desc");
		opt.addClass("selected-desc");
	}
	
    sorttable.innerSortFunction.apply($("#" + sort)[0], []);
}

function changeView(o, mode){
	$(".selected-view").removeClass("selected-view");
	$(o).addClass("selected-view");
}

//TODO: 
//1. View selectors (+"no results")
//2. WBaWC
//3. About page
//4. Infobox stuff
//Distant - Double-check UM replays for life cards bought
//Distant - PC-98 leaderboards maybe?
//To consider - can do without jquery?