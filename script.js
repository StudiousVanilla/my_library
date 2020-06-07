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

let library = [] 
let newBook = {}
let docIds = []
const database = firebase.firestore();

// getting data

let updateDatabase = function(){
    database.collection('books').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            library.push(doc.data())
            docIds.push(doc.id);
            render();
        })
    })
}
updateDatabase();





// initializes the container for the library
let container = document.getElementById("container");


// constructor for book objects
function book(title, author, genre, hasRead){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasRead = hasRead;
}

// adds a book (object) to the library array
function addToLibrary(book){
    library.push(book);
}

// returns the author for a given book in the library
let getTitle = (entry) => library[entry].title;

// returns the author for a given book in the library
let getAuthor = (entry) => library[entry].author;

// returns the genre for a given book in the library
let getGenre = (entry) => library[entry].genre;

// returns true if book has been read
let checkHasRead = (entry) => library[entry].hasRead;

// creates <p> for each relevant piece of information per book
let contentCreation = function(category, container){
    // initialse newContent which will be used later
    let newContent = "";
     // creates <p>
    let newBookContent = document.createElement("p");
    // sets the class of <p>
    newBookContent.setAttribute('class',category)
    // creates text node with title informatio
    if(category === 'title'){
        newContent = document.createTextNode(getTitle(entry));
    }
    else if (category === 'author'){
        newContent = document.createTextNode(getAuthor(entry));
    }
    else if (category === 'genre'){
        newContent = document.createTextNode(getGenre(entry));
    }
    else if (category === 'hasRead'){
            if(library[entry].hasRead){
                newContent = document.createElement('button');
                newContent.setAttribute('id','readButton'+entry)
                newContent.setAttribute('class','readButton')
                newContent.innerHTML = '<i id="read" class="fas fa-book-open"></i>';
            }
            else{
                newContent = document.createElement('button');
                newContent.setAttribute('id','readButton'+entry)
                newContent.setAttribute('class','readButton')
                newContent.innerHTML = '<i id = "not-read" class="fas fa-book"></i>';
            }
    }
    else if (category === 'bin'){
        newContent = document.createElement('button');
        newContent.setAttribute('id','deleteButton'+entry)
        newContent.setAttribute('class','deleteButton')
            newContent.innerHTML = '<i id="bin" class="fas fa-trash-alt"></i>';
    }
    
    // populates the <p> with text node
    newBookContent.appendChild(newContent);
    // adds <p> to a container (the div for the book)
    container.appendChild(newBookContent);
}


// creates a div to house the information for each book in the library
let createBookDiv = function(entry){
    // creates div to house book info
    let newBookDiv = document.createElement("div");
    newBookDiv.setAttribute('class','book-div');
    newBookDiv.setAttribute('id','book'+entry);
    // creates a <p> with category specific information
    contentCreation('title',newBookDiv);
    contentCreation('author',newBookDiv);
    contentCreation('genre',newBookDiv);
    contentCreation('hasRead',newBookDiv);
    contentCreation('bin',newBookDiv);
    
    // adds the first book in the Library to the HTML doc 
    if(parseInt(entry) === 0){
        container.appendChild(newBookDiv);
    }
    // adds each subsequnet book so that the most recent is at the top
    else{
        let previousBook = document.getElementById('book'+parseInt(entry-1));
        container.insertBefore(newBookDiv, previousBook);
    }

}

// parent functinon to house logic for changing read status
const readButtonSetUp = function(){
    // changes 'hasRead' value of book object when button is clicked
    // (uses number at the end of id to find index of book object in library)
    const changeReadStatus = function(button){
        button.addEventListener('click',function(){
            let libraryIndex = parseInt(button.id.slice(10,))
            library[libraryIndex].hasRead ^= true;
            database.collection('books').doc(docIds[libraryIndex]).update({hasRead: library[libraryIndex].hasRead})
            
            // Re-renders page with change
            render();
        }) 
    }
    
    // captures each read status button
    let readButtons = document.querySelectorAll('.readButton');
    readButtons.forEach(function(readButton){
        changeReadStatus(readButton);
    });
    
}

// parent functinon to house logic for deleteing books
const deleteButtonSetUp = function(){

    const deleteBook = function(button){
        button.addEventListener('click',function(){
            // finds books position in library
            let libraryIndex = parseInt(button.id.slice(12,))
            // removes book from library
            database.collection('books').doc(docIds[libraryIndex]).delete();
            library.splice(libraryIndex,1);
             // Re-renders page with change
            render();

        }) 
    }

    // captures each delete button
    let deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(function(deleteButton){
        deleteBook(deleteButton);
    });
}

// creates and populates a div for each book in the library
let render = function(){
    // clears the books already being shown so that their are no dupliactes
    container.innerHTML = "";
    for (entry in library){
        createBookDiv(entry);
        
    }
    // call function that triggers changing rwad status
    readButtonSetUp()
    deleteButtonSetUp()
}

let addBook = document.forms["add-book"];
addBook.addEventListener('submit', function(e){
    e.preventDefault();
    let titleValue = addBook.querySelector('input[id="inputTitle"]').value;
    let authorValue = addBook.querySelector('input[id="inputAuthor"]').value;
    let genreValue = addBook.querySelector('input[id="inputGenre"]').value;
    let readValue = addBook.querySelector('input[id="inputRead"]').checked;
    // creates a new book (object) with the values from the form
    newBook = new book(titleValue,authorValue,genreValue,readValue);
    // the new book (object) to the library
    addToLibrary(newBook);
    database.collection('books').add({
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        hasRead: newBook.hasRead
    });
   render();
})

