import GetAllStudentsForm from "./components/getAllStudents";
import StudentAddForm from "./components/studentDetailsForm"; 
import './globals.css';

export default function Home() {
  return (
    <section>
      <StudentAddForm />
      <GetAllStudentsForm />
    </section>
  );
}
