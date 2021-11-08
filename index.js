$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	var umboard = document.getElementById("umboard");
	
	alert("This is a WIP site. Please come back later.");
	
	getUMData().then((um) => {
		for(let replay of um[0].values){
			let row = umboard.insertRow();
			
			for(let data = 0; data < replay.length - 1; data++){
				let cell = row.insertCell(-1);
				
				if(data == 7) cell.innerHTML = replay[data];
				else if(data == 12) cell.innerHTML = "<a href=\"" + replay[data] + "\">Resource</a>" + (replay[29] == 1 ? "*":"");
				else if(data > 20 && data < 29) cell.innerHTML = "<img src=\"cards/" + replay[data] + ".png\" alt=\"" + replay[data] + "\" title=\"" + replay[data] + "\">";
				else cell.innerHTML = isNaN(replay[data]) ? replay[data] : Number(replay[data]).toLocaleString();
			}
		}
		
		sorttable.makeSortable(umboard);
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