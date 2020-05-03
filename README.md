# jsRapPiano
JQuery piano plugin

Try it out here <a href="https://thibor.github.io/jsRapPiano/">demo1</a> <a href="https://thibor.github.io/RapPiano/">demo2</a>.

More information about this can be found in this blog <a href="https://www.jqueryscript.net/other/Piano-App-jsRapPiano.html">article</a>.


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
octave | int | 3 | Number first octave
octaves | int | 2 | Count octaves
waveType | string | square | Type of sound wave
envelope | object | {attack: 0.05,decay: 0.1,sustain: 0.1,release: 0.5,level: 0.5} | Customize shape of sound wave

### Events

Event | Params | Description
------ | ---- | -------
onClick | index, frequency | Index and frequency clicked key
