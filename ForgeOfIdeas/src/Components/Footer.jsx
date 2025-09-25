import '../Styles/Components.css'
import twitch from '/twitch.png'
import github from '/github.png'
import ds from '../Assets/Forgrin.png'
import yt from '/yt.png'
import insta from '/instagram.png'
export default function Content(){
return (
    <footer className="Footer">
      <div
        className="Brand"
        onClick={() => window.open("https://github.com/Menezess42", "_blank")}
      >
        <img className="Social" src={github} alt="logo" />
        <h3>GitHub</h3>
      </div>

      <div
        className="Brand"
        onClick={() => window.open("https://www.instagram.com/dwarf_software", "_blank")}
      >
        <img className="Social" src={insta} alt="logo" />
        <h3>Insta</h3>
      </div>
      <div
        className="Brand"
        onClick={() => window.open("https://github.com/Menezess42", "_blank")}
      >
        <img className="Social" src={ds} alt="logo" />
        <h3>DwarfSoftware</h3>
      </div>

      <div
        className="Brand"
        onClick={() => window.open("https://youtube.com/@Dwarf_Software", "_blank")}
      >
        <img className="Social" src={yt} alt="logo" />
        <h3>YouTube</h3>
      </div>

      <div
        className="Brand"
        onClick={() => window.open("https://twitch.tv/dwarf_software", "_blank")}
      >
        <img className="Social" src={twitch} alt="logo" />
        <h3>Twitch</h3>
      </div>
    </footer>
);
}
