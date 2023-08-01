const Books = require("./books");

async function invokeAction({ action, id, title, author }) {
  switch (action) {
    case "getAll":
      const books = await Books.getAll();
      console.log(books);
      return;
    case "getById":
      const book = await Books.getById(id);
      console.log(book);
      return;
    case "create":
        const newBook = await Books.create({title, author});
        console.log(newBook);
        return;
    case "update":
        const updateBook = await Books.update(id, { title, author });
        console.log(updateBook);
        return;
    case "remove":
        const removedBook = await Books.remove(id);
        console.log(removedBook);
        return;
    default:
        console.log("Unknown action");

  }
}

console.log(process.argv);

const actionIndex = process.argv.indexOf("--action");

if (actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    const id = process.argv[actionIndex + 3];
    const title = process.argv[actionIndex + 5];
    const author = process.argv[actionIndex + 7];

    invokeAction({ action, id, title, author })
    .catch((err) => console.error(err));
}




// node app.js --action update --id 12345 --title "New Title" --author "New Author"