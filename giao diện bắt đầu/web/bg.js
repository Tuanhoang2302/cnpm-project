$(document).ready(function () {
    var bg = new BG();
   
})
class BG {
    constructor() {
        this.initEven();
    }
    initEven() {
        $('.logo').click(this.btnAddOnClick.bind(this));
        $('.button-close').click(this.btnCancelOnClick.bind(this));
        $('.text-close').click(this.btnCancelOnClick.bind(this));
    }
    btnAddOnClick() {
        this.showNotice();
    }
    btnCancelOnClick() {
        this.hideNotice();
    }
    showNotice() {
        $('.notice-model').show();
        $('.notice').show();
    }
    hideNotice() {
        $('.notice-model').hide();
        $('.notice').hide();
    }

}
