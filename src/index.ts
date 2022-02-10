import express from "express";
import nunjucks from "nunjucks";

type Book = {
  image: string;
  name: string;
  slug: string;
  author: string;
  year: string;
};
type Books = Book[];

const myBooks: Books = [
  {
    image: "../images/thinking-fast-and-slow.jpeg",
    name: "Thinking fast and Slow",
    slug: "thinking-fast-and-Slow",
    author: "Daniel Kahneman",
    year: "2012",
  },
  {
    image: "../images/indistractable.jpeg",
    name: "Indistractable: How to Control Your Attention and Choose Your Life",
    slug: "indistractable",
    author: "Nir Eyal",
    year: "2020",
  },
  {
    image: "../images/the-lazy-genius.jpeg",
    name: "The Lazy Genius Way: Embrace What Matters, Ditch What Doesn't, and Get Stuff Done",
    slug: "the-lazy-genius-way",
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
  const findBook = myBooks.find((book) => book.slug === bookSelected);

  if (findBook) {
    response.render("details", { parameterValue: bookSelected, myBooks: myBooks });
  } else {
    response.status(404).render("not-found", { error: "Book not found" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
