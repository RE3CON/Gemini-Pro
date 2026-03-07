const fs = require('fs');

const files = ['src/App.tsx', 'google-ai-identity.user.js'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. NAVIGATOR & CPU CONSISTENCY
  content = content.replace(
    /\/\/ ─── 3\. NAVIGATOR & CPU CONSISTENCY \(Linux RTX 3080 Profile\) ─────────────[\s\S]*?\/\/ Permissions & Hardware Enumeration Spoofing/g,
    `// ─── 3. NAVIGATOR & CPU CONSISTENCY (Pixel 8 Pro Profile) ─────────────
    const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.119 Mobile Safari/537.36';
    
    secureProps(navigator, 'userAgent', UA);
    secureProps(navigator, 'platform', 'Linux armv8l');
    secureProps(navigator, 'vendor', 'Google Inc.');
    secureProps(navigator, 'hardwareConcurrency', 9);
    secureProps(navigator, 'deviceMemory', 8);
    secureProps(navigator, 'maxTouchPoints', 10); // Spoofing Pixel 8 Pro
    secureProps(navigator, 'language', 'en-US');
    secureProps(navigator, 'languages', ['en-US', 'en']);
    secureProps(navigator, 'webdriver', undefined);
    secureProps(navigator, 'pdfViewerEnabled', false);

    // High-Entropy UserAgentData (Client Hints Restoration)
    if (navigator.userAgentData) {
        const getHighEntropyValues = navigator.userAgentData.getHighEntropyValues;
        navigator.userAgentData.getHighEntropyValues = protect(async (hints) => {
            const values = await getHighEntropyValues.apply(navigator.userAgentData, [hints]);
            return { 
                ...values, 
                platform: "Android", 
                architecture: "", 
                model: "Pixel 8 Pro", 
                platformVersion: "14.0.0",
                uaFullVersion: "128.0.6613.119",
                bitness: ""
            };
        });

        Object.defineProperty(Navigator.prototype, 'userAgentData', {
            get: protect(() => ({
                brands: [
                    { brand: 'Not_A Brand', version: '8' }, 
                    { brand: 'Chromium', version: '128' }, 
                    { brand: 'Google Chrome', version: '128' }
                ],
                platform: 'Android', 
                mobile: true,
                getHighEntropyValues: navigator.userAgentData.getHighEntropyValues
            }))
        });
    }

    // Permissions & Hardware Enumeration Spoofing`
  );

  // 2. Media Devices
  content = content.replace(
    /navigator\.mediaDevices\.enumerateDevices = protect\(async \(\) => \[\s*\{ kind: 'audioinput', label: 'Internal Microphone \(Generic\)', deviceId: 'default', groupId: 'default' \},\s*\{ kind: 'videoinput', label: 'Integrated Webcam \(Generic\)', deviceId: 'default', groupId: 'default' \},\s*\{ kind: 'audiooutput', label: 'Internal Speakers', deviceId: 'default', groupId: 'default' \}\s*\]\);/g,
    `navigator.mediaDevices.enumerateDevices = protect(async () => [
            { kind: 'audioinput', label: 'Microphone (built-in)', deviceId: 'default', groupId: 'default' },
            { kind: 'videoinput', label: 'Camera 0, Facing back', deviceId: 'default', groupId: 'default' },
            { kind: 'videoinput', label: 'Camera 1, Facing front', deviceId: 'default', groupId: 'default' },
            { kind: 'audiooutput', label: 'Speaker (built-in)', deviceId: 'default', groupId: 'default' }
        ]);`
  );

  // 3. WEBGL
  content = content.replace(
    /\/\/ Spoofs high-end GPU signature \(RTX 3080\)[\s\S]*?const spoofWebGL = \(proto\) => \{[\s\S]*?const mask = \{[\s\S]*?37445: 'Google Inc\. \(NVIDIA\)',[\s\S]*?37446: 'ANGLE \(NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0\)',[\s\S]*?7936: 'NVIDIA Corporation',[\s\S]*?7937: 'NVIDIA GeForce RTX 3080'[\s\S]*?\};/g,
    `// Spoofs mobile GPU signature (Pixel 8 Pro Mali-G715)
    const spoofWebGL = (proto) => {
        const getParam = proto.getParameter;
        proto.getParameter = protect(function(param) {
            const mask = {
                37445: 'ARM', 
                37446: 'Mali-G715', 
                7936: 'ARM', 
                7937: 'Mali-G715' 
            };`
  );

  // 4. GEOMETRY
  content = content.replace(
    /\/\/ ─── 5\. GEOMETRY & SCREEN REALISM \(Linux GNOME Style\) ───────────────────\s*\/\/ Spoofs desktop screen dimensions on mobile devices\s*Object\.defineProperties\(screen, \{\s*height: \{ get: protect\(\(\) => 1080\) \},\s*width: \{ get: protect\(\(\) => 1920\) \},\s*availHeight: \{ get: protect\(\(\) => 1052\) \}, \/\/ GNOME Taskbar simulation\s*availWidth: \{ get: protect\(\(\) => 1920\) \},\s*colorDepth: \{ get: protect\(\(\) => 24\) \},\s*pixelDepth: \{ get: protect\(\(\) => 24\) \}\s*\}\);/g,
    `// ─── 5. GEOMETRY & SCREEN REALISM (Pixel 8 Pro Style) ───────────────────
    // Spoofs mobile screen dimensions
    Object.defineProperties(screen, {
        height: { get: protect(() => 918) },
        width: { get: protect(() => 412) },
        availHeight: { get: protect(() => 918) },
        availWidth: { get: protect(() => 412) },
        colorDepth: { get: protect(() => 24) },
        pixelDepth: { get: protect(() => 24) }
    });
    
    try {
        Object.defineProperty(window, 'devicePixelRatio', { get: protect(() => 3.5) });
        Object.defineProperty(window, 'innerWidth', { get: protect(() => 412) });
        Object.defineProperty(window, 'innerHeight', { get: protect(() => 918) });
    } catch (e) {}`
  );

  fs.writeFileSync(file, content);
}
