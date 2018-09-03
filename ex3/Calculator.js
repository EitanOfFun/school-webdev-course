function onPageLoad() {
    const calcDisplay = document.getElementById("calc-display-text");
    Array.from(document.getElementsByClassName("calc-btn")).forEach(elm => {
        elm.addEventListener("click", function(e) {
            if (e.target.defaultValue === "AC")
                calcDisplay.innerHTML = "";
            else if (e.target.defaultValue === "=") {
                try {
                    calcDisplay.innerHTML = eval(calcDisplay.innerHTML);
                } catch(e) {
                    calcDisplay.innerHTML = ""
                }
            } else
                calcDisplay.innerHTML += e.target.defaultValue;
        }, false);
    });
}
