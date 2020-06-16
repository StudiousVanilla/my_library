// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYA_KFCeGle4RKbEtyhcAoyKvLrW8J3tk",
    authDomain: "my-library-15f9e.firebaseapp.com",
    databaseURL: "https://my-library-15f9e.firebaseio.com",
    projectId: "my-library-15f9e",
    storageBucket: "my-library-15f9e.appspot.com",
    messagingSenderId: "720770389542",
    appId: "1:720770389542:web:b9ff175cd9cff6a69838e7"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.firestore();

class ScreenDisplay{
    constructor(){
    }

    contentDisplay(){
        const addBook = document.querySelector('#open-form')
        const submitBook = document.querySelector('#submit-book-form')
        const closeForm  = document.querySelector('#close-form')

        const content = document.querySelector('#container')
        const form = document.querySelector('#form-container')

        addBook.addEventListener('click',()=>{
            if(content.style.display === 'none'){
                content.style.display = 'block'
                form.style.display = 'none'
            }
            else{
                content.style.display = 'none'
                form.style.display = 'block'
            }
        })

        submitBook.addEventListener('click',()=>{
            if(content.style.display === 'none'){
                content.style.display = 'block'
                form.style.display = 'none'
            }
            else{
                content.style.display = 'none'
                form.style.display = 'block'
            }
        })
        
        closeForm.addEventListener('click',()=>{
            if(content.style.display === 'none'){
                content.style.display = 'block'
                form.style.display = 'none'
            }
            else{
                content.style.display = 'none'
                form.style.display = 'block'
            }
        })



    }

}

class Form{
    constructor(){
    }

    submitForm(){
        const form = document.querySelector('#add-book-form');
        form.addEventListener('submit',(e)=>{
            e.preventDefault()
            if(form.title.value === ""){
                alert('You must enter at least a title')
            }
            else{
                let checkedValue = 5
                if(document.querySelector('.have-read-check:checked') === null){
                    checkedValue = -1
                }
                else{
                    checkedValue = 1
                }
                database.collection('books').add({
                    title: form.title.value,
                    author: form.author.value,
                    genre: form.genre.value,
                    hasRead: checkedValue
                })
            }
            
        })
    }

}

class Library {
    constructor(){
    }

    renderBookList(doc){
        const bookList = document.querySelector('#book-list');
    
        let li = document.createElement('li');
        let title = document.createElement('p')
        let author = document.createElement('p');
        let genre = document.createElement('p');
        let hasRead = document.createElement('p');
        let bin = document.createElement('p');
    
        li.setAttribute('data-id', doc.id);
        title.textContent = doc.data().title;
        author.textContent = doc.data().author;
        genre.textContent = doc.data().genre;
        if(doc.data().hasRead < 0){
            hasRead.innerHTML = '<button type="button"><i class="fas fa-book"></i></button>'
        }
        else{
            hasRead.innerHTML = '<button type="button"><i class="fas fa-book-open"></i></button>'
        }
        bin.innerHTML = '<button type="button"><i class="fas fa-trash"></i></button>'
    
        li.appendChild(title);
        li.appendChild(author);
        li.appendChild(genre);
        li.appendChild(hasRead);
        li.appendChild(bin);
    
        bookList.appendChild(li);

        hasRead.addEventListener('click',()=>{
            console.log(doc.data().hasRead)
            database.collection('books').doc(doc.id).update({
                hasRead: (doc.data().hasRead)*-1
            })
        })

        bin.addEventListener('click',()=>{
            database.collection('books').doc(doc.id).delete();
        })


    }

    updateDatabase = function(){
        database.collection('books').orderBy('title').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            console.log(changes);
            changes.forEach(change => {

                const bookList = document.querySelector('#book-list');
                if(change.type == 'added'){
                    this.renderBookList(change.doc);
                }
                else if(change.type == 'modified'){
                    let removedBook = bookList.querySelector('[data-id='+change.doc.id+ ']');
                    bookList.removeChild(removedBook);
                    this.renderBookList(change.doc);
                }
                else if(change.type == 'removed'){
                    let removedBook = bookList.querySelector('[data-id='+change.doc.id+ ']');
                    bookList.removeChild(removedBook);
                }
                
            })
        })
    }

}

let screenDisplay = new ScreenDisplay()
screenDisplay.contentDisplay()

let library = new Library();
library.updateDatabase()

let form = new Form()
form.submitForm();
