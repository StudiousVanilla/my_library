let library = []
let newBook = {}

// initializes the container for the library
let container = document.getElementById("container");


// constructos for book objects
function book(title, author, genre, hasRead, date){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasRead = hasRead;
    this.date = date;
    this.info = function(){
        return `${title} by ${author}. Genre: ${genre}.`
    }
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
let getDate = (entry) => library[entry].date;





// creates a div to house the information for each book in the library
let createBookDiv = function(entry){
    // creates div to house book info
    let newBookDiv = document.createElement("div");
    newBookDiv.setAttribute('class','book-div')

    // creates <p>
    let newBookTitle = document.createElement("p");
    // sets the class of <p>
    newBookTitle.setAttribute('class','title')
    // creates text node with title informatio
    let newTitle = document.createTextNode(getTitle(entry));
    // populates the <p> with text node
    newBookTitle.appendChild(newTitle);
    // adds <p> to book div
    newBookDiv.appendChild(newBookTitle);

     let newBookAuthor = document.createElement("p");
     newBookAuthor.setAttribute('class','author')
     let newAuthor = document.createTextNode(getAuthor(entry));
     newBookAuthor.appendChild(newAuthor);
     newBookDiv.appendChild(newBookAuthor);







    // adds the new book's div to the end of the container
    container.appendChild(newBookDiv);
}


// creates and populates a div for each book in the library
let render = function(){
    for (entry in library){
        createBookDiv(entry);
    }
}


// example of creating a new book (object)
newBook = new book("Foundation", "Isaac Asimov","Science Fiction", true, "July 2016");
// example of adding a new book (object) to the library
addToLibrary(newBook);

newBook = new book("The Last Lion Volume 1", "William Manchester","Biography", true, "February 2017");
addToLibrary(newBook);


render()