(function(root) {
	var Hanoi = root.Hanoi = (root.Hanoi || {});

	var UI = Hanoi.UI = function(game) {
		this.game = game;
		this.firstClickedPeg = -1;
		this.secondClickedPeg = -1;
	}

	UI.prototype.bindFirstClick = function() {
		var ui = this;
		$('div.board').on('click', '.pile', function(event) {
			if (!ui.game.isWon()) {
				var $selectedPile = $(event.currentTarget);
				$selectedPile.fadeTo('fast', .5);
				ui.firstClickedPeg = parseInt($selectedPile.data("pile-num"));

				//new bindSecondClic
				$('div.board').off('click');
				ui.installSecondClick();
			}
			else {
				alert('You Won!')
			}
		});
	}

	UI.prototype.installSecondClick = function() {
		var ui = this;
		$('div.board').on('click', '.pile', function(event) {
			var $selectedPile = $(event.currentTarget);
			$selectedPile.fadeTo('fast', .5);
			ui.secondClickedPeg = parseInt($selectedPile.data("pile-num"));

			//new bindSecondClick
			ui.render();
			$('div.board').off('click');
			ui.bindFirstClick();

		});


	}
	UI.prototype.render = function() {
		if (this.game.isValidMove(this.firstClickedPeg, this.secondClickedPeg)) {
			ui = this;
			this.game.move(this.firstClickedPeg, this.secondClickedPeg);
			var $removePile = $($('.pile')[this.firstClickedPeg].children);
			var $addPile = $($('.pile')[this.secondClickedPeg].children);
			var diskSize = "";
			$removePile.each ( function(index, div) {
				if ($(div)[0].className !== "" && diskSize === "") {
					diskSize = $(div)[0].className;
					$(div)[0].className = "";
				}
			});
			console.log(diskSize);
			var varPos = 3;
			$addPile.each ( function(index, div) {
				if ($(div)[0].className !== "" && varPos > index) {
					varPos = index;
				}
			});
			$addPile[varPos-1].className = diskSize;




		}
		$('.pile').each( function(index, pile) {
			$pile = $(pile);
			$pile.fadeTo('fast', 1);
		});

	}


})(this);

$(document).ready( function() {
	game = new Hanoi.Game();
	ui = new Hanoi.UI(game);
	ui.bindFirstClick();
	// ui.bindAndRender();
});