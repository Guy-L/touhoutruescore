$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	var umtable = document.getElementById("umtable");
	
	alert("This is a WIP site. Please come back later.");
	
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

//TODO: 
//0.5. Stable sort should be implemented for time
//1. Filter selectors
//2. View selectors
//3. WBaWC
//4. About page
//5. Infobox stuff
//Distant - Double-check UM replays for life cards bought
//Distant - PC-98 leaderboards maybe?