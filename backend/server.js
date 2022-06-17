const express = require("express"); // express is a variable which is required to run express servers.
const dotenv = require("dotenv"); //Importing dotenv file
const connectDb = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddle");
const path = require("path");

dotenv.config(); //configuring the dotenv file to work.
connectDb();
app.use(express.json()); // for requesting the json

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

/* app.get("/api/note", (req, res) => {
  //changed it for mynotes                      //warning: For this the api/note was not fetching the notes in postman.
  res.send(notes);
}); */

app.use(notFound);
app.use(errorHandler);

//---Deployment---//

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  //for deployment purposes
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  //if not deployed, then it will use the follwoing test cases.
  app.get("/", (req, res) => {
    //here we created 2 variables of req(request) and res(response) for fetching the information using APIs'

    res.send("Api is running.."); //It's a response that is being sent
  });
}

/* app.get("/api/notes/:id", (req, res) => {
  const noteId = notes.find((n) => n.id === req.params.id); //to get particular notes by their id's, we created noteId variable which,
  // finds the requested id in the notes array and returns it

  res.send(noteId);
});
 */
const PORT = process.env.PORT || 5000; // here PORT is a variable which contains the customised PORT no. If that port is not working then 5000 is the PORT, which will automatically switch.

app.listen(PORT, console.log(`Server has started on ${PORT}`)); //console.log contains string template where PORT is given, not the value.
