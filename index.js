$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
		
	getUMData().then((um) => {
		//Initialization
		var umtable = document.getElementById("umtable");
		var umnormal = document.getElementById("umnormal");
		var umbig = document.getElementById("umbig");
		
		//Generation
		for(let [i, replay] of um[0].values.entries()){
			
			//Table View
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
			
			//Normal View
			let cls = (i==0)? "class=\"tip-under\"":"";
			let special = "";
			if(replay[0] != "Lunatic") special = "<span data-tip=\""+replay[0]+"\" "+cls+"><img src=\"special/"+replay[0]+".png\" style=\"height:90%\" alt=\""+replay[0]+"\"></span>";
			else if(replay[1] != "Sakuya") special = "<img src=\"special/"+replay[1]+".png\" style=\"height:90%\" alt=\""+replay[1]+"\">";
			let lives = "<img src=\"resources/life.png\" alt=\"L\">".repeat(replay[16]) + (replay[17] > 0 || replay[16] == 0 ? "<img src=\"resources/lifepiece"+replay[17]+".png\" alt=\"+"+replay[17]+"\">" : "");
			let bombs = "<img src=\"resources/bomb.png\" alt=\"B\">".repeat(replay[18]) + (replay[19] > 0 || replay[18] == 0 ? "<img src=\"resources/bombpiece"+replay[19]+".png\" alt=\"+"+replay[19]+"\">" : "");
			
			
			$(umnormal).append(
			`
			<div class="entry-normal">
				<div class="entry-normal-top" onclick="expandNormal(this)">
					<table><tr>
					<td>#${i+1}</td>
					<td style="width:45.8%; padding-left: 10px;">${replay[3]}<span class="subName">${replay[2]==replay[3]?"":"("+replay[2]+")"}</span></td>
					<td style="width:2%; height: 30px;">${special}</td>
					<td style="width:10%; text-align: center; text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black;">${replay[4].toLocaleString()}</td>
					<td style="width:5.6%; text-align: right;">${replay[15].toLocaleString()}&nbsp;<img src="resources/gold.png" alt="G"></td>
					<td style="width:10.3%; text-align: center;" ${cls} data-tip="Replay date (${replay[8]})
Submitted: ${replay[12]}">${replay[7]}</td>
					<td style="width:3.8%; text-align: center;" ${cls} data-tip="Slowdown %">${replay[5].toFixed(2)}%</td>
					<td style="width:5.8%; text-align: center;" ${cls} data-tip="Ending lives">${lives}</td>
					<td style="width:5.8%; text-align: center;" ${cls} data-tip="Ending bombs">${bombs}</td>
					<td style="width:2.8%; text-align: center;" ${cls} data-tip="Click to download replay${replay[28] == 1 ? "\nThis replay had to be repaired due to desyncs.\nIts current host differs from its source." : ""}"><a href="${replay[10]}" onclick="stopEvent(event);"><img src="royalflare.png" alt="${replay[11]}"></a></td>
					<td style="width:7.3%; text-align: center;"><div class="moreInfo">More Info</div></td>
					</tr></table>
				</div>
				<div class="entry-normal-bottom">
					<table style="width:100%;">
						<tr style="font-size: .7em; color: grey; font-weight: bold;">
							<th style="border-right: 1px dashed grey; border-bottom: 1px dashed grey; width:70%;">COMMENT</th>
							<th style="border-bottom: 1px dashed grey;">STARTERS</th>
							<th style="border-bottom: 1px dashed grey;">ST1</th>
							<th style="border-bottom: 1px dashed grey;">ST2</th>
							<th style="border-bottom: 1px dashed grey;">ST3</th>
							<th style="border-bottom: 1px dashed grey;">ST4</th>
							<th style="border-bottom: 1px dashed grey;">ST5</th>
						</tr>
						<tr>
							<td style="border-right: 1px dashed grey;">${replay[9].replace("//", "<br>")}</td>
							<th>
								<span class="tip-under" data-tip="${replay[20]}"> <img src="cards/${replay[20]}.png" alt="${replay[20]}" class=\"card\"> </span>
								<span class="tip-under" data-tip="${replay[21]}"> <img src="cards/${replay[21]}.png" alt="${replay[21]}" class=\"card\"> </span>
								<span class="tip-under" data-tip="${replay[22]}"> <img src="cards/${replay[22]}.png" alt="${replay[22]}" class=\"card\"> </span>
							</th>
							<th> <span class="tip-under" data-tip="${replay[23]}"> <img src="cards/${replay[23]}.png" alt="${replay[23]}" class=\"card\"> </span> </th>
							<th> <span class="tip-under" data-tip="${replay[24]}"> <img src="cards/${replay[24]}.png" alt="${replay[24]}" class=\"card\"> </span> </th>
							<th> <span class="tip-under" data-tip="${replay[25]}"> <img src="cards/${replay[25]}.png" alt="${replay[25]}" class=\"card\"> </span> </th>
							<th> <span class="tip-under" data-tip="${replay[26]}"> <img src="cards/${replay[26]}.png" alt="${replay[26]}" class=\"card\"> </span> </th>
							<th> <span class="tip-under" data-tip="${replay[27]}"> <img src="cards/${replay[27]}.png" alt="${replay[27]}" class=\"card\"> </span> </th>
							
						</tr>
					</table>
				</div>
			</div>
			`);
			
		}
		
		sorttable.makeSortable(umtable);
		
		//Applying Stored Selectors / View
		updateDiff($(".select-selected")[0].innerHTML);
		updateChar($(".select-selected")[1].innerHTML);
		updateSort($(".select-selected")[2].innerHTML);
		if (localStorage['viewMode']) changeView(localStorage['viewMode']);
		else changeView(1);
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

function changeView(mode, o){
	localStorage['viewMode'] = mode;
	
	if(o === undefined) o = $("#view-selectors td")[mode];
	
	$(".selected-view").removeClass("selected-view");
	o.classList.add("selected-view");
	
	$(".visible-view").removeClass("visible-view");
	$("#umboard").children()[mode].classList.add("visible-view");
}

function expandNormal(entry){
	$(entry).siblings('.entry-normal-bottom').slideToggle(300);  
	moreInfo = $(entry).find('.moreInfo');
	moreInfo.html(moreInfo.html() == "More Info"?"Less Info":"More Info");
}

function stopEvent(e) {
	e.stopPropagation();
}

//TODO: 
//1. View selectors
//2. WBaWC
//3. About page
//4. Infobox stuff
//Distant - Double-check UM replays for life cards bought
//Distant - PC-98 leaderboards maybe?
//To consider - can do without jquery?