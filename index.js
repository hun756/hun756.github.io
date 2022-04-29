$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });

    $(".zoom").hover(function () {

        $(this).addClass('transition');
    }, function () {

        $(this).removeClass('transition');
    });

    var typed = new Typed('.typedelem', {
        strings: ["", "Do you want to work with me ?"],
        typeSpeed: 60,
        // showCursor: false,
        loop: true,
        backDelay: 900,
        backSpeed: 40,
    });

    let arr1 = ["Musician", "Graphic Designer", "Software Engineer", "Web Developer"];
    setInterval(() => {
        $(".typed2").html(arr1[0 | Math.random() * arr1.length])
    }, 2000);
});
