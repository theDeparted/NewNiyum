////////////////////////////
//ABSTRACTION ONLY PART
////////////////////////////
//==================================
//GLOBALS
//==================================
//----------GAME STATE------
var STARTED=false, PAUSED=false;
//----------COMMONT CONSTANTS
var tDiv=40;
//---------CHARACTER------
//CONVENTION: 
// Position of Character,
// frame_no 0 (standing) 1 2 3 4 (for running) 5 for jumping
// parity, is direction of movement (1 is right movement, 0 is left)
// footprint, the distance from x, which if in touch is considered to be in contact
var footprint=100, x=footprint,y=0,frame_no=0,parity=1,power=[{'Partha':0,'Shiv':0}];
//Animation Settings
var frame_change_afterT=5000,walk_x=20,jump_duration=500,grounded=0;
//Animation Variables
var frame_lastT=0;

//---------WORLD-----
//CONVENTION: Capitals for the world coordinates
// Camera Position (X) and (V) is velocity in X
var X=0,Vx=5,Y=0,Vy=0,X_width=800,G_y=10;
var Blen=300,Bheight=10,Bricks=[{'x':0,'y':300,'color':'Yellow','wobble':0},{'x':Blen,'y':400,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':550,'wobble':0,'color':'Yellow'}];
var Message="Use the arrow keys to move around <br/> Right Ctrl to Jump <br/> <br/>";

// Projection wrt Camera
var proj=[{'x':x,'y':y}];
var projBricks=[{'x':0,'y':300,'color':'Yellow','wobble':0},{'x':Blen,'y':400,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':600,'wobble':0,'color':'Yellow'}];//[{'x':0,'y':500,'color':'Yellow','wobble':0},{'x':Blen,'y':500,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':500,'wobble':0,'color':'Yellow'}];;
//TODO: Correct the projBricks to automaticlaly update from Bricks

//-------------USER INPUT------------
var rightkey=0,leftkey=0,space=0,throttle=0;

// var proj={
// 	var x,y,Bricks=[{'x':0,'y':500,'color':'Yellow'},{'x':0,'y':500,'color':'Yellow'}];
// }


//===================================
//FUNCTIONS
//===================================
//----------INIALIAZE------------------
//To initialize all conditions that require a loop etc to execute
function initialize(){
	var i;	

	for(i=0;i<=Bricks.length;i++)
	{
		// projBricks.append({'x':Bricks[i].Blen,'y':Bricks[i].y,'wobble':Bricks[i].wobble,'color':Bricks[i].color});	
	}	
	//proj.B=1;
	
	//alert(projBricks[0].x);

	//alert(projBricks.length);
}

//-------------EVALUATE PROJECTION--------
//Almost like a pre-process for render
function evaluateProjections(){
	
	if(x>(X-(footprint))) 
	{
		// if(x<(X+X_width))
		// {
			// proj.x=x-X;
		// }
		// else
		if(x>(X+X_width-(footprint*2)))
		//if(x<(X_X_width))
		{
			x=X+X_width-(footprint*2);
		}
	}
	else
	{
		x=(X-(footprint));
	}

	proj.x=x-X;
	proj.y=y-Y;
	
	// if(proj.x<=0){
	// 	x=X;
	// }
	// if(proj.y<=0){
	// 	y=Y;
	// }

	// proj.x=(proj.x<=0)?0:x-X;
	// proj.y=(proj.y<=0)?0:y-Y;

	var i;


	for(i=0;i<Bricks.length;i++)
	{
		projBricks[i].x=Bricks[i].x-X;
		projBricks[i].y=Bricks[i].y-Y;

		// alert(projBricks[i].x);
	}
	
	// alert(projBricks[0].x);
	// alert(projBricks[1].x);
	// alert(projBricks[2].x);
	// alert(projBricks[3].x);
	// alert(projBricks[4].x);

}
//-----------------DETECT COLLISIONS
function collisionDetection(){
	
	grounded=0;
	//First with the bricks
	for(i=0;i<Bricks.length;i++)
	{
		if(x>(Bricks[i].x-footprint) && x<(Bricks[i].x + Blen - footprint) )
			if(y>Bricks[i].y)
			{
				y=Bricks[i].y;
				grounded=1;
			}
				
	}
}

//----------------UPDATE MESSAGE---------
function updateMessage(){
	//CONVERT THIS TO A SMALLER WINDOW so that you change it when need be, not unnecessarily
	if(X>0 && X<800)
		Message="Message A";
		//Message=X;
		//Message=Now();
	else if (X>800 && X<1600)
		Message="Now try using new skills!";
}

//--------------------MOVE FORWARD--------
function jumpFrame(){
	frame_no=5;
}
function nextFrame(){
	if(frame_no>0 && frame_no<5)
	{
		frame_no++;
		if(frame_no>=5)
			frame_no=1;
	}
	else
		frame_no=1;
}

function moveForward(deltaT){
	//alert();

	frame_lastT=frame_lastT+deltaT;
	
	deltaT_=deltaT/tDiv;
	x=x+walk_x*deltaT_;

	if(grounded)
	{
		//alert(frame_lastT);
		if(frame_lastT>frame_change_afterT || throttle==1) //Throttle is for quick response!
		{
			nextFrame();
			frame_lastT=frame_lastT%frame_change_afterT; //remainder function
		}
	}
	else
	{
		jumpFrame();
	}
	//alert(frame_no);
}

//---------------GAME'S MAIN LOOP---------
function abstractionLoop(deltaT){
	//-TIME EVALUATION
	//Time elapsed for accurate animation
	deltaT_=deltaT/tDiv;
	X=X+(Vx*deltaT_);		//For moving the World
	Y=Y+(Vy*deltaT_);
	
	y=y+(G_y*deltaT_);	//Gravity!
	//y=100;

	//-UPDATE USING USER INPUT
	if(rightkey==1)
	{
		moveForward(deltaT);
	}
	else if(leftkey==1)
	{
		;//do backward
	}
	else
	{
		frame_no=0; //standing
	}


	if(X>10000)
		PAUSED=true;
	//-UPDATE MESSAGES
	updateMessage();

	//COLLISION DETECTION
	collisionDetection();

	//-EVALUATE PROJECTION	
	evaluateProjections();

}

////////////////////////////

//////////////////////////////
//DOM BINDING
//////////////////////////////
// UpdateFromAbstraction(){
// ;
// }
//DOM GLOBALS
var LastTime=-1,NewTime;
// var Character_Y_Fix=330,Character_X_Fix=130;	//Depends on the graphics
var Character_Y_Fix=270,Character_X_Fix=0;

function UpdateBricks(){
	for(num=0;num<Bricks.length;num++)
	{
		$('#'+num).css('left',projBricks[num].x).css('top',projBricks[num].y).css('background-color',projBricks[num].color).css('width',Blen).css('height',Bheight)
		if(projBricks[num].wobble==1)
			$('#'+num).addClass('Wobble');
		else
			$('#'+num).removeClass('Wobble');
	}
}
function UpdateMessage(){
	$('.Status').html(Message);
}
function MakeObjects(){
	var num;
	for(num=0;num<Bricks.length;num++)
	{
		$('.ga').prepend('<div class="Brick" id=' + num + '> </div>');
	}
	UpdateBricks();
}
function UpdateCharacter(){
	var i;
	for(i=0;i<=5;i++)
	{
		if(i!=frame_no)
		{
			$('.Character' + i).hide();
		}
	}
	$('.Character'+frame_no).css('display','block').css('left',proj.x - Character_X_Fix).css('top',proj.y - Character_Y_Fix);
}
function MainLoop(){
	if(PAUSED==false)
	{	
		NewTime=jQuery.now();
		if(LastTime==-1)
			LastTime=NewTime;

		abstractionLoop(NewTime-LastTime); //INVOKE THE CENTRAL UPDATE FUNCTION FOR ABSTRACTIONS
		LastTime=NewTime;

		//GRAPHICS UPDATE
		UpdateBricks();
		UpdateMessage();
		UpdateCharacter();
		//alert('called');
		setTimeout(MainLoop, 20);
		//setInterval(MainLoop,1000);	
	}
	else{
		$('.Paused').show(1000);

	}
}
$(window).ready(function(){
////////////DOM ADJUST///////////
	width=$(document).width();
	height=$(document).height();
	$('.ga').focus();
});

$('body').keyup(function (event) {
		
		if(event.which == 13)
		{
			if(STARTED == false)
			{
				STARTED=true;
				initialize();
				evaluateProjections();

				MakeObjects();

				//Run the game
				MainLoop();
				
			}
			else if(PAUSED==false)
			{
				PAUSED=true;
				// $('.Paused').show(1000);
			}
			else if(PAUSED=true)
			{
				PAUSED=false;
				$('.Paused').hide(1000);
				MainLoop();
			}
		}
		if(STARTED==true && PAUSED==false)
		{
			if(event.which == 39)
			{
				rightkey=0;
			}
		}
		//39,37,17
		// else
		// 	MainLoop();

}).keydown(function(event){
	if(STARTED==true && PAUSED==false)
	{
		if(event.which==39)
		{
			rightkey=1;
			throttle=1;
		}
	}
	// else
	// 	alert(event.which);

});
//////////////////////////////