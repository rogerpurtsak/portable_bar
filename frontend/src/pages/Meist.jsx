import BackgroundSection from "../components/BackgroundSection";

function Meist() {
    return (
        <div className="app">
            <BackgroundSection
                title="MEIE SÜND."
                text1="Läbi aastate inimeste teenindamine toob välja igas inimeses kire seda rõõmu inimeste näol veelgi näha. Otsustasime asutada enda teenuse, millega toome pudeliteviisi rõõmu teieni koos tipptasemel teenindusega."
                imageSrc="/hood_jook.jpg"
                customStyles={{
                    minHeight: '60vh',
                    color: 'black',
                    padding: '20px',
                }}
                contentStyle={{ order: 1 }}
                imageContainerStyle={{ order: 2 }}
            />
            <BackgroundSection
                title="BAARMENID."
                text1="Rõõmukoosseisu kuuluvad Gregor, kes oma kokteilidega oskab tuua igale sündmusele mängulisust ja vürtsi, ning Jaanus, kelle rõõmsameelne isiksus ja oskus mõista iga külalise soove teevad temast sündmuse särava tähe. Koos loovad nad atmosfääri, mis jääb kauaks meelde."
                imageSrc="/hood_naine.jpg"
                customStyles={{
                    minHeight: '60vh',
                    color: 'black',
                    padding: '20px',
                }}
                contentStyle={{ order: 2 }}
                imageContainerStyle={{ order: 1 }}
            />
            <BackgroundSection
                title="DJ."
                text1="Koosseisu saate ka soetada plaadikeerutaja, kes muretseb meloodia eest teie asemel. Alates hoogsatest tantsulugudest kuni õhtut lõpetavate meloodiateni – meie DJ hoolitseb selle eest, et teie sündmus jääks kauaks meelde."
                imageSrc="/hood_dj.jpg"
                customStyles={{
                    minHeight: '60vh',
                    color: 'black',
                    padding: '20px',
                }}
                contentStyle={{ order: 1 }}
                imageContainerStyle={{ order: 2 }}
            />
        </div>
    );
}

export default Meist;
