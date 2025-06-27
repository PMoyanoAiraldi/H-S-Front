    import { useEffect } from "react";

    const LandbotWidget = () => {
    useEffect(() => {
        let myLandbot;

        function initLandbot() {
        if (myLandbot) return;

        const s = document.createElement('script');
        s.type = "module";
        s.async = true;
        s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
        s.addEventListener('load', () => {
            // @ts-ignore
            myLandbot = new window.Landbot.Livechat({
            configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3019772-P0ILIOWQLM07CMFM/index.json',
            });
        });
        document.body.appendChild(s);
        }

        window.addEventListener('mouseover', initLandbot, { once: true });
        window.addEventListener('touchstart', initLandbot, { once: true });

        return () => {
        window.removeEventListener('mouseover', initLandbot);
        window.removeEventListener('touchstart', initLandbot);
        };
    }, []);

    return null; // No renderiza nada, es solo para cargar el widget
    };

    export default LandbotWidget;
