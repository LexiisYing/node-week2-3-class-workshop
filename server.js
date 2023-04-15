const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "12",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/", (req, res) => {
    res.json("hello");
})

app.get("/albums", function (req, res) {
  res.json(albumsData);
});

app.get("/albums/:albumId", function (req, res) {
    const albumToReturn = albumsData.find((album) => album.albumId === req.params.albumId);
    if (albumToReturn) {
        res.json({albumToReturn})
    } else {
        res.json(`No albums found with id: ${req.params.albumId}`)
    }
});


// Create a new album.
app.post("/albums", function (req, res) {
  console.log("POST /albums route");
  console.log(req.body);

  const newAlbum = req.body;
  albumsData.push(newAlbum);

  res.status(201).json({ message: "Album added successfully" });

});

// Update existing album by id.
app.put("/albums/:albumId", function (req, res) {
  const updateAlbum = { ...req.body, id: req.params.albumId };
  const albumIndex = albumsData.findIndex(
    (album) => album.albumId === req.params.albumId
  );

  if (albumIndex !== -1) {
    albumsData.splice(albumIndex, 1, updateAlbum);
    console.log(albumsData, "< updated?");
    res.status(200).send({ success: true });
  } else {
    res.status(404).send("Album not found");
  }
});


// Define a route to handle DELETE requests
app.delete('/albums/:albumId', function(req, res) {
  const albumId = req.params.albumId;
  console.log(albumId);

  const itemIndex = albumsData.findIndex(album => {
    console.log("comparing",album.albumId, albumId)
    return album.albumId === albumId 
    
  });
  console.log(itemIndex);
  if (itemIndex !== -1) {
    albumsData.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
