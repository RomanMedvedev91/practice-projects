import Clients from "../components/Clients";
import AddClientsModal from "../components/AddClientsModal";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientsModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}
