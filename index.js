const startButton = document.querySelector('.start');
startButton.addEventListener('click', playAudioMove);

function playAudioMove() {
    const sfx = new Audio(`SFX/Game-SFX/mixkit-positive-interface-beep-221.wav`);
    sfx.play();
    window.open('game.html', '_self');
}