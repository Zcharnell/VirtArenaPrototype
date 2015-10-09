(function(){
	VirtArenaControl.Listeners.jquery = {
		init:function(){
			VirtArenaControl.Graphics.canvas.oncontextmenu = function(e){
				return false;
			}

			//Mouse & Input Initialization
			document.addEventListener('mousemove',function(e){
				VirtArenaControl.Mouse.x = e.clientX || e.pageX;
				VirtArenaControl.Mouse.y = e.clientY || e.pageY;
			}, false);

			if(VirtArenaControl.Mouse.x === NaN || VirtArenaControl.Mouse.y === NaN){
				mouseInCanvas = false;
			}

			$('#canvas1').hover(function(){
				VirtArenaControl.Mouse.mouseInCanvas = true;
			},function(){
				VirtArenaControl.Mouse.mouseInCanvas = false;
			});

			VirtArenaControl.Graphics.canvas.onmousedown = function(e)
			{
				VirtArenaControl.Interaction.mouseDownHandler(e);
			}

			VirtArenaControl.Graphics.canvas.onmouseup = function(e)
			{
				
			}

			$('body').on('keydown',VirtArenaControl.Interaction.keyDownHandler);
		}
	}
	
})();