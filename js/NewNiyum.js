////////////////////////////
//ABSTRACTION ONLY PART
////////////////////////////
//==================================
//GLOBALS
//==================================
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
var X=0,Vx=0,Y=0,Vy=0;
var Blen=100,Bheight=10,Bricks=[{'x':0,'y':500,'color':'Yellow'},{'x':Blen,'y':500,'wobble':0,'color':'Black'},{'x':Blen*2,'y':500,'wobble':0,'color':'Yellow'},{'x':Blen*3,'y':500,'wobble':0,'color':'Yellow'}];

// Projection wrt Camera
var proj=[{'x':x,'y':y},{'Bricks':[]}];



//===================================
//FUNCTIONS
//===================================
//----------INIALIAZE------------------
//To initialize all conditions that require a loop etc to execute
function initialize(){
	var i;
	for(i=0;i<Bricks.len;i++)
	{
		proj.Bricks.append({'x':Bricks[i].Blen,'y':Bricks[i].y,'wobble':Bricks[i].wobble,'color':Bricks[i].color});	
	}	
}

//---------------GAMES MAIN LOOP---------


//-------------EVALUATE PROJECTION--------
//Almost like a pre-process for render
function evaluateProjections(){
	proj.x=x-X;
	proj.y=y-Y;
	var i;
	for(i=0;i<Bricks.len;i++)
	{
		proj.Bricks[i].x=Bricks[i].x-X;
		proj.Bricks[i].y=Bricks[i].y-Y;
	}
}
////////////////////////////

//////////////////////////////
//DOM BINDING
//////////////////////////////
// UpdateFromAbstraction(){
// ;
// }

function MakeObjects(){
	var num;
	for(num=0;num<Bricks.length;num++)
	{
		$('.ga').prepend('<div class="Brick" id=' + num + '> </div>');
		$('#'+num).css('left',Bricks[num].x).css('top',Bricks[num].y).css('background-color',Bricks[num].color).css('width',Blen).css('height',Bheight);
	}
}

$(document).ready(function(){
////////////DOM ADJUST///////////
	width=$(document).width();
	height=$(document).height();

	MakeObjects();
});
//////////////////////////////