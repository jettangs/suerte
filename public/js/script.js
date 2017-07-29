var loadData = [{
	path: "./js/Reel.js",
	type: "js"
},{
	name: "login_btn",
	path: "./images/login/btn.png"
},{
	name: "home_bg",
	path: "./images/home/bg.png"
},{
	name: "chip",
	path: "./images/common/chip.png"
},{
	name: "gold",
	path: "./images/common/gold.png"
},{
	name: "star",
	path: "./images/common/star.png"
},{
	name: "head",
	path: "./images/common/head.png"
},{
	name: "shop",
	path: "./images/common/shop.png"
},{
	name: "top_bar",
	path: "./images/common/top_bar.png"
},{
	name: "bot_bar",
	path: "./images/home/bot_bar.png"
},{
	name: "home_clubs",
	path: "./images/home/clubs.png"
},{
	name: "home_friends",
	path: "./images/home/friends.png"
},{
	name: "home_lobby",
	path: "./images/home/lobby.png"
},{
	name: "home_backjack",
	path: "./images/home/backjack.png"
},{
	name: "home_roulette",
	path: "./images/home/roulette.png"
},{
	name: "home_slot",
	path: "./images/home/slot.png"
},{
	name: "login_bg",
	path: "./images/login/bg.png"
},{
	name: "stop_over",
	path: "./images/slot/slot_stop_over.png"
}, {
	name: "start",
	path: "./images/slot/slot_start.jpg"
}, {
	name: "kake",
	path: "./images/slot/slot_kake.png"
}, {
	name: "slot_back",
	path: "./images/slot/slot_back.png"
}, {
	name: "slot_ok",
	path: "./images/slot/slot_ok.png"
}, {
	name: "item1",
	path: "./images/slot/1.png"
}, {
	name: "item2",
	path: "./images/slot/2.png"
}, {
	name: "item3",
	path: "./images/slot/3.png"
}, {
	name: "item4",
	path: "./images/slot/4.png"
}, {
	name: "item5",
	path: "./images/slot/5.png"
}, {
	name: "item6",
	path: "./images/slot/6.png"
}]

var loadingLayer,loadingBar,loadingText;
var loader,launchBgloader;
var backLayer;
var stopLayer;
var startLayer;
var loadIndex = 0;
var imglist = {};
var btnup, btndown, btnleft, btnright;

var mapImgList = new Array();
var mapmoveflag = "";
var MOVE_STEP = 10;

var combination = new Array([1, 1, 5], [1, 2, 4], [1, 5, 1], [2, 1, 4], [2, 3, 3], [2, 4, 1], [2, 5, 4], [3, 1, 2], [3, 4, 3], [3, 5, 5], [4, 1, 2], [4, 2, 3], [4, 5, 1], [4, 5, 5], [5, 1, 1], [5, 2, 4], [5, 3, 2], [5, 5, 1], [1, 1, 1], [1, 1, 1]);
var reels = new Array();
var kakes = new Array();

var stopBtn = new Array();
var start;
var win;

var width = 480
var height = 853


init(50, "suerte", width, height, main);


function main() {
	LGlobal.canTouch = true;
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LGlobal.screen(LStage.FULL_SCREEN);
	launchBgloader = new LLoader();
	launchBgloader.addEventListener(LEvent.COMPLETE,function(){
		var launch_bg_data = new LBitmapData(launchBgloader.content)
		var launch_bg = new LBitmap(launch_bg_data)
		//loadingLayer = new LoadingSample1(null,"red","blue");
		loadingLayer = new LSprite();
		loadingBar = new LSprite();
		loadingText = new LTextField();

		var loadingBarWidth = 200;
		var loadingBarHeight = 20;
		var loadingBarLeft = (width-loadingBarWidth)/2
		var loadingBarTop = height-100

		loadingText.process = 0;
		loadingText.text = "Carga: 0 %";
		loadingText.size = 12;
		loadingText.x = (width-loadingText.getWidth())/2;
		loadingText.y = loadingBarTop-30;
		loadingText.color = "white"

		loadingLayer.setProgress = function(p){
			loadingText.text = "Carga: " + p + " %"
			loadingBar.graphics.drawRoundRect(1,'white',[loadingBarLeft,loadingBarTop,loadingBarWidth*(p/100),loadingBarHeight,5],true,"white")
		}

		loadingLayer.addChild(launch_bg,0,0);
		loadingLayer.addChild(loadingText);
		loadingLayer.addChild(loadingBar);

		addChild(loadingLayer)

		LLoadManage.load(
			loadData,
			function(progress) {
				loadingLayer.setProgress(progress);
 			},
			function(result) {
				imglist = result;
				removeChild(loadingLayer);
				loadingLayer = null;
				gameInit();
			}
		);
	});
	launchBgloader.load("./images/launch_bg.png");
}

var barBg,topLayer,head,level,gold,chip,setting,centerLayer,slot,rouletee,bottomLayer,clubs,lobby,friends

function gameInit(event) {
	var i, j, bitmap, bitmapdata, childmap;

	topLayer = new LSprite();

	var head = new LBitmap(new LBitmapData(imglist["head"]));
	head.x = 10;
	head.y = 12;

	var star = new LBitmap(new LBitmapData(imglist["star"]));
	star.x = 10;
	star.y = 52;

	var level = new LTextField();
	level.text = "1";
	level.size = 9;
	level.x = 16
	level.y = 56
	level.color = "#00008a"

	var name = new LTextField();
	name.text = "JetTang";
	name.size = 14;
	name.x = 80
	name.y = 17
	name.color = "white"

	var chip = new LBitmap(new LBitmapData(imglist["chip"]));
	chip.x = 220
	chip.y = 18

	var chipLabel = new LTextField();
	chipLabel.text = "chip :"
	chipLabel.color = "white"
	chipLabel.size = 13
	chipLabel.x = 250
	chipLabel.y = 18

	var chipCount = 100000
	var chipText = new LTextField();
	chipText.text = "100,000"
	chipText.color = "white"
	chipText.size = 13
	chipText.x = 300
	chipText.y = 18

	var gold = new LBitmap(new LBitmapData(imglist["gold"]));
	gold.x = 220
	gold.y = 46

	var goldLabel = new LTextField();
	goldLabel.text = "ror :"
	goldLabel.color = "white"
	goldLabel.size = 13
	goldLabel.x = 250
	goldLabel.y = 46

	var goldCount = 432000
	var goldText = new LTextField();
	goldText.text = "432,000"
	goldText.color = "white"
	goldText.size = 13
	goldText.x = 300
	goldText.y = 46

	// var setting = new LBitmap(new LBitmapData(imglist["setting"]));
	// setting.x = 350
	// setting.y = 70

	var shop = new LBitmap(new LBitmapData(imglist["shop"]));
	shop.x = 390
	shop.y = 22

	//半透明背景
	topLayer.graphics.beginBitmapFill(new LBitmapData(imglist["top_bar"]))
	topLayer.graphics.drawRect(1,"#000000",[0,0,480,80]);

	//经验条
	var level_bar_max_width = 60
	var level_bar_cur_width = 20
	topLayer.graphics.drawRoundRect(1,"#ffe500",[80,50,level_bar_cur_width,15,5],true,"#ffe500")

	topLayer.addChild(shop);
	topLayer.addChild(head);
	topLayer.addChild(star);
	topLayer.addChild(level);
	topLayer.addChild(name);
	topLayer.addChild(gold);
	topLayer.addChild(goldLabel);
	topLayer.addChild(goldText);
	topLayer.addChild(chip);
	topLayer.addChild(chipLabel);
	topLayer.addChild(chipText);

	//topLayer.addChild(setting);

/***************/

	centerLayer = new LSprite();
	centerLayer.x = 0
	centerLayer.y = 260

	var slot = new LBitmap(new LBitmapData(imglist["home_slot"]));
	slot.x = (width-slot.getWidth())/2
	slot.y = 0
	var slotLayer = new LSprite();
	backLayer = new LSprite()
	slotLayer.addChild(slot)
	slotLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		removeChild(home);
		home = null;
		stopLayer = new LSprite();
		addChild(stopLayer);

		for (i = 0; i < 3; i++) {
			var reel = new Reel(combination, i);
			reel.x = 150 * i + 90;
			reel.y = 225;
			reels.push(reel);
			addChild(reel);
			var kake = new LBitmap(new LBitmapData(imglist["kake"]));
			kake.x = 150 * i + 90;
			kake.y = 225;
			kakes.push(kake);
			addChild(kake);
			var stop = new LButton(new LBitmap(new LBitmapData(imglist["stop_up"])), new LBitmap(new LBitmapData(imglist["stop_over"])));
			stop.x = 150 * i + 110;
			stop.y = 490;
			stop.index = i;
			stopBtn.push(stop);
			stop.visible = false;
			stop.addEventListener(LMouseEvent.MOUSE_UP, stopevent);
			addChild(stop);
		}

		startLayer = new LSprite();
		addChild(startLayer);
		start = new LButton(new LBitmap(new LBitmapData(imglist["start"])), new LBitmap(new LBitmapData(imglist["start"])));
		start.x = 55;
		start.y = 450;
		startLayer.addChild(start);
		start.addEventListener(LMouseEvent.MOUSE_UP, onmouseup);


		win = new LButton(new LBitmap(new LBitmapData(imglist["slot_ok"])), new LBitmap(new LBitmapData(imglist["slot_ok"])));
		startLayer.addChild(win);
		win.visible = false;
		win.addEventListener(LMouseEvent.MOUSE_UP, winclick);

		backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	})

	var rouletee = new LBitmap(new LBitmapData(imglist["home_roulette"]))
	rouletee.x = (width-rouletee.getWidth())*(3/2) + slot.getWidth()
	rouletee.y = 0

	var curX = null
	var curP = 0

	centerLayer.addEventListener(LMouseEvent.MOUSE_MOVE,function(event){

		if(!curX){
			curX = event.offsetX
		}

		centerLayer.x = event.offsetX - curX - curP * width

		//左边越界
		if(centerLayer.x > width/2){
			centerLayer.x = width/2
		}

		//右边越界
		if(centerLayer.x < -(centerLayer.getWidth() + width/2)){
			console.log("x")
		}

	})

	centerLayer.addEventListener(LMouseEvent.MOUSE_UP,function(event){

		if(centerLayer.x < -width/2){
			curP = 1
		}else{
			curP = 0
		}
		centerLayer.x = -curP * width
		curX = null
	})

	centerLayer.addChild(slotLayer);
	centerLayer.addChild(rouletee);

/***************/

	bottomLayer = new LSprite();

	var clubs = new LBitmap(new LBitmapData(imglist["home_clubs"]));
	clubs.x = 35
	clubs.y = 35

	var clubsText = new LTextField();
	clubsText.text = "clubs"
	clubsText.color = "white"
	clubsText.size = 13
	clubsText.x = 35
	clubsText.y = 75

	var lobby = new LBitmap(new LBitmapData(imglist["home_lobby"]))
	lobby.x = 210
	lobby.y = 18

	var lobbyText = new LTextField()
	lobbyText.text = "vestíbulo"
	lobbyText.color = "white"
	lobbyText.size = 13
	lobbyText.x = 210
	lobbyText.y = 75

	var friends = new LBitmap(new LBitmapData(imglist["home_friends"]))
	friends.x = 400
	friends.y = 35

	var friendsText = new LTextField()
	friendsText.text = "amigo"
	friendsText.color = "white"
	friendsText.size = 13
	friendsText.x = 400
	friendsText.y = 75

	bottomLayer.graphics.beginBitmapFill(new LBitmapData(imglist["bot_bar"]))
	bottomLayer.graphics.drawRect(1,"#000000",[0,0,480,100]);
	bottomLayer.x = 0
	bottomLayer.y = 753
	bottomLayer.addChild(clubs)
	bottomLayer.addChild(clubsText)
	bottomLayer.addChild(lobby)
	bottomLayer.addChild(lobbyText)
	bottomLayer.addChild(friends)
	bottomLayer.addChild(friendsText)

/***************/

	var homeBg = new LSprite()
	homeBg.graphics.beginBitmapFill(new LBitmapData(imglist["home_bg"]));
	homeBg.graphics.drawRect(1,"#000000",[0,0,1400,853])

	var direction = 1 //-1为向右移动 1为向左移动
	var interval = setInterval(function(){
		if(homeBg.x == 0){
			direction = -1
		}else if(homeBg.x == -1400+853){
			direction = 1
		}
		homeBg.x += direction
	}, 50);

	home = new LSprite();

	home.addChild(homeBg)
	home.addChild(topLayer)
	home.addChild(centerLayer)
	home.addChild(bottomLayer)

	var login = new LSprite();
	var loginPic = new LBitmap(new LBitmapData(imglist["login_bg"]))

	var username = new LTextField()
	username.text = "Nombre:"
	username.color = "white"
	username.size = 28
	username.x = (width-username.getWidth())/2
	username.y = 260

	var nameField = new LTextField()
	nameField.setType(LTextFieldType.INPUT);
	nameField.width = 150;
	nameField.height = 60;
	nameField.color = "white"
	nameField.size = 28
	nameField.text = "Jettang"
	nameField.x = (width-nameField.getWidth())/2
	nameField.y = 320

	var password = new LTextField()
	password.text = "Contraseña:"
	password.color = "white"
	password.size = 28
	password.x = (width-password.getWidth())/2
	password.y = 400

	var pwdField = new LTextField()
	pwdField.setType(LTextFieldType.INPUT);
	pwdField.color = "white"
	pwdField.width = 150;
	pwdField.height = 60;
	pwdField.size = 28
	pwdField.text = "wer23242"
	pwdField.x = (width-pwdField.getWidth())/2
	pwdField.y = 460

	var loginBtn = new LBitmap(new LBitmapData(imglist["login_btn"]));

	var loginBtnLayer = new LSprite();
	loginBtnLayer.addChild(loginBtn)
	loginBtnLayer.x = (width-loginBtnLayer.getWidth())/2
	loginBtnLayer.y = 600
	loginBtnLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		removeChild(login)
		login = null
		addChild(home)
	})


	login.addChild(loginPic)
	login.addChild(username)
	login.addChild(nameField)
	login.addChild(password)
	login.addChild(pwdField)
	login.addChild(loginBtnLayer)

	addChild(login);


}

function onframe() {
	var i;
	for (i = 0; i < 3; i++) {
		reels[i].onframe();
	}
}

function stopevent(event, currentTarget) {
	reels[currentTarget.index].stopFlag = true;
}

function onmouseup(event) {
	var i;
	var stopNum = Math.floor(Math.random() * (combination.length / 3));
	start.visible = false;
	for (i = 0; i < 3; i++) {
		stopBtn[i].visible = true;
		reels[i].startReel = true;
		reels[i].stopFlag = false;
		reels[i].stopNum = stopNum;
	}
}

function winclick() {
	win.visible = false;
	start.visible = true;
}

function checkWin() {
	var i;
	var allstop = 0;
	for (i = 0; i < 3; i++) {
		if (!reels[i].startReel) allstop++;
	}
	if (allstop >= 3) {
		for (i = 0; i < 3; i++) {
			stopBtn[i].visible = false;
		}

		if (reels[0].stopNum >= 19) {
			win.visible = true;
		} else {
			start.visible = true;
		}
	}
}