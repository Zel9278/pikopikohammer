const hammer = document.getElementById("hammer");
const clickCount = document.getElementById("count");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = ["1.wav", "2.wav", "3.wav"];
const audioCache = {};

let count = 0;

// ページロード時に音声ファイルをフェッチしてキャッシュ
const cacheSounds = async() => {
  for (const sound of sounds) {
    const response = await fetch(sound);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioCache[sound] = audioBuffer;
  }
}

const clickHammer = () => {
  const randomSoundIndex = Math.floor(Math.random() * sounds.length);
  const sound = sounds[randomSoundIndex];
  const audioBuffer = audioCache[sound];
  if (audioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    count++;
    clickCount.textContent = count;

    hammer.style.transform = "translateX(60px) translateY(0px) rotate(-60deg)";

    setTimeout(() => {
      hammer.style.transform = "translateX(0) translateY(0) rotate(0deg)";
    }, 100); // 0.1秒後に元に戻す
  }
}

hammer.addEventListener("click", clickHammer);

cacheSounds();
