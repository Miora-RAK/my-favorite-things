import express from "express";
import nunjucks from "nunjucks";

type Book = {
  name: string;
  author: string;
  year: string;
};
type Books = Book[];
//Thinking fast and Slow
//Indistractable: How to Control Your Attention and Choose Your Life
//The Lazy Genius Way: Embrace What Matters, Ditch What Doesn't, and Get Stuff Done

const myBooks: Books = [
  { name: "Book 1", author: "Daniel Kahneman", year: "2012" },
  { name: "Book 2", author: "Nir Eyal", year: "2020" },
  {
    name: "Book 3",
    author: "Kendra Adachi",
    year: "2020",
  },
];

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home", { myBooks });
});

app.get("/:bookName", (request, response) => {
  const routeParameters = request.params;
  const bookSelected = routeParameters.bookName;
  const findBook = myBooks.find((book) => book.name === bookSelected);

  if (findBook) {
    response.render("details", { parameterValue: bookSelected, myBooks: myBooks });
  } else {
    response.status(404).render("not-found", { error: "Book not found" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
