(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			display: block;
			text-align: center;
			font-family: Arial, sans-serif;
		} 
		#score {
			font-size: 24px;
			margin: 10px 0;
		}
		#clickButton {
			padding: 10px 20px;
			font-size: 18px;
			cursor: pointer;
		}
		</style> 
		<div>
			<div id="score">Score: 0</div>
			<button id="clickButton">Click me!</button>
		</div>
	`;

	class ClickCounterGame extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));

			this._score = 0;
			this.scoreElement = shadowRoot.querySelector("#score");
			this.button = shadowRoot.querySelector("#clickButton");

			this.button.addEventListener("click", () => {
				this._score++;
				this.updateScore();
				this.dispatchEvent(new CustomEvent("onScoreChange", { detail: { score: this._score } }));
			});

			this._props = {};
		}

		updateScore() {
			this.scoreElement.innerHTML = `Score: ${this._score}`;
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("score" in changedProperties) {
				this._score = changedProperties["score"];
				this.updateScore();
			}
		}

		resetScore() {
			this._score = 0;
			this.updateScore();
		}
	}

	customElements.define("com-sap-sample-clickcountergame", ClickCounterGame);
})();
