
const gallery = document.getElementById("gallery");
const showBuyButtons = "showBuyButtons";
if (gallery) {

    const availableToPurchase = gallery.querySelectorAll(".availableForPurchase");

    const visible = sessionStorage.getItem(showBuyButtons);

    if (visible == "true") {
        document.body.classList.add(showBuyButtons);
    }
    else {
        document.body.classList.remove(showBuyButtons);
    }

    availableToPurchase.forEach(element => {
        element.onclick = function(e) {
            e.preventDefault();
            const body = document.body;
            body.classList.toggle(showBuyButtons);
            sessionStorage.setItem(showBuyButtons, body.classList.contains(showBuyButtons));
            return false;
        }

    });

    const clickToBuySpans = gallery.querySelectorAll(".clickToBuy");

    clickToBuySpans.forEach(element => {
        element.onclick = function(e) {
            e.stopPropagation();
            const url = this.dataset.paymentLink;
            window.open(url, "_blank");
            return false;
        }

    });
}