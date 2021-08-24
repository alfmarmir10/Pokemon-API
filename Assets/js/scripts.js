const API = 'https://pokeapi.co/api/v2/';

fetch(`${API}pokemon?limit=100&offset=200`)
.then(promise=>promise.json())
.then(obj=>{
    const selectPokemon = document.getElementById('pokemon-name');


    obj.results.forEach(element => {
        const option = document.createElement('option');
        option.value = element.url;
        option.text = capitalize(element.name);
        selectPokemon.add(option);
    });
    sortSelect(selectPokemon);
    selectPokemon.value = "Selecciona";
});

function fetchPokemon(element){
    if(element.value === "Selecciona"){
        return;
    } 
    fetch(element.value)
    .then(promise => promise.json())
    .then(objPokemon => {
        console.log(objPokemon);
        document.getElementsByClassName('pokemon-img')[0].src = objPokemon.sprites.front_default;
        document.getElementsByClassName('pokemon-name-title')[0].innerText = capitalize(objPokemon.name);
        const habilitiesContainer = document.getElementsByClassName('pokemon-habilities-container')[0];
        habilitiesContainer.innerHTML = '';
        objPokemon.abilities.forEach(element => {
            document.getElementById('habilidades-title').classList.remove('hidden');
            const habiltyDescription = document.createElement('p');
            habiltyDescription.innerText = element.ability.name;
            const habiltyClass = document.createAttribute('class');
            habiltyClass.value = 'habilityDescription font-weight-bold font-size-md';
            habiltyDescription.setAttributeNode(habiltyClass);
            habilitiesContainer.appendChild(habiltyDescription);
        });
    });
}

function capitalize(string){
    const lower = string.toLowerCase();
    return string.charAt(0).toUpperCase()+lower.slice(1);
}

function sortSelect(selElem, selectedOption) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    selElem.value = selectedOption;
    return;
}

function goToRepo(url){
    window.open(url, 'blank');
}

