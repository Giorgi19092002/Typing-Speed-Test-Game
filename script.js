const typingTxt = document.querySelector('.typing-text p'),
inputField = document.querySelector('.wrapper .input-field'),
timeTag = document.querySelector('.time span '), 
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector('.cpm span'),
mistakeTag = document.querySelector(".mistake span"),
tryAgainTag = document.querySelector("button")
 
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0




const randomParagraph = () => {
    let randIndx = Math.floor(Math.random() * paragraphs.length)
    typingTxt.innerHTML = ''
    paragraphs[randIndx].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingTxt.innerHTML += spanTag
    })
    typingTxt.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown',() => inputField.focus())
    typingTxt.addEventListener('click',() =>  inputField.focus())
}

randomParagraph()

const initTyping = () => {
    const charcters = typingTxt.querySelectorAll('span')
    let typedChar = inputField.value.split('')[charIndex]
    if(charIndex < charcters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000)
            isTyping = true
        }
        if(typedChar == null){
             charIndex-- 
             if(charcters[charIndex].classList.contains('incorrect')){
                mistakes--
              }
             charcters[charIndex].classList.remove('correct','incorrect')
           
        }
        else{
            if(charcters[charIndex].innerText === typedChar){
                charcters[charIndex].classList.add('correct')
            }
            else{
                mistakes++ 
                charcters[charIndex].classList.add('incorrect')
            }
            charIndex++
        }
        
        charcters.forEach(span => span.classList.remove('active'))
        charcters[charIndex].classList.add('active')
    
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        wpmTag.innerText = wpm
        mistakeTag.innerText = mistakes
        cpmTag.innerText = charIndex - mistakes
    }else{
        inputField.value = ''
        clearInterval(timer)
    }
    }

const initTimer = () => {
    if(timeLeft > 0){
        timeLeft--
        timeTag.innerText = timeLeft
    }
    else{
        clearInterval(timer)
         
    }
}

const resetGame = () => {
    randomParagraph()
    inputField.value = ''
    clearInterval(timer)
    timeLeft = maxTime
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0
}

tryAgainTag.addEventListener('click', resetGame)
inputField.addEventListener('input', initTyping)
