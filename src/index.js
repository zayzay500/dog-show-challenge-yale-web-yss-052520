document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body')
    
    function makeEditButton() {
        const editData = document.createElement('td')
        const editButton = document.createElement('button')
        editButton.innerText = 'Edit'
        editData.append(editButton)
        return editData
    }
    
    function dogName(dog) {
        const dogName = document.createElement('td')
        dogName.innerText = dog.name
        return dogName
    }
    
    function dogBreed(dog) {
        const dogBreed = document.createElement('td')
        dogBreed.innerText = dog.breed
        return dogBreed
    }
    
    function dogSex(dog) {
        const dogSex = document.createElement('td')
        dogSex.innerText = dog.sex
        return dogSex
    }
    
    function addDog(dog) {
        const tableRow = document.createElement('tr')
        const dogName = dogName(dog)
        const dogBreed = dogBreed(dog)
        const dogSex = dogSex(dog)
        const editData = makeEditButton()
        tableRow.append(dogName, dogBreed, dogSex, editData)
        tableBody.append(tableRow)
    }
})