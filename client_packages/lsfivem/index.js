let auth_data, voice_data, voice_ssl;

mp.events.add('guiReady', () => {

    auth_data = mp.browsers.new('package://lsfivem/index.html');

    forms_data = mp.browsers.new('package://lsfivem/forms.html');

    voice_data = mp.browsers.new('https://lsfivem.com/voice/vc_tellarion.html');

    mp.events.add('browserDomReady', (browser) => {
      if (browser == auth_data) {
        mp.nametags.enabled = false;
        require('lsfivem/events.js')(auth_data, forms_data, voice_data);
        mp.discord.update("Los Santos Role Play", "lsfivem.com");
        mp.gui.chat.safeMode = false;
        mp.events.callRemote("playerJoined");
      }
    });
});
