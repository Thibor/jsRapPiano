$(window).resize(function () {
	$('.rapPiano').each(function () {
		this.Render();
	});
});

(function ($) {
	$.fn.jsRapPiano = function (options) {

		return this.each(function () {
			this.opt = $.extend({
				octave: 3,
				octaves: 2,
				waveType: 'square',
				envelope: {
					attack: 0.05,
					decay: 0.1,
					sustain: 0.1,
					release: 0.5,
					level: 0.5
				},
				onClick: null
			}, options);
			let base = this;
			let AudioContext = window.AudioContext || window.webkitAudioContext;
			this.audioContext = new AudioContext();
			this.oscillator = this.audioContext.createOscillator();
			this.gainMain = this.audioContext.createGain();
			this.gainMain.gain.value = 1;
			this.gainMain.connect(this.audioContext.destination);
			this.oscillator.start(0);
			this.oscillator.type = this.opt.waveType;

			this.Render = function () {
				$(this).empty();
				let w = $(this).width();
				w = w / (this.opt.octaves * 7);
				$(this).addClass('rapPiano').height(w * 5);
				let i = 12 * (this.opt.octave + 1);
				for (let o = 0; o < this.opt.octaves; o++)
					for (let x = 0; x < 7; x++) {
						let k = $('<div>').addClass('divKey').css({ width: w }).appendTo(this);
						$('<div>').addClass('major').prop('index', i++).appendTo(k);
						if ((x % 7 == 2) || (x % 7 == 6)) continue;
						$('<div>').addClass('minor').prop('index', i++).appendTo(k);
					}
				$('.major,.minor', this).bind({
					mousedown: function (e) {
						let i = $(this).prop('index');
						let f = 440 * Math.pow(2, (i - 69) / 12);
						base.audioContext.resume();
						base.PlaySound(f);
						if (base.opt.onClick)
							base.opt.onClick.call(base, i, f);
					}
				});
			}

			this.PlaySound = function (frequency) {
				let t = this.audioContext.currentTime;
				gainNode = this.audioContext.createGain();
				gainNode.connect(this.gainMain);
				this.oscillator.connect(gainNode);
				gainNode.gain.setValueAtTime(0, t);
				this.oscillator.frequency.value = frequency;
				t += this.opt.envelope.attack;
				gainNode.gain.linearRampToValueAtTime(1, t);
				t += this.opt.envelope.decay;
				gainNode.gain.linearRampToValueAtTime(this.opt.envelope.level, t);
				t += this.opt.envelope.sustain;
				gainNode.gain.linearRampToValueAtTime(this.opt.envelope.level, t);
				t += this.opt.envelope.release;
				gainNode.gain.linearRampToValueAtTime(0, t);
			}

			this.Render();

		})

	}
})(jQuery);
