import Person from "./Person";

const Persons = ({ persons, removePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} removePerson={removePerson} />
      ))}
    </>
  );
};

export default Persons;
