'use strict';

const RESCUES = [
  {
    id:'wifi', category:'internet', icon:'🌐', title:'Wi‑Fi connected but no internet',
    keywords:['wifi','wi-fi','connected no internet','no internet','websites not opening','router','network','internet not working'],
    summary:'The device may be connected to the Wi‑Fi network while the router, internet service, DNS, or the device itself is having trouble reaching the internet.',
    questions:[
      ['Can another phone or computer use the same Wi‑Fi successfully?','otherWorks'],
      ['Does your device show that Wi‑Fi is connected?','showsConnected'],
      ['Have you tried more than one website or app?','multiTest']
    ],
    steps:[
      'Turn Wi‑Fi off, wait about 10 seconds, then turn it back on.',
      'Restart the affected phone or computer.',
      'If all devices are affected, restart the router/modem safely: switch it off, wait about 30 seconds, then switch it back on and allow it to reconnect.',
      'If only one device is affected, forget the Wi‑Fi network and reconnect using the correct password.',
      'Check that Airplane mode is off and the device date and time are correct.',
      'If every device still has no internet, check for an internet service outage or contact the service provider.'
    ],
    adapt(a){const x=[]; if(a.otherWorks==='Yes')x.push('Because another device works on the same Wi‑Fi, focus on the affected device rather than resetting the router first.'); if(a.otherWorks==='No')x.push('Because other devices are also affected, the router/modem or internet service is more likely to be the source.'); return x;},
    severity:'LOW'
  },
  {
    id:'mobiledata', category:'internet', icon:'📶', title:'Mobile data is on but internet is not working',
    keywords:['mobile data','data not working','4g','5g','lte','sim internet','cellular data'],
    summary:'The phone may have weak signal, exhausted data, a SIM/network issue, or a setting preventing mobile data access.',
    questions:[['Do you see a mobile signal and 4G/5G/LTE symbol?','signal'],['Do calls or SMS still work?','calls'],['Could your data bundle or plan be finished?','bundle']],
    steps:['Turn mobile data off and on again.','Turn Airplane mode on for about 10 seconds, then off.','Restart the phone.','Check whether your data bundle/plan is active and whether the correct SIM is selected for mobile data.','If you use two SIMs, confirm the intended SIM is the one assigned to mobile data.','If the signal is weak or absent, move to an area with better coverage or contact your mobile network provider.'], severity:'LOW'
  },
  {
    id:'hotspot', category:'internet', icon:'📡', title:'Hotspot is on but another device cannot connect',
    keywords:['hotspot','tethering','personal hotspot','share internet'],
    summary:'Hotspot problems often come from the wrong password, mobile data being unavailable, device limits, or temporary network settings.',
    questions:[['Is mobile data working on the phone sharing the hotspot?','hostData'],['Can the other device see the hotspot name?','visible'],['Have you recently changed the hotspot password?','changed']],
    steps:['Confirm mobile data works on the phone sharing the hotspot.','Turn hotspot off, wait 10 seconds, and turn it back on.','On the receiving device, forget the hotspot network and reconnect using the current password.','Check whether the hotspot has reached its connected-device limit.','Restart both devices if the connection still fails.'], severity:'LOW'
  },
  {
    id:'slow', category:'computer', icon:'🐢', title:'Computer is very slow or freezing',
    keywords:['slow computer','computer slow','laptop slow','freezing','lagging','takes long','slow startup','hangs','hanging'],
    summary:'Common causes include too many startup/background apps, low storage, updates, malware, overheating, or hardware that is struggling with the workload.',
    questions:[['Is the computer slow immediately after startup?','startup'],['Is storage almost full?','storage'],['Does Task Manager show very high CPU, memory, or disk use?','resources']],
    steps:['Restart the computer and reopen only the programs you need.','Close unused programs and browser tabs.','Open Task Manager (Ctrl + Shift + Esc) and look for apps using unusually high CPU, memory, or disk.','Check free storage space and remove or move only files you are sure you do not need.','Disable unnecessary startup apps.','Install legitimate system and driver updates, then run trusted security software.'], severity:'LOW'
  },
  {
    id:'overheatpc', category:'computer', icon:'🌡️', title:'Computer gets very hot, fan is loud, or it shuts down',
    keywords:['computer hot','laptop hot','overheating laptop','fan loud','fan noise','shuts down from heat','thermal'],
    summary:'Heat can come from blocked airflow, dust, heavy workloads, a failing fan, or battery/hardware problems. Repeated heat-related shutdowns should not be ignored.',
    questions:[['Does it shut down or restart by itself?','shutdown'],['Are the air vents blocked by a bed, cushion or soft surface?','blocked'],['Do you notice a burning smell, swelling, smoke or sparks?','danger']],
    steps:['Stop heavy use and let the computer cool on a hard, flat surface.','Make sure vents are not blocked and avoid using the laptop on bedding or cushions.','Close demanding apps and check Task Manager for unusually high resource use.','If the fan does not spin, makes grinding sounds, or the device repeatedly shuts down, stop relying on software fixes and arrange a hardware inspection.'],
    adapt(a){return a.danger==='Yes'?['Stop using the computer now. Disconnect power only if it is safe. Do not open or continue charging it.']:[];}, severity:'CAUTION', dangerAnswer:'danger'
  },
  {
    id:'blackboot', category:'computer', icon:'⚫', title:'Computer powers on but Windows does not load normally',
    keywords:['black screen','blue screen','won\'t boot','not booting','windows not loading','startup repair','boot loop'],
    summary:'Startup failures may involve display output, Windows files, updates, drivers, storage, or hardware. Protect important data before destructive repair steps.',
    questions:[['Do you see the manufacturer logo when you power on?','logo'],['Do you hear normal fan or startup sounds?','sound'],['Did this begin after an update, new driver, or sudden power loss?','change']],
    steps:['Disconnect non-essential USB devices, then restart once.','If you can reach Windows Recovery or Startup Repair, use the built-in repair options before reinstalling Windows.','If the screen is black but the computer seems to be running, check brightness and an external display connection if one is available.','Avoid formatting or reinstalling if important files are not backed up.','If there are unusual clicking sounds from storage or repeated hardware errors, seek qualified help.'], severity:'CAUTION'
  },
  {
    id:'battery', category:'phone', icon:'🔋', title:'Phone battery drains quickly or the phone gets hot',
    keywords:['battery drains','battery drain','phone hot','phone heating','overheating phone','battery life','drains fast'],
    summary:'High screen brightness, background apps, poor signal, hotspot/GPS use, heavy workloads, charging habits, or battery wear can increase drain and heat.',
    questions:[['Does the phone get hot even when you are not using it?','idleHot'],['Did the problem start after installing or updating an app?','newApp'],['Is the battery swollen or lifting the back cover/screen?','swollen']],
    steps:['Restart the phone and close heavy apps.','Check battery usage in Settings to see which apps are using unusually high power.','Reduce brightness and turn off unused hotspot, Bluetooth, GPS or other power-heavy features.','Keep the phone cool and avoid heavy use while charging.','Use the original or a trusted compatible charger recommended for the device.'],
    adapt(a){return a.swollen==='Yes'?['Stop charging and using the phone. A swollen battery is a physical safety issue and needs qualified service.']:[];}, severity:'LOW', dangerAnswer:'swollen'
  },
  {
    id:'charging', category:'phone', icon:'🔌', title:'Phone is not charging or charges very slowly',
    keywords:['not charging','slow charging','charger not working','charging port','phone won\'t charge'],
    summary:'Charging problems can come from the power source, cable, adapter, port debris/damage, temperature, software, or the battery itself.',
    questions:[['Does a different known-good compatible cable/adapter work?','otherCharger'],['Is the charging port visibly damaged or loose?','portDamage'],['Is the phone extremely hot, swollen, or giving a battery warning?','danger']],
    steps:['Try a known-good compatible wall outlet, cable, and power adapter.','Restart the phone.','Inspect the charging port with good light. Do not push metal objects into the port.','Remove a thick case if the phone is overheating while charging and let it cool.','If charging works only when the cable is held at an angle, the port may need repair.'],
    adapt(a){return a.danger==='Yes'?['Stop charging the phone and seek qualified service because heat/swelling can indicate a battery safety problem.']:[];}, severity:'LOW', dangerAnswer:'danger'
  },
  {
    id:'phonestorage', category:'files', icon:'🧹', title:'Phone storage is full',
    keywords:['phone storage full','storage full','not enough storage','low storage phone','space full'],
    summary:'A full phone can become slow, stop downloading apps, fail to take photos, or struggle to update.',
    questions:[['Are photos/videos using most of the storage?','media'],['Are there apps you no longer use?','unusedApps'],['Are important files backed up anywhere?','backup']],
    steps:['Open Settings and review Storage to see what is using the most space.','Delete downloads and duplicate/unneeded files you recognize.','Uninstall apps you no longer use.','Move or back up photos/videos before deleting them from the phone.','Avoid “cleaner” apps from unknown sources that promise miracle speed boosts.'], severity:'LOW'
  },
  {
    id:'appcrash', category:'apps', icon:'📱', title:'App keeps crashing, freezing, or refusing to open',
    keywords:['app crashing','app not opening','app freezes','program crashes','software not opening','app stopped'],
    summary:'The app may be stuck, outdated, short on storage/memory, or affected by corrupted app data or a recent update.',
    questions:[['Does only one app have the problem?','oneApp'],['Is the device low on storage?','lowSpace'],['Did the problem begin after an app or system update?','afterUpdate']],
    steps:['Save any open work, close the app completely, and reopen it.','Restart the device.','Check for an official app update and system update.','Check free storage space.','If the app offers a repair/reset option, use that before reinstalling.','Back up app data or documents before uninstalling/reinstalling if the app stores important local information.'], severity:'LOW'
  },
  {
    id:'update', category:'apps', icon:'⬆️', title:'Windows update will not install',
    keywords:['windows update','update failed','update error','cannot update windows','install update'],
    summary:'Update errors can come from low storage, pending restarts, network problems, or Windows Update components that need troubleshooting.',
    questions:[['Is there an error code on screen?','code'],['Is the computer low on storage space?','space'],['Have you restarted since the update first failed?','restart']],
    steps:['Write down the exact error code if one appears.','Restart the computer, then check for updates again.','Make sure the internet connection is stable and enough storage space is available.','On Windows 11, open Settings → System → Troubleshoot → Other troubleshooters and run the Windows Update troubleshooter.','After the troubleshooter finishes, restart and check for updates again.'], severity:'LOW'
  },
  {
    id:'bluetooth', category:'peripheral', icon:'🟦', title:'Bluetooth will not pair, connect, or stay connected',
    keywords:['bluetooth','pairing','won\'t pair','not pairing','bluetooth disappeared','bluetooth disconnecting'],
    summary:'Bluetooth issues often involve pairing state, power saving, outdated drivers, the wrong audio/output device, or temporary radio problems.',
    questions:[['Is Bluetooth visible and switched on?','visible'],['Has this device paired successfully before?','pairedBefore'],['Is the problem a connection issue, or is it connected with no sound?','noSound']],
    steps:['Turn Bluetooth off, wait about 10 seconds, then turn it back on.','Make sure the accessory is charged and in pairing mode.','Remove/forget the device, then pair it again.','Restart both devices.','On Windows, run the Bluetooth troubleshooter and install legitimate Windows/driver updates.','If it is connected but has no sound, confirm the Bluetooth device is selected as the audio output.'], severity:'LOW'
  },
  {
    id:'usb', category:'peripheral', icon:'🔗', title:'USB device is not recognized',
    keywords:['usb not recognized','flash disk not detected','flash drive not detected','usb device','pendrive not showing','external drive not detected'],
    summary:'The USB device, port, cable, driver, or storage itself may be having a problem. Important data requires extra caution.',
    questions:[['Does the USB device work in another port or another computer?','otherPort'],['Does Windows show an error or warning in Device Manager?','deviceManager'],['Does the USB contain important data that is not backed up?','important']],
    steps:['Disconnect the USB device safely, restart the computer, then reconnect it.','Try another known-good USB port.','If a cable is involved, try a known-good compatible cable.','Check Device Manager for an error indicator and note the error code.','Do not format a drive just because Windows asks you to if it contains important files you need to recover.'], severity:'CAUTION'
  },
  {
    id:'keyboardmouse', category:'peripheral', icon:'⌨️', title:'Keyboard or mouse is not responding',
    keywords:['keyboard not working','mouse not working','touchpad not working','keys not working','cursor not moving'],
    summary:'The device may be disconnected, out of battery, paired incorrectly, disabled, or affected by a port/driver problem.',
    questions:[['Is it wired, wireless USB, or Bluetooth?','type'],['Does it work after reconnecting or using another port?','otherPort'],['Is only one key/button affected, or the entire device?','scope']],
    steps:['Reconnect the device and restart the computer.','For wireless devices, replace/recharge the battery and reconnect the USB receiver if used.','Try another compatible port.','For Bluetooth devices, remove and re-pair them.','If only certain keys/buttons fail after a spill or physical damage, stop relying on software troubleshooting and arrange repair/replacement.'], severity:'LOW'
  },
  {
    id:'audio', category:'media', icon:'🔊', title:'No sound or the wrong speaker is playing audio',
    keywords:['no sound','audio not working','speaker not working','headphones no sound','sound problem','volume not working'],
    summary:'The wrong output device, mute/volume settings, Bluetooth routing, app settings, drivers, or updates may be involved.',
    questions:[['Is the volume muted or very low?','muted'],['Are headphones, Bluetooth, HDMI, or an external monitor connected?','external'],['Does sound fail in every app or only one?','allApps']],
    steps:['Check volume and mute controls.','Open Sound settings and select the correct output device.','Disconnect/reconnect headphones or Bluetooth audio if used.','Test sound in another app.','Restart the device.','On Windows, install pending updates and run the built-in audio troubleshooter if available.'], severity:'LOW'
  },
  {
    id:'miccamera', category:'media', icon:'🎥', title:'Camera or microphone is not working in an app',
    keywords:['camera not working','microphone not working','mic not working','webcam not working','zoom mic','meet camera','teams camera'],
    summary:'Privacy permissions, the wrong input device, another app using the camera/mic, or driver/device issues can block access.',
    questions:[['Does the camera/microphone work in another app?','otherApp'],['Did the problem start after changing privacy settings or updating?','privacy'],['Is another call/recording app already open?','busy']],
    steps:['Close other apps that might be using the camera or microphone.','In the app, confirm the correct camera and microphone are selected.','On Windows, open Settings → Privacy & security and check Camera/Microphone access for the app.','Restart the device.','If the device is external, reconnect it and try another compatible port.'], severity:'LOW'
  },
  {
    id:'printer', category:'printer', icon:'🖨️', title:'Printer will not print',
    keywords:['printer','won\'t print','not printing','print queue','paper jam','printer offline'],
    summary:'Power, paper, jammed print jobs, connection, printer selection, ink/toner, or drivers are common causes.',
    questions:[['Is the printer powered on without an obvious error light/message?','power'],['Is there paper loaded and no visible jam?','paper'],['Is the correct printer selected on the device?','selected']],
    steps:['Check printer power, paper, ink/toner indicators and any error message.','Remove visible paper jams carefully following the printer’s own instructions.','Reconnect the USB cable or reconnect the printer to Wi‑Fi.','Make sure the correct printer is selected and clear stuck jobs from the print queue.','Restart the printer and computer/phone.','If needed, update the printer driver using Windows Update or the printer manufacturer’s official support site.'], severity:'LOW'
  },
  {
    id:'missingfile', category:'files', icon:'📂', title:'A file is missing or was deleted',
    keywords:['file missing','deleted file','lost file','cannot find file','document disappeared','recover file'],
    summary:'The file may have been moved, saved somewhere else, deleted to Trash/Recycle Bin, synced to cloud storage, or removed from a failing drive.',
    questions:[['Do you remember part of the file name?','name'],['Have you checked Recycle Bin/Trash and cloud storage?','trash'],['Is the file extremely important and not backed up?','important']],
    steps:['Stop making unnecessary changes if the file was deleted from important storage.','Search the device by file name or file type and check Recent files.','Check Recycle Bin/Trash.','Check cloud locations such as Google Drive or OneDrive if you use them.','If the file was deleted from a failing drive or is extremely important, avoid installing recovery tools onto that same drive because new data can overwrite recoverable information.'], severity:'CAUTION'
  },
  {
    id:'pcstorage', category:'files', icon:'💽', title:'Computer storage is almost full',
    keywords:['disk full','low disk space','storage full computer','drive full','c drive full'],
    summary:'Low storage can slow the computer and interfere with system updates.',
    questions:[['Are videos/downloads using a lot of space?','largeFiles'],['Do you have unused apps?','apps'],['Are important files backed up?','backup']],
    steps:['Open Settings → System → Storage and review what is using space.','Use Windows Cleanup recommendations/Storage Sense for temporary and clearly unnecessary items.','Move large personal files you want to keep to trusted external or cloud storage.','Uninstall apps you no longer use.','Empty Recycle Bin only after confirming it contains nothing you need.'], severity:'LOW'
  },
  {
    id:'googleaccount', category:'accounts', icon:'🔑', title:'Google/Gmail account may be compromised',
    keywords:['gmail hacked','google account hacked','unknown login','account compromised','someone in my email','email hacked'],
    summary:'Unfamiliar sign-ins, changed settings, sent messages you did not write, or unexpected recovery changes can indicate account compromise.',
    questions:[['Can you still sign in?','signin'],['Do you see unfamiliar devices or activity?','unknown'],['Did you reuse this password on other accounts?','reuse']],
    steps:['Use Google’s official Account Security or recovery page rather than links sent in messages.','If you can sign in, change the password immediately and make it unique.','Review signed-in devices and remove anything you do not recognize.','Review recovery phone/email and other security settings for unfamiliar changes.','Turn on 2-Step Verification.','If the same password was used elsewhere, change it on those other services too.'], severity:'CAUTION'
  },
  {
    id:'login', category:'accounts', icon:'🧩', title:'Cannot sign in to an account',
    keywords:['cannot login','can\'t login','forgot password','sign in problem','login failed','locked out'],
    summary:'The safest recovery route is the service’s official sign-in and account-recovery process, not a link sent by an unknown person.',
    questions:[['Are you sure the username/email/phone number is correct?','identity'],['Can you access the recovery email or phone?','recovery'],['Did you receive an unexpected message offering to “recover” the account for you?','scam']],
    steps:['Open the official app or type the service’s known website address yourself.','Use “Forgot password” or the official account recovery option.','Check that caps lock, keyboard layout, and the account name are correct.','Never pay or share verification codes with a stranger claiming they can recover the account.','After recovery, use a unique password and enable multi-factor authentication.'], severity:'CAUTION'
  },
  {
    id:'whatsapp', category:'whatsapp', icon:'💬', title:'WhatsApp account may have been taken over',
    keywords:['whatsapp hacked','whatsapp account stolen','whatsapp code','someone using my whatsapp','whatsapp compromised','verification code whatsapp'],
    summary:'If someone has registered your WhatsApp number or is impersonating you, act quickly and never share registration codes.',
    questions:[['Can you still open WhatsApp on your phone?','access'],['Did you share a 6-digit registration code with anyone?','sharedCode'],['Do you see an unfamiliar linked device?','linked']],
    steps:['Never share the 6-digit registration code with anyone.','If the account was taken over, re-register WhatsApp using your phone number and the code sent to your phone.','Review Linked devices and remove anything you do not recognize.','Turn on WhatsApp two-step verification and add a recovery email if available.','Tell close contacts if someone may have been impersonating you.'], severity:'CAUTION'
  },
  {
    id:'phishing', category:'security', icon:'🎣', title:'Suspicious link, message, or login request',
    keywords:['suspicious link','phishing','scam message','fake message','otp request','password request','urgent message','delivery scam','bank message'],
    summary:'Unexpected links, urgent threats, prize offers, fake delivery notices and requests for passwords or codes are common phishing tactics.',
    questions:[['Did you click the link or open an attachment?','clicked'],['Did you enter a password, PIN, card detail, or verification code?','entered'],['Does the message pressure you to act immediately?','urgent']],
    steps:['Do not click the link again, reply, or send any password/PIN/one-time code.','Verify the claim using an official app, a phone number you already trust, or a website address you type yourself.','Report the message as spam/phishing where possible, then delete it.','If you entered a password, change it immediately from the real service and enable multi-factor authentication.','If financial details were exposed, contact the relevant bank/provider using official contact details.'], severity:'CAUTION'
  },
  {
    id:'captcha', category:'security', icon:'🧠', title:'Website/CAPTCHA tells you to press Windows + R or paste commands',
    keywords:['captcha command','windows r captcha','ctrl v enter','fake captcha','verify human command','paste command'],
    summary:'A real CAPTCHA should not require you to open Run, PowerShell, Terminal, or paste commands. This can be a malware trick.',
    questions:[['Did you already run or paste the command?','ran'],['Did anything download or open unexpectedly?','download'],['Are you signed in to important email, banking, or work accounts on this computer?','importantAccounts']],
    steps:['Do not follow the command instructions. Close the suspicious page.','If you already ran the command, disconnect the computer from the internet.','Run a trusted security scan and install legitimate security/system updates.','Using a different trusted device, change passwords for important accounts if you think credentials may have been exposed, and enable multi-factor authentication.','Seek qualified help if you are unsure whether malware remains on the device.'], severity:'CAUTION'
  },
  {
    id:'passwords', category:'security', icon:'🛡️', title:'Improve weak or reused account passwords',
    keywords:['weak password','same password','reused password','password security','mfa','2fa','two factor'],
    summary:'Unique passwords plus multi-factor authentication reduce the damage if one service is breached.',
    questions:[['Do you reuse the same password on several accounts?','reuse'],['Does the account offer two-factor or multi-factor authentication?','mfa'],['Is this an important account such as email, social media, money, or work?','important']],
    steps:['Use a long, unique password/passphrase for each important account.','Use a reputable password manager if that helps you keep unique passwords.','Turn on multi-factor authentication wherever available.','Start with your email account because password-reset links for other services often go there.'], severity:'LOW'
  },
  {
    id:'browser', category:'apps', icon:'🧭', title:'One website will not open or the browser behaves strangely',
    keywords:['website not opening','browser problem','page not loading','site not loading','browser redirect','popups'],
    summary:'The issue may be limited to one website, a browser extension/cache, connectivity, DNS, or malicious redirects.',
    questions:[['Do other websites open normally?','others'],['Does the site work in another browser or private/incognito window?','otherBrowser'],['Are you seeing unexpected pop-ups or redirects?','redirects']],
    steps:['Try another trusted website to confirm whether the internet connection works.','Close and reopen the browser.','Try a private/incognito window or another browser.','Disable suspicious/unneeded browser extensions.','If you see persistent redirects, fake alerts, or unexpected downloads, run a trusted security scan and avoid entering account details until the browser is clean.'], severity:'LOW'
  },
  {
    id:'display', category:'display', icon:'🖥️', title:'Screen is blank, flickering, too dim, or showing the wrong display',
    keywords:['screen blank','display problem','flickering screen','monitor not showing','second monitor','screen too dim'],
    summary:'Brightness, cables, power, display selection, drivers, or hardware can cause display problems.',
    questions:[['Does the device appear powered on?','power'],['If using a monitor, is its power light on and cable secure?','monitor'],['Did the problem start after connecting another display or changing display settings?','change']],
    steps:['Check screen brightness and power.','For an external monitor, reconnect the power and video cable and select the correct input source.','Restart the computer.','On Windows, press Windows + P and confirm the intended display mode.','If the screen shows cracks, liquid damage, burning smell, or severe flickering after impact, stop and arrange hardware service.'], severity:'LOW'
  }
  ,{
    id:'lostphone', category:'security', icon:'📱', title:'Phone is lost or stolen',
    keywords:['lost phone','stolen phone','phone stolen','missing phone','lost iphone','lost android'],
    summary:'A lost phone can expose accounts, messages, photos and payment apps. Protect the device and the accounts connected to it quickly.',
    questions:[['Can you still access the account linked to the phone from another trusted device?','account'],['Was the phone protected by a screen lock?','lock'],['Do you believe the phone was stolen rather than misplaced?','stolen']],
    steps:['Use the device maker’s official find/locate service from another trusted device to locate, lock or mark the phone as lost where available.','Contact your mobile network provider if the SIM may be misused.','Change the password of your primary email account if you believe the device or screen lock may be compromised.','Review important accounts for unfamiliar sessions or activity and sign out of devices you do not recognize.','If theft is involved, preserve identifying information such as the device IMEI/serial number and make an appropriate report to local authorities.'], severity:'CAUTION'
  },
  {
    id:'remote-scam', category:'security', icon:'🧑‍💻', title:'Someone wants remote access to your phone or computer',
    keywords:['remote access','anydesk','teamviewer','quick assist','remote support scam','screen share scam','install app to help'],
    summary:'Unexpected callers or messages that ask you to install remote-control software, share your screen or move money can be scams.',
    questions:[['Did the person contact you unexpectedly?','unexpected'],['Have you already installed a remote-access app or shared your screen?','installed'],['Did you enter banking, email, social-media or payment details while they were connected?','sensitive']],
    steps:['Do not grant remote access to an unexpected caller or message sender.','If remote access is active, disconnect the device from the internet and end the session.','Uninstall remote-access software you did not intentionally need after the session is fully ended.','From another trusted device, change passwords for important accounts that may have been viewed and enable multi-factor authentication.','If money or banking details were involved, contact the financial provider through its official number or app immediately.'], severity:'CAUTION'
  },
  {
    id:'ransomware', category:'security', icon:'🔒', title:'Files suddenly will not open or appear encrypted',
    keywords:['ransomware','files encrypted','files locked','ransom note','extension changed','pay ransom'],
    summary:'Unexpected file encryption, renamed files and ransom notes can indicate malware. Limit further spread and protect backups.',
    questions:[['Did many files change at the same time?','many'],['Do you see a ransom note or payment demand?','note'],['Is the device connected to shared drives, other computers or backup storage?','connected']],
    steps:['Disconnect the affected device from Wi‑Fi, Ethernet and shared storage to reduce possible spread.','Do not connect backup drives to the affected device.','Take a photo of any ransom note or error message for reference, but do not follow payment links from it.','Use a clean trusted device to review official security guidance and protect important accounts if credentials may also be exposed.','Seek qualified incident-response or technical help before attempting recovery on important data.'], severity:'CAUTION'
  },
  {
    id:'waterdamage', category:'phone', icon:'💧', title:'Phone or computer got wet or has liquid damage',
    keywords:['water damage','wet phone','liquid damage','spilled water','wet laptop','phone fell in water'],
    summary:'Electricity and liquid are a dangerous combination. Continuing to power or charge a wet device can worsen damage and create a safety risk.',
    questions:[['Is the device currently powered on?','on'],['Is it connected to a charger or other power source?','power'],['Do you notice heat, smoke, sparks or a burning smell?','danger']],
    steps:['Stop using the device. Disconnect external power only if it is safe to do so.','Do not charge, repeatedly power on, heat, or dismantle the wet device.','Remove detachable accessories only if this can be done safely without opening the device.','Follow the manufacturer’s official liquid-damage guidance and arrange qualified service, especially when important data is involved.'], severity:'CAUTION', dangerAnswer:'danger'
  },
  {
    id:'popups', category:'security', icon:'🚨', title:'Constant pop-ups, redirects or fake virus warnings',
    keywords:['popups','pop-ups','fake virus warning','browser hijack','redirects','ads everywhere','malware popup'],
    summary:'Persistent redirects and alarming “virus” messages can come from malicious websites, unwanted browser permissions, extensions or malware.',
    questions:[['Do the warnings appear mainly inside one browser?','browser'],['Did you recently allow notifications from an unfamiliar website?','notifications'],['Did you install a new extension or program shortly before this started?','installed']],
    steps:['Do not call phone numbers or install software promoted by a pop-up warning.','Close the suspicious page or browser. If it refuses to close, end the browser from the operating system task/app switcher.','Review browser notification permissions and remove unfamiliar sites.','Disable or remove suspicious browser extensions and recently installed unwanted programs.','Run trusted built-in or reputable security scanning and install legitimate updates.'], severity:'CAUTION'
  },
  {
    id:'emailfull', category:'accounts', icon:'📬', title:'Email is not receiving messages because storage may be full',
    keywords:['gmail full','email storage full','not receiving email','mailbox full','email quota'],
    summary:'Some email services stop receiving new messages when the account storage quota is full.',
    questions:[['Can you still send email?','send'],['Do you see a storage or quota warning?','quota'],['Are large attachments, photos or cloud files using most of the shared storage?','shared']],
    steps:['Open the provider’s official storage/account page and check the storage quota.','Delete only messages and files you recognize and no longer need, starting with large attachments if appropriate.','Empty Trash/Deleted Items only after confirming nothing important is there.','Remember that some providers share storage across email, cloud files and photos.','If you purchase storage, do it only through the provider’s official app or website.'], severity:'LOW'
  },
  {
    id:'nospaceupdate', category:'apps', icon:'📦', title:'Update or app installation fails because storage is low',
    keywords:['not enough space update','update needs storage','app wont install storage','insufficient storage'],
    summary:'Operating-system and app updates need temporary free space in addition to the final installed size.',
    questions:[['Is the device showing a low-storage warning?','low'],['Are large downloads or videos stored locally?','large'],['Do you have a backup of important files?','backup']],
    steps:['Check the device storage screen to identify what is using space.','Remove completed downloads, offline media or apps you no longer use.','Back up important photos and files before deleting them.','Restart the device after freeing space, then try the official update again.','Avoid “cleaner” apps from unknown sources that promise dramatic storage gains.'], severity:'LOW'
  },
  {
    id:'simissue', category:'internet', icon:'📵', title:'Phone shows No Service, SIM error, or cannot make calls',
    keywords:['no service','sim error','no sim','emergency calls only','cannot make calls','network unavailable'],
    summary:'No-service problems can come from coverage, SIM/eSIM configuration, airplane mode, carrier outages or account issues.',
    questions:[['Does another phone on the same network have signal nearby?','others'],['Is Airplane mode off?','airplane'],['Did the issue begin after changing SIM/eSIM settings or travelling?','change']],
    steps:['Turn Airplane mode on for about 10 seconds, then turn it off.','Restart the phone.','Check that the intended SIM/eSIM line is enabled in network settings.','Move to an area with stronger signal and check for a carrier outage.','If the SIM/eSIM remains unavailable, contact the mobile network provider through an official channel.'], severity:'LOW'
  }

];

const QUICK_TIPS=[
  ['💡','Think before you click','Unexpected message? Don’t rush. Open the official app or type the known website address yourself.'],
  ['🔐','Secure your email first','Email often controls password resets for other accounts. Give it a unique password and multi-factor authentication.'],
  ['💾','Back up before trouble','Keep an extra copy of important work, school files and photos before a device fails.'],
  ['⬆️','Updates are maintenance','Official updates often fix security, compatibility and reliability problems.'],
  ['🔋','Heat is a warning','If a device is unusually hot, stop heavy use and let it cool. Swelling, smoke or burning smell means stop using it.'],
  ['🎣','Urgency is a scammer’s tool','Pause when a message says “act now,” “account closing,” “parcel held,” or “send the code.” Verify independently.'],
  ['🧠','CAPTCHA should not run commands','A website asking you to press Windows + R and paste a command is not normal verification. Close it.'],
  ['🌐','Test another device','When Wi‑Fi fails, another phone/laptop can quickly tell you whether the problem is the router or just one device.'],
  ['🔑','Use passkeys where offered','Passkeys are designed to resist phishing. Keep your device lock and recovery options secure too.'],
  ['🧑‍💻','Remote access is powerful','Only allow remote-control software when you deliberately contacted a trusted support provider and understand what they will do.'],
  ['📵','Lost phone? Protect accounts quickly','Use the official device-locate service, contact your network provider when needed, and review important account sessions.']
];

const els={
  problem:document.getElementById('problemInput'), category:document.getElementById('categorySelect'), hint:document.getElementById('categoryHint'),
  stage1:document.getElementById('stage1'), stage2:document.getElementById('stage2'), stage3:document.getElementById('stage3'),
  caseId:document.getElementById('caseId'), severity:document.getElementById('severityPill'), title:document.getElementById('diagnosisTitle'), summary:document.getElementById('diagnosisSummary'),
  questions:document.getElementById('questions'), steps:document.getElementById('steps'), safety:document.getElementById('safetyBox'), report:document.getElementById('reportText')
};

let current=null, currentCase='', answers={}, outcome='Not provided', deferredPrompt=null, tipIndex=0;

function normalise(s){return String(s||'').toLowerCase().replace(/[’‘]/g,"'");}
function scoreRescue(r,text){return r.keywords.reduce((n,k)=>n+(text.includes(k)?3:0),0)+(text.includes(normalise(r.title).split(' ')[0])?1:0);}
function suggestRescue(text,category='auto'){
  const t=normalise(text); let pool=RESCUES;
  if(category && category!=='auto' && category!=='other') pool=RESCUES.filter(r=>r.category===category);
  let best=null,bestScore=0; pool.forEach(r=>{const s=scoreRescue(r,t);if(s>bestScore){best=r;bestScore=s;}});
  if(!best && category && category!=='auto' && category!=='other') best=pool[0];
  if(!best) best=RESCUES.find(r=>r.id==='browser');
  return {rescue:best,score:bestScore};
}
function detectDanger(text){const t=normalise(text);return ['swollen battery','battery swollen','smoke','sparks','burning smell','on fire','liquid inside','exploded'].some(x=>t.includes(x));}
function getSeverity(r){if(detectDanger(els.problem.value))return 'STOP'; if(r.dangerAnswer && answers[r.dangerAnswer]==='Yes')return 'STOP'; return r.severity||'LOW';}
function readJSON(key,fallback=[]){try{const raw=localStorage.getItem(key);if(!raw)return fallback;const x=JSON.parse(raw);return Array.isArray(fallback)?(Array.isArray(x)?x:fallback):x;}catch{return fallback;}}
function announce(text){const r=document.getElementById('liveRegion');if(r){r.textContent='';setTimeout(()=>{r.textContent=text;},20);}}
function newCaseId(){let n=parseInt(localStorage.getItem('lonaCaseCounterV3')||'0',10)+1;if(!Number.isFinite(n)||n<1)n=1;localStorage.setItem('lonaCaseCounterV3',String(n));const d=new Date();return `LONA-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${String(n).padStart(4,'0')}`;}
function setProgress(step){document.querySelectorAll('.progress-step').forEach(x=>x.classList.toggle('active',Number(x.dataset.step)<=step));}
function showStage(n){els.stage1.classList.toggle('hidden',n!==1);els.stage2.classList.toggle('hidden',n!==2);els.stage3.classList.toggle('hidden',n!==3);setProgress(n);document.getElementById('rescue').scrollIntoView({behavior:'smooth',block:'start'});}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function setSeverityPill(level){els.severity.textContent=level==='STOP'?'🔴 STOP & GET HELP':level==='CAUTION'?'🟡 CAUTION':'🟢 LOW RISK';els.severity.className='pill '+(level==='STOP'?'red':level==='CAUTION'?'yellow':'green');}

function startRescue(){
  const text=els.problem.value.trim(); if(text.length<8){alert('Tell LONA a little more about what is happening.');els.problem.focus();return;}
  const suggestion=suggestRescue(text,els.category.value); current=suggestion.rescue; currentCase=newCaseId();answers={};outcome='Not provided';
  els.caseId.textContent=currentCase; setSeverityPill(getSeverity(current)); els.title.textContent=`${current.icon} ${current.title}`;els.summary.textContent=current.summary;
  els.questions.innerHTML=current.questions.map(([q,key],i)=>`<div class="question"><strong>${i+1}. ${escapeHtml(q)}</strong><div class="answers"><button data-key="${key}" data-value="Yes">Yes</button><button data-key="${key}" data-value="No">No</button><button data-key="${key}" data-value="Not sure">Not sure</button></div></div>`).join('');
  els.questions.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{answers[b.dataset.key]=b.dataset.value;b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');setSeverityPill(getSeverity(current));}));
  saveCase(); showStage(2); announce(`Rescue started. ${current.title}. Safety level ${getSeverity(current)}.`);
}

function showPlan(){
  if(!current)return; const sev=getSeverity(current); let steps=[];
  if(sev==='STOP'){
    steps=['Stop using the device or accessory now.','Disconnect power only if it is safe to do so. Do not keep charging, opening, or repeatedly powering it on.','Keep it away from heat, flames, water and children.','Seek qualified technical service before using it again.'];
    document.getElementById('planIntro').innerHTML='<strong>This is no longer a normal DIY rescue.</strong> The description or your answers suggest a possible physical safety risk.';
  }else{
    steps=[...(typeof current.adapt==='function'?current.adapt(answers):[]),...current.steps];
    document.getElementById('planIntro').innerHTML=`<strong>Here’s the LONA rescue path.</strong> Start at Step 1 and stop as soon as the problem is solved. You do not have to complete every step.`;
  }
  els.steps.innerHTML=steps.map((s,i)=>`<div class="step"><span class="step-num">${i+1}</span><div>${escapeHtml(s)}</div></div>`).join('');
  if(sev==='STOP')els.safety.innerHTML='<div class="danger"><strong>STOP:</strong> Do not continue ordinary troubleshooting. Physical safety and data protection come first.</div>';
  else if(sev==='CAUTION')els.safety.innerHTML='<div class="warning"><strong>Proceed carefully:</strong> Protect important data and accounts. Never share passwords, PINs or one-time verification codes.</div>';
  else els.safety.innerHTML='<div class="success"><strong>Good to know:</strong> These are low-risk first-line checks. Stop if you notice physical damage, unusual heat, smoke, sparks, liquid damage or important-data risk.</div>';
  updateReport(); showStage(3);
}

function updateReport(){
  if(!current)return; const sev=getSeverity(current); const qs=current.questions.map(([q,key])=>`${q} — ${answers[key]||'Not answered'}`).join('\n');
  const device=document.getElementById('deviceSelect').selectedOptions[0]?.textContent||'Not specified';
  els.report.textContent=`LONA ICT RESCUE REPORT\nCase: ${currentCase}\nProblem area: ${current.title}\nDevice: ${device}\nSafety level: ${sev}\n\nWhat I reported:\n${els.problem.value.trim()}\n\nQuick-check answers:\n${qs}\n\nOutcome: ${outcome}\n\nPrivacy note: This report exists in this page and is shared only when you choose to copy, download or share it.\n\nLONA ICT Hub\nLearn ICT • Use ICT • Stay Smart`;
}
function saveCase(){
  if(!current)return;
  let cases=readJSON('lonaCasesV3',[]);
  const obj={id:currentCase,title:current.title,category:current.category,device:document.getElementById('deviceSelect').value,severity:getSeverity(current),outcome,time:new Date().toISOString()};
  const i=cases.findIndex(c=>c.id===currentCase);if(i>=0)cases[i]=obj;else cases.unshift(obj);
  localStorage.setItem('lonaCasesV3',JSON.stringify(cases.slice(0,150)));renderStats();
}
function setOutcome(value,button){outcome=value;document.querySelectorAll('.outcome').forEach(b=>b.classList.remove('active'));button.classList.add('active');const box=document.getElementById('outcomeMessage');box.innerHTML=value==='Solved'?'<div class="success">✅ Great. Your case is marked solved.</div>':value==='Needs expert help'?'<div class="warning">🛠️ Good decision. Share the Rescue Report with the technician so they can see what you already checked.</div>':'<div class="warning">Your result has been saved. Keep the Rescue Report if you need further help.</div>';saveCase();updateReport();announce(`Outcome saved: ${value}.`);}
function resetRescue(){current=null;currentCase='';answers={};outcome='Not provided';els.problem.value='';els.category.value='auto';els.hint.classList.add('hidden');document.getElementById('charCount').textContent='0/600';document.querySelectorAll('.outcome').forEach(b=>b.classList.remove('active'));document.getElementById('outcomeMessage').innerHTML='';document.getElementById('rating').value='';document.getElementById('clarity').value='';document.getElementById('feedbackComment').value='';document.getElementById('feedbackSaved').textContent='';showStage(1);}
function renderStats(){const cases=readJSON('lonaCasesV3',[]);document.getElementById('caseCount').textContent=cases.length;document.getElementById('solvedCount').textContent=cases.filter(c=>c.outcome==='Solved').length;}
function saveFeedback(){
  if(!currentCase)return;
  const rating=document.getElementById('rating').value,clarity=document.getElementById('clarity').value;
  if(!rating||!clarity){alert('Please choose a usefulness rating and clarity answer.');return;}
  let f=readJSON('lonaFeedbackV3',[]);
  const item={caseId:currentCase,category:current?.category||'',rating,clarity,outcome,time:new Date().toISOString()};
  const i=f.findIndex(x=>x.caseId===currentCase);if(i>=0)f[i]=item;else f.unshift(item);
  localStorage.setItem('lonaFeedbackV3',JSON.stringify(f.slice(0,150)));
  document.getElementById('feedbackSaved').textContent='✓ Private rating saved on this device';announce('Private rating saved.');
}
async function shareFeedback(){
  if(!currentCase)return;
  const rating=document.getElementById('rating').value||'Not rated';
  const clarity=document.getElementById('clarity').value||'Not rated';
  const comment=document.getElementById('feedbackComment').value.trim()||'No written comment';
  const text=`LONA ICT RESCUE FEEDBACK
Case: ${currentCase}
Problem area: ${current?.title||''}
Outcome: ${outcome}
Usefulness: ${rating}
Clarity: ${clarity}
Comment: ${comment}

Shared voluntarily by a LONA ICT Rescue user.`;
  const data={title:'LONA ICT Rescue Feedback',text};
  if(window.isSecureContext&&navigator.share){try{await navigator.share(data);return;}catch(e){if(e?.name==='AbortError')return;}}
  const ok=await copyPlainText(text);alert(ok?'Feedback copied. Send it to LONA ICT Hub through your usual contact channel.':'Select your feedback text and copy it manually.');
}
function download(name,text,type='text/plain'){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function csvEscape(v){return `"${String(v??'').replace(/"/g,'""')}"`;}
function exportCSV(){const cases=readJSON('lonaCasesV3',[]),feedback=readJSON('lonaFeedbackV3',[]),fm=Object.fromEntries(feedback.map(f=>[f.caseId,f]));const rows=[['Case ID','Problem area','Category','Device','Safety','Outcome','Usefulness','Clarity','Time']];cases.slice().reverse().forEach(c=>{const f=fm[c.id]||{};rows.push([c.id,c.title,c.category,c.device,c.severity,c.outcome,f.rating||'',f.clarity||'',c.time]);});download('LONA_ICT_Rescue_Private_Stats.csv',rows.map(r=>r.map(csvEscape).join(',')).join('\n'),'text/csv');}
function clearLocalData(){if(!confirm('Clear LONA Rescue case counts, private ratings and preferences stored in this browser?'))return;['lonaCasesV3','lonaFeedbackV3','lonaCaseCounterV3','lonaLargeText','lonaHighContrast'].forEach(k=>localStorage.removeItem(k));document.body.classList.remove('large-text','high-contrast');document.getElementById('largeTextToggle').checked=false;document.getElementById('contrastToggle').checked=false;renderStats();announce('Local LONA Rescue data cleared.');alert('Local LONA Rescue data cleared.');}
async function copyReport(){updateReport();try{await navigator.clipboard.writeText(els.report.textContent);alert('Rescue Report copied.');}catch{alert('Your browser blocked automatic copying. Select the report and copy it manually.');}}
async function copyPlainText(text){
  if(navigator.clipboard && window.isSecureContext){
    try{await navigator.clipboard.writeText(text);return true;}catch(e){}
  }
  try{
    const area=document.createElement('textarea');
    area.value=text;area.setAttribute('readonly','');
    area.style.position='fixed';area.style.opacity='0';area.style.pointerEvents='none';
    document.body.appendChild(area);area.focus();area.select();area.setSelectionRange(0,area.value.length);
    const ok=document.execCommand('copy');document.body.removeChild(area);return ok;
  }catch(e){return false;}
}
async function shareReport(){
  updateReport();
  const data={title:'LONA ICT Rescue Report',text:els.report.textContent};
  const canNative=window.isSecureContext && typeof navigator.share==='function' && (!navigator.canShare || navigator.canShare(data));
  if(canNative){
    try{await navigator.share(data);return;}catch(e){if(e && e.name==='AbortError')return;}
  }
  const ok=await copyPlainText(data.text);
  alert(ok?'Rescue Report copied. You can paste it into WhatsApp, Messages, email or any social app.':'Sharing is restricted in this viewer. Select the Rescue Report and use Copy, or open the live HTTPS version once published.');
}
async function shareApp(){
  const intro='Got a phone, computer, internet or security problem? Try LONA ICT Rescue — friendly first-line ICT help from LONA ICT Hub.\n\nLearn ICT • Use ICT • Stay Smart.';
  const hosted=(location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1') && !location.href.startsWith('blob:');
  const data=hosted?{title:'LONA ICT Rescue',text:intro,url:location.href}:{title:'LONA ICT Rescue',text:intro};
  const canNative=window.isSecureContext && typeof navigator.share==='function' && (!navigator.canShare || navigator.canShare(data));
  if(canNative){
    try{await navigator.share(data);return;}catch(e){if(e && e.name==='AbortError')return;}
  }
  const copyText=hosted?`${intro}\n\n${location.href}`:`${intro}\n\nThe public LONA ICT Rescue web link will appear here once this beta is published online.`;
  const ok=await copyPlainText(copyText);
  if(hosted){
    alert(ok?'LONA ICT Rescue invitation copied with the live link. Paste it into WhatsApp, Facebook, email or another app.':'Your browser blocked direct sharing. Use the browser menu to share this page.');
  }else{
    alert(ok?'This is the downloaded test copy, so it has no public web link yet. The LONA invitation has been copied. Once the GitHub Pages site is live, this button will share the real public link.':'This downloaded test copy cannot create a public web link. Publish the online package first, then use Share from the HTTPS site.');
  }
}
function showTip(){const [icon,title,text]=QUICK_TIPS[tipIndex%QUICK_TIPS.length];document.getElementById('tipIcon').textContent=icon;document.getElementById('tipTitle').textContent=title;document.getElementById('tipText').textContent=text;}
function renderLibrary(filter=''){const f=normalise(filter);const list=RESCUES.filter(r=>!f||normalise(`${r.title} ${r.summary} ${r.keywords.join(' ')}`).includes(f));document.getElementById('libraryList').innerHTML=list.map(r=>`<button class="library-item" data-id="${r.id}"><strong>${r.icon} ${escapeHtml(r.title)}</strong><span>${escapeHtml(r.summary)}</span></button>`).join('')||'<p class="muted">No matching problem found. Try a broader word such as “internet”, “battery” or “account”.</p>';document.querySelectorAll('.library-item').forEach(b=>b.addEventListener('click',()=>{const r=RESCUES.find(x=>x.id===b.dataset.id);els.problem.value=r.title;els.category.value=r.category;document.getElementById('charCount').textContent=`${els.problem.value.length}/600`;document.getElementById('libraryPanel').close();document.getElementById('rescue').scrollIntoView({behavior:'smooth'});}));}

els.problem.addEventListener('input',()=>{document.getElementById('charCount').textContent=`${els.problem.value.length}/600`;if(els.problem.value.trim().length>6){const s=suggestRescue(els.problem.value,'auto');if(s.score>0){els.hint.textContent=`LONA suggestion: ${s.rescue.icon} ${s.rescue.title}`;els.hint.classList.remove('hidden');}else els.hint.classList.add('hidden');}else els.hint.classList.add('hidden');});
document.getElementById('accessBtn').addEventListener('click',()=>document.getElementById('accessPanel').showModal());
document.getElementById('largeTextToggle').addEventListener('change',e=>{document.body.classList.toggle('large-text',e.target.checked);localStorage.setItem('lonaLargeText',e.target.checked?'1':'0');});
document.getElementById('contrastToggle').addEventListener('change',e=>{document.body.classList.toggle('high-contrast',e.target.checked);localStorage.setItem('lonaHighContrast',e.target.checked?'1':'0');});
document.getElementById('shareFeedbackBtn').addEventListener('click',shareFeedback);
document.getElementById('clearDataBtn').addEventListener('click',clearLocalData);
document.querySelectorAll('.urgent-card').forEach(b=>b.addEventListener('click',()=>{const r=RESCUES.find(x=>x.id===b.dataset.topic);if(r){els.problem.value=r.title;els.category.value=r.category;document.getElementById('charCount').textContent=`${els.problem.value.length}/600`;document.getElementById('rescue').scrollIntoView({behavior:'smooth'});els.problem.focus();}}));
document.getElementById('startRescueBtn').addEventListener('click',startRescue);document.getElementById('showPlanBtn').addEventListener('click',showPlan);document.getElementById('restartBtn1').addEventListener('click',resetRescue);document.getElementById('restartBtn2').addEventListener('click',resetRescue);
document.querySelectorAll('.outcome').forEach(b=>b.addEventListener('click',()=>setOutcome(b.dataset.outcome,b)));document.getElementById('saveFeedbackBtn').addEventListener('click',saveFeedback);document.getElementById('copyReportBtn').addEventListener('click',copyReport);document.getElementById('shareReportBtn').addEventListener('click',shareReport);document.getElementById('downloadReportBtn').addEventListener('click',()=>{updateReport();download(`${currentCase||'LONA'}_Rescue_Report.txt`,els.report.textContent);});document.getElementById('exportCsvBtn').addEventListener('click',exportCSV);document.getElementById('shareAppBtn').addEventListener('click',shareApp);document.getElementById('nextTipBtn').addEventListener('click',()=>{tipIndex=(tipIndex+1)%QUICK_TIPS.length;showTip();});
document.querySelectorAll('.quick-card').forEach(b=>b.addEventListener('click',()=>{const r=RESCUES.find(x=>x.id===b.dataset.topic);if(r){els.problem.value=r.title;els.category.value=r.category;document.getElementById('charCount').textContent=`${els.problem.value.length}/600`;document.getElementById('rescue').scrollIntoView({behavior:'smooth'});}}));
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{renderLibrary();document.getElementById(b.dataset.open).showModal();}));document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));document.getElementById('librarySearch').addEventListener('input',e=>renderLibrary(e.target.value));

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').classList.remove('hidden');});document.getElementById('installBtn').addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('installBtn').classList.add('hidden');});
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('service-worker.js').catch(()=>{});

if(localStorage.getItem('lonaLargeText')==='1'){document.body.classList.add('large-text');document.getElementById('largeTextToggle').checked=true;}
if(localStorage.getItem('lonaHighContrast')==='1'){document.body.classList.add('high-contrast');document.getElementById('contrastToggle').checked=true;}
showTip();renderLibrary();renderStats();setProgress(1);
