////////////////////////////
//ABSTRACTION ONLY PART
////////////////////////////
//==================================
//GLOBALS
//==================================
//----------GAME STATE------
var STARTED=false, PAUSED=false;
//---------CHARACTER------
//CONVENTION: 
// Position of Character,
// frame_no 0 (standing) 1 2 3 4 (for running) 5 for jumping
// parity, is direction of movement (1 is right movement, 0 is left)
// footprint, the distance from x, which if in touch is considered to be in contact
var footprint=30, x=footprint,y=0,frame_no=0,parity=1,power=[{'Partha':0,'Shiv':0}];

//---------WORLD-----
//CONVENTION: Capitals for the world coordinates
// Camera Position (X) and (V) is velocity in X
var X=0,Vx=1,Y=0,Vy=0;
var Blen=300,Bheight=10,Bricks=[{'x':0,'y':500,'color':'Yellow'},{'x':Blen,'y':500,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':500,'wobble':0,'color':'Yellow'}];
var Message="Use the arrow keys to move around <br/> Space to Jump <br/> <br/>";

// Projection wrt Camera
var proj=[{'x':x,'y':y}];
var projBricks=[{'x':0,'y':500,'color':'Yellow'},{'x':Blen,'y':500,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':500,'wobble':0,'color':'Yellow'}];;
//TODO: Correct the projBricks to automaticlaly update from Bricks

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
	proj.x=x-X;
	proj.y=y-Y;
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
//----------------UPDATE MESSAGE---------
function updateMessage(){
//CONVERT THIS TO A SMALLER WINDOW so that you change it when need be, not unnecessarily
	if(X>0 && X<800)
		Message="Use the arrow keys to move around <br/> Space to Jump <br/> <br/>";
		//Message=X;
		//Message=Now();
	else if (X>800 && X<1600)
		Message="Now try using new skills!";
}
//---------------GAME'S MAIN LOOP---------
function abstractionLoop(deltaT){
					//Time elapsed for accurate animation
	deltaT=deltaT/100;
	X=X+(Vx*deltaT);		//For moving the World
	Y=Y+(Vy*deltaT);

	if(X>1000)
		PAUSED=true;

	updateMessage();
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

function UpdateBricks(){
	for(num=0;num<Bricks.length;num++)
	{
		$('#'+num).css('left',projBricks[num].x).css('top',projBricks[num].y).css('background-color',projBricks[num].color).css('width',Blen).css('height',Bheight);
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

function MainLoop(){
	if(PAUSED==false)
	{	
		NewTime=jQuery.now();
		if(LastTime==-1)
			LastTime=NewTime;

		abstractionLoop(NewTime-LastTime);
		UpdateBricks();
		UpdateMessage();
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
		// else
		// 	MainLoop();

});
//////////////////////////////