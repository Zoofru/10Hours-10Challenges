var countDownDate = new Date("Jan 1, 2025 15:37:25").getTime();

// Update the count down every 1 second

countDown = () => {
    let now = new Date().getTime()
    let distance = countDownDate - now

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.querySelector("#countdown").innerHTML = days + " D :  " + hours + " H : "
    + minutes + " M : " + seconds + " S " ;
    
    if (distance < 0) {
        clearInterval(x);
        document.querySelector("#countdown").innerHTML = "EXPIRED";
    }
}

setInterval(countDown, 1000);

//31m