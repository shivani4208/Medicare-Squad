const search = document.getElementById('medical-search');
const list = document.getElementById('medical-list');
const locsearch = document.getElementById('location-search');
const loclist = document.getElementById('location-list');

const searchList = (searchText) => {
    fetch('./jsonData/symptoms.json')
        .then(res => res.json())
        .then(data => {
            let matches = data.filter(info => {
                const regex = new RegExp(`^${searchText}`, 'gi');
                return info.name.match(regex) || info.shortname.match(regex);
            })
            if(searchText.length===0){
                matches = [];
                list.innerHTML=' ';
            }
            output(matches);

        })
    const output = (matches) => {
        if (matches.length > 0) {
            const res = matches.map(match => `
            <a href="/patientPage/bookAppoint?location=${locsearch.value}&field=${match.name}" class="text-decoration-none text-dark card px-2 py-1">
            <h6 class="fw-normal">${match.name}</h6>
            </a>
            `).join('');
            list.innerHTML = res;
        }
    }
}
const searchLocList = (searchText) => {
    fetch('./jsonData/location.json')
        .then(res => res.json())
        .then(data => {
            let matches = data.filter(info => {
                const regex = new RegExp(`^${searchText}`, 'gi');
                return info.name.match(regex) || info.shortname.match(regex);
            })
            if(searchText.length===0){
                matches = [];
                loclist.innerHTML=' ';
            }
            output(matches);

        })
    const output = (matches) => {
        if (matches.length > 0) {
            const res = matches.map(match => `
            <a style="cursor:pointer;" class="location text-decoration-none text-dark card px-2 py-1">
            <h6 class="fw-normal">${match.name}</h6>
            </a>
            `).join('');
            loclist.innerHTML = res;
            const location = document.querySelector('.location')
            location.addEventListener('click',(e)=>{
                console.log(e.target)
                console.log(e)
                console.log(e.target.textContent)
                   locsearch.value=e.target.textContent;
                   loclist.innerHTML='';
            })
            search.addEventListener('input', () => searchList(search.value));
        }
    }
}

locsearch.addEventListener('input', () => searchLocList(locsearch.value));