# NewNiyum

The Game that gives you the survival training in Arvind's Kingdom

---------

# Game Plan

Global Property Time = (min(Time since Midnight = x - 00:00, Time to sunrise = 06:00 - x))

## Cellular Structure (Tiles)

### Properties

<table>
	<tr><th>Cell Property Name</th><th>Fixed / Non - Fixed</th><th>Allowed Values</th><th>Usage</th></tr>
	<tr><td>Graphic</td><td>Fixed</td><td><table><tr><th>English</th><th>Numeric</th></tr><tr><td>Hostel</td><td>0.0</td></tr><tr><td>Road</td><td>0.2</td></tr><tr><td>Garden</td><td>0.4</td></tr><tr><td>Jhadi</td><td>0.6</td></tr><tr><td>Construction</td><td>0.8</td></tr><tr><td>Forest</td><td>1.0</td></tr></table></td><td>Punishment Value Multiplication Factor</td></tr>
	<tr><td>Wifi - Hotspot</td><td>Fixed</td><td>0 - 10</td><td>Signal Strength For Distraction Value</td></tr>
	<tr><td>Darkness</td><td>Non - Fixed</td><td>0 - 1</td><td>Multiplication Factor For Points Gained</td></tr>
	<tr><td>Forbidden</td><td>Fixed</td><td></td><td></td></tr>
	<tr><td>Arvind</td><td>Non - Fixed</td><td>0 - 5</td><td>Distance from Arvind or Probability of getting Caught</td></tr>
</table>

Points scord in dt = Constant * Graphic * Darkness * Arvind * Forbidden

Punishment if caught = Loss of 1 life * Points score if points score < 50% 

### Logic

#### Arvind's Chopper's Movements

Parameters: Position (2 dim), Direction (2 dim), Speed (2 dim), Phone Call (Distraction Factor), Acceleration (2 dim)

Arvind's Chopper will move like this:

> Speed = Speed + Acceleration * dt,
> Position = Position + Speed * dt + Acceleration * dt * dt,
> Direction = 0.5 * ( 2 * Direction + Speed * dt + Acceleration * dt * dt )
