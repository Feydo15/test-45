import React, { useState, useEffect } from "react";
import { View } from "./components/View";
import "./App.css";

//get data from localStorage
const getDataFromLs = () => {
  const data = localStorage.getItem("details");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [details, setDetails] = useState(getDataFromLs());
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("null");

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  // handleSubmit data
  const handleSubmit = (e) => {
    e.preventDefault();
    let detail = {
      name: name,
      race: race,
      age: age,
      password: password,
      id: id,
    };
    if (details.find((details) => details.id === id)) {
      alert("Please type a valid SA ID");
    } else if (age < 18 || age > 65) {
      alert("You must be between the age of 18 and 65 to enter");
    } else if (id.length < 13 || id.length > 13) {
      alert("please enter a valid SA id");
    } else {
      setDetails([...details, detail]);
      setName("");
      setRace("");
      setAge("");
      setPassword("");
      setId("");
    }
  };

  //handleDelete data
  const deleteDetails = (id) => {
    const filteredDetails = details.filter((element) => {
      return element.id !== id;
    });
    setDetails(filteredDetails);
  };

  //handleEdit
  const editDetails = (id) => {
    const editDetails = details.find((element) => element.id === id);
    setIsEditing(true);
    console.log("first", isEditing);
    console.log(editDetails);
    setEditID(id);
    setName(editDetails.name);
    setRace(editDetails.race);
    setAge(editDetails.age);
    setPassword(editDetails.password);
    setId(editDetails.id);
  };

  // saveEdit

  const saveEdit = () => {
    const array = details.map((detail) => {
      if (detail.id === editID) {
        console.log("passed");
        console.log(name, race, age, password);
        if (age < 18 || age > 65) {
          alert("You must be between the age of 18 and 65 to enter");
        } else {
          detail.name = name;
          detail.race = race;
          detail.age = age;
          detail.password = password;
          return detail;
        }
      }
      return detail;
    });
    setDetails(array);
    setName("");
    setRace("");
    setAge("");
    setPassword("");
    setId("");
  };

  //send data to localStorage
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
  }, [details]);

  return (
    <div className="App">
      <div className="form">
        <h1>React Form</h1>
        <form
          className="form-group"
          onSubmit={isEditing ? saveEdit : handleSubmit}
        >
          <h2 className="h2" style={{ color: "blue" }}>
            {isEditing ? "Edit Information" : "Register Information"}
          </h2>
          <section>
            <h2>Name:</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
            <div style={{ display: isEditing ? "none" : "block" }}>
            <h2>SA ID:</h2>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              id="id"
              name="id"
              placeholder="id"
              required
            />
            </div>
            <h2>Race:</h2>
            <input
              value={race}
              onChange={(e) => setRace(e.target.value)}
              type="text"
              id="race"
              name="race"
              placeholder="Race"
              required
            />
            <h2>Age:</h2>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              id="age"
              name="age"
              placeholder="Age"
              required
            />
            <h2>Password:</h2>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[f])"
              required
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary btn-md">
              {isEditing ? "Save" : "Submit"}
            </button>
          </section>
        </form>
      </div>
      <div className="display">
        <h2>Captured information</h2>

        <section
          className="search"
          style={{ display: details.length > 0 ? "block" : "none" }}
        >
          <h2>Search:</h2>
          <input
            className="search"
            type="text"
            id="Search"
            placeholder="Search . . ."
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        {details.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>SA ID</th>
                    <th>Race</th>
                    <th>Age</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View
                    details={details}
                    editDetails={editDetails}
                    deleteDetails={deleteDetails}
                    search={search}
                  />
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-danger btn-md"
              onClick={() => setDetails([])}
            >
              REMOVE ALL
            </button>
          </>
        )}
        {details.length < 1 && <div>NO details are added yet</div>}
      </div>
    </div>
  );
}

export default App;
