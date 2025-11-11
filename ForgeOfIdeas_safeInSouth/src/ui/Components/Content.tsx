import '../Styles/Components.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import { PopUp_forms} from  './PopUp_forms.tsx'
export default function Content(){
return (
    <main className="Content">
    <Shelf />
    <Anvil />
    <Furnace />
    </main>
);
}
