const Header = (props) => {
    return (
     <h1>{props.course.name}</h1>
    )
  };
  
  const Part = (props) => {
    return (
      <p>
      {props.part} {props.exercises}
      </p>
    )
  };
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part => <Part key={part.id} part={part.name} exercises={part.exercises} />
  ))}
      </div>
    )
  };
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <h3>total of {total} exercises </h3>
    )
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>  
    )
  };

  export default Course;