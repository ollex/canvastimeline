# canvastimeline
this project aims to see if canvas is a viable option for a scheduler / timeline widget versus "normal" DOM elements.
In canvas' immediate mode almost everything needs to be scheduled in the right order and calculated on a much lower level then when relying on the DOM.
It has advantages though, too and even in DOM based scheduler libraries part of the layout is usually absolutely positioned and pre/-recalculated to make perfect sense.
Thus, the effort to build a fully fledged "thing" with canvas in the end might not be much different, but maybe will keep restricted to a certain amount of features. 
As I am not working a lot of time on this the plans I have for the moment are to add some more date "leap" methods (years not only months) and later on the option to view not only months, but also week(s) and maybe I will test year as view as well and see how that performs. One thing I will probably not add directly to the calendar class is buttons and controls, this should keep completely flexible and the class will provide the functions you can call whenever someone uses your user interface surrounding instances of this canvastimeline.
![alt text](./src/images/screenshot.png)
