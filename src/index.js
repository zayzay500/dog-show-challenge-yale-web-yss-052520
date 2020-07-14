document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body')
    const editForm = document.getElementById('dog-form')
    const nameInput = document.getElementsByName('name')[0]
    const breedInput = document.getElementsByName('breed')[0]
    const sexInput = document.getElementsByName('sex')[0]

    function prepFetch(id, name, breed, sex) {
        return {
            id: id,
            name: name,
            breed: breed,
            sex: sex
        }
    }

    function getInfoFromForm() {
        const id = document.getElementById('id').value
        return {
        id: id, 
        name: nameInput.value, 
        breed: breedInput.value, 
        sex: sexInput.value
        }
    }

    async function updateDogs(object) {
        const func = await fetch(`http://localhost:3000/dogs/${object.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        })
        dogsLoad()
    }

    async function submitClick() {
        editForm.addEventListener('submit', () => {
            event.preventDefault()
            const object = getInfoFromForm()
            updateDogs(object)
        })
    }

    function hiddenInput() {
        const input = document.createElement('input')
        input.name = 'id'
        input.id = 'id'
        input.type = 'hidden'
        editForm.append(input)
        return input
    }

    function loadDogToForm(dog) {
        const idInput = hiddenInput()
        nameInput.value = dog.name
        breedInput.value = dog.breed
        sexInput.value = dog.sex
        idInput.value = dog.id
    }

    function getDogInfoToEdit(editButton) {
        const row = editButton.parentNode.parentNode
        const nameValue = row.querySelector('.name').innerText
        const breed = row.querySelector('.breed').innerText
        const sex = row.querySelector('.sex').innerText
        return {
            id: row.id,
            name: nameValue,
            breed: breed,
            sex: sex
        }
    }

    function editButtonClick(editButton) {
        editButton.addEventListener('click', () => {
            const dogInfo = getDogInfoToEdit(editButton)
            loadDogToForm(dogInfo)
        })
    }

    function makeEditButton() {
        const editButton = document.createElement('button')
        editButton.innerText = 'Edit'
        editButtonClick(editButton)
        return editButton
    }

    function makeEditDataBlock() {
        const editData = document.createElement('td')
        const editButton = makeEditButton()
        editData.append(editButton)
        return editData
    }

    function dogName(dog) {
        const dogName = document.createElement('td')
        dogName.className = 'name'
        dogName.innerText = dog.name
        return dogName
    }

    function dogBreed(dog) {
        const dogBreed = document.createElement('td')
        dogBreed.className = 'breed'
        dogBreed.innerText = dog.breed
        return dogBreed
    }

    function dogSex(dog) {
        const dogSex = document.createElement('td')
        dogSex.className = 'sex'
        dogSex.innerText = dog.sex
        return dogSex
    }

    function addDog(dog) {
        const tableRow = document.createElement('tr')
        tableRow.id = dog.id
        const dogNameBlock = dogName(dog)
        const dogBreedBlock = dogBreed(dog)
        const dogSexBlock = dogSex(dog)
        const editData = makeEditDataBlock()
        tableRow.append(dogNameBlock, dogBreedBlock, dogSexBlock, editData)
        tableBody.append(tableRow)
    }

    function addDogs(dogs) {
        dogs.forEach(dog => addDog(dog))
    }

    function dogsLoad() {
        tableBody.innerHTML = ""
        fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(dogs => addDogs(dogs))
    }

    dogsLoad()
    submitClick()
})