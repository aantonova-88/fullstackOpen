import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const duplicatedPerson = persons.find(
    (el) =>
      el.name &&
      newName &&
      el.name.toLowerCase() === newName.trim().toLowerCase()
  );
  useEffect(() => {
    personService.getAll().then((respPersons) => setPersons(respPersons));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const personsToShow = !searchName
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      );

  const addPerson = (e) => {
    e.preventDefault();
    if (duplicatedPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((el) => el.id === duplicatedPerson.id);
        const editedPerson = { ...person, number: newNumber };
        personService
          .editNumber(duplicatedPerson.id, editedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicatedPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Number of ${duplicatedPerson.name} was changed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(() => {
            setIsError(true);
            setMessage(
              `Information of ${duplicatedPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((el) => el.id !== duplicatedPerson.id));
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.createPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          return personService.getAll();
        })
        .then((respPersons) => {
          setPersons(respPersons);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={isError} />
      <Filter value={searchName} onChange={handleSearchNameChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
