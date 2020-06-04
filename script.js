let library = []
let newBook = {}

// initializes the container for the library
let container = document.getElementById("container");


// constructor for book objects
function book(title, author, genre, hasRead, bin){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasRead = hasRead;
    this.bin = bin;
}

// adds a book (object) to the library array
function addToLibrary(book){
    library.push(book);
}

// returns the author for a given book in the library
let getTitle = (entry) => library[entry].title;

// returns the author for a given book in the library
let getAuthor = (entry) => library[entry].author;

// returns the author for a given book in the library
let getGenre = (entry) => library[entry].genre;

// returns the author for a given book in the library
let getbin = (entry) => library[entry].bin;

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
    else if (category === 'bin'){
        newContent = document.createTextNode(getbin(entry));
    }

    else if (category === 'hasRead'){
            if(library[entry].hasRead){
                newContent = document.createElement('span');
                newContent.innerHTML = '<i class="fas fa-book-open"></i>';
            }
            else{
                newContent = document.createElement('span');
                newContent.innerHTML = '<i class="fas fa-book"></i>';
            }
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
    newBookDiv.setAttribute('class','book-div')
    newBookDiv.setAttribute('id','book'+entry)
    // creates a <p> with category specific information
    contentCreation('title',newBookDiv);
    contentCreation('author',newBookDiv);
    contentCreation('genre',newBookDiv);
    contentCreation('hasRead',newBookDiv);
    if(checkHasRead(entry)){
        contentCreation('bin',newBookDiv);
    }
    else{
        contentCreation('bin',newBookDiv);
    };
    
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


// creates and populates a div for each book in the library
let render = function(){
    for (entry in library){
        createBookDiv(entry);
    }
}


// example of creating a new book (object)
newBook = new book("The Wind-up Bird Chronicle", "Haruki Murakami", "Surreall",false,"bin");
// example of adding a new book (object) to the library
addToLibrary(newBook);

newBook = new book("The Hobbit",'J.R.R Tolkien','Fantasy',true,'bin')
addToLibrary(newBook);



render()

// used to changed read status
let x = true;
console.log(x ^= true);

let y = () => console.log('poop');


let submitButton = document.querySelector('#submitBook')
submitButton.addEventListener("click",y)
