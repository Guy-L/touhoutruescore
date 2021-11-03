var db;

$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	
	alert(1);
	db = getDatabase();
	alert(db);
    //const contents = db.exec("SELECT * FROM my_table");
});

async function getDatabase(){
	const SQL = await initSqlJs();
	alert(SQL);
    const fetched = await fetch("truescore.db");
	alert(fetched);
    const buf = await fetched.arrayBuffer();
	alert(buf);
	const data = new SQL.Database(new Uint8Array(buf));
	alert(data);
    return data;
}