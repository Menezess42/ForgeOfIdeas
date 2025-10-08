import '../Styles/Components.css'
import Shelf from './Shelf.jsx'
import anvil from '../Assets/anvil.png'
import shelf from '../Assets/shellf.png'
export default function Content(){
return (
    <header className="Header">
    <div className="Brand">
    <img className="Logo-1" src={anvil} alt="logo" />
    <h1>Forge Of Ideas</h1>
    <img className="Logo-2" src={shelf} alt="logo" />
    </div>
    </header>
);
}
