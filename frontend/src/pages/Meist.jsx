import BackgroundSection from "../components/BackgroundSection";

function Meist() {
    return (
        <div className="app">
            <BackgroundSection
                title="MEIE SÜND."
                text1="Läbi aastate inimeste teenindamine toob välja igas inimeses kire seda rõõmu inimeste näol veelgi näha. Otsustasime asutada enda teenuse, millega toome pudeliteviisi rõõmu teieni koos tipptasemel teenindusega."
                imageSrc="public/hood_jook.jpg"
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
                text1="Antud rõõmukoosseis sisaldab Gregorit lorem ipsum lorem ipsum lorem ipsum lorem ipsum ja Jaanust lorem ipsum lorem ipsum lorem ipsum lorem ipsum."
                imageSrc="public/hood_naine.jpg"
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
                text1="Kooseisu saate ka soetada plaadikeerutaja, kes muretseb meloodia eest teie asemel lorem ipsum lorem ipsum lorem ipsum lorem ipsum."
                imageSrc="public/hood_dj.jpg"
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
